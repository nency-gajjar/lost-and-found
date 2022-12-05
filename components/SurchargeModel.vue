<template>
  <BaseModal
    header="Create a new surcharge"
    :show-modal="showModal"
    size="is-xsmall"
    @close="$emit('close')"
    :hideCancel="true"
  >
    <div
      class="bg-primary-60 space-y-4 !shadow-primary flex flex-col text-left"
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
            <BaseSelect v-model="key" :options="keyOptions" label="Key" />
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
              <label class="block text-sm mt-2 font-medium text-gray-800"
                >Effective After:</label
              >
              <client-only>
                <div :class="errors.length && 'error'">
                  <date-picker
                    v-model="effectiveAfter"
                    formate="YYYY-MM-DD"
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
              <label class="block text-sm mt-2 font-medium text-gray-800"
                >Effective Before:</label
              >
              <client-only>
                <div :class="errors.length && 'error'">
                  <date-picker
                    v-model="effectiveBefore"
                    formate="YYYY-MM-DD"
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
          <div class="flex justify-between">
            <div class="block">
              <BaseInput
                v-model="dollarAmount"
                type="number"
                label="Doller Amount"
              />
            </div>
            <div class="block flex items-center">AND</div>
            <div class="block">
              <BaseInput
                v-model="percentage"
                type="number"
                label="Percentage"
              />
            </div>
          </div>
          <p v-show="!isAmountValid" class="text-rose-600">Any one field is required between dollor amount and percentage</p>
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

export default {
  props: {
    showModal: { type: Boolean, default: false },
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
      isAmountValid: true
    };
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if(this.dollarAmount || this.percentage){
        this.isAmountValid = true;
        if (isValid) {
        } else {
            console.log("invalid");
        }
      }
      else{
        console.log("invalid");
        this.isAmountValid = false
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