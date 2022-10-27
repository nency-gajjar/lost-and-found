<template>
  <div class="wrapper-form">
    <div
      class="
        card
        w-full
        mx-6
        lg:mx-0
        md:w-8/12
        lg:w-7/12
        xl:w-6/12
        bg-white
        border border-[#E1E3E6]
        rounded-lg
      "
      style="box-shadow: rgba(54, 28, 93, 0.04) -10px 18px 32px"
    >
      <div>
        <ValidationObserver v-slot="{ validate }" ref="observer">
          <form @submit.prevent="validate().then(onSubmit)">
            <div class="card p-6 space-y-4">
              <div class="form-title">
                <h1
                  class="
                    w-full
                    my-2
                    text-xl
                    font-bold
                    leading-tight
                    text-gray-700
                  "
                >
                  Login
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
              <ValidationProvider
                v-slot="{ errors }"
                id="email"
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
                id="password"
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  v-model="password"
                  type="text"
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
                  dark:bg-red-200 dark:text-red-800
                "
                role="alert"
              >
                <span class="font-medium">Oops!</span> Please fill all required
                fields and try submitting again.
              </div>
              <div class="flex justify-end">
                <button
                  :class="{ 'button--loading': isLoading }"
                  type="submit"
                  class="
                    !py-3
                    font-medium
                    text-md
                    leading-5
                    uppercase
                    py-2
                    px-12
                    rounded-md
                    button
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-offset-primary-60
                    transition-all
                    font-display
                    disabled:cursor-not-allowed
                    bg-accent-100
                    text-white
                    focus:ring-accent-100
                    shadow-accent
                    hover:bg-accent-200
                  "
                >
                  <span class="button__text"> Login </span>
                </button>
              </div>
              <div class="top-margin-alert">
                <button
                  @click="forgotPassword"
                  type="button"
                  class="
                    inline-block
                    px-7
                    py-3
                    bg-gray
                    hover:shadow-lg hover:bg-gray-100
                    text-gray-600 text-sm
                    leading-snug
                    uppercase
                    rounded-md
                    font-medium
                    transition
                    duration-150
                    ease-in-out
                    w-full
                    border border-gray-300
                  "
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import BaseInput from "~/components/base/BaseInput.vue";
    export default {
        components: {
            ValidationObserver,
            ValidationProvider,
            BaseInput,
        },
        data(){
            return{
                email: "",
                password: "",
                isLoading: false,
                showValidateAlert: false
            }
        },
        methods: {
            forgotPassword(){
              this.$nextTick(() => {
                this.$router.push("/admin/forgot-password");
              });
            },
            async onSubmit(){
                this.isLoading = true;
                const isValid = await this.$refs.observer.validate();
                if (!isValid) {
                    this.showValidateAlert = true;
                    this.isLoading = false;
                } else {
                    this.showValidateAlert = false;
                    setTimeout(()=>{
                        this.isLoading = false;
                    }, 3000);
                    console.log(this.email);
                    console.log(this.password);

                    // const params = {
                    //     claimpersonname: this.claimPersonName,
                    //     claimpersonemail: this.claimPersonEmail,
                    //     claimpersonmobileno: claimPersonPhoneNo,
                    //     claimpersonitemname: this.itemName,
                    //     claimpersondescription: this.itemDescription,
                    //     claimpersondatelost: this.itemLostDate,
                    //     claimpersonlocation: this.autoCompleteAddress.address,
                    //     itemid: this.itemId,
                    // };

                    // this.$axios
                    // .post("/sendclaimitemmail", params)
                    // .then((response) => {
                    //     if (response.status === 200) {
                    //     this.isLoading = false;
                    //     }
                    // })
                    // .catch((error) => {
                    //     this.isLoading = false;
                    //     console.log(error);
                    // });
                }
            },
        },
    }
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