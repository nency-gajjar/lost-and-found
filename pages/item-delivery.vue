<template>
  <div class="wrapper">
    <div
      v-if="!isLoadingItemDetails && Object.keys(itemDetails).length > 0"
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
          <div class="p-6">
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

            <!-- Item Details -->
            <div class="sections py-4">
              <div class="form-title">
                <h2
                  class="
                    text-lg text-accent-100
                    font-medium
                    leading-tight
                    text-left text-gray-800
                  "
                >
                  Item's Details:
                </h2>
                <span
                  class="
                    w-20
                    border-t-4 border-solid border-gray-300
                    inline-block
                    mb-1
                  "
                ></span>
              </div>

              <div class="flex foundItemContainer">
                <div class="flex flex-col grow">
                  <div class="flex items-center mt-3 flex-wrap">
                    <div
                      class="
                        text-left text-gray-600
                        font-medium
                        w-full
                        lg:w-4/12
                        md:w-5/12
                        sm:w-6/12
                      "
                    >
                      Item Description
                    </div>
                    <div
                      class="
                        text-gray-600 text-left
                        md:w-7/12
                        sm:w-6/12 sm:pl-3
                      "
                    >
                      {{ itemDetails.item_description }}
                    </div>
                  </div>
                  <div class="flex items-center mt-3 flex-wrap">
                    <div
                      class="
                        text-left text-gray-600
                        font-medium
                        w-full
                        lg:w-4/12
                        md:w-5/12
                        sm:w-6/12
                      "
                    >
                      Package Type
                    </div>
                    <div
                      class="
                        text-gray-600 text-left
                        md:w-7/12
                        sm:w-6/12 sm:pl-3
                      "
                    >
                      {{ itemDetails.package_type }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="itemDetails.image"
                  class="w-40 h-40 flex justify-center"
                >
                  <img class="w-full" :src="itemDetails.image" alt="" />
                </div>
              </div>
            </div>
            <div class="sections py-4">
              <div class="form-title">
                <h2
                  class="
                    text-lg text-accent-100
                    font-medium
                    leading-tight
                    text-left text-gray-800
                  "
                >
                  Address Details:
                </h2>
                <span
                  class="
                    w-20
                    border-t-4 border-solid border-gray-300
                    inline-block
                    mb-1
                  "
                ></span>
              </div>

              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Address
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.address }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  City
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.city }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  State
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.states }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Country
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.country }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Zipcode
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.zipcode }}
                </div>
              </div>
            </div>
            <div class="sections py-4">
              <div class="form-title">
                <h2
                  class="
                    text-lg text-accent-100
                    font-medium
                    leading-tight
                    text-left text-gray-800
                  "
                >
                  Sender's Details:
                </h2>

                <span
                  class="
                    w-20
                    border-t-4 border-solid border-gray-300
                    inline-block
                    mb-1
                  "
                ></span>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Venue
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.venu_type }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Found Item Date
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.datse }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Venue Email
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.venue_email }}
                </div>
              </div>
              <div
                v-if="itemDetails.secondary_email"
                class="flex items-center mt-3 flex-wrap"
              >
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Venue Secondary Email
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.secondary_email }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Venue Phone No.
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.venue_phone_no }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Employee Mobile No.
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.employee_mobile_no }}
                </div>
              </div>
            </div>
            <!-- Item Details End -->

            <div class="grid grid-cols-2 gap-4 mt-6">
              <!-- Ship it to me -->
              <div
                class="flex items-center pl-4 rounded border border-gray-300"
                :class="[
                  deliveryType === '0' &&
                    '!border-accent-80 !ring-accent-60 !ring-[6px] !ring-offset-accent-80 !ring-offset-1',
                ]"
              >
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
                  class="
                    py-4
                    ml-2
                    w-full
                    text-sm
                    font-medium
                    text-gray-900
                    cursor-pointer
                  "
                  >Ship it to Me</label
                >
              </div>

              <!-- Hold for pickup -->
              <div
                class="flex items-center pl-4 rounded border border-gray-300"
                :class="[
                  deliveryType === '1' &&
                    '!border-accent-80 !ring-accent-60 !ring-[6px] !ring-offset-accent-80 !ring-offset-1',
                ]"
              >
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
                  class="
                    py-4
                    ml-2
                    w-full
                    text-sm
                    font-medium
                    text-gray-900
                    cursor-pointer
                  "
                  >Hold for pickup</label
                >
              </div>
            </div>

            <div class="!my-6 space-y-4" v-show="deliveryType === '0'">
              <ValidationProvider
                v-slot="{ errors }"
                :rules="deliveryType === '0' ? 'required' : ''"
                class="block"
              >
                <BaseInput
                  v-model="autoCompleteAddress.address"
                  id="autocomplete-item-delivery"
                  type="text"
                  placeholder=""
                  label="Your Location"
                  @input="getAddress"
                  :class="errors.length > 0 && 'error'"
                >
                  <template v-slot:icon>
                    <div
                      v-if="autoCompleteAddress.address"
                      class="absolute inset-y-0 right-0 flex items-center p-5"
                    >
                      <BaseIcon
                        @click="clearAddress"
                        icon="xmark"
                        color="gray"
                      />
                    </div>
                    <div
                      v-else
                      class="absolute inset-y-0 right-0 flex items-center p-5"
                    >
                      <BaseIcon icon="location-arrow" color="lightgray" />
                    </div>
                  </template>
                </BaseInput>

                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
              <div class="grid grid-cols-3 lg:grid-cols-3 gap-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="deliveryType === '0' ? 'max:28|required' : ''"
                  class="block lg:col-span-1"
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
                  :rules="deliveryType === '0' ? 'required' : ''"
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
                <ValidationProvider
                  :rules="deliveryType === '0' ? 'required|max:10' : ''"
                  v-slot="{ errors }"
                  class="block col-span-1"
                  name="Zipcode"
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
              <div class="grid lg:grid-cols-2 gap-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  :rules="deliveryType === '0' ? 'max:28|required' : ''"
                  class="block lg:col-span-1"
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
                <div
                  class="block relative box-content h-12"
                  :class="!isUserPhoneValid && 'error'"
                >
                  <vue-tel-input
                    :inputOptions="{ placeholder: 'Phone Number' }"
                    class="
                      relative
                      border
                      inline-block
                      border-gray-300
                      w-full
                      rounded-lg
                      h-full
                    "
                    v-model="autoCompleteAddress.phoneNo"
                    @blur="validateUserPhone"
                    @validate="validateUserPhoneFormat"
                    v-bind="bindPhoneInputProps"
                  ></vue-tel-input>
                  <div
                    v-if="!isUserPhoneValid"
                    class="
                      vee-validation-error
                      top-margin-05
                      text-sm text-red-600
                    "
                  >
                    {{ userPhoneValidationMessage }}
                  </div>
                </div>
              </div>
              <div class="text-gray-500 flex flex-col space-y-4">
                <div class="flex items-center space-x-3 ml-4">
                  <input
                    v-model="commercialAddress"
                    id="commercial"
                    type="checkbox"
                    class="
                      text-accent-100
                      rounded-sm
                      focus:ring-accent-100
                      border-gray-300
                      transition-all
                      h-5
                      w-5
                    "
                  />
                  <label for="commercial">This is a Commercial Address</label>
                </div>
                <div class="flex items-center space-x-3 ml-4">
                  <input
                    v-model="insurance"
                    id="insurance"
                    type="checkbox"
                    class="
                      text-accent-100
                      rounded-sm
                      focus:ring-accent-100
                      border-gray-300
                      transition-all
                      h-5
                      w-5
                    "
                  />
                  <label for="insurance"> Add Insurance</label>
                </div>
                <ValidationProvider
                  v-show="insurance"
                  v-slot="{ errors }"
                  name="Insurance value"
                  rules="numeric|insurance:1000"
                  class="block ml-4"
                >
                  <BaseInput
                    v-model="insuranceValue"
                    type="text"
                    label="Insurance Value"
                    :class="errors.length > 0 && 'error'"
                  >
                    <template v-slot:icon>
                      <div
                        class="absolute inset-y-0 right-0 flex items-center p-5"
                      >
                        <BaseIcon icon="dollar" color="lightgray" />
                      </div>
                    </template>
                  </BaseInput>
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
            </div>

            <div class="!my-6" v-show="deliveryType === '1'">
              <!-- TODO: -->
              <!-- rules="required" -->
              <ValidationProvider
                v-slot="{ errors }"
                :rules="deliveryType === '1' ? 'required' : ''"
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
              <BaseButton :is-loading="isLoading" button-type="submit">
                Submit
              </BaseButton>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <div
      v-else-if="!isLoadingItemDetails && Object.keys(itemDetails).length === 0"
    >
      <p class="text-gray-600 font-medium m-14">No Result Found</p>
    </div>
    <div v-else>
      <BaseLoader />
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
    autoCompleteAddress: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      phoneNo: "",
    },
    bindPhoneInputProps: {
      mode: "international",
      autoDefaultCountry: true,
      validCharactersOnly: true,
      autoFormat: true,
      preferredCountries: ["US", "CN"],
      placeholder: "Enter a phone number",
      name: "telephone",
      maxLen: 15,
      inputOptions: {
        showDialCode: false,
      },
    },
    isUserPhoneFormatValid: true,
    isUserPhoneValid: true,
    userPhoneValidationMessage: "",
    commercialAddress: "",
    insurance: "",
    insuranceValue: "",
    isLoadingItemDetails: true,
    itemDetails: {},
  }),
  components: { DatePicker },
  async created() {
    if (this.$route.query.id) {
      this.isLoadingItemDetails = true;
      this.$axios
        .get("/getsinglelostitem?id=" + this.$route.query.id)
        .then((response) => {
          if (response.status === 200) {
            this.isLoadingItemDetails = false;
            // console.log("====response", response.data.data.Item);
            this.itemDetails = response.data.data.Item;
          }
        })
        .catch((error) => {
          this.isLoadingItemDetails = false;
          this.$toast.error("Something went wrong! Please try again.");
          console.log(error);
        });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      localStorage.removeItem("InsuranceValue");
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
    validateUserPhoneFormat(vueTelObj) {
      if (vueTelObj.valid !== undefined) {
        if (vueTelObj.valid) {
          this.isUserPhoneFormatValid = true;
          this.isUserPhoneValid = true;
          this.userPhoneValidationMessage = "";
        } else {
          this.isUserPhoneFormatValid = false;
          this.isUserPhoneValid = false;
          this.userPhoneValidationMessage = "Please enter valid Phone number";
        }
      }
    },
    validateUserPhone() {
      if (!this.autoCompleteAddress.phoneNo) {
        this.isUserPhoneValid = false;
        this.userPhoneValidationMessage = "*Required";
      } else {
        if (this.isUserPhoneFormatValid) {
          this.isUserPhoneValid = true;
          this.userPhoneValidationMessage = "";
        } else {
          this.isUserPhoneValid = false;
        }
      }
    },
    toggleTabs(tabNumber) {
      this.openTab = tabNumber;
    },
    getAddress() {
      if (this.address == "") {
        document.getElementById("autocomplete-item-delivery").placeholder = "";
      }
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete-item-delivery")
      );
      autocomplete.addListener("place_changed", () => {
        let address = autocomplete.getPlace();
        this.autoCompleteAddress.address = address.formatted_address;
        this.autoCompleteAddress.phoneNo =
          address.international_phone_number || address.formatted_phone_number;

        address.address_components.forEach((component) => {
          component.types.forEach((type) => {
            if (type === "locality" || type === "postal_town") {
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
      this.address = "";
      document.getElementById("autocomplete-item-delivery").placeholder = "";
      this.autoCompleteAddress = {
        address: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        phoneNo: "",
      };
    },
    formatMobileNumber(phoneNumber) {
      let arr = phoneNumber.split(" ");
      arr.shift();
      let phone = arr.join("");
      return phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
    },
    async onSubmit() {
      if (this.deliveryType === "0") this.validateUserPhone();
      this.isLoading = true;
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.isLoading = false;
        this.showValidateAlert = true;
        return;
      }
      this.showValidateAlert = false;
      let params = {
        delivery_type: this.deliveryType,
      };
      let params_rateQuotes = {};
      if (this.deliveryType === "0") {
        params.receiver_address = this.autoCompleteAddress.address;
        params.receiver_city = this.autoCompleteAddress.city;
        params.receiver_state = this.autoCompleteAddress.state;
        params.receiver_country = this.autoCompleteAddress.country;
        params.receiver_zipcode = this.autoCompleteAddress.zipcode;
        params.receiver_mobile_no = this.formatMobileNumber(
          this.autoCompleteAddress.phoneNo
        );

        params_rateQuotes.name = "Prem Panwala";
        params_rateQuotes.company = "Bacancy Company";
        params_rateQuotes.street1 = this.itemDetails.address;
        params_rateQuotes.city = this.itemDetails.city;
        params_rateQuotes.state = this.itemDetails.states;
        params_rateQuotes.zip = this.itemDetails.zipcode;
        params_rateQuotes.phone = this.formatMobileNumber(
          this.itemDetails.venue_phone_no
        );
        params_rateQuotes.toname = "Bhavya Makwana";
        params_rateQuotes.tocompany = "Bacancy Company";
        params_rateQuotes.tostreet1 = this.autoCompleteAddress.address;
        params_rateQuotes.tocity = this.autoCompleteAddress.city;
        params_rateQuotes.tostate = this.autoCompleteAddress.state;
        params_rateQuotes.tozip = this.autoCompleteAddress.zipcode;
        params_rateQuotes.tophone = this.formatMobileNumber(
          this.autoCompleteAddress.phoneNo
        );
        params_rateQuotes.length = Number(this.itemDetails.item_length);
        params_rateQuotes.width = Number(this.itemDetails.item_width);
        params_rateQuotes.height = Number(this.itemDetails.item_height);
        params_rateQuotes.weight = Number(this.itemDetails.weight_pounds);
        params_rateQuotes.residential = !this.commercialAddress;
      }
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
                  if (this.deliveryType === "1") {
                    this.showDialog = true;
                  } else {
                    this.$axios
                      .post("/getshippingrates", params_rateQuotes)
                      .then((response) => {
                        if (response.status === 200) {
                          this.isLoading = false;
                          let shippingRates = {
                            buyer_address: response.data.buyer_address,
                            from_address: response.data.from_address,
                            id: response.data.id,
                            parcel: response.data.parcel,
                            rates: response.data.rates,
                            return_address: response.data.return_address,
                            to_address: response.data.to_address,
                          };
                          localStorage.setItem(
                            "ShippingRates",
                            JSON.stringify(shippingRates)
                          );
                          localStorage.setItem(
                            "LableDetails",
                            JSON.stringify(params_rateQuotes)
                          );
                          if (this.insuranceValue) {
                            localStorage.setItem(
                              "InsuranceValue",
                              this.insuranceValue
                            );
                          }
                          this.$nextTick(() => {
                            this.$router.push({
                              name: "rate-quotes",
                              query: { id: this.itemId },
                            });
                          });
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
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

.error {
  & > .vue-tel-input {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 rounded-lg  transition-none;
  }
}

.vue-tel-input {
  border-radius: 0.5rem;
  border: 1px solid #cccccc;
}
.vti__dropdown-list {
  z-index: 100;
}
.vti__input {
  border-radius: 50px;
}

.pac-item {
  padding: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ececec;
  }
}

.pac-item-query {
  font-size: 14px;
}
</style>