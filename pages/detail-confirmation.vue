<template>
  <div class="wrapper">
    <BaseCard v-if="!isLoadingItem || Object.keys(itemDetails).length > 0" class="md:w-8/12 lg:w-7/12 xl:w-6/12 overflow-hidden">
      <section class="bg-white">
        <div class="main-title bg-accent-100 text-white mb-3">
          <BaseHeader class="uppercase" varient="details">{{ $t('preview') }}</BaseHeader>
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
          <RawCard :title="$t('venueEmail')" :value="itemDetails.venue_email" />
          <RawCard v-if="itemDetails.secondary_email" :title="$t('venueSecondaryEmail')" :value="itemDetails.secondary_email" />
          <RawCard :title="$t('venuePhoneNo')" :value="itemDetails.venue_phone_no" />
          <RawCard :title="$t('employeeMobileNo')" :value="itemDetails.employee_mobile_no" />
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
              <RawCard :title="$t('packageType')" :value="itemDetails.package_type" />
              <RawCard :title="$t('itemStatus')" :value="itemDetails.item_status === 0 ? 'Claimed' : 'Unclaimed'" />
              <template v-if="itemDetails.item_status === 0">
                <RawCard :title="$t('receiverName')" :value="itemDetails.receiver_name" />
                <RawCard :title="$t('receiverEmail')" :value="itemDetails.receiver_email" />
                <RawCard :title="$t('receiverMobileNo')" :value="itemDetails.receiver_mobile_no" />
              </template>
            </div>
            <div class="flex item-img-container justify-center items-center">
              <div v-if="itemDetails.image" class="flex justify-center items-center mt-4 sm:mt-0 w-48 w-full">
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
import _ from "lodash";
import RawCard from "../components/shared/RawCard.vue";
import moment from "moment";
export default {
  components: { RawCard },
  data() {
    return {
      isLoading: false,
      responseData: null,
      itemDetails: {},
      showInformativeTxt: false,
      allowClaim: false,
      isLoadingItem: false,
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
    btnName() {
      return this.itemDetails.foundItemId ? "Update" : "Submit";
    },
  },
  methods: {
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