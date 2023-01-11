<template>
  <div
    class="wrapper"
    v-if="!isLoadingItemDetails || Object.keys(itemDetails).length > 0"
  >
    <BaseCard class="md:w-8/12 lg:w-7/12 xl:w-6/12 overflow-hidden">
      <section>
        <div class="main-title bg-accent-100 text-white mb-3">
          <BaseHeader varient="details">ITEM DETAILS</BaseHeader>
        </div>
        <div class="sections py-4 px-6">
          <div class="form-title">
            <BaseHeader varient="accent">Claim Person's Details:</BaseHeader>
          </div>
          <RawCard title="Person Name" :value="claimDetails.claimpersonname" />
          <RawCard title="Email" :value="claimDetails.claimpersonemail" />
          <RawCard title="Mobile Number" :value="claimDetails.claimpersonmobileno" />
          <RawCard title="Lost Item Date" :value="formatDate(claimDetails.claimpersondatelost)" />
          <RawCard title="Item Description" :value="claimDetails.claimpersonitemname" />
          <RawCard v-if="claimDetails.claimpersondescription" title="Description" :value="claimDetails.claimpersondescription" />
          <RawCard title="Lost Location" :value="claimDetails.claimpersonlocation" />
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

        <div class="sections py-4 px-6">
          <div class="form-title">
            <BaseHeader varient="accent">Item Details:</BaseHeader>
          </div>
          <div class="flex flex-col lg:flex-row foundItemContainer">
            <div class="flex flex-col grow">
              <RawCard title="Venue Email" :value="itemDetails.venue_email" />
              <RawCard title="Found Item Date" :value="formatDate(itemDetails.datse)" />
              <RawCard title="Venue Phone number" :value="itemDetails.venue_phone_no" />
              <div class="flex flex-col w-full">
                <RawCard title="Employee Mobile Numer" :value="itemDetails.employee_mobile_no" />
                <RawCard title="Item Description" :value="itemDetails.item_description" />
                <RawCard title="Item Status" :value="itemDetails.item_status == 0 ? 'Claimed' : 'Unclaimed'" />
              </div>
            </div>
            <div class="flex justify-center item-img-container items-center mt-3 lg:mt-0">
              <div v-if="showImage" class="flex justify-center items-center mt-4 sm:mt-0 w-48 w-full">
                <img class="w-full object-cover" :src="itemDetails.image" alt="">
              </div>
            </div>
          </div>
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
        <div class="sections py-4 px-6">
          <div class="form-title">
            <BaseHeader varient="accent">Found Item Address:</BaseHeader>
          </div>
          <RawCard v-if="itemDetails.hotel_room" title="Room No. Or Hotel Area" :value="itemDetails.hotel_room" />
          <RawCard title="Address" :value="itemDetails.address" />
          <RawCard title="City" :value="itemDetails.city" />
          <RawCard title="State" :value="itemDetails.states" />
          <RawCard title="Country" :value="itemDetails.country" />
          <RawCard title="Zipcode" :value="itemDetails.zipcode" />
        </div>

        <div class="flex flex-wrap gap-2 m-5">
          <BaseButton
            class="flex-auto"
            :is-loading="isLoading['Approve']"
            @click="handleItemApprove()"
          >
            Approve
          </BaseButton>
          <BaseButton
            class="flex-auto"
            @click="showItemRejectDialog = true"
            :disabled="isLoading['Approve']"
          >
            Reject
          </BaseButton>
        </div>
      </section>
    </BaseCard>
    <BaseDialog
      v-if="showDialog"
      :showDialog="showDialog"
      :icon="{ name: 'circle-check', color: 'green', size: '3x' }"
      :title="dialogTitle"
      :message="dialogMessage"
      buttonTitle="Okay"
      @close="
        showDialog = false;
        $router.push('/lost-items');
      "
    />
    <BaseDialog
      v-if="showItemRejectDialog"
      :showDialog="showItemRejectDialog"
      :icon="{ name: 'circle-info', color: 'blue', size: '3x' }"
      :message="dialogMessage"
      title="Please enter rejection reason"
      :showClose="false"
      @close="closeRejectDialog"
    >
      <template v-slot:input>
        <ValidationObserver v-slot="{ validate }" ref="observer">
          <form @submit.prevent="validate().then(onSubmit)">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="block"
            >
              <textarea
                v-model="rejectReson"
                placeholder="Reject Reason"
                class="
                  border
                  inline-block
                  border-gray-300
                  w-full
                  rounded-lg
                  px-4
                  h-full
                  text-base
                  pt-4
                  pb-2
                  transition-shadow
                  text-gray-700
                "
                :class="errors.length > 0 && 'error'"
              ></textarea>
            </ValidationProvider>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:action>
        <BaseButton
          @click="handleItemReject()"
          :is-loading="isLoading['Reject']"
          type="submit"
          class="w-full"
        >
          Submit
        </BaseButton>
      </template>
    </BaseDialog>
  </div>
  <div v-else>
    <BaseLoader />
  </div>
</template>

<script>
import RawCard from "../components/shared/RawCard.vue";
import moment from "moment";
export default {
  components: { RawCard },
  data() {
    return {
      showDialog: false,
      showItemRejectDialog: false,
      dialogTitle: "",
      dialogMessage: "",
      rejectReson: "",
      isLoading: {
        Approve: false,
        Reject: false,
      },
      isLoadingItemDetails: true,
      claimDetails: {},
      itemDetails: {},
      itemId: "",
    };
  },
  computed: {
    showImage() {
      return this.itemDetails.image && this.itemDetails.is_default !== 'Approve without Image';
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.isLoadingItemDetails = true;
      this.itemId = this.$route.query.id;
      this.$axios
        .get("/getsingleclaimitemdetail?id=" + this.itemId)
        .then((response) => {
          if (response.status === 200) {
            this.isLoadingItemDetails = false;
            this.itemDetails = response.data.data.data1.Item;
            this.claimDetails = response.data.data.data.Item;
            this.itemId = this.itemDetails.id;
          }
        })
        .catch((error) => {
          this.isLoadingItemDetails = false;
          console.log(error);
        });
    } else {
      this.$nextTick(() => {
        this.$router.push({
          name: "lost-items",
        });
      });
    }
  },
  methods: {
    formatDate(date){
      return moment(date).format("MMMM DD, YYYY");
    },
    async handleItemApprove() {
      await this.handleUpdateLostItem("Approve");
    },
    async handleItemReject() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.isLoading["Reject"] = false;
      } else {
        await this.handleUpdateLostItem("Reject");
      }
    },
    handleUpdateLostItem(type) {
      const params = {
        sender_approval: type === "Approve" ? true : false,
        receiver_name: this.claimDetails.claimpersonname,
        receiver_email: this.claimDetails.claimpersonemail,
        receiver_address: this.claimDetails.claimpersonlocation,
        receiver_city: this.claimDetails.claimpersoncity,
        receiver_country: this.claimDetails.claimpersoncountry,
        receiver_state: this.claimDetails.claimpersonstate,
        receiver_zipcode: this.claimDetails.claimpersonzipcode,
        receiver_mobile_no: this.claimDetails.claimpersonmobileno,
      };
      this.isLoading[type] = true;
      this.$axios
        .post("/updatesinglelostitem?id=" + this.itemId, params)
        .then((response) => {
          if (response.status === 200) {
            if (type === "Reject") {
              this.showItemRejectDialog = false;
            }
            this.setDialogBody(type);
            this.showDialog = true;
            this.isLoading[type] = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Something went wrong! Please try again.");
          this.isLoading[type] = false;
        });
    },

    setDialogBody(type) {
      if (type === "Approve") {
        this.dialogTitle = "Claim request approved successfully!";
        this.dialogMessage =
          "Claim request has been approved successfully. Item owner will be notified via email for their claim request approval. Post that, the owner will have to select the Item Delivery to proceed further.";
      } else if (type === "Reject") {
        this.dialogTitle = "Claim request rejected successfully!";
        this.dialogMessage =
          "Claim request has been rejected successfully. Item owner will be notified via email for their claim request rejection along with the rejection reason.";
      }
    },
    closeRejectDialog() {
      this.showItemRejectDialog = false;
      this.dialogTitle = "";
      this.dialogMessage = "";
      this.rejectReson = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @apply min-h-screen flex justify-center py-10 mx-auto;
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
textarea.error {
  @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
}
</style>
