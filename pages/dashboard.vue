<template>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-4">
      <main class="my-10 space-y-6">
        <div class="flex flex-col md:space-y-0 md:flex-row justify-between">
          <div class="mr-6 order-2 md:order-1 mt-3 md:mt-0">
            <h1 class="text-2xl text-gray-600 font-semibold">
              Admin Dashboard
            </h1>
            <!-- <h2 class="text-gray-600 ml-0.5">Content here</h2> -->
          </div>
          <BaseButton
            class="order-1 md:order-2 sm:ml-2 grow sm:grow-0 mt-0"
            @click="showAddNewItemDescription = true"
          >
            + Add New Item Description
          </BaseButton>
        </div>
        <section class="grid md:grid-cols-2 xl:grid-cols-5 gap-6">
          <div
            :class="{ 'border-b-8 border-gray-500': tabSelected === 5 }"
            class="
              p-3
              bg-blue-600
              transition-shadow
              border border-blue-800
              rounded-lg
              shadow-sm
              hover:shadow-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="getData(5)"
          >
            <div class="flex flex-col items-center justify-center">
              <span
                class="
                  mb-2
                  text-2xl
                  font-bold
                  inline-flex
                  flex-shrink-0
                  items-center
                  justify-center
                  h-14
                  w-14
                  text-white
                  bg-blue-500
                  rounded-full
                "
                >{{ pendingListDetails.length || "0" }}</span
              >
              <span class="block font-semibold text-white"
                >Waiting For Approval</span
              >
            </div>
          </div>
          <div
            :class="{ 'border-b-8 border-gray-500': tabSelected === 1 }"
            class="
              p-3
              bg-pink-600
              transition-shadow
              border border-pink-800
              rounded-lg
              shadow-sm
              hover:shadow-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="getData(1)"
          >
            <div class="flex flex-col items-center justify-center">
              <span
                v-if="
                  dashboardDetails &&
                  dashboardDetails[0] &&
                  dashboardDetails[0].totallostitemslisted
                "
                class="
                  mb-2
                  text-2xl
                  font-bold
                  inline-flex
                  flex-shrink-0
                  items-center
                  justify-center
                  h-14
                  w-14
                  text-white
                  bg-pink-400
                  rounded-full
                "
                >{{ dashboardDetails[0].totallostitemslisted.length }}</span
              >
              <span class="block font-semibold text-white"
                >Total Lost Items</span
              >
            </div>
          </div>
          <div
            :class="{ 'border-b-8 border-gray-500': tabSelected === 2 }"
            class="
              p-3
              bg-yellow-600
              transition-shadow
              border border-yellow-800
              rounded-lg
              shadow-sm
              hover:shadow-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="getData(2)"
          >
            <div class="flex flex-col items-center justify-center">
              <span
                v-if="
                  dashboardDetails &&
                  dashboardDetails[1] &&
                  dashboardDetails[1].totalclaimitems
                "
                class="
                  mb-2
                  text-2xl
                  font-bold
                  inline-flex
                  flex-shrink-0
                  items-center
                  justify-center
                  h-14
                  w-14
                  text-white
                  bg-yellow-500
                  rounded-full
                "
                >{{ dashboardDetails[1].totalclaimitems.length }}</span
              >
              <span class="block font-semibold text-white"
                >Total Claim Items</span
              >
            </div>
          </div>
          <div
            :class="{ 'border-b-8 border-gray-500': tabSelected === 3 }"
            class="
              p-3
              bg-cyan-600
              transition-shadow
              border border-cyan-800
              rounded-lg
              shadow-sm
              hover:shadow-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="getData(3)"
          >
            <div class="flex flex-col items-center justify-center">
              <span
                v-if="
                  dashboardDetails &&
                  dashboardDetails[2] &&
                  dashboardDetails[2].totalitemslistedtoday
                "
                class="
                  mb-2
                  text-2xl
                  font-bold
                  inline-flex
                  flex-shrink-0
                  items-center
                  justify-center
                  h-14
                  w-14
                  text-white
                  bg-cyan-500
                  rounded-full
                "
                >{{ dashboardDetails[2].totalitemslistedtoday.length }}</span
              >
              <span class="block font-semibold text-white"
                >Total Items Listed Today</span
              >
            </div>
          </div>
          <div
            :class="{ 'border-b-8 border-gray-500': tabSelected === 4 }"
            class="
              p-3
              bg-indigo-600
              transition-shadow
              border border-indigo-800
              rounded-lg
              shadow-sm
              hover:shadow-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="getData(4)"
          >
            <div class="flex flex-col items-center justify-center">
              <span
                v-if="
                  dashboardDetails &&
                  dashboardDetails[3] &&
                  dashboardDetails[3].totalclaimitemstoday
                "
                class="
                  mb-2
                  text-2xl
                  font-bold
                  inline-flex
                  flex-shrink-0
                  items-center
                  justify-center
                  h-14
                  w-14
                  text-white
                  bg-indigo-400
                  rounded-full
                "
                >{{ dashboardDetails[3].totalclaimitemstoday.length }}</span
              >
              <span class="block font-semibold text-white"
                >Total Items Claimed Today</span
              >
            </div>
          </div>
        </section>
        <!-- </div> -->
      </main>
      <div class="w-full flex gap-3 flex-auto mt-3 justify-end">
        <div
          class="w-full sm:w-7/12 flex justify-end items-center pt-5 relative"
        >
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
              :is-loading="isLoadingRemoveImage[item.id]"
              :icon="{ name: 'trash-can', color: 'white', size: '1x' }"
              class="!capitalize !px-5 !py-2 !inline-flex !items-center"
              varient="red"
              @click.stop="deleteItem(item)"
            >
              Delete Item
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
      <AddNewItemDescription
        v-if="showAddNewItemDescription"
        :show-modal="showAddNewItemDescription"
        @close="showAddNewItemDescription = false"
      />
    </div>
  </div>
</template>

<script>
import AddNewItemDescription from "~/components/admin/AddNewItemDescription.vue";
export default {
  middleware: ["auth-admin"],
  components: { AddNewItemDescription },
  data() {
    return {
      dashboardDetails: [],
      isLoadingRemoveImage: {},
      isLoading: false,
      tabSelected: 1,
      pendingListDetails: [],
      showAddNewItemDescription: false,
      searchQuery: "",
      lostItems: [],
      cloneLostItems: [],
    };
  },
  created() {
    this.getAdminDashboardDetails();
    this.getPendingListDetails();
  },
  watch: {
    tabSelected(value) {
      this.tabSelectedChanged(value);
    },
  },
  methods: {
    tabSelectedChanged(value) {
      this.searchQuery = "";
      if (value === 1) {
        this.lostItems = this.dashboardDetails[0].totallostitemslisted || [];
      } else if (value === 2) {
        this.lostItems = this.dashboardDetails[1].totalclaimitems || [];
      } else if (value === 3) {
        this.lostItems = this.dashboardDetails[2].totalitemslistedtoday || [];
      } else if (value === 4) {
        this.lostItems = this.dashboardDetails[3].totalclaimitemstoday || [];
      } else if (value === 5) {
        this.lostItems = this.pendingListDetails;
      }
      this.cloneLostItems = this.lostItems;
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
    getAdminDashboardDetails() {
      const access_token = this.$auth.getToken("local");
      this.isLoading = true;
      this.$axios
        .post("/getalldetailsforadmin", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.isLoading = false;
            this.dashboardDetails = response?.data?.data;
            this.tabSelectedChanged(this.tabSelected);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Something went wrong! Please try again.");
          console.log(err);
        });
    },
    getPendingListDetails() {
      const access_token = this.$auth.getToken("local");
      this.$axios
        .get("/getPendinglistItemDetails", {
          headers: {
            Authorization: `${access_token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.pendingListDetails = response?.data?.data?.Items;
          }
        })
        .catch((err) => {
          this.$toast.error("Something went wrong! Please try again.");
          console.log(err);
        });
    },
    getData(tabNumber) {
      this.tabSelected = tabNumber;
    },
    viewItem(item) {
      if (this.tabSelected === 5) {
        this.$nextTick(() => {
          this.$router.push({
            path: "/admin/detail-confirmation",
            query: { id: item.id },
          });
        });
      } else {
        // this.$store.commit("item/SET_ITEM_DETAILS", {
        //   ...item,
        //   onlyDisplay: true,
        // });
        this.$nextTick(() => {
          this.$router.push({
            path: "/detail-confirmation",
            query: { id: item.id },
          });
        });
      }
    },
    deleteItem(item) {
      const access_token = this.$auth.getToken("local");
      this.$set(this.isLoadingRemoveImage, item.id, true);
      this.$axios
        .post(`/deletesingledetailadmin?id=${item.id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.isLoadingRemoveImage[item.id] = false;
            this.$toast.info("Item Deleted successfully!");
            this.getAdminDashboardDetails();
          }
        })
        .catch((err) => {
          this.$toast.error("Something went wrong! Please try again.");
          this.isLoadingRemoveImage[item.id] = false;
          console.log(err);
        });
    },
  },
};
</script>

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