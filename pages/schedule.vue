<template>
  <div class="wrapper">
    <BaseCard class="md:w-8/12 lg:w-7/12 xl:w-6/12">
      <ValidationObserver v-slot="{ validate }" ref="observer">
        <form
          class="grid gap-4 mt-1"
          @submit.prevent="validate().then(onSubmit)"
        >
          <div class="card p-6 space-y-4">
            <div class="form-title">
              <BaseHeader varient="gray">Let's schedule a pickup!</BaseHeader>
            </div>
            <div class="text-sm text-gray-800">
              <p class="font-medium text-base">Pickup address:</p>
              <p>{{ fromVenueName }}</p>
              <p>{{ fromAddress }}</p>
              <p>
                {{ fromCity }}, {{ fromState }}, {{ fromCountry }},
                {{ fromZip }}
              </p>
            </div>
            <div class="block">
              <BaseInput
                v-model="reference"
                type="text"
                label="Reference"
              />
            </div>
            <div class="block">
              <div class="text-gray-500">
                Add instructions
              </div>
              <textarea
                v-model="instructions"
                placeholder="Add instructions"
                class="
                  border
                  inline-block
                  border-gray-300
                  w-full
                  rounded-lg
                  px-4
                  h-full
                  text-base
                  pt-4
                  pb-2
                  transition-shadow
                  text-gray-700
                "
              ></textarea>
            </div>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="block !mt-1"
            >
              <label
                class="block text-md !mt-0 text-gray-500"
                :class="errors.length > 0 && 'text-red-500'"
                >Select min and max date range:
                <span class="text-red-500">*</span>
              </label>
              <client-only>
                <div :class="errors.length && 'error'">
                  <date-picker
                    v-model="dateTimeRange"
                    :disabled-date="disableStartDate"
                    format="MM-DD-YYYY HH:mm:ss"
                    type="datetime"
                    range
                  ></date-picker>
                </div>
              </client-only>
            </ValidationProvider>
            <div class="w-full flex justify-end">
              <BaseButton
                type="submit"
                :is-loading="isLoading"
              >
                Submit
              </BaseButton>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </BaseCard>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
import scrollToError from "../mixins/scrollToError.js";

export default {
  mixins: [scrollToError],
  components: {
    DatePicker,
  },
  data() {
    return {
      reference: "",
      instructions: "",
      dateTimeRange: [],
      isLoading: false,
      itemId: "",
      shipmentId: "",
      fromVenueName: "",
      fromAddress: "",
      fromAddressId: "",
      fromCity: "",
      fromState: "",
      fromCountry: "",
      fromZip: "",
    };
  },
  mounted() {
    if (this.$store.getters["shipment/itemId"] || this.$route.query.id) {
      this.itemId = this.$route.query.id || JSON.parse(
        JSON.stringify(this.$store.getters["shipment/itemId"])
      );
      this.$axios
        .get("/getsinglelostitem?id=" + this.itemId)
        .then((response) => {
          this.shipmentId = response.data.data.Item.shipment;
          this.fromVenueName = response.data.data.Item.venue_name;
          this.fromAddressId = response.data.data.Item.from_address;
          this.fromAddress = response.data.data.Item.address.split(",")[0];
          this.fromCity = response.data.data.Item.city;
          this.fromState = response.data.data.Item.states;
          this.fromCountry = response.data.data.Item.country;
          this.fromZip = response.data.data.Item.zipcode;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    disableStartDate(date) {
      return date < new Date();
    },
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.isLoading = true;
        try {
          if (this.itemId) {
            let params = {
              address: this.fromAddressId,
              shipment: this.shipmentId,
              reference: this.reference || "test",
              min_datetime: moment(this.dateTimeRange[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
              max_datetime: moment(this.dateTimeRange[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
              instructions: this.instructions || "test",
              id: this.itemId,
            };
            let response = await this.$axios.post("/schedulePickup", params);
            this.$toast.info("Pickup scheduled successfully!");
            let update_params = {
              min_datetime: moment(this.dateTimeRange[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
              max_datetime: moment(this.dateTimeRange[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
              scheduled_pickup: true,
            };
            try {
              let response = await this.$axios.post(
                "/updatesinglelostitem?id=" + this.itemId,
                update_params
              );
              this.isLoading = false;
            } catch (err) {
              console.log(err);
              this.isLoading = false;
            }
          }
          this.$emit("close");
        } catch (error) {
          this.$toast.error("Something went wrong! Please try again.");
          console.log(error);
          this.isLoading = false;
        }
      } else {
        this.scrollToError();
      }
    },
  },
};
</script>

<style lang="scss">
@import "./assets/styles/date-picker.scss";
</style>

<style lang="scss" scoped>
.wrapper {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}
</style>