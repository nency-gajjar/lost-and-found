<template>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-4">
      <main class="my-10 space-y-6">
        <div class="flex flex-col md:space-y-0 md:flex-row justify-between">
          <div class="mr-6 order-2 md:order-1 mt-3 md:mt-0">
            <BaseHeader class="text-left" varient="h4">Admin Dashboard</BaseHeader>
          </div>
        </div>
        <section class="grid md:grid-cols-2 xl:grid-cols-5 gap-6">
          <div
            v-for="tab in tabs" :key="tab.id"
            :class="[tab.tileBgClass, tabSelected === tab.id ? tab.borderClass : '']"
            class="
              p-3
              bg-blue-600
              transition-shadow
              border-b-8 border-transparent
              rounded-lg
              shadow-sm
              hover:shadow-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="tabSelected = tab.id; searchQuery = ''"
          >
            <div class="flex flex-col items-center justify-center">
              <span
                 :class="[tab.totalBgClass]"
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
                  rounded-full
                "
                >{{ tab.data.length }}</span>
              <span class="block font-semibold text-white">{{ tab.name }}</span>
            </div>
          </div>
        </section>
      </main>
      <div class="w-full flex gap-3 flex-auto mt-3 sm:mt-0 sm:w-7/12">
        <div class="w-full flex justify-end items-center pt-5 relative">
          <input
            v-model="searchQuery"
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
            @click="searchQuery = ''"
          />
        </div>
      </div>
      <div v-if="!isLoading && filteredItems">
        <template v-if="filteredItems.length > 0">        
          <ItemCard v-for="item in filteredItems" :key="item.id" :item="item" @click.native="viewItem(item)">
            <BaseButton
              :is-loading="isLoadingRemoveImage[item.id]"
              :icon="{ name: 'trash-can', color: 'white', size: '1x' }"
              class="!capitalize !px-5 !py-2 !inline-flex !items-center"
              varient="red"
              @click.stop="deleteItem(item)"
            >
              Delete Item
            </BaseButton>
          </ItemCard>
        </template>
        <template v-else-if="!isLoading && filteredItems.length === 0">
          <p class="text-gray-600 font-medium m-14">No Item Available</p>
        </template>
        <template v-else>
          <BaseLoader />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from "../components/shared/ItemCard.vue";

export default {
  middleware: ["auth-admin"],
  components: { ItemCard },
  data() {
    return {
      dashboardDetails: [],
      isLoadingRemoveImage: {},
      isLoading: false,
      tabSelected: 0,
      pendingListDetails: [],
      searchQuery: "",
      tabs: [
        { id: 0, name: 'Waiting For Approval', data: '', tileBgClass: 'bg-blue-600', borderClass: '!border-blue-800', totalBgClass: 'bg-blue-500'},
        { id: 1, name: 'Total Lost Items', data: '', tileBgClass: 'bg-pink-600', borderClass: '!border-pink-800', totalBgClass: 'bg-pink-400'},
        { id: 2, name: 'Total Claim Items', data: '', tileBgClass: 'bg-yellow-600', borderClass: '!border-yellow-800', totalBgClass: 'bg-yellow-500'},
        { id: 3, name: 'Total Items Listed Today', data: '', tileBgClass: 'bg-cyan-600', borderClass: '!border-cyan-800', totalBgClass: 'bg-cyan-500'},
        { id: 4, name: 'Total Items Claimed Today', data: '', tileBgClass: 'bg-indigo-600', borderClass: '!border-indigo-800', totalBgClass: 'bg-indigo-400'},
      ]
    };
  },
  created() {
    this.getAdminDashboardDetails();
    this.getPendingListDetails();
  },
  computed: {
    filteredItems () {
      if (this.searchQuery?.length) {
        if (this.tabs[this.tabSelected].data.length > 0) {
          return this.tabs[this.tabSelected].data.filter(item => item?.item_description?.trim()?.toLowerCase()?.includes(this.searchQuery?.trim()?.toLowerCase()));
        }
      } else {
        return this.tabs[this.tabSelected].data
      }
    }
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
            this.dashboardDetails = response?.data?.data || [];

            this.tabs[0].data = this.pendingListDetails
            this.dashboardDetails.forEach((detail, index) => {
              for (const key in detail)  this.tabs[index+1].data = detail[key]
            });
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
            this.pendingListDetails = response?.data?.data?.Items || [];
          }
        })
        .catch((err) => {
          this.$toast.error("Something went wrong! Please try again.");
          console.log(err);
        });
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
</style>