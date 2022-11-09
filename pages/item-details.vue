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
                <h1
                  class="
                    w-full
                    my-2
                    text-xl
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

              <!-- SENDER'S DETAILS -->
              <!-- Sender Affiliation - Venue Type  -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  v-model="venueType"
                  :options="venueOptions"
                  label="Sender Affiliation"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <!-- Manual Venue -->
              <ValidationProvider
                v-if="venueManually"
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  v-model="manualVenue"
                  type="text"
                  label="Type manually"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <!-- Found Item Date -->
              <label class="block text-md font-medium text-gray-800"
                >Found Item Date:</label
              >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <div :class="errors.length && 'error'">
                  <date-picker
                    v-model="foundDate"
                    formate="YYYY-MM-DD"
                  ></date-picker>
                </div>
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <!-- Address -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  v-model="address"
                  id="autocomplete"
                  type="text"
                  :label="venueLabel"
                  :class="errors.length > 0 && 'error'"
                  @input="getAddress"
                >
                  <template v-slot:icon>
                    <div
                      v-if="address"
                      class="absolute inset-y-0 right-0 flex items-center p-5"
                    >
                      <BaseIcon
                        icon="circle-xmark"
                        color="gray"
                        @click="clearAddress"
                      />
                    </div>
                    <div
                      v-else
                      class="absolute inset-y-0 right-0 flex items-center p-5"
                    >
                      <BaseIcon icon="location-arrow" color="lightgray" />
                    </div>
                  </template>
                </BaseInput>
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
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
                  type="email"
                  label="Venue Email"
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
                  label="Secondary Venue Email (Optional)"
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
                :class="!isEmployeeMobileNoValid && 'error'"
              >
                <vue-tel-input
                  :inputOptions="{ placeholder: 'Employee Mobile No.' }"
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
                ></vue-tel-input>
              </div>
              <div class="flex items-center" style="margin: 2px 5px !important">
                <BaseIcon
                  icon="shield-alt"
                  color="lightgray"
                  style="max-width: 15px"
                />
                &nbsp;&nbsp;
                <p style="color: #939393; font-size: 14px">
                  Your contact will not be shared with anyone.
                </p>
              </div>
              <div
                v-if="!isEmployeeMobileNoValid"
                class="vee-validation-error top-margin-05 text-sm text-red-600"
              >
                *Required
              </div>

              <!-- AUTOCOMPLETE ADDRESS DETAILS -->
              <div class="flex items-center gap-1">
                <span class="text-md font-medium text-gray-800">Address:</span>
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
                <BaseSelect
                  v-model="autoCompleteAddress.address"
                  :options="addressArr"
                  label="Auto complete address"
                  :class="errors.length > 0 && 'error'"
                  @input="updateAddress"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <!-- Manual address -->
              <ValidationProvider
                v-if="manualAddressSelected"
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  v-model="manualAddress"
                  type="text"
                  label="Address Line"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <div class="grid grid-cols-3 lg:grid-cols-3 gap-4">
                <!-- City -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="max:28|required"
                  class="block col-span-1"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.city"
                    label="City"
                    type="text"
                    :class="{
                      error: errors.length > 0,
                      readonly: autoCompleteAddress.city && autoAddressSelected,
                    }"
                    :readonly="
                      autoCompleteAddress.city !== '' && autoAddressSelected
                    "
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>

                <!-- State -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block col-span-1"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.state"
                    label="State"
                    type="text"
                    :class="{
                      error: errors.length > 0,
                      readonly:
                        autoCompleteAddress.state && autoAddressSelected,
                    }"
                    :readonly="
                      autoCompleteAddress.state !== '' && autoAddressSelected
                    "
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>

                <!-- Zip -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block col-span-1"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.zipcode"
                    label="Zipcode"
                    type="text"
                    :class="{
                      error: errors.length > 0,
                      readonly:
                        autoCompleteAddress.zipcode && autoAddressSelected,
                    }"
                    :readonly="
                      autoCompleteAddress.zipcode !== '' && autoAddressSelected
                    "
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>

              <div class="grid lg:grid-cols-2 gap-4">
                <!-- Country -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="max:28|required"
                  class="block col-span-1"
                >
                  <BaseInput
                    v-model="autoCompleteAddress.country"
                    label="Country"
                    type="text"
                    :class="{
                      error: errors.length > 0,
                      readonly:
                        autoCompleteAddress.country && autoAddressSelected,
                    }"
                    :readonly="
                      autoCompleteAddress.country !== '' && autoAddressSelected
                    "
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
                  :class="!isVenuePhoneValid && 'error'"
                >
                  <vue-tel-input
                    :inputOptions="{ placeholder: 'Phone Number' }"
                    class="
                      relative
                      border
                      inline-block
                      border-gray-300
                      w-full
                      rounded-lg
                      h-full
                    "
                    :class="{
                      readonly:
                        autoCompleteAddress.phoneNo && autoAddressSelected,
                    }"
                    v-model="autoCompleteAddress.phoneNo"
                    @blur="validateVenuePhoneNo"
                    v-bind="bindPhoneInputProps"
                  ></vue-tel-input>
                  <div
                    v-if="!isVenuePhoneValid"
                    class="
                      vee-validation-error
                      top-margin-05
                      text-sm text-red-600
                    "
                  >
                    *Required
                  </div>
                </div>
              </div>
            </div>
            <div class="flex mt-2">
              <span
                class="
                  w-full
                  border-t border-solid border-gray-200
                  inline-block
                "
              ></span>
            </div>

            <!-- FOUND ITEM'S DETAILS -->
            <div class="card sm:p-6 p-4 space-y-4">
              <div class="form-title">
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

              <div class="block">
                <label
                  class="block text-md mb-3 font-medium text-gray-800"
                  for="itemImage"
                  >Found item image</label
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
                          type="file"
                          id="take-picture"
                          name="files"
                          class="hidden"
                          accept="image/*"
                          capture="camera"
                          @change="uploadImg($event)"
                        />
                        <label
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
                          <BaseIcon icon="camera" color="white" class="mr-1" />
                          Take a Picture
                        </label>

                        <span class="m-2 text-md text-gray-500">or</span>
                        <input
                          type="file"
                          id="choose-file"
                          name="files"
                          class="hidden"
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
                      <button
                        @click="deleteEditable"
                        type="button"
                        class="
                          inline-flex
                          items-center
                          px-4
                          py-2
                          bg-red-600
                          hover:bg-red-500
                          text-white text-sm
                          font-medium
                          rounded-md
                        "
                      >
                        <svg
                          v-if="isLoadingRemoveImage"
                          class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>

                        <BaseIcon
                          v-else
                          icon="trash-can"
                          color="white"
                          size="1x"
                          class="mr-2"
                        />

                        Remove Image
                      </button>

                      <button
                        @click="editImage"
                        type="button"
                        class="
                          inline-flex
                          items-center
                          px-4
                          py-2
                          bg-indigo-500
                          hover:bg-indigo-600
                          text-white text-sm
                          font-medium
                          rounded-md
                        "
                      >
                        <BaseIcon
                          icon="pen-to-square"
                          size="1x"
                          color="white"
                          class="mr-2"
                        />
                        Edit Image
                      </button>

                      <input
                        type="file"
                        id="choose-another-file"
                        name="files"
                        class="hidden"
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
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  v-model="itemDescription"
                  :options="itemDescriptionOptions"
                  label="Item Description"
                  :class="errors.length > 0 && 'error'"
                  @input="setItemDetails"
                />
                  <!-- <template v-slot:displayoption="{ option }">
                    {{ option.item_description }}
                  </template> -->
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <!-- Package Type -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block col-span-1"
              >
                <BaseSelect
                  v-model="packageType"
                  :options="packageTypeOptions"
                  label="Package Type"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <!-- WEIGHT -->
              <label class="block text-md font-medium text-gray-800"
                >Weight</label
              >
              <div class="grid lg:grid-cols-2 gap-4">
                <!-- Weight Pounds-->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="int|weight:@ounces"
                  class="block"
                  name="Pounds"
                >
                  <BaseInput
                    v-model="weight"
                    label="Pounds"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>

                <!-- Weight Ounces -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="int|weight:@pounds"
                  class="block"
                  name="Ounces"
                >
                  <BaseSelect
                    v-model="weightOunces"
                    :options="weightOuncesOptions"
                    label="Ounces"
                    :class="errors.length > 0 && 'error'"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>

              <!-- DIMENSIONS -->
              <label class="block text-md font-medium text-gray-800"
                >Dimensions (Inches)</label
              >
              <div class="flex justify-between gap-4">
                <!-- Length -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|float|positiveNumber"
                  class="block lg:col-span-2"
                  name="Length"
                >
                  <BaseInput
                    v-model="itemLength"
                    label="Length"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>

                <!-- Width -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|float|positiveNumber"
                  class="block lg:col-span-2"
                  name="Width"
                >
                  <BaseInput
                    v-model="itemWidth"
                    label="Width"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>

                <!-- Height -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|float|positiveNumber"
                  class="block lg:col-span-2"
                  name="Height"
                >
                  <BaseInput
                    v-model="itemHeight"
                    label="Height"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>

              <!-- Item Status -->
              <label class="block text-md font-medium text-gray-800"
                >Item Status</label
              >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  v-model="itemStatus"
                  :options="itemStatusOptions"
                  label="Item Status"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <!-- RECEIVER DETAILS -->
              <template v-if="showReceiverInputs">
                <!-- Receiver Name -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="max:100|required"
                  class="block"
                >
                  <BaseInput
                    v-model="receiverName"
                    type="text"
                    label="Receiver's Name"
                    :class="errors.length > 0 && 'error'"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>

                <!-- Receiver Email -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|email"
                  class="block"
                  name="Receiver's Email"
                >
                  <BaseInput
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
                  :class="!isReceiverMobileNoValid && 'error'"
                >
                  <vue-tel-input
                    :inputOptions="{ placeholder: 'Receiver Mobile No.' }"
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
                  ></vue-tel-input>
                  <div
                    v-if="!isReceiverMobileNoValid"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    *Required
                  </div>
                </div>
              </template>

              <div
                v-show="showValidateAlert"
                class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                role="alert"
              >
                <span class="font-medium">Oops!</span> Please fill all required
                fields and try submitting again.
              </div>

              <div class="flex justify-end">
                <BaseButton :is-loading="isLoading" button-type="submit">
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
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapGetters } from "vuex";
import RedactImage from "~/components/redactEditor/RedactImage.vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import {
  itemDescriptionOptions,
  weightOuncesOptions,
  venueOptions,
} from "static/defaults.js";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";

export default {
  data: () => ({
    imgSrc: "",
    showCrop: false,
    showDraw: false,
    imgPreview: false,
    showUndo: false,
    // enableEdit: false,

    showValidateAlert: false,
    senderFormTitle: "",
    foundItemFormTitle: "",
    venueName: "",
    venueEmail: "",
    venueSecondaryEmail: "",
    manualAddressSelected: false,
    manualAddress: "",
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
    addressArr: ["Other"],
    itemImage: "",
    // canvasWidth: "600",
    // canvasHeight: "400",
    showEditor: false,
    // stateCrop: true,
    size_icon: "2x",
    isSavingImage: false,
    imageRecognitionData: [],
    image: "",
    imageKey: "",
    isImageValid: true,
    imageValidationMessage: "",
    isLoadingRemoveImage: false,
    bindPhoneInputProps: {
      mode: "international",
      autoDefaultCountry: true,
      validCharactersOnly: true,
      autoFormat: true,
      preferredCountries: ["US", "CN"],
      placeholder: "Enter a phone number",
      name: "telephone",
      maxLen: 15,
      inputOptions: {
        showDialCode: false,
      },
    },
    foundItemId: "",
    isLoading: false,
    isLoadingItemDetails: false,
    isVenuePhoneValid: true,
    isEmployeeMobileNoValid: true,
    isReceiverMobileNoValid: true,
    autoCompleteAddress: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      phoneNo: "",
    },
    autoCompleteAddressArr: [],
  }),
  components: {
    DatePicker,
    RedactImage,
    VueCropper,
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters("item", ["itemDetails"]),
    venueLabel() {
      if (this.venueType === "Restaurant") {
        return "Restaurant Name";
      } else if (this.venueType === "Hotel") {
        return "Hotel Name";
      } else if (this.venueType === "Airport") {
        return "Airport Code";
      } else {
        return "Venue Address";
      }
    },
    autoAddressSelected() {
      return this.autoCompleteAddress.address !== "Other";
    },
  },
  methods: {
    getItemDescriptionOptions() {
      return new Promise((resolve) => {
        this.$axios
          .get("/viewallItemdescriptionDetails")
          .then((response) => {
            if (response.status === 200) {
              this.itemDescriptionResponse = response.data?.data?.Items || [];
              this.itemDescriptionOptions = this.itemDescriptionResponse.map(item => {
                return item.item_description;
              });
              resolve();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
    },
    getAddress() {
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
        let index = this.addressArr.findIndex((addressObj) => {
          return addressObj == address.formatted_address;
        });
        if (index == "-1") {
          this.addressArr.unshift(address.formatted_address);
        }
        let obj = {};
        this.autoCompleteAddress.address = this.addressArr[0];
        this.address = this.addressArr[0];
        obj.address = this.addressArr[0];
        this.autoCompleteAddress.phoneNo =
          address.international_phone_number || address.formatted_phone_number;
        obj.phoneNo = this.autoCompleteAddress.phoneNo;

        address.address_components.forEach((component) => {
          component.types.forEach((type) => {
            if (type === "locality" || type === "postal_town") {
              this.autoCompleteAddress.city = component.long_name;
              obj.city = component.long_name;
            }
            if (type === "administrative_area_level_1") {
              this.autoCompleteAddress.state = component.long_name;
              obj.state = component.long_name;
            }
            if (type === "country") {
              this.autoCompleteAddress.country = component.long_name;
              obj.country = component.long_name;
            }
            if (type === "postal_code") {
              this.autoCompleteAddress.zipcode = component.long_name;
              obj.zipcode = component.long_name;
            }
          });
        });
        this.autoCompleteAddressArr.push(obj);
      });
    },
    updateAddress(value) {
      if (value === "Other") {
        this.manualAddressSelected = true;
        this.resetAddressFields();
      } else {
        this.manualAddressSelected = false;
        this.autoCompleteAddressArr.forEach((addressObj) => {
          if (value == addressObj.address) {
            this.autoCompleteAddress = {
              address: addressObj.address,
              city: addressObj.city,
              state: addressObj.state,
              country: addressObj.country,
              zipcode: addressObj.zipcode,
              phoneNo: addressObj.phoneNo,
            };
          }
        });
      }
    },
    clearAddress() {
      this.address = "";
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
    validateVenuePhoneNo() {
      if (!this.autoCompleteAddress.phoneNo) {
        this.isVenuePhoneValid = false;
      } else {
        this.isVenuePhoneValid = true;
      }
    },
    validateEmployeeMobileNo() {
      if (!this.employeeMobileNo) {
        this.isEmployeeMobileNoValid = false;
      } else {
        this.isEmployeeMobileNoValid = true;
      }
    },
    validateReceiverMobileNo() {
      if (!this.receiverMobileNo) {
        this.isReceiverMobileNoValid = false;
      } else {
        this.isReceiverMobileNoValid = true;
      }
    },
    formatMobileNumber(phoneNumber) {
      let arr = phoneNumber.split(" ");
      let countryCode = arr.shift();
      return countryCode + " " + arr.join("");
    },
    setItemDetails(value) {
      let index = this.itemDescriptionResponse.findIndex(item => {
        return item.item_description === value;
      });
      if(index != -1){
        this.packageType = this.itemDescriptionResponse[index].package_type;
        this.itemLength = this.itemDescriptionResponse[index].item_length;
        this.itemWidth = this.itemDescriptionResponse[index].item_width;
        this.itemHeight = this.itemDescriptionResponse[index].item_height;
        this.weight = this.itemDescriptionResponse[index].weight_pounds;
        this.weightOunces = String(this.itemDescriptionResponse[index].weight_ounces);
      }
      // switch (value) {
      //   case "Laptop":
      //     this.packageType = "Box";
      //     this.itemLength = "18";
      //     this.itemWidth = "12";
      //     this.itemHeight = "6";
      //     this.weight = "6";
      //     this.weightOunces = "0";
      //     break;
      //   case "Tablet":
      //     this.packageType = "Box";
      //     this.itemLength = "12";
      //     this.itemWidth = "10";
      //     this.itemHeight = "6";
      //     this.weight = "2";
      //     this.weightOunces = "0";
      //     break;
      //   case "Cell phone":
      //     this.packageType = "Box";
      //     this.itemLength = "9";
      //     this.itemWidth = "6";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Mobile Phone":
      //     this.packageType = "Box";
      //     this.itemLength = "9";
      //     this.itemWidth = "6";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Pillow":
      //     this.packageType = "Box";
      //     this.itemLength = "20";
      //     this.itemWidth = "12";
      //     this.itemHeight = "6";
      //     this.weight = "3";
      //     this.weightOunces = "0";
      //     break;
      //   case "Shoes":
      //     this.packageType = "Box";
      //     this.itemLength = "14";
      //     this.itemWidth = "12";
      //     this.itemHeight = "7";
      //     this.weight = "3";
      //     this.weightOunces = "0";
      //     break;
      //   case "Slipper":
      //     this.packageType = "Box";
      //     this.itemLength = "13";
      //     this.itemWidth = "8";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Socks":
      //     this.packageType = "Box";
      //     this.itemLength = "8";
      //     this.itemWidth = "6";
      //     this.itemHeight = "4";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Headphone":
      //     this.packageType = "Box";
      //     this.itemLength = "12";
      //     this.itemWidth = "12";
      //     this.itemHeight = "4";
      //     this.weight = "2";
      //     this.weightOunces = "0";
      //     break;
      //   case "Earphone":
      //     this.packageType = "Box";
      //     this.itemLength = "6";
      //     this.itemWidth = "6";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Wristwatch":
      //     this.packageType = "Box";
      //     this.itemLength = "6";
      //     this.itemWidth = "6";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "ID":
      //     this.packageType = "Box";
      //     this.itemLength = "6";
      //     this.itemWidth = "6";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Credit Card":
      //     this.packageType = "Box";
      //     this.itemLength = "6";
      //     this.itemWidth = "6";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Passport":
      //     this.packageType = "Box";
      //     this.itemLength = "6";
      //     this.itemWidth = "6";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Phone charger":
      //     this.packageType = "Box";
      //     this.itemLength = "6";
      //     this.itemWidth = "6";
      //     this.itemHeight = "6";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Charger for Laptop":
      //     this.packageType = "Box";
      //     this.itemLength = "8";
      //     this.itemWidth = "8";
      //     this.itemHeight = "6";
      //     this.weight = "2";
      //     this.weightOunces = "0";
      //     break;
      //   case "Blanket":
      //     this.packageType = "Box";
      //     this.itemLength = "20";
      //     this.itemWidth = "12";
      //     this.itemHeight = "6";
      //     this.weight = "3";
      //     this.weightOunces = "0";
      //     break;
      //   case "Shirt":
      //     this.packageType = "Box";
      //     this.itemLength = "12";
      //     this.itemWidth = "10";
      //     this.itemHeight = "6";
      //     this.weight = "2";
      //     this.weightOunces = "0";
      //     break;
      //   case "Pant":
      //     this.packageType = "Box";
      //     this.itemLength = "12";
      //     this.itemWidth = "10";
      //     this.itemHeight = "6";
      //     this.weight = "2";
      //     this.weightOunces = "0";
      //     break;
      //   case "T-shirt":
      //     this.packageType = "Box";
      //     this.itemLength = "12";
      //     this.itemWidth = "10";
      //     this.itemHeight = "6";
      //     this.weight = "2";
      //     this.weightOunces = "0";
      //     break;
      //   case "Clothes":
      //     this.packageType = "Box";
      //     this.itemLength = "12";
      //     this.itemWidth = "10";
      //     this.itemHeight = "6";
      //     this.weight = "2";
      //     this.weightOunces = "0";
      //     break;
      //   case "Jacket":
      //     this.packageType = "Box";
      //     this.itemLength = "18";
      //     this.itemWidth = "12";
      //     this.itemHeight = "6";
      //     this.weight = "3";
      //     this.weightOunces = "0";
      //     break;
      //   case "Suit":
      //     this.packageType = "Box";
      //     this.itemLength = "15";
      //     this.itemWidth = "12";
      //     this.itemHeight = "7";
      //     this.weight = "4";
      //     this.weightOunces = "0";
      //     break;
      //   case "Water bottle":
      //     this.packageType = "Box";
      //     this.itemLength = "13";
      //     this.itemWidth = "10";
      //     this.itemHeight = "5";
      //     this.weight = "2";
      //     this.weightOunces = "0";
      //     break;
      //   case "Stuffed toy":
      //     this.packageType = "Box";
      //     this.itemLength = "12";
      //     this.itemWidth = "10";
      //     this.itemHeight = "6";
      //     this.weight = "2";
      //     this.weightOunces = "0";
      //     break;
      //   case "Bed sheet":
      //     this.packageType = "Box";
      //     this.itemLength = "12";
      //     this.itemWidth = "12";
      //     this.itemHeight = "4";
      //     this.weight = "4";
      //     this.weightOunces = "0";
      //     break;
      //   case "Towel":
      //     this.packageType = "Box";
      //     this.itemLength = "15";
      //     this.itemWidth = "12";
      //     this.itemHeight = "3";
      //     this.weight = "2";
      //     this.weightOunces = "0";
      //     break;
      //   case "Tool box":
      //     this.packageType = "Box";
      //     this.itemLength = "15";
      //     this.itemWidth = "12";
      //     this.itemHeight = "10";
      //     this.weight = "10";
      //     this.weightOunces = "0";
      //     break;
      //   case "Box - Shoe size":
      //     this.packageType = "Box";
      //     this.itemLength = "13";
      //     this.itemWidth = "12";
      //     this.itemHeight = "6";
      //     this.weight = "5";
      //     this.weightOunces = "0";
      //     break;
      //   case "Small Box":
      //     this.packageType = "Box";
      //     this.itemLength = "15";
      //     this.itemWidth = "12";
      //     this.itemHeight = "12";
      //     this.weight = "10";
      //     this.weightOunces = "0";
      //     break;
      //   case "Medium Box":
      //     this.packageType = "Box";
      //     this.itemLength = "18";
      //     this.itemWidth = "18";
      //     this.itemHeight = "16";
      //     this.weight = "20";
      //     this.weightOunces = "0";
      //     break;
      //   case "Large Box":
      //     this.packageType = "Box";
      //     this.itemLength = "18";
      //     this.itemWidth = "18";
      //     this.itemHeight = "24";
      //     this.weight = "30";
      //     this.weightOunces = "0";
      //     break;
      //   case "Bagpack - Carry on":
      //     this.packageType = "Box";
      //     this.itemLength = "17";
      //     this.itemWidth = "10";
      //     this.itemHeight = "9";
      //     this.weight = "10";
      //     this.weightOunces = "0";
      //     break;
      //   case "Luggage - Carry on":
      //     this.packageType = "Box";
      //     this.itemLength = "22";
      //     this.itemWidth = "14";
      //     this.itemHeight = "9";
      //     this.weight = "17";
      //     this.weightOunces = "0";
      //     break;
      //   case "Luggage - Check in size":
      //     this.packageType = "Box";
      //     this.itemLength = "30";
      //     this.itemWidth = "18";
      //     this.itemHeight = "14";
      //     this.weight = "46";
      //     this.weightOunces = "0";
      //     break;
      //   case "Documents":
      //     this.packageType = "Box";
      //     this.itemLength = "13";
      //     this.itemWidth = "10";
      //     this.itemHeight = "1";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Keys":
      //     this.packageType = "Box";
      //     this.itemLength = "6";
      //     this.itemWidth = "6";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Purse":
      //     this.packageType = "Box";
      //     this.itemLength = "15";
      //     this.itemWidth = "11";
      //     this.itemHeight = "7";
      //     this.weight = "7";
      //     this.weightOunces = "0";
      //     break;
      //   case "Wallet":
      //     this.packageType = "Box";
      //     this.itemLength = "6";
      //     this.itemWidth = "6";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Medication Pills":
      //     this.packageType = "Box";
      //     this.itemLength = "6";
      //     this.itemWidth = "6";
      //     this.itemHeight = "6";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Folder":
      //     this.packageType = "Box";
      //     this.itemLength = "13";
      //     this.itemWidth = "10";
      //     this.itemHeight = "1";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Jewelery":
      //     this.packageType = "Box";
      //     this.itemLength = "6";
      //     this.itemWidth = "6";
      //     this.itemHeight = "2";
      //     this.weight = "1";
      //     this.weightOunces = "0";
      //     break;
      //   case "Thermos":
      //     this.packageType = "Box";
      //     this.itemLength = "12";
      //     this.itemWidth = "10";
      //     this.itemHeight = "6";
      //     this.weight = "5";
      //     this.weightOunces = "0";
      //     break;
      //   case "Other":
      //     this.packageType = "";
      //     this.itemLength = "";
      //     this.itemWidth = "";
      //     this.itemHeight = "";
      //     this.weight = "";
      //     this.weightOunces = "";
      //     break;
      // }
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
        this.showValidateAlert = true;
        this.isLoading = false;
      } else {
        let venuePhoneNo = this.formatMobileNumber(
          this.autoCompleteAddress.phoneNo
        );
        let employeeMobileNo = this.formatMobileNumber(this.employeeMobileNo);
        this.showValidateAlert = false;
        const params = {
          venu_type:
            this.venueType === "Other" ? this.manualVenue : this.venueType,
          datse: moment(this.foundDate).format("YYYY-MM-DD"),
          venue_email: this.venueEmail,
          secondary_email: this.venueSecondaryEmail,
          venue_phone_no: venuePhoneNo,
          employee_mobile_no: employeeMobileNo,
          address:
            this.autoCompleteAddress.address === "Other"
              ? this.manualAddress
              : this.autoCompleteAddress.address,
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
    closeEditor() {
      this.showEditor = false;
      this.imgSrc = "";
      this.showCrop = false;
      this.showDraw = false;
      this.imgPreview = false;
      // this.enableEdit = false;
    },
    deleteEditable() {
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
              // this.enableEdit = false;
              this.image = "";
              this.$toast.info("Image Removed Successfully!");
            }
          })
          .catch((error) => {
            this.$toast.error("Something went wrong! Please try again.");
            this.isLoadingRemoveImage = false;
            console.log(error);
          });
      } else {
        // this.imgSrc = "";
        // this.image = "";
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
    async editImage() {
      this.showEditor = false;
      if (this.image) {
        const data = await fetch(this.image, { cache: "no-cache" });
        const blob = await data.blob();
        let reader = new FileReader();
        reader.onloadend = () => {
          this.imgSrc = reader.result;
          this.showEditor = true;
        };
        reader.readAsDataURL(blob);
      } else {
        this.showEditor = false;
      }
    },
    uploadImg(event) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const filePath = event.target?.files[0];
      if (filePath) {
        const fileSize = event.target?.files[0]?.size / 1024 / 1024;
        if (allowedExtensions.exec(filePath.name)) {
          if (fileSize < 2) {
            this.isImageValid = true;
            this.imageValidationMessage = "";
            let file = filePath;
            let reader = new FileReader();
            reader.onloadend = () => {
              this.imgSrc = reader.result;
              this.showEditor = true;
            };
            reader.readAsDataURL(file);
          } else {
            this.imageValidationMessage = "File size must under 2MB";
            this.isImageValid = false;
            return;
          }
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
      this.deleteEditable();
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
            this.$toast.info("Image Saved Successfully!");
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
            responseItemData.forEach((item) => {
              if (!this.itemDescriptionOptions.includes(item)) {
                this.itemDescriptionOptions.unshift(item);
              }
            });
            this.itemDescription = this.itemDescriptionOptions[0];
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
    // itemDescription(value) {
    //   switch (value) {
    //     case "Laptop":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "18";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "6";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Tablet":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "12";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "2";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Cell phone":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "9";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Mobile Phone":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "9";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Pillow":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "20";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "3";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Shoes":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "14";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "7";
    //       this.weight = this.weight ? this.weight : "3";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Slipper":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "13";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "8";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Socks":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "8";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "4";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Headphone":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "12";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "4";
    //       this.weight = this.weight ? this.weight : "2";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Earphone":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "6";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Wristwatch":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "6";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "ID":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "6";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Credit Card":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "6";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Passport":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "6";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Phone charger":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "6";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Charger for Laptop":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "8";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "8";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "2";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Blanket":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "20";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "3";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Shirt":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "12";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "2";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Pant":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "12";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "2";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "T-shirt":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "12";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "2";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Clothes":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "12";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "2";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Jacket":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "18";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "3";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Suit":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "15";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "7";
    //       this.weight = this.weight ? this.weight : "4";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Water bottle":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "13";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "5";
    //       this.weight = this.weight ? this.weight : "2";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Stuffed toy":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "12";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "2";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Bed sheet":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "12";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "4";
    //       this.weight = this.weight ? this.weight : "4";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Towel":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "15";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "3";
    //       this.weight = this.weight ? this.weight : "2";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Tool box":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "15";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "10";
    //       this.weight = this.weight ? this.weight : "10";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Box - Shoe size":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "13";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "5";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Small Box":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "15";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "12";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "12";
    //       this.weight = this.weight ? this.weight : "10";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Medium Box":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "18";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "18";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "16";
    //       this.weight = this.weight ? this.weight : "20";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Large Box":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "18";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "18";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "24";
    //       this.weight = this.weight ? this.weight : "30";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Bagpack - Carry on":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "17";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "9";
    //       this.weight = this.weight ? this.weight : "10";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Luggage - Carry on":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "22";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "14";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "9";
    //       this.weight = this.weight ? this.weight : "17";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Luggage - Check in size":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "30";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "18";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "14";
    //       this.weight = this.weight ? this.weight : "46";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Documents":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "13";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "1";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Keys":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "6";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Purse":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "15";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "11";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "7";
    //       this.weight = this.weight ? this.weight : "7";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Wallet":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "6";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Medication Pills":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "6";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Folder":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "13";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "1";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Jewelery":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "6";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "6";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "2";
    //       this.weight = this.weight ? this.weight : "1";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Thermos":
    //       this.packageType = this.packageType ? this.packageType : "Box";
    //       this.itemLength = this.itemLength ? this.itemLength : "12";
    //       this.itemWidth = this.itemWidth ? this.itemWidth : "10";
    //       this.itemHeight = this.itemHeight ? this.itemHeight : "6";
    //       this.weight = this.weight ? this.weight : "5";
    //       this.weightOunces = this.weightOunces ? this.weightOunces : "0";
    //       break;
    //     case "Other":
    //       this.packageType = "";
    //       this.itemLength = "";
    //       this.itemWidth = "";
    //       this.itemHeight = "";
    //       this.weight = "";
    //       this.weightOunces = "";
    //       break;
    //   }
    // },
  },
  async mounted() {
    await this.getItemDescriptionOptions();
    window.addEventListener("keydown", () => {
      this.showValidateAlert = false;
    });
    window.addEventListener("click", () => {
      this.showValidateAlert = false;
    });
    if (this.$route.query.id) {
      this.isLoadingItemDetails = true;
      this.foundItemId = this.$route.query.id;
      this.senderFormTitle = "EDIT SENDER'S DETAILS";
      this.foundItemFormTitle = "EDIT FOUND ITEM'S DETAILS";
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
            this.foundDate = new Date(data.datse);
            this.venueEmail = data.venue_email;
            this.venueSecondaryEmail = data.secondary_email;
            this.employeeMobileNo = data.employee_mobile_no;
            this.addressArr.unshift(data.address);
            this.address = data.address;
            this.autoCompleteAddress.address = this.addressArr[0];
            // this.manualAddress = data.address;
            this.autoCompleteAddress.phoneNo = data.venue_phone_no;
            this.autoCompleteAddress.city = data.city;
            this.autoCompleteAddress.state = data.states;
            this.autoCompleteAddress.country = data.country;
            this.autoCompleteAddress.zipcode = data.zipcode;
            this.image = data.image;
            this.itemDescription = data.item_description;
            this.packageType = data.package_type;
            this.weight = data.weight_pounds;
            this.weightOunces = data.weight_ounces;
            this.itemLength = data.item_length;
            this.itemWidth = data.item_width;
            this.itemHeight = data.item_height;
            this.itemStatus = data.item_status === 0 ? "Claimed (You know the actual owner of this item)" : "Unclaimed (You do not know the actual owner of this item)";
            
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
      this.senderFormTitle = "EDIT SENDER'S DETAILS";
      this.foundItemFormTitle = "EDIT FOUND ITEM'S DETAILS";
      let data = this.$route.params.itemDetails;
      var index = this.venueOptions.indexOf(data.venu_type) !== -1;
      if (index) this.venueType = data.venu_type;
      else {
        this.venueType = "Other";
        this.manualVenue = data.venu_type;
      }
      if (data.foundItemId) {
        this.foundItemId = data.foundItemId;
      } else {
        this.foundItemId = data.id;
      }
      this.foundDate = new Date(data.datse);
      this.venueEmail = data.venue_email;
      this.venueSecondaryEmail = data.secondary_email;
      this.employeeMobileNo = data.employee_mobile_no;
      this.addressArr.unshift(data.address);
      this.address = data.address;
      this.autoCompleteAddress.address = this.addressArr[0];
      // this.manualAddress = data.manualAddress;
      this.autoCompleteAddress.phoneNo = data.venue_phone_no;
      this.autoCompleteAddress.city = data.city;
      this.autoCompleteAddress.state = data.states;
      this.autoCompleteAddress.country = data.country;
      this.autoCompleteAddress.zipcode = data.zipcode;
      this.imageKey = data.image_key;
      this.image = data.image;
      this.itemDescription = data.item_description;
      this.packageType = data.package_type;
      this.weight = data.weight_pounds;
      this.weightOunces = data.weight_ounces;
      this.itemLength = data.item_length;
      this.itemWidth = data.item_width;
      this.itemHeight = data.item_height;
      this.itemStatus = data.item_status === 0 ? "Claimed (You know the actual owner of this item)" : "Unclaimed (You do not know the actual owner of this item)";

      if (data.item_status === 0) {
        this.receiverName = data.receiver_name;
        this.receiverEmail = data.receiver_email;
        this.receiverMobileNo = data.receiver_mobile_no;
      }
    } else {
      this.senderFormTitle = "SENDER'S DETAILS";
      this.foundItemFormTitle = "FOUND ITEM'S DETAILS";
    }
  },
  beforeDestroy() {
    window.removeEventListener("click", () => {});
    window.removeEventListener("keydown", () => {});
  },
};
</script>

<style lang="scss">
.mx-input-wrapper i {
  margin-right: 10px;
}
.mx-input:hover {
  @apply border-gray-300;
}
.mx-datepicker {
  width: 100% !important;
}
.mx-datepicker input {
  height: 3rem;
  border-radius: 0.5rem;
  border-color: rgb(212 212 212);
  cursor: pointer;
}
.wrapper-form {
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

.top-margin-05 {
  margin-top: 0.5rem !important;
}

.previewCard h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: revert;
  font-weight: revert;
}

canvas {
  object-fit: contain;
}

.error {
  & > .mx-datepicker {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 rounded-lg transition-none;
  }
}

.error {
  & > .vue-tel-input {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 rounded-lg  transition-none;
  }
}

.top-margin-3 {
  margin-top: 3px !important;
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

.vue-tel-input {
  border-radius: 0.5rem;
  border: 1px solid #cccccc;
}
.vti__dropdown-list {
  z-index: 100;
}
.vti__input {
  border-radius: 50px;
}

.loader {
  border-top-color: orange;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.pac-item {
  padding: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ececec;
  }
}

.pac-item-query {
  font-size: 14px;
}

.readonly .vti__dropdown,
.readonly input {
  @apply bg-gray-100 cursor-pointer;
}

.toasted-container .toasted .action.icon svg {
  font-size: 16px;
}
</style>