<template>
  <BaseModal
    header="Let's schedule a pickup!"
    :show-modal="showModal"
    size="is-xsmall"
    @close="$emit('close')"
    :hideCancel="true"
  >
    <div
      class="space-y-4 !shadow-primary flex flex-col text-left"
    >
      <div class="text-sm text-gray-800">
        <p class="font-medium text-base">Pickup address:</p>
        <p>{{ fromVenueName }}</p>
        <p>{{ fromAddress }}</p>
        <p>{{ fromCity }}, {{ fromState }}, {{ fromCountry }}, {{ fromZip }}</p>
      </div>
      <ValidationObserver v-slot="{ validate }" ref="observer">
        <form
          class="grid gap-4 mt-1"
          @submit.prevent="validate().then(onSubmit)"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="block"
          >
            <BaseInput
              v-model="reference"
              :isRequired="true"
              type="text"
              label="Insert reference"
              :class="errors.length > 0 && 'error'"
            />
            <p
              v-if="errors.length"
              class="vee-validation-error mt-2 text-sm text-red-600"
            >
              {{ errors[0] }}
            </p>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="block"
          >
            <div class="text-gray-500" :class="errors.length > 0 && 'text-red-500'">Add instructions <span class="text-red-500">*</span> </div>
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
                text-sm
                pt-4
                pb-2
                transition-shadow
                text-gray-800
              "
              :class="
                errors.length > 0 &&
                'border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 rounded-lg  transition-none'
              "
            ></textarea>

            <p
              v-if="errors.length"
              class="vee-validation-error text-sm text-left text-red-600"
            >
              {{ errors[0] }}
            </p>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="block"
          >
            <label class="block text-md mt-10 text-gray-500" :class="errors.length > 0 && 'text-red-500'">Select min and max date range: <span class="text-red-500">*</span> </label
            >
            <client-only>
              <div :class="errors.length && 'error'">
                <date-picker
                  v-model="dateTimeRange"
                  formate="YYYY-MM-DD"
                  type="datetime"
                  range
                  :confirm="true"
                ></date-picker>
              </div>
            </client-only>
            <p
              v-if="errors.length"
              class="vee-validation-error mt-2 text-sm text-red-600"
            >
              {{ errors[0] }}
            </p>
          </ValidationProvider>
          <BaseButton
            type="submit"
            class="max-w-[16rem] w-full mx-auto my-2"
            :is-loading="isLoading"
          >
            Submit
          </BaseButton>
        </form>
      </ValidationObserver>
    </div>
  </BaseModal>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";

export default {
  props: {
    showModal: { type: Boolean, default: false },
  },
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
      fromVenueName: "",
      fromAddress: "",
      fromCity: "",
      fromState: "",
      fromCountry: "",
      fromZip: "",
    };
  },
  mounted(){
    if (this.$store.getters["shipment/itemId"]) {
      this.itemId = JSON.parse(JSON.stringify(this.$store.getters["shipment/itemId"]));
      this.$axios.get("/getsinglelostitem?id="+this.itemId)
        .then((response) => {
          this.fromVenueName = response.data.data.Item.venue_name;
          this.fromAddress = response.data.data.Item.address.split(",")[0];
          this.fromCity = response.data.data.Item.city;
          this.fromState = response.data.data.Item.states;
          this.fromCountry = response.data.data.Item.country;
          this.fromZip = response.data.data.Item.zipcode;
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.isLoading = true;
        try {
          if (this.itemId) {
            let params = {
              address: JSON.parse(
                JSON.stringify(this.$store.getters["shipment/shippingRates"])
              ).from_address.id,
              shipment: JSON.parse(
                JSON.stringify(this.$store.getters["shipment/shipmentId"])
              ),
              reference: this.reference,
              min_datetime: moment(this.dateTimeRange[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
              max_datetime: moment(this.dateTimeRange[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
              instructions: this.instructions,
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
              shipment: JSON.parse(
                JSON.stringify(this.$store.getters["shipment/shipmentId"])
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
        } catch (error) {
          this.$toast.error("Something went wrong! Please try again.");
          console.log(error);
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/styles/date-picker.scss";
</style>