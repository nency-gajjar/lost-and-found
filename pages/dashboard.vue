<template>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-4">
      <main class="my-10 space-y-6">
        <div
          class="
            flex flex-col
            space-y-6
            md:space-y-0 md:flex-row
            justify-between
          "
        >
          <div class="mr-6">
            <h1 class="text-3xl font-semibold mb-2">Admin Dashboard</h1>
            <!-- <h2 class="text-gray-600 ml-0.5">Content here</h2> -->
          </div>
          <BaseButton
            class="sm:ml-2 grow mt-3 sm:mt-0 sm:grow-0"
            @click="showAddNewItemDescription = true"
          >
            + Add New Item Description
          </BaseButton>
        </div>
        <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div
            class="
              p-4
              bg-white
              shadow
              rounded-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="getData(1)"
          >
            <div class="flex items-center justify-center">
              <span
                v-if="
                  dashboardDetails &&
                  dashboardDetails[0] &&
                  dashboardDetails[0].totallostitemslisted
                "
                class="
                  block
                  text-2xl
                  font-bold
                  inline-flex
                  flex-shrink-0
                  items-center
                  justify-center
                  h-16
                  w-16
                  text-blue-600
                  bg-blue-100
                  rounded-full
                  mr-6
                "
                >{{ dashboardDetails[0].totallostitemslisted.length }}</span
              >
              <span class="block text-gray-500">Total Lost Items</span>
            </div>
          </div>
          <div
            class="
              p-4
              bg-white
              shadow
              rounded-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="getData(2)"
          >
            <div class="flex items-center justify-center">
              <span
                v-if="
                  dashboardDetails &&
                  dashboardDetails[1] &&
                  dashboardDetails[1].totalclaimitems
                "
                class="
                  block
                  text-2xl
                  font-bold
                  inline-flex
                  flex-shrink-0
                  items-center
                  justify-center
                  h-16
                  w-16
                  text-green-600
                  bg-green-100
                  rounded-full
                  mr-6
                "
                >{{ dashboardDetails[1].totalclaimitems.length }}</span
              >
              <span class="block text-gray-500">Total Claim Items</span>
            </div>
          </div>
          <div
            class="
              p-4
              bg-white
              shadow
              rounded-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="getData(3)"
          >
            <div class="flex items-center justify-center">
              <span
                v-if="
                  dashboardDetails &&
                  dashboardDetails[2] &&
                  dashboardDetails[2].totalitemslistedtoday
                "
                class="
                  block
                  text-2xl
                  font-bold
                  inline-flex
                  flex-shrink-0
                  items-center
                  justify-center
                  h-16
                  w-16
                  text-red-600
                  bg-red-100
                  rounded-full
                  mr-6
                "
                >{{ dashboardDetails[2].totalitemslistedtoday.length }}</span
              >
              <span class="block text-gray-500">Total Items Listed Today</span>
            </div>
          </div>
          <div
            class="
              p-4
              bg-white
              shadow
              rounded-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="getData(4)"
          >
            <div class="flex items-center justify-center">
              <span
                v-if="
                  dashboardDetails &&
                  dashboardDetails[3] &&
                  dashboardDetails[3].totalclaimitemstoday
                "
                class="
                  block
                  text-2xl
                  font-bold
                  inline-flex
                  flex-shrink-0
                  items-center
                  justify-center
                  h-16
                  w-16
                  text-indigo-600
                  bg-indigo-100
                  rounded-full
                  mr-6
                "
                >{{ dashboardDetails[3].totalclaimitemstoday.length }}</span
              >
              <span class="block text-gray-500">Total Items Claimed Today</span>
            </div>
          </div>
        </section>
      </main>
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
              type="button"
              class="
                inline-flex
                items-center
                whitespace-nowrap
                font-medium
                text-sm
                px-5
                py-2
                rounded-md
                text-white
                transition
                duration-300
                bg-red-600
                focus:outline-none
              "
              @click.stop="deleteItem(item)"
            >
              <svg
                v-if="isLoadingRemoveImage[item.id]"
                class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>

              <BaseIcon
                v-else
                icon="trash-can"
                color="white"
                size="1x"
                class="mr-2"
              />
              Delete Item
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="!isLoading && lostItems.length === 0">No Data</div>
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
  middleware({ $auth, redirect }) {
    if (!$auth.loggedIn) {
      return redirect("/found-items");
    }
  },
  components: { AddNewItemDescription },
  data() {
    return {
      dashboardDetails: [],
      isLoadingRemoveImage: {},
      isLoading: false,
      tabSelected: 1,
      showAddNewItemDescription: false,
    };
  },
  created() {
    this.getAdminDashboardDetails();
  },
  computed: {
    lostItems() {
      if (this.tabSelected === 1) {
        return this.dashboardDetails[0].totallostitemslisted;
      } else if (this.tabSelected === 2) {
        return this.dashboardDetails[1].totalclaimitems;
      } else if (this.tabSelected === 3) {
        return this.dashboardDetails[2].totalitemslistedtoday;
      } else if (this.tabSelected === 4) {
        return this.dashboardDetails[3].totalclaimitemstoday;
      }
    },
  },
  methods: {
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
            this.dashboardDetails = response?.data.data;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    getData(tabNumber) {
      this.tabSelected = tabNumber;
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