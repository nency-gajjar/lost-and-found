<template>
  <div class="fixed z-50 top-0 w-full left-0" id="modal">
    <div
      class="
        flex
        items-center
        justify-center
        min-height-100vh
        pt-4
        px-4
        pb-20
        text-center
        sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-900 opacity-75" />
      </div>
      <div
        class="
          inline-block
          align-middle
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-screen-md sm:w-full
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>