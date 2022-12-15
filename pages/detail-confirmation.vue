<template>
  <div class="wrapper" v-if="Object.keys(itemDetails).length > 0">
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
            PREVIEW
          </h1>
        </div>
        <div v-if="showInformativeTxt" class="p-6 flex items-center">
          <p class="font-medium text-gray-700 text-lg">Let’s make sure you got everything right before you Submit.</p>
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
          </div>
          <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Sender Affiliation
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.venu_type }}
            </div>
          </div>
          <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Found Item Date
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.datse }}
            </div>
          </div>
          <div v-show="itemDetails.venue_name" class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Venue Name
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.venue_name }}
            </div>
          </div>
          <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Venue Email
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.venue_email }}
            </div>
          </div>
          <div
            v-if="itemDetails.secondary_email"
            class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col"
          >
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Venue Secondary Email
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.secondary_email }}
            </div>
          </div>
          <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Venue Phone No.
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.venue_phone_no }}
            </div>
          </div>
          <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Employee Mobile No.
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.employee_mobile_no }}
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

        <div class="sections px-6 py-4">
          <div class="form-title">
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
          </div>

          <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Address
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ filterAddressLine(itemDetails) }}
            </div>
          </div>
          <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
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
          <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
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
          <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
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
          <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-250-px
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
          </div>

          <div class="flex foundItemContainer">
            <div class="flex flex-col grow">
              <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-250-px
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Item Description
                </div>
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12"
                >
                  {{ itemDetails.item_description }}
                </div>
              </div>
              <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-250-px
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Package Type
                </div>
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12"
                >
                  {{ itemDetails.package_type }}
                </div>
              </div>
              <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-250-px
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Item Status
                </div>
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12"
                >
                  {{ itemDetails.item_status === 0 ? "Claimed" : "Unclaimed" }}
                </div>
              </div>
              <template v-if="itemDetails.item_status === 0">
                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
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
                    Receiver's Name
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12"
                  >
                    {{ itemDetails.receiver_name }}
                  </div>
                </div>

                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
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
                    Receiver's Email
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12"
                  >
                    {{ itemDetails.receiver_email }}
                  </div>
                </div>

                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
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
                    Receiver's Mobile No.
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12"
                  >
                    {{ itemDetails.receiver_mobile_no }}
                  </div>
                </div>
              </template>
            </div>
            <div class="flex justify-center items-center">
              <div v-if="itemDetails.image" class="flex justify-center items-center mt-4 sm:mt-0 h-48 w-48 w-full">
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
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      isLoading: false,
      responseData: null,
      itemDetails: {},
      showInformativeTxt: false
    };
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else{
      this.showInformativeTxt = true;
      this.itemDetails = JSON.parse(JSON.stringify(this.$store.getters['item/itemDetails']));
    }
  },
  computed: {
    // ...mapGetters("item", ["itemDetails"]),
    btnName() {
      return this.itemDetails.foundItemId ? "Update" : "Submit";
    },
  },
  methods: {
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
          name: "found",
          params: { itemDetails: this.itemDetails },
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