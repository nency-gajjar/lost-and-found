<template>
  <div class="wrapper">
    <div class="container max-w-full mx-auto px-4">
      <main class="my-10 space-y-6">
        <div class="flex flex-col md:space-y-0 md:flex-row justify-between">
          <div class="mr-6 order-2 md:order-1 mt-3 md:mt-0">
            <BaseHeader class="text-left" varient="h4">Surcharge</BaseHeader>
          </div>
        </div>
        <div
          class="
            justify-end
            w-full
            flex
            mt-8
            mb-5
          "
        >
          <BaseButton
            @click="showSurchargeModel = true; mode = 'create'"
            class="sm:ml-2 mt-3 sm:mt-0"
          >
            + Create
          </BaseButton>
        </div>
        <div
          class="
            overflow-x-auto
            rounded-tl-lg rounded-tr-lg
            inline-block
            w-full
            bg-white
            shadow-lg
          "
        >
          <div
            class="
              align-middle
              inline-block
              min-w-full
              whitespace-nowrap
              overflow-hiddenrounded-bl-lg
              rounded-br-lg
            "
          >
            <table class="min-w-full">
              <thead class="sticky top-0">
                <tr
                  class="
                    bg-accent-100
                    text-white
                    uppercase
                    text-sm
                    leading-normal
                  "
                >
                  <th data-priority="1" class="py-3 px-6 text-left">Key</th>
                  <th class="py-3 px-6 text-left">Service</th>
                  <th class="py-3 px-6 text-left">Package Type</th>
                  <th class="py-3 px-6 text-left">Effective after</th>
                  <th class="py-3 px-6 text-left">Effective before</th>
                  <th class="py-3 px-6 text-left">Dollar amount</th>
                  <th class="py-3 px-6 text-left">Percentage</th>
                  <th class="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody v-if="surChargeData.length > 0" class="bg-white text-gray-800">
                <tr
                  class="border-b border-gray-200 hover:bg-gray-100"
                  v-for="data in surChargeData" :key="data.id"
                >
                  <td class="py-3 px-6 text-left">
                    <p>{{ data.catergory }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ data.service }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ data.packagetype }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ formatDate(data.mindate) }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ formatDate(data.maxdate) }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>$ {{ data.srchargeamont }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ data.srchargepercentage ? data.srchargepercentage : '-' }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <div class="flex justify-content-center gap-4">
                      <div @click="editSurcharge(data)" class="bg-blue-600 px-3 py-2 rounded cursor-pointer">
                        <BaseIcon
                          icon="pencil"
                          color="white"
                        />
                      </div>
                      <div @click="deleteSurcharge(data.id)" class="bg-red-600 px-3 py-2 rounded cursor-pointer">
                        <svg
                          v-if="isRemovingItem[data.id]"
                          class="w-5 h-5 text-white animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <BaseIcon
                          v-else
                          icon="trash"
                          color="white"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="!isLoading && surChargeData.length === 0">
              <p class="py-3">
                No surcharge data found!
              </p>
            </div>
            <div class="py-3" v-if="isLoading">
              <BaseLoader :needFullScreen="true" />
            </div>
          </div>
        </div>
      </main>
    </div>
    <SurchargeModel
      v-if="showSurchargeModel"
      :show-modal="showSurchargeModel"
      :mode="mode"
      :data="editData"
      @close="showSurchargeModel = false; fetchSurcharge();"
    />
  </div>
</template>

<script>
import SurchargeModel from '~/components/SurchargeModel.vue';
import moment from "moment";
export default {
  components: { SurchargeModel },
  middleware: ["auth-admin"],
  data() {
    return {
      surChargeData: {},
      showSurchargeModel: false,
      mode: "create",
      editData: {},
      isLoading: true,
      isRemovingItem: {}
    }
  },
  mounted(){
    this.fetchSurcharge();
  },
  methods: {
    fetchSurcharge(){
      this.isLoading = true;
      this.$axios
        .get("/getAllSurchargedetails")
        .then((response) => {
          this.surChargeData = response.data.data.Items;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        })
    },
    formatDate(date){
      return moment(date).format("MM-DD-YYYY");
    },
    editSurcharge(data) {
      this.editData = data;
      this.mode = "edit";
      this.showSurchargeModel = true;
    },
    deleteSurcharge(id) {
      this.$set(this.isRemovingItem, id, true);
      this.$axios
        .post("/deletesingleSurcharge?id="+id)
        .then((response) => {
          this.$toast.info("Surcharge deleted successfully!");
          this.fetchSurcharge();
          this.isRemovingItem[id] = false;
        })
        .catch((error) => {
          this.$toast.error("Something went wrong! Please try again.");
          this.isRemovingItem[id] = false;
        })
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    @apply min-h-screen flex flex-col justify-start pt-0 items-center text-center mx-0 sm:mx-8;
  }
</style>