<template>
  <div class="wrapper-form">
    <div v-show="!showFilledDetails">
      <div class="card">
        <div
          class="space-y-4 text-[#757D8A] font-bold tracking-wide text-center"
        >
          {{ senderFormTitle }}
        </div>
        <ValidationObserver v-slot="{ validate }" ref="observer">
          <form
            class="space-y-4 mt-11 p-2"
            @submit.prevent="validate().then(onSubmit)"
          >
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
                label="Venue Name"
                :class="errors.length > 0 && 'error'"
                @input="debouncedGetData('name')"
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
                @input="debouncedGetData('email')"
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
              rules="required|us_phone|max:100"
              class="block"
            >
              <BaseInput
                v-model="venuePhone"
                type="text"
                label="Venue Phone No."
                :class="errors.length > 0 && 'error'"
                @input="debouncedGetData('phoneno')"
                @blur="
                  () => {
                    venuePhone = formatPhoneNumber(venuePhone)
                      ? formatPhoneNumber(venuePhone)
                      : venuePhone;
                  }
                "
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
              rules="required|us_phone|max:100"
              class="block"
            >
              <BaseInput
                v-model="employeePhone"
                type="text"
                label="Employee Mobile No."
                :class="errors.length > 0 && 'error'"
                @blur="
                  () => {
                    employeePhone = formatPhoneNumber(employeePhone)
                      ? formatPhoneNumber(employeePhone)
                      : employeePhone;
                  }
                "
              />

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
              rules="max:100|address"
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
              rules="max:500|address"
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

            <div
              class="
                space-y-4
                text-[#757D8A]
                font-bold
                tracking-wide
                text-center
              "
            >
              {{ foundItemFormTitle }}
            </div>
            <ValidationProvider
              v-slot="{ errors }"
              ref="imageValidationProvider"
              rules="required|image"
              class="block"
            >
              <label
                class="block mb-2 text-sm font-medium text-gray-800"
                for="itemImage"
                >Found item image</label
              >
              <input
                @change="uploadImg($event)"
                class="
                  block
                  w-full
                  text-lg text-gray-800
                  bg-white
                  rounded-lg
                  border border-gray-800
                  cursor-pointer
                  focus:outline-none
                "
                id="itemImage"
                type="file"
              />
              <p
                v-if="errors.length"
                class="vee-validation-error mt-2 text-sm text-red-600"
              >
                {{ errors[0] }}
              </p>
            </ValidationProvider>
            <div
              class="top-margin-3 flex justify-center"
              v-if="loadingSpinner"
              role="status"
            >
              <svg
                aria-hidden="true"
                class="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600"
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
            <p v-if="imageSaved" class="top-margin-3 text-lime-500">
              Image saved successfully!
            </p>
            <p v-if="imageNotSaved" class="top-margin-3 text-red-600">
              Something went wrong! Try again.
            </p>
            <div class="block" v-show="showEditor">
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
                rules="required|us_phone|max:100"
                class="block"
              >
                <BaseInput
                  v-model="receiverPhone"
                  type="text"
                  label="Receiver Mobile No."
                  :class="errors.length > 0 && 'error'"
                  @blur="
                    () => {
                      receiverPhone = formatPhoneNumber(receiverPhone)
                        ? formatPhoneNumber(receiverPhone)
                        : receiverPhone;
                    }
                  "
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </template>
            <button
              type="submit"
              class="
                bg-indigo-500
                hover:bg-indigo-700
                text-white
                font-bold
                py-2
                px-10
                rounded
              "
            >
              Submit
            </button>
            <button
              type="submit"
              class="
                bg-indigo-500
                hover:bg-indigo-700
                text-white
                font-bold
                py-2
                px-10
                rounded
              "
              @click="showPreviewPage"
            >
              Preview
            </button>
          </form>

          <!-- Modal -->
          <div
            v-show="showConfirmModal"
            class="fixed z-10 overflow-y-auto top-0 w-full left-0"
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
                sm:block sm:p-0
              "
            >
              <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-900 opacity-75" />
              </div>
              <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
                >&#8203;</span
              >
              <div
                class="
                  inline-block
                  align-center
                  bg-white
                  rounded-lg
                  text-left
                  overflow-hidden
                  shadow-xl
                  transform
                  transition-all
                  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
                "
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div
                  class="
                    w-full
                    max-w-lg
                    p-3
                    relative
                    mx-auto
                    my-auto
                    rounded-xl
                    shadow-lg
                    bg-white
                  "
                >
                  <div>
                    <div
                      class="text-center p-3 flex-auto justify-center leading-6"
                    >
                      <img
                        src="@/assets/icons/alert-circle.svg"
                        class="m-auto"
                      />
                      <h2 class="text-2xl font-bold py-4">Are you sure?</h2>
                      <p class="text-md text-gray-500 px-8">
                        Do you want to continue and proceed?
                      </p>
                    </div>
                    <div class="p-3 mt-2 text-center space-x-4 md:block">
                      <button
                        class="
                          mb-2
                          md:mb-0
                          bg-white
                          px-5
                          py-2
                          text-sm
                          shadow-sm
                          font-medium
                          tracking-wider
                          border
                          text-gray-600
                          rounded-md
                          hover:shadow-lg hover:bg-gray-100
                        "
                        @click="closeClicked"
                      >
                        Close
                      </button>
                      <button
                        class="
                          mb-2
                          md:mb-0
                          bg-indigo-500
                          border border-indigo-500
                          px-5
                          py-2
                          text-sm
                          shadow-sm
                          font-medium
                          tracking-wider
                          text-white
                          rounded-md
                          hover:shadow-lg hover:bg-indigo-600
                        "
                        @click="generatePdf"
                      >
                        Generate Label Tag
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ValidationObserver>
      </div>
    </div>

    <!-- <div class="card previewCard p-7" v-show="showFilledDetails">
      <div>
        <h2 class="mt-5 mb-5">Your details submitted successfully!</h2> -->
    <!-- <h3 class="mt-3.5 mb-3.5"> -->
    <!-- <NuxtLink to="/found-items">Found Items</NuxtLink> -->
    <!-- </h3> -->
    <!-- <div>
          <p>Item Description: {{ itemDescription }}</p>
          <button
            type="button"
            @click="editDetails"
            class="
              bg-indigo-500
              hover:bg-indigo-700
              text-white
              font-bold
              py-2
              mt-3.5
              px-10
              rounded
            "
          >
            Edit Details
          </button>
        </div> -->
    <!-- </div>
    </div> -->
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseSelect from "~/components/base/BaseSelect.vue";
import formatPhoneNumber from "~/mixins/formatPhoneNumber";
import { debounce } from "lodash";
import Editor from "~/components/vueImageEditor/Editor.vue";
import VSelect from "vue-select";
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
  mixins: [formatPhoneNumber],
  data: () => ({
    showConfirmModal: false,
    senderFormTitle: "",
    foundItemFormTitle: "",
    venueName: "",
    venueEmail: "test@gmail.com",
    manualAddressSelected: false,
    manualAddress: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    manualVenue: "",
    venue: "Hotel",
    venueArr: ["Hotel", "Restaurent", "Airport", "Other"],
    venuePhone: "(940) 816-4313",
    employeePhone: "(940) 816-4313",
    foundDate: new Date().toISOString().slice(0, 10),
    venueManually: false,
    itemDescription: "Laptop",
    itemDescriptionArr: [
      "Laptop",
      "Mobile",
      "Electronics",
      "Headphones",
      "Headset",
    ],
    packageType: "Box",
    packageTypeArr: ["Box", "Envelope"],
    weight: "2.4 kg",
    dimension: "60 cm X 45 cm",
    itemStatus: "Unclaimed",
    itemStatusArr: ["Claimed", "Unclaimed"],
    showReceiverInputs: false,
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    responseData: [],
    itemImage: "",
    canvasWidth: "600",
    canvasHeight: "600",
    showEditor: false,
    stateCrop: true,
    size_icon: "2x",
    showFilledDetails: false,
    loadingSpinner: false,
    imageSaved: false,
    imageNotSaved: false,
    imageRecognitionData: [],
    image: "",
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
    addressArr() {
      if (this.responseData.length == 0) {
        this.address = "Other";
        this.manualAddressSelected = true;
      }
      let addressLineArr = this.responseData.map((addressObj) => {
        return addressObj.address;
      });
      addressLineArr.push("Other");
      this.address = addressLineArr[0];
      return addressLineArr;
    },
  },
  methods: {
    showPreviewPage() {
      this.$router.push({ path: "/detail-confirmation" });
    },
    setItemDetails(value) {
      switch (value) {
        case "Laptop":
          this.packageType = "Box";
          this.weight = "2.4 kg";
          this.dimension = "60 cm X 45 cm";
          break;
        case "Mobile Phone":
          this.packageType = "Box";
          this.weight = "0.4 kg";
          this.dimension = "30 cm X 15 cm";
          break;
        case "Driving Licence":
          this.packageType = "Box";
          this.weight = "0.05 kg";
          this.dimension = "5 cm X 10 cm";
          break;
      }
    },
    debouncedGetData: debounce(function (type) {
      this.getData(type);
    }, 800),

    async getData(type) {
      let lat, long;

      let locationPromise = new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          // console.log(lat + ", "+long);
          resolve({ lat, long });
        });
      });

      locationPromise.then(async (value) => {
        const params = {
          lat: value.lat,
          long: value.long,
        };

        console.log(params);

        if (type === "name") params.place = this.venueName;
        else if (type === "email") params.place = this.venueEmail;
        else if (type === "phoneno") params.mobileno = this.venuePhone;

        // let responseData = [];
        await this.$axios
          .get("/autofilladdress", { params })
          .then(({ data }) => {
            if (!data.error) {
              this.responseData.push(...data.data);
            }
          });
      });
    },
    async generatePdf() {
      const params = {
        venu_type:
          this.venueType === "Other" ? this.manualVenue : this.venueType,
        date: this.foundItemDate,
        venue_name: this.venueName,
        venue_email: this.venueEmail,
        venue_phone_no: this.venuePhone,
        employee_mobile_no: this.employeePhone,
        address: this.address,
        city: this.city,
        state: this.state,
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
        params.receiver_name = this.receiverName;
        params.receiver_email = this.receiverEmail;
        params.receiver_mobile_no = this.receiverPhone;
      }
      this.$store.commit("item/SET_ITEM_DETAILS", params);
      this.$axios
        .post("/storelostitem", params, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/pdf",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "file.pdf");
            document.body.appendChild(link);
            link.click();
          }
          this.$router.push({ path: "/detail-confirmation" });
        })
        .catch((error) => console.log(error));
    },
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        console.log("not valid");
      } else {
        console.log("valid");
        this.showConfirmModal = true;
        // this.showFilledDetails = true;
        // Sample Request payload
      }
    },
    closeClicked() {
      this.showConfirmModal = false;
    },
    // editDetails() {
    //   let userId = "12345678";
    //   this.$router.push({ path: "/edit/sender-details", query: { userId } });
    // },
    undo() {
      this.$refs.editor.undo();
    },
    redo() {
      this.$refs.editor.redo();
    },
    deleteEditable() {
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
      const { valid } = await this.$refs.imageValidationProvider.validate(
        event
      );
      if (valid) {
        console.log(event.target.files[0]);
        if (event.target.files[0]) {
          this.$refs.editor.uploadImage(event);
          this.loadingSpinner = true;
          setTimeout(() => {
            this.loadingSpinner = false;
            this.showEditor = true;
          }, 2000);
        } else {
          this.showEditor = false;
        }
      }
    },
    saveImg() {
      const file = this.$refs.editor.saveImage();
      this.$axios.post("/demo", { file }).then((response) => {
        if (response.status === 200) {
          console.log("===image resp", response.data);
          this.imageRecognitionData = response.data.data;
          this.itemDescription = response.data.data[0].name;
          this.image =
            this.imageRecognitionData[
              this.imageRecognitionData.length - 1
            ].image;
        }
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
        if (newAddress == "Other") {
          this.manualAddressSelected = true;
          this.manualAddress = "";
          this.city = "";
          this.state = "";
          this.country = "";
          this.zipcode = "";
        } else {
          this.manualAddressSelected = false;
          let index = this.responseData.findIndex((addressObj) => {
            return addressObj.address == newAddress;
          });
          if (index != -1) {
            this.city = this.responseData[index].city;
            this.state = this.responseData[index].state;
            this.country = this.responseData[index].country;
            this.zipcode = this.responseData[index].zipcode;
          }
        }
      }
    },
    itemDescription(value) {
      switch (value) {
        case "Laptop":
          this.packageType = "Box";
          this.weight = "2.4 kg";
          this.dimension = "60 cm X 45 cm";
          break;
        case "Mobile Phone":
          this.packageType = "Box";
          this.weight = "0.4 kg";
          this.dimension = "30 cm X 15 cm";
          break;
        case "Driving Licence":
          this.packageType = "Box";
          this.weight = "0.05 kg";
          this.dimension = "5 cm X 10 cm";
          break;
      }
    },
  },
  mounted() {
    if (this.$route.query.id) {
      console.log(this.$route.query.id);
      this.senderFormTitle = "EDIT SENDER'S DETAILS";
      this.foundItemFormTitle = "EDIT FOUND ITEM'S DETAILS";
      this.$axios.get("/getsinglelostitem?id="+this.$route.query.id)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            let responseData = response.data.data.Item;
            this.venueName = responseData.venue_name;
            this.venueEmail = responseData.venue_email;
            // this.manualVenue = "abc1";
            this.venue = "Hotel"; // not found in api response
            this.address = "Other"; // not found in api response
            this.manualAddress = responseData.address;
            this.city = responseData.city;
            this.state = responseData.state;
            this.country = responseData.country;
            this.zipcode = responseData.zipcode;
            this.venuePhone = responseData.venue_phone_no;
            this.employeePhone = responseData.employee_mobile_no;
            this.foundDate = new Date().toISOString().slice(0, 10); // not found in api response
            this.itemDescription = responseData.item_description;
            this.packageType = responseData.package_type;
            this.weight = responseData.weight;
            this.dimension = responseData.dimensions;
            this.itemStatus = responseData.item_status == 0 ? "Claimed" : "Unclaimed";
            this.receiverName = responseData.receiver_name;
            this.receiverEmail = responseData.receiver_email;
            this.receiverPhone = responseData.receiver_mobile_no;
          }
        })
        .catch((error) => console.log(error));
    } else {
      this.senderFormTitle = "SENDER'S DETAILS";
      this.foundItemFormTitle = "FOUND ITEM'S DETAILS";
    }
  },
};
</script>

<style lang="scss">
.wrapper-form {
  @apply min-h-screen flex justify-center pt-24 mx-auto pb-24;
}

.editor-tools {
  @apply flex w-full justify-around;
  max-width: 600px;
  margin-bottom: 20px;
}

.custom-editor {
  @apply flex justify-center;
  border: 1px solid #000000;
  background-color: #ffffff;
}

.editor-tools div {
  cursor: pointer;
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
}
.upper-canvas {
  margin: 0px 0px;
  min-width: 600px !important;
  height: 600px;
}
.lower-canvas {
  min-width: 600px !important;
  height: 600px;
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
    width: 500px !important;
    height: 500px !important;
  }
}

@media only screen and (max-width: 510px) {
  .canvas-container,
  .upper-canvas,
  .lower-canvas {
    min-width: 0 !important;
    width: 400px !important;
    height: 400px !important;
  }
}

@media only screen and (max-width: 410px) {
  .canvas-container,
  .upper-canvas,
  .lower-canvas {
    min-width: 0 !important;
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
</style>