<template>
  <div class="wrapper">
    <div class="container max-w-full mx-auto px-4">
      <main class="my-10 space-y-6">
        <div class="flex flex-col md:space-y-0 md:flex-row justify-between">
          <div class="mr-6 order-2 md:order-1 mt-3 md:mt-0">
            <BaseHeader class="text-left" varient="h4">Users</BaseHeader>
          </div>
        </div>
        <div
          class="
            sm:justify-end
            justify-center
            w-full
            flex
            mt-8
            gap-3
            mb-5
          "
        >
          <BaseButton
            @click="downloadCsv"
            :is-loading="isExportLoading"
            varient="secondary"
            class="sm:!px-12 !px-4"
          >
            Export
          </BaseButton>
          <!-- <BaseButton
            @click="deleteAllUsers"
            :is-loading="isDeleteAllLoading"
            varient="red"
            class="sm:!px-12 !px-4"
          >
            Delete all
          </BaseButton> -->
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
                  <th data-priority="1" class="py-3 px-6 text-left">Name</th>
                  <th class="py-3 px-6 text-left cursor-pointer" @click="sortVenueType">
                    Venue Type 
                    <span v-show="sortVenueAsc !== null">
                      <BaseIcon
                        :icon="sortVenueAsc ? 'angle-up' : 'angle-down'"
                        color="white"
                        size="1x"
                        style="max-width: 15px"
                      />
                    </span>
                  </th>
                  <th class="py-3 px-6 text-left">Email</th>
                  <th class="py-3 px-6 text-left">Secondary Email</th>
                  <th class="py-3 px-6 text-left">Venue Mobile No.</th>
                  <th class="py-3 px-6 text-left">Employee Mobile No.</th>
                  <!-- <th class="py-3 px-6 text-left">Delete</th> -->
                </tr>
              </thead>
              <tbody v-if="userList.length > 0" class="bg-white text-gray-800">
                <tr
                  class="border-b border-gray-200 hover:bg-gray-100"
                  v-for="user in userList" :key="user.id"
                >
                  <td class="py-3 px-6 text-left">
                    <p>{{ user.venue_name }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ user.venu_type }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ user.venue_email }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ user.secondary_email || '-' }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ user.venue_phone_no }}</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>{{ user.employee_mobile_no }}</p>
                  </td>
                  <!-- <td class="py-3 px-6 text-left">
                    <div @click="idToDelete=user.id; showDialog=true" class="bg-red-600 flex justify-center items-center px-3 py-2 rounded cursor-pointer">
                      <svg
                        v-if="isRemovingUser[user.id]"
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
                  </td> -->
                </tr>
              </tbody>
            </table>
            <div v-if="!isLoading && userList.length === 0">
              <p class="py-3">
                No users found!
              </p>
            </div>
            <div class="py-3" v-if="isLoading">
              <BaseLoader :needFullScreen="true" />
            </div>
          </div>
        </div>
      </main>
    </div>
    <BaseDialog
      v-if="showDialog"
      :showDialog="showDialog"
      :showClose="false"
      :icon="{ name: 'trash-can', color: 'red', size: '3x' }"
      buttonTitle="Yes please!"
      title="Are you sure?"
      message="Do you want to remove User?"
      @close="showDialog=false;"
    >
      <template v-slot:action>
        <BaseButton
          class="!capitalize !px-5 !py-2"
          varient="gray"
          @click="showDialog=false; deleteSingleUser()"
          >Yes please!
        </BaseButton>
      </template>
    </BaseDialog>
  </div>
</template>

<script>
export default {
  middleware: ["auth-admin"],
  data() {
    return {
      isLoading: true,
      userList: [],
      isExportLoading: false,
      isDeleteAllLoading: false,
      idToDelete: "",
      isRemovingUser: {},
      showDialog: false,
      sortVenueAsc: null,
    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    sortVenueType() {
      if(this.sortVenueAsc === null){
        this.sortVenueAsc = false;
      }
      this.sortVenueAsc = !this.sortVenueAsc;
      this.userList = this.userList.sort((a, b) => {
        return a.venu_type.localeCompare(b.venu_type);
      });
      if(!this.sortVenueAsc) {
        this.userList.reverse();
      }
    },
    deleteSingleUser() {
      let id = this.idToDelete;
      this.$set(this.isRemovingUser, id, true);
      setTimeout(() => {
        this.isRemovingUser[id] = false;
      }, 2000);
    },
    deleteAllUsers() {
      this.isDeleteAllLoading = true;
      setTimeout(() => {
        this.isDeleteAllLoading = false;
      }, 2000);
    },
    downloadCsv() {
      this.isExportLoading = true;
      let x = document.createElement("A");
      x.setAttribute("href", this.csvString );
      x.setAttribute("download","somedata.csv");
      document.body.appendChild(x);
      x.click();
      this.isExportLoading = false;
    },
    getAllUsers() {
      const access_token = this.$auth.getToken("local");
      this.isLoading = true;
      this.$axios
        .post("/getAllUserListforAdmin", {
          headers: {
            Authorization: `${access_token}`,
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.isLoading = false;
            this.userList = response?.data?.data[0]?.userlist;
            let excelData = this.userList.map(data => {
              return [data.venue_name.replaceAll(",", " "), data.venue_email, data.venue_phone_no.replaceAll(",", " "), data.venu_type.replaceAll(", ", " ")]
            });
            excelData.unshift(["NAME", "EMAIL", "PHONE NUMBER", "BUSINESS NAME"]);
            this.csvString = "";
            excelData.forEach((RowItem) => {
              RowItem.forEach((ColItem) => {
                this.csvString += ColItem + ',';
              });
              this.csvString += "\r\n";
            });
            this.csvString = "data:application/csv," + encodeURIComponent(this.csvString);
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
  }
};
</script>

<style lang="scss" scoped>
  .wrapper {
    @apply min-h-screen flex flex-col justify-start pt-0 items-center text-center mx-0 sm:mx-8;
  }
</style>