<template>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-4 pb-6">
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
        <BaseButton
          v-if="mobileDevice"
          class="sm:ml-2 grow mt-3 sm:mt-0 sm:grow-0"
          @click="addNewItem"
        >
          + ADD A FOUND ITEM
        </BaseButton>
      </div>

      <!-- Filter Panel -->
      <BaseHeader class="text-left" varient="h5">Filters:</BaseHeader>
      <div class="flex flex-col gap-3">
        <div class="align-middle inline-block w-full">
          <!-- Location -->
          <div class="inline-flex flex-auto w-full">
            <BaseInput
              v-model="address"
              id="autocomplete-lost-items"
              type="text"
              placeholder=""
              label="Location"
              class="w-full"
              @input="getAddress"
            >
              <template v-slot:icon>
                <div
                  v-if="address"
                  class="absolute inset-y-0 top-7 right-0 flex items-center p-5"
                >
                  <BaseIcon @click="clearAddress" icon="xmark" color="gray" />
                </div>
                <div
                  v-else
                  class="absolute inset-y-0 top-7 right-0 flex items-center p-5"
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
            "
          >
            <!-- Item Description -->
            <div class="h-full flex-auto w-full md:mt-0 md:w-1/4">
              <BaseSelect
                v-model="itemDescription"
                :options="itemDescriptionOptions"
                label="Item Description"
              />
            </div>
            <div class="w-full flex flex-col mt-3 sm:mt-0 md:w-1/3">
              <label
                class="block text-md font-medium text-gray-800 text-left"
                >Date when lost?</label
              >
              <div class="w-full flex flex-auto gap-4">
                <client-only>
                  <date-picker
                    placeholder="Start date"
                    v-model="startDate"
                    :disabled-date="disableStartDate"
                    format="MM-DD-YYYY"
                  ></date-picker>
                </client-only>
                <client-only>
                  <date-picker
                    placeholder="End date"
                    v-model="endDate"
                    :disabled-date="disableEndDate"
                    format="MM-DD-YYYY"
                  ></date-picker>
                </client-only>
              </div>
            </div>

            <div
              class="
                w-full
                flex
                item-center
                justify-end
                md:mt-0 md:w-2/12
                flex-auto
                gap-2
              "
            >
              <BaseButton
                :icon="{
                  name: 'filter',
                  color: 'white',
                  size: '1x',
                }"
                class="
                  !tracking-normal
                  !capitalize
                  !px-4
                  !py-2
                  !inline-flex
                  !items-center
                  mr-1
                  mb-1
                "
                :varient="isFilterApplied ? 'green' : 'blue'"
                @click="applyFilters"
              >
                {{ isFilterApplied ? "Filters Applied" : "Apply Filters" }}
              </BaseButton>
              <BaseButton
                @click="clearFilters"
                varient="gray"
                class="!bg-white !px-4 !py-2 mr-1 mb-1 !capitalize"
                >Clear</BaseButton
              >
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isFilterApplied"
        class="w-full flex gap-3 flex-auto mt-3 sm:mt-0 sm:w-5/12"
      >
        <ul v-show="isFilterApplied" class="list-none flex items-center mt-4">
          <li
            v-if="isFilterApplied && lostItemAddress"
            class="
              flex
              items-center
              p-2
              mr-4
              text-xs text-gray-600
              bg-white
              rounded-full
              border border-gray-300
              cursor-pointer
            "
          >
            <p>{{ lostItemAddress }}</p>
            <span class="ml-2">
              <BaseIcon
                @click="resetAddress"
                icon="xmark"
                color="gray"
                style="max-width: 12px"
              />
            </span>
          </li>
          <li
            v-if="isFilterApplied && startDate"
            class="
              flex
              items-center
              p-2
              mr-4
              text-xs text-gray-600
              bg-white
              rounded-full
              border border-gray-300
              cursor-pointer
            "
          >
            <p>{{ formatedStartDate }}</p>
            <span class="ml-2">
              <BaseIcon
                @click="resetStartDate"
                icon="xmark"
                color="gray"
                style="max-width: 12px"
              />
            </span>
          </li>
          <li
            v-if="isFilterApplied && endDate"
            class="
              flex
              items-center
              p-2
              mr-4
              text-xs text-gray-600
              bg-white
              rounded-full
              border border-gray-300
              cursor-pointer
            "
          >
            <p>{{ formatedEndDate }}</p>
            <span class="ml-2">
              <BaseIcon
                @click="resetEndDate"
                icon="xmark"
                color="gray"
                style="max-width: 12px"
              />
            </span>
          </li>
          <li
            v-if="itemDescription"
            class="
              flex
              items-center
              p-2
              mr-4
              text-xs text-gray-600
              bg-white
              rounded-full
              border border-gray-300
              cursor-pointer
            "
          >
            <p>{{ itemDescription }}</p>
            <span class="ml-2">
              <BaseIcon
                @click="resetItemDescription"
                icon="xmark"
                color="gray"
                style="max-width: 12px"
              />
            </span>
          </li>
        </ul>
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
        <BaseHeader class="text-left" varient="h4">Search Results ({{ lostItems.length }})</BaseHeader>
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
                    rounded-md
                    border-gray-300
                    outline-none
                  "
                  type="text"
                  placeholder="Search"
                />
                <BaseIcon
                  v-if="!searchQuery"
                  icon="magnifying-glass"
                  color="gray"
                  size="1x"
                  class="absolute right-3 z-10 cursor-pointer"
                  style="max-width: 15px"
                />
                <BaseIcon
                  v-else
                  icon="xmark"
                  color="gray"
                  size="1x"
                  class="absolute right-3 z-10 cursor-pointer"
                  style="max-width: 15px"
                  @click="(searchQuery = ''), (lostItems = cloneLostItems)"
                />
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
            <BaseButton
              class="!px-5 !py-2 !capitalize"
              varient="red"
              @click.stop="claimItem(item)"
            >
              Claim Item
            </BaseButton>
          </div>
        </div>
      </div>
      <div v-else-if="!isLoading && lostItems.length === 0">
        <p class="text-gray-600 font-medium m-14">No Result Found</p>
      </div>
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
import DetectBrowser from "~/mixins/detectBrowser";
export default {
  components: { DatePicker },
  mixins: [DetectBrowser],
  data() {
    return {
      lostItems: [],
      cloneLostItems: [],
      isLoading: true,
      searchQuery: "",
      startDate: null,
      endDate: null,
      itemDescription: "",
      itemDescriptionOptions: [],
      address: "",
      lostItemAddress: "",
      lat: "",
      long: "",
      isFilterApplied: false,
    };
  },
  computed: {
    formatedStartDate() {
      if (this.startDate) {
        return moment(this.startDate).format("MM-DD-YYYY");
      }
      return moment(new Date()).format("MM-DD-YYYY");
    },
    formatedEndDate() {
      if (this.endDate) {
        return moment(this.endDate).format("MM-DD-YYYY");
      }
      return moment(new Date()).format("MM-DD-YYYY");
    },
    apiFormatedStartDate() {
      if (this.startDate) {
        return moment(this.startDate).format("YYYY-MM-DD");
      }
      return moment(new Date()).format("YYYY-MM-DD");
    },
    apiFormatedEndDate() {
      if (this.endDate) {
        return moment(this.endDate).format("YYYY-MM-DD");
      }
      return moment(new Date()).format("YYYY-MM-DD");
    },
  },
  methods: {
    disableStartDate(date){
      return date > new Date();
    },
    disableEndDate(date) {
      return date < this.startDate || date > new Date();
    },
    addNewItem() {
      this.$router.push({ name: "found" });
    },
    resetAddress() {
      this.clearAddress();
      this.lostItemAddress = "";
      this.lat = "";
      this.long = "";
      if (this.isFilterApplied) {
        this.applyFilters();
      }
    },
    resetStartDate() {
      this.startDate = null;
      if (this.isFilterApplied) {
        this.applyFilters();
      }
    },
    resetEndDate() {
      this.endDate = null;
      if (this.isFilterApplied) {
        this.applyFilters();
      }
    },
    resetItemDescription() {
      this.itemDescription = "";
      if (this.isFilterApplied) {
        this.applyFilters();
      }
    },
    applyFilters() {
      this.isLoading = true;
      let params = {
        abc: "123",
      };
      let itemDescription = this.itemDescription;
      if (this.itemDescription === "All") {
        itemDescription = "";
      }
      if (itemDescription) params.item_description = itemDescription;
      if (this.startDate || this.endDate) {
        params.datse = this.apiFormatedStartDate;
        params.datse1 = this.apiFormatedEndDate;
      }
      if (this.lostItemAddress) params.address = this.lostItemAddress;
      if (this.lat) params.lat = this.lat;
      if (this.long) params.long = this.long;
      this.$axios
        .post("getallfilteritemdetails", {}, { params: params })
        .then((res) => {
          this.lostItems = res?.data?.data[0]?.ITEMS;
          if (!this.lostItems) {
            this.lostItems = [];
          }
          this.cloneLostItems = this.lostItems;
          if (this.searchQuery) {
            this.filterItems();
          }
          this.isLoading = false;
          if (
            itemDescription ||
            this.startDate ||
            this.endDate ||
            this.lostItemAddress
          ) {
            this.isFilterApplied = true;
          } else {
            this.isFilterApplied = false;
          }
        })
        .catch((err) => {
          console.log(err);
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
    claimItem(item) {
      this.$router.push({
        name: "claim-item",
        params: { item: item },
      });
    },
    getAddress() {
      if (this.address == "") {
        document.getElementById("autocomplete-lost-items").placeholder = "";
      }
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete-lost-items")
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
      document.getElementById("autocomplete-lost-items").placeholder = "";
    },
    filterItems() {
      let filterArray = [];
      if (this.searchQuery === "") {
        this.lostItems = this.cloneLostItems;
      }
      this.cloneLostItems.forEach((item) => {
        let itemArr = Object.values(item);
        let filteredItems = itemArr.filter((itemElement) => {
          if (typeof itemElement !== "string") {
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
    clearFilters() {
      this.searchQuery = "";
      this.startDate = null;
      this.endDate = null;
      this.itemDescription = "";
      this.clearAddress();
      this.lostItemAddress = "";
      this.lat = "";
      this.long = "";
      this.applyFilters();
    },
    getItemDescriptionOptions() {
      return new Promise((resolve) => {
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
              resolve();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    // getAllLostItems() {
    //   this.isFilterApplied = false;
    //   this.isLoading = true;
    //   this.$axios
    //     .get("/getalllostitem")
    //     .then((response) => {
    //       if (response.status === 200) {
    //         this.isLoading = false;
    //         this.lostItems = response?.data?.data;
    //         this.cloneLostItems = cloneDeep(this.lostItems);
    //         if (!this.lostItems) {
    //           this.lostItems = [];
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       this.isLoading = false;
    //       console.log(err);
    //     });
    // }
  },
  async mounted() {
    await this.getItemDescriptionOptions();
    if (this.$route.params?.appliedFilters) {
      this.itemDescription = this.$route.params.appliedFilters.itemDescription;
      this.startDate = this.$route.params.appliedFilters.startDate;
      this.endDate = this.$route.params.appliedFilters.endDate;
      this.address = this.$route.params.appliedFilters.lostItemAddress;
      this.lostItemAddress = this.$route.params.appliedFilters.lostItemAddress;
      this.lat = this.$route.params.appliedFilters.lat;
      this.long = this.$route.params.appliedFilters.long;
      this.applyFilters();
    } else {
      this.applyFilters();
    }
  },
};
</script>

<style scoped lang="scss">
@import "./assets/styles/date-picker.scss";

.wrapper {
  @apply flex flex-col justify-start pt-0 items-center text-center mx-auto;
}
</style>