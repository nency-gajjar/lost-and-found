<template>
  <section class="bg-gray-100 shadow-lg">
    <div
      class="
        flex flex-col
        items-center
        px-6
        py-8
        mx-auto
        md:h-screen
        lg:py-0
      "
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
                  id="password"
                  v-model="password"
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
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|strongPassword"
                class="block"
              >
                <BaseInput
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  label="Confirm Password"
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
                <span class="font-medium">Oops!</span> {{ alertMessage }}
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
                <span class="button__text"> Reset Password </span>
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
  middleware(context) {
    if (context.app.$cookiz.get('token')) {
      return context.redirect('/found-items');
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
        // console.log(this.password);
        // console.log(this.confirmPassword);
        // console.log(this.verificationCode);
        // console.log(this.email);
        
        const params = {
          email: this.email,
          newPassword: this.password,
          verificationCode: this.verificationCode
        };

        this.$axios
        .post("/resetpassword", params)
        .then((response) => {
            if (response.status === 200) {
              this.isLoading = false;
              this.$toast.info("Password Reset successfully!", {
                hideProgressBar: true,
              });
              this.$nextTick(() => {
                this.$router.push({
                  name: "login"
                });
              });
            }
        })
        .catch((error) => {
            this.isLoading = false;
            this.$toast.error("Something went wrong! Please try again.", {
              hideProgressBar: true,
            });
            console.log(error);
        });
      }
    },
  },
  mounted(){
    window.addEventListener('keydown', () => {
      this.showValidateAlert = false;
    });
    window.addEventListener('click', () => {
      this.showValidateAlert = false;
    });
    this.email = this.$route.params.email;
    if(!this.email){
      this.showEmail = true;
    }
  },
  beforeDestroy() {
    window.removeEventListener('click', () => {});
    window.removeEventListener('keydown', () => {});
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