<template>
  <div
    wire:loading
    class="
      z-50
      overflow-hidden
      flex flex-col
      items-center
      justify-center
    "
    :class="{ 'h-screen': needFullScreen }"
  >
    <div
      class="loader ease-linear rounded-full border-gray-200 h-14 w-14 mb-4"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    needFullScreen: { type: Boolean, default: true },
  },
};
</script>

<style scoped>
.loader {
  border-top-color: #970584ba;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
  border-width: 6px;
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