<template>
  <div>
    <div class="wrapper border-t min-h-max">
      <div class="pt-4 gradient w-full">
        <div
          class="
            container
            mx-auto
            px-3
            mx-auto
            flex flex-wrap flex-col
            md:flex-row
            items-center
          "
        >
          <!--Left Col-->
          <div
            class="
              flex flex-col
              w-full
              md:w-2/5
              justify-center
              items-start
              text-center
              md:text-left
            "
          >
            <div class="flex">
              <div class="qr-code mr-3 md:mr-6 lg:mr-12">
                <img
                  class="bg-white rounded-lg p-4"
                  src="@/assets/images/found-items-qr.png"
                  alt="qr code image"
                />
                <p class="text-white text-sm mt-4">
                  Scan this QR to view Lost Items
                </p>
              </div>
              <div class="qr-code">
                <img
                  class="bg-white rounded-lg p-4"
                  src="@/assets/images/item-details-qr.png"
                  alt="qr code image"
                />
                <p class="text-white text-sm mt-4">
                  Scan this QR to Add new lost item
                </p>
              </div>
            </div>
          </div>

          <!--Right Col-->
          <div class="w-full md:w-3/5 text-center pb-10">
            <img
              class="w-full md:w-4/5 mx-auto z-50"
              src="https://www.tailwindtoolbox.com/templates/hero.png"
            />
          </div>
        </div>
        <div class="relative -mt-12 lg:-mt-20">
          <svg
            viewBox="0 0 1428 174"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                transform="translate(-2.000000, 44.000000)"
                fill="#FFFFFF"
                fill-rule="nonzero"
              >
                <path
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  id="Path-4"
                  opacity="0.200000003"
                ></path>
              </g>
              <g
                transform="translate(-4.000000, 76.000000)"
                fill="#FFFFFF"
                fill-rule="nonzero"
              >
                <path
                  d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <!-- Lost Item Filter -->
    <section class="bg-white border-b p-6">
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
          What have you lost?
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
              items-center
            "
          >
            <!-- Location -->
            <div class="inline-flex flex-auto w-full sm:w-6/12 bg-white">
              <BaseInput
                v-model="address"
                id="autocomplete"
                type="text"
                label="Location"
                class="w-full"
                @input="getAddress"
              >
                <template v-slot:icon>
                  <div
                    v-if="address"
                    class="absolute inset-y-0 right-0 flex items-center p-5"
                  >
                    <BaseIcon @click="clearAddress" icon="circle-xmark" color="gray" />
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

            <!-- Date -->
            <!-- <div class="w-full flex-auto mt-3 sm:mt-0 sm:w-4/12">
              <date-picker
                :confirm="true"
                range
                v-model="inputDate"
                @pick="changeDate($event)"
                formate="YYYY-MM-DD"
              ></date-picker>
            </div> -->

            <div class="w-full flex gap-2 flex-auto mt-3 sm:mt-0 sm:w-4/12">
              <date-picker
                placeholder="Start date"
                v-model="startDate"
                formate="YYYY-MM-DD"
              ></date-picker>
              <date-picker
                placeholder="End date"
                v-model="endDate"
                formate="YYYY-MM-DD"
              ></date-picker>
            </div>

            <!-- Item Description -->
            <div class="h-full flex-auto w-full mt-3 sm:mt-0 sm:w-2/12">
              <select
                id="countries"
                @change="changeItemDescription"
                class="
                  h-12
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-full
                  p-2.5
                "
              >
                <option disabled selected>Select category</option>
                <option
                  v-for="item in itemDescriptionOptions"
                  :key="item"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center m-6">
          <BaseButton @click="applyFilters"> Search </BaseButton>
        </div>
      </div>
    </section>

    <!-- Recently Added Items -->
    <section class="bg-white border-b py-8">
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
            <div v-for="item in 5" :key="item">
              <div class="sliderCard cursor-pointer shadow-md border">
                <img
                  class="
                    object-cover
                    w-full
                    rounded-t-lg
                    md:h-32 md:w-32
                    sm:h-16 sm:w-16
                    w-14
                    h-14
                    md:rounded-none md:rounded-l-lg
                  "
                  src="@/assets/images/headphones.png"
                  alt=""
                />
                <h5 class="m-4 text-lg font-semibold">Headphone</h5>
                <ul role="list" class="mb-4 text-left text-gray-500">
                  <li class="flex items-center space-x-2">
                    <!-- Icon -->
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Status: Unclaimed</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <!-- Icon -->
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Found Date: 22-10-2022</span>
                  </li>
                </ul>
                <button
                  type="submit"
                  class="
                    w-full
                    font-medium
                    text-sm
                    px-5
                    py-2.5
                    rounded-lg
                    button
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-offset-primary-60
                    transition-all
                    font-display
                    disabled:cursor-not-allowed
                    bg-accent-100
                    text-white
                    focus:ring-accent-100
                    shadow-accent
                    hover:bg-accent-200
                  "
                >
                  <span class="button__text"> View Item </span>
                </button>
                <!-- </div> -->
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { itemDescriptionOptions } from "static/defaults.js";
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
      itemDescriptionOptions: itemDescriptionOptions,
      itemDescription: "",
      address: "",
      startDate: null,
      endDate: null,
      addressForApi: "",
      lat: "",
      long: "",
    };
  },
  methods: {
    // changeDate(event) {
    //   console.log(this.inputDate);
    //   console.log(event);
    // },
    getAddress() {
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete")
      );
      autocomplete.addListener("place_changed", () => {
        let address = autocomplete.getPlace();
        this.lat = address.geometry.location.lat();
        this.long = address.geometry.location.lng();
        this.addressForApi = address.formatted_address;
      });
    },
    clearAddress(){
      this.address = "";
    },
    changeItemDescription(event) {
      this.itemDescription = event.target.value;
    },
    applyFilters(){
      let params = {
        abc: "123",
        item_description: this.itemDescription,
        datse: moment(this.startDate).format("YYYY-MM-DD"),
        datse1: moment(this.endDate).format("YYYY-MM-DD"),
        address: this.addressForApi,
        lat: this.lat,
        long: this.long,
      }
      this.$axios
        .post("getallfilteritemdetails", {}, {params : params})
        .then(res => {
          this.$nextTick(() => {
            this.$router.push({
              name: "found-items",
              params: { filteredItems: res?.data?.data[0]?.ITEMS },
            });
          });
        })
        .catch(err => {
          console.log(err);
        })
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
  @apply flex justify-center text-center mx-auto;
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
  @apply flex justify-center items-center flex-col bg-gray-100 mx-5 p-5 rounded-lg;
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