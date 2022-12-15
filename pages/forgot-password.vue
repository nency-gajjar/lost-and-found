<template>
  <section>
    <div class="flex flex-col items-center px-6 mt-16 md:h-screen">
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900"
      >
        Lost & Found
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="form-title">
            <h1
              class="w-full my-2 text-xl font-bold leading-tight text-gray-700"
            >
              Forgot Password
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
          <ValidationObserver v-slot="{ validate }" ref="observer">
            <form
              class="space-y-4 md:space-y-6 mt-5"
              @submit.prevent="validate().then(onSubmit)"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                class="block"
                name="Email"
              >
                <BaseInput
                  :isRequired="true"
                  v-model="email"
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

              <ValidationAlert :show-alert="showValidateAlert" />

              <BaseButton :is-loading="isLoading" type="submit" class="w-full">
                Send Email
              </BaseButton>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <BaseDialog
      :showDialog="showDialog"
      :icon="{ name: 'circle-check', color: 'green', size: '3x' }"
      title="Email Sent successfully!"
      message="Please check your email to get the varification code"
      buttonTitle="Okay"
      @close="closeDialog"
    />
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import ValidationAlert from '~/components/shared/ValidationAlert.vue'
import eventListners from "../mixins/eventListners.js";

export default {
  mixins: [eventListners],
  middleware({ $auth, redirect }) {
    if ($auth.loggedIn) {
      return redirect("/dashboard");
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    ValidationAlert
  },
  data() {
    return {
      email: "",
      isLoading: false,
      showValidateAlert: false,
      showDialog: false,
    };
  },
  mounted() {
    this.callEventListners();
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.showValidateAlert = true;
        this.isLoading = false;
      } else {
        this.showValidateAlert = false;
        const params = {
          email: this.email,
        };

        this.$axios
          .post("/forgotpassword", params)
          .then((response) => {
            if (response.status === 200) {
              this.isLoading = false;
              this.showDialog = true;
            }
          })
          .catch((error) => {
            this.isLoading = false;
            if (error.response.status === 400) {
              this.$toast.error(error.response.data.data);
            } else {
              this.$toast.error("Something went wrong! Please try again.");
            }
          });
      }
    },
    closeDialog() {
      this.showDialog = false;
      this.$toast.info("Email sent successfully!");
      this.$nextTick(() => {
        this.$router.push({
          name: "reset-password",
          params: { email: this.email },
        });
      });
    },
  },
  beforeDestroy() {
    window.removeEventListener("click", () => {});
    window.removeEventListener("keydown", () => {});
  },
};
</script>
