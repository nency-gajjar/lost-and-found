<template>
  <div @click="showSharingIcons = false" class="wrapper">
    <BaseCard v-if="!isLoadingItem || Object.keys(itemDetails).length > 0" class="md:w-8/12 lg:w-7/12 xl:w-6/12 overflow-hidden">
      <section class="bg-white">
        <div class="main-title bg-accent-100 text-white mb-3">
          <BaseHeader varient="details">
            <div class="flex px-6" :class="[showInformativeTxt ? 'justify-center' : 'justify-between']">
              <p class="uppercase">{{ $t('preview') }}</p>
              <div class="relative" v-if="!showInformativeTxt">
                <BaseIcon @click.stop="showSharingIcons = !showSharingIcons" icon="share-alt" color="white" />
                <div class="absolute right-0 top-8 bg-white rounded divide-y divide-gray-200 shadow" v-if="showSharingIcons">
                  <div @click="socialShare('whatsapp')" href="https://web.whatsapp.com/send?text=my message" target="_blank" class="cursor-pointer hover:bg-gray-100 py-3 px-3 flex gap-2 items-center">
                    <svg fill="green" viewBox="0 0 32 32" class="w-7 rounded-full"><path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fill-rule="evenodd"></path></svg>
                    <p class="uppercase text-xs text-gray-700">WhatsApp</p>
                  </div>
                  <div @click="socialShare('twitter')" class="cursor-pointer hover:bg-gray-100 py-3 px-3 flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="blue" class="w-7 bi bi-twitter" viewBox="0 0 16 16"> <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/> </svg>
                    <p class="uppercase text-xs text-gray-700">Twitter</p>
                  </div>
                  <div @click="socialShare('facebook')" class="cursor-pointer hover:bg-gray-100 py-3 px-3 flex gap-2 items-center">
                    <svg viewBox="0 0 512 512" fill="blue" class="w-7"><path d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z"/></svg>
                    <p class="uppercase text-xs text-gray-700">Facebook</p>
                  </div>
                  <div @click="socialShare('copy')" class="cursor-pointer hover:bg-gray-100 py-3 px-3 flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" class="w-7 bi bi-link" viewBox="0 0 16 16"><path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/><path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/></svg>
                    <p class="uppercase text-xs text-gray-700">Copy</p>
                  </div>
                </div>
              </div>
            </div>
          </BaseHeader>
        </div>
        <div v-if="showInformativeTxt" class="p-6">
          <p class="font-medium text-gray-700 text-lg text-center">{{ $t('letsMakeSureYouGotEverythingRight') }}</p>
          <p class="font-medium text-gray-700 text-lg text-center">{{ $t('scrollDownToSubmit') }}</p>
        </div>
        <div class="sections py-4 px-6">
          <div class="form-title">
            <BaseHeader varient="accent">{{ $t('senderDetails') }}:</BaseHeader>
          </div>
          <RawCard :title="$t('senderAffiliation')" :value="itemDetails.venu_type" />
          <RawCard :title="$t('foundItemDate')" :value="formatDate(itemDetails.datse)" />
          <RawCard :title="$t('venueName')" :value="itemDetails.venue_name" />
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
            <BaseHeader varient="accent">{{ $t('addressDetails') }}:</BaseHeader>
          </div>
          <RawCard v-if="itemDetails.hotel_room" :title="$t('roomNo')" :value="itemDetails.hotel_room" />
          <RawCard :title="$t('autoAddress.address')" :value="filterAddressLine(itemDetails)" />
          <RawCard :title="$t('autoAddress.city')" :value="itemDetails.city" />
          <RawCard :title="$t('autoAddress.state')" :value="itemDetails.states" />
          <RawCard :title="$t('autoAddress.country')" :value="itemDetails.country" />
          <RawCard :title="$t('autoAddress.zipcode')" :value="itemDetails.zipcode" />
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
            <BaseHeader varient="accent">{{ $t('foundItemDetails') }}:</BaseHeader>
          </div>

          <div class="flex foundItemContainer">
            <div class="flex flex-col grow">
              <RawCard :title="$t('itemDescription')" :value="itemDetails.item_description" />
              <RawCard :title="$t('itemStatus')" :value="itemDetails.item_status === 0 ? 'Claimed' : 'Unclaimed'" />
              <template v-if="itemDetails.item_status === 0">
                <RawCard :title="$t('receiverName')" :value="itemDetails.receiver_name" />
                <RawCard :title="$t('receiverEmail')" :value="itemDetails.receiver_email" />
                <RawCard :title="$t('receiverMobileNo')" :value="itemDetails.receiver_mobile_no" />
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
            <p class="text-center text-gray-400 font-medium mx-4 mb-0 uppercase">{{ $t('or') }}</p>
          </div>
          <BaseButton class="w-full" varient="gray" @click="editDetails()"
            >{{ $t('edit') }}</BaseButton
          >
        </div>
        <div
          v-if="allowClaim"
          class="text-left sm:w-12/12 px-6 pb-6 pt-4"
        >
          <BaseButton class="w-full" varient="secondary" @click="claimItem"
            >{{ $t('claimItem') }}</BaseButton
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
export default {
  mixins: [DetectBrowser],
  components: { RawCard },
  data() {
    return {
      isLoading: false,
      responseData: null,
      itemDetails: {},
      showInformativeTxt: false,
      allowClaim: false,
      isLoadingItem: false,
      showSharingIcons: false,
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
          this.isLoadingItem = true;
        })
        .catch((error) => {
          this.isLoadingItem = true;
          console.log(error);
        });
    }
    else if(this.$route.query.preview && JSON.parse(JSON.stringify(this.$store.getters["item/itemId"]))){
      this.showInformativeTxt = false;
      this.$axios
        .get("/getsinglelostitem?id=" + JSON.parse(JSON.stringify(this.$store.getters["item/itemId"])))
        .then((response) => {
          if (response.status === 200) {
            this.itemDetails = {...response.data.data.Item, onlyDisplay: true};
          }
          this.isLoadingItem = true;
        })
        .catch((error) => {
          console.log(error);
          this.isLoadingItem = true;
        });
    }
    else{
      this.isLoadingItem = true;
      this.showInformativeTxt = true;
      this.itemDetails = JSON.parse(JSON.stringify(this.$store.getters['item/itemDetails']));
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
    socialShare(platform){
      let message = "Hey, looks like I have found your lost item.%0ahttps://foundshelf.com/detail-confirmation?id="+this.itemDetails.id;
      if(platform === "whatsapp") {
        let url = "";
        if(this.mobileDevice){
          url = "https://api.whatsapp.com/send?text="+message;
          window.open(url, '_blank');
        }
        else{
          url = "https://web.whatsapp.com/send?text="+message;
          window.open(url, '_blank');
        }
      }
      else if(platform === "twitter"){
        let url = "https://twitter.com/intent/tweet?text="+message;
        window.open(url, '_blank');
      }
      else if(platform === "facebook"){
        let url = `https://www.facebook.com/sharer/sharer.php?u=https://foundshelf.com/detail-confirmation?id=${this.itemDetails.id}&quote=Hey, looks like I have found your lost item.`;
        window.open(url, '_blank');
      }
      else if(platform === "copy"){
        navigator.clipboard.writeText(`https://foundshelf.com/detail-confirmation?id=${this.itemDetails.id}`);
      }
      this.showSharingIcons = false;
    },
    formatDate(date){
      return moment(date).format("MMMM DD, YYYY");
    },
    claimItem() {
      this.$router.push(this.localeLocation({ 
        name: "claim-item",
        params: { item: this.itemDetails }
      }))
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

                    this.$router.push(this.localeLocation({ 
                      name: "confirmation",
                      params: { data: this.responseData },
                      query: { id: this.responseData.id },
                    }))
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
              this.$router.push(this.localeLocation({ 
                name: "confirmation",
                params: { data: this.responseData },
                query: { id: this.responseData.id },
              }))
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
        this.$router.push(this.localeLocation({ 
          name: "found",
          params: { itemDetails: this.itemDetails }
        }))
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