<template>
  <main class="text-center mt-8 space-y-5 max-w-5xl mx-auto">
    <div
      class="
        border border-[#E1E3E6]
        rounded-lg
        bg-white
        md:mt-14
        mt-24
        mx-4
        md:px-12
        px-6
        sm:space-x-2
        lg:space-x-0 lg:h-[10.375rem]
        flex
        justify-between
        flex-col
        sm:flex-row
      "
      style="box-shadow: -10px 18px 32px rgba(54, 28, 93, 0.04)"
    >
      <div
        class="
          space-y-2
          lg:mt-9
          sm:w-1/2
          w-full
          text-center
          sm:text-left
          py-4
          lg:py-0
          max-w-md
        "
      >
        <h2
          class="
            font-bold
            text-4xl
            md:text-[2.625rem] md:leading-[3.125rem]
            text-accent-100
          "
        >
          Success!
        </h2>
        <p class="text-gray-800 text-sm max-w-[21.875rem]">
          Your shipment created successfully!
        </p>
      </div>
    </div>
    <div class="text-center mt-8 space-y-5 max-w-xl mx-auto">
      <h3 class="text-xl font-medium text-primary-100 font-display">
        You have succesfully created a label!
      </h3>
      <p class="text-gray-800">
        Thank you for choosing Lost and Found! Your next step is to print the
        label, attach it to your package and wait for pickup.
      </p>
      <BaseButton @click="printLabel"> Print Label </BaseButton>
    </div>
    <p class="text-gray-800">
      Optionally, you can schedule a pickup for your package:
    </p>
    <div class="flex gap-4 items-center justify-center">
      <BaseButton varient="secondary" @click="showSchedulePickup = true">
        Schedule Pickup
      </BaseButton>
      <BaseButton varient="primaryAlt" @click="$router.push('lost-items')">
        Back to listing
      </BaseButton>
    </div>
    <SchedulePickupModal
      v-if="showSchedulePickup"
      :show-modal="showSchedulePickup"
      @close="showSchedulePickup = false"
    />
  </main>
</template>

<script>
import SchedulePickupModal from "~/components/SchedulePickupModal.vue";

export default {
  components: {
    SchedulePickupModal,
  },
  data() {
    return {
      labelUrl: "",
      itemId: "",
      showSchedulePickup: false,
      itemDetails: {},
    };
  },
  async mounted() {
    if (this.$store.getters["shipment/labelUrl"]) {
      this.labelUrl = JSON.parse(
        JSON.stringify(this.$store.getters["shipment/labelUrl"])
      );
    }
    if (this.$store.getters["shipment/itemId"]) {
      this.itemId = JSON.parse(
        JSON.stringify(this.$store.getters["shipment/itemId"])
      );

      let update_params = {
        from_address: JSON.parse(JSON.stringify(this.$store.getters["shipment/shippingRates"])).from_address.id,
        to_address: JSON.parse(JSON.stringify(this.$store.getters["shipment/shippingRates"])).to_address.id,
        carrier_accounts: JSON.parse(JSON.stringify(this.$store.getters["shipment/selectedRate"])).carrier_account_id,
        parcel: JSON.parse(JSON.stringify(this.$store.getters["shipment/shippingRates"])).parcel.id,
        delivery_confirmation: JSON.parse(JSON.stringify(this.$store.getters["shipment/signature"])) === true ? true : false,
      }

      try {
        let response = await this.$axios.post(
          "/updatesinglelostitem?id=" + this.itemId, update_params
        );
      } catch (err) {
        console.log(err);
      }

      try {
        let response = await this.$axios.get(
          "/getsinglelostitem?id=" + this.itemId
        );
        this.itemDetails = response.data.data.Item;
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    printLabel() {
      const mywindow = window.open("", "PRINT", "height=1200,width=600");
      mywindow.document.write("<html><head>");
      mywindow.document.write(`<style>
        .labelContainer, .itemImgContainer{
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .labelContainer img{
          width: 500px;
        }
        .itemImgContainer img{
          width: 200px;
        }
        .text-center{
          text-align: center;
        }
      </style>`);
      mywindow.document.write("</head><body>");
      mywindow.document.write(
        "<div><h3 class='text-center'>Item Description: " +
          this.itemDetails.item_description +
          "</h3></div>"
      );
      if (this.itemDetails.image) {
        mywindow.document.write(
          "<div class='itemImgContainer'><img src=" + this.itemDetails.image + "></div>"
        );
      }
      mywindow.document.write(
        "<div class='labelContainer'><img src=" + this.labelUrl + "></div>"
      );
      mywindow.document.write("</body></html>");
      setTimeout(() => {
        mywindow.print();
        setTimeout(mywindow.close, 0);
      }, 2000);
    },
  },
};
</script>

<style>
</style>