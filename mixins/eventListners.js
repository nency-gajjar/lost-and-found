export default {
    methods: {
        callEventListners(){
            window.addEventListener("keydown", () => {
                this.showValidateAlert = false;
            });
            window.addEventListener("click", () => {
                this.showValidateAlert = false;
            });
        }
    },
    beforeDestroy() {
      window.removeEventListener("click", () => {});
      window.removeEventListener("keydown", () => {});
    },
}
  