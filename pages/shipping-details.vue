<template>
  <div class="wrapper">
    <div
      class="
        mt-5
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
          overflow-hidden rounded-bl-lg
          rounded-br-lg
        "
      >
        <table class="min-w-full">
          <thead>
            <tr
              class="bg-accent-100 text-white uppercase text-sm leading-normal"
            >
              <th data-priority="1" class="py-3 px-6 text-left">Image</th>
              <th class="py-3 px-6 text-left">Item description</th>
              <th class="py-3 px-6 text-center">Sender Affiliation</th>
              <th class="py-3 px-6 text-center">Sender's Email</th>
              <th class="py-3 px-6 text-center">Sender's Phone</th>
              <th class="py-3 px-6 text-center">Receiver's Name</th>
              <th class="py-3 px-6 text-center">Receiver's Email</th>
              <th class="py-3 px-6 text-center">Receiver's Phone</th>
              <th class="py-3 px-6 text-center">Package weight</th>
              <th class="py-3 px-6 text-center">Package dimensions</th>
              <th class="py-3 px-6 text-center">Total paid amount</th>
              <th class="py-3 px-6 text-center">Service</th>
              <th class="py-3 px-6 text-center">Provider</th>
              <!-- <th class="py-3 px-6 text-center">Actions</th> -->
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="detail in shippingDetails" :key="detail.id" class="border-b border-gray-200 hover:bg-gray-100">
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
              </td>
              <td class="py-3 px-6 text-left">
                  <p>{{ detail.venu_type }}</p>
              </td>
              <td class="py-3 px-6 text-left">
                  <p>{{ detail.venue_email }}</p>
              </td>
              <td class="py-3 px-6 text-left">
                  <p>{{ detail.venue_phone_no }}</p>
              </td>
              <td class="py-3 px-6 text-left">
                  <p>{{ detail.receiver_name }}</p>
              </td>
              <td class="py-3 px-6 text-left">
                  <p>{{ detail.receiver_email }}</p>
              </td>
              <td class="py-3 px-6 text-left">
                  <p>{{ detail.receiver_mobile_no }}</p>
              </td>
              <td class="py-3 px-6 text-left">
                  <p>{{ detail.weight_pounds }} lbs</p>
              </td>
              <td class="py-3 px-6 text-left">
                  <p>{{detail.item_length}}(l) x {{detail.item_width}}(w) x {{detail.item_height}}(h)</p>
              </td>
              <td class="py-3 px-6 text-left">
                  <p>$ {{ detail.total_amount / 100 }}</p>
              </td>
              <td class="py-3 px-6 text-center">
                <span
                  class="
                    bg-purple-200
                    text-purple-600
                    py-1
                    px-3
                    rounded-full
                    text-xs
                  "
                  >{{ detail.service_name }}</span
                >
              </td>
              <td class="py-3 px-6 text-center">
                <span
                  class="
                    bg-purple-200
                    text-purple-600
                    py-1
                    px-3
                    rounded-full
                    text-xs
                  "
                  >{{ detail.service_provider }}</span
                >
              </td>
              <!-- <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center">
                  <div
                    class="
                      w-4
                      mr-2
                      transform
                      hover:text-purple-500 hover:scale-110
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div
                    class="
                      w-4
                      mr-2
                      transform
                      hover:text-purple-500 hover:scale-110
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <div
                    class="
                      w-4
                      mr-2
                      transform
                      hover:text-purple-500 hover:scale-110
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                </div>
              </td> -->
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
  </div>
</template>

<script>
export default {
  middleware: ["auth-admin"],
  data() {
    return {
        shippingDetails: [],
    };
  },
  methods: {
    // async fetchNextData(){
    //   if(this.shippingDetails[0].has_more){
    //     let length = this.shippingDetails.length;
    //     let response = await this.$axios.post("/getAllShippingDetails", {abc: 123, after_id: this.shippingDetails[length - 1].tracker.shipment_id});
    //     this.shippingDetails = response.data;
    //   }
    // }
  },
  async mounted(){
    let response = await this.$axios.post("/getAllShippingDetails");
    this.shippingDetails = response.data;
    console.log(this.shippingDetails);
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @apply flex flex-col p-5 justify-start pt-0 items-center text-center mx-auto;
}
.img-width {
  width: 50px;
}
</style>