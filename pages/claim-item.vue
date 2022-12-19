<template>
  <div class="wrapper-form">
    <div
      class="
        card
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
      <div>
        <ValidationObserver v-slot="{ validate }" ref="observer">
          <form @submit.prevent="validate().then(onSubmit)">
            <div class="card p-6 space-y-4">
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
                  Claim Item
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
              <label class="block mb-1 text-sm font-medium text-gray-800"
                >Personal Details:</label
              >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  :isRequired="true"
                  v-model="claimPersonName"
                  type="text"
                  label="Your Name"
                  :class="errors.length > 0 && 'error'"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                class="block"
                name="Email"
              >
                <BaseInput
                  :isRequired="true"
                  v-model="claimPersonEmail"
                  type="email"
                  label="Your Email"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
              <div
                class="block relative box-content h-12"
                :class="!isPhoneNoValid && 'error'"
              >
                <div class="text-gray-500" :class="!isPhoneNoValid && 'text-red-500'">Mobile Number <span class="text-red-500">*</span> </div>
                <vue-tel-input
                  class="
                    relative
                    border
                    inline-block
                    border-gray-300
                    w-full
                    rounded-lg
                    h-full
                  "
                  v-model="claimPersonPhoneNo"
                  v-bind="bindPhoneInputProps"
                  @blur="validateUserPhone"
                  @validate="validateUserPhoneFormat"
                ></vue-tel-input>
                <div
                  v-if="!isPhoneNoValid"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ phoneNoValidateMessage }}
                </div>
              </div>
              <label class="block mb-1 !mt-14 text-sm font-medium text-gray-800"
                >Item Details:</label
              >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  :isRequired="true"
                  v-model="itemName"
                  type="text"
                  label="Item Description"
                  :class="errors.length > 0 && 'error'"
                />
              </ValidationProvider>
              <div class="text-gray-500">Description</div>
              <div class="block !mt-0">
                <textarea
                  v-model="itemDescription"
                  placeholder="Description"
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
                class="block"
              >
              <div class="text-gray-500" :class="errors.length > 0 && 'text-red-500'">Date of Lost <span class="text-red-500">*</span> </div>
                <client-only>
                  <div :class="errors.length && 'error'">
                    <date-picker
                      v-model="itemLostDate"
                      :disabled-date="disableStartDate"
                      format="MM-DD-YYYY"
                      placeholder="Date of Lost"
                    ></date-picker>
                  </div>
                </client-only>
              </ValidationProvider>

              <label class="block mb-1 !mt-10 text-sm font-medium text-gray-800"
                >Lost Item Address:</label
              >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  :isRequired="true"
                  v-model="autoCompleteAddress.address"
                  id="autocomplete-claim-item"
                  type="text"
                  placeholder=""
                  label="Lost Location"
                  @input="getAddress"
                  :class="errors.length > 0 && 'error'"
                >
                  <template v-slot:icon>
                    <div
                      v-if="autoCompleteAddress.address"
                      class="absolute inset-y-0 top-7 right-0 flex items-center p-5"
                    >
                      <BaseIcon
                        @click="clearAddress"
                        icon="xmark"
                        color="gray"
                      />
                    </div>
                    <div
                      v-else
                      class="absolute inset-y-0 top-7 right-0 flex items-center p-5"
                    >
                      <BaseIcon icon="location-arrow" color="lightgray" />
                    </div>
                  </template>
                </BaseInput>

              </ValidationProvider>
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block lg:col-span-2"
                >
                  <BaseInput
                    :isRequired="true"
                    v-model="autoCompleteAddress.city"
                    label="City"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block col-span-1"
                >
                  <BaseInput
                    :isRequired="true"
                    v-model="autoCompleteAddress.state"
                    label="State"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                </ValidationProvider>
              </div>
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block lg:col-span-2"
                >
                  <BaseInput
                    :isRequired="true"
                    v-model="autoCompleteAddress.country"
                    label="Country"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                </ValidationProvider>
                <ValidationProvider
                  rules="required|max:10"
                  v-slot="{ errors }"
                  class="block col-span-1"
                  name="Zipcode"
                >
                  <BaseInput
                    :isRequired="true"
                    v-model="autoCompleteAddress.zipcode"
                    label="Zip Code"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
              <div
                v-show="showValidateAlert"
                class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                role="alert"
              >
                <span class="font-medium">Oops!</span> Please fill all required
                fields and try submitting again.
              </div>
              <div class="flex justify-end">
                <BaseButton :is-loading="isLoading" type="submit">
                  Submit
                </BaseButton>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <BaseDialog
      :showDialog="showDialog"
      :icon="{ name: 'circle-check', color: 'green', size: '3x' }"
      title="Details submitted successfully!"
      :message="dialogMessage"
      buttonTitle="Okay"
      @close="closeDialog"
    />
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
import formatMobileNumber from "../mixins/formatMobileNumber.js";
import eventListners from "../mixins/eventListners.js";
import scrollToError from "../mixins/scrollToError.js";

export default {
  mixins: [formatMobileNumber, eventListners, scrollToError],
  components: {
    ValidationObserver,
    ValidationProvider,
    DatePicker,
  },
  data() {
    return {
      showDialog: false,
      claimPersonName: "",
      claimPersonEmail: "",
      claimPersonPhoneNo: "",
      isPhoneNoValid: true,
      isPhoneNoFormateValid: true,
      phoneNoValidateMessage: "",
      isLoading: false,
      itemName: "",
      itemDescription: "",
      itemLostDate: "",
      autoCompleteAddress: {
        address: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        phoneNumber: "",
      },
      addressArr: ["Other"],
      showValidateAlert: false,
      itemId: "",
      venueEmail: "",
      secondaryEmail: "",
    };
  },
  mounted() {
    this.callEventListners();
    if (this.$route.params.item) {
      this.itemId = this.$route.params.item.id;
      this.venueEmail = this.$route.params.item.venue_email;
      this.secondaryEmail = this.$route.params.item?.secondaryEmail;
    }
    else {
      this.$router.replace({
        name: "lost-items"
      });
    }
  },
  computed: {
    dialogMessage() {
      return "We have sent the notification to the person who has uploaded the item with the entered Claim details. Please wait for the person to perform the necessary action on your claim request. We will notify you once they have taken appropriate actions for your claim request.";
    },
  },
  methods: {
    disableStartDate(date){
      return date > new Date();
    },
    getAddress() {
      if (this.address == "") {
        document.getElementById("autocomplete-claim-item").placeholder = "";
      }
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete-claim-item")
      );
      autocomplete.addListener("place_changed", () => {
        let address = autocomplete.getPlace();
        let index = this.addressArr.findIndex((addressObj) => {
          return addressObj == address.formatted_address;
        });
        if (index == "-1") {
          this.addressArr.unshift(address.formatted_address);
        }
        this.autoCompleteAddress.address = address.name;
        this.autoCompleteAddress.phoneNumber =
          address.international_phone_number || address.formatted_phone_number;
        ("");

        address.address_components.forEach((component) => {
          component.types.forEach((type) => {
            if (type === "locality") {
              this.autoCompleteAddress.city = component.long_name;
            }
            if (type === "administrative_area_level_1") {
              this.autoCompleteAddress.state = component.long_name;
            }
            if (type === "country") {
              this.autoCompleteAddress.country = component.long_name;
            }
            if (type === "postal_code") {
              this.autoCompleteAddress.zipcode = component.long_name;
            }
          });
        });
      });
    },
    clearAddress() {
      this.autoCompleteAddress.address = "";
      document.getElementById("autocomplete-claim-item").placeholder = "";
    },
    validateUserPhoneFormat(vueTelObj) {
      if (vueTelObj.valid !== undefined) {
        if (vueTelObj.valid) {
          this.isPhoneNoFormateValid = true;
          this.isPhoneNoValid = true;
          this.phoneNoValidateMessage = "";
        } else {
          this.isPhoneNoFormateValid = false;
          this.isPhoneNoValid = false;
          this.phoneNoValidateMessage = "Please enter valid phone number";
        }
      }
    },
    validateUserPhone() {
      if (!this.claimPersonPhoneNo) {
        this.isPhoneNoValid = false;
        // this.phoneNoValidateMessage = "*Required";
      } else {
        if (this.isPhoneNoFormateValid) {
          this.isPhoneNoValid = true;
          // this.phoneNoValidateMessage = "";
        } else {
          this.isPhoneNoValid = false;
        }
      }
    },
    async onSubmit() {
      this.isLoading = true;
      this.validateUserPhone();
      let claimPersonPhoneNo = this.formatMobileNumber(this.claimPersonPhoneNo);
      const isValid = await this.$refs.observer.validate();
      if (!isValid || !this.isPhoneNoValid) {
        this.showValidateAlert = true;
        this.isLoading = false;
        this.scrollToError();
      } else {
        this.showValidateAlert = false;

        const params = {
          claimpersonname: this.claimPersonName,
          claimpersonemail: this.claimPersonEmail,
          claimpersonmobileno: claimPersonPhoneNo,
          claimpersonitemname: this.itemName,
          claimpersondescription: this.itemDescription,
          claimpersondatelost: moment(this.itemLostDate).format("YYYY-MM-DD"),
          claimpersonlocation: this.autoCompleteAddress.address,
          claimpersoncity: this.autoCompleteAddress.city,
          claimpersoncountry: this.autoCompleteAddress.country,
          claimpersonstate: this.autoCompleteAddress.state,
          claimpersonzipcode: this.autoCompleteAddress.zipcode,
          itemid: this.itemId,
        };
        this.$axios
          .post("/sendclaimitemmail", params)
          .then((response) => {
            if (response.status === 200) {
              this.showDialog = true;
              this.isLoading = false;
            }
          })
          .catch((error) => {
            this.isLoading = false;
            this.$toast.error("Something went wrong! Please try again.");
            console.log(error);
          });
      }
    },
    closeDialog() {
      this.showDialog = false;
      this.$nextTick(() => {
        this.$router.push({ path: "/lost-items" });
      });
    },
  },
};
</script>

<style lang="scss">
@import "./assets/styles/date-picker.scss";
@import "./assets/styles/address-autocomplete.scss";
@import "./assets/styles/phone-number-input.scss";
.wrapper-form {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}

textarea.error {
  @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
}
</style>