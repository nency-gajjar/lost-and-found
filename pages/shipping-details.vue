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
              <tbody class="bg-white text-gray-800">
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
                      {{
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(detail.total_amount / 100)
                      }}
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
            <!-- <div class="flex justify-between items-center px-4 my-4 work-sans">
          <p class="text-sm leading-5 text-accent-100">
            Showing
            <span class="font-medium">1</span>
            to
            <span class="font-medium">200</span>
            of
            <span class="font-medium">2000</span>
            results
          </p>
          <div>
            <nav class="relative z-0 inline-flex items-center shadow-sm">
              <a
                href="#"
                class="
                  relative
                  inline-flex
                  items-center
                  px-2
                  py-2
                  rounded-l-md
                  border border-gray-300
                  bg-white
                  text-sm
                  leading-5
                  font-medium
                  text-gray-500
                  hover:text-gray-400
                  focus:z-10
                  focus:outline-none
                  focus:border-blue-300
                  focus:shadow-outline-blue
                  active:bg-gray-100 active:text-gray-500
                  transition
                  ease-in-out
                  duration-150
                "
                aria-label="Previous"
              >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <div>
                <a
                  href="#"
                  class="
                    -ml-px
                    relative
                    inline-flex
                    items-center
                    px-4
                    py-2
                    border border-gray-300
                    bg-white
                    text-sm
                    leading-5
                    font-medium
                    text-blue-700
                    focus:z-10
                    focus:outline-none
                    focus:border-blue-300
                    focus:shadow-outline-blue
                    active:bg-tertiary active:text-gray-700
                    transition
                    ease-in-out
                    duration-150
                    hover:bg-tertiary
                  "
                >
                  1
                </a>
                <a
                  href="#"
                  class="
                    -ml-px
                    relative
                    inline-flex
                    items-center
                    px-4
                    py-2
                    border border-gray-300
                    bg-white
                    text-sm
                    leading-5
                    font-medium
                    text-blue-600
                    focus:z-10
                    focus:outline-none
                    focus:border-blue-300
                    focus:shadow-outline-blue
                    active:bg-tertiary active:text-gray-700
                    transition
                    ease-in-out
                    duration-150
                    hover:bg-tertiary
                  "
                >
                  2
                </a>
                <a
                  href="#"
                  class="
                    -ml-px
                    relative
                    inline-flex
                    items-center
                    px-4
                    py-2
                    border border-gray-300
                    bg-white
                    text-sm
                    leading-5
                    font-medium
                    text-blue-600
                    focus:z-10
                    focus:outline-none
                    focus:border-blue-300
                    focus:shadow-outline-blue
                    active:bg-tertiary active:text-gray-700
                    transition
                    ease-in-out
                    duration-150
                    hover:bg-tertiary
                  "
                >
                  3
                </a>
                <a
                  href="#"
                  class="
                    -ml-px
                    relative
                    inline-flex
                    items-center
                    px-4
                    py-2
                    border border-gray-300
                    bg-white
                    text-sm
                    leading-5
                    font-medium
                    text-blue-600
                    focus:z-10
                    focus:outline-none
                    focus:border-blue-300
                    focus:shadow-outline-blue
                    active:bg-tertiary active:text-gray-700
                    transition
                    ease-in-out
                    duration-150
                    hover:bg-tertiary
                  "
                >
                  4
                </a>
              </div>
              <div>
                <a
                  @click="fetchNextData"
                  class="
                    -ml-px
                    relative
                    inline-flex
                    items-center
                    px-2
                    py-2
                    rounded
                    border border-gray-300
                    bg-white
                    text-sm
                    leading-5
                    font-medium
                    text-gray-500
                    hover:text-gray-400
                    focus:z-10
                    focus:outline-none
                    focus:border-blue-300
                    focus:shadow-outline-blue
                    active:bg-gray-100 active:text-gray-500
                    transition
                    ease-in-out
                    duration-150
                  "
                  aria-label="Next"
                >
                  Next
                </a>
              </div>
            </nav>
          </div>
        </div> -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { startCase, camelCase } from "lodash";
export default {
  middleware: ["auth-admin"],
  data() {
    return {
      shippingDetails: [],
    };
  },
  computed: {},
  methods: {
    // async fetchNextData(){
    //   if(this.shippingDetails[0].has_more){
    //     let length = this.shippingDetails.length;
    //     let response = await this.$axios.post("/getAllShippingDetails", {abc: 123, after_id: this.shippingDetails[length - 1].tracker.shipment_id});
    //     this.shippingDetails = response.data;
    //   }
    // }
    packageDimensionsString(detail) {
      return `${detail?.item_length} x ${detail?.item_width} x ${detail?.item_height}`;
    },
    displayItemService(service) {
      return startCase(camelCase(service));
    },
  },
  async mounted() {
    let response = await this.$axios.post("/getAllShippingDetails");
    this.shippingDetails = response.data;
    console.log(this.shippingDetails);
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @apply flex flex-col justify-start pt-0 items-center text-center mx-8;
}
.img-width {
  width: 100px;
}
</style>