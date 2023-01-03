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
            <BaseHeader varient="gray">Login to your account</BaseHeader>
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
                rules="required"
                class="block"
              >
                <BaseInput
                  :isRequired="true"
                  v-model="password"
                  id="password"
                  :type="hidePassword ? 'password' : 'text'"
                  label="Password"
                  :class="errors.length > 0 && 'error'"
                >
                  <template v-slot:icon>
                    <div
                      class="absolute bottom-13-px right-0 pr-5"
                      @click="hidePassword = !hidePassword"
                    >
                      <BaseIcon
                        :icon="hidePassword ? 'eye' : 'eye-slash'"
                        color="gray"
                      />
                    </div>
                  </template>
                </BaseInput>
              </ValidationProvider>
              <div class="flex items-center justify-end">
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

              <ValidationAlert :show-alert="showValidateAlert" />
              
              <BaseButton :is-loading="isLoading" type="submit" class="w-full">
                Login
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
import ValidationAlert from '~/components/shared/ValidationAlert.vue'
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

        this.$auth
          .loginWith("local", {
            data: params,
          })
          .then(async (response) => {
            if (response.status === 200) {
              await this.$auth.setUser({
                email: params.email,
                password: params.password,
              });
              this.isLoading = false;
              this.$toast.info("Login successfully!");
              this.$nextTick(() => {
                let redirect_url = this.$route.query.redirect || '/dashboard'
                this.$router.push(redirect_url);
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
};
</script>

<style scoped>
.bottom-13-px{
  bottom: 13px;
}
</style>