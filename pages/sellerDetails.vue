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
              <UiSelect
                v-model="venue"
                :options="venueArr"
                label="Venue"
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
              <UiInput
                v-model="manualVenue"
                type="text"
                label="Venue"
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
              <UiInput
                v-model="foundDate"
                type="date"
                label="Item Found Date"
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
              <UiInput
                v-model="venueName"
                type="text"
                label="Venue Name"
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
              <UiInput
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
              rules="required|us_phone|max:100"
              class="block"
            >
              <UiInput
                v-model="venuePhone"
                type="text"
                label="Venue Phone No."
                :class="errors.length > 0 && 'error'"
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
              <UiInput
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
              <UiInput
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
                <UiInput
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
                <UiSelect
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
                <UiInput
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
                v-slot="{ errors }"
                rules="required|zip"
                class="block col-span-1"
              >
                <UiInput
                  v-model="zip"
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
            @click="downloadTestPDF"
          >
            Download
          </button>
        </ValidationObserver>
      </div>
      <div class="card mt-6">
        <div
          class="space-y-4 text-[#757D8A] font-bold tracking-wide text-center"
        >
          FOUND ITEM DETAILS
        </div>
        <ValidationObserver v-slot="{ validate }" ref="observerItem">
          <form
            class="space-y-4 mt-11 p-2"
            @submit.prevent="validate().then(onSubmitItemDetails)"
          >
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
                ref="itemImageRef"
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
              <UiSelect
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
                <UiSelect
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
                <UiInput
                  v-model="weightAndDimension"
                  label="Weight And Dimension"
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
              rules="required"
              class="block"
            >
              <UiSelect
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
                <UiInput
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
                <UiInput
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
                <UiInput
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
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import UiInput from "~/components/ui/input.vue";
import UiSelect from "~/components/ui/Select.vue";
import formatPhoneNumber from "~/mixins/formatPhoneNumber";

export default {
  mixins: [formatPhoneNumber],
  data: () => ({
    venueName: "",
    venueEmail: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    state: "",
    stateArr: ["abc", "pqr", "xyz"],
    manualVenue: "",
    venue: "",
    venueArr: ["Hotel", "Restaurent", "Airport", "Other"],
    venuePhone: "",
    employeePhone: "",
    foundDate: new Date().toISOString().slice(0, 10),
    venueManually: false,

    // item details
    itemDescription: "",
    itemDescriptionArr: ["abc1", "pqr1", "xyz1"],
    packageType: "",
    packageTypeArr: ["abc2", "pqr2", "xyz2"],
    weightAndDimension: "",
    itemStatus: "",
    itemStatusArr: ["Claimed", "Unclaimed"],
    showReceiverInputs: false,
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
    UiInput,
    UiSelect,
  },
  methods: {
    async downloadTestPDF() {
      // let res = await this.$axios.get(
      //   "https://jsonplaceholder.typicode.com/todos/1"
      // );
      // let res1 = await this.$axios.get(
      //   "https://3y8gyebzqi.execute-api.us-east-1.amazonaws.com/storelostitem"
      // );
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
        console.log(this.venue);
        if (this.venue == "Other") {
          console.log(this.manualVenue);
        }
        console.log(this.foundDate);
        console.log(this.venueName);
        console.log(this.venueEmail);
        console.log(this.venuePhone);
        console.log(this.employeePhone);
        console.log(this.address);
        console.log(this.city);
        console.log(this.country);
        console.log(this.state);
        console.log(this.zip);
      }
    },

    async onSubmitItemDetails() {
      const isValid = await this.$refs.observerItem.validate();
      if (!isValid) {
        console.log("not valid");
      } else {
        console.log("valid");
        console.log(this.$refs.itemImageRef.files[0]);
        console.log(this.itemDescription);
        console.log(this.packageType);
        console.log(this.weightAndDimension);
        console.log(this.itemStatus);
        if (this.itemStatus == "Claimed") {
          console.log(this.receiverName);
          console.log(this.receiverEmail);
          console.log(this.receiverPhone);
        }
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