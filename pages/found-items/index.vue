<template>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="w-full flex justify-between mt-8 mb-5">
        <h2 class="text-2xl font-semibold leading-tight">Found Items ({{lostItems.length}})</h2>
        <button class="
            !py-3
            font-medium
            text-md
            leading-3
            uppercase
            py-2
            px-6
            rounded-md
            button
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-primary-60
            transition-all
            font-display
            bg-accent-100
            text-white
            focus:ring-accent-100
            shadow-accent
            hover:bg-accent-200
          " @click="addNewItem">
          + Add New Item
        </button>
      </div>
      <div v-if="!isLoading && lostItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in lostItems" :key="item.id" @click="viewItem(item)" class="
            cursor-pointer
            py-4
            px-5
            flex flex-col
            bg-white
            rounded-lg
            border
            shadow-md
            relative
          ">
          <div class="w-24 h-24 mx-auto">
            <img v-if="item.image" class="
                w-full
                rounded-t-lg
                md:h-auto md:w-48 md:rounded-none md:rounded-l-lg
              " :src="item.image" alt="" />
            <img v-else class="
                w-full
                rounded-t-lg
                md:h-auto md:w-48 md:rounded-none md:rounded-l-lg
              " src="@/assets/images/not-found.png" alt="" />
          </div>
          <div class="
              flex flex-col
              items-center
              text-center
              justify-between
              py-4
              leading-normal
            ">
            <h5 class="
                mb-2
                text-xl
                font-bold
                tracking-tight
                text-gray-900 text-accent-100
              ">
              {{ item.item_description }}
            </h5>
            <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
              {{ item.item_status === 0 ? 'Calimed': 'Uncalimed'}}
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div v-else-if="!isLoading && lostItems.length === 0">
        No Data
      </div>
      <div v-else>
        <div wire:loading class="loader-container z-50 overflow-hidden flex flex-col items-center justify-center">
          <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
      </div>
      <br >
      <hr />
      <br >
      <div class="overflow-x-auto rounded-tl-lg rounded-tr-lg inline-block w-full bg-white shadow-lg">
        <div class="align-middle inline-block w-full p-4">
            <div class="flex justify-between flex-wrap items-center">
              <div class="inline-flex border w-60 rounded px-3 h-12 bg-transparent">
                  <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                    <div class="flex">
                        <span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none py-2 whitespace-no-wrap text-grey-dark text-sm">
                          <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </span>
                    </div>
                    <input type="text" class="border-transparent focus:border-transparent focus:ring-0 flex-shrink w-full flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border-0 shadow-none rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin" placeholder="Search">
                  </div>
              </div>
              <div class="h-full w-60 pt-2">
                <select id="countries" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Sort By</option>
                  <option value="US">Claimed</option>
                  <option value="CA">Unclaimed</option>
                </select>
              </div>
            </div>
        </div>
        <div class="align-middle inline-block min-w-full whitespace-nowrap overflow-hiddenrounded-bl-lg rounded-br-lg">
          <table class="min-w-full">
            <thead>
              <tr class="bg-accent-100 text-white uppercase text-sm leading-normal">
                <th data-priority="1" class="py-3 px-6 text-left">Item</th>
                <th class="py-3 px-6 text-left">Found Date</th>
                <th class="py-3 px-6 text-center">Status</th>
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <div class="mr-2">
                      <img class="w-6 h-6 rounded-full" src="@/assets/images/headphones.png" />
                    </div>
                    <span>Headphone</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <span>22-10-2022</span>
                </td>
                <td class="py-3 px-6 text-center">
                  <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">Claimed</span>
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <div class="mr-2">
                      <img class="w-6 h-6 rounded-full" src="@/assets/images/headphones.png" />
                    </div>
                    <span>Headphone</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <span>22-10-2022</span>
                </td>
                <td class="py-3 px-6 text-center">
                  <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Unclaimed</span>
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <div class="mr-2">
                      <img class="w-6 h-6 rounded-full" src="@/assets/images/headphones.png" />
                    </div>
                    <span>Headphone</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <span>22-10-2022</span>
                </td>
                <td class="py-3 px-6 text-center">
                  <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">Claimed</span>
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <div class="mr-2">
                      <img class="w-6 h-6 rounded-full" src="@/assets/images/headphones.png" />
                    </div>
                    <span>Headphone</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <span>22-10-2022</span>
                </td>
                <td class="py-3 px-6 text-center">
                  <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Unclaimed</span>
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-between items-center px-4 my-4 work-sans">
            <p class="text-sm leading-5 text-accent-100">
              Showing
              <span class="font-medium">1</span>
              to
              <span class="font-medium">200</span>
              of
              <span class="font-medium">2000</span>
              results
            </p>
            <div>
              <nav class="relative z-0 inline-flex items-center shadow-sm">
                <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </a>
                <div>
                  <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                  1
                  </a>
                  <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                  2
                  </a>
                  <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                  3
                  </a>
                  <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                  4
                  </a>
                </div>
                <div>
                  <a href="#" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lostItems: [],
      isLoading: false
    };
  },
  methods: {
    addNewItem() {
      this.$router.push({ name: "item-details" });
    },
    viewItem(item) {
      this.$store.commit("item/SET_ITEM_DETAILS", {
        ...item,
        onlyDisplay: true,
      });
      this.$nextTick(() => {
        this.$router.push({ path: "/detail-confirmation" });
      });
    },
  },
  created() {
    this.isLoading = true
    this.$axios
      .get("/getalllostitem")
      .then((response) => {
        if (response.status === 200) {
          this.isLoading = false
          this.lostItems = response?.data?.data;
        }
      })
      .catch((err) => {
        this.isLoading = false
        console.log(err);
      });
  },
};
</script>

<style scoped>
.wrapper {
  @apply flex flex-col justify-start pt-0 items-center text-center mx-auto;
}

.loader-container {
  height: calc(100vh - theme('spacing.52'));
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