<template>
  <div class="flex flex-col items-center">
    <div class="w-full flex justify-center landing-background">
      <div class="sm:mt-8 w-10/12 !opacity-100">
        <div
          class="
            sm:mt-14
            mt-8
            md:px-12
            px-0
            flex
            justify-center
            flex-col
            sm:flex-row
          "
        >
          <div
            class="
              w-full
              py-4
              lg:py-0
              flex flex-col
              items-center
              justify-center
              sm:items-start
              mb-8
              sm:mb-0
            "
          >
            <div class="px-6 w-full">
              <h2
                class="
                  font-bold
                  text-4xl
                  md:text-[2.625rem] md:leading-[3.125rem]
                  text-accent-100
                  text-[1.5rem]
                  text-center
                  w-full
                "
              >
                What have you <span class="text-primary-100"> Lost?</span>
              </h2>
            </div>
            <div class="px-6 mt-3 w-full text-center">
              <TypeWriter
                :speed="200"
                :full-erase="true"
                :interval="300"
                :words='venueOptions'>
                <span class="font-medium text-accent-100">We are providing service in: </span>
              </TypeWriter>
            </div>
            <div>
              <!-- Lost Item Filter -->
              <section class="p-6 w-full">
                <div class="container mx-auto">
                  <div class="align-middle inline-block w-full mt-5">
                    <div class="inline-flex flex-auto w-full">
                      <BaseInput
                        v-model="address"
                        id="autocomplete-main"
                        type="text"
                        placeholder=""
                        label="Location where you might have lost your item. Try City/State, or a specific location name."
                        class="w-full"
                        @input="getAddress"
                      >
                        <template v-slot:icon>
                          <div
                            v-if="address"
                            class="absolute bg-white bottom-13-px right-1 pr-5"
                          >
                            <BaseIcon @click="clearAddress" icon="xmark" color="gray" />
                          </div>
                          <div
                            v-else
                            class="absolute bottom-13-px right-0 pr-5"
                          >
                            <BaseIcon icon="location-arrow" color="lightgray" />
                          </div>
                        </template>
                      </BaseInput>
                    </div>
                  </div>

                  <div class="align-middle inline-block w-full mt-5">
                    <div
                      class="
                        flex
                        justify-between
                        flex-col
                        gap-4
                        flex-wrap
                        md:flex-nowrap
                        sm:flex-row
                        items-end
                      "
                    >
                      <div class="h-full flex-auto w-full mt-3 sm:mt-0 sm:w-1/2">
                        <BaseSelect
                          v-model="itemDescription"
                          :options="itemDescriptionOptions"
                          label="Item Description"
                        />
                      </div>
                      <div class="w-full flex flex-col mt-3 sm:mt-0">
                        <label
                          class="block text-md font-medium text-gray-800 text-left"
                          >Date when lost?</label
                        >
                        <div class="flex sm:gap-4 gap-1 flex-auto w-full">
                          <client-only>
                            <date-picker
                              placeholder="Approx. Start date"
                              v-model="startDate"
                              format="MM-DD-YYYY"
                              :disabled-date="disableStartDate"
                            >
                            </date-picker>
                          </client-only>
                          <client-only>
                            <date-picker
                              placeholder="Approx. End date"
                              v-model="endDate"
                              format="MM-DD-YYYY"
                              :disabled-date="disableEndDate"
                            >
                            </date-picker>
                          </client-only>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-center items-center mt-8">
                    <BaseIcon
                      icon="circle-info"
                      color="lightgray"
                      style="max-width: 15px"
                    />
                    <p class="pl-3">Leave all fields blank to show all items</p>
                  </div>
                  <div class="flex items-center justify-center m-8">
                    <BaseButton @click="applyFilters" class="sm:py-4 sm:px-14 !rounded-full">
                      Search
                    </BaseButton>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recently Added Items -->
    <section
      class="bg-white border-b py-8 w-full"
    >
      <div class="container max-w-6xl mx-auto m-8">
        <BaseHeader class="text-center" varient="gray">Recently Found Items</BaseHeader>
        <div v-if="!isLoading && recentItemList.length > 0" class="flex justify-center items-center my-5">
          <div @click="prevSlide">
            <BaseIcon icon="angle-left" color="accent" size="2x" />
          </div>
          <VueSlickCarousel class="w-5/6" ref="carousel" v-bind="sliderSetting">
            <div v-for="item in recentItemList" :key="item.id">
              <div class="sliderCard cursor-pointer shadow-md border">
                <div class="flex items-center">
                  <img
                    v-if="showImage(item)"
                    class="
                      object-cover
                      w-full
                      rounded-lg
                      h-20 w-20
                    "
                    :src="item.image"
                    alt=""
                  />
                  <img
                    v-else
                    class="
                      object-cover
                      w-full
                      rounded-lg
                      h-20 w-20
                    "
                    src="@/assets/images/no-image4.png"
                    alt=""
                  />
                </div>
                <div class="m-4 text-lg font-semibold text-center h-[54px] flex items-center">
                  {{ item.item_description }}
                </div>
                <ul role="list" class="mb-4 text-left text-gray-500">
                  <li
                    class="flex items-center space-x-2"
                    data-toggle="tooltip"
                    title="Found item date"
                  >
                    <BaseIcon icon="calendar-days" color="gray" />
                    <span>{{ formatDate(item.datse) }}</span>
                  </li>
                  <li
                    class="flex items-center space-x-2"
                    data-toggle="tooltip"
                    :title="item.address"
                  >
                    <BaseIcon icon="location-dot" color="red" />
                    <span class="line-clamp-1"> {{ item.address }}</span>
                  </li>
                </ul>
                <BaseButton
                  class="w-full px-5 py-2 !capitalize"
                  @click="viewItem(item)"
                  >View Item</BaseButton
                >
              </div>
            </div>
          </VueSlickCarousel>
          <div @click="nextSlide">
            <BaseIcon icon="angle-right" color="accent" size="2x" />
          </div>
        </div>
        <div v-else-if="!isLoading && recentItemList.length === 0">
        <p class="text-gray-600 font-medium m-14 text-center">There's not any items have been added recently.</p>
        </div>
        <div v-else>
          <BaseLoader  class="h-64"/>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>
// import { itemDescriptionOptions } from "static/defaults.js";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
import TypeWriter from "../components/TypeWriter.vue";
import { venueOptions } from "static/defaults.js";

export default {
  components: { VueSlickCarousel, DatePicker, TypeWriter },
  data() {
    return {
      sliderSetting: {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 883,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 589,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      itemDescriptionOptions: [],
      itemDescription: "",
      address: "",
      startDate: null,
      endDate: null,
      lostItemAddress: "",
      lat: "",
      long: "",
      isLoading: true,
      recentItemList: [],
      venueOptions: venueOptions,
    };
  },
  mounted() {
    this.getItemDescriptionOptions();
    this.getRecentItemList();
  },
  computed: {
    formatedStartDate() {
      if (this.startDate) {
        return moment(this.startDate).format("YYYY-MM-DD");
      }
      return moment(new Date()).format("YYYY-MM-DD");
    },
    formatedEndDate() {
      if (this.endDate) {
        return moment(this.endDate).format("YYYY-MM-DD");
      }
      return moment(new Date()).format("YYYY-MM-DD");
    },
  },
  methods: {
    showImage(item) {
      return item.image && item.is_default !== 'Approve without Image';
    },
    formatDate(date){
      return moment(date).format("MMMM DD, YYYY");
    },
    prevSlide() {
      this.$refs.carousel.prev()
    },
    nextSlide() {
      this.$refs.carousel.next()
    },
    disableStartDate(date){
      return date > new Date();
    },
    disableEndDate(date) {
      return date < this.startDate || date > new Date();
    },
    getItemDescriptionOptions() {
      this.$axios
        .get("/viewallItemdescriptionDetails")
        .then((response) => {
          if (response.status === 200) {
            let itemDescriptionResponse = response.data?.data?.Items || [];
            this.itemDescriptionOptions = itemDescriptionResponse.map(
              (item) => {
                return item.item_description;
              }
            );
            this.itemDescriptionOptions.unshift("All");
            this.itemDescription = "All";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAddress() {
      if (this.address == "") {
        document.getElementById("autocomplete-main").placeholder = "";
      }
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete-main")
      );
      autocomplete.addListener("place_changed", () => {
        let address = autocomplete.getPlace();
        this.lat = address.geometry.location.lat();
        this.long = address.geometry.location.lng();
        this.lostItemAddress = address.formatted_address;
      });
    },
    clearAddress() {
      this.address = "";
      document.getElementById("autocomplete-main").placeholder = "";
    },
    applyFilters() {
      this.$nextTick(() => {
        this.$router.push({
          name: "lost-items",
          params: {
            appliedFilters: {
              itemDescription: this.itemDescription,
              startDate: this.startDate,
              endDate: this.endDate,
              lostItemAddress: this.lostItemAddress,
              lat: this.lat,
              long: this.long,
            },
          },
        });
      });
    },
    getRecentItemList() {
      this.isLoading = true;
      this.$axios
        .get("/getRecentItemList")
        .then((response) => {
          if (response.status === 200) {
            this.isLoading = false;
            this.recentItemList = response?.data?.data?.Items.reverse();
            if(!this.recentItemList){
              this.recentItemList = [];
            }
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    viewItem(item) {
      // this.$store.commit("item/SET_ITEM_DETAILS", {
      //   ...item,
      //   onlyDisplay: true,
      // });
      this.$store.commit(
        "item/SET_ITEM_ID",
        item.id
      );
      this.$nextTick(() => {
        this.$router.push({
          name: "detail-confirmation",
          query: { preview: true },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.wrapper {
  @apply flex  justify-center items-center text-center mx-auto;
}

.gradient {
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
  color: #fff;
}

.landing-background {
  background-image: url("../assets/images/landing-bg.png");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.sliderCard {
  @apply flex justify-center items-center flex-col bg-gray-100 mx-5 p-4 rounded-lg;
  display: flex !important;
}

.mb-9-px {
  margin-bottom: 9px;
}

.bottom-13-px{
  bottom: 13px;
}
</style>

<style lang="scss">
@import "./assets/styles/date-picker.scss";
@import "./assets/styles/address-autocomplete.scss";
.slick-prev,
.slick-next {
  padding-top: 3px;
  height: 35px !important;
  width: 35px !important;
  background: none !important;
  border-radius: 60px;
  background-color: #153f5ed9 !important;
}
.slick-prev:before,
.slick-next:before {
  /* font-size: 35px; */
  font-size: 34px;
  opacity: 1;
  /* line-height: 41.5px; */
}
</style>