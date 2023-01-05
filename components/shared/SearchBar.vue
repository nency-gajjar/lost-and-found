<template>
  <div class="w-full flex gap-3 flex-auto mt-3 sm:mt-0">
    <div class="w-full flex justify-end items-center pt-5 relative">
      <input
        :value="value"
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
        @input="$emit('input', $event.target.value)"
      />
      <BaseIcon
        v-if="!value"
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
        @click="$emit('input', '')"
      />
    </div>
</div>
</template>

<script>
export default {
  props: {
    value: {
      default: null, 
      required: true 
    },
  },
}
</script>

<style>

</style>