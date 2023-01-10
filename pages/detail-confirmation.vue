<template>
  <div @click="showSharingIcons = false" class="wrapper">
    <BaseCard v-if="!isLoadingItem || Object.keys(itemDetails).length > 0" class="md:w-8/12 lg:w-7/12 xl:w-6/12 overflow-hidden">
      <section class="bg-white">
        <div class="main-title bg-accent-100 text-white mb-3">
          <BaseHeader varient="details">
            <div class="flex px-6" :class="[showInformativeTxt ? 'justify-center' : 'justify-between']">
              <p>PREVIEW</p>
              <div class="relative" v-if="!showInformativeTxt && showSocialShare">
                <BaseIcon @click.stop="showSharingIcons = !showSharingIcons" icon="share-alt" color="white" />
                <div class="absolute right-0 top-8 bg-gray-100 rounded divide-y divide-gray-300 shadow" v-if="showSharingIcons">
                  <SocialShare @social-share="socialShare" />
                </div>
              </div>
            </div>
          </BaseHeader>
        </div>
        <div v-if="showInformativeTxt" class="p-6">
          <p class="font-medium text-gray-700 text-lg text-center">Let’s make sure you got everything right.</p>
          <p class="font-medium text-gray-700 text-lg text-center">Scroll down to Submit.</p>
        </div>
        <div class="sections py-4 px-6">
          <div class="form-title">
            <BaseHeader varient="accent">Sender's Details:</BaseHeader>
          </div>
          <RawCard title="Sender Affiliation" :value="itemDetails.venu_type" />
          <RawCard title="Found Item Date" :value="formatDate(itemDetails.datse)" />
          <RawCard title="Venue Name" :value="itemDetails.venue_name" />
          <RawCard v-if="showVenueDetails" title="Venue Email" :value="itemDetails.venue_email" />
          <RawCard v-if="showVenueDetails && itemDetails.secondary_email" title="Venue Secondary Email" :value="itemDetails.secondary_email" />
          <RawCard v-if="showVenueDetails" title="Venue Phone No." :value="itemDetails.venue_phone_no" />
        </div>

        <div data-v-272705a6="" class="flex items-center my-2">
          <div
            class="
              w-6
              box-content
              border-r border-[#E1E3E6]
              rounded-r-full
              relative
              right-3.5
              bg-primary-60
            "
          ></div>
          <hr class="flex-grow border-dashed border border-[#E1E3E6]" />
          <div
            class="
              w-6
              box-border
              border-l border-[#E1E3E6]
              rounded-l-full
              relative
              left-3.5
              bg-primary-60
            "
          ></div>
        </div>

        <div class="sections px-6 py-4">
          <div class="form-title">
            <BaseHeader varient="accent">Address Details:</BaseHeader>
          </div>
          <RawCard v-if="itemDetails.hotel_room" title="Room No. Or Hotel Area" :value="itemDetails.hotel_room" />
          <RawCard title="Address" :value="filterAddressLine(itemDetails)" />
          <RawCard title="City" :value="itemDetails.city" />
          <RawCard title="State" :value="itemDetails.states" />
          <RawCard title="Country" :value="itemDetails.country" />
          <RawCard title="Zipcode" :value="itemDetails.zipcode" />
        </div>

        <div data-v-272705a6="" class="flex items-center my-2">
          <div
            class="
              w-6
              box-content
              border-r border-[#E1E3E6]
              rounded-r-full
              relative
              right-3.5
              bg-primary-60
            "
          ></div>
          <hr class="flex-grow border-dashed border border-[#E1E3E6]" />
          <div
            class="
              w-6
              box-border
              border-l border-[#E1E3E6]
              rounded-l-full
              relative
              left-3.5
              bg-primary-60
            "
          ></div>
        </div>

        <div class="sections px-6 py-4">
          <div class="form-title">
            <BaseHeader varient="accent">Found Item's Details:</BaseHeader>
          </div>

          <div class="flex foundItemContainer">
            <div class="flex flex-col grow">
              <RawCard title="Item Description" :value="itemDetails.item_description" />
              <RawCard title="Item Status" :value="itemDetails.item_status === 0 ? 'Claimed' : 'Unclaimed'" />
              <template v-if="itemDetails.item_status === 0">
                <RawCard title="Receiver's Name" :value="itemDetails.receiver_name" />
                <RawCard v-if="itemDetails.receiver_email" title="Receiver's Email" :value="itemDetails.receiver_email" />
                <RawCard title="Receiver's Mobile No." :value="itemDetails.receiver_mobile_no" />
              </template>
            </div>
            <div class="flex item-img-container justify-center items-center">
              <div v-if="showImage" class="flex justify-center items-center mt-4 sm:mt-0 w-48 w-full">
                <img class="w-full object-cover" :src="itemDetails.image" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div
          v-show="!itemDetails.onlyDisplay"
          class="text-left sm:w-12/12 px-6 pb-6 pt-4"
        >
          <BaseButton
            class="w-full"
            :is-loading="isLoading"
            @click="submitDetails"
          >
            {{ btnName }}
          </BaseButton>
          <div
            class="
              flex
              items-center
              my-4
              before:flex-1 before:border-t before:border-gray-300 before:mt-0.5
              after:flex-1 after:border-t after:border-gray-300 after:mt-0.5
            "
          >
            <p class="text-center text-gray-400 font-medium mx-4 mb-0">OR</p>
          </div>
          <BaseButton class="w-full" varient="gray" @click="editDetails()"
            >Edit</BaseButton
          >
        </div>
        <div
          v-if="allowClaim"
          class="text-left sm:w-12/12 px-6 pb-6 pt-4"
        >
          <BaseButton class="w-full" varient="secondary" @click="claimItem"
            >Claim Item</BaseButton
          >
        </div>
        <div
          v-if="allowResendNotification"
          class="text-left sm:w-12/12 px-6 pb-6 pt-4"
        >
          <BaseButton :is-loading="isLoadingResend" class="w-full" varient="secondary" @click="resendNotification"
            >Resend Notification</BaseButton
          >
        </div>
      </section>
    </BaseCard>
    <div v-else>
      <BaseLoader />
    </div>
  </div>
</template>

<script>
import DetectBrowser from "~/mixins/detectBrowser";
import _ from "lodash";
import RawCard from "../components/shared/RawCard.vue";
import moment from "moment";
import SocialShare from "../components/shared/SocialShare.vue";
import socialShare from "../mixins/socialShare.js";
export default {
  mixins: [DetectBrowser, socialShare],
  components: { RawCard, SocialShare },
  data() {
    return {
      isLoading: false,
      isLoadingResend: false,
      responseData: null,
      itemDetails: {},
      showInformativeTxt: false,
      allowClaim: false,
      isLoadingItem: false,
      allowResendNotification: false,
      showVenueDetails: true,
    };
  },
  created(){
    this.isLoadingItem = true;
  },
  mounted(){
    if(this.$route.query.id){
      this.showInformativeTxt = false;
      this.$axios
        .get("/getsinglelostitem?id=" + this.$route.query.id)
        .then((response) => {
          if (response.status === 200) {
            this.itemDetails = {...response.data.data.Item, onlyDisplay: true};
          }
          this.isLoadingItem = false;
          if(this.$route.query.awaiting === "true"){
            this.allowResendNotification = true;
          }
        })
        .catch((error) => {
          this.isLoadingItem = false;
          console.log(error);
        });
    }
    else if(this.$route.query.preview && JSON.parse(JSON.stringify(this.$store.getters["item/itemId"]))){
      this.showInformativeTxt = false;
      this.showVenueDetails = false;
      this.$axios
        .get("/getsinglelostitem?id=" + JSON.parse(JSON.stringify(this.$store.getters["item/itemId"])))
        .then((response) => {
          if (response.status === 200) {
            this.itemDetails = {...response.data.data.Item, onlyDisplay: true};
          }
          this.isLoadingItem = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoadingItem = false;
        });
    }
    else{
      this.isLoadingItem = false;
      this.showInformativeTxt = true;
      this.itemDetails = JSON.parse(JSON.stringify(this.$store.getters['item/itemDetails']));
      if(Object.keys(this.itemDetails).length < 1) {
        this.$router.replace({
          name: "lost-items"
        });
      }
    }
    if(this.$route.query.preview === "claim"){
      this.allowClaim = true;
    }
  },
  computed: {
    // ...mapGetters("item", ["itemDetails"]),
    showImage() {
      return this.itemDetails.image && this.itemDetails.is_default !== 'Approve without Image';
    },
    btnName() {
      return this.itemDetails.foundItemId ? "Update" : "Submit";
    },
  },
  methods: {
    formatDate(date){
      return moment(date).format("MMMM DD, YYYY");
    },
    claimItem() {
      this.$router.push({
        name: "claim-item",
        params: { item: this.itemDetails },
      });
    },
    resendNotification() {
      this.isLoadingResend = true;
      let params = {
        id: this.itemDetails.id,
        receiver_email: this.itemDetails.receiver_email,
        receiver_name: this.itemDetails.receiver_name,
        item_description: this.itemDetails.item_description,
        receiver_mobile_no: this.itemDetails.receiver_mobile_no
      }

      this.$axios
        .post("/sendawaitingactionmail", params)
        .then((response) => {
          if(response.status === 200){
            this.$toast.info("Notification resent successfully!");
          }
          this.isLoadingResend = false;
        })
        .catch(() => {
          this.isLoadingResend = false;
          this.$toast.info("Something went wrong! Please try again.");
        })
    },
    filterAddressLine(itemDetails) {
      return itemDetails.address == "Other" || !itemDetails.address
        ? itemDetails.manualAddress
        : itemDetails.address;
    },
    submitDetails() {
      let params = { ...this.itemDetails };
      if (params.address == "Other" || !params.address) {
        params.address = params.manualAddress;
      }
      delete params.foundItemId;
      delete params.manualAddress;

      if (this.itemDetails.foundItemId) {
        this.isLoading = true;
        this.$axios
          .get("/getsinglelostitem?id=" + this.itemDetails.foundItemId)
          .then((response) => {
            if (response.status === 200) {
              this.isLoadingItemDetails = false;
              let obj1 = response.data.data.Item;
              if(params.item_description === obj1.item_description){
                params.is_default = obj1.is_default;
                params.it_type = obj1.it_type;
              }
              const diff = Object.keys(obj1).reduce((result, key) => {
                if (!params.hasOwnProperty(key)) {
                  result.push(key);
                } else if (_.isEqual(obj1[key], params[key])) {
                  const resultKeyIndex = result.indexOf(key);
                  result.splice(resultKeyIndex, 1);
                }
                return result;
              }, Object.keys(params));
              const index2 = diff.indexOf("id");
              if (index2 > -1) {
                diff.splice(index2, 1);
              }
              let requestData = {};
              if (diff.includes("image")) {
                requestData.is_default = "Pending";
              }
              diff.forEach((key) => {
                if (params[key] != undefined) {
                  requestData[key] = params[key];
                }
              });
              this.$axios
                .post(
                  "/updatesinglelostitem?id=" + this.itemDetails.foundItemId,
                  requestData
                )
                .then((response) => {
                  if (response.status === 200) {
                    this.isLoading = false;
                    this.responseData = response.data.data;
                    this.$store.commit("item/SET_ITEM_CONFIRMATION_DETAILS", {
                      ...this.responseData,
                    });

                    this.$store.commit("item/SET_ITEM_DETAILS", {});

                    this.$router.push({
                      path: "/confirmation",
                      params: { data: this.responseData },
                      query: { id: this.responseData.id },
                    });
                  }
                })
                .catch((error) => {
                  this.isLoading = false;
                  this.$toast.error("Something went wrong! Please try again.");
                  console.log(error);
                });
            }
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
          });
      } else {
        this.isLoading = true;
        this.$axios
          .post("/storelostitem", params)
          .then((response) => {
            if (response.status === 200) {
              this.isLoading = false;
              this.responseData = response.data.data;

              this.$store.commit("item/SET_ITEM_CONFIRMATION_DETAILS", {
                ...this.responseData,
              });

              this.$store.commit("item/SET_ITEM_DETAILS", {});

              // localStorage.setItem("itemId", this.responseData.id);
              this.$router.push({
                path: "/confirmation",
                params: { data: this.responseData },
                query: { id: this.responseData.id },
              });
            }
          })
          .catch((error) => {
            this.isLoading = false;
            this.$toast.error("Something went wrong! Please try again.");
            console.log(error);
          });
      }
    },
    editDetails() {
      this.$nextTick(() => {
        this.$router.push({
          name: "found"
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}

.mt-16-px {
  margin-top: 16px;
}

.w-250-px {
  width: 200px;
}

@media only screen and (max-width: 1170px) {
  .foundItemContainer {
    @apply flex-col;
  }
  .item-img-container {
    @apply mt-5;
  }
}

@media only screen and (max-width: 650px) {

  .img-container {
    @apply mt-3;
  }

  .text-gray-600 {
    @apply pr-2;
  }
}
</style>