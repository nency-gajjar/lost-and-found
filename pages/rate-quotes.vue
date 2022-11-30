<template>
  <div class="wrapper pb-10">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="form-title my-5">
        <h1 class="w-full mt-10 text-xl font-bold leading-tight text-gray-700">
          Select Your Rate Quote
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
      <div class="flex flex-col md:flex-row justify-center gap-4">
        <div class="w-full">
          <div class="w-full flex items-end relative">
            <div
              class="
                flex
                ml-auto
                items-center
                space-x-2
                mr-6
                !px-2
                !font-body
                cursor-pointer
              "
              @click="menuOpened = !menuOpened"
            >
              <span class="!font-medium text-gray-700">
                SORT BY:
                <span v-if="sortBy === 0" class="!font-bold uppercase">
                  cheapest
                </span>
                <span v-else-if="sortBy === 1" class="!font-bold uppercase">
                  fastest
                </span>
              </span>
              <BaseIcon
                icon="angle-down"
                color="black"
                size="1x"
                style="max-width: 15px"
              />
            </div>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="menuOpened"
                class="
                  z-10
                  absolute
                  right-6
                  top-0
                  transform
                  mt-12
                  px-2
                  w-screen
                  max-w-xs
                  sm:px-0
                "
              >
                <div
                  class="
                    rounded-lg
                    shadow-lg
                    ring-1 ring-black ring-opacity-5
                    overflow-hidden
                  "
                >
                  <div
                    class="
                      relative
                      grid
                      gap-6
                      bg-white
                      px-5
                      py-6
                      sm:gap-8 sm:p-8
                    "
                  >
                    <button
                      class="
                        -m-3
                        p-3
                        block
                        rounded-md
                        hover:bg-primary-80
                        transition
                        ease-in-out
                        duration-150
                        text-left
                      "
                      @click="sortRateQuotes(0)"
                    >
                      <p class="text-base font-medium text-primary-100">
                        Cheapest
                      </p>
                      <p class="mt-1 text-sm text-grayText">
                        Sort from lowest price to highest
                      </p>
                    </button>

                    <button
                      class="
                        -m-3
                        p-3
                        block
                        rounded-md
                        hover:bg-primary-80
                        transition
                        ease-in-out
                        duration-150
                        text-left
                      "
                      @click="sortRateQuotes(1)"
                    >
                      <p class="text-base font-medium text-primary-100">
                        Fastest
                      </p>
                      <p class="mt-1 text-sm text-grayText">
                        Sort from fastest delivery to slowest
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div v-if="!isLoading && rateQuoteItems.length > 0">
            <div
              v-for="item in rateQuoteItems"
              :key="item.id"
              @click="selecteRateQuote(item)"
              class="
                cursor-pointer
                py-6
                px-12
                mt-4
                flex
                sm:flex-row
                flex-col
                justify-between
                bg-white
                rounded-lg
                border
                shadow-md
                relative
              "
              :class="{
                'border-primary-100 ring-primary-80 ring-[6px] ring-offset-primary-100 ring-offset-1':
                  selectedRate.id === item.id,
              }"
            >
              <div
                v-if="selectedRate.id === item.id"
                style="width: 25px; height: 25px"
                class="rounded-50 absolute left-2 top-40 z-[40] bg-primary-100"
              >
                <BaseIcon icon="check" color="white" size="1x" />
              </div>
              <div
                class="
                  flex
                  sm:items-center
                  flex-col
                  sm:flex-row
                  justify-left justify-around
                  sm:gap-4
                "
              >
                <div
                  class="
                    flex flex-col
                    text-center
                    justify-between
                    leading-normal
                    gap-3
                  "
                >
                  <div class="mb-1 flex-col items-start justify-center text-left">
                    <h4
                      class="font-semibold text-[#212B36] text-lg tracking-wide"
                    >
                      {{ displayItemService(item.service) }}
                    </h4>
                    <h4 class="text-green-500 font-display text-2xl">
                      ${{ item.rate }}
                    </h4>
                  </div>
                  <div class="text-left">
                    <div>
                      <h5 class="text-sm font-[#212B36] font-medium">
                        Estimated Delivery
                      </h5>
                    </div>
                    <div>
                      <span
                        v-if="item && item.delivery_days"
                        class="text-sm tracking-wider text-[#637381]"
                      >
                        {{ item.delivery_days }} Day{{
                          item.delivery_days > 1 ? "s" : null
                        }}
                      </span>
                      <span v-else>Unknown</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center my-4 sm:my-0 gap-3 rateLogoContainer">
                <img
                  v-if="item.carrier === 'USPS'"
                  class="
                    w-full
                    h-auto
                    mx-auto
                    my-auto
                    object-contain
                    transition
                    duration-500
                    ease
                    hover:transform hover:scale-[110%]
                  "
                  src="@/assets/images/usps-logo.svg"
                  alt="USPS"
                />
                <img
                  v-else-if="item.carrier === 'UPS'"
                  class="
                    w-full
                    h-auto
                    mx-auto
                    my-auto
                    object-contain
                    transition
                    duration-500
                    ease
                    hover:transform hover:scale-[110%]
                  "
                  src="@/assets/images/ups-logo.svg"
                  alt="UPS"
                />
                <img
                  v-else
                  class="
                    w-full
                    h-auto
                    mx-auto
                    my-auto
                    object-contain
                    transition
                    duration-500
                    ease
                    hover:transform hover:scale-[110%]
                  "
                  src="@/assets/images/fedex-logo.svg"
                  alt="FedEx"
                />
              </div>
            </div>
          </div>
          <div v-else-if="!isLoading && rateQuoteItems.length === 0">
            <p class="mt-5">No result found</p>
          </div>
          <div v-else>
            <BaseLoader />
          </div>
        </div>
        <div class="w-full md:max-w-sm">
          <div
            class="
              mt-10
              max-w-sm
              hidden
              md:grid
              bg-white
              rounded-lg
              border
              shadow-md
              px-5
              py-5
              text-left
              h-max
              mx-auto
            "
          >
            <h3
              class="text-sm font-bold text-[#37322C] tracking-wider uppercase"
            >
              lable preview
            </h3>

            <hr class="my-5 flex-grow border-dashed border border-[#E1E3E6]" />
            <div>
              <div class="flex justify-between">
                <h3
                  class="
                    text-sm
                    font-bold
                    text-[#37322C]
                    tracking-wider
                    uppercase
                  "
                >
                  from
                </h3>
                <p class="text-sm leading-6">{{ lableDetails.phone }}</p>
              </div>
              <div class="text-sm leading-6">
                <p>{{ lableDetails.name }}</p>
                <p>{{ lableDetails.company }}</p>
                <p>{{ lableDetails.street1 }}</p>
                <p>
                  {{ lableDetails.city }}, {{ lableDetails.state }},
                  {{ lableDetails.zip }}
                </p>
              </div>
            </div>
            <hr class="my-5 flex-grow border-dashed border border-[#E1E3E6]" />
            <div>
              <div class="flex justify-between">
                <h3
                  class="
                    text-sm
                    font-bold
                    text-[#37322C]
                    tracking-wider
                    uppercase
                  "
                >
                  To
                </h3>
                <p class="text-sm leading-6">{{ lableDetails.tophone }}</p>
              </div>
              <div class="text-sm leading-6">
                <p>{{ lableDetails.toname }}</p>
                <p>{{ lableDetails.tocompany }}</p>
                <p>{{ lableDetails.tostreet1 }}</p>
                <p>
                  {{ lableDetails.tocity }}, {{ lableDetails.tostate }},
                  {{ lableDetails.tozip }}
                </p>
              </div>
            </div>
            <hr class="my-5 flex-grow border-dashed border border-[#E1E3E6]" />
            <div>
              <div>
                <h3
                  class="
                    text-sm
                    font-bold
                    text-[#37322C]
                    tracking-wider
                    uppercase
                  "
                >
                  Package
                </h3>
              </div>
              <div class="flex justify-between text-sm leading-6">
                <p>Type</p>
                <p>{{ lableDetails.type }}</p>
              </div>
              <div class="flex justify-between text-sm leading-6">
                <p>Length</p>
                <p>{{ lableDetails.length }} IN</p>
              </div>
              <div class="flex justify-between text-sm leading-6">
                <p>Width</p>
                <p>{{ lableDetails.width }} IN</p>
              </div>
              <div class="flex justify-between text-sm leading-6">
                <p>Height</p>
                <p>{{ lableDetails.height }} IN</p>
              </div>
              <div class="flex justify-between text-sm leading-6">
                <p>Weight</p>
                <p>{{ lableDetails.weight }} LBS</p>
              </div>
              <div class="flex justify-between text-sm leading-6">
                <p>Insurance</p>
                <p>$ {{ lableDetails.insuranceValue || "0" }}</p>
              </div>
            </div>
          </div>
          <div
            class="
              mt-5
              w-full
              md:max-w-sm
              bg-white
              rounded-lg
              border
              shadow-md
              px-5
              py-5
              text-left
              h-max
              mx-auto
            "
          >
            <h3
              class="text-sm font-bold text-[#37322C] tracking-wider uppercase"
            >
              Extra Services:
            </h3>
            <div class="flex items-center text-gray-700 mt-[0.75rem]">
              <input
                id="signature"
                v-model="signature"
                type="checkbox"
                :checked="signature"
                class="
                  text-accent-100
                  rounded-sm
                  focus:ring-accent-100
                  border-gray-300
                  transition-all
                  h-5
                  w-5
                "
              />
              <label
                for="signature"
                class="
                  text-[0.875rem] text-[#6D6D78]
                  leading-[1.313rem]
                  ml-[1.125rem]
                  font-normal
                "
                >Add Signature Confirmation (+$5.00)</label
              >
            </div>
          </div>
          <BaseButton
            :disabled="Object.keys(selectedRate).length < 1"
            class="grow font-semibold text-md w-full md:max-w-sm mt-5 mx-auto"
            @click="proceedToCheckout"
          >
            PROCEED TO CHECKOUT
          </BaseButton>
          <BaseButton
            class="w-full mt-4"
            varient="transparent"
            @click="stepBack"
            >STEP BACK</BaseButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { startCase, camelCase } from "lodash";
export default {
  data() {
    return {
      selectedRate: {},
      signature: null,
      rateQuoteItems: [],
      lableDetails: {},
      menuOpened: false,
      sortBy: 0,
      isLoading: true,
    };
  },
  methods: {
    sortRateQuotes(sortBy) {
      this.sortBy = sortBy;
      if (sortBy === 0) {
        this.rateQuoteItems.sort((a, b) => {
          return Number(a.rate) - Number(b.rate);
        });
      } else if (sortBy === 1) {
        this.rateQuoteItems.sort((a, b) => {
          return a.delivery_days - b.delivery_days;
        });
      }
      this.menuOpened = false;
    },
    displayItemService(service) {
      return startCase(camelCase(service));
    },
    selecteRateQuote(item) {
      this.selectedRate = item;
      this.$store.commit("shipment/SET_SELECTED_RATE", item);
      // localStorage.setItem("SelectedRate", JSON.stringify(item));
    },
    proceedToCheckout() {
      // localStorage.setItem("Signature", this.signature);
      this.$store.commit("shipment/SET_SIGNATURE", this.signature);
      this.$nextTick(() => {
        this.$router.push({
          name: "checkout",
          params: { fromRatePage: true },
          query: { id: this.$route.query.id },
        });
      });
    },
    stepBack() {
      this.$nextTick(() => {
        this.$router.push({
          name: "item-delivery",
          query: { id: this.$route.query.id },
        });
      });
    },
  },
  mounted() {
    if (this.$route.params.fromItemDelivery) {
      this.isLoading = true;
      this.$axios
        .post(
          "/getshippingrates",
          JSON.parse(
            JSON.stringify(this.$store.getters["shipment/lableDetails"])
          )
        )
        .then((response) => {
          if (response.status === 200) {
            let shippingRates = {
              buyer_address: response.data.buyer_address,
              from_address: response.data.from_address,
              id: response.data.id,
              parcel: response.data.parcel,
              rates: response.data.rates,
              return_address: response.data.return_address,
              to_address: response.data.to_address,
            };
            this.$store.commit("shipment/SET_SHIPPING_RATES", shippingRates);
            let ratesQuotes = JSON.parse(
              JSON.stringify(this.$store.getters["shipment/shippingRates"])
            );
            this.rateQuoteItems = ratesQuotes.rates;
            this.isLoading = false;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
      let lableDetails = JSON.parse(
        JSON.stringify(this.$store.getters["shipment/lableDetails"])
      );
      
      lableDetails.type = "Box";
      if (this.$store.getters["shipment/insuranceValue"]) {
        lableDetails.insuranceValue = JSON.parse(
          JSON.stringify(this.$store.getters["shipment/insuranceValue"])
        );
      }
      this.lableDetails = lableDetails;
      this.sortRateQuotes(0);
    } else {
      if(JSON.parse(JSON.stringify(this.$store.getters["shipment/itemDeliveryId"]))){
        this.$nextTick(() => {
          this.$router.push({
            name: "item-delivery",
            query: { id: JSON.parse(JSON.stringify(this.$store.getters["shipment/itemDeliveryId"])) },
          });
        });
      }
      else{
        this.$nextTick(() => {
          this.$router.push({
            name: "lost-items",
          });
        });
      }
    }
  },
};
</script>

<style scoped>
.wrapper {
  @apply flex flex-col justify-start pt-0 items-center text-center mx-auto;
}
.bg-accent {
  background-color: #f06b04;
}
.w-32 {
  width: 32px;
}
.rounded-50 {
  border-radius: 50%;
}
.top-40 {
  top: 40%;
}
.rateLogoContainer img {
  max-width: 179px;
  max-height: 120px;
}
</style>