<template>
  <div class="h-screen flex justify-center items-center">
    <BaseButton @click="printLabel"> Print/Download Label </BaseButton>
  </div>
</template>

<script>
export default {
  data(){
    return {
      itemDetails: {},
      itemImg: "",
      labelImg: "",
      labelWidth: 360,
      rotateCss: ""
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.$axios
        .get("/getsinglelostitem?id=" + this.$route.query.id)
        .then(async (response) => {
          this.itemDetails = response.data.data.Item;
          this.getImgData(this.itemDetails.label_url)
            .then(img => {
              if(img.naturalWidth < img.naturalHeight){
                this.rotateCss = `
                  -webkit-transform:rotate(270deg);  
                  -moz-transform: rotate(270deg);  
                  -ms-transform: rotate(270deg);  
                  -o-transform: rotate(270deg);  
                  transform: rotate(270deg);`;
              }
            });
          if(this.itemDetails.service_provider === "UPS"){
            this.labelWidth = 309;
          }
          else if(this.itemDetails.service_provider === "DHLExpress"){
            this.labelWidth = 180;
          }
          if (this.itemDetails.image) {
            const data = await fetch(this.itemDetails.image, { cache: "no-cache" });
            const blob = await data.blob();
            this.itemImg = await this.image_to_base64(blob);
          }

          if (this.itemDetails.label_url) {
            const data = await fetch(this.itemDetails.label_url, { cache: "no-cache" });
            const blob = await data.blob();
            this.labelImg = await this.image_to_base64(blob);
          }
          this.printLabel();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    async getImgData(url){
      const img = new Image();
      img.src = url;
      await img.decode();  
      return img;
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
    printLabel() {
      let imgHtml = "";
      if (this.itemDetails.image) {
        imgHtml =
          "<div class='flex justify-around w-100-px'> <img src='http://34.197.126.8/_nuxt/assets/images/found-shelf-icon.svg' /> <img src=" +
          this.itemImg +
          "></div>";
      }
      else {
        imgHtml =
          "<div class='itemImgContainer'><img src='http://34.197.126.8/_nuxt/assets/images/found-shelf-icon.svg' /></div>";
      }
      let htmlToPrint = `
      <html><head>
      <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'>
      <style>
          body {
            font-family: 'Rubik';
          }
          .border-dashed {
            border-top-style: dashed;
          }
          .w-full {
            width: 100% !important;
          }
          .border {
            border-width: 2px;
          }
          .border-accent {
            border-top-color: #000000;
          }
          .flex {
            display: flex;
          }
          .justify-center {
            justify-content: center;
          }
          .justify-between {
            justify-content: space-between;
          }
          .justify-around {
            justify-content: space-around;
          }
          .labelContainer, .itemImgContainer{
            display: flex;
            justify-content: center;
            margin-top: 10px;
          }
          .text-accent-100 {
            color: #970584ba;
          }
          .text-gray-600 {
            color: rgb(82 82 82);
          }
          .labelContainer {
            width: 100%;
          }
          .labelContainer img{
            width: ${this.labelWidth}px;
            ${this.rotateCss}
          }
          .itemImgContainer img{
            width: 100px;
          }
          .w-100-px img{
            width: 100px;
          }
          .text-center{
            text-align: center;
          }
          .font-bold{
            font-weight: bold;
          }
          .w-20 {
            width: 3rem;
          }
          .border-t-4 {
            border-top-width: 4px;
          }
          .border-solid {
            border-style: solid;
          }
          .border-gray-300 {
            border-color: rgb(212 212 212);
          }
          .inline-block {
            display: inline-block;
          }
          table tr td {
            padding: 10px 20px;
          }
          p {
            margin: 5px 0;
          }
        </style>
        </head><body>
        ${imgHtml}
        <table>
          <tr>
            <td>
              <p class='text-accent-100 font-bold'>Sender's Details: </p>
              <p>Sender Affiliation: ${this.itemDetails.venu_type}</p>
              <p>Email: ${this.itemDetails.venue_email}</p>
              <p>Mobile number: ${this.itemDetails.venue_phone_no}</p>
            </td>
            <td>
              <p class='text-accent-100 font-bold'>Receiver's Details: </p>
              <p>Name: ${this.itemDetails.receiver_name}</p>
              <p>Email: ${this.itemDetails.receiver_email}</p>
              <p>Mobile number: ${this.itemDetails.receiver_mobile_no}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p class='text-accent-100 font-bold'>Package Details: </p>
              <p>Item Description: ${this.itemDetails.item_description}</p>
              <p>Weight: ${this.itemDetails.weight_pounds} LBS</p>
              <p>Dimension: ${this.itemDetails.item_length}(l) x ${
        this.itemDetails.item_width
      }(w) x ${this.itemDetails.item_height}(h) </p>
            </td>
            <td>
              <p class='text-accent-100 font-bold'>Shipping Details: </p>
              <p>Amount: $ ${this.itemDetails.total_amount / 100}</p>
              <p>Service: ${this.itemDetails.service_name}</p>
              <p>Service provider: ${this.itemDetails.service_provider}</p>
            </td>
          </tr>
          </table>
          <div class="flex justify-center"><p>Tracking ID: ${this.itemDetails.tracking_id}</p></div>
          <div class="flex">
            <div style="width: 20px">
              <svg style="color: rgb(240, 107, 4);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="60" cy="76" r="28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle><circle cx="60" cy="180" r="28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle><line x1="136" y1="128" x2="83.1" y2="164.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><line x1="232" y1="62.3" x2="164.3" y2="108.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><line x1="232" y1="193.7" x2="83.1" y2="91.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line></svg>
            </div>
            <hr class="w-full border-dashed border border-accent" />
          </div>
          <div class='labelContainer'><img src=${this.labelImg}></div>
          </body></html>
      `;
      let userAgent = navigator.userAgent.toLowerCase();
      let mobile = userAgent.indexOf("mobile") > -1;
      let android = userAgent.indexOf("android") > -1;

      let htmlElement = document.createElement("html");
      htmlElement.innerHTML = htmlToPrint;

      if (mobile || android) {
        this.$html2pdf(htmlElement, {
          filename: "label.pdf",
          image: { type: "jpg", quality: 0.98 },
          html2canvas: {
            dpi: 300,
            scale: 1,
            letterRendering: true,
            useCORS: true,
          },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        });
      } else {
        const mywindow = window.open("", "PRINT", "height=1200,width=600");
        mywindow.document.write(htmlToPrint);
        setTimeout(() => {
          mywindow.print();
          setTimeout(mywindow.close, 0);
        }, 3000);
      }
    },
  },
};
</script>