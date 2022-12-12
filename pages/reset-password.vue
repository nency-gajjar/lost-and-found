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
              Reset Password
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
                v-show="showEmail"
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
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  :isRequired="true"
                  id="verificationCode"
                  v-model="verificationCode"
                  type="text"
                  label="Verification Code"
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
                rules="required|strongPassword"
                class="block"
              >
                <BaseInput
                  :isRequired="true"
                  id="password"
                  v-model="password"
                  type="password"
                  label="New Password"
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
                rules="required|strongPassword"
                class="block"
              >
                <BaseInput
                  :isRequired="true"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  label="Confirm New Password"
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
                v-show="showValidateAlert"
                class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                role="alert"
              >
                <span class="font-medium">Oops!</span> {{ alertMessage }}
              </div>
              <BaseButton :is-loading="isLoading" type="submit" class="w-full">
                Reset Password
              </BaseButton>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
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
  },
  data() {
    return {
      showEmail: false,
      verificationCode: "",
      email: "",
      password: "",
      confirmPassword: "",
      alertMessage: "",
      isLoading: false,
      showValidateAlert: false,
    };
  },
  mounted() {
    this.callEventListners();
    this.email = this.$route.params.email;
    if (!this.email) {
      this.showEmail = true;
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;
      const isValid = await this.$refs.observer.validate();
      if (!isValid || this.password != this.confirmPassword) {
        if (
          this.password != this.confirmPassword &&
          this.password != "" &&
          this.confirmPassword != ""
        ) {
          this.alertMessage = "Password and Confirm Password doesn't match";
        } else {
          this.alertMessage =
            "Please fill all required fields and try submitting again.";
        }
        this.showValidateAlert = true;
        this.isLoading = false;
      } else {
        this.showValidateAlert = false;
        const params = {
          email: this.email,
          newPassword: this.password,
          verificationCode: this.verificationCode,
        };

        this.$axios
          .post("/resetpassword", params)
          .then((response) => {
            if (response.status === 200) {
              this.isLoading = false;
              this.$toast.info("Password Reset successfully!");
              this.$nextTick(() => {
                this.$router.push({
                  name: "login",
                });
              });
            }
          })
          .catch((error) => {
            this.isLoading = false;
            this.$toast.error("Something went wrong! Please try again.");
            console.log(error);
          });
      }
    },
  },
};
</script>