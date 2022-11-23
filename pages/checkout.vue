<template>
  <div class="wrapper pb-10">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="form-title my-5">
        <h1 class="w-full mt-10 text-xl font-bold leading-tight text-gray-700">
          Checkout
        </h1>
        <div class="flex justify-center my-2">
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
      <div class="my-5">
        <div
          class="
            py-6
            px-12
            mt-5
            text-left
            justify-between
            bg-white
            rounded-lg
            border
            shadow-md
            relative
          "
        >
          <p class="font-bold uppercase">summary</p>
          <div class="flex justify-between space-x-4 mt-5">
            <button class="text-left" @click="expanded = !expanded">
              <span class="font-medium"> Priority Mail</span>
              <span class="text-gray-500 text-sm">
                {{ `(3x5x4, 6 lbs, from Bellefonte to Beulaville)` }}
              </span>
              <span>
                <BaseIcon
                  v-if="!expanded"
                  icon="angle-down"
                  color="black"
                  size="1x"
                />
                <BaseIcon v-else icon="angle-up" color="black" size="1x" />
              </span>
            </button>
            <p class="text-display tracking-wide text-gray-700 font-medium">
              $15.75
            </p>
          </div>
          <div
            v-if="expanded"
            class="mt-1 mb-4 grid sm:grid-cols-3 gap-4 sm:gap-0"
          >
            <div>
              <p class="font-bold text-primary-100 uppercase">from</p>
              <p>Jemis Maru</p>
              <p>abc</p>
              <p>Test Track Road</p>
              <p>Bellefonte, PA, 16823</p>
            </div>
            <div>
              <p class="font-bold text-primary-100 uppercase">to</p>
              <p>abc</p>
              <p>Daewoo Court</p>
              <p>Beulaville, NC, 28518</p>
            </div>

            <div>
              <p class="font-bold text-primary-100 uppercase">package</p>
              <p>My Own Packaging - Box</p>
              <p>3x5x4, 6 lbs</p>
            </div>
          </div>
          <hr class="my-5" />
          <div>
            <div class="flex justify-between mt-6">
              <p class="font-semibold text-lg">Total Price</p>
              <p
                class="
                  text-green-500
                  font-bold font-display
                  text-xl
                  leading-relaxed
                "
              >
                $36.02
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <div
            class="
              w-full
              py-6
              px-12
              mt-5
              text-left
              justify-between
              bg-white
              rounded-lg
              border
              shadow-md
              relative
            "
          >
            <h3
              class="font-bold text-[#37322C] tracking-wider uppercase text-sm"
            >
              payment method
            </h3>
            <div class="py-3">
              <div
                id="card-element"
                ref="stripeCard"
                class="mx-auto pt-0.5"
              ></div>
              <p
                ref="cardError"
                role="alert"
                class="mx-auto mt-1 text-sm text-red-600"
              ></p>
            </div>
          </div>
          <div
            class="
              flex flex-col
              justify-center
              items-center
              w-full
              py-6
              px-12
              mt-5
              text-left
              justify-between
              bg-white
              rounded-lg
              border
              shadow-md
              relative
            "
          >
            <BaseButton
              class="
                grow
                font-semibold
                text-md
                w-full
                md:max-w-sm
                mt-5
                mx-auto
                uppercase
              "
            >
              Confirm & pay
            </BaseButton>
            <button
              class="
                font-semibold
                text-sm text-gray-600
                grow
                uppercase
                w-full
                md:max-w-sm
                mt-5
                mx-auto
              "
            >
              BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
    };
  },
  mounted(){
    const elements = this.$stripe.elements({
      fonts: [
        {
          cssSrc: 'https://fonts.googleapis.com/css?family=Rubik:500',
        },
      ],
    })
    const style = {
      base: {
        color: '#361C5D',
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 500,
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#361C5D',
        },
      },
      invalid: {
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 500,
        color: '#dc2626',
        iconColor: '#dc2626',
      },
    }
    const card = elements.create('card', {
      style,
      iconStyle: 'solid',
      hidePostalCode: true,
    })
    card.mount('#card-element')
  },
};
</script>

<style scoped>
.wrapper {
  @apply flex flex-col justify-start pt-0 items-center text-center mx-auto;
}
</style>