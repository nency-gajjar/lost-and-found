<template>
  <div @click="showSharingIcons = false" class="wrapper my-10">
    <div v-if="!isLoadingItem || Object.keys(itemDetails).length > 0">
      <div
        class="
          card
          md:mx-auto 
          lg:w-6/12
          mx-auto
          rounded-lg
          shadow-lg
          bg-white
          overflow-hidden
          relative
        "
      >
        <div class="absolute right-0 top-14 bg-gray-100 rounded divide-y divide-gray-300 shadow-lg" v-if="showSharingIcons">
          <SocialShare @social-share="socialShare" />
        </div>
                      
        <table id="printMe" width="100%" class="table-style">
          <tbody>
            <tr>
              <td class="w-full w-full-imp">
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr id="found-shelf-logo" class="flex w-full hidden logo-hidden">
                    <td align="left" class="!w-24"><img class="found-logo" src="https://i.ibb.co/G32NGsk/found-shelf-icon.jpg" alt="Found Shelf"></td>
                  </tr>
                  <tr class="!flex !justify-around !items-center !w-full">
                    <td class="!w-full">
                      <h2
                        class="
                          text-2xl
                          font-bold
                          text-accent-100
                          confirmation-title
                          pl-10
                          w-full
                        "
                        :class="!showSocialShare && '!text-center !pl-0'"
                      >
                        Confirmation Details
                      </h2>
                    </td>
                    <div v-if="showSocialShare" id="share-icon-container" class="!w-1/4 !text-right !pr-10">
                      <BaseIcon @click.stop="showSharingIcons = !showSharingIcons" size="lg" icon="share-alt" color="accent" />
                    </div>
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
                  <p class="pl-2 font-medium text-gray-600 l-2">Scan this QR code to edit the details of this item.</p>
                </div>
              </td>
            </tr>
            <tr>
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
                </table>
              </td>
            </tr>
            <tr class="flex justify-between items-center">
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
                    <tr v-if="itemDetails.receiver_email" class="l-2">
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
                <div v-if="showImage" class="flex img-container justify-center items-center mt-4 sm:mt-0 w-40 w-full">
                  <img class="w-40 h-40" :src="itemImg" alt="" />
                </div>
              </div>
            </tr>
            <div id="scissor-container" class="hidden scissor-container items-center">
              <div style="width: 20px">
                <svg style="color: rgb(240, 107, 4);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="60" cy="76" r="28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle><circle cx="60" cy="180" r="28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle><line x1="136" y1="128" x2="83.1" y2="164.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><line x1="232" y1="62.3" x2="164.3" y2="108.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><line x1="232" y1="193.7" x2="83.1" y2="91.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line></svg>
              </div>
              <hr class="w-full border-dashed border border-black" />
            </div>
            <div id="scissor-text" class="hidden h-12 justify-center scissor-text text-gray-600 font-medium">
              Cutout the above confirmation & tape it on the found item.
            </div>
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
        :title="dialogTitle"
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
import SocialShare from "../components/shared/SocialShare.vue";
import socialShare from "../mixins/socialShare.js";
export default {
  mixins: [socialShare],
  components: { SocialShare },
  data() {
    return {
      itemDetails: {},
      itemImg: "",
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
        .then(async (response) => {
          if (response.status === 200) {
            this.itemDetails = response.data.data.Item;
            if (this.itemDetails.image) {
              const data = await fetch(this.itemDetails.image, { cache: "no-cache" });
              const blob = await data.blob();
              this.itemImg = await this.image_to_base64(blob);
            }
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
      if (this.itemStatus) {
        // Item is Unclaimed
        return `
          <p class="pb-2">We have emailed you the confirmation of this item that you submitted. Let’s hope we can find the owner of this item.</p>
          <p class="pb-2">If you are able to get the contact information of the item’s owner, simply go back to your email confirmation, click the link provided to <span class="font-bold">Edit the Listing</span> <br> OR <br> Scan the confirmation QR Code to change the listing to <span class="font-bold">Claimed</span> to add the contact information. Owner will then get a notification to create shipping label or choose other options.</p>
        `
      } else {
        // Item is Claimed
        return `
          <p class="pb-2">We also emailed you the confirmation. You can print it and tape it on the item.</p>
          <p class="pb-2">After the review, we will notify the lucky owner. If the owner would like it shipped, then FoundShelf will create and email you a shipping label. If the owner would like to pick it up instead, then we notify you with an expected pick up date and time.</p>
          <p class="pb-2">Need to edit the details? No problem, just click the link provided in the confirmation email, or scan the special QR code that is on the confirmation page.</p>
          <p class="pb-2">You did a lot of work today. Why don’t you take rest of the day off.</p>
        `
      }
    },
    dialogTitle () {
      if (this.itemStatus) {
        // Item is Unclaimed
        return 'Thanks, glad that you found this item!'
      } else {
        // Item is Claimed
        return 'Awesome, you are a legend!'
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
  methods: {
    async image_to_base64(file) {
      let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.onerror = (error) => {
          console.log(error);
          this.$toast.error(
            "An Error occurred please try again, File might be corrupt"
          );
        };
        fileReader.readAsDataURL(file);
      });
      return result_base64;
    },
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
        document.getElementById("found-shelf-logo").style.display = "block";
        document.getElementById("scissor-container").style.display = "flex";
        document.getElementById("scissor-text").style.display = "flex";
        if(this.showSocialShare){
          document.getElementById("share-icon-container").style.display = "none";
          document.getElementsByClassName("confirmation-title")[0].style.textAlign = "center";
          document.getElementsByClassName("confirmation-title")[0].style.paddingLeft = "0";
        }
        this.$html2pdf(document.getElementById("printMe"), {
          filename: "Item-Details.pdf",
          image: { type: "jpg", quality: 0.98 },
          html2canvas: {
            dpi: 300,
            scale: 1,
            letterRendering: true,
            useCORS: true,
            windowWidth: 1024
          },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        }).then(() => {
          document.getElementById("found-shelf-logo").style.display = "none";
          document.getElementById("scissor-container").style.display = "none";
          document.getElementById("scissor-text").style.display = "none";
          if(this.showSocialShare){
            document.getElementById("share-icon-container").style.display = "block";
            document.getElementsByClassName("confirmation-title")[0].style.textAlign = "left";
            document.getElementsByClassName("confirmation-title")[0].style.paddingLeft = "2.5rem";
          }
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
.confirmation-title {
  text-align: left;
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
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.py-4 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
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
  color: #153f5ed9;
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

@media (min-width: 640px) {
  .sm\:w-40 {
    width: 10rem;
  }
}

@media (max-width: 475px) {
 .pr-6 {
    padding-right: 0rem;
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

  .scissor-container{
    display: flex !important;
  }

  .scissor-text{
    display: flex;
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

  .shadow-lg {
    box-shadow: none;
  }

  .confirmation-title {
    text-align: center;
  }

  #share-icon-container {
    display: none;
  }

  .pl-10 {
    padding-left: 0 !important;
  }
}
</style>