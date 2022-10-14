<template>
  <div class="wrapper">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="w-full flex justify-end mt-10">
        <button
          class="
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
          "
          @click="addNewItem"
        >
          + Add New Item
        </button>
      </div>
      <div v-if="!isLoading && lostItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in lostItems"
          :key="item.id"
          @click="viewItem(item)"
          class="
            cursor-pointer
            mt-8
            py-4
            px-5
            flex flex-col
            bg-white
            rounded-lg
            border
            shadow-md
            relative
          "
        >
          <div class="w-24 h-24 mx-auto">
            <img
              class="
                w-full
                rounded-t-lg
                md:h-auto md:w-48 md:rounded-none md:rounded-l-lg
              "
              src="@/assets/images/headphones.png"
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
            <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit.
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div v-else>
        <div wire:loading class="loader-container z-50 overflow-hidden flex flex-col items-center justify-center">
	        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
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
    console.log('=====Test');
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
  @apply flex flex-col items-center text-center mx-auto;
}

.loader-container {
  height: calc(100vh - theme('spacing.52'));
}

.loader {
	border-top-color:orange;
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