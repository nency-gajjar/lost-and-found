<template>
  <div class="wrapper pb-10">
    <div class="container max-w-4xl mx-auto px-4">
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
          <h3 class="font-bold text-[#37322C] tracking-wider uppercase text-md">
            summary
          </h3>
          <div class="flex justify-between space-x-4 mt-5">
            <button class="text-left" @click="expanded = !expanded">
              <span
                v-if="checkoutDetail && checkoutDetail.selectedRate"
                class="font-medium text-md"
                >{{ checkoutDetail.selectedRate.service }}</span
              >
              <span
                v-if="checkoutDetail.lableDetails"
                class="text-gray-500 text-sm"
              >
                {{ packageDimensionsString }}, {{ packageWeightString }},
                {{ fromAddressString }} {{ toAddressString }}
              </span>
              <span>
                <BaseIcon
                  v-if="!expanded"
                  icon="angle-down"
                  color="black"
                  size="1x"
                  style="max-width: 15px"
                />
                <BaseIcon v-else icon="angle-up" color="black" size="1x" />
              </span>
            </button>
            <p
              v-if="checkoutDetail.selectedRate"
              class="text-display tracking-wide text-gray-700 font-medium"
            >
              {{
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(checkoutDetail.selectedRate.rate)
              }}
            </p>
          </div>
          <div
            v-if="expanded"
            class="mt-2 mb-4 grid sm:grid-cols-3 gap-4 sm:gap-0"
          >
            <div>
              <p class="font-bold text-primary-100 uppercase">from</p>
              <template class="text-gray-800">
                <p>{{ checkoutDetail.lableDetails.name }}</p>
                <p>{{ checkoutDetail.lableDetails.company }}</p>
                <p>{{ checkoutDetail.lableDetails.street1 }}</p>
                <p>
                  {{ checkoutDetail.lableDetails.city }},
                  {{ checkoutDetail.lableDetails.state }},
                  {{ checkoutDetail.lableDetails.zip }}
                </p>
              </template>
            </div>
            <div>
              <p class="font-bold text-primary-100 uppercase">to</p>
              <template class="text-gray-800">
                <p>{{ checkoutDetail.lableDetails.toname }}</p>
                <p>{{ checkoutDetail.lableDetails.tocompany }}</p>
                <p>{{ checkoutDetail.lableDetails.tostreet1 }}</p>
                <p>
                  {{ checkoutDetail.lableDetails.tocity }},
                  {{ checkoutDetail.lableDetails.tostate }},
                  {{ checkoutDetail.lableDetails.tozip }}
                </p>
              </template>
            </div>
            <div>
              <p class="font-bold text-primary-100 uppercase">package</p>
              <template class="text-gray-800">
                <p>Box</p>
                <p>{{ packageDimensionsString }}, {{ packageWeightString }}</p>
                <p v-if="checkoutDetail.insuranceValue">
                  Insured for:
                  {{
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(checkoutDetail.insuranceValue)
                  }}
                </p>
                <p v-if="checkoutDetail.signature">
                  Signature Confirmation: $05.00
                </p>
              </template>
            </div>
          </div>
          <hr class="my-5" />
          <div>
            <div class="flex justify-between mt-6">
              <p class="font-semibold text-lg text-gray-800">Total Price</p>
              <p
                v-if="checkoutDetail.selectedRate"
                class="
                  text-green-500
                  font-bold font-display
                  text-xl
                  leading-relaxed
                "
              >
                {{ totalPrice }}
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
              :is-loading="isLoading"
              @click="confirmAndPay"
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
              @click="stepBack"
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
      checkoutDetail: {},
      card: null,
      isLoading: false,
    };
  },
  mounted() {
    this.checkoutDetail = {
      selectedRate: JSON.parse(localStorage.getItem("SelectedRate")),
      insuranceValue: localStorage.getItem("InsuranceValue") || null,
      shippingRates: JSON.parse(localStorage.getItem("ShippingRates")),
      lableDetails: JSON.parse(localStorage.getItem("LableDetails")),
      signature: JSON.parse(localStorage.getItem("Signature")),
    };

    const elements = this.$stripe.elements({
      fonts: [
        {
          cssSrc: "https://fonts.googleapis.com/css?family=Rubik:500",
        },
      ],
    });
    const style = {
      base: {
        color: "#361C5D",
        fontFamily: "Rubik, sans-serif",
        fontWeight: 500,
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#361C5D",
        },
      },
      invalid: {
        fontFamily: "Rubik, sans-serif",
        fontWeight: 500,
        color: "#dc2626",
        iconColor: "#dc2626",
      },
    };
    const card = elements.create("card", {
      style,
      iconStyle: "solid",
      hidePostalCode: true,
    });
    card.mount("#card-element");
    this.card = card;
  },
  computed: {
    packageDimensionsString() {
      let data = this.checkoutDetail?.lableDetails;
      return `${data?.length}x${data?.width}x${data?.height}`;
    },
    packageWeightString() {
      return `${this.checkoutDetail?.lableDetails?.weight} lbs`;
    },
    fromAddressString() {
      return `from ${this.checkoutDetail?.lableDetails?.city}`;
    },
    toAddressString() {
      return `from ${this.checkoutDetail?.lableDetails?.tocity}`;
    },
    totalPrice() {
      const insuranceValue = Number(this.checkoutDetail?.insuranceValue) || 0;
      const rate = Number(this.checkoutDetail?.selectedRate?.rate);
      const signature = this.checkoutDetail.signature ? 5 : 0;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(rate + insuranceValue + signature);
    },
  },
  methods: {
    async confirmAndPay() {
      this.isLoading = true;
      try {
        const result = await this.$stripe.confirmCardPayment(
          "pi_3M7LYWAFBONdKhPx0ymeav5d_secret_27DJKW7f5SNggcwBaJmTY6kDB",
          {
            payment_method: {
              card: this.card,
            },
          }
        );
      } catch (error) {
        this.$toast.error(error);
        this.isLoading = false;
      }
    },
    stepBack() {
      this.$nextTick(() => {
        this.$router.go(-1);
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  @apply flex flex-col justify-start pt-0 items-center text-center mx-auto;
}
</style>