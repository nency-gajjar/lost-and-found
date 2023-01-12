<template>
  <div class="wrapper">
    <div class="container max-w-full mx-auto px-4">
      <main class="my-10 space-y-6">
        <div class="flex flex-col md:space-y-0 md:flex-row justify-between">
          <div class="mr-6 order-2 md:order-1 mt-3 md:mt-0">
            <h1 class="text-2xl text-gray-600 font-semibold">
              Item Description
            </h1>
          </div>
        </div>
        <div
          class="
            sm:justify-end
            justify-center
            w-full
            gap-3
            flex
            mt-8
            mb-5
          "
        >
          <input @change="uploadFile($event)" ref="excelFile" class="hidden" type="file" name="files" id="uploadSheet">
          <label class="flex cursor-pointer items-center mt-3 sm:mt-0 font-medium tracking-widest text-sm rounded-md leading-5 relative uppercase py-2.5 px-12 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:cursor-not-allowed bg-primary-100 text-white focus:ring-primary-100 hover:bg-primary-200" for="uploadSheet">
            <svg
              v-if="isUploadSheetLoading"
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
            <p v-else>UPLOAD</p>
          </label>
          <BaseButton
            @click="showItemDescModel = true; mode = 'create'"
            class="sm:ml-2 mt-3 sm:mt-0"
          >
            + Add New
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
                  <th data-priority="1" class="py-3 px-6 text-left">Item description</th>
                  <th class="py-3 px-6 text-left">Package Type</th>
                  <th class="py-3 px-6 text-left">Weight</th>
                  <th class="py-3 px-6 text-left">Dimensions</th>
                  <th class="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody v-if="itemDescriptionData.length > 0" class="bg-white text-gray-800">
                <tr
                  class="border-b border-gray-200 hover:bg-gray-100"
                  v-for="data in itemDescriptionData" :key="data.id"
                >
                  <td class="py-3 px-6 text-left">
                    <p>{{ data.item_description }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ data.package_type }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ data.weight_pounds }} lbs</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>
                        {{ data.item_length }}(l) x
                        {{ data.item_width }}(w) x
                        {{ data.item_height }}(h) inches
                    </p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <div class="flex justify-content-center gap-4">
                      <div @click="editSurcharge(data)" class="bg-blue-600 px-3 py-2 rounded cursor-pointer">
                        <BaseIcon
                          icon="pencil"
                          color="white"
                        />
                      </div>
                      <div @click="idToDelete=data.id; showDialog=true" class="bg-red-600 px-3 py-2 rounded cursor-pointer">
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
            <div v-if="!isLoading && itemDescriptionData.length === 0">
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
    <ItemDescModal
      v-if="showItemDescModel"
      :show-modal="showItemDescModel"
      :mode="mode"
      :data="editData"
      @close="showItemDescModel = false; getItemDescriptionOptions();"
    />
    <BaseDialog
      v-if="showDialog"
      :showDialog="showDialog"
      :showClose="false"
      :icon="{ name: 'trash-can', color: 'red', size: '3x' }"
      buttonTitle="Yes please!"
      title="Are you sure?"
      message="Do you want to remove the item description?"
      @close="showDialog=false;"
    >
      <template v-slot:action>
        <BaseButton
          class="!capitalize !px-5 !py-2"
          varient="gray"
          @click="showDialog=false; deleteSurcharge()"
          >Yes please!
        </BaseButton>
      </template>
    </BaseDialog>
  </div>
</template>

<script>
import ItemDescModal from '~/components/ItemDescModal.vue';
export default {
  components: { ItemDescModal },
  middleware: ["auth-admin"],
  data() {
    return {
      itemDescriptionData: [],
      showItemDescModel: false,
      mode: "create",
      editData: {},
      isLoading: true,
      isRemovingItem: {},
      isUploadSheetLoading: false,
      showDialog: false,
      idToDelete: "",
    }
  },
  mounted(){
    this.getItemDescriptionOptions();
  },
  methods: {
    sortItemDescription(obj1, obj2){
      return obj1.item_description.localeCompare(obj2.item_description);
    },
    uploadFile(event) {
      const allowedExtensions = /(\.xlsx)$/i;
      const filePath = event.target?.files[0];
      if (filePath) {
        if (allowedExtensions.exec(filePath.name)) {
          this.isUploadSheetLoading = true;
          let formData = new FormData();
          formData.append('file', filePath);
          this.$axios.post("/uploadExcelfileData", formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
          })
          .then((response) => {
            if (response.status === 200) {
              this.$toast.info("Item Description added successfully!");
              this.getItemDescriptionOptions();
            }
            this.isUploadSheetLoading = false;
            this.$refs.excelFile.value = "";
          })
          .catch(() => {
            this.$toast.error("Something went wrong! Please try again.");
            this.isUploadSheetLoading = false;
            this.$refs.excelFile.value = "";
          })
        } else {
          this.$toast.error("Uploaded file is not supported. Allowed file types: .xlsx");
        }
      }
    },
    getItemDescriptionOptions() {
      this.isLoading = true;
      this.$axios
        .get("/viewallItemdescriptionDetails")
        .then((response) => {
          if (response.status === 200) {
            this.isLoading = false;
            this.itemDescriptionData = response.data?.data?.Items || [];
            this.itemDescriptionData = this.itemDescriptionData.map((item) => {
              return item;
            });
            this.itemDescriptionData = this.itemDescriptionData.sort(this.sortItemDescription)
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    editSurcharge(data) {
      this.editData = data;
      this.mode = "edit";
      this.showItemDescModel = true;
    },
    deleteSurcharge() {
      let id = this.idToDelete;
      this.$set(this.isRemovingItem, id, true);
      this.$axios
          .post("/deleteItemdescriptionDetails", _, {
            headers: {
              Authorization: localStorage.getItem("auth._token.local"),
            },
            params: { id: id },
          })
          .then((res) => {
            if (res.status === 200) {
              this.$toast.info("Item Description deleted successfully!");
              this.getItemDescriptionOptions();
              this.isRemovingItem[id] = false;
            }
          })
          .catch((err) => {
            this.$toast.error("Something went wrong! Please try again.");
            this.isRemovingItem[id] = false;
            console.log(err);
          });
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    @apply min-h-screen flex flex-col justify-start pt-0 items-center text-center mx-0 sm:mx-8;
  }
</style>