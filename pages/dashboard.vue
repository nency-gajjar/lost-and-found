<template>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-4">
      <main class="my-10 space-y-6">
        <div class="flex flex-col md:space-y-0 md:flex-row justify-between">
          <div class="mr-6 order-2 md:order-1 mt-3 md:mt-0">
            <BaseHeader class="text-left" varient="h4">{{ $t('adminDashboard') }}</BaseHeader>
          </div>
        </div>
        <section class="grid md:grid-cols-2 xl:grid-cols-5 gap-6">
          <div
            v-for="tab in tabs" :key="tab.id"
            :class="[tab.tileBgClass, tabSelected === tab.id ? tab.borderClass : '']"
            class="
              p-3
              transition-shadow
              border-b-8 border-transparent
              rounded-lg
              shadow-sm
              hover:shadow-lg
              flex
              justify-center
              cursor-pointer
            "
            @click="changeTab(tab.id)"
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
              {{ $t('deleteItem') }}
            </BaseButton>
          </ItemCard>
        </template>
        <template v-else-if="!isLoading && filteredItems.length === 0">
          <p class="text-gray-600 font-medium m-14">{{ $t('noItemAvailable') }}</p>
        </template>
        <template v-else>
          <BaseLoader />
        </template>
      </div>
    </div>
    <BaseDialog
      v-if="showDialog"
      :showDialog="showDialog"
      :showClose="false"
      :icon="{ name: 'trash-can', color: 'red', size: '3x' }"
      :buttonTitle="$t('yesPlease')"
      :title="$t('areYouSure')"
      :message="$t('doYouWantToRemoveTheItem')"
      @close="showDialog= false;"
    >
      <template v-slot:action>
        <BaseButton
          class="!capitalize !px-5 !py-2"
          varient="gray"
          @click="showDialog= false; deleteItem()"
          >{{ $t('yesPlease') }}
        </BaseButton>
      </template>
    </BaseDialog>
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
      showDialog: false,
      itemToDelete: {},
      tabs: [
        { id: 0, name: this.$t('waitingForApproval'), data: '', tileBgClass: 'bg-blue-600', borderClass: '!border-blue-800', totalBgClass: 'bg-blue-500'},
        { id: 1, name: this.$t('totalLostItems'), data: '', tileBgClass: 'bg-pink-600', borderClass: '!border-pink-800', totalBgClass: 'bg-pink-400'},
        { id: 2, name: this.$t('totalClaimItems'), data: '', tileBgClass: 'bg-yellow-600', borderClass: '!border-yellow-800', totalBgClass: 'bg-yellow-500'},
        { id: 3, name: this.$t('totalItemsListedToday'), data: '', tileBgClass: 'bg-cyan-600', borderClass: '!border-cyan-800', totalBgClass: 'bg-cyan-500'},
        { id: 4, name: this.$t('totalItemsClaimedToday'), data: '', tileBgClass: 'bg-indigo-600', borderClass: '!border-indigo-800', totalBgClass: 'bg-indigo-400'},
        { id: 5, name: this.$t('totalUnclaimedItems'), data: '', tileBgClass: 'bg-rose-600', borderClass: '!border-rose-800', totalBgClass: 'bg-rose-400'},
        { id: 6, name: this.$t('awaitingItemOwnerAction'), data: '', tileBgClass: 'bg-purple-600', borderClass: '!border-purple-800', totalBgClass: 'bg-purple-400'},
        { id: 7, name: this.$t('holdForPickupItems'), data: '', tileBgClass: 'bg-emerald-600', borderClass: '!border-emerald-800', totalBgClass: 'bg-emerald-400'},
      ]
    };
  },
  created() {
    this.getAdminDashboardDetails();
    this.getPendingListDetails();
    if(this.$store.getters["admin/tabId"]){
      this.tabSelected = JSON.parse(JSON.stringify(this.$store.getters["admin/tabId"]));
    }
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
    changeTab(tabId){
      this.tabSelected = tabId;
      this.searchQuery = '';
      this.$store.commit("admin/SET_TAB_ID", tabId);
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
            this.dashboardDetails = response?.data?.data || [];

            this.tabs[0].data = this.pendingListDetails.reverse()
            this.dashboardDetails.forEach((detail, index) => {
              if(this.tabs.length > index+1){
                for (const key in detail) {
                  this.tabs[index+1].data = detail[key].reverse()
                }
              }
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
      if (this.tabSelected === 0) {
        this.$nextTick(() => {
          this.$router.push({
            path: "/admin/detail-confirmation",
            query: { id: item.id },
          });
        });
      } else {
        this.$nextTick(() => {
          this.$router.push({
            path: "detail-confirmation",
            query: { id: item.id },
          });
        });
      }
    },
    deleteItem() {
      const access_token = this.$auth.getToken("local");
      this.$set(this.isLoadingRemoveImage, this.itemToDelete.id, true);
      this.$axios
        .post(`/deletesingledetailadmin?id=${this.itemToDelete.id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.isLoadingRemoveImage[this.itemToDelete.id] = false;
            this.$toast.info("Item Deleted successfully!");
            this.getAdminDashboardDetails();
          }
        })
        .catch((err) => {
          this.$toast.error("Something went wrong! Please try again.");
          this.isLoadingRemoveImage[this.itemToDelete.id] = false;
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