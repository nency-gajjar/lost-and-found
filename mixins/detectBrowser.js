export default {
  data() {
    return {
      mobileDevice: false,
    };
  },
  mounted() {
    this.mobileDevice = this.isMobile();
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  }
};
