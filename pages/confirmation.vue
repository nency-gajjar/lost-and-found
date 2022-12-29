<template>
  <div class="wrapper my-10">
    <div v-if="!isLoadingItem || Object.keys(itemDetails).length > 0">
      <div
        class="
          card
          w-12/12
          mx-4
          md:mx-auto 
          lg:w-6/12
          mx-auto
          rounded-lg
          shadow-lg
          bg-white
          overflow-hidden
        "
      >
        <table id="printMe" width="100%" class="table-style">
          <tbody>
            <tr>
              <td class="w-full w-full-imp">
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr class="flex w-full hidden logo-hidden">
                    <td align="left" class="!w-24"><img class="found-logo" src="../assets/images/found-shelf-icon.svg" alt="Found Shelf"></td>
                  </tr>
                  <tr class="!flex !justify-center !w-full">
                    <td align="center" class="!w-full">
                      <h2
                        class="
                          text-2xl
                          font-bold
                          text-accent-100 text-center
                          w-full
                          confirmation-title
                        "
                      >
                        Confirmation Details
                      </h2>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr v-if="itemDetails.link">
              <td class="w-full-imp">
                <div class="w-full-imp qr-code-container flex-imp justify-center-imp">
                  <img :src="itemDetails.link" alt="" />
                </div>
                <div class="px-6 flex items-center justify-center">
                  <BaseIcon
                    icon="circle-info"
                    color="gray"
                    style="max-width: 15px"
                  />
                  <p class="pl-2 font-medium text-gray-700">Scan this QR code to edit the details of this item.</p>
                </div>
              </td>
            </tr>
            <tr class="border-b">
              <td class="px-6 py-4">
                <table width="100%">
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
                  <tr class="l-2">
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
                  <tr class="l-2">
                    <td>
                      <div class="text-left text-gray-600 font-medium">
                        Found Item Date
                      </div>
                    </td>
                    <td>
                      <div class="text-gray-600 text-left">
                        {{ formatDate(itemDetails.date, itemDetails.datse) }}
                      </div>
                    </td>
                  </tr>
                  <tr v-show="itemDetails.venue_name" class="l-2">
                    <td>
                      <div class="text-left text-gray-600 font-medium">
                        Venue Name
                      </div>
                    </td>
                    <td>
                      <div class="text-gray-600 text-left">
                        {{ itemDetails.venue_name }}
                      </div>
                    </td>
                  </tr>
                  <tr class="l-2">
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
                  <tr v-if="itemDetails.secondary_email" class="l-2">
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
                </table>
              </td>
            </tr>
            <tr class="border-b items-center flex xl:flex-row lg:flex-col md:flex-row flex-col justify-between items-center">
              <td class="px-6 py-4 w-full-imp">
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
                  <tr class="l-2">
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
                  <tr class="l-2">
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
                  <tr class="l-2">
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
                  <template v-if="itemDetails.item_status === 0 || itemDetails.item_status === 'claimed'">
                    <tr class="l-2">
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
                    <tr class="l-2">
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
                    <tr class="l-2">
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
              <div class="flex justify-center items-center pr-6">
                <div v-if="showImage" class="flex img-container justify-center items-center mt-4 sm:mt-0 w-48 w-full">
                  <img class="w-full object-cover" :src="itemDetails.image" alt="" />
                </div>
              </div>
            </tr>
          </tbody>
        </table>
        <div class="noPrint">
          <div class="flex flex-wrap gap-2 m-5">
            <BaseButton class="flex-auto" @click="printDetails">
              Print Details
            </BaseButton>
            <BaseButton class="flex-auto"  @click="routeToListing">
              Back To Listing
            </BaseButton>
          </div>
          <div class="flex flex-wrap gap-2 m-5">
            <BaseButton class="flex-auto" varient="primaryAlt"  @click="editListing">
              Edit the listing
            </BaseButton>
          </div>
          <div class="flex flex-wrap gap-2 m-5">
            <BaseButton class="flex-auto" varient="secondary"  @click="addFoundItem">
              Add another Found Item
            </BaseButton>
          </div>
        </div>
      </div>
      <BaseDialog
        v-if="showDialog"
        :showDialog="showDialog"
        :icon="{ name: 'circle-check', color: 'green', size: '3x' }"
        title="Awesome, you are a legend!"
        :message="dialogMessage"
        buttonTitle="Okay"
        @close="showDialog = false"
      />
    </div>
    <div v-else>
      <BaseLoader />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      itemDetails: {},
      showDialog: false,
      itemConfirmationDetails: {},
      isLoadingItem: false,
    };
  },
  created(){
    this.isLoadingItem = true;
  },
  mounted() {
    this.itemConfirmationDetails = JSON.parse(JSON.stringify(this.$store.getters['item/itemConfirmationDetails']));
    this.isLoadingItem = true;
    if (this.$route.query.id) {
      this.$axios
        .get("/getsinglelostitem?id=" + this.$route.query.id)
        .then((response) => {
          if (response.status === 200) {
            this.itemDetails = response.data.data.Item;
          }
          this.isLoadingItem = false;
          this.showDialog = true;
        })
        .catch((error) => {
          this.isLoadingItem = false;
          console.log(error);
        });
    } else if (Object.keys(this.itemConfirmationDetails).length > 0) {
      this.itemDetails = this.itemConfirmationDetails;
      this.isLoadingItem = false;
      this.showDialog = true;
    } else {
      this.isLoadingItem = false;
      this.$nextTick(() => {
        this.$router.push({
          name: "lost-items",
        });
      });
    }
  },
  computed: {
    // ...mapGetters("item", ["itemConfirmationDetails"]),
    showImage() {
      return this.itemDetails.image && this.itemDetails.is_default !== 'Approve without Image'
    },
    dialogMessage() {
      return `
        <p class="pb-2">We also emailed you the confirmation. You can print it and tape it on the item.</p>
        <p class="pb-2">After the review, we will notify the lucky owner. If the owner would like it shipped, then FoundShelf will create and email you a shipping label. If the owner would like to pick it up instead, then we notify you with an expected pick up date and time.</p>
        <p class="pb-2">Need to edit the details? No problem, just click the link provided in the confirmation email, or scan the special QR code that is on the confirmation page.</p>
        <p class="pb-2">You did a lot of work today. Why don’t you take rest of the day off.</p>
      `;
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
  methods: {
    formatDate(date, datse){
      if(date){
        return moment(date).format("MMMM DD, YYYY");
      }
      return moment(datse).format("MMMM DD, YYYY");
    },
    editListing(){
      this.$nextTick(() => {
          this.$router.push({
            name: "found",
            query: {
              id: this.itemDetails.id
            },
          });
        });
    },
    addFoundItem(){
      this.$nextTick(() => {
          this.$router.push({
            name: "found"
          });
        });
    },
    routeToListing() {
      this.$store.commit("item/SET_ITEM_CONFIRMATION_DETAILS", {});
      this.$router.push({ path: "/lost-items" });
    },
    printDetails() {
      let userAgent = navigator.userAgent.toLowerCase();
      let mobile = userAgent.indexOf("mobile") > -1;
      let android = userAgent.indexOf("android") > -1;

      if (mobile || android) {
        this.$html2pdf(document.getElementById("printMe"), {
          margin: 1,
          filename: "Item-Details.pdf",
          image: { type: "jpg", quality: 0.98 },
          html2canvas: {
            dpi: 300,
            scale: 1,
            letterRendering: true,
            useCORS: true
          },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        });
      } else {
        window.print();
      }
    },
  },
};
</script>
<style scoped>
.found-logo {
  width: 80px;
}
tr td:first-child {
  width: 250px;
}
.w-full-imp{
  width: 100% !important;
}
.flex-imp {
  display: flex !important;
}
.justify-center-imp {
  justify-content: center !important;
}
.qr-code-container {
  margin: auto;
}
.qr-code-container img {
  width: 150px;
}
.text-center {
  text-align: center;
}
.mt-70-px {
  margin-top: 70px;
}
th,
td {
  overflow: hidden;
  word-break: normal;
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
.pr-6 {
  padding-right: 1.5rem;
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
  line-height: 2;
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
  color: #970584ba;
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
.l-2 {
  line-height: 2;
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

.item-img-container {
  max-width: 450px;
  margin-top: 1.25rem;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 640px) {
  .sm\:w-40 {
    width: 10rem;
  }
}

@media (max-width: 640px) {
  .mt-70-px {
    margin-top: 0px;
  }
}

@media all and (max-width: 479px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
  .logo-hidden{
    display: none;
  }
}

@media print {
  .noPrint{
    display: none;
  }

  .qr-code-container img {
    width: 100px;
  }

  .logo-hidden{
    display: block;
  }

  .img-container {
    margin-top: 0px !important
  }
}
</style>