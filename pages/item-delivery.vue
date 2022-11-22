<template>
  <div class="wrapper">
    <div
      class="
        w-full
        mx-6
        lg:mx-0
        md:w-8/12
        lg:w-7/12
        xl:w-6/12
        bg-white
        border border-[#E1E3E6]
        rounded-lg
      "
      style="box-shadow: rgba(54, 28, 93, 0.04) -10px 18px 32px"
    >
      <ValidationObserver v-slot="{ validate }" ref="observer">
        <form @submit.prevent="validate().then(onSubmit)">
          <div class="p-6 space-y-4">
            <div class="form-title">
              <h1
                class="
                  w-full
                  my-2
                  text-xl
                  font-bold
                  leading-tight
                  text-gray-700
                "
              >
                Select Item Delivery
              </h1>
              <div class="flex justify-start">
                <span
                  class="
                    w-20
                    border-t-4 border-solid border-orange-200
                    inline-block
                    mb-3
                  "
                ></span>
              </div>
            </div>

            <div class="flex items-center pl-4 rounded border border-gray-200">
              <input
                v-model="deliveryType"
                id="bordered-radio-1"
                type="radio"
                value="0"
                name="bordered-radio"
                class="
                  w-4
                  h-4
                  text-accent-100
                  bg-gray-100
                  border-gray-300
                  focus:ring-accent-200 focus:ring-2
                "
              />
              <label
                for="bordered-radio-1"
                class="py-4 ml-2 w-full text-sm font-medium text-gray-900"
                >Ship it to Me</label
              >
            </div>
            <div class="flex items-center pl-4 rounded border border-gray-200">
              <input
                v-model="deliveryType"
                checked
                id="bordered-radio-2"
                type="radio"
                value="1"
                name="bordered-radio"
                class="
                  w-4
                  h-4
                  text-accent-100
                  bg-gray-100
                  border-gray-300
                  focus:ring-accent-200 focus:ring-2
                "
              />
              <label
                for="bordered-radio-2"
                class="py-4 ml-2 w-full text-sm font-medium text-gray-900"
                >Hold for pickup</label
              >
            </div>

            <div class="!mt-5" v-show="deliveryType === '1'">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block mb-4"
              >
                <BaseInput
                  v-model="pickupPersonName"
                  type="text"
                  label="Pickup Person Name"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
              <div class="block mb-4">
                <BaseInput
                  v-model="additionalPersonName"
                  type="text"
                  label="Additional Person Name (optional)"
                />
              </div>
              <label class="block text-md font-medium text-gray-800"
                >Expected Pickup Date:</label
              >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block mb-4 mt-2"
              >
                <client-only>
                  <div :class="errors.length && 'error'">
                    <date-picker
                      v-model="expectedPickupDate"
                      formate="YYYY-MM-DD"
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
              <div
                v-show="showValidateAlert"
                class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                role="alert"
              >
                <span class="font-medium">Oops!</span> Please fill all required
                fields and try submitting again.
              </div>
            </div>
            <div class="flex justify-end">
              <BaseButton :is-loading="isLoading" button-type="submit">
                Submit
              </BaseButton>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <BaseDialog
      :showDialog="showDialog"
      :icon="{ name: 'circle-check', color: 'green', size: '3x' }"
      :message="dialogMessage"
      title="Details submitted successfully!"
      buttonTitle="Okay"
      @close="closeDialog"
    />
  </div>
</template>
  
<script>
import { faL } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  data: () => ({
    showDialog: false,
    deliveryType: "0",
    pickupPersonName: "",
    additionalPersonName: "",
    expectedPickupDate: new Date(),
    isLoading: false,
    itemId: "",
    showValidateAlert: false,
  }),
  components: { DatePicker },
  mounted() {
    if (this.$route.query.id) {
      this.itemId = this.$route.query.id;
    } else {
      this.$nextTick(() => {
        this.$router.push({
          name: "found-items",
        });
      });
    }
    window.addEventListener("keydown", () => {
      this.showValidateAlert = false;
    });
    window.addEventListener("click", () => {
      this.showValidateAlert = false;
    });
  },
  computed: {
    dialogMessage() {
      if (this.deliveryType === "0") {
        return "We have sent the notification link on your email. You can click on the link received on the mail to proceed further with the shipping.";
      } else {
        return " We have sent the notification to the person who has uploaded the item, with the entered Pickup details. You can pickup your item accordingly at the scheduled time.";
      }
    },
  },
  methods: {
    toggleTabs(tabNumber) {
      this.openTab = tabNumber;
    },
    async onSubmit() {
      this.isLoading = true;
      if (this.deliveryType === "0") {
        this.$nextTick(() => {
          this.$router.push({
            name: "rate-quotes",
          });
        });
        return;
      }
      if (this.deliveryType === "1") {
        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
          this.isLoading = false;
          this.showValidateAlert = true;
          return;
        }
      }
      this.showValidateAlert = false;
      let params = {
        delivery_type: this.deliveryType,
      };
      if (this.deliveryType === "1") {
        params.pickup_person_name = this.pickupPersonName;
        params.additional_person_name = this.additionalPersonName;
        params.pickup_date = this.expectedPickupDate;
      }
      this.$axios
        .post("/updatesinglelostitem?id=" + this.itemId, params)
        .then((response) => {
          if (response.status === 200) {
            this.$axios
              .post("/holdforpickupmail?id=" + this.itemId)
              .then((response) => {
                if (response.status === 200) {
                  this.showDialog = true;
                  this.isLoading = false;
                }
              })
              .catch((error) => {
                console.log(error);
                this.$toast.error("Something went wrong! Please try again.");
                this.isLoading = false;
              });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Something went wrong! Please try again.");
          this.isLoading = false;
        });
    },
    closeDialog() {
      this.showDialog = false;
      this.$nextTick(() => {
        this.$router.push({ path: "/found-items" });
      });
    },
  },
  beforeDestroy() {
    window.removeEventListener("click", () => {});
    window.removeEventListener("keydown", () => {});
  },
};
</script>
  
<style lang="scss">
.wrapper {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}
.mx-input-wrapper i {
  margin-right: 10px;
}
.mx-input:hover {
  @apply border-gray-300;
}
.mx-datepicker {
  width: 100% !important;
}
.mx-datepicker input {
  height: 3rem;
  border-radius: 0.5rem;
  border-color: rgb(212 212 212);
  cursor: pointer;
}
.error {
  & > .mx-datepicker {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 rounded-lg transition-none;
  }
}
</style>