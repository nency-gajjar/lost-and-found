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
          <div
            v-for="item in rateQuoteItems"
            :key="item.id"
            @click="selecteRateQuote(item.id)"
            class="
              cursor-pointer
              py-6
              px-12
              mt-5
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
                selectedRate === item.id,
            }"
          >
            <div
              v-if="selectedRate === item.id"
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
        <div class="w-full md:max-w-sm">
          <div
            class="
              mt-5
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
                <p>Category</p>
                <p>{{ lableDetails.category }}</p>
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
            class="grow font-semibold text-md w-full md:max-w-sm mt-5 mx-auto"
          >
            PROCEED TO CHECKOUT
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
            STEP BACK
          </button>
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
      selectedRate: null,
      signature: null,
      rateQuoteItems: [],
      lableDetails: {},
    };
  },
  methods: {
    displayItemService(service) {
      return startCase(camelCase(service));
    },
    selecteRateQuote(id) {
      this.selectedRate = id;
    },
    stepBack() {
      this.$nextTick(() => {
        this.$router.go(-1);
      });
    },
  },
  mounted() {
    let shippingRates = JSON.parse(localStorage.getItem("ShippingRates"));
    this.rateQuoteItems = shippingRates.rates;
    let lableDetails = JSON.parse(localStorage.getItem("LableDetails"));
    lableDetails.category = "My Own Packaging";
    lableDetails.type = "Box";
    if (localStorage.getItem("InsuranceValue")) {
      lableDetails.insuranceValue = localStorage.getItem("InsuranceValue");
    }
    this.lableDetails = lableDetails;
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