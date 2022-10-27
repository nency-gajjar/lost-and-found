<template>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="w-full flex justify-between mt-8 mb-5">
        <h2 class="text-2xl font-semibold leading-tight">
          Found Items ({{ lostItems.length }})
        </h2>
        <button
          class="
            !py-3
            font-medium
            text-md
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
          "
          @click="addNewItem"
        >
          + Add New Item
        </button>
      </div>
      <div class="align-middle inline-block w-full">
        <div class="flex justify-between flex-wrap items-center">
          <div class="inline-flex border w-3/5 rounded px-3 h-12 bg-white">
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
          <div class="h-full w-60 pt-2">
            <select
              id="countries"
              class="
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
              "
            >
              <option selected>Sort By</option>
              <option value="US">Claimed</option>
              <option value="CA">Unclaimed</option>
            </select>
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
            py-4
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
            class="flex items-center sm:justify-left justify-around sm:gap-4"
          >
            <div class="w-24 h-24 flex items-center">
              <img
                v-if="item.image"
                class="
                  w-full
                  rounded-t-lg
                  md:h-auto md:w-48 md:rounded-none md:rounded-l-lg
                "
                :src="item.image"
                alt=""
              />
              <img
                v-else
                class="
                  w-full
                  rounded-t-lg
                  md:h-auto md:w-48 md:rounded-none md:rounded-l-lg
                "
                src="@/assets/images/no-image.png"
                alt=""
              />
            </div>
            <div
              class="
                flex flex-col
                items-center
                text-center
                justify-between
                py-4
                leading-normal
              "
            >
              <h5
                class="
                  mb-2
                  text-xl
                  font-bold
                  tracking-tight
                  text-gray-900 text-accent-100
                "
              >
                {{ item.item_description }}
              </h5>
              <p class="text-sm font-normal text-gray-700">
                {{ item.item_status === 0 ? "Claimed" : "Unclaimed" }}
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <button
              class="
                font-medium
                text-sm
                px-5
                py-2
                rounded-md
                border-accent-100 border
                text-accent-100
                transition
                duration-300
                hover:bg-accent-200 hover:text-white
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
        <div
          wire:loading
          class="
            loader-container
            z-50
            overflow-hidden
            flex flex-col
            items-center
            justify-center
          "
        >
          <div
            class="
              loader
              ease-linear
              rounded-full
              border-4 border-t-4 border-gray-200
              h-12
              w-12
              mb-4
            "
          ></div>
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
      isLoading: false,
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
    claimItem(item) {
      this.$router.push({ name: "claim-item", params: { item: item } });
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
        }
      })
      .catch((err) => {
        this.isLoading = false;
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