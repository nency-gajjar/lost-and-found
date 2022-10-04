<template>
  <div class="wrapper">
    <div class="h-fit w-full min-h-full flex justify-end mt-28">
      <button
        class="
          addButton
          float-right
          mr-56
          bg-indigo-400
          hover:bg-indigo-600
          text-white text-sm
          font-bold
          rounded
          px-2
          py-1
        "
        @click="addNewItem"
      >
        + Add New Item
      </button>
    </div>
    <div
      class="
        cursor-pointer
        mt-8
        p-5
        flex flex-col
        items-center
        bg-white
        rounded-lg
        border
        shadow-md
        md:flex-row
        hover:bg-gray-100
        dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
      "
    >
      <div class="w-24 h-24">
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
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="
            mb-2
            text-2xl
            font-bold
            tracking-tight
            text-gray-900
            dark:text-white
          "
        >
          {{ itemDescription }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit.
        </p>
      </div>
      <div>
        <a
          class="text-indigo-600 hover:text-indigo-900 mr-3 py-2 inline-flex"
          @click="editDetails"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </a>
        <a
          class="
            text-gray-600
            hover:text-gray-900
            mr-3
            py-2
            inline-flex
            items-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </a>
        <a class="mr-3 py-2 inline-flex items-center"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-red-600 hover:text-red-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            /></svg
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    editDetails() {
      if(this.$route.query.id){
        this.$router.push({ path: "/edit/item-details", query: { id: this.$route.query.id } });
      }
      else{
        this.$router.push({ path: "/new/item-details"});
      }
    },
    addNewItem() {
      this.$router.push({ path: "/new/item-details" });
    },
  },
  computed: {
    itemDescription(){
      return this.$route.query.itemDescription || "Lorem ipsum dolor sit amet";
    }
  }
};
</script>

<style scoped>
.wrapper {
  @apply min-h-screen flex flex-col items-center text-center mx-auto;
}

@media only screen and (max-width: 950px) {
  .addButton{
    @apply mr-36;
  }
}

@media only screen and (max-width: 750px) {
  .addButton{
    @apply mr-28;
  }
}

@media only screen and (max-width: 550px) {
  .addButton{
    @apply mr-14;
  }
}

@media only screen and (max-width: 450px) {
  .addButton{
    @apply mr-11;
  }
}
</style>