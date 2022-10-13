<template>
  <div class="wrapper">
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
     <div v-if="!isLoadingItemDetails || Object.keys(itemDetails).length > 0">
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
                {{ senderFormTitle }}
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
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="block"
            >
              <BaseSelect
                v-model="venue"
                :options="venueArr"
                label="Sender Affiliation"
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
              v-if="venueManually"
              v-slot="{ errors }"
              rules="required"
              class="block"
            >
              <BaseInput
                v-model="manualVenue"
                type="text"
                label="Type here manually..."
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
                v-model="foundDate"
                type="date"
                label="Found Item Date"
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
              rules="max:100|venueName"
              class="block"
            >
              <BaseInput
                v-model="venueName"
                type="text"
                :label="displayVenueName"
                :class="errors.length > 0 && 'error'"
                @blur="debouncedGetData('name')"
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
            >
              <BaseInput
                v-model="venueEmail"
                type="email"
                label="Venue Email"
                :class="errors.length > 0 && 'error'"
                @blur="debouncedGetData('email')"
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
              <div class="block relative box-content h-12">
                <vue-tel-input
                  :inputOptions="{ placeholder: 'Your Phone No.' }"
                  :class="errors.length > 0 && 'error'"
                  class="
                    relative
                    border
                    inline-block
                    border-gray-300
                    w-full
                    rounded-lg
                    h-full
                  "
                  v-model="venuePhone"
                  v-bind="bindPhoneInputProps"
                  @country-changed="countryChanged"
                ></vue-tel-input>
              </div>
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
              <div class="block relative box-content h-12">
                <vue-tel-input
                  :inputOptions="{ placeholder: 'Employee Mobile No.' }"
                  class="
                    relative
                    border
                    inline-block
                    border-gray-300
                    w-full
                    rounded-lg
                    h-full
                  "
                  v-model="employeePhone"
                  v-bind="bindPhoneInputProps"
                  @country-changed="countryChanged"
                ></vue-tel-input>
              </div>
              <p
                v-if="errors.length"
                class="vee-validation-error mt-2 text-sm text-red-600"
              >
                {{ errors[0] }}
              </p>
            </ValidationProvider>
            <p>Address:</p>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="block"
            >
              <v-select
                v-model="address"
                :options="addressArr"
                class="rounded-lg"
                :class="errors.length > 0 && 'error'"
              ></v-select>
              <p
                v-if="errors.length"
                class="vee-validation-error mt-2 text-sm text-red-600"
              >
                {{ errors[0] }}
              </p>
            </ValidationProvider>
            <ValidationProvider
              v-if="manualAddressSelected"
              v-slot="{ errors }"
              rules="required"
              class="block"
            >
              <BaseInput
                v-model="manualAddress"
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
          </div>
          <div class="flex mt-2">
            <span
              class="w-full border-t border-solid border-gray-200 inline-block"
            ></span>
          </div>
          <div class="card p-6 space-y-4">
            <div class="form-title">
              <h1
                class="
                  w-full
                  text-xl
                  font-bold
                  leading-tight
                  text-gray-700
                  mb-3
                "
              >
                {{ foundItemFormTitle }}
              </h1>
              <div class="flex justify-start">
                <span
                  class="
                    w-20
                    border-t-4 border-solid border-orange-200
                    inline-block
                  "
                ></span>
              </div>
            </div>

            <div class="block">
              <label
                class="block mb-2 text-sm font-medium text-gray-800"
                for="itemImage"
                >Found item image</label
              >
              <div class="h-12">
                <input
                  @change="uploadImg($event)"
                  class="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded-lg
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700
                    focus:bg-white
                    focus:border-blue-600
                    focus:outline-none
                  "
                  id="itemImage"
                  type="file"
                />
              </div>
            </div>
            <p v-if="imageSaved" class="top-margin-3 text-lime-500">
              Image saved successfully!
            </p>
            <p v-if="imageNotSaved" class="top-margin-3 text-red-600">
              Something went wrong! Try again.
            </p>
            <div
              v-show="showEditor"
              class="fixed z-50 top-0 w-full left-0"
              id="modal"
            >
              <div
                class="
                  flex
                  items-center
                  justify-center
                  min-height-100vh
                  pt-4
                  px-4
                  pb-20
                  text-center
                  sm:p-0
                "
              >
                <div class="fixed inset-0 transition-opacity">
                  <div class="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span class="inline-block align-middle h-screen"
                  >&#8203;</span
                >
                <div
                  class="
                    inline-block
                    align-middle
                    bg-white
                    rounded-lg
                    text-left
                    overflow-hidden
                    shadow-xl
                    transform
                    transition-all
                    sm:my-8 sm:align-middle sm:max-w-screen-md sm:w-full
                  "
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div
                    class="
                      w-full
                      max-w-screen-md
                      p-3
                      relative
                      mx-auto
                      my-auto
                      rounded-xl
                      shadow-lg
                      bg-white
                      flex
                      justify-center
                      items-center
                      editor-container
                    "
                  >
                    <div
                      class="top-margin-3 flex justify-center"
                      v-show="loadingSpinner"
                      role="status"
                    >
                      <svg
                        aria-hidden="true"
                        class="mr-2 w-16 h-16 text-gray-200 animate-spin fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                    <div v-show="!loadingSpinner">
                      <div class="editor-tools">
                        <div class="tool-undo">
                          <rotate-ccw-icon
                            :size="size_icon"
                            @click="undo()"
                          ></rotate-ccw-icon>
                        </div>
                        <div class="tool-redo">
                          <rotate-cw-icon
                            :size="size_icon"
                            @click="redo()"
                          ></rotate-cw-icon>
                        </div>
                        <div class="tool-trash">
                          <trash-2-icon
                            :size="size_icon"
                            @click="deleteEditable()"
                          ></trash-2-icon>
                        </div>
                        <div class="tool-freeDrawing">
                          <edit-2-icon
                            :size="size_icon"
                            @click="freeDrawing()"
                          ></edit-2-icon>
                        </div>
                        <div class="tool-addCircle">
                          <circle-icon
                            :size="size_icon"
                            @click="addCicle()"
                          ></circle-icon>
                        </div>
                        <div class="tool-addSquare">
                          <square-icon
                            :size="size_icon"
                            @click="addSquare()"
                          ></square-icon>
                        </div>
                        <div class="tool-crop">
                          <maximize-icon
                            v-if="stateCrop"
                            :size="size_icon"
                            @click="crop()"
                          ></maximize-icon>
                          <check-icon
                            v-else
                            :size="size_icon"
                            @click="applyCrop()"
                          ></check-icon>
                        </div>
                        <div class="save-upload">
                          <save-icon :size="size_icon" @click="saveImg()"></save-icon>
                        </div>
                      </div>
                      <Editor
                        :canvasWidth="canvasWidth"
                        :canvasHeight="canvasHeight"
                        ref="editor"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                @input="setItemDetails"
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
                rules="required"
                class="block col-span-1"
              >
                <BaseSelect
                  v-model="packageType"
                  :options="packageTypeArr"
                  label="Package Type"
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
                rules="max:28|required"
                class="block lg:col-span-2"
              >
                <BaseInput
                  v-model="weight"
                  label="Weight"
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
              rules="max:28|required"
              class="block lg:col-span-2"
            >
              <BaseInput
                v-model="dimension"
                label="Dimension"
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
              class="block"
            >
              <BaseSelect
                v-model="itemStatus"
                :options="itemStatusArr"
                label="Item Status"
                :class="errors.length > 0 && 'error'"
              />
              <p
                v-if="errors.length"
                class="vee-validation-error mt-2 text-sm text-red-600"
              >
                {{ errors[0] }}
              </p>
            </ValidationProvider>
            <template v-if="showReceiverInputs">
              <ValidationProvider
                v-slot="{ errors }"
                rules="max:100|required"
                class="block"
              >
                <BaseInput
                  v-model="receiverName"
                  type="text"
                  label="Receiver's Name"
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
              >
                <BaseInput
                  v-model="receiverEmail"
                  type="email"
                  label="Receiver's Email"
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
                <div class="block relative box-content h-12">
                  <vue-tel-input
                    :inputOptions="{ placeholder: 'Receiver Mobile No.' }"
                    class="
                      relative
                      border
                      inline-block
                      border-gray-300
                      w-full
                      rounded-lg
                      h-full
                    "
                    v-model="receiverPhone"
                    v-bind="bindPhoneInputProps"
                    @country-changed="countryChanged"
                  ></vue-tel-input>
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </div>
              </ValidationProvider>
            </template>
            <div
              v-show="showValidateAlert"
              class="
                p-4
                mb-4
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
            <!-- onclick="this.classList.toggle('button--loading')" -->
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
                <span class="button__text"> Preview </span>
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
     </div>
     <div v-else>
        <div wire:loading class="h-screen z-50 overflow-hidden flex flex-col items-center justify-center">
	        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
     </div>
    </div>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseSelect from "~/components/base/BaseSelect.vue";
import { debounce } from "lodash";
import Editor from "~/components/vueImageEditor/Editor.vue";
import VSelect from "vue-select";
import { mapGetters } from "vuex";
import {
  CircleIcon,
  RotateCcwIcon,
  RotateCwIcon,
  Edit2Icon,
  Trash2Icon,
  SquareIcon,
  MaximizeIcon,
  SaveIcon,
  CheckIcon,
} from "vue-feather-icons";

export default {
  data: () => ({
    showValidateAlert: false,
    senderFormTitle: "",
    foundItemFormTitle: "",
    venueName: "",
    venueEmail: "",
    manualAddressSelected: false,
    manualAddress: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    manualVenue: "",
    venue: "",
    venueArr: ["Hotel", "Restaurent", "Airport", "Other"],
    venuePhone: "",
    employeePhone: "",
    foundDate: new Date().toISOString().slice(0, 10),
    venueManually: false,
    itemDescription: "",
    itemDescriptionArr: ["Laptop", "Mobile Phone", "Driving Licence"],
    packageType: "",
    packageTypeArr: ["Box", "Envelope"],
    weight: "",
    dimension: "",
    itemStatus: "",
    itemStatusArr: ["Claimed", "Unclaimed"],
    showReceiverInputs: false,
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    responseData: {
      venueName: [],
      venueEmail: [],
      venuePhone: [],
    },
    apiAddressData: [],
    itemImage: "",
    canvasWidth: "600",
    canvasHeight: "400",
    showEditor: false,
    stateCrop: true,
    size_icon: "2x",
    showFilledDetails: false,
    loadingSpinner: false,
    imageSaved: false,
    imageNotSaved: false,
    imageRecognitionData: [],
    image: "",
    imageKey: "",
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
    foundItemId: "",
    isLoading: false,
    isLoadingItemDetails: false,
    isAdmin: false
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
    BaseInput,
    BaseSelect,
    Editor,
    CircleIcon,
    RotateCcwIcon,
    RotateCwIcon,
    Edit2Icon,
    Trash2Icon,
    SquareIcon,
    MaximizeIcon,
    CheckIcon,
    SaveIcon,
    VSelect,
  },
  computed: {
    ...mapGetters("item", ["itemDetails"]),
    displayVenueName() {
      if (this.venue === "Restaurent") {
        return "Restaurent Name";
      } else if (this.venue === "Hotel") {
        return "Hotel Name";
      } else if (this.venue === "Airport") {
        return "Airport Name";
      } else {
        return "Venue Name";
      }
    },
    addressArr() {
      if (this.apiAddressData.length == 0 && !this.address) {
        this.address = "";
        this.manualAddressSelected = true;
      }
      let addressLineArr = this.apiAddressData.map((addressObj) => {
        return addressObj.address;
      });
      if (!this.address) {
        this.address = addressLineArr[0];
      }
      return addressLineArr;
    },
  },
  methods: {
    formatMobileNumber(phoneNumber){
      let arr = phoneNumber.split(" ");
      let countryCode = arr.shift();
      return countryCode + ' ' + arr.join('');
    },
    countryChanged(country) {
      // console.log("===countryChanged", country);
    },
    setItemDetails(value) {
      switch (value) {
        case "Laptop":
          this.packageType = "Box";
          this.weight = "5.29 lbs";
          this.dimension = "23.6 x 17.7 inch";
          break;
        case "Phone":
          this.packageType = "Box";
          this.weight = "0.88 lbs";
          this.dimension = "11.8 X 5.9 inch";
          break;
        case "Mobile Phone":
          this.packageType = "Box";
          this.weight = "0.88 lbs";
          this.dimension = "11.8 X 5.9 inch";
          break;
        case "Driving Licence":
          this.packageType = "Envelope";
          this.weight = "0.11 lbs";
          this.dimension = "1.9 X 3.9 inch";
          break;
      }
    },
    debouncedGetData: debounce(function (type) {
      this.getData(type);
    }, 1000),

    async getData(type) {
      let lat, long;

      let locationPromise = new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          resolve({ lat, long });
        });
      });
      // const params = {
      //   lat: "22.256471166295917",
      //   long: "70.80530507987775",
      // };


      locationPromise.then(async (value) => {
        const params = {
          lat: value.lat,
          long: value.long,
        };

      if (type === "name") {
        params.place = this.venueName;
        this.responseData.venueName = [];
      } else if (type === "email") {
        params.place = this.venueEmail;
        this.responseData.venueEmail = [];
      } else if (type === "phoneno") {
        params.mobileno = this.venuePhone;
        this.responseData.venuePhone = [];
      }

      await this.$axios.get("/autofilladdress", { params }).then(({ data }) => {
        if (!data.error) {
          if (type === "name") {
            if (this.venueName) {
              this.responseData.venueName.push(...data.data);
            }
          } else if (type === "email") {
            if (this.venueEmail) {
              this.responseData.venueEmail.push(...data.data);
            }
          } else if (type === "phoneno") {
            if (this.venuePhone) {
              this.responseData.venuePhone.push(...data.data);
            }
          }
          this.apiAddressData = [];
          this.apiAddressData.push(
            ...this.responseData.venueName,
            ...this.responseData.venuePhone,
            ...this.responseData.venueEmail
          );
        }
      });
      });
    },
    async onSubmit() {
      this.isLoading = true
      let venuePhoneNo = this.formatMobileNumber(this.venuePhone);
      let employeePhone = this.formatMobileNumber(this.employeePhone);
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.showValidateAlert = true;
        this.isLoading = false
        console.log("not valid");
      } else {
        console.log("valid");
        this.showValidateAlert = false;
        const params = {
          foundItemId: this.foundItemId,
          venu_type: this.venue === "Other" ? this.manualVenue : this.venue,
          datse: this.foundDate,
          venue_name: this.venueName,
          venue_email: this.venueEmail,
          venue_phone_no: venuePhoneNo,
          employee_mobile_no: employeePhone,
          address: this.address,
          city: this.city,
          states: this.state,
          country: this.country,
          zipcode: this.zipcode,
          image: this.image,
          item_description: this.itemDescription,
          package_type: this.packageType,
          weight: this.weight,
          dimensions: this.dimension,
          item_status: this.itemStatus === "Claimed" ? 0 : 1,
        };
        if (this.itemStatus === "Claimed") {
          let receiverPhone = this.formatMobileNumber(this.receiverPhone);
          params.receiver_name = this.receiverName;
          params.receiver_email = this.receiverEmail;
          params.receiver_mobile_no = receiverPhone;
        }
        this.$store.commit("item/SET_ITEM_DETAILS", {
          ...params,
          image: this.image,
        });   
        
        setTimeout(() => {
          this.isLoading = false
          this.$nextTick(() => {
            if (this.isAdmin) {
              this.$router.push({ path: "admin/detail-confirmation" });
            } else {
              this.$router.push({ path: "/detail-confirmation" });
            }
        });
        }, 1000);

      
      }
    },
    resetForm() {
      console.log("======Reset");
    },
    undo() {
      this.$refs.editor.undo();
    },
    redo() {
      this.$refs.editor.redo();
    },
    deleteEditable() {
      this.$axios
        .post("/removes3files", { key: this.imageKey })
        .then((response) => {
          if (response.status === 200) {
            console.log("===remove file response", response);
          }
        });
      this.$refs.editor.clear();
      this.showEditor = false;
      this.stateCrop = true;
    },
    freeDrawing() {
      let customizeFreeDrawing = { stroke: "black", strokeWidth: "5" };
      this.$refs.editor.set("freeDrawing", customizeFreeDrawing);
    },
    addCicle() {
      let circleModeParams = { fill: "black", stroke: "black" };
      this.$refs.editor.set("circle", circleModeParams);
    },
    addSquare() {
      let customizeRectangle = {
        fill: "black",
        stroke: "black",
        strokeWidth: 1,
      };
      this.$refs.editor.set("rect", customizeRectangle);
    },
    crop() {
      let cropModeOptions = {
        width: "100",
        height: "100",
        overlayOpacity: "0",
        hasControls: true,
      };
      this.$refs.editor.set("crop", cropModeOptions);
      this.stateCrop = false;
    },
    applyCrop() {
      this.$refs.editor.applyCropping();
      this.stateCrop = true;
    },
    async uploadImg(event) {
      this.showEditor = false;
      if (event.target.files[0]) {
        this.$refs.editor.uploadImage(event);
        this.showEditor = true;
        this.loadingSpinner = true;
        setTimeout(() => {
          this.loadingSpinner = false;
        }, 2000);
      } else {
        this.showEditor = false;
      }
    },
    saveImg() {
      const file = this.$refs.editor.saveImage();
      this.$axios.post("/demo", { file }).then((response) => {
        if (response.status === 200) {
          this.imageRecognitionData = response.data.data;
          this.itemDescription = response.data.data[0].name;
          this.image =
            this.imageRecognitionData[
              this.imageRecognitionData.length - 1
            ].image;

          this.imageKey =
            this.imageRecognitionData[this.imageRecognitionData.length - 2].key;
        }
        this.showEditor = false;
      });
    },
  },
  watch: {
    venue(newValue, oldValue) {
      if (newValue != oldValue) {
        if (newValue == "Other") {
          this.venueManually = true;
        } else {
          this.venueManually = false;
        }
      }
    },
    itemStatus(newValue, oldValue) {
      if (newValue != oldValue) {
        if (newValue == "Claimed") {
          this.showReceiverInputs = true;
        } else {
          this.showReceiverInputs = false;
        }
      }
    },
    address(newAddress, oldAddress) {
      if (newAddress != oldAddress) {
        if (!newAddress) {
          this.manualAddressSelected = true;
          this.manualAddress = "";
          this.city = "";
          this.state = "";
          this.country = "";
          this.zipcode = "";
        } else {
          this.manualAddressSelected = false;
          let index = this.apiAddressData.findIndex((addressObj) => {
            return addressObj.address == newAddress;
          });
          if (index != -1) {
            this.city = this.apiAddressData[index].city;
            this.state = this.apiAddressData[index].state;
            this.country = this.apiAddressData[index].country;
            this.zipcode = this.apiAddressData[index].zipcode;
          }
        }
      }
    },
    itemDescription(value) {
      switch (value) {
        case "Laptop":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.weight = this.weight ? this.weight : "2.4 kg";
          this.dimension = this.dimension ? this.dimension : "60 cm X 45 cm";
          break;
        case "Mobile Phone":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.weight = this.weight ? this.weight : "0.4 kg";
          this.dimension = this.dimension ? this.dimension : "30 cm X 15 cm";
          break;
        case "Phone":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.weight = this.weight ? this.weight : "0.4 kg";
          this.dimension = this.dimension ? this.dimension : "30 cm X 15 cm";
        case "Driving Licence":
          this.packageType = this.packageType ? this.packageType : "Envelope";
          this.weight = this.weight ? this.weight : "0.05 kg";
          this.dimension = this.dimension ? this.dimension : "5 cm X 10 cm";
          break;
      }
    },
  },
  created() {
    this.$root.$on("detail-submitted", (data) => {
      if (data) {
        this.resetForm();
      }
    });
  },
  mounted() {
    if (this.$route.query.id) {
      this.isLoadingItemDetails = true
      this.foundItemId = this.$route.query.id;
      this.senderFormTitle = "EDIT SENDER'S DETAILS";
      this.foundItemFormTitle = "EDIT FOUND ITEM'S DETAILS";
      this.$axios
        .get("/getsinglelostitem?id=" + this.$route.query.id)
        .then((response) => {
          if (response.status === 200) {
            this.isLoadingItemDetails = false
            let responseData = response.data.data.Item;

            var index = this.venueArr.indexOf(responseData.venu_type) !== -1;
            if (index) this.venue = responseData.venu_type;
            else {
              this.venue = "Other";
              this.manualVenue = responseData.venu_type;
            }
            this.venueName = responseData.venue_name;
            this.venueEmail = responseData.venue_email;
            this.address = responseData.address;
            this.manualAddress = responseData.address;
            this.city = responseData.city;
            this.image = responseData.image;
            this.state = responseData.states;
            this.country = responseData.country;
            this.zipcode = responseData.zipcode;
            this.venuePhone = responseData.venue_phone_no;
            this.employeePhone = responseData.employee_mobile_no;
            this.foundDate = new Date().toISOString().slice(0, 10);
            this.itemDescription = responseData.item_description;
            this.packageType = responseData.package_type;
            this.weight = responseData.weight;
            this.dimension = responseData.dimensions;
            this.itemStatus =
              responseData.item_status == 0 ? "Claimed" : "Unclaimed";
            this.receiverName = responseData.receiver_name;
            this.receiverEmail = responseData.receiver_email;
            this.receiverPhone = responseData.receiver_mobile_no;
          }
        })
        .catch((error) => console.log(error));
    } else if (this.$route.params?.itemDetails) {
      if(this.$route.params?.isAdmin) this.isAdmin = true 
      this.senderFormTitle = "EDIT SENDER'S DETAILS";
      this.foundItemFormTitle = "EDIT FOUND ITEM'S DETAILS";
      let data = this.$route.params.itemDetails;
      var index = this.venueArr.indexOf(data.venu_type) !== -1;
      if (index) this.venue = data.venu_type;
      else {
        this.venue = "Other";
        this.manualVenue = data.venu_type;
      }
      this.foundItemId = data.foundItemId;
      this.foundDate = data.datse;
      this.venueName = data.venue_name;
      this.venueEmail = data.venue_email;
      this.venuePhone = data.venue_phone_no;
      this.employeePhone = data.employee_mobile_no;
      this.address = data.address;
      this.city = data.city;
      this.state = data.states;
      this.country = data.country;
      this.zipcode = data.zipcode;
      this.image = data.image;
      this.itemDescription = data.item_description;
      this.packageType = data.package_type;
      this.weight = data.weight;
      this.dimension = data.dimensions;
      this.itemStatus = data.item_status === 0 ? "Claimed" : "Unclaimed";

      if (data.item_status === 0) {
        this.receiverName = data.receiver_name;
        this.receiverEmail = data.receiver_email;
        this.receiverPhone = data.receiver_mobile_no;
      }
    } else {
      this.senderFormTitle = "SENDER'S DETAILS";
      this.foundItemFormTitle = "FOUND ITEM'S DETAILS";
    }
  },
};
</script>

<style lang="scss">
.wrapper {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}

.editor-container{
  min-width: 200px;
  min-height: 200px;
}

.editor-tools {
  @apply flex flex-wrap w-full justify-around;
  margin-bottom: 20px;
}

.custom-editor {
  @apply flex justify-center;
  border: 1px solid #000000;
  background-color: #ffffff;
}

.editor-tools {
  div{
    cursor: pointer;
    border: 1px solid #808080;
    border-radius: 14px;
    &:hover{
      background: #dfdfdf;
    }
    padding: 8px;
    background-color: #f3f3f3;
    margin-bottom: 5px;
  }
}

.previewCard h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: revert;
  font-weight: revert;
}

canvas {
  width: 0 !important;
  object-fit: contain;
}
.canvas-container {
  width: 100% !important;
}
.canvas-container{
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 500px !important;
  min-height: 384px;
}
.upper-canvas {
  margin: 0px 0px;
  min-width: 500px !important;
  min-height: 384px;
}
.lower-canvas {
  min-width: 500px !important;
  min-height: 384px;
  position: static !important;
}

.vs__dropdown-toggle {
  @apply h-12 rounded-lg;
}

.error {
  & > div {
    @apply text-red-500;
  }
  .vs__dropdown-toggle {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
  }
}

.top-margin-3 {
  margin-top: 3px !important;
}

@media only screen and (max-width: 650px) {
  .canvas-container,
  .upper-canvas,
  .lower-canvas {
    min-width: 0 !important;
    min-height: 0 !important;
    width: 500px !important;
    height: 384px !important;
  }
}

@media only screen and (max-width: 510px) {
  .canvas-container,
  .upper-canvas,
  .lower-canvas {
    min-width: 0 !important;
    min-height: 0 !important;
    width: 350px !important;
    height: 350px !important;
  }
}

@media only screen and (max-width: 410px) {
  .canvas-container,
  .upper-canvas,
  .lower-canvas {
    min-width: 0 !important;
    min-height: 0 !important;
    width: 300px !important;
    height: 300px !important;
  }
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}

.fade-leave-to {
  opacity: 0;
}
.vue-tel-input {
  border-radius: 0.5rem;
  overflow: hidden;
}
.vs__actions svg {
  display: none;
}
.vs__actions {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23737373' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  width: 26px;
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

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}

.loader {
	border-top-color:orange;
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

</style>