<template>
  <div class="h-screen"></div>
</template>

<script>
export default {
  mounted() {
    if (this.$route.query.id) {
      this.$axios
        .get("/getsinglelostitem?id=" + this.$route.query.id)
        .then(async (response) => {
          let labelUrl = response.data.data.Item.label_url;
          const data = await fetch(labelUrl, { cache: "no-cache" });
          const blob = await data.blob();
          let labelImgBase64 = await this.image_to_base64(blob);
          let a = document.createElement("a"); //Create <a>
          a.href = labelImgBase64; 
          a.download = "Label.png"; //File name Here
          a.click(); //Downloaded file
          this.$nextTick(() => {
            this.$router.push({
              name: "lost-items"
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    async image_to_base64(file) {
      let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.onerror = (error) => {
          console.log(error);
          this.$toast.error(
            "An Error occurred please try again, File might be corrupt"
          );
        };
        fileReader.readAsDataURL(file);
      });
      return result_base64;
    },
  },
};
</script>

<style scoped>
</style>