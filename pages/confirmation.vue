<template>
  <div class="wrapper" v-if="Object.keys(itemDetails).length > 0">
    <div
      class="
        card
        w-full
        mx-6
        lg:mx-0
        md:w-8/12
        lg:w-7/12
        xl:w-6/12
        overflow-hidden
        bg-white
        border border-[#E1E3E6]
        rounded-lg
      "
      style="box-shadow: rgba(54, 28, 93, 0.04) -10px 18px 32px"
    >
      <section id="printMe" class="bg-white">
        <div class="main-title bg-accent-100 text-white mb-3">
          <h1
            class="
              w-full
              py-3
              text-2xl
              font-bold
              leading-tight
              text-center text-white
            "
          >
            DETAIL CONFIRMATION
          </h1>
        </div>
        <div class="h-48 w-48 m-auto">
          <img
            v-if="itemDetails.link"
            class="w-full"
            :src="itemDetails.link"
            alt=""
          />
        </div>
        <div class="sections py-4 px-6">
          <div class="form-title">
            <h2
              class="
                text-lg text-accent-100
                font-medium
                leading-tight
                text-left text-gray-800
              "
            >
              Sender's Details:
            </h2>

            <span
              class="
                w-20
                border-t-4 border-solid border-gray-300
                inline-block
                mb-1
              "
            ></span>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Sender Affiliation
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.venu_type }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Found Item Date
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.date }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Venue Email
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.venue_email }}
            </div>
          </div>
          <div
            v-if="itemDetails.secondary_email"
            class="flex items-center mt-3 flex-wrap"
          >
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Venue Secondary Email
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.secondary_email }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Venue Phone No.
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.venue_phone_no }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Employee Mobile No.
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.employee_mobile_no }}
            </div>
          </div>
        </div>

        <div data-v-272705a6="" class="flex items-center my-2">
          <div
            class="
              h-6
              w-6
              box-content
              border-r border-[#E1E3E6]
              rounded-r-full
              relative
              right-3.5
              bg-primary-60
            "
          ></div>
          <hr class="flex-grow border-dashed border border-[#E1E3E6]" />
          <div
            class="
              h-6
              w-6
              box-border
              border-l border-[#E1E3E6]
              rounded-l-full
              relative
              left-3.5
              bg-primary-60
            "
          ></div>
        </div>

        <div class="sections px-6 py-4">
          <div class="form-title">
            <h2
              class="
                text-lg text-accent-100
                font-medium
                leading-tight
                text-left text-gray-800
              "
            >
              Address Details:
            </h2>
            <span
              class="
                w-20
                border-t-4 border-solid border-gray-300
                inline-block
                mb-1
              "
            ></span>
          </div>

          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Address
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              <!-- {{ filterAddressLine(itemDetails) }} -->
              {{ itemDetails.address }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              City
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.city }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              State
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.state }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Country
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.country }}
            </div>
          </div>
          <div class="flex items-center mt-3 flex-wrap">
            <div
              class="
                text-left text-gray-600
                font-medium
                w-full
                lg:w-4/12
                md:w-5/12
                sm:w-6/12
              "
            >
              Zipcode
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.zipcode }}
            </div>
          </div>
        </div>

        <div data-v-272705a6="" class="flex items-center my-2">
          <div
            class="
              h-6
              w-6
              box-content
              border-r border-[#E1E3E6]
              rounded-r-full
              relative
              right-3.5
              bg-primary-60
            "
          ></div>
          <hr class="flex-grow border-dashed border border-[#E1E3E6]" />
          <div
            class="
              h-6
              w-6
              box-border
              border-l border-[#E1E3E6]
              rounded-l-full
              relative
              left-3.5
              bg-primary-60
            "
          ></div>
        </div>
        <div class="sections px-6 py-4">
          <div class="form-title">
            <h2
              class="
                text-lg text-accent-100
                font-medium
                leading-tight
                text-left text-gray-800
              "
            >
              Found Item's Details:
            </h2>
            <span
              class="
                w-20
                border-t-4 border-solid border-gray-300
                inline-block
                mb-1
              "
            ></span>
          </div>

          <div class="flex foundItemContainer flex-col">
            <div class="flex flex-col w-full">
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Item Description
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.item_description }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Package Type
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.package_type }}
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Weight
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.weight_pounds }} lbs
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Dimension
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  {{ itemDetails.item_length }}(l) x
                  {{ itemDetails.item_width }}(w) x
                  {{ itemDetails.item_height }}(h) inches
                </div>
              </div>
              <div class="flex items-center mt-3 flex-wrap">
                <div
                  class="
                    text-left text-gray-600
                    font-medium
                    w-full
                    lg:w-4/12
                    md:w-5/12
                    sm:w-6/12
                  "
                >
                  Item Status
                </div>
                <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                  <!-- {{ itemDetails.item_status === 0 ? "Claimed" : "Unclaimed" }} -->
                  {{ itemDetails.item_status }}
                </div>
              </div>
              <template v-if="itemDetails.item_status === 'claimed'">
                <div class="flex items-center mt-3 flex-wrap">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-full
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Receiver's Name
                  </div>
                  <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                    {{ itemDetails.receiver_name }}
                  </div>
                </div>

                <div class="flex items-center mt-3 flex-wrap">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-full
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Receiver's Email
                  </div>
                  <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                    {{ itemDetails.receiver_email }}
                  </div>
                </div>

                <div class="flex items-center mt-3 flex-wrap">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-full
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Receiver's Mobile No.
                  </div>
                  <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                    {{ itemDetails.receiver_mobile_no }}
                  </div>
                </div>
              </template>
            </div>

            <div class="h-auto w-52 mt-5 mx-auto">
              <img
                v-if="itemDetails.image"
                class="w-full"
                :src="itemDetails.image"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <div class="flex flex-wrap gap-2 m-5">
        <button
          type="button"
          class="
            !py-3
            flex-auto
            font-medium
            text-md
            leading-5
            uppercase
            py-2
            px-8
            rounded-md
            button
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-primary-60
            transition-all
            font-display
            disabled:cursor-not-allowed
            bg-accent-100
            text-white
            focus:ring-accent-100
            shadow-accent
            hover:bg-accent-200
          "
          @click="printDetails"
        >
          <span class="button__text"> Print Details </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import jsPDF from 'jspdf'
export default {
  data() {
    return {
      itemDetails: {},
    };
  },
  computed: {
    ...mapGetters("item", ["itemConfirmationDetails"]),
  },
  created() {
    if (Object.keys(this.itemConfirmationDetails).length > 0) {
      this.itemDetails = this.itemConfirmationDetails;
    } else {
      this.$axios
        .get("/getsinglelostitem?id=" + this.$route.query.id)
        .then((response) => {
          if (response.status === 200) {
            this.itemDetails = response.data.data.Item;
          }
        })
        .catch((error) => console.log(error));
    }
  },
  methods: {
    printDetails() {
      let userAgent = navigator.userAgent.toLowerCase();
      console.log(userAgent);
      let mobile = userAgent.indexOf("mobile") > -1;
      let android = userAgent.indexOf("android") > -1;
                  
      if(mobile || android) {
        console.log("phone");
        var doc = new jsPDF('p', 'pt', 'a4');
        doc.html(document.getElementById("printMe"), {
                callback: function () {
                    doc.save("item-details.pdf");
                }
            });
      }
      else{
        const mywindow = window.open("", "PRINT", "height=1200,width=600");

        mywindow.document.write("<html><head>");
        // mywindow.document.write(
        //   '<link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />'
        // );
        // mywindow.document.write("<script src='https://cdn.tailwindcss.com'><script>");
        mywindow.document.write("</head><body>");
        // mywindow.document.write("<h1>" + document.title + "</h1>");
        mywindow.document.write(document.getElementById("printMe").innerHTML);
        mywindow.document.write("</body></html>");
        mywindow.print();
        mywindow.close();
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.wrapper {
  // @apply min-h-screen flex justify-center py-10 mx-auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  min-height: 100vh;
  justify-content: center;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}

.card {
  @apply rounded-lg text-indigo-500;

  .title {
    @apply text-6xl font-bold;
  }
}

// .text-gray-600 {
//   @apply sm: px-3;
// }

.button {
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
}

.button__text {
  color: #ffffff;
  transition: all 0.2s;
}

.button--loading .button__text {
  visibility: hidden;
  opacity: 0;
}

.button--loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}

@media only screen and (max-width: 650px) {
  .foundItemContainer {
    @apply flex-col;
  }

  .img-container {
    @apply mt-3;
  }

  .text-gray-600 {
    @apply pr-2;
  }
}
</style>