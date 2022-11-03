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
              Login to your account
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
                  v-model="email"
                  id="email"
                  type="email"
                  label="Your Email"
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
                  v-model="password"
                  id="password"
                  type="password"
                  label="Password"
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
                <span class="font-medium">Oops!</span> Please fill all required
                fields and try submitting again.
              </div>
              <div class="flex items-center justify-end">
                <!-- <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="
                        w-4
                        h-4
                        border border-gray-300
                        rounded
                        bg-gray-50
                        focus:ring-3 focus:ring-primary-300
                      "
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500"
                      >Remember me</label
                    >
                  </div>
                </div> -->
                <a
                  @click="forgotPassword"
                  class="
                    text-sm
                    font-medium
                    text-gray-600
                    hover:underline
                    cursor-pointer
                  "
                  >Forgot password?</a
                >
              </div>
              <button
                type="submit"
                class="
                  flex
                  justify-center
                  font-medium
                  text-md
                  leading-5
                  w-full
                  px-5
                  py-2.5
                  text-white
                  rounded-md
                  button
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-offset-primary-60
                  bg-accent-100
                  focus:ring-accent-100
                  shadow-accent
                  hover:bg-accent-200
                  rounded-lg
                  text-center
                "
              >
                <svg
                  v-if="isLoading"
                  class="w-5 h-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span v-else class="button__text"> Login </span>
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
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
      email: "",
      password: "",
      isLoading: false,
      showValidateAlert: false,
    };
  },
  mounted() {
    window.addEventListener("keydown", () => {
      this.showValidateAlert = false;
    });
    window.addEventListener("click", () => {
      this.showValidateAlert = false;
    });
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
          password: this.password,
        };

        this.$auth
          .loginWith("local", {
            data: params,
          })
          .then(async (response) => {
            console.log(response);
            if (response.status === 200) {
              await this.$auth.setUser({
                email: params.email,
                password: params.password,
              });
              this.isLoading = false;
              this.$toast.info("Login successfully!");
              this.$nextTick(() => {
                this.$router.push({ path: "/dashboard" });
              });
            }
          })
          .catch((error) => {
            this.isLoading = false;
            this.$toast.error("Email or Password is incorrect");
            console.log(error);
          });
      }
    },
    routeToRegister() {
      this.$nextTick(() => {
        this.$router.push("/register");
      });
    },
    forgotPassword() {
      this.$nextTick(() => {
        this.$router.push("/forgot-password");
      });
    },
  },
  beforeDestroy() {
    window.removeEventListener("click", () => {});
    window.removeEventListener("keydown", () => {});
  },
};
</script>