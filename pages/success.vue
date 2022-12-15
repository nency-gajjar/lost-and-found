<template>
  <main class="text-center space-y-5 max-w-5xl mx-auto">
    <div class="flex space-y-5 max-w-5xl mx-auto">
      <div
        class="
          border border-[#E1E3E6]
          rounded-lg
          bg-white
          sm:mt-14
          mt-8
          mx-4
          md:px-12
          px-6
          sm:space-x-2
          lg:space-x-0
          w-full
          flex
          justify-between
          flex-col
          sm:flex-row
        "
        style="box-shadow: -10px 18px 32px rgba(54, 28, 93, 0.04)"
      >
        <div
          class="
            sm:w-1/2
            w-full
            text-center
            sm:text-left
            py-4
            lg:py-0
            sm:max-w-md
            flex flex-col
            items-center
            justify-center
            sm:items-start
            mb-8
            sm:mb-0
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
        <div
          class="
            sm:w-1/2
            w-full
            text-center
            sm:text-left sm:max-w-md
            relative
            flex
            justify-center
            md:justify-end
          "
        >
          <img
            class="h-[250px] mt-0 sm:-mt-10 lg:-mt-12"
            src="../assets/images/successfull-payment.svg"
          />
        </div>
      </div>
    </div>
    <div class="text-center mt-8 space-y-5 max-w-4xl mx-auto px-4">
      <h3 class="text-xl font-medium text-primary-100">
        You have successfully created a shipping label!
      </h3>
      <p class="text-gray-800">
        Your label will be automatically sent to the sender’s email address: <span class="font-semibold">{{ itemDetails.venue_email }}</span>, and also to your email address: <span class="font-semibold">{{ itemDetails.receiver_email }}</span>. Please be sure to check the spam if you have not received the email.
      </p><br/>
      <p class="text-gray-800">
        We recommend that you call the sender below to ensure that they have received the email containing the label. <br> <span class="font-semibold text-gray-700">Sender name:</span> {{ itemDetails.venue_name }} <br> <span class="font-semibold text-gray-700">Sender Mobile No:</span> <a :href="`tel: ${itemDetails.venue_phone_no}`" class="font-display underline decoration-1">{{ itemDetails.venue_phone_no }}</a>
      </p>
      <BaseButton v-if="!itemDetails.scheduled_pickup" @click="printLabel"> Print Label </BaseButton>
    </div>
    <p class="text-gray-800">
      Optionally, you can schedule a pickup for your package:
    </p>
    <div
      class="
        flex flex-col
        sm:flex-row
        flex-wrap
        sm:flex-nowrap
        gap-4
        items-center
        justify-center
        px-4
      "
    >
      <BaseButton
        class="w-full sm:w-fit"
        :disabled="itemDetails.scheduled_pickup"
        varient="secondary"
        @click="showSchedulePickup = true"
      >
        Schedule Pickup
      </BaseButton>
      <BaseButton
        class="w-full sm:w-fit"
        varient="primaryAlt"
        @click="$router.push('lost-items')"
      >
        Back to listing
      </BaseButton>
    </div>
    <p class="text-gray-800">
      Need help? Reach out to us at <a href="mailto:support@foundshelf.com" class="font-display underline decoration-1">support@foundshelf.com</a>
      In most cases, we will send you a reply in an hour!
    </p>
    <SchedulePickupModal
      v-if="showSchedulePickup"
      :show-modal="showSchedulePickup"
      @close="showSchedulePickup = false"
    />
  </main>
</template>

<script>
import SchedulePickupModal from "~/components/SchedulePickupModal.vue";
import { startCase, camelCase } from "lodash";

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
        delivery_confirmation:
          JSON.parse(
            JSON.stringify(this.$store.getters["shipment/signature"])
          ) === true
            ? true
            : false,
      };

      try {
        let response = await this.$axios.post(
          "/updatesinglelostitem?id=" + this.itemId,
          update_params
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
    displayItemService(service) {
      return startCase(camelCase(service));
    },
    printLabel() {
      let imgHtml = "";
      if (this.itemDetails.image) {
        imgHtml =
          "<div class='flex justify-around w-100-px'> <img src='http://34.197.126.8/_nuxt/assets/images/found-shelf-icon.svg' /> <img src=" +
          this.itemDetails.image +
          "></div>";
      }
      else {
        imgHtml =
          "<div class='itemImgContainer'><img src='http://34.197.126.8/_nuxt/assets/images/found-shelf-icon.svg' /></div>";
      }
      let htmlToPrint = `
      <html><head>
      <style>
          .border-dashed {
            border-top-style: dashed;
          }
          .w-full {
            width: 100% !important;
          }
          .border {
            border-width: 2px;
          }
          .border-accent {
            border-top-color: #000000;
          }
          .flex {
            display: flex;
          }
          .justify-center {
            justify-content: center;
          }
          .justify-between {
            justify-content: space-between;
          }
          .justify-around {
            justify-content: space-around;
          }
          .labelContainer, .itemImgContainer{
            display: flex;
            justify-content: center;
            margin-top: 10px;
          }
          .text-accent-100 {
            color: #970584ba;
          }
          .text-gray-600 {
            color: rgb(82 82 82);
          }
          .labelContainer img{
            height: 600px;
          }
          .itemImgContainer img{
            width: 100px;
          }
          .w-100-px img{
            width: 100px;
          }
          .text-center{
            text-align: center;
          }
          .font-bold{
            font-weight: bold;
          }
          .w-20 {
            width: 3rem;
          }
          .border-t-4 {
            border-top-width: 4px;
          }
          .border-solid {
            border-style: solid;
          }
          .border-gray-300 {
            border-color: rgb(212 212 212);
          }
          .inline-block {
            display: inline-block;
          }
          table tr td {
            padding: 10px 20px;
          }
        </style>
        </head><body>
        ${imgHtml}
        <table>
          <tr>
            <td>
              <p class='text-accent-100 font-bold'>Sender's Details: </p>
              <p>Sender Affiliation: ${this.itemDetails.venu_type}</p>
              <p>Email: ${this.itemDetails.venue_email}</p>
              <p>Mobile number: ${this.itemDetails.venue_phone_no}</p>
            </td>
            <td>
              <p class='text-accent-100 font-bold'>Receiver's Details: </p>
              <p>Name: ${this.itemDetails.receiver_name}</p>
              <p>Email: ${this.itemDetails.receiver_email}</p>
              <p>Mobile number: ${this.itemDetails.receiver_mobile_no}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p class='text-accent-100 font-bold'>Package Details: </p>
              <p>Item Description: ${this.itemDetails.item_description}</p>
              <p>Weight: ${this.itemDetails.weight_pounds} LBS</p>
              <p>Dimension: ${this.itemDetails.item_length}(l) x ${
        this.itemDetails.item_width
      }(w) x ${this.itemDetails.item_height}(h) </p>
            </td>
            <td>
              <p class='text-accent-100 font-bold'>Shipping Details: </p>
              <p>Amount: $ ${this.itemDetails.total_amount / 100}</p>
              <p>Service: ${this.displayItemService(
                this.itemDetails.service_name
              )}</p>
              <p>Service provider: ${this.itemDetails.service_provider}</p>
            </td>
          </tr>
          </table>
          <div class="flex justify-center"><p>Tracking ID: ${this.itemDetails.tracking_id}</p></div>
          <div class="flex">
            <div style="width: 20px">
              <svg style="color: rgb(240, 107, 4);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="60" cy="76" r="28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle><circle cx="60" cy="180" r="28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle><line x1="136" y1="128" x2="83.1" y2="164.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><line x1="232" y1="62.3" x2="164.3" y2="108.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><line x1="232" y1="193.7" x2="83.1" y2="91.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line></svg>
            </div>
            <hr class="w-full border-dashed border border-accent" />
          </div>
          <div class='labelContainer'><img src=${this.labelUrl}></div>
          </body></html>
      `;
      let userAgent = navigator.userAgent.toLowerCase();
      let mobile = userAgent.indexOf("mobile") > -1;
      let android = userAgent.indexOf("android") > -1;

      let htmlElement = document.createElement("html");
      htmlElement.innerHTML = htmlToPrint;

      if (mobile || android) {
        this.$html2pdf(htmlElement, {
          filename: "label.pdf",
          image: { type: "jpg", quality: 0.98 },
          html2canvas: {
            dpi: 300,
            letterRendering: true,
            useCORS: true,
          },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        });
      } else {
        const mywindow = window.open("", "PRINT", "height=1200,width=600");
        mywindow.document.write(htmlToPrint);
        setTimeout(() => {
          mywindow.print();
          setTimeout(mywindow.close, 0);
        }, 3000);
      }
    },
  },
};
</script>
