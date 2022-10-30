<template>
  <div
    wire:loading
    class="
      h-screen
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
</template>

<script>
export default {};
</script>

<style>
</style>