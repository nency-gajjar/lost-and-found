<template>
  <div
    class="wrapper"
    v-if="!isLoadingItemDetails || Object.keys(itemDetails).length > 0"
  >
    <div
      class="
        w-full
        mx-6
        lg:mx-0
        md:w-8/12
        lg:w-7/12
        xl:w-6/12
        overflow-hidden
        bg-white
        border border-[#E1E3E6]
        rounded-lg
      "
      style="box-shadow: rgba(54, 28, 93, 0.04) -10px 18px 32px"
    >
      <section class="bg-white">
        <div class="main-title bg-accent-100 text-white mb-3">
          <h1
            class="
              w-full
              py-3
              text-2xl
              font-bold
              leading-tight
              text-center text-white
            "
          >
            ITEM DETAILS
          </h1>
        </div>
        <div class="sections py-4 px-6">
          <div class="form-title">
            <h2
              class="
                text-lg text-accent-100
                font-medium
                leading-tight
                text-left text-gray-800
              "
            >
              Claim Person's Details:
            </h2>

            <span
              class="
                w-20
                border-t-4 border-solid border-gray-300
                inline-block
                mb-1
              "
            ></span>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Person Name
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ claimDetails.claimpersonname }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Email
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ claimDetails.claimpersonemail }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Mobile Number
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ claimDetails.claimpersonmobileno }}
            </div>
          </div>

          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Lost Item Date
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ claimDetails.claimpersondatelost }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Item Description
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ claimDetails.claimpersonitemname }}
            </div>
          </div>

          <div
            v-if="claimDetails.claimpersondescription"
            class="flex items-center mt-3 flex-wrap"
          >
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Description
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ claimDetails.claimpersondescription }}
            </div>
          </div>

          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Lost Location
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ claimDetails.claimpersonlocation }}
            </div>
          </div>
        </div>

        <div data-v-272705a6="" class="flex items-center my-2">
          <div
            class="
              h-6
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
              h-6
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
            <h2
              class="
                text-lg text-accent-100
                font-medium
                leading-tight
                text-left text-gray-800
              "
            >
              Item Details:
            </h2>

            <span
              class="
                w-20
                border-t-4 border-solid border-gray-300
                inline-block
                mb-1
              "
            ></span>
          </div>
          <div class="flex foundItemContainer">
            <div class="flex flex-col grow">
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Venue Email
                </div>
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                >
                  {{ itemDetails.venue_email }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Found Item Date
                </div>
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                >
                  {{ itemDetails.datse }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Venue Phone number
                </div>
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                >
                  {{ itemDetails.venue_phone_no }}
                </div>
              </div>
              <div class="flex flex-col w-full">
                <div class="flex items-center mt-3 flex-wrap">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-full
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Employee Mobile Numer
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                  >
                    {{ itemDetails.employee_mobile_no }}
                  </div>
                </div>
                <div class="flex items-center mt-3 flex-wrap">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-full
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Item Description
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                  >
                    {{ itemDetails.item_description }}
                  </div>
                </div>
                <div class="flex items-center mt-3 flex-wrap">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-full
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Package Type
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                  >
                    {{ itemDetails.package_type }}
                  </div>
                </div>
                <div class="flex items-center mt-3 flex-wrap">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-full
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Weight
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                  >
                    {{ itemDetails.weight_pounds }} lbs
                  </div>
                </div>
                <div class="flex items-center mt-3 flex-wrap">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-full
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Dimension
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                  >
                    {{ itemDetails.item_length }}(l) x
                    {{ itemDetails.item_width }}(w) x
                    {{ itemDetails.item_height }}(h) inches
                  </div>
                </div>
                <div class="flex items-center mt-3 flex-wrap">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-full
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Item Status
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                  >
                    {{ itemDetails.item_status == 0 ? "Claimed" : "Unclaimed" }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="itemDetails.image" class="mt-4 sm:mt-0 sm:w-60 w-full">
              <img class="w-full" :src="itemDetails.image" alt="" />
            </div>
          </div>
        </div>
        <div data-v-272705a6="" class="flex items-center my-2">
          <div
            class="
              h-6
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
              h-6
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
            <h2
              class="
                text-lg text-accent-100
                font-medium
                leading-tight
                text-left text-gray-800
              "
            >
              Found Item Address:
            </h2>

            <span
              class="
                w-20
                border-t-4 border-solid border-gray-300
                inline-block
                mb-1
              "
            ></span>
          </div>

          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Address
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.address }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              City
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.city }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              State
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.states }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Country
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.country }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Zipcode
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.zipcode }}
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 m-5">
          <BaseButton
            class="flex-auto"
            :is-loading="isLoading['Approve']"
            @click="handleItemApprove('Approve')"
          >
            Approve
          </BaseButton>
          <BaseButton class="flex-auto" @click="showItemRejectDialog = true">
            Reject
          </BaseButton>
        </div>
      </section>
    </div>
    <BaseDialog
      :showDialog="showDialog"
      :icon="{ name: 'circle-check', color: 'green', size: '3x' }"
      :title="dialogTitle"
      :message="dialogMessage"
      buttonTitle="Okay"
      @close="closeDialog"
    />
    <BaseDialog
      :showDialog="showItemRejectDialog"
      :icon="{ name: 'circle-info', color: 'blue', size: '3x' }"
      :message="dialogMessage"
      title="Please enter Rejection reason"
      :showClose="false"
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
                  text-sm
                  pt-4
                  pb-2
                  transition-shadow
                  text-gray-800
                "
                :class="errors.length > 0 && 'error'"
              ></textarea>

              <p
                v-if="errors.length"
                class="vee-validation-error mt-2 text-sm text-left text-red-600"
              >
                {{ errors[0] }}
              </p>
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
export default {
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
      isLoadingItemDetails: false,
      claimDetails: {},
      itemDetails: {},
      itemId: "",
    };
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
          name: "found-items",
        });
      });
    }
  },
  methods: {
    async handleItemApprove(type) {
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
        receiver_name: this.claimDetails.claimpersonitemname,
        receiver_email: this.claimDetails.claimpersonemail,
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
    closeDialog() {
      this.showDialog = false;
      this.dialogTitle = "";
      this.dialogMessage = "";
      this.rejectReson = "";
      this.$nextTick(() => {
        this.$router.push({ path: "/found-items" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}

@media only screen and (max-width: 650px) {
  .foundItemContainer {
    @apply flex-col;
  }

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
