<template>
  <div class="wrapper-form">
    <div
      class="
        w-full
        mx-4
        lg:mx-0
        md:w-8/12
        lg:w-7/12
        xl:w-6/12
        bg-white
        border border-[#E1E3E6]
        rounded-lg
      "
      style="box-shadow: rgba(54, 28, 93, 0.04) -10px 18px 32px"
    >
      <div v-if="!isLoadingItemDetails || Object.keys(itemDetails).length > 0">
        <ValidationObserver v-slot="{ validate }" ref="observer">
          <form @submit.prevent="validate().then(onSubmit)">
            <div class="sm:p-6 p-4 space-y-4">
              <div class="form-title">
                <div class="w-full">
                  <div class="w-full flex justify-between">
                    <img src="../assets/images/found-shelf-icon.svg" class="mb-3 logo-img" alt="">
                    <!-- <img src="../assets/images/found-qr.png" class="mb-3 qr-img" alt=""> -->
                  </div>
                  <div class="flex justify-between items-center">
                    <div>
                      <h1
                        class="
                          w-full
                          my-2
                          sm:text-xl
                          text-lg
                          font-bold
                          leading-tight
                          text-gray-700
                        "
                      >
                        {{ senderFormTitle }}
                      </h1>
                      <div class="flex justify-start">
                        <span
                          class="
                            w-20
                            border-t-4 border-solid border-orange-200
                            inline-block
                            mb-3
                          "
                        ></span>
                      </div>
                    </div>
                    <div v-if="showResetButton">
                      <BaseButton @click="resetItemDetailsStore">
                        Reset
                      </BaseButton>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SENDER'S DETAILS -->
              <!-- Sender Affiliation - Venue Type  -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  :isRequired="true"
                  v-model="venueType"
                  :options="venueOptions"
                  label="Your Affiliation"
                  :class="errors.length > 0 && 'error'"
                />
              </ValidationProvider>

              <!-- Manual Venue -->
              <ValidationProvider
                v-if="venueManually"
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  :isRequired="true"
                  v-model="manualVenue"
                  type="text"
                  label="Type manually"
                  :class="errors.length > 0 && 'error'"
                />
              </ValidationProvider>

              <!-- Address -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  :isRequired="true"
                  v-model="address"
                  id="autocomplete"
                  type="text"
                  placeholder=""
                  :label="venueLabel"
                  name="address"
                  :class="errors.length > 0 && 'error'"
                  @input="getAddress"
                >
                  <template v-slot:icon>
                    <div
                      v-if="address"
                      class="absolute inset-y-0 top-7 right-0 flex items-center p-5"
                    >
                      <BaseIcon
                        icon="xmark"
                        color="gray"
                        @click="clearAddress"
                      />
                    </div>
                    <div
                      v-else
                      class="absolute inset-y-0 top-7 right-0 flex items-center p-5"
                    >
                      <BaseIcon icon="location-arrow" color="lightgray" />
                    </div>
                  </template>
                </BaseInput>
              </ValidationProvider>

              <!-- Venue Email -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                class="block"
                name="Venue Email"
              >
                <BaseInput
                  v-model="venueEmail"
                  :isRequired="true"
                  type="email"
                  label="Your Email"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <!-- Venue Secondary Email -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="email"
                class="block"
                name="Secondary Email"
              >
                <BaseInput
                  v-model="venueSecondaryEmail"
                  type="email"
                  label="Secondary Email"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
              <div
                class="block box-content h-12"
                :class="[
                  isEmployeeMobileNoValid && '!mt-0',
                  !isEmployeeMobileNoValid && 'error'
                ]"
              >
                <div style="font-size:15px;" class="text-gray-500" :class="!isEmployeeMobileNoValid && 'text-red-500'">Employee Mobile Number <span class="text-red-500">*</span> </div>
                <vue-tel-input
                  class="
                    relative
                    border
                    inline-block
                    border-gray-300
                    w-full
                    rounded-lg
                    h-full
                  "
                  v-model="employeeMobileNo"
                  v-bind="bindPhoneInputProps"
                  @blur="validateEmployeeMobileNo"
                  @validate="validateEmployeePhoneFormat"
                ></vue-tel-input>
              </div>
              <div
                v-if="!isEmployeeMobileNoValid"
                class="vee-validation-error !mt-8 text-sm text-red-600"
              >
                {{ employeePhoneValidationMessage }}
              </div>
              <div class="flex items-center" style="margin: 25px 5px 0px 5px !important">
                <BaseIcon
                  icon="shield-alt"
                  color="lightgray"
                  style="max-width: 15px"
                />
                &nbsp;&nbsp;
                <p style="color: #939393; font-size: 14px">
                  Your mobile number is only for notification purpose that is related to this item. We do not share your mobile number to item owner, or anyone else.
                </p>
              </div>

              <!-- AUTOCOMPLETE ADDRESS DETAILS -->
              <div class="flex items-center gap-1">
                <span class="text-md font-medium text-gray-800">{{ addressTitle }} <span class="text-red-500">*</span></span>
                <BaseIcon
                  icon="circle-info"
                  color="gray"
                  style="max-width: 15px"
                  data-toggle="tooltip"
                  title="Address will be selected automatically as you type & select the 'Venue Address' above"
                />
              </div>

              <!-- Address -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  v-model="autoCompleteAddress.address"
                  label="Address"
                  type="text"
                  :class="{
                    error: errors.length > 0
                  }"
                />
              </ValidationProvider>

              <div class="grid grid-cols-3 lg:grid-cols-3 gap-4">
                <!-- City -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.city"
                    label="City"
                    type="text"
                    :class="{
                      error: errors.length > 0
                    }"
                  />
                </ValidationProvider>

                <!-- State -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.state"
                    label="State"
                    type="text"
                    :class="{
                      error: errors.length > 0
                    }"
                  />
                </ValidationProvider>

                <!-- Zip -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|max:10"
                  class="block"
                  name="Zipcode"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.zipcode"
                    label="Zipcode"
                    type="text"
                    :class="{
                      error: errors.length > 0
                    }"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>

              <div class="grid lg:grid-cols-2 lg:gap-4 gap-0 !mt-0">
                <!-- Country -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block col-span-1"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.country"
                    label="Country"
                    type="text"
                    :class="{
                      error: errors.length > 0
                    }"
                  />
                </ValidationProvider>
                <div>
                  <div
                    class="block relative box-content h-12"
                    :class="!isVenuePhoneValid && 'error'"
                  >
                    <div style="font-size:15px;"  class="text-gray-500" :class="!isVenuePhoneValid && 'text-red-500'">Phone Number</div>
                    <vue-tel-input
                      class="
                        relative
                        border
                        inline-block
                        border-gray-300
                        w-full
                        rounded-lg
                        h-full
                      "
                      v-model="autoCompleteAddress.phoneNo"
                      @blur="validateVenuePhoneNo"
                      @validate="validateVenuePhoneFormat"
                      v-bind="bindPhoneInputProps"
                    ></vue-tel-input>
                    <div
                      v-if="!isVenuePhoneValid"
                      class="
                        vee-validation-error
                        mt-2
                        text-sm text-red-600
                      "
                    >
                      {{ venuePhoneValidationMessage }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- FOUND ITEM'S DETAILS -->
            <div class="sm:p-6 p-4 space-y-4">
              <div class="form-title mb-4">
                <h1
                  class="
                    w-full
                    text-xl
                    font-bold
                    leading-tight
                    text-gray-700
                    mb-3
                  "
                >
                  {{ foundItemFormTitle }}
                </h1>
                <div class="flex justify-start">
                  <span
                    class="
                      w-20
                      border-t-4 border-solid border-orange-200
                      inline-block
                    "
                  ></span>
                </div>
              </div>
              
              <!-- Found Item Date -->
              <label style="font-size:15px;" class="text-gray-500"
                >Found Item Date</label
              > <span class="text-red-500">*</span>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
              >
                <client-only>
                  <div :class="errors.length && 'error'">
                    <date-picker
                      v-model="foundDate"
                      :disabled-date="disableStartDate"
                      formate="YYYY-MM-DD"
                    ></date-picker>
                  </div>
                </client-only>
              </ValidationProvider>

              <div class="block">
                <label style="font-size:15px;" class="text-gray-500"
                  >Found Item Image</label
                >
                <div
                  class="
                    flex
                    items-center
                    justify-center
                    bg-gray-50
                    rounded-lg
                    w-full
                    border-2 border-gray-300 border-dashed
                    hover:bg-gray-100
                  "
                >
                  <div
                    v-if="!image"
                    class="flex flex-col justify-center items-center"
                  >
                    <div
                      class="
                        flex flex-col
                        justify-center
                        items-center
                        pt-5
                        pb-6
                      "
                    >
                      <span class="flex flex-col items-center sm:flex-row">
                        <input
                          v-show="mobileDevice"
                          type="file"
                          id="take-picture"
                          name="files"
                          class="hidden"
                          accept="image/*"
                          capture="camera"
                          @change="uploadImg($event)"
                        />
                        <label
                          v-show="mobileDevice"
                          for="take-picture"
                          id="takePicture"
                          class="
                            cursor-pointer
                            bg-indigo-600
                            text-white
                            font-bold
                            text-sm
                            px-4
                            py-2
                            rounded-full
                            border-indigo-600 border
                            hover:bg-indigo-500 hover:text-white
                          "
                        >
                          <BaseIcon
                            icon="camera"
                            color="white"
                            class="mr-1"
                            style="max-width: 15px"
                          />
                          Take a Picture
                        </label>

                        <span
                          v-show="mobileDevice"
                          class="m-2 text-md text-gray-500"
                          >or</span
                        >
                        <input
                          type="file"
                          id="choose-file"
                          name="files"
                          class="hidden"
                          accept="image/*"
                          @change="uploadImg($event)"
                        />
                        <label
                          for="choose-file"
                          id="chooseFile"
                          class="
                            cursor-pointer
                            bg-accent-100
                            text-white
                            font-bold
                            text-sm
                            px-4
                            py-2
                            rounded-full
                            border-accent-100 border
                            hover:bg-accent-200 hover:text-white
                          "
                        >
                          <BaseIcon
                            icon="arrow-up-from-bracket"
                            color="white"
                            class="mr-1"
                            style="max-width: 15px"
                          />
                          Choose a file
                        </label>
                      </span>
                      <p class="mt-3 text-xs text-gray-500">PNG, JPEG, JPG.</p>
                    </div>
                  </div>

                  <div
                    v-else
                    class="
                      w-full
                      justify-between
                      flex flex-col
                      sm:flex-row
                      p-2
                      sm:p-4 sm:items-center
                    "
                  >
                    <div class="m-auto sm:m-0 image-card max-w-[166px]">
                      <img :src="image" alt="Item image" />
                    </div>
                    <div
                      class="
                        flex flex-col
                        gap-4
                        justify-between
                        mt-4
                        sm:mt-0 sm:flex-row
                      "
                    >
                      <BaseButton
                        :is-loading="isLoadingRemoveImage"
                        :icon="{
                          name: 'trash-can',
                          color: 'white',
                          size: '1x',
                        }"
                        class="
                          !tracking-normal
                          !capitalize
                          !px-4
                          !py-2
                          !inline-flex
                          !items-center
                        "
                        varient="red"
                        @click="showDialog = true"
                      >
                        Remove Image
                      </BaseButton>

                      <BaseButton
                        :is-loading="isLoadingEditImage"
                        :icon="{
                          name: 'pencil',
                          color: 'white',
                          size: '1x',
                        }"
                        class="
                          !tracking-normal
                          !capitalize
                          !px-4
                          !py-2
                          !inline-flex
                          !items-center
                        "
                        varient="indigo"
                        @click="editImage"
                      >
                        Edit Image
                      </BaseButton>

                      <input
                        type="file"
                        id="choose-another-file"
                        name="files"
                        class="hidden"
                        accept="image/*"
                        @change="uploadImg($event)"
                      />

                      <label
                        for="choose-another-file"
                        class="
                          inline-flex
                          items-center
                          px-4
                          py-2
                          bg-accent-100
                          text-white text-sm
                          font-medium
                          rounded-md
                          hover:bg-accent-200
                        "
                      >
                        <BaseIcon
                          icon="arrow-up-from-bracket"
                          size="1x"
                          color="white"
                          class="mr-2"
                        />
                        Choose another file
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <p v-show="!isImageValid" class="text-red-600">
                {{ imageValidationMessage }}
              </p>

              <div
                v-show="showEditor"
                class="fixed z-50 top-0 w-full left-0"
                id="modal"
              >
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
                  "
                >
                  <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-900 opacity-75" />
                  </div>
                  <div
                    class="
                      w-full
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
                        class="
                          absolute
                          right-5
                          top-5
                          inline-block
                          z-10
                          cursor-pointer
                        "
                      >
                        <BaseIcon icon="xmark" size="lg" />
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
                        <div
                          class="px-6 flex justify-center"
                          style="height: 300px"
                        >
                          <img
                            class="previewImage"
                            v-show="!showCrop & !showDraw || imgPreview"
                            :src="imgSrc"
                          />
                          <!-- <div
                            v-if="showCrop && !imgPreview"
                            class="vue-cropper-container"
                          > -->
                          <VueCropper
                            v-if="showCrop && !imgPreview"
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
                          <!-- </div> -->
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
                            <div
                              class="flex flex-col justify-center items-center"
                            >
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
                            <div
                              class="flex flex-col justify-center items-center"
                            >
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

              <!-- Item Description -->
              <div id="manualItemDescription">
                <label style="font-size:15px;" class="text-gray-500">Enter Item Description <span class="text-red-500">*</span> </label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    class="block"
                  >
                    <div :class="errors.length > 0 && 'error'">
                      <v-select taggable v-model="itemDescription" :options="itemDescriptionOptions"></v-select>
                    </div>
                  </ValidationProvider>
              </div>

              <!-- Package Type -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  :isRequired="true"
                  v-model="packageType"
                  :options="packageTypeOptions"
                  label="Package Type"
                  :class="errors.length > 0 && 'error'"
                />
              </ValidationProvider>

              <!-- Item Status -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  :isRequired="true"
                  v-model="itemStatus"
                  :options="itemStatusOptions"
                  label="Item Status"
                  :class="errors.length > 0 && 'error'"
                />
              </ValidationProvider>

              <!-- RECEIVER DETAILS -->
              <template v-if="showReceiverInputs">
                <!-- Receiver Name -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block !mt-0"
                >
                  <BaseInput
                    :isRequired="true"
                    v-model="receiverName"
                    type="text"
                    label="Receiver's Name"
                    :class="errors.length > 0 && 'error'"
                  />
                </ValidationProvider>

                <!-- Receiver Email -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|email"
                  class="block"
                  name="Receiver's Email"
                >
                  <BaseInput
                    :isRequired="true"
                    v-model="receiverEmail"
                    type="email"
                    label="Receiver's Email"
                    :class="errors.length > 0 && 'error'"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
                <div
                  class="block relative box-content h-12"
                  :class="[
                    !isReceiverMobileNoValid && 'error',
                    isReceiverMobileNoValid && '!mt-0',
                  ]"
                >
                  <div style="font-size:15px;" class="text-gray-500" :class="!isReceiverMobileNoValid && 'text-red-500'">Receiver Mobile Number  <span class="text-red-500">*</span> </div>
                  <vue-tel-input
                    class="
                      relative
                      border
                      inline-block
                      border-gray-300
                      w-full
                      rounded-lg
                      h-full
                    "
                    v-model="receiverMobileNo"
                    v-bind="bindPhoneInputProps"
                    @blur="validateReceiverMobileNo"
                    @validate="validateReceiverPhoneFormat"
                  ></vue-tel-input>
                  <div
                    v-if="!isReceiverMobileNoValid"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ receiverPhoneValidationMessage }}
                  </div>
                </div>
              </template>

              <div v-if="showValidateAlert" class="my-8">
                <div
                  class="p-4 text-sm text-red-700 bg-red-100 rounded-lg"
                  role="alert"
                >
                  <span class="font-medium">Oops!</span>
                  {{ alertMessage }}
                </div>
              </div>

              <div class="flex justify-end !mt-12">
                <BaseButton :is-loading="isLoading" type="submit">
                  Preview
                </BaseButton>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <div v-else>
        <BaseLoader />
      </div>
      <BaseDialog
        :showDialog="showDialog"
        :icon="{ name: 'trash-can', color: 'red', size: '3x' }"
        buttonTitle="Yes please!"
        title="Are you sure?"
        message="Do you want to remove the image!"
        @close="showDialog= false; deleteEditable()"
    />
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import RedactImage from "~/components/redactEditor/RedactImage.vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { weightOuncesOptions, venueOptions } from "static/defaults.js";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
import DetectBrowser from "~/mixins/detectBrowser";
import ImageEditor from "@/mixins/imageEditor";
import formatMobileNumber from "../mixins/formatMobileNumber.js";
import eventListners from "../mixins/eventListners.js";
import scrollToError from "../mixins/scrollToError.js";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  mixins: [DetectBrowser, ImageEditor, formatMobileNumber, eventListners, scrollToError],
  data: () => ({
    venueName: "",
    showResetButton: false,
    itemDetails: {},
    showValidateAlert: false,
    alertMessage: "Please fill all required fields and try submitting again.",
    senderFormTitle: "Found an Item that belongs to a guest? Let’s add few details and leave the rest to us!",
    foundItemFormTitle: "Found item details",
    venueEmail: "",
    venueSecondaryEmail: "",
    address: "",
    manualVenue: "",
    venueType: "",
    venueOptions: venueOptions,
    employeeMobileNo: "",
    foundDate: new Date(),
    venueManually: false,
    itemDescription: "",
    itemDescriptionOptions: [],
    itemDescriptionResponse: [],
    packageType: "",
    packageTypeOptions: ["Box", "Envelope"],
    weight: "",
    weightOunces: "",
    weightOuncesOptions: weightOuncesOptions,
    itemLength: "",
    itemWidth: "",
    itemHeight: "",
    itemStatus: "",
    itemStatusOptions: [
      "Claimed (You know the actual owner of this item)",
      "Unclaimed (You do not know the actual owner of this item)",
    ],
    showReceiverInputs: false,
    receiverName: "",
    receiverEmail: "",
    receiverMobileNo: "",
    imageRecognitionData: [],
    isImageValid: true,
    imageValidationMessage: "",
    isLoadingRemoveImage: false,
    foundItemId: "",
    isLoading: false,
    isLoadingItemDetails: true,
    isLoadingEditImage: false,
    isVenuePhoneValid: true,
    isEmployeeMobileNoValid: true,
    isReceiverMobileNoValid: true,
    isVenuePhoneFormatValid: true,
    isEmployeeMobileNoFormatValid: true,
    isReceiverMobileNoFormatValid: true,
    autoCompleteAddress: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      phoneNo: "",
    },
    venuePhoneValidationMessage: "",
    employeePhoneValidationMessage: "",
    receiverPhoneValidationMessage: "",
    showDialog: false,
  }),
  components: {
    DatePicker,
    RedactImage,
    VueCropper,
    ValidationObserver,
    ValidationProvider,
    vSelect,
  },
  computed: {
    // ...mapGetters("item", ["itemDetails"]),
    venueLabel() {
      if (this.venueType === "Restaurant") {
        return "Your Restaurant Name";
      } else if (this.venueType === "Hotel") {
        return "Your Hotel Name";
      } else if (this.venueType === "Airport") {
        return "Airport Name or Code";
      } else {
        return "Venue Address";
      }
    },
    addressTitle() {
      if (this.venueType === "Restaurant") {
        return "Restaurant Address";
      } else if (this.venueType === "Hotel") {
        return "Hotel Address";
      } else if (this.venueType === "Airport") {
        return "Airport Address";
      } else {
        return "Venue Address";
      }
    },
    autoAddressSelected() {
      if (this.autoCompleteAddress.address === "") {
        return false;
      } else {
        if (this.autoCompleteAddress.address !== "Other") {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  methods: {
    disableStartDate(date){
      return date > new Date();
    },
    resetItemDetailsStore() {
      this.$store.commit("item/SET_ITEM_DETAILS", {});
      this.getItemsData();
    },
    async getItemsData() {
      this.showResetButton = false;
      this.itemDetails = JSON.parse(
        JSON.stringify(this.$store.getters["item/itemDetails"])
      );
      await this.getItemDescriptionOptions();
      this.callEventListners();
      if (this.$route.query.id) {
        this.isLoadingItemDetails = true;
        this.foundItemId = this.$route.query.id;
        this.senderFormTitle = "Edit details";
        this.foundItemFormTitle = "Edit found item's details";
        this.$axios
          .get("/getsinglelostitem?id=" + this.$route.query.id)
          .then((response) => {
            if (response.status === 200) {
              this.isLoadingItemDetails = false;
              let data = response.data.data.Item;
              let index = this.venueOptions.indexOf(data.venu_type) !== -1;
              if (index) this.venueType = data.venu_type;
              else {
                this.venueType = "Other";
                this.manualVenue = data.venu_type;
              }
              this.itemDescription = data.item_description;
              this.venueName = data.venue_name;
              this.foundDate = new Date(data.datse);
              this.venueEmail = data.venue_email;
              this.venueSecondaryEmail = data.secondary_email;
              this.employeeMobileNo = data.employee_mobile_no;
              this.address = this.venueName;
              this.autoCompleteAddress.address = data.address;
              this.autoCompleteAddress.phoneNo = data.venue_phone_no;
              this.autoCompleteAddress.city = data.city;
              this.autoCompleteAddress.state = data.states;
              this.autoCompleteAddress.country = data.country;
              this.autoCompleteAddress.zipcode = data.zipcode;
              this.image = data.image;
              this.packageType = data.package_type;
              this.weight = data.weight_pounds;
              this.weightOunces = data.weight_ounces;
              this.itemLength = data.item_length;
              this.itemWidth = data.item_width;
              this.itemHeight = data.item_height;
              this.itemStatus =
                data.item_status === 0
                  ? "Claimed (You know the actual owner of this item)"
                  : "Unclaimed (You do not know the actual owner of this item)";

              if (data.item_status === 0) {
                this.receiverName = data.receiver_name;
                this.receiverEmail = data.receiver_email;
                this.receiverMobileNo = data.receiver_mobile_no;
              }
            }
          })
          .catch((error) => {
            this.$toast.error("Something went wrong! Please try again.");
            console.log(error);
          });
      } else if (this.$route.params?.itemDetails) {
        this.isLoadingItemDetails = false;
        this.senderFormTitle = "Edit details";
        this.foundItemFormTitle = "Edit found item's details";
        let data = this.$route.params.itemDetails;
        var index = this.venueOptions.indexOf(data.venu_type) !== -1;
        if (index) this.venueType = data.venu_type;
        else {
          this.venueType = "Other";
          this.manualVenue = data.venu_type;
        }
        this.itemDescription = data.item_description;

        if (data.foundItemId) {
          this.foundItemId = data.foundItemId;
        } else {
          this.foundItemId = data.id;
        }
        this.venueName = data.venue_name;
        this.foundDate = new Date(data.datse);
        this.venueEmail = data.venue_email;
        this.venueSecondaryEmail = data.secondary_email;
        this.employeeMobileNo = data.employee_mobile_no;
        this.address = this.venueName;
        this.autoCompleteAddress.address = data.address;
        this.autoCompleteAddress.phoneNo = data.venue_phone_no;
        this.autoCompleteAddress.city = data.city;
        this.autoCompleteAddress.state = data.states;
        this.autoCompleteAddress.country = data.country;
        this.autoCompleteAddress.zipcode = data.zipcode;
        this.imageKey = data.image_key;
        this.image = data.image;
        this.packageType = data.package_type;
        this.weight = data.weight_pounds;
        this.weightOunces = data.weight_ounces;
        this.itemLength = data.item_length;
        this.itemWidth = data.item_width;
        this.itemHeight = data.item_height;
        this.itemStatus =
          data.item_status === 0
            ? "Claimed (You know the actual owner of this item)"
            : "Unclaimed (You do not know the actual owner of this item)";

        if (data.item_status === 0) {
          this.receiverName = data.receiver_name;
          this.receiverEmail = data.receiver_email;
          this.receiverMobileNo = data.receiver_mobile_no;
        }
        this.isLoadingItemDetails = false;
      } else if (Object.keys(this.itemDetails).length > 0) {
        this.showResetButton = true;
        this.isLoadingItemDetails = false;
        this.senderFormTitle = "Edit details";
        this.foundItemFormTitle = "Edit found item's details";
        let data = JSON.parse(
          JSON.stringify(this.$store.getters["item/itemDetails"])
        );
        var index = this.venueOptions.indexOf(data.venu_type) !== -1;
        if (index) this.venueType = data.venu_type;
        else {
          this.venueType = "Other";
          this.manualVenue = data.venu_type;
        }
        this.itemDescription = data.item_description;

        if (data.foundItemId) {
          this.foundItemId = data.foundItemId;
        } else {
          this.foundItemId = data.id;
        }
        this.venueName = data.venue_name;
        this.foundDate = new Date(data.datse);
        this.venueEmail = data.venue_email;
        this.venueSecondaryEmail = data.secondary_email;
        this.employeeMobileNo = data.employee_mobile_no;
        this.address = this.venueName;
        this.autoCompleteAddress.address = data.address;
        this.autoCompleteAddress.phoneNo = data.venue_phone_no;
        this.autoCompleteAddress.city = data.city;
        this.autoCompleteAddress.state = data.states;
        this.autoCompleteAddress.country = data.country;
        this.autoCompleteAddress.zipcode = data.zipcode;
        this.imageKey = data.image_key;
        this.image = data.image;
        this.packageType = data.package_type;
        this.weight = data.weight_pounds;
        this.weightOunces = data.weight_ounces;
        this.itemLength = data.item_length;
        this.itemWidth = data.item_width;
        this.itemHeight = data.item_height;
        this.itemStatus =
          data.item_status === 0
            ? "Claimed (You know the actual owner of this item)"
            : "Unclaimed (You do not know the actual owner of this item)";

        if (data.item_status === 0) {
          this.receiverName = data.receiver_name;
          this.receiverEmail = data.receiver_email;
          this.receiverMobileNo = data.receiver_mobile_no;
        }
        this.isLoadingItemDetails = false;
      } else {
        this.isLoadingItemDetails = false;
        this.senderFormTitle = "Found an Item that belongs to a guest? Let’s add few details and leave the rest to us!";
        this.foundItemFormTitle = "Found item's details";
        this.venueType = "";
        this.venueName = "";
        this.manualVenue = "";
        this.itemDescription = "";
        this.foundItemId = "";
        this.foundDate = new Date();
        this.venueEmail = "";
        this.venueSecondaryEmail = "";
        this.employeeMobileNo = "";
        this.address = "";
        this.autoCompleteAddress.address = "";
        this.autoCompleteAddress.phoneNo = "";
        this.autoCompleteAddress.city = "";
        this.autoCompleteAddress.state = "";
        this.autoCompleteAddress.country = "";
        this.autoCompleteAddress.zipcode = "";
        this.imageKey = "";
        this.image = "";
        this.packageType = "";
        this.weight = "";
        this.weightOunces = "";
        this.itemLength = "";
        this.itemWidth = "";
        this.itemHeight = "";
        this.itemStatus = "";
        this.receiverName = "";
        this.receiverEmail = "";
        this.receiverMobileNo = "";
      }
    },
    getItemDescriptionOptions() {
      return new Promise((resolve) => {
        this.$axios
          .get("/viewallItemdescriptionDetails")
          .then((response) => {
            if (response.status === 200) {
              this.itemDescriptionResponse = response.data?.data?.Items || [];
              this.itemDescriptionOptions = this.itemDescriptionResponse.map(
                (item) => {
                  return item.item_description;
                }
              );
              resolve();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    getAddress() {
      if (this.address == "") {
        document.getElementById("autocomplete").placeholder = "";
      }
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete")
      );
      autocomplete.addListener("place_changed", () => {
        this.autoCompleteAddress = {
          address: "",
          city: "",
          state: "",
          country: "",
          zipcode: "",
          phoneNo: "",
        };
        let address = autocomplete.getPlace();
        this.venueName = address.name;
        this.autoCompleteAddress.address = address.formatted_address;
        this.address = this.venueName;
        this.autoCompleteAddress.phoneNo =
          address.international_phone_number || address.formatted_phone_number;

        address.address_components.forEach((component) => {
          component.types.forEach((type) => {
            if (type === "locality" || type === "postal_town") {
              this.autoCompleteAddress.city = component.long_name;
            }
            if (type === "administrative_area_level_1") {
              this.autoCompleteAddress.state = component.long_name;
            }
            if (type === "country") {
              this.autoCompleteAddress.country = component.long_name;
            }
            if (type === "postal_code") {
              this.autoCompleteAddress.zipcode = component.long_name;
            }
          });
        });
      });
    },
    clearAddress() {
      this.address = "";
      document.getElementById("autocomplete").placeholder = "";
      this.autoCompleteAddress = {
        address: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        phoneNo: "",
      };
    },
    resetAddressFields() {
      this.autoCompleteAddress = {
        address: "Other",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        phoneNo: "",
      };
    },
    resetItemDescriptionFields() {
      this.itemDescription = "";
      this.itemDescriptionOptions = [];
      this.getItemDescriptionOptions();
      this.itemDescriptionResponse = [];
      this.packageType = "";
      this.itemLength = "";
      this.itemWidth = "";
      this.itemHeight = "";
      this.weight = "";
      this.weightOunces = "0";
    },
    validateVenuePhoneFormat(vueTelObj) {
      if (vueTelObj.valid !== undefined) {
        if (vueTelObj.valid) {
          this.isVenuePhoneFormatValid = true;
          this.isVenuePhoneValid = true;
          this.venuePhoneValidationMessage = "";
        } else {
          this.isVenuePhoneFormatValid = false;
          this.isVenuePhoneValid = false;
          this.venuePhoneValidationMessage = "Please enter valid phone number";
        }
      }
    },
    validateVenuePhoneNo() {
      if (!this.autoCompleteAddress.phoneNo) {
        this.isVenuePhoneValid = false;
        // this.venuePhoneValidationMessage = "*Required";
      } else {
        if (this.isVenuePhoneFormatValid) {
          this.isVenuePhoneValid = true;
          // this.venuePhoneValidationMessage = "";
        } else {
          this.isVenuePhoneValid = false;
        }
      }
    },
    validateEmployeePhoneFormat(vueTelObj) {
      if (vueTelObj.valid !== undefined) {
        if (vueTelObj.valid) {
          this.isEmployeeMobileNoFormatValid = true;
          this.isEmployeeMobileNoValid = true;
          this.employeePhoneValidationMessage = "";
        } else {
          this.isEmployeeMobileNoFormatValid = false;
          this.isEmployeeMobileNoValid = false;
          this.employeePhoneValidationMessage =
            "Please enter valid phone number";
        }
      }
    },
    validateEmployeeMobileNo() {
      if (!this.employeeMobileNo) {
        this.isEmployeeMobileNoValid = false;
        // this.employeePhoneValidationMessage = "*Required";
      } else {
        if (this.isEmployeeMobileNoFormatValid) {
          this.isEmployeeMobileNoValid = true;
          // this.employeePhoneValidationMessage = "";
        } else {
          this.isEmployeeMobileNoValid = false;
        }
      }
    },
    validateReceiverPhoneFormat(vueTelObj) {
      if (vueTelObj.valid !== undefined) {
        if (vueTelObj.valid) {
          this.isReceiverMobileNoFormatValid = true;
          this.isReceiverMobileNoValid = true;
          this.receiverPhoneValidationMessage = "";
        } else {
          this.isReceiverMobileNoFormatValid = false;
          this.isReceiverMobileNoValid = false;
          this.receiverPhoneValidationMessage =
            "Please enter valid phone number";
        }
      }
    },
    validateReceiverMobileNo() {
      if (!this.receiverMobileNo) {
        this.isReceiverMobileNoValid = false;
        // this.receiverPhoneValidationMessage = "*Required";
      } else {
        this.isReceiverMobileNoValid = true;
        if (this.isReceiverMobileNoFormatValid) {
          this.isReceiverMobileNoValid = true;
          // this.receiverPhoneValidationMessage = "";
        } else {
          this.isReceiverMobileNoValid = false;
        }
      }
    },
    setItemDetails(value) {
      let index = this.itemDescriptionResponse.findIndex((item) => {
        return item.item_description === value;
      });

      if (index != -1) {
        this.packageType = this.itemDescriptionResponse[index].package_type;
        this.itemLength = this.itemDescriptionResponse[index].item_length;
        this.itemWidth = this.itemDescriptionResponse[index].item_width;
        this.itemHeight = this.itemDescriptionResponse[index].item_height;
        this.weight = this.itemDescriptionResponse[index].weight_pounds;
        this.weightOunces = String(
          this.itemDescriptionResponse[index].weight_ounces
        );
      }
    },
    async onSubmit() {
      let itemStatus = "";
      if (
        this.itemStatus === "Claimed (You know the actual owner of this item)"
      ) {
        itemStatus = "Claimed";
      } else if (
        this.itemStatus ===
        "Unclaimed (You do not know the actual owner of this item)"
      ) {
        itemStatus = "Unclaimed";
      }
      this.validateVenuePhoneNo();
      this.validateEmployeeMobileNo();
      if (itemStatus == "Claimed") this.validateReceiverMobileNo();

      this.isLoading = true;
      const isValid = await this.$refs.observer.validate();
      if (
        !isValid ||
        !this.isVenuePhoneValid ||
        !this.isEmployeeMobileNoValid ||
        !this.isReceiverMobileNoValid
      ) {
        this.scrollToError();
        this.showValidateAlert = true;
        this.alertMessage = "Please fill all required fields and try submitting again.";
        this.isLoading = false;
      } else {
        let venuePhoneNo = this.formatMobileNumber(
          this.autoCompleteAddress.phoneNo
        );
        let employeeMobileNo = this.formatMobileNumber(this.employeeMobileNo);
        this.showValidateAlert = false;
        let is_default = "Approve";
        let it_type = 1;
        if(this.image || !this.itemDescriptionOptions.includes(this.itemDescription)){
          is_default = "Pending";
        }
        if(!this.itemDescriptionOptions.includes(this.itemDescription)){
          it_type = 0;
        }
        const params = {
          is_default: is_default,
          it_type: it_type,
          venue_name: this.venueName,
          venu_type:
            this.venueType === "Other" ? this.manualVenue : this.venueType,
          datse: moment(this.foundDate).format("YYYY-MM-DD"),
          venue_email: this.venueEmail,
          secondary_email: this.venueSecondaryEmail,
          venue_phone_no: venuePhoneNo,
          employee_mobile_no: employeeMobileNo,
          address: this.autoCompleteAddress.address,
          city: this.autoCompleteAddress.city,
          states: this.autoCompleteAddress.state,
          country: this.autoCompleteAddress.country,
          zipcode: this.autoCompleteAddress.zipcode,
          image: this.image,
          image_key: this.imageKey,
          item_description: this.itemDescription,
          package_type: this.packageType,
          weight_pounds: this.weight,
          weight_ounces: this.weightOunces,
          item_length: this.itemLength,
          item_width: this.itemWidth,
          item_height: this.itemHeight,
          item_status: itemStatus === "Claimed" ? 0 : 1,
        };
        params.foundItemId = this.foundItemId;
        if (itemStatus === "Claimed") {
          let receiverMobileNo = this.formatMobileNumber(this.receiverMobileNo);
          params.receiver_name = this.receiverName;
          params.receiver_email = this.receiverEmail;
          params.receiver_mobile_no = receiverMobileNo;
        }

        this.$store.commit("item/SET_ITEM_DETAILS", {
          ...params,
          image: this.image,
        });

        setTimeout(() => {
          this.isLoading = false;
          this.$nextTick(() => {
            this.$router.push({ path: "/detail-confirmation" });
          });
        }, 300);
      }
    },
    deleteEditable(showToastr = true) {
      return new Promise((resolve) => {
        if (this.imageKey) {
          this.isLoadingRemoveImage = true;
          this.$axios
            .post("/removes3files", { key: this.imageKey })
            .then((response) => {
              if (response.status === 200) {
                this.isLoadingRemoveImage = false;
                this.showEditor = false;
                this.imgSrc = "";
                this.showCrop = false;
                this.showDraw = false;
                this.imgPreview = false;
                this.imageKey = "";
                this.image = "";
                this.resetItemDescriptionFields();
                resolve();
                if (showToastr) this.$toast.info("Image Removed Successfully!");
              }
            })
            .catch((error) => {
              this.$toast.error("Something went wrong! Please try again.");
              this.isLoadingRemoveImage = false;
              console.log(error);
              resolve();
            });
        }
         else {
          resolve();
          this.imgSrc = "";
          this.showCrop = false;
          this.showDraw = false;
          this.imgPreview = false;
          this.imageKey = "";
          this.image = "";
        } 
      });
    },
    async uploadImg(event) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const filePath = event.target?.files[0];
      if (filePath) {
        if (allowedExtensions.exec(filePath.name)) {
          this.isImageValid = true;
          this.imageValidationMessage = "";
          let file = filePath;
          this.imgSrc = await this.process_image(file);
          this.showEditor = true;
        } else {
          this.imageValidationMessage =
            "Uploaded file is not supported. Allowed file types: .png, .jpeg, .jpg";
          this.isImageValid = false;
          return;
        }
      } else {
        this.showEditor = false;
      }
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
        .then(async (response) => {
          if (response.status === 200) {
            this.isSavingImage = false;
            if (this.image) {
              this.$toast.info("Image Updated Successfully!");
              await this.deleteEditable(false);
            } else {
              this.$toast.info("Image Saved Successfully!");
            }
            this.imageRecognitionData = response.data.data;
            let responseItemData = response.data.data
              .filter((obj) => {
                if (obj.name) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((obj) => {
                return obj.name;
              });
            if(responseItemData.length > 0){
              let predictedValue = responseItemData[0];
              let index = this.itemDescriptionOptions.findIndex((item) => {
                return item.toLowerCase().includes(predictedValue.toLowerCase()) || predictedValue.toLowerCase().includes(item.toLowerCase())
              })

              if(index !== -1){
                this.itemDescription = this.itemDescriptionOptions[index];
              }
              else{
                this.itemDescription = responseItemData[0];
              }

              responseItemData.forEach(item => {
                if(!this.itemDescriptionOptions.includes(item)){
                  this.itemDescriptionOptions.push(item);
                }
              })

            }
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
          // this.enableEdit = false;
        })
        .catch((error) => {
          this.$toast.error("Something went wrong! Please try again.");
          this.isSavingImage = false;
          console.log(error);
        });
    },
  },
  watch: {
    venueType(newValue, oldValue) {
      if (newValue != oldValue) {
        if (newValue == "Other") {
          this.venueManually = true;
        } else {
          this.venueManually = false;
        }
      }
    },
    itemStatus(newValue, oldValue) {
      if (newValue != oldValue) {
        if (newValue == "Claimed (You know the actual owner of this item)") {
          this.showReceiverInputs = true;
        } else {
          this.showReceiverInputs = false;
        }
      }
    },
    itemDescription(newValue, oldValue) {
      if (newValue != oldValue) {
        this.setItemDetails(this.itemDescription);
      }
    },
  },
  mounted() {
    this.getItemsData();
  },
};
</script>

<style lang="scss">
@import "./assets/styles/date-picker.scss";
@import "./assets/styles/image-editor.scss";
@import "./assets/styles/address-autocomplete.scss";
@import "./assets/styles/phone-number-input.scss";

.logo-img {
  width: 100px;
}

.qr-img {
  width: 61px;
}

.wrapper-form {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}

.error {
  select {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
  }
}

.toasted-container .toasted .action.icon svg {
  font-size: 16px;
}

.vs__dropdown-toggle {
  @apply h-12 border border-gray-300 rounded-lg;
}

.error {
  .vs__dropdown-toggle {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
  }
}

#manualItemDescription .vs__actions{
  display: none !important;
}
</style>