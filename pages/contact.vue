<template>
  <div class="wrapper">
    <BaseCard class="md:w-8/12 lg:w-7/12 xl:w-6/12">
      <div>
        <ValidationObserver v-slot="{ validate }" ref="observer">
          <form @submit.prevent="validate().then(onSubmit)">
            <div class="card p-6 space-y-4">
              <div class="form-title">
                <BaseHeader varient="gray">Contact Us</BaseHeader>
              </div>

              <!-- email -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                class="block"
                name="email"
              >
                <BaseInput
                  v-model="email"
                  :isRequired="true"
                  type="email"
                  label="Your email address"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <!-- Description -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <label :class="errors.length > 0 && 'text-red-500'" class="text-gray-500">Description <span class="text-red-500">*</span></label>
                <textarea
                  v-model="description"
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
                  :class="
                    errors.length > 0 &&
                    '!border-red-500 !border-2 ring-4 ring-red-500 ring-opacity-10 transition-none'
                  "
                ></textarea>
              </ValidationProvider>
              <div class="flex justify-end">
                <BaseButton :is-loading="isLoading" type="submit">
                  Submit
                </BaseButton>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      email: "",
      description: "",
      isLoading: false
    };
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if(isValid){
        this.isLoading = true;
        let params = {
            issue: this.selectedIssue,
            email: this.email,
            description: this.description
        }
        if(this.selectedIssue === "Request a refund for unused label"){
            params.tracking_id = this.trackingId;
            params.destination_zip = this.destinationZip;
            params.refund_reason = this.refundReason;
        }
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}
</style>