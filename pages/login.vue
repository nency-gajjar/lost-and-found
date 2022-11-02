<template>
  <section class="bg-gray-100">
    <div
      class="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
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
                class="
                  p-4
                  mb-4
                  top-margin-alert
                  text-sm text-red-700
                  bg-red-100
                  rounded-lg
                "
                role="alert"
              >
                <span class="font-medium">Oops!</span> Please fill all required
                fields and try submitting again.
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
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
                </div>
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
                :class="{ 'button--loading': isLoading }"
                class="
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
                  transition-all
                  bg-accent-100
                  focus:ring-accent-100
                  shadow-accent
                  hover:bg-accent-200
                  rounded-lg
                  text-center
                "
              >
                <span class="button__text"> Login </span>
              </button>
              <!-- <p
                class="
                  text-sm
                  font-light
                  text-gray-500
                  cursor-pointer
                "
              >
                Don’t have an account yet?
                <a
                  @click="routeToRegister"
                  class="
                    font-medium
                    text-gray-600
                    hover:underline
                  "
                  >Register</a
                >
              </p> -->
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
      return redirect("/found-items");
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
  methods: {
    forgotPassword() {
      this.$nextTick(() => {
        this.$router.push("/forgot-password");
      });
    },
    routeToRegister() {
      this.$nextTick(() => {
        this.$router.push("/register");
      });
    },
    async onSubmit() {
      this.isLoading = true;
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.showValidateAlert = true;
        this.isLoading = false;
      } else {
        this.showValidateAlert = false;
        // console.log(this.email);
        // console.log(this.password);

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
  },
  mounted() {
    window.addEventListener("keydown", () => {
      this.showValidateAlert = false;
    });
    window.addEventListener("click", () => {
      this.showValidateAlert = false;
    });
  },
  beforeDestroy() {
    window.removeEventListener("click", () => {});
    window.removeEventListener("keydown", () => {});
  },
};
</script>

<style scoped>
.wrapper-form {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}

.vue-tel-input {
  border-radius: 0.5rem;
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

.top-margin-alert {
  margin-top: 2.5rem !important;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>