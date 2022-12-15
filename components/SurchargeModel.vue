<template>
  <BaseModal
    :header="headerText"
    :show-modal="showModal"
    size="is-small"
    @close="$emit('close')"
    :hideCancel="true"
  >
    <div
      class="space-y-4 !shadow-primary flex flex-col text-left"
    >
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
            <BaseSelect :isRequired="true" v-model="key" :options="keyOptions" label="Key" />
            <p
              v-if="errors.length"
              class="vee-validation-error mt-2 text-sm text-red-600"
            >
              {{ errors[0] }}
            </p>
          </ValidationProvider>
          <div class="grid sm:grid-cols-2 gap-4">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="block col-span-1"
            >
              <BaseSelect
                :isRequired="true"
                v-model="service"
                :options="serviceOptions"
                label="Service"
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
                :isRequired="true"
                v-model="packageType"
                :options="packageTypeOptions"
                label="Package Type"
              />
              <p
                v-if="errors.length"
                class="vee-validation-error mt-2 text-sm text-red-600"
              >
                {{ errors[0] }}
              </p>
            </ValidationProvider>
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="block col-span-1"
            >
              <label class="block text-sm mt-2 text-gray-500"
                     :class="errors.length && 'text-red-500'"
                >Effective After: <span class="text-red-500">*</span> </label
              >
              <client-only>
                <div :class="errors.length && 'error'">
                  <date-picker
                    v-model="effectiveAfter"
                    format="MM-DD-YYYY"
                    type="date"
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
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="block col-span-1"
            >
              <label class="block text-sm mt-2 text-gray-500"
                     :class="errors.length && 'text-red-500'"
                >Effective Before: <span class="text-red-500">*</span> </label
              >
              <client-only>
                <div :class="errors.length && 'error'">
                  <date-picker
                    v-model="effectiveBefore"
                    format="MM-DD-YYYY"
                    type="date"
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
          </div>
          <p v-show="!isDateRangeValid" class="text-rose-600">
            Effective after should be less than Effective before.
          </p>
          <div class="flex justify-between">
            <div class="block">
              <BaseInput
                v-model="dollarAmount"
                type="text"
                label="Doller Amount"
              />
            </div>
            <div class="block flex items-center">AND</div>
            <div class="block">
              <BaseInput v-model="percentage" type="text" label="Percentage" />
            </div>
          </div>
          <p v-show="!isAmountValid" class="text-rose-600">
            Any one field is required between dollor amount and percentage
          </p>
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
import scrollToError from "../mixins/scrollToError.js";

export default {
  mixins: [scrollToError],
  props: {
    showModal: { type: Boolean, default: false },
    mode: { type: String, default: "create" },
    data: { type: Object, default: {} },
  },
  components: {
    DatePicker,
  },
  data() {
    return {
      key: "Any",
      keyOptions: ["Any"],
      service: "Any",
      serviceOptions: ["Any"],
      packageType: "Any",
      packageTypeOptions: ["Any"],
      effectiveAfter: null,
      effectiveBefore: null,
      dollarAmount: "",
      percentage: "",
      isLoading: false,
      isAmountValid: true,
      isDateRangeValid: true,
      surchargeId: "",
      tempEditData: {}
    };
  },
  mounted() {
    if (this.mode === "edit") {
      this.surchargeId = this.data.id,
      this.key = this.data.catergory.toLowerCase() === "any" ? "Any" : this.data.catergory;
      this.service = this.data.service.toLowerCase() === "any" ? "Any" : this.data.service;
      this.packageType = this.data.packagetype.toLowerCase() === "any" ? "Any" : this.data.packagetpe;
      this.effectiveAfter = new Date(this.data.mindate);
      this.effectiveBefore = new Date(this.data.maxdate);
      this.dollarAmount = String(this.data.srchargeamont);
      this.percentage = String(this.data.srchargepercentage);
      this.tempEditData = {
        key: this.key,
        service: this.service,
        packageType: this.packageType,
        effectiveAfter: this.effectiveAfter,
        effectiveBefore: this.effectiveBefore,
        dollarAmount: this.dollarAmount,
        percentage: this.percentage,
      }
    }
  },
  computed: {
    headerText() {
      if(this.mode === "edit"){
        return "Edit Surcharge";
      }
      return "Create a new Surcharge"
    },
  },
  methods: {
    async onSubmit() {
      this.isDateRangeValid = true;
      const isValid = await this.$refs.observer.validate();
      if (this.dollarAmount || this.percentage) {
        this.isAmountValid = true;
        if (isValid) {
          if(this.effectiveBefore < this.effectiveAfter){
            this.isDateRangeValid = false;
            this.scrollToError();
          }
          else{
            if(this.mode === "edit"){
              this.isLoading = true;
              let updateParams = {};
              if (this.key !== this.tempEditData.key) {
                updateParams.catergory = this.key.toUpperCase();
              }
              if (this.service !== this.tempEditData.service) {
                updateParams.service = this.service.toUpperCase()
              }
              if (this.packageType !== this.tempEditData.packageType) {
                updateParams.packagetype = this.packageType.toUpperCase();
              }
              if (this.effectiveAfter !== this.tempEditData.effectiveAfter) {
                updateParams.mindate = moment(this.effectiveAfter).format("YYYY-MM-DDTHH:mm:ss") + "Z";
                updateParams.maxdate = moment(this.effectiveBefore).format("YYYY-MM-DDTHH:mm:ss") + "Z";
              }
              if (this.effectiveBefore !== this.tempEditData.effectiveBefore) {
                updateParams.mindate = moment(this.effectiveAfter).format("YYYY-MM-DDTHH:mm:ss") + "Z";
                updateParams.maxdate = moment(this.effectiveBefore).format("YYYY-MM-DDTHH:mm:ss") + "Z";
              }
              if (this.dollarAmount !== this.tempEditData.dollarAmount) {
                updateParams.srchargeamont = Number(this.dollarAmount);
              }
              if (this.percentage !== this.tempEditData.percentage) {
                updateParams.srchargepercentage = Number(this.percentage);
              }
               this.$axios
                .post("/updateSingleSurchargeDetails?id="+this.surchargeId, updateParams)
                .then((response) => {
                  this.$toast.info("Surcharge edited successfully!");
                  this.isLoading = false;
                })
                .catch((error) => {
                  this.$toast.error("Something went wrong! Please try again.");
                  this.isLoading = false;
                })
            }
            else{
              this.isLoading = true;
              let storeParams = {
                catergory: this.key.toUpperCase(),
                service: this.service.toUpperCase(),
                packagetype: this.packageType.toUpperCase(),
                mindate: moment(this.effectiveAfter).format("YYYY-MM-DDTHH:mm:ss") + "Z",
                maxdate: moment(this.effectiveBefore).format("YYYY-MM-DDTHH:mm:ss") + "Z",
                srchargeamont: Number(this.dollarAmount),
              };
              if (this.percentage) {
                storeParams.srchargepercentage = Number(this.percentage);
              }
              this.$axios
                .post("/storeSurchargeDetails", storeParams)
                .then((response) => {
                  this.$toast.info("Surcharge added successfully!");
                  this.isLoading = false;
                })
                .catch((error) => {
                  this.$toast.error("Something went wrong! Please try again.");
                  this.isLoading = false;
                })
            }
          }
        }
        else{
          this.scrollToError();
        }
      } else {
        this.isAmountValid = false;
        this.scrollToError();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  & > .mx-datepicker {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 rounded-lg transition-none;
  }
}
</style>