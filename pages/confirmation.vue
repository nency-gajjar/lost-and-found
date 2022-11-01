<template>
  <div class="wrapper my-10" v-if="Object.keys(itemDetails).length > 0">
    <div
      class="
        card
        w-12/12
        mx-4
        md:mx-auto md:w-8/12
        lg:w-6/12
        mx-auto
        rounded-lg
        shadow-lg
        bg-white
        overflow-hidden
      "
    >
      <table
        id="printMe"
        width="100%"
        class="table-style"
        cellspacing="0"
        cellpadding="0"
      >
        <tbody>
          <tr>
            <td class="padding-1rem">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <h2 class="text-2xl font-bold text-accent-100">
                      Preview Details
                    </h2>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr v-if="itemDetails.link">
            <td align="center" class="pt-3 pb-5 px-3">
              <div class="w-40 h-40">
                <img :src="itemDetails.link" alt="" />
              </div>
            </td>
          </tr>
          <tr class="border-b">
            <td class="px-6 py-4">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td colspan="2" class="pb-2">
                    <h2
                      class="
                        text-lg text-accent-100
                        font-medium
                        leading-tight
                        text-left text-gray-800
                      "
                    >
                      Sender's Details:
                    </h2>
                    <span
                      class="
                        w-20
                        border-t-4 border-solid border-gray-300
                        inline-block
                        mb-1
                      "
                    ></span>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Sender Affiliation
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.venu_type }}
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Found Item Date
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.date || itemDetails.datse }}
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Venue Email
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.venue_email }}
                    </div>
                  </td>
                </tr>
                <tr v-if="itemDetails.secondary_email" class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Venue Secondary Email
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.secondary_email }}
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Venue Phone No.
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.venue_phone_no }}
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Employee Mobile No.
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.employee_mobile_no }}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="border-b">
            <td class="px-6 py-4">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td colspan="2" class="pb-2">
                    <h2
                      class="
                        text-lg text-accent-100
                        font-medium
                        leading-tight
                        text-left text-gray-800
                      "
                    >
                      Address Details:
                    </h2>
                    <span
                      class="
                        w-20
                        border-t-4 border-solid border-gray-300
                        inline-block
                        mb-1
                      "
                    ></span>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Address
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.address }}
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">City</div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.city }}
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">State</div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.state || itemDetails.states }}
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Country
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.country }}
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Zipcode
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.zipcode }}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td colspan="2" class="pb-2">
                    <h2
                      class="
                        text-lg text-accent-100
                        font-medium
                        leading-tight
                        text-left text-gray-800
                      "
                    >
                      Found Item's Details:
                    </h2>
                    <span
                      class="
                        w-20
                        border-t-4 border-solid border-gray-300
                        inline-block
                        mb-1
                      "
                    ></span>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Item Description
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.item_description }}
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Package Type
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.package_type }}
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Weight
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.weight_pounds }} lbs
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Dimension
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{ itemDetails.item_length }}(l) x
                      {{ itemDetails.item_width }}(w) x
                      {{ itemDetails.item_height }}(h) inches
                    </div>
                  </td>
                </tr>
                <tr class="h-9">
                  <td>
                    <div class="text-left text-gray-600 font-medium">
                      Item Status
                    </div>
                  </td>
                  <td>
                    <div class="text-gray-600 text-left">
                      {{
                        itemDetails.item_status == 0 ? "Claimed" : "Unclaimed"
                      }}
                    </div>
                  </td>
                </tr>
                <template v-if="itemDetails.item_status === 'claimed'">
                  <tr class="h-9">
                    <td>
                      <div class="text-left text-gray-600 font-medium">
                        Receiver's Name
                      </div>
                    </td>
                    <td>
                      <div class="text-gray-600 text-left">
                        {{ itemDetails.receiver_name }}
                      </div>
                    </td>
                  </tr>
                  <tr class="h-9">
                    <td>
                      <div class="text-left text-gray-600 font-medium">
                        Receiver's Email
                      </div>
                    </td>
                    <td>
                      <div class="text-gray-600 text-left">
                        {{ itemDetails.receiver_email }}
                      </div>
                    </td>
                  </tr>
                  <tr class="h-9">
                    <td>
                      <div class="text-left text-gray-600 font-medium">
                        Receiver's Mobile No.
                      </div>
                    </td>
                    <td>
                      <div class="text-gray-600 text-left">
                        {{ itemDetails.receiver_mobile_no }}
                      </div>
                    </td>
                  </tr>
                </template>
              </table>
            </td>
          </tr>
        </tbody>
        <div class="item-img-container">
          <img v-if="itemDetails.image" :src="itemDetails.image" alt="" />
        </div>
      </table>
      <div class="flex flex-wrap gap-2 m-5">
        <button
          type="button"
          class="
            !py-3
            flex-auto
            font-medium
            text-md
            leading-5
            py-2
            px-8
            rounded-md
            button
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-primary-60
            transition-all
            font-display
            disabled:cursor-not-allowed
            bg-accent-100
            text-white
            focus:ring-accent-100
            shadow-accent
            hover:bg-accent-200
          "
          @click="printDetails"
        >
          <span class="button__text"> Print Details </span>
        </button>
        <button
          type="button"
          class="
            !py-3
            flex-auto
            font-medium
            text-md
            leading-5
            py-2
            px-8
            rounded-md
            button
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-primary-60
            transition-all
            font-display
            disabled:cursor-not-allowed
            bg-accent-100
            text-white
            focus:ring-accent-100
            shadow-accent
            hover:bg-accent-200
          "
          @click="routeToListing"
        >
          <span class="button__text"> Back To Listing </span>
        </button>
      </div>
    </div>
    <BaseDialog
      :showDialog="showDialog"
      :icon="{ name: 'circle-check', color: 'green', size: '3x' }"
      title="Item details submitted successfully!"
      :message="dialogMessage"
      buttonTitle="Okay"
      @close="showDialog = false"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import jsPDF from "jspdf";
export default {
  data() {
    return {
      itemDetails: {},
      showDialog: false,
    };
  },
  computed: {
    ...mapGetters("item", ["itemConfirmationDetails"]),
    dialogMessage() {
      if (!this.hasImage && !this.itemStatus) {
        return "We have sent a link for the same on your mail id. You can click on the link received over the mail to edit the item details in future, if required. Also, notification email is sent to the Item owner with the entered details. Now, the owner will have to select the Item Delivery to proceed further.";
      } else if (!this.hasImage && this.itemStatus) {
        return "Your item is listed and we have sent an link for the same on your mail id. You can click on the link received on the mail  to edit the item details, if required. You will be notified further if anyone claims the uploaded item.";
      } else if (this.hasImage && !this.itemStatus) {
        return "Item submitted to the admin for review. Please wait for the Admin to review the item details. Once reviewed & approved successfully, we will notify you for the same on your mail id. You can click on the link received over the mail to edit the item details in future, if required. Also, notification email will be sent to the Item owner with the entered details. Post that, the owner will have to select the Item Delivery to proceed further.";
      } else if (this.hasImage && this.itemStatus) {
        return "Item submitted to the admin for review. Please wait for the Admin to review the item details. Once reviewed & approved successfully, your submitted item will be listed and we will notify you for the same on your mail id. You can click on the link received on the mail to edit the item details, if required. You will be notified further if anyone claims the uploaded item.";
      }
    },
    itemStatus() {
      return this.itemDetails.item_status;
    },
    hasImage() {
      if (this.itemDetails.image.length) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.showDialog = true;
  },
  created() {
    if (Object.keys(this.itemConfirmationDetails).length > 0) {
      this.itemDetails = this.itemConfirmationDetails;
    } else {
      this.$axios
        .get("/getsinglelostitem?id=" + this.$route.query.id)
        .then((response) => {
          if (response.status === 200) {
            this.itemDetails = response.data.data.Item;
          }
        })
        .catch((error) => console.log(error));
    }
  },
  methods: {
    routeToListing() {
      this.$router.push({ path: "/found-items" });
    },
    printDetails() {
      let userAgent = navigator.userAgent.toLowerCase();
      let mobile = userAgent.indexOf("mobile") > -1;
      let android = userAgent.indexOf("android") > -1;

      if (mobile || android) {
        var doc = new jsPDF("p", "pt", "a4");
        doc.html(document.getElementById("printMe"), {
          callback: function () {
            doc.save("item-detprintMeails.pdf");
          },
        });
      } else {
        const mywindow = window.open("", "PRINT", "height=1200,width=600");

        mywindow.document.write("<html><head>");
        // mywindow.document.write(
        //   '<link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />'
        // );
        mywindow.document.write(`<style>
                    td{
                        padding-right: 5px;
                    }
                    .table-style{
                        background-color: #ffffff;
                        margin: 0 auto;
                    }
                    .pb-5 {
                        padding-bottom: 1.25rem;
                    }
                    .pt-3 {
                        padding-top: 0.75rem;
                    }
                    .px-3 {
                        padding-left: 0.75rem;
                        padding-right: 0.75rem;
                    }
                    .py-4 {
                        padding-top: 1rem;
                        padding-bottom: 1rem;
                    }
                    .px-6 {
                        padding-left: 1.5rem;
                        padding-right: 1.5rem;
                    }
                    .pb-2 {
                        padding-bottom: 0.5rem;
                    }
                    .padding-1rem{
                        padding: 1rem;
                    }
                    .text-2xl {
                        font-size: 1.5rem;
                        line-height: 2rem;
                    }
                    .text-lg {
                        font-size: 1.125rem;
                        line-height: 1.75rem;
                    }
                    .font-bold {
                        font-weight: 700;
                    }
                    .text-gray-800 {
                        --tw-text-opacity: 1;
                        color: rgb(38 38 38 / var(--tw-text-opacity));
                    }
                    .text-accent-100 {
                        color: rgb(240 107 4);
                    }
                    .border-b {
                        border-bottom-width: 1px;
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
                    .w-40 {
                        width: 10rem;
                    }
                    .w-20 {
                        width: 5rem;
                    }
                    .text-left {
                        text-align: left;
                    }
                    .font-medium {
                        font-weight: 500;
                    }
                    .h-40 {
                        height: 10rem;
                    }
                    .h-9 {
                        height: 2.25rem;
                    }
                    .text-gray-600 {
                        color: rgb(82 82 82);
                    }
                    .leading-tight {
                        line-height: 1.25;
                    }
                    .inline-block {
                        display: inline-block;
                    }
                    .mb-1 {
                        margin-bottom: 0.25rem;
                    }
                    .item-img-container{
                        max-width: 450px;
                        margin-top: 1.25rem;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .button {
                        position: relative;
                        border: none;
                        outline: none;
                        cursor: pointer;
                    }

                    .button__text {
                        color: #ffffff;
                        transition: all 0.2s;
                    }

                    .button--loading .button__text {
                        visibility: hidden;
                        opacity: 0;
                    }

                    .button--loading::after {
                        content: "";
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        border: 4px solid transparent;
                        border-top-color: #ffffff;
                        border-radius: 50%;
                        animation: button-loading-spinner 1s ease infinite;
                    }

                    @keyframes button-loading-spinner {
                        from {
                            transform: rotate(0turn);
                        }

                        to {
                            transform: rotate(1turn);
                        }
                    }
                    @media (min-width: 640px) {
                        .sm\:w-40 {
                            width: 10rem;
                        }
                    }
                </style>`);
        mywindow.document.write("</head><body>");
        // mywindow.document.write("<h1>" + document.title + "</h1>");
        mywindow.document.write(document.getElementById("printMe").innerHTML);
        mywindow.document.write("</body></html>");
        mywindow.print();
        mywindow.close();
      }
    },
  },
};
</script>
<style scoped>
td {
  padding-right: 5px;
}
.table-style {
  background-color: #ffffff;
  margin: 0 auto;
}
.pb-5 {
  padding-bottom: 1.25rem;
}
.pt-3 {
  padding-top: 0.75rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.pb-2 {
  padding-bottom: 0.5rem;
}
.padding-1rem {
  padding: 1rem;
}
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.font-bold {
  font-weight: 700;
}
.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(38 38 38 / var(--tw-text-opacity));
}
.text-accent-100 {
  color: rgb(240 107 4);
}
.border-b {
  border-bottom-width: 1px;
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
.w-40 {
  width: 10rem;
}
.w-20 {
  width: 5rem;
}
.text-left {
  text-align: left;
}
.font-medium {
  font-weight: 500;
}
.h-40 {
  height: 10rem;
}
.h-9 {
  height: 2.25rem;
}
.text-gray-600 {
  color: rgb(82 82 82);
}
.leading-tight {
  line-height: 1.25;
}
.inline-block {
  display: inline-block;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.button {
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
}

.button__text {
  color: #ffffff;
  transition: all 0.2s;
}

.button--loading .button__text {
  visibility: hidden;
  opacity: 0;
}

.button--loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

.item-img-container {
  max-width: 450px;
  margin-top: 1.25rem;
  margin-left: auto;
  margin-right: auto;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
@media (min-width: 640px) {
  .sm\:w-40 {
    width: 10rem;
  }
}
</style>