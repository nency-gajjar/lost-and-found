<template>
  <div class="wrapper-form">
    <base-dialog v-show="actionModal">
      <div class="relative">
        <div class="title bg-accent-100 pl-6 py-4 mb-4">
          <h3 class="text-white">{{ actionTitle }}</h3>
        </div>
        <span
          @click="actionModal = false"
          class="
            absolute
            right-5
            top-5
            inline-block
            z-10
            cursor-pointer
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      </div>
      <div
        class="
          w-full
          max-w-screen-md
          relative
          mx-auto
          my-auto
          rounded-xl
          shadow-lg
          bg-white
          flex
          flex-col
          justify-around
          items-center
          editor-container
        "
      >
        <div class="w-full text-center px-4 text-xl">
          {{ actionMessage }}
        </div>
        <div class="w-full flex justify-end mr-10">
          <button
            type="button"
            @click="actionModal = false"
            class="
              font-medium
              text-md
              leading-5
              uppercase
              py-2
              px-6
              rounded-md
              button
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-primary-60
              transition-all
              font-display
              disabled:cursor-not-allowed
              bg-accent-100
              text-white
              focus:ring-accent-100
              shadow-accent
              hover:bg-accent-200
            "
          >
            Close
          </button>
        </div>
      </div>
    </base-dialog>
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
                rules="max:100|required"
                class="block"
              >
                <BaseInput
                  v-model="claimPersonName"
                  type="text"
                  label="Your Name"
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
                rules="required|email"
                class="block"
                name="Email"
              >
                <BaseInput
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
              <div class="block relative box-content h-12">
                <vue-tel-input
                  :inputOptions="{ placeholder: 'Mobile Number' }"
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
                ></vue-tel-input>
                <div
                  v-if="!isPhoneNoValid"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  *Required
                </div>
              </div>
              <label class="block mb-1 !mt-10 text-sm font-medium text-gray-800"
                >Item Details:</label
              >
              <ValidationProvider
                v-slot="{ errors }"
                rules="max:100|required"
                class="block"
              >
                <BaseInput
                  v-model="itemName"
                  type="text"
                  label="Item Name"
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
                <BaseInput
                  v-model="itemDescription"
                  type="text"
                  label="Item Description"
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
                <BaseInput
                  v-model="itemLostDate"
                  type="date"
                  label="Date of Lost"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
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
                  v-model="autoCompleteAddress.address"
                  type="text"
                  id="autocomplete"
                  label="Lost Location"
                  @input="getAddress"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="max:28|required"
                  class="block lg:col-span-2"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.city"
                    label="City"
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
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block col-span-1"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.state"
                    label="State"
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
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="max:28|required"
                  class="block lg:col-span-2"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.country"
                    label="Country"
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
                <ValidationProvider
                  rules="required"
                  v-slot="{ errors }"
                  class="block col-span-1"
                >
                  <BaseInput
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

              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                class="block"
                name="Venue Email"
              >
                <BaseInput
                  v-model="venueEmail"
                  type="email"
                  label="Venue Email"
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
                rules="email"
                class="block"
                name="Secondary Email"
              >
                <BaseInput
                  v-model="secondaryEmail"
                  type="text"
                  label="Secondary Email (optional)"
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
                v-show="showValidateAlert"
                class="
                  p-4
                  mb-4
                  top-margin-alert
                  text-sm text-red-700
                  bg-red-100
                  rounded-lg
                  dark:bg-red-200 dark:text-red-800
                "
                role="alert"
              >
                <span class="font-medium">Oops!</span> Please fill all required
                fields and try submitting again.
              </div>
              <div class="flex justify-end">
                <button
                  :class="{ 'button--loading': isLoading }"
                  type="submit"
                  class="
                    !py-3
                    font-medium
                    text-md
                    leading-5
                    uppercase
                    py-2
                    px-12
                    rounded-md
                    button
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-offset-primary-60
                    transition-all
                    font-display
                    disabled:cursor-not-allowed
                    bg-accent-100
                    text-white
                    focus:ring-accent-100
                    shadow-accent
                    hover:bg-accent-200
                  "
                >
                  <span class="button__text"> Submit </span>
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseSelect from "~/components/base/BaseSelect.vue";
import BaseDialog from "~/components/base/BaseDialog.vue";
import VSelect from "vue-select";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BaseInput,
    BaseSelect,
    BaseDialog,
    VSelect,
  },
  data() {
    return {
      actionModal: false,
      actionMessage: "",
      actionTitle: "",
      claimPersonName: "",
      claimPersonEmail: "",
      claimPersonPhoneNo: "",
      bindPhoneInputProps: {
        mode: "international",
        autoDefaultCountry: true,
        validCharactersOnly: true,
        autoFormat: true,
        preferredCountries: ["US", "CN"],
        placeholder: "Enter a phone number",
        name: "telephone",
        maxLen: 15,
        // wrapperClasses: "",
        // inputClasses: "",
        inputOptions: {
          showDialCode: false,
        },
      },
      isPhoneNoValid: true,
      isLoading: false,
      itemName: "",
      itemDescription: "",
      itemLostDate: "",
      venueEmail: "",
      secondaryEmail: "",
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
    };
  },
  methods: {
    getAddress() {
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete")
      );
      autocomplete.addListener("place_changed", () => {
        let address = autocomplete.getPlace();
        let index = this.addressArr.findIndex((addressObj) => {
          return addressObj == address.formatted_address;
        });
        if (index == "-1") {
          this.addressArr.unshift(address.formatted_address);
        }
        this.autoCompleteAddress.address = this.addressArr[0];
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

    validateUserPhone() {
      if (!this.claimPersonPhoneNo) {
        this.isPhoneNoValid = false;
      } else {
        this.isPhoneNoValid = true;
      }
    },
    formatMobileNumber(phoneNumber) {
      let arr = phoneNumber.split(" ");
      let countryCode = arr.shift();
      return countryCode + " " + arr.join("");
    },
    async onSubmit() {
      this.isLoading = true;
      this.actionModal = false;
      this.validateUserPhone();
      let claimPersonPhoneNo = this.formatMobileNumber(this.claimPersonPhoneNo);
      const isValid = await this.$refs.observer.validate();
      if (!isValid || !this.isPhoneNoValid) {
        this.showValidateAlert = true;
        console.log("in valid");
        this.isLoading = false;
      } else {
        this.showValidateAlert = false;

        const params = {
          claimpersonname: this.claimPersonName,
          claimpersonemail: this.claimPersonEmail,
          claimpersonmobileno: claimPersonPhoneNo,
          claimpersonitemname: this.itemName,
          claimpersondescription: this.itemDescription,
          claimpersondatelost: this.itemLostDate,
          claimpersonlocation: this.autoCompleteAddress.address,
          itemid: this.itemId,
          venue_email: this.venueEmail,
          secondary_email: this.secondary_email,
        };

        this.$axios
          .post("/sendclaimitemmail", params)
          .then((response) => {
            if (response.status === 200) {
              this.isLoading = false;
              this.actionMessage = "Details submitted successfully!";
              this.actionTitle = "Success";
              this.actionModal = true;
            }
          })
          .catch((error) => {
            this.isLoading = false;
            this.actionMessage = "Something went wrong! Please try again.";
            this.actionTitle = "Error";
            this.actionModal = true;
            console.log(error);
          });
      }
    },
  },
  mounted() {
    this.itemId = this.$route.params.id;
  },
};
</script>

<style lang="scss" scoped>
.wrapper-form {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}
.vue-tel-input {
  border-radius: 0.5rem;
}
.vti__dropdown-list {
  z-index: 100;
}
.button {
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
}

.button__text {
  color: #ffffff;
  transition: all 0.2s;
}

.button--loading .button__text {
  visibility: hidden;
  opacity: 0;
}

.button--loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

.top-margin-alert {
  margin-top: 2.5rem !important;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>