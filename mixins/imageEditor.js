export default {
  data() {
    return {
      imgSrc: "",
      showCrop: false,
      showDraw: false,
      imgPreview: false,
      showUndo: false,
      image: "",
      imageKey: "",
      isSavingImage: false,
      showEditor: false,
    };
  },
  methods: {
    undo() {
      this.$refs.redacter.revert();
    },
    addSquare() {
      this.imgPreview = false;
      this.showDraw = true;
      this.showCrop = false;
    },
    crop() {
      this.imgPreview = false;
      this.showCrop = true;
      this.showDraw = false;
    },
    toggleUndo(length) {
      if (length > 0) {
        this.showUndo = true;
      } else {
        this.showUndo = false;
      }
    },
    applyEdit() {
      if (this.showDraw) {
        this.imgSrc = this.$refs.redacter.canvas().toDataURL();
      } else {
        this.imgSrc = this.$refs.cropper.getCroppedCanvas().toDataURL();
      }
      this.showCrop = false;
      this.showDraw = false;
      this.imgPreview = true;
    },
    async editImage() {
      this.isLoadingEditImage = true;
      this.showEditor = false;
      if (this.image) {
        const data = await fetch(this.image, { cache: "no-cache" });
        const blob = await data.blob();
        this.imgSrc = await this.process_image(blob);
        this.showEditor = true;
        this.isLoadingEditImage = false;
      } else {
        this.showEditor = false;
        this.isLoadingEditImage = false;
      }
    },
    async process_image(file, min_image_size = 300) {
      const res = await this.image_to_base64(file);
      if (res) {
        const old_size = this.calc_image_size(res);
        if (old_size > min_image_size) {
          const resized = await this.reduce_image_file_size(res);
          const new_size = this.calc_image_size(resized);
          return resized;
        } else {
          return res;
        }
      } else {
        return null;
      }
    },
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
    calc_image_size(image) {
      let y = 1;
      if (image.endsWith("==")) {
        y = 2;
      }
      const x_size = image.length * (3 / 4) - y;
      return Math.round(x_size / 1024);
    },
    async reduce_image_file_size(base64Str, MAX_WIDTH = 450, MAX_HEIGHT = 450) {
      let resized_base64 = await new Promise((resolve) => {
        let img = new Image();
        img.src = base64Str;
        img.onload = () => {
          let canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL()); // this will return base64 image results after resize
        };
      });
      return resized_base64;
    },
    closeEditor() {
      this.showEditor = false;
      this.imgSrc = "";
      this.showCrop = false;
      this.showDraw = false;
      this.imgPreview = false;
    },
  }
};
