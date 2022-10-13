<template>
    <div class="wrapper" v-if="Object.keys(responseData).length > 0">
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
        <section class="bg-white">
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
              PREVIEW DETAILS
            </h1>
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
                {{ responseData.venu_type }}
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
                {{ responseData.datse }}
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
                Venue Name
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
                {{ responseData.venue_name }}
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
                {{ responseData.venue_email }}
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
                {{ responseData.venue_phone_no }}
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
                {{ responseData.employee_mobile_no }}
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
                {{ responseData.address }}
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
                {{ responseData.city }}
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
                {{ responseData.states }}
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
                {{ responseData.country }}
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
                {{ responseData.zipcode }}
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
                    {{ responseData.item_description }}
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
                    {{ responseData.package_type }}
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
                    {{ responseData.weight }}
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
                    {{ responseData.dimensions }}
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
                    {{ responseData.item_status === 0 ? "Claimed" : "Unclaimed" }}
                  </div>
                </div>
                <template v-if="!responseData.item_status">
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
                      {{ responseData.receiver_name }}
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
                      {{ responseData.receiver_email }}
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
                      {{ responseData.receiver_mobile_no }}
                    </div>
                  </div>
                </template>
              </div>
  
              <div v-if="responseData.image" class="text-gray-600 mt-4 text-left w-full">
                <img
                  class="w-full"
                    :src="responseData.image"  alt=""
                  />
              </div>
            </div>
          </div>
        

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div
          class="
            cursor-pointer
            mt-8
            py-4
            px-5
            flex flex-col
            bg-white
            rounded-lg
            relative
          "
        >   <button
              :class="{ 'button--loading': isLoading['approve'] }"
                type="submit"
                class="
                  !py-3
                  font-medium
                  text-md
                  leading-5
                  uppercase
                  py-2
                  px-12
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
                @click="action('approve')"
              >
                <span class="button__text"> Approve </span>
              </button></div>
              <div
          class="
            cursor-pointer
            mt-8
            py-4
            px-5
            flex flex-col
            bg-white
            rounded-lg
            relative
          "
        >   <button
              :class="{ 'button--loading': isLoading['deny'] }"
                type="submit"
                class="
                  !py-3
                  font-medium
                  text-md
                  leading-5
                  uppercase
                  py-2
                  px-12
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
                @click="action('deny')"
              >
                <span class="button__text"> Deny </span>
              </button></div>
              <div
          class="
            cursor-pointer
            mt-8
            py-4
            px-5
            flex flex-col
            bg-white
            rounded-lg
            
            
            relative
          "
        >   <button
              :class="{ 'button--loading': isLoading['approve-without-image'] }"
                type="submit"
                class="
                  !py-3
                  font-medium
                  text-md
                  leading-5
                  uppercase
                  py-2
                  px-12
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
                "    @click="action('approve-without-image')"
              >
                <span class="button__text"> Approve without Image </span>
              </button></div>
        
        </div>

          <div class="text-left sm:w-12/12 px-6 pb-6 pt-4">
          
  
            <div
              class="
                flex
                items-center
                my-4
                before:flex-1 before:border-t before:border-gray-300 before:mt-0.5
                after:flex-1 after:border-t after:border-gray-300 after:mt-0.5
              "
            >
              <p class="text-center text-gray-400 font-medium mx-4 mb-0">OR</p>
            </div>
            <button
              type="submit"
              class="
                inline-block
                px-7
                py-3
                bg-gray
                hover:shadow-lg hover:bg-gray-100
                text-gray-600 text-sm
                leading-snug
                uppercase
                rounded-md
                font-medium
                transition
                duration-150
                ease-in-out
                w-full
                border border-gray-300
              "
              @click="editDetails()"
            >
              Edit
            </button>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: {
            'approve': false,
            'deny': false,
            'approve-without-image': false
        },
        isLoadingItemDetails: false,
        foundItemId: '',
        responseData: {}
      }
    },
    mounted () {
        if (this.$route.query.id) {
            this.isLoadingItemDetails = true
            this.foundItemId = this.$route.query.id;
            this.$axios
                .get("/getsinglelostitem?id=" + this.$route.query.id)
                .then((response) => {
                if (response.status === 200) {
                    this.isLoadingItemDetails = false
                    this.responseData = response.data.data.Item;
                }
                })
                .catch((error) => console.log(error));
        }
    },
    methods: {
        action (type) {
            console.log('===action', type);
            this.isLoading[type] = true
        },
      submitDetails() {
        let params = { ...this.itemDetails };
        delete params.foundItemId;
        if (this.itemDetails.foundItemId) {
          this.$axios
            .post(
              "/updatesinglelostitem?id=" + this.itemDetails.foundItemId,
              params,
              {
                responseType: "arraybuffer",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/pdf",
                },
              }
            )
            .then((response) => {
              if (response.status === 200) {
                console.log(response);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "file.pdf");
                document.body.appendChild(link);
                link.click();
              }
            })
            .catch((error) => console.log(error));
        } else {
          this.isLoading = true
          this.$axios
            .post("/storelostitem", params, {
              responseType: "arraybuffer",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/pdf",
              },
            })
            .then((response) => {
              if (response.status === 200) {
                this.isLoading = false
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "file.pdf");
                document.body.appendChild(link);
                link.click();
  
                this.$root.$emit("detail-submitted", true);
              }
              this.$nextTick(() => {
                this.$router.push({ path: "/detail-confirmation" });
              });
            })
            .catch((error) => {
              this.isLoading = false
              console.log(error)
            });
        }
      },
      editDetails() {
        this.$nextTick(() => {
          this.$router.push({
            name: "item-details",
            params: { itemDetails: this.responseData, isAdmin: true },
          });
        });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .wrapper {
    @apply min-h-screen flex justify-center py-10 mx-auto;
  }
  .card {
    @apply rounded-lg text-indigo-500;
    .title {
      @apply text-6xl font-bold;
    }
  }
  .text-gray-600 {
    @apply sm:px-3;
  }
  
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