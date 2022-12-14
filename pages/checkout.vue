<template>
  <div class="wrapper pb-10">
    <div class="container max-w-4xl mx-auto px-4">
      <div class="form-title my-5">
        <BaseHeader class="mt-10" varient="gray">Checkout</BaseHeader>
      </div>
      <div class="my-5">
        <div
          v-if="Object.keys(itemDetails).length > 0"
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
            Item Details
          </h3>
            <div class="flex sm:flex-row">
                <div
                  class="
                    w-full
                    flex justify-between
                    sm:items-center
                    flex-col-reverse
                    sm:flex-row
                  "
                >
                  
                  <div class="w-full sm:grid sm:grid grid-cols-2" :class="showImage && 'sm:gap-24'">
                    <div
                      class="font-medium text-md"
                    >
                      Item Description
                    </div>
                    <div>
                      {{ itemDetails.item_description }}
                    </div>
                  </div>

                  <div class="flex items-center my-4 sm:my-0 gap-3">
            
                  <div v-if="showImage"
                    class="
                      w-56
                      sm:w-24
                      min-w-[80px]
                      mx-auto
                      sm:mx-0
                      flex
                      items-center
                      mb-3
                      sm:mb-0
                    "
                  >
                    <img
                      v-if="itemDetails.image"
                      class="w-full"
                      :src="itemDetails.image"
                      alt=""
                    >
                  </div>
                </div>
                </div>
            </div>
        </div>
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
          <div
            v-if="!isEmpty(checkoutDetail) && checkoutDetail.selectedRate"
            class="flex justify-between space-x-4 mt-5"
          >
            <span class="font-medium text-md">
              {{ displayItemService(checkoutDetail.selectedRate.service) }}
            </span>
            <p class="text-display tracking-wide text-gray-700 font-medium font-display">
              {{ Number(checkoutDetail.selectedRate.rate) | currency }}
            </p>
          </div>
          <div
            v-if="!isEmpty(checkoutDetail) && checkoutDetail.lableDetails"
            class="mt-2 mb-4 grid sm:grid-cols-2 gap-4 sm:gap-0"
          >
            <div>
              <p class="font-bold text-primary-100 uppercase">from</p>
              <template class="text-gray-800">
                <!-- <p>{{ checkoutDetail.lableDetails.name }}</p> -->
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
                <!-- <p>{{ checkoutDetail.lableDetails.tocompany }}</p> -->
                <p>{{ checkoutDetail.lableDetails.tostreet1 }}</p>
                <p>
                  {{ checkoutDetail.lableDetails.tocity }},
                  {{ checkoutDetail.lableDetails.tostate }},
                  {{ checkoutDetail.lableDetails.tozip }}
                </p>
              </template>
            </div>
          </div>
          <p
            class="flex justify-between"
            v-if="!isEmpty(checkoutDetail) && checkoutDetail.signature"
          >
            <span class="font-medium text-md"> Signature Confirmation</span>
            <span class="font-display tracking-wide text-gray-700 font-medium">
              {{ 5 | currency }}
            </span>
          </p>
          <p class="flex justify-between" v-if="insuranceCharges">
            <span class="font-medium text-md"> Insurance Charges</span>
            <span class="font-display tracking-wide text-gray-700 font-medium">
              {{ Number(insuranceCharges) | currency }}
            </span>
          </p>
          <p v-if="checkoutDetail.insuranceValue" class="!-my-1">
            <span class="font-medium text-sm"> ( Insured for </span>
            <span class="font-medium text-sm">
              {{ Number(checkoutDetail.insuranceValue) | currency }}
            )
            </span>
          </p>

          <hr class="my-5" />
          <div v-if="!isEmpty(checkoutDetail) && checkoutDetail.selectedRate">
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
                {{ Number(totalPrice) | currency }}
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
              :disabled="!isCardValid"
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
import { isEmpty, startCase, camelCase } from "lodash";
import FormatCurrency from "@/mixins/formatCurrency";
import calculateInsuranceCharges from "../mixins/calculateInsuranceCharges.js"

export default {
  mixins: [FormatCurrency, calculateInsuranceCharges],
  data() {
    return {
      checkoutDetail: {},
      card: null,
      isLoading: false,
      isCardValid: false,
      itemDetails: {},
      insuranceCharges: 0,
    };
  },
  mounted() {
    if (this.$route.params.fromRatePage) {

    this.$axios.get("/getsinglelostitem?id=" + this.$route.query.id)
      .then((response) => {
        this.itemDetails = response.data.data.Item;
      })
      .catch((error) => {
        console.log(error);
      })
      
      this.checkoutDetail = {
        selectedRate: JSON.parse(
          JSON.stringify(this.$store.getters["shipment/selectedRate"])
        ),
        insuranceValue:
          JSON.parse(
            JSON.stringify(this.$store.getters["shipment/insuranceValue"])
          ) || null,
        shippingRates: JSON.parse(
          JSON.stringify(this.$store.getters["shipment/shippingRates"])
        ),
        lableDetails: JSON.parse(
          JSON.stringify(this.$store.getters["shipment/lableDetails"])
        ),
        signature: JSON.parse(
          JSON.stringify(this.$store.getters["shipment/signature"])
        ),
      };

      if(this.checkoutDetail.signature) {
        if(this.checkoutDetail.selectedRate.carrier === "CanadaPost") {
          this.checkoutDetail.signature = "DO_NOT_SAFE_DROP";
        }
        else if(this.checkoutDetail.selectedRate.carrier === "USPS") {
          this.checkoutDetail.signature = "SIGNATURE_RESTRICTED";
        }
        else {
          this.checkoutDetail.signature = "SIGNATURE";
        }
      }
      else {
        this.checkoutDetail.signature = "NO_SIGNATURE";
      }

      if(this.checkoutDetail.insuranceValue){
        this.insuranceCharges = this.calculateInsuranceCharges(this.checkoutDetail.insuranceValue);
      }

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
      card.on("change", () => {
        setTimeout(() => {
          if (
            document
              .getElementById("card-element")
              .classList.contains("StripeElement--complete")
          ) {
            this.isCardValid = true;
          } else {
            this.isCardValid = false;
          }
        }, 200);
      });
      this.card = card;
    } else {
      if (
        JSON.parse(
          JSON.stringify(this.$store.getters["shipment/itemDeliveryId"])
        )
      ) {
        this.$nextTick(() => {
          this.$router.push({
            name: "item-delivery",
            query: {
              id: JSON.parse(
                JSON.stringify(this.$store.getters["shipment/itemDeliveryId"])
              ),
            },
          });
        });
      } else {
        this.$nextTick(() => {
          this.$router.push({
            name: "lost-items",
          });
        });
      }
    } 
  },
  computed: {
    showImage() {
      return this.itemDetails.image && this.itemDetails.is_default !== 'Approve without Image';
    },
    packageDimensionsString() {
      let data = this.checkoutDetail?.lableDetails;
      return `${data?.length}x${data?.width}x${data?.height}`;
    },
    packageWeightString() {
      return `${this.checkoutDetail?.lableDetails?.weight} OZ`;
    },
    fromAddressString() {
      return `from ${this.checkoutDetail?.lableDetails?.city}`;
    },
    toAddressString() {
      return `from ${this.checkoutDetail?.lableDetails?.tocity}`;
    },
    totalPrice() {
      const rate = Number(this.checkoutDetail?.selectedRate?.rate);
      const signature = this.checkoutDetail.signature ? 5 : 0;
      const insuranceCharges = this.insuranceCharges;
      return rate + signature + insuranceCharges;
    },
  },
  methods: {
    isEmpty,
    displayItemService(service) {
      return startCase(camelCase(service));
    },
    async confirmAndPay() {
      this.isLoading = true;
      let totalPrice = Math.floor(
        Number(this.totalPrice).toFixed(2) * 100
      ); // convert usd to cents
      this.$axios
        .post("/createPaymentIntent", {
          amount: totalPrice,
        })
        .then(async (response) => {
          try {
            const result = await this.$stripe.confirmCardPayment(
              response.data.client_secret,
              {
                payment_method: {
                  card: this.card,
                },
              }
            );
            if (result.paymentIntent.status === "succeeded") {
              let shippingRates = JSON.parse(
                JSON.stringify(this.$store.getters["shipment/shippingRates"])
              );
              let selectedRate = JSON.parse(
                JSON.stringify(this.$store.getters["shipment/selectedRate"])
              );
              let insuranceValue = JSON.parse(
                JSON.stringify(this.$store.getters["shipment/insuranceValue"])
              );
              let customInfo = JSON.parse(
                JSON.stringify(this.$store.getters["shipment/customInfo"])
              );
              let params = {
                id: this.$route.query.id,
                carrier_accounts: selectedRate.carrier_account_id,
                service: selectedRate.service,
                to_address: shippingRates.to_address.id,
                from_address: shippingRates.from_address.id,
                parcel: shippingRates.parcel.id,
                delivery_confirmation:
                  this.checkoutDetail.signature,
                insurance: Number(insuranceValue),
              };
              if (Object.keys(customInfo).length > 0) {
                params.customs_info = customInfo;
              }
              this.$axios
                .post("/createShipping", params)
                .then((response) => {
                  if (response.status === 200) {
                    let shippingResponse = response;
                    this.$axios
                      .post(
                        "/updatesinglelostitem?id=" + this.$route.query.id,
                        {
                          total_amount: totalPrice,
                          service_name:
                            this.checkoutDetail.selectedRate.service,
                          service_provider:
                            this.checkoutDetail.selectedRate.carrier,
                          scheduled_pickup: false,
                          tracking_id: response.data.tracking_number,
                          from_address: JSON.parse(
                            JSON.stringify(this.$store.getters["shipment/shippingRates"])
                          ).from_address.id,
                          to_address: JSON.parse(
                            JSON.stringify(this.$store.getters["shipment/shippingRates"])
                          ).to_address.id,
                          carrier_accounts: JSON.parse(
                            JSON.stringify(this.$store.getters["shipment/selectedRate"])
                          ).carrier_account_id,
                          parcel: JSON.parse(
                            JSON.stringify(this.$store.getters["shipment/shippingRates"])
                          ).parcel.id,
                          shipment: shippingResponse.data.shipment_id,
                          label_url: shippingResponse.data.label_url,
                          delivery_confirmation:
                            JSON.parse(
                              JSON.stringify(this.$store.getters["shipment/signature"])
                            ) === true
                              ? true
                              : false,
                        }
                      )
                      .then((response) => {
                        if (response.status === 200) {
                          this.$store.commit("shipment/SET_LABEL_DETAILS", {
                            lableUrl:
                            shippingResponse.data.label_url,
                            itemId: this.$route.query.id,
                            shipmentId: shippingResponse.data.shipment_id,
                          });
                          this.isLoading = false;
                        }
                        this.$nextTick(() => {
                          this.$router.push({
                            name: "success",
                            query: {
                              id: JSON.parse(
                                JSON.stringify(
                                  this.$store.getters["shipment/itemDeliveryId"]
                                )
                              ),
                            },
                          });
                        });
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                })
                .catch((error) => {
                  console.log(error);
                  this.$toast.error("Something went wrong!");
                  this.isLoading = false;
                });
            }
          } catch (error) {
            console.log(error);
            this.$toast.error(error);
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = true;
        });
    },
    stepBack() {
      this.$nextTick(() => {
        this.$router.push({
          name: "rate-quotes",
          query: { id: this.$route.query.id },
          params: { fromItemDelivery: true },
        });
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  @apply flex flex-col justify-start pt-0 items-center text-center mx-auto;
}

.item-img {
  max-width: 150px;
}
</style>