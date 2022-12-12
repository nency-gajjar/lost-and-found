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
              Register New Admin
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
                  id="email"
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
                id="password"
                v-slot="{ errors }"
                rules="required|strongPassword"
                class="block"
              >
                <BaseInput
                  :isRequired="true"
                  v-model="password"
                  :type="hidePassword ? 'password' : 'text'"
                  label="Password"
                  :class="errors.length > 0 && 'error'"
                >
                  <template v-slot:icon>
                    <div
                      class="absolute inset-y-0 top-7 right-0 flex items-center p-5"
                      @click="hidePassword = !hidePassword"
                    >
                      <BaseIcon
                        :icon="hidePassword ? 'eye' : 'eye-slash'"
                        color="gray"
                      />
                    </div>
                  </template>
                </BaseInput>

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
              <BaseButton :is-loading="isLoading" type="submit" class="w-full">
                Register
              </BaseButton>
              <p class="text-sm font-light text-gray-500 cursor-pointer">
                Back to login?
                <a
                  @click="routeToLogin"
                  class="font-medium text-gray-600 hover:underline"
                  >Login</a
                >
              </p>
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
    if (!$auth.loggedIn) {
      return redirect("/login");
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
      hidePassword: true,
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
          password: this.password,
        };

        this.$axios
          .post("/registerAdmin", params)
          .then(async (response) => {
            if (response.status === 200) {
              this.isLoading = false;
              this.$toast.info("Register successfully!");
              await this.$auth.logout();
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
    routeToLogin() {
      this.$nextTick(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>