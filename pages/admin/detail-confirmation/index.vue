<template>
  <div class="wrapper-admin" v-if="Object.keys(itemDetails).length > 0">
    <div v-show="showEditor" class="fixed z-50 top-0 w-full left-0" id="modal">
      <div
        class="
          flex
          items-center
          justify-center
          min-height-100vh
          pt-4
          px-4
          pb-20
          text-center
          sm:p-0
        "
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <div
          class="
            inline-block
            align-middle
            bg-white
            rounded-lg
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8 sm:align-middle sm:max-w-screen-md sm:w-full
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="relative">
            <div class="title bg-accent-100 pl-6 py-4 mb-4">
              <h3 class="text-white">Upload Image</h3>
            </div>
            <span
              @click="closeEditor"
              class="absolute right-5 top-5 inline-block z-10 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-x"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          </div>
          <div
            class="
              w-full
              max-w-screen-md
              relative
              mx-auto
              my-auto
              rounded-xl
              shadow-lg
              bg-white
              flex
              justify-center
              items-center
              editor-container
            "
          >
            <div class="w-full">
              <div class="px-6 flex justify-center">
                <img
                  class="previewImage"
                  v-show="!showCrop & !showDraw || imgPreview"
                  :src="imgSrc"
                />
                <div
                  v-if="showCrop && !imgPreview"
                  class="vue-cropper-container"
                >
                  <VueCropper
                    ref="cropper"
                    :src="imgSrc"
                    :responsive="true"
                    :min-container-width="250"
                    :min-container-height="300"
                    :scalable="true"
                    drag-mode="none"
                    :movable="false"
                    :zoomable="false"
                    :zoomOnTouch="false"
                    :zoomOnWheel="false"
                    alt="Source Image"
                  ></VueCropper>
                </div>
                <RedactImage
                  v-if="showDraw && !imgPreview"
                  class="redact"
                  ref="redacter"
                  @changeConditonOfUndo="toggleUndo"
                  :src="imgSrc"
                />
              </div>
              <div class="editor-tools mt-5 px-6 border-t pt-4">
                <div class="icons gap-5">
                  <div
                    class="flex flex-col justify-center items-center"
                    v-show="showDraw && showUndo"
                  >
                    <div class="tool-undo">
                      <BaseIcon
                        icon="undo"
                        size="lg"
                        color="lightblack"
                        @click="undo()"
                        style="padding: 10px"
                      />
                    </div>
                    <p>Undo</p>
                  </div>
                  <div class="flex flex-col justify-center items-center">
                    <div class="tool-addSquare">
                      <BaseIcon
                        v-if="!showDraw"
                        icon="square"
                        size="lg"
                        color="lightblack"
                        @click="addSquare()"
                        style="padding: 10px"
                      />
                      <BaseIcon
                        v-else
                        icon="check"
                        size="lg"
                        color="lightblack"
                        @click="applyEdit()"
                        style="padding: 10px"
                      />
                    </div>
                    <p v-if="!showDraw">Blackout</p>
                    <p v-else>Done</p>
                  </div>
                  <div class="flex flex-col justify-center items-center">
                    <div class="tool-crop">
                      <BaseIcon
                        v-if="!showCrop"
                        icon="crop-simple"
                        size="lg"
                        color="lightblack"
                        @click="crop()"
                        style="padding: 10px"
                      />
                      <BaseIcon
                        v-else
                        icon="check"
                        size="lg"
                        color="lightblack"
                        @click="applyEdit()"
                        style="padding: 10px"
                      />
                    </div>
                    <p v-if="!showCrop">Crop</p>
                    <p v-else>Done</p>
                  </div>
                </div>
                <div class="save-upload flex items-center">
                  <BaseButton
                    :is-loading="isSavingImage"
                    @click="saveImg"
                    :disabled="isSavingImage"
                  >
                    Save
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
              {{ itemDetails.datse }}
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
              {{ filterAddressLine(itemDetails) }}
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
              {{ itemDetails.states }}
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

          <div class="flex foundItemContainer">
            <div class="flex flex-col grow">
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
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                >
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
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                >
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
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                >
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
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                >
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
                <div
                  class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                >
                  {{ itemDetails.item_status === 0 ? "Claimed" : "Unclaimed" }}
                </div>
              </div>
              <template v-if="!itemDetails.item_status">
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
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                  >
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
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                  >
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
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 sm:pl-3"
                  >
                    {{ itemDetails.receiver_mobile_no }}
                  </div>
                </div>
              </template>
            </div>

            <div v-if="image" class="mt-4 sm:mt-0 sm:w-60 w-full">
              <img class="w-full" :src="image" alt="" />
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 m-5">
          <BaseButton
            :is-loading="isLoading['Approve']"
            class="flex-1"
            @click="handleItemApprove('Approve')"
            :disabled="isLoading['Approve']"
          >
            Approve
          </BaseButton>
          <BaseButton class="flex-1" @click="showItemRejectDialog = true">
            Reject
          </BaseButton>
          <BaseButton
            :is-loading="isLoading['Approve without Image']"
            class="flex-auto"
            @click="handleItemApprove('Approve without Image')"
            :disabled="isLoading['Approve without Image']"
          >
            Approve without Image
          </BaseButton>
        </div>
        <div v-if="image" class="text-left sm:w-12/12 px-6 pb-6 pt-4">
          <div
            class="
              flex
              items-center
              mb-4
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
            @click="editImage()"
          >
            Edit Image
          </button>
        </div>
      </section>
    </div>
    <BaseDialog
      :showDialog="showDialog"
      :icon="{ name: 'circle-check', color: 'green', size: '3x' }"
      :message="dialogMessage"
      :title="dialogTitle"
      buttonTitle="Okay"
      @close="closeDialog"
    />
    <BaseDialog
      :showDialog="showItemRejectDialog"
      :icon="{ name: 'circle-info', color: 'blue', size: '3x' }"
      :message="dialogMessage"
      title="Please enter Rejection reason"
      :showClose="false"
    >
      <template v-slot:input>
        <ValidationObserver v-slot="{ validate }" ref="observer">
          <form @submit.prevent="validate().then(onSubmit)">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="block"
            >
              <textarea
                v-model="rejectReson"
                placeholder="Reject Reason"
                class="
                  border
                  inline-block
                  border-gray-300
                  w-full
                  rounded-lg
                  px-4
                  h-full
                  text-sm
                  pt-4
                  pb-2
                  transition-shadow
                  text-gray-800
                "
                :class="errors.length > 0 && 'error'"
              ></textarea>

              <p
                v-if="errors.length"
                class="vee-validation-error mt-2 text-sm text-left text-red-600"
              >
                {{ errors[0] }}
              </p>
            </ValidationProvider>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:action>
        <BaseButton
          @click="handleItemReject()"
          :is-loading="isLoading['Deny']"
          type="submit"
          class="w-full"
          :disabled="isLoading['Deny']"
        >
          Submit
        </BaseButton>
      </template>
    </BaseDialog>
  </div>
</template>
  
<script>
import RedactImage from "~/components/redactEditor/RedactImage.vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  middleware({ $auth, redirect }) {
    if (!$auth.loggedIn) {
      return redirect("/login");
    }
  },
  components: {
    RedactImage,
    VueCropper,
  },
  data() {
    return {
      imgSrc: "",
      showCrop: false,
      showDraw: false,
      imgPreview: false,
      showUndo: false,
      size_icon: "2x",
      isLoading: {
        Approve: false,
        Deny: false,
        "Approve without Image": false,
      },
      isLoadingItemDetails: false,
      foundItemId: "",
      responseData: {},
      image: "",
      imageKey: "",
      isSavingImage: false,
      isImageEdited: false,
      showEditor: false,
      loadingSpinner: false,
      imageRecognitionData: [],
      imageKey: "",
      showDialog: false,
      showItemRejectDialog: false,
      dialogTitle: "",
      dialogMessage: "",
      rejectReson: "",
    };
  },
  computed: {
    itemDetails() {
      return this.responseData;
    },
  },
  mounted() {
    if (this.$route.query.id) {
      this.isLoadingItemDetails = true;
      this.foundItemId = this.$route.query.id;
      this.$axios
        .get("/getsinglelostitem?id=" + this.$route.query.id)
        .then((response) => {
          if (response.status === 200) {
            this.isLoadingItemDetails = false;
            this.responseData = response.data.data.Item;
            this.image = this.responseData.image;
          }
        })
        .catch((error) => {
          this.$toast.error("Something went wrong! Please try again.");
          console.log(error);
        });
    } else {
      this.$nextTick(() => {
        this.$router.push({
          name: "found-items",
        });
      });
    }
  },
  methods: {
    undo() {
      this.$refs.redacter.revert();
    },
    toggleUndo(length) {
      if (length > 0) {
        this.showUndo = true;
      } else {
        this.showUndo = false;
      }
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
    calc_image_size(image) {
      let y = 1;
      if (image.endsWith("==")) {
        y = 2;
      }
      const x_size = image.length * (3 / 4) - y;
      return Math.round(x_size / 1024);
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
    async process_image(file, min_image_size = 300) {
      const res = await this.image_to_base64(file);
      if (res) {
        const old_size = this.calc_image_size(res);
        if (old_size > min_image_size) {
          const resized = await this.reduce_image_file_size(res);
          const new_size = this.calc_image_size(resized);
          console.log("new_size=> ", new_size, "KB");
          console.log("old_size=> ", old_size, "KB");
          return resized;
        } else {
          console.log("image already small enough");
          return res;
        }
      } else {
        console.log("return err");
        return null;
      }
    },
    async editImage() {
      this.showEditor = false;
      if (this.image) {
        const data = await fetch(this.image, { cache: "no-cache" });
        const blob = await data.blob();
        this.imgSrc = await this.process_image(blob);
        this.showEditor = true;
      } else {
        this.showEditor = false;
      }
    },
    closeEditor() {
      this.showEditor = false;
      this.imgSrc = "";
      this.showCrop = false;
      this.showDraw = false;
      this.imgPreview = false;
    },
    saveImg() {
      this.isSavingImage = true;
      let file = null;
      if (this.showDraw) {
        file = this.$refs.redacter.canvas().toDataURL();
      } else if (this.showCrop) {
        file = this.$refs.cropper.getCroppedCanvas().toDataURL();
      } else {
        file = this.imgSrc;
      }
      this.$axios
        .post("/demo", { file })
        .then((response) => {
          if (response.status === 200) {
            this.isSavingImage = false;
            this.$toast.info("Image Updated Successfully!");
            this.imageRecognitionData = response.data.data;
            this.image =
              this.imageRecognitionData[
                this.imageRecognitionData.length - 1
              ].image;

            this.imageKey =
              this.imageRecognitionData[
                this.imageRecognitionData.length - 2
              ].key;
          }
          this.showEditor = false;
          this.imgSrc = "";
          this.showCrop = false;
          this.showDraw = false;
          this.imgPreview = false;
          this.isImageEdited = true;
        })
        .catch((error) => {
          this.$toast.error("Something went wrong! Please try again.");
          this.isSavingImage = false;
          console.log(error);
        });
    },
    filterAddressLine(itemDetails) {
      return itemDetails.address == "Other" || !itemDetails.address
        ? itemDetails.manualAddress
        : itemDetails.address;
    },
    async handleItemApprove(type) {
      this.isLoading[type] = true;
      let params = {};
      if (this.itemDetails.image && type === "Approve" && this.isImageEdited) {
        params.image = this.image;
      }
      params.is_default = type;
      await this.handleUpdateLostItem(params, type);
    },
    async handleItemReject() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.isLoading["Deny"] = false;
      } else {
        const params = {
          is_default: "Deny",
        };
        await this.handleUpdateLostItem(params, "Deny");
      }
    },
    handleUpdateLostItem(params, type) {
      if (this.itemDetails.id) {
        this.isLoading[type] = true;
        this.$axios
          .post("/updatesinglelostitem?id=" + this.itemDetails.id, params)
          .then((response) => {
            if (response.status === 200) {
              if (type === "Deny") {
                this.showItemRejectDialog = false;
              }
              this.setDialogBody(type);
              this.showDialog = true;
              this.isLoading[type] = false;
              this.$nextTick(() => {
                this.$router.push({ path: "/dashboard" });
              });
            }
          })
          .catch((error) => {
            console.log(error);
            this.$toast.error("Something went wrong! Please try again.");
            this.isLoading[type] = false;
          });
      }
    },
    setDialogBody(type) {
      if (type === "Approve") {
        this.dialogTitle = "Item approved successfully!";
        this.dialogMessage =
          "Item is approved & listed successfully. User who uploaded this item will be notified with the status.";
      } else if (type === "Deny") {
        this.dialogTitle = "Item rejected successfully!";
        this.dialogMessage =
          "Item is rejected & will not be listed. User who uploaded this item will be notified with the rejection reason.";
      } else if (type === "Approve without Image") {
        this.dialogTitle = "Item approved without Image successfully!";
        this.dialogMessage =
          "Item is approved without Image & listed accordingly. User who uploaded this item will be notified with the status.";
      }
    },
    closeDialog() {
      this.showDialog = false;
      this.dialogTitle = "";
      this.dialogMessage = "";
      this.rejectReson = "";
      this.$nextTick(() => {
        this.$router.push({ path: "/found-items" });
      });
    },
  },
};
</script>
  
<style lang="scss">
.wrapper-admin {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}
.editor-container {
  min-width: 200px;
  min-height: 200px;
}

.editor-tools {
  @apply flex flex-wrap w-full justify-between;
  margin-bottom: 20px;
}

.editor-tools .icons {
  @apply flex items-center;
}
.editor-tools .save-upload .button__text {
  @apply flex items-center;
}
.editor-tools .save-upload .button__text svg {
  margin-right: 10px;
  width: 18px;
}

.custom-editor {
  @apply flex justify-center;
  border: 1px solid #808080;
  background-color: #ffffff;
}

.editor-tools .icons {
  div {
    // padding-right: 7px;
    p {
      font-size: 12px;
      text-align: center;
    }
    div {
      cursor: pointer;
      &:hover {
        background: #dfdfdf;
        border-radius: 14px;
      }
      // padding: 5px 15px;
      // margin-bottom: 5px;
      svg {
        width: 18px;
      }
    }
  }
}

canvas {
  object-fit: contain;
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

.vue-cropper-container {
  min-width: 40vw;
}

.previewImage {
  max-height: 300px;
}

.vue-cropper-container {
  img {
    max-height: 300px !important;
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
  .redact {
    canvas {
      min-width: 0 !important;
      min-height: 0 !important;
      width: 500px !important;
      height: 100% !important;
    }
  }
}

@media only screen and (max-width: 510px) {
  .redact {
    canvas {
      min-width: 0 !important;
      min-height: 0 !important;
      width: 350px !important;
      height: 100% !important;
    }
  }
}

@media only screen and (max-width: 410px) {
  .redact {
    canvas {
      min-width: 0 !important;
      min-height: 0 !important;
      width: 300px !important;
      height: 100% !important;
    }
  }
}
textarea.error {
  @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
}
</style>