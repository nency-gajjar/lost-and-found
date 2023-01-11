<template>
  <div class="min-h-screen" v-if="!loading">
    <NavBar />
    <Nuxt class="pb-8" />
    <Footer />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true
  }),
  created() {
    this.$nextTick(function() {
      this.loading = false
    })
  }
}
</script>

<style>
html {
  @apply bg-gray-100;
}

@media print {
  .min-h-screen {
    min-height: max-content !important;
  }
}
</style>