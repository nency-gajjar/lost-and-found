<template>
  <div class="wrapper">
    <div>
      <div class="card">
        <div
          class="space-y-4 text-[#757D8A] font-bold tracking-wide text-center"
        >
          SENDER'S DETAILS
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
              <BaseInput
                v-model="address"
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
                <BaseSelect
                  v-model="state"
                  :options="stateArr"
                  label="State"
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
              <ValidationProvider v-slot="{ errors }" class="block col-span-1">
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
              FOUND ITEM DETAILS
            </div>
            <ValidationProvider
              v-slot="{ validate, errors }"
              rules="required|image"
              class="block"
            >
              <label
                class="block mb-2 text-sm font-medium text-gray-800"
                for="itemImage"
                >Found item image</label
              >
              <input
                @change="validate"
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
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2
                px-10
                rounded
              "
            >
              Submit
            </button>
          </form>
          <!-- <button
            type="submit"
            class="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-10
              rounded
            "
            @click="downloadTestPDF"
          >
            Download
          </button> -->
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseSelect from "~/components/base/BaseSelect.vue";
import formatPhoneNumber from "~/mixins/formatPhoneNumber";
import { debounce } from "lodash";

export default {
  mixins: [formatPhoneNumber],
  data: () => ({
    venueName: "",
    venueEmail: "",
    autoSelectAddress: "",
    autoSelectCity: "",
    autoSelectState: "",
    autoSelectCountry: "",
    autoSelectZipcode: "",
    stateArr: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry",
    ],
    manualVenue: "",
    venue: "",
    venueArr: ["Hotel", "Restaurent", "Airport", "Other"],
    venuePhone: "",
    employeePhone: "",
    foundDate: new Date().toISOString().slice(0, 10),
    venueManually: false,
    itemDescription: "",
    itemDescriptionArr: [
      "Laptop",
      "Mobile",
      "Electronics",
      "Headphones",
      "Headset",
    ],
    packageType: "",
    packageTypeArr: ["Box", "Envelope"],
    weight: "2.4 kg",
    dimension: "60 cm X 45 cm",
    itemStatus: "",
    itemStatusArr: ["Claimed", "Unclaimed"],
    showReceiverInputs: false,
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    responseData: [],
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
    BaseInput,
    BaseSelect,
  },
  computed: {
    address: {
      get() {
        if (this.responseData.length > 0) {
          return this.responseData[0].address || "";
        }
        return;
      },
      set(value) {
        this.autoSelectAddress = value;
      },
    },
    city: {
      get() {
        if (this.responseData.length > 0) {
          return this.responseData[0].city || null;
        }
        return;
      },
      set(value) {
        this.autoSelectCity = value;
      },
    },
    state: {
      get() {
        if (this.responseData.length > 0) {
          return this.responseData[0].state || null;
        }
        return;
      },
      set(value) {
        this.autoSelectState = value;
      },
    },
    country: {
      get() {
        if (this.responseData.length > 0) {
          return this.responseData[0].country || null;
        }
        return;
      },
      set(value) {
        this.autoSelectCountry = value;
      },
    },
    zipcode: {
      get() {
        if (this.responseData.length > 0) {
          return this.responseData[0].zipcode || null;
        }
        return;
      },
      set(value) {
        this.autoSelectZipcode = value;
      },
    },
  },
  methods: {
    debouncedGetData: debounce(function (type) {
      this.getData(type);
    }, 800),
    async getData(type) {
      const params = {
        // TODO: current lat long
        lat: "21.171168",
        long: "72.790264",
      };
      if (type === "name") params.place = this.venueName;
      else if (type === "email") params.place = this.venueEmail;
      else if (type === "phoneno") params.mobileno = this.venuePhone;

      // let responseData = [];
      await this.$axios.get("/autofilladdress", { params }).then(({ data }) => {
        if (!data.error) {
          this.responseData.push(...data.data);
        }
      });
    },

    // Ref
    async downloadTestPDF() {
      await this.$axios({
        url: "/storelostitem", // download file link goes here
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.pdf");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        console.log("not valid");
      } else {
        console.log("valid");

        // Sample Request payload
        const data = {
          venu_type: "Hotel",
          date: "2022-10-11",
          venue_name: "GNINE",
          venue_email: "gninehospitality@gmail.com",
          venue_phone_no: "9109512266600",
          employee_mobile_no: "919624863068",
          address:
            "328, Sector A, Mahalaxmi Nagar, Indore, Madhya Pradesh 452010, India",
          city: "Indore",
          state: "Madhya Pradesh",
          country: "India",
          zipcode: "452010",
          image:
            "https://landf.s3.amazonaws.com/images/2022-09-30T12%3A58%3A59.494Z.jpeg?AWSAccessKeyId=AKIAT7JZ55LI27TARXOG&Expires=1664543639&Signature=AasFA02GhZtrQPQqNou50CkdbXQ%3D",
          item_description: "Laptop",
          package_type: "Box",
          weight: "2.4 kg",
          dimensions: "60 cm X 45 cm",
          item_status: 0,
          receiver_name: "prem",
          receiver_email: "prem.panwala@bacancy.com",
          receiver_mobile_no: "916355537257",
        };

        await this.$axios({
          url: "/storelostitem",
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          responseType: "blob",
          data,
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "file.pdf");
          document.body.appendChild(fileLink);

          fileLink.click();
        });
      }
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
  },
};
</script>

<style scoped>
.wrapper {
  @apply min-h-screen flex justify-center pt-24 mx-auto pb-24;
}
</style>