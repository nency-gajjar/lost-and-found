<template>
  <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
    <div
      class="
        text-left text-gray-600
        font-medium
        w-250-px
        lg:w-4/12
        md:w-5/12
        sm:w-6/12
      "
    >
      {{ title }}
    </div>
    <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    value: { type: String, default: "" },
  },
};
</script>

<style scoped>
.w-250-px {
  width: 200px;
}
</style>