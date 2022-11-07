<template>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-4">
      <div
        :class="
          !isLoading && lostItems.length > 0
            ? ' justify-between'
            : 'justify-end'
        "
        class="
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
        <BaseButton
          class="sm:ml-2 grow mt-3 sm:mt-0 sm:grow-0"
          @click="addNewItem"
        >
          + Add New Item
        </BaseButton>
      </div>
      <div class="align-middle inline-block w-full">
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
          <div
            class="
              inline-flex
              border
              w-full
              sm:w-3/12
              rounded
              px-3
              h-12
              flex-auto
              bg-white
            "
          >
            <div
              class="flex flex-wrap items-stretch w-full h-full mb-6 relative"
            >
              <div class="flex">
                <span
                  class="
                    flex
                    items-center
                    leading-normal
                    bg-transparent
                    rounded rounded-r-none
                    border border-r-0 border-none
                    py-2
                    whitespace-no-wrap
                    text-grey-dark text-sm
                  "
                >
                  <svg
                    width="18"
                    height="18"
                    class="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                class="
                  border-transparent
                  focus:border-transparent focus:ring-0
                  flex-shrink
                  w-full
                  flex-grow flex-auto
                  leading-normal
                  tracking-wide
                  w-px
                  flex-1
                  border-0
                  shadow-none
                  rounded rounded-l-none
                  px-3
                  relative
                  focus:outline-none
                  text-xxs
                  lg:text-xs lg:text-base
                  text-gray-500
                  font-thin
                "
                placeholder="Search"
              />
            </div>
          </div>
          <div class="w-full flex gap-2 flex-auto mt-3 sm:mt-0 sm:w-3/12">
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
          <div class="h-full flex-auto w-full mt-3 sm:mt-0 sm:w-3/12">
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
          <BaseButton
            class="sm:ml-2 grow mt-3 sm:mt-0 sm:grow-0 whitespace-nowrap"
            @click="applyFilters"
          >
            Apply
          </BaseButton>
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
      isLoading: false,
      searchQuery: "",
      startDate: null,
      endDate: null,
      itemDescription: "",
      itemDescriptionOptions: itemDescriptionOptions,
    };
  },
  methods: {
    changeItemDescription(event) {
      this.itemDescription = event.target.value;
    },
    addNewItem() {
      this.$router.push({ name: "item-details" });
    },
    applyFilters(){
      console.log(this.searchQuery);
      console.log(moment(this.startDate).format("YYYY-MM-DD"));
      console.log(moment(this.endDate).format("YYYY-MM-DD"));
      console.log(this.itemDescription);
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
  },
  created() {
    this.isLoading = true;
    this.$axios
      .get("/getalllostitem")
      .then((response) => {
        if (response.status === 200) {
          this.isLoading = false;
          this.lostItems = response?.data?.data;
          if (!this.lostItems) {
            this.lostItems = [];
          }
        }
      })
      .catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
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