<template>
  <div
    class="
      transition
      ease-in-out
      delay-150
      hover:-translate-y-1
      hover:scale-[1]
      hover:border-gray-400
      duration-300
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
        class="w-20 min-w-[80px] h-16 mx-auto sm:mx-0 flex items-center mb-3 sm:mb-0"
      >
        <img
          v-if="showImage"
          class="h-16 w-20 contain rounded-lg"
          :src="item.image"
          alt=""
        />
        <img
          v-else
          class="h-16 w-20 contain rounded-lg"
          src="@/assets/images/no-image4.png"
          alt=""
        />
      </div>
      <div class="flex flex-col text-center justify-between leading-normal">
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
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: {} },
  },
  computed: {
    showImage() {
      return this.item.image && this.item.is_default !== 'Approve without Image'
    }
  }
}
</script>