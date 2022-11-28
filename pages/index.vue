<template>
  <div>
    <div class="wrapper -mt-14">
      <!-- Lost Item Filter -->
      <section class="p-6 sm:w-8/12">
        <div class="container mx-auto m-8">
          <h1
            class="
              w-full
              my-4
              text-3xl
              sm:text-5xl
              font-medium
              leading-tight
              text-center text-primary-100
            "
          >
            What have you lost?
          </h1>
          <div class="flex justify-center">
            <span
              class="
                w-40
                border-t-4 border-solid border-orange-200
                inline-block
                mb-2
              "
            ></span>
          </div>
          <p class="text-gray-600 text-md">Leave Blank to show all Item</p>
          <div class="align-middle inline-block w-full mt-5">
            <!-- Location -->
            <div class="inline-flex flex-auto w-full bg-white">
              <BaseInput
                v-model="address"
                id="autocomplete-main"
                type="text"
                placeholder=""
                label="Location"
                class="w-full"
                @input="getAddress"
              >
                <template v-slot:icon>
                  <div
                    v-if="address"
                    class="absolute inset-y-0 right-0 flex items-center p-5"
                  >
                    <BaseIcon @click="clearAddress" icon="xmark" color="gray" />
                  </div>
                  <div
                    v-else
                    class="absolute inset-y-0 right-0 flex items-center p-5"
                  >
                    <BaseIcon icon="location-arrow" color="lightgray" />
                  </div>
                </template>
              </BaseInput>
            </div>
          </div>

          <div class="align-middle inline-block w-full mt-5">
            <label class="block text-md font-medium text-gray-800 text-left m-2"
              >Date when lost?</label
            >
            <div
              class="
                flex
                justify-between
                flex-col
                gap-4
                flex-wrap
                md:flex-nowrap
                sm:flex-row
                items-center
              "
            >
              <div class="w-full flex gap-4 flex-auto mt-3 sm:mt-0 sm:w-9/12">
                <client-only>
                  <date-picker
                    placeholder="Approx. Start date"
                    v-model="startDate"
                    formate="YYYY-MM-DD"
                  >
                  </date-picker>
                </client-only>
                <client-only>
                  <date-picker
                    placeholder="Approx. End date"
                    v-model="endDate"
                    formate="YYYY-MM-DD"
                  >
                  </date-picker>
                </client-only>
              </div>

              <!-- Item Description -->
              <div class="h-full flex-auto w-full mt-3 sm:mt-0 sm:w-3/12">
                <BaseSelect
                  v-model="itemDescription"
                  :options="itemDescriptionOptions"
                  label="Item Description"
                />
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center m-8">
            <BaseButton @click="applyFilters" class="sm:h-12">
              Search
            </BaseButton>
          </div>
        </div>
      </section>
    </div>

    <!-- Recently Added Items -->
    <section
      v-if="!isLoading && recentItemList.length > 0"
      class="bg-white border-b py-8"
    >
      <div class="container max-w-6xl mx-auto m-8">
        <h3
          class="
            w-full
            my-2
            text-2xl
            font-bold
            leading-tight
            text-center text-gray-700
          "
        >
          Recently Found Items
        </h3>
        <div class="flex justify-center">
          <span
            class="
              w-20
              border-t-4 border-solid border-orange-200
              inline-block
              mb-3
            "
          ></span>
        </div>
        <div class="flex justify-center my-5">
          <VueSlickCarousel class="w-5/6" v-bind="sliderSetting">
            <div v-for="item in recentItemList" :key="item.id">
              <div class="sliderCard cursor-pointer shadow-md border">
                <img
                  v-if="item.image"
                  class="
                    object-cover
                    w-full
                    rounded-t-lg
                    md:h-28 md:w-28
                    sm:h-16 sm:w-16
                    w-14
                    h-14
                    md:rounded-none md:rounded-l-lg
                  "
                  :src="item.image"
                  alt=""
                />
                <img
                  v-else
                  class="
                    object-cover
                    w-full
                    rounded-t-lg
                    md:h-28 md:w-28
                    sm:h-16 sm:w-16
                    w-14
                    h-14
                    md:rounded-none md:rounded-l-lg
                  "
                  src="@/assets/images/no-image4.png"
                  alt=""
                />
                <h5 class="m-4 text-lg font-semibold">
                  {{ item.item_description }}
                </h5>
                <ul role="list" class="mb-4 text-left text-gray-500">
                  <li
                    class="flex items-center space-x-2"
                    data-toggle="tooltip"
                    title="Found item date"
                  >
                    <BaseIcon icon="calendar-days" color="gray" />
                    <span>{{ item.datse }}</span>
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
        </div>
      </div>
    </section>
    <div v-else-if="!isLoading && recentItemList.length === 0">
      <p class="text-gray-600 font-medium m-14">No Result Found</p>
    </div>
    <div v-else>
      <BaseLoader />
    </div>
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
export default {
  components: { VueSlickCarousel, DatePicker },
  data() {
    return {
      sliderSetting: {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
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
      isLoading: false,
      recentItemList: [],
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
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    viewItem(item) {
      this.$store.commit("item/SET_ITEM_DETAILS", {
        ...item,
        onlyDisplay: true,
      });
      this.$nextTick(() => {
        this.$router.push({
          path: "/detail-confirmation",
          query: { id: item.id },
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
  @apply flex min-h-screen justify-center items-center text-center mx-auto;
}

.gradient {
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
  color: #fff;
}

.card {
  @apply p-10 rounded-lg text-indigo-500 bg-indigo-100 shadow-lg;

  .title {
    @apply text-6xl font-bold;
  }
}

.sliderCard {
  @apply flex justify-center items-center flex-col bg-gray-100 mx-5 p-4 rounded-lg;
  display: flex !important;
}
</style>

<style lang="scss">
.slick-prev,
.slick-next {
  height: 35px !important;
  width: 35px !important;
  background: none !important;
  border-radius: 60px;
  background-color: #f06b04 !important;
}
.slick-prev:before,
.slick-next:before {
  /* font-size: 35px; */
  font-size: 34px;
  opacity: 1;
  /* line-height: 41.5px; */
}

/* .mx-input {
  height: 3rem !important;
} */

.mx-datepicker-range {
  width: 100%;
}

.mx-input-wrapper i {
  margin-right: 10px;
}
.mx-input:hover {
  @apply border-gray-300;
}
.mx-datepicker {
  width: 100% !important;
}
.mx-datepicker input {
  height: 3rem;
  border-radius: 0.5rem;
  border-color: rgb(212 212 212);
  cursor: pointer;
}

@media (max-width: 750px) {
  .mx-datepicker-main {
    max-width: 92%;
  }
  .mx-range-wrapper {
    flex-wrap: wrap;
    flex-direction: row;
  }
  .mx-range-wrapper .mx-calendar-panel-date {
    flex: auto;
  }
}

.pac-item {
  padding: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ececec;
  }
}

.pac-item-query {
  font-size: 14px;
}
</style>