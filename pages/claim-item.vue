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
              <p><strong> Personal Details: </strong></p>
              <ValidationProvider
                v-slot="{ errors }"
                rules="max:100|required"
                class="block"
              >
                <BaseInput
                  v-model="userName"
                  type="text"
                  label="Name"
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
                  v-model="userEmail"
                  type="email"
                  label="Email"
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
                  :inputOptions="{ placeholder: 'Mobile No.' }"
                  class="
                    relative
                    border
                    inline-block
                    border-gray-300
                    w-full
                    rounded-lg
                    h-full
                  "
                  v-model="userPhone"
                  v-bind="bindPhoneInputProps"
                  @blur="validateUserPhone"
                  @country-changed="countryChanged"
                ></vue-tel-input>
                <div
                  v-if="!isUserPhoneValid"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  *Required
                </div>
              </div>
              <p><strong> Item Details: </strong></p>
              <ValidationProvider
                v-slot="{ errors }"
                rules="max:100|required"
                class="block"
              >
                <BaseInput
                  v-model="itemName"
                  type="text"
                  label="Name"
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
                <BaseSelect
                  v-model="itemDescription"
                  :options="itemDescriptionArr"
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
                  v-model="lostDate"
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
              <p><strong> Address of Lost: </strong></p>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  v-model="addressLine"
                  type="text"
                  label="Address Line"
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
                    v-model="city"
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
                    v-model="state"
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
                    v-model="country"
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
                    v-model="zipcode"
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
import VSelect from "vue-select";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BaseInput,
    BaseSelect,
    VSelect,
  },
  data() {
    return {
      userName: "",
      userEmail: "",
      userPhone: "",
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
      isUserPhoneValid: true,
      isLoading: false,
      itemName: "",
      itemDescription: "",
      itemDescriptionArr: [
        "Laptop",
        "Tablet",
        "Cell phone",
        "Mobile Phone",
        "Pillow",
        "Shoes",
        "Slipper",
        "Socks",
        "Headphone",
        "Earphone",
        "Wristwatch",
        "ID",
        "Credit Card",
        "Passport",
        "Phone charger",
        "Charger for Laptop",
        "Blanket",
        "Shirt",
        "Pant",
        "T-shirt",
        "Clothes",
        "Jacket",
        "Suit",
        "Water bottle",
        "Stuffed toy",
        "Bed sheet",
        "Towel",
        "Tool box",
        "Box - Shoe size",
        "Small Box",
        "Medium Box",
        "Large Box",
        "Bagpack - Carry on",
        "Luggage - Carry on",
        "Luggage - Check in size",
        "Documents",
        "Keys",
        "Purse",
        "Wallet",
        "Medication Pills",
        "Folder",
        "Jewelery",
        "Thermos",
        "Other",
      ],
      lostDate: "",
      addressLine: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      showValidateAlert: false,
    };
  },
  methods: {
    validateUserPhone() {
      if (!this.userPhone) {
        this.isUserPhoneValid = false;
      } else {
        this.isUserPhoneValid = true;
      }
    },
    countryChanged(country) {
      // console.log("===countryChanged", country);
    },
    formatMobileNumber(phoneNumber) {
      let arr = phoneNumber.split(" ");
      let countryCode = arr.shift();
      return countryCode + " " + arr.join("");
    },
    async onSubmit() {
      this.validateUserPhone();
      let userPhone = this.formatMobileNumber(this.userPhone);
      const isValid = await this.$refs.observer.validate();
      if (!isValid || !this.isUserPhoneValid) {
        this.showValidateAlert = true;
        // console.log("in valid");
      } else {
        this.showValidateAlert = false;
        // console.log("valid");
        // console.log(this.userName);
        // console.log(this.userEmail);
        // console.log(userPhone);
        // console.log(this.itemName);
        // console.log(this.itemDescription);
        // console.log(this.lostDate);
        // console.log(this.addressLine);
        // console.log(this.city);
        // console.log(this.state);
        // console.log(this.country);
        // console.log(this.zipcode);
      }
    },
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