<template>
  <div class="wrapper">
    <div class="container max-w-full mx-auto px-4">
      <main class="my-10 space-y-6">
        <div class="flex flex-col md:space-y-0 md:flex-row justify-between">
          <div class="mr-6 order-2 md:order-1 mt-3 md:mt-0">
            <h1 class="text-2xl text-gray-600 font-semibold">
              Shipping Details
            </h1>
          </div>
        </div>
        <div
          class="
            overflow-x-auto
            rounded-tl-lg rounded-tr-lg
            inline-block
            w-full
            bg-white
            shadow-lg
          "
        >
          <div
            class="
              align-middle
              inline-block
              min-w-full
              whitespace-nowrap
              overflow-hiddenrounded-bl-lg
              rounded-br-lg
            "
          >
            <table class="min-w-full">
              <thead class="sticky top-0 z-20">
                <tr
                  class="
                    bg-accent-100
                    text-white
                    uppercase
                    text-sm
                    leading-normal
                  "
                >
                  <th data-priority="1" class="py-3 px-6 text-left">Image</th>
                  <th class="py-3 px-6 text-left">Item description</th>
                  <th class="py-3 px-6 text-left">Sender's Details</th>
                  <th class="py-3 px-6 text-left">Receiver's Details</th>
                  <th class="py-3 px-6 text-left">Amount</th>
                  <th class="py-3 px-6 text-left">Service</th>
                </tr>
              </thead>
              <tbody v-if="shippingDetails.length > 0" class="bg-white text-gray-800">
                <tr
                  v-for="detail in shippingDetails"
                  :key="detail.id"
                  class="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                      <div class="mr-2">
                        <img
                          v-if="detail.image"
                          class="img-width"
                          :src="detail.image"
                        />
                        <img
                          v-else
                          class="img-width"
                          src="@/assets/images/no-image4.png"
                        />
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ detail.item_description }}</p>
                    <p>
                      <span class="text-gray-600 text-sm">
                        ({{ packageDimensionsString(detail) }},{{
                          detail.weight_pounds
                        }}
                        lbs)
                      </span>
                    </p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ detail.venu_type }}</p>
                    <p>{{ detail.venue_email }}</p>
                    <p>{{ detail.venue_phone_no }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ detail.receiver_name }}</p>
                    <p>{{ detail.receiver_email }}</p>
                    <p>{{ detail.receiver_mobile_no }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>
                      {{ Number(detail.total_amount / 100) | currency }}
                    </p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ displayItemService(detail.service_name) }}</p>
                    <span
                      :class="
                        detail.service_provider === 'USPS'
                          ? 'bg-blue-200 text-blue-600'
                          : detail.service_provider === 'UPS'
                          ? 'bg-yellow-200 text-amber-600'
                          : detail.service_provider === 'FedEx'
                          ? 'bg-orange-200 text-orange-600'
                          : detail.service_provider === 'DHLExpress'
                          ? 'bg-red-200 text-red-600'
                          : 'bg-gray-200 text-gray-700'
                      "
                      class="py-1 px-3 rounded-full text-xs"
                      >{{ detail.service_provider }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="!isLoading && shippingDetails.length === 0">
              <p class="py-3">
                No shipping details found!
              </p>
            </div>
            <div class="py-3" v-if="isLoading">
              <BaseLoader :needFullScreen="false" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { startCase, camelCase } from "lodash";
import FormatCurrency from "~/mixins/formatCurrency";
export default {
  middleware: ["auth-admin"],
  mixins: [FormatCurrency],
  data() {
    return {
      shippingDetails: [],
      isLoading: true,
    };
  },
  computed: {},
  methods: {
    packageDimensionsString(detail) {
      return `${detail?.item_length} x ${detail?.item_width} x ${detail?.item_height}`;
    },
    displayItemService(service) {
      return startCase(camelCase(service));
    },
  },
  async mounted() {
    this.isLoading = true;
    let response = await this.$axios.post("/getAllShippingDetails");
    this.shippingDetails = response.data;
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @apply flex flex-col justify-start pt-0 items-center text-center mx-0 sm:mx-8;
}
.img-width {
  width: 100px;
}
</style>