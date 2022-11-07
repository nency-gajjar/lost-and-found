<template>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-4">
      <div
        class="
          justify-end
          w-full
          flex flex-col
          sm:flex-row
          flex-wrap
          sm:flex-nowrap
          mt-8
          mb-5
        "
      >
        <!-- <h2
          v-if="!isLoading && lostItems.length > 0"
          class="text-2xl font-semibold leading-tight"
        >
          Found Items ({{ lostItems.length }})
        </h2> -->
        <BaseButton
          class="sm:ml-2 grow mt-3 sm:mt-0 sm:grow-0"
          @click="addNewItem"
        >
          + Add New Item
        </BaseButton>
      </div>

      <!-- Filter Panel -->
      <div class="flex flex-col gap-3">
        <div class="align-middle inline-block w-full">
          <!-- Location -->
          <div class="inline-flex flex-auto w-full bg-white">
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
                  <BaseIcon
                    @click="clearAddress"
                    icon="circle-xmark"
                    color="gray"
                  />
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
        <div class="align-middle inline-block w-full">
          <div
            class="
              flex
              justify-between
              flex-col
              gap-3
              flex-wrap
              md:flex-nowrap
              sm:flex-row
              items-center
            "
          >
            <div class="w-full flex gap-3 flex-auto mt-3 sm:mt-0 sm:w-6/12">
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
              <BaseSelect
                v-model="itemDescription"
                :options="itemDescriptionOptions"
                label="Item Description"
              />
            </div>
            <div
              class="
                w-full
                flex
                item-center
                justify-end
                sm:mt-0 sm:w-2/12
                flex-auto
                gap-2
              "
            >
              <!-- <button
                class="
                  bg-blue-500
                  text-white
                  hover:bg-blue-600
                  font-bold
                  text-sm
                  px-4
                  py-2
                  rounded
                  shadow
                  hover:shadow-md
                  outline-none
                  focus:outline-none
                  mr-1
                  mb-1
                "
                type="button"
              >
                <BaseIcon
                  icon="filter"
                  color="white"
                  style="max-width: 15px"
                  class="mr-1"
                />
                Apply Filter
              </button> -->
              <button
                @click="applyFilters"
                class="
                  bg-green-600
                  text-white
                  hover:bg-green-700
                  font-bold
                  text-sm
                  px-4
                  py-2
                  rounded
                  shadow
                  hover:shadow-md
                  outline-none
                  focus:outline-none
                  mr-1
                  mb-1
                "
                type="button"
              >
                <BaseIcon
                  icon="filter"
                  color="white"
                  style="max-width: 15px"
                  class="mr-1"
                />
                Filters Applied
              </button>
              <button
                @click="clearFilters"
                class="
                  bg-gray bg-white
                  hover:shadow-lg hover:bg-gray-100
                  text-gray-600 text-sm
                  font-bold
                  px-4
                  py-2
                  rounded
                  shadow
                  hover:shadow-md
                  outline-none
                  border border-gray-300
                  focus:outline-none
                  mr-1
                  mb-1
                "
                type="button"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="
          justify-start
          w-full
          flex flex-col
          sm:flex-row
          flex-wrap
          sm:flex-nowrap
          mt-8
          mb-5
        "
      >
        <h2
          v-if="!isLoading && lostItems.length > 0"
          class="text-2xl font-semibold leading-tight"
        >
          Found Items ({{ lostItems.length }})
        </h2>
      </div>

      <div class="flex flex-col gap-3">
        <div class="align-middle inline-block w-full">
          <div
            class="
              flex
              justify-between
              flex-col
              gap-3
              flex-wrap
              md:flex-nowrap
              sm:flex-row
              items-center
            "
          >
            <div class="w-full flex gap-3 flex-auto mt-3 sm:mt-0 sm:w-5/12">
              <ul class="list-none flex items-center mt-4">
                <li
                  class="
                    p-2
                    mr-4
                    text-xs text-gray-600
                    bg-white
                    rounded-full
                    border border-gray-300
                    cursor-pointer
                  "
                >
                  12-01-2022
                  <span class="ml-2">
                    <BaseIcon
                      icon="xmark"
                      color="gray"
                      style="max-width: 12px"
                    />
                  </span>
                </li>
                <li
                  class="
                    p-2
                    mr-4
                    text-xs text-gray-600
                    bg-white
                    rounded-full
                    border border-gray-300
                    cursor-pointer
                  "
                >
                  12-01-2022
                  <span class="ml-2">
                    <BaseIcon
                      icon="xmark"
                      color="gray"
                      style="max-width: 12px"
                    />
                  </span>
                </li>
                <li
                  class="
                    p-2
                    mr-4
                    text-xs text-gray-600
                    bg-white
                    rounded-full
                    border border-gray-300
                    cursor-pointer
                  "
                >
                  12-01-2022
                  <span class="ml-2">
                    <BaseIcon
                      icon="xmark"
                      color="gray"
                      style="max-width: 12px"
                    />
                  </span>
                </li>
              </ul>
            </div>
            <div class="w-full flex gap-3 flex-auto mt-3 sm:mt-0 sm:w-7/12">
              <div class="w-full flex justify-end items-center pt-5 relative">
                <input
                  v-model="searchQuery"
                  @input="filterItems"
                  class="
                    text-sm
                    leading-none
                    text-left text-gray-600
                    px-4
                    py-3
                    w-full
                    border
                    rounded-full
                    border-gray-300
                    outline-none
                  "
                  type="text"
                  placeholder="Search"
                />
                <BaseIcon
                  icon="magnifying-glass"
                  color="gray"
                  size="1x"
                  class="absolute right-3 z-10 cursor-pointer"
                  style="max-width: 15px"
                />
                <!-- <BaseIcon
                  icon="xmark"
                  color="gray"
                  size="1x"
                  class="absolute right-3 z-10 cursor-pointer"
                  style="max-width: 15px"
                /> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isLoading && lostItems.length > 0">
        <div
          v-for="item in lostItems"
          :key="item.id"
          @click="viewItem(item)"
          class="
            cursor-pointer
            py-2
            px-5
            mt-5
            flex
            sm:flex-row
            flex-col
            justify-between
            bg-white
            rounded-lg
            border
            shadow-md
            relative
          "
        >
          <div
            class="
              flex
              sm:items-center
              flex-col
              sm:flex-row
              justify-left justify-around
              sm:gap-4
            "
          >
            <div
              class="
                w-20
                min-w-[80px]
                mx-auto
                sm:mx-0
                flex
                items-center
                mb-3
                sm:mb-0
              "
            >
              <img
                v-if="item.image"
                class="w-full rounded-t-lg md:rounded-none md:rounded-l-lg"
                :src="item.image"
                alt=""
              />
              <img
                v-else
                class="
                  w-20
                  contain
                  rounded-t-lg
                  md:rounded-none md:rounded-l-lg
                "
                src="@/assets/images/no-image4.png"
                alt=""
              />
            </div>
            <div
              class="flex flex-col text-center justify-between leading-normal"
            >
              <div class="mb-1 flex items-center">
                <div
                  class="
                    text-xl
                    font-bold
                    tracking-tight
                    text-gray-900 text-accent-100
                  "
                >
                  {{ item.item_description }}
                </div>
              </div>
              <div class="text-left">
                <div>
                  <BaseIcon icon="calendar-days" color="gray" />
                  <span class="text-sm font-normal text-gray-700">
                    {{ item.datse }}
                  </span>
                </div>
              </div>
              <div class="text-left">
                <div>
                  <BaseIcon icon="location-dot" color="red" />
                  <span class="text-sm font-normal text-gray-700">
                    {{ item.address }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center my-4 sm:my-0 gap-3">
            <button
              class="
                whitespace-nowrap
                font-medium
                text-sm
                px-5
                py-2
                rounded-md
                border-indigo-600 border
                text-indigo-600
                transition
                duration-300
                hover:bg-indigo-600 hover:text-white
                focus:outline-none
              "
              @click.stop="claimItem(item)"
            >
              Claim Item
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="!isLoading && lostItems.length === 0">No Data</div>
      <div v-else>
        <BaseLoader />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
import { itemDescriptionOptions } from "../../static/defaults.js";

export default {
  components: { DatePicker },
  data() {
    return {
      lostItems: [],
      backupLostItems: [],
      isLoading: false,
      searchQuery: "",
      startDate: null,
      endDate: null,
      itemDescription: "",
      itemDescriptionOptions: itemDescriptionOptions,
      address: "",
      addressForApi: "",
      lat: "",
      long: "",
    };
  },
  methods: {
    addNewItem() {
      this.$router.push({ name: "item-details" });
    },
    applyFilters() {
      this.isLoading = true;
      let params = {
        abc: "123",
        item_description: this.itemDescription,
        datse: moment(this.startDate).format("YYYY-MM-DD"),
        datse1: moment(this.endDate).format("YYYY-MM-DD"),
        address: this.addressForApi,
        lat: this.lat,
        long: this.long,
      };
      this.$axios
        .post("getallfilteritemdetails", {}, { params: params })
        .then((res) => {
          this.lostItems = res?.data?.data[0]?.ITEMS;
          this.backupLostItems = this.lostItems;
          this.filterItems();
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
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
    claimItem(item) {
      this.$router.push({
        name: "claim-item",
        query: { id: item.id },
        params: { item: item },
      });
    },
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
    clearAddress() {
      this.address = "";
    },
    filterItems() {
      let filterArray = [];
      if (this.searchQuery === "") {
        this.lostItems = this.backupLostItems;
      }
      this.backupLostItems.forEach((item) => {
        let itemArr = Object.values(item);
        let filteredItems = itemArr.filter((itemElement) => {
          if (typeof itemElement === "number") {
            itemElement = itemElement.toString();
          }
          return itemElement
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        });
        if (filteredItems.length != 0) {
          filterArray.push(item);
        }
      });
      this.lostItems = filterArray;
    },
    clearFilters(){
      this.searchQuery = "";
      this.startDate = null;
      this.endDate = null;
      this.itemDescription = "";
      this.address = "";
      this.addressForApi = "";
      this.lat = "";
      this.long = "";
      this.getAllLostItems();
    },
    getAllLostItems(){
      this.isLoading = true;
      this.$axios
        .get("/getalllostitem")
        .then((response) => {
          if (response.status === 200) {
            this.isLoading = false;
            this.lostItems = response?.data?.data;
            this.backupLostItems = this.lostItems;
            if (!this.lostItems) {
              this.lostItems = [];
            }
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    }
  },
  mounted() {
    if (this.$route.params?.filteredItems) {
      this.lostItems = this.$route.params?.filteredItems;
      this.backupLostItems = this.lostItems;
    } else {
      this.getAllLostItems();
    }
  },
};
</script>

<style>
.mx-input {
  height: 3rem !important;
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
</style>

<style scoped>
.wrapper {
  @apply flex flex-col justify-start pt-0 items-center text-center mx-auto;
}

.loader-container {
  height: calc(100vh - theme("spacing.52"));
}

.loader {
  border-top-color: orange;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

.mx-datepicker {
  width: 100% !important;
}
@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>