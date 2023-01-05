<template>
  <div class="h-screen flex justify-center items-center"></div>
</template>

<script>
export default {
  mounted() {
    if (this.$route.query.id) {
      this.$nextTick(() => {
        this.$router.push(this.localeLocation({
          name: "success",
          query: { id: this.$route.query.id, download: true},
        }));
      });
    }
  },
};
</script>