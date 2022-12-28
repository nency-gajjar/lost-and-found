<template>
  <div class="wrapper-admin" v-if="Object.keys(itemDetails).length > 0">
    <ValidationObserver class="flex justify-center w-full" v-slot="{ validate }" ref="observerMain">
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
                <h3 class="text-white">Edit Image</h3>
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
                    <BaseButton :is-loading="isSavingImage" @click="saveImg">
                      Save
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BaseCard class="md:w-8/12 lg:w-7/12 xl:w-6/12 overflow-hidden">
        <section>
          <div class="main-title bg-accent-100 text-white mb-3">
            <BaseHeader varient="details">ITEM DETAILS</BaseHeader>
          </div>
          <div class="sections py-4 px-6">
            <div class="form-title">
              <BaseHeader varient="accent">Sender's Details:</BaseHeader>
            </div>
            <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                Sender Affiliation
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block"
                >
                  <BaseInput
                    v-model="itemDetails.venu_type"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                Found Item Date
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                >
                  <client-only>
                    <div :class="errors.length && 'error'">
                      <date-picker
                        v-model="itemDetails.datse"
                        format="MM-DD-YYYY"
                      ></date-picker>
                    </div>
                  </client-only>
                </ValidationProvider>
              </div>
            </div>
            <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                Venue Email
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|email"
                  class="block"
                  name="Venue Email"
                >
                  <BaseInput
                    v-model="itemDetails.venue_email"
                    type="email"
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
            </div>
            <div
              v-if="itemDetails.secondary_email"
              class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col"
            >
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                Venue Secondary Email
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="email"
                  class="block"
                  name="Email"
                >
                  <BaseInput
                    v-model="itemDetails.secondary_email"
                    type="email"
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
            </div>
            <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                Venue Phone No.
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <div
                  class="block relative box-content h-12"
                  :class="!isVenuePhoneValid && 'error'"
                >
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
                    v-model="itemDetails.venue_phone_no"
                    @blur="validateVenuePhoneNo"
                    @validate="validateVenuePhoneFormat"
                    v-bind="bindPhoneInputProps"
                  ></vue-tel-input>
                  <div
                    v-if="!isVenuePhoneValid"
                    class="
                      vee-validation-error
                      text-sm text-red-600
                    "
                  >
                    {{ venuePhoneValidationMessage }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col" :class="venuePhoneValidationMessage && 'pt-5'">
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                Employee Mobile No.
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <div
                  class="block box-content h-12"
                  :class="[
                    isEmployeeMobileNoValid && '!mt-0',
                    !isEmployeeMobileNoValid && 'error'
                  ]"
                >
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
                    v-model="itemDetails.employee_mobile_no"
                    v-bind="bindPhoneInputProps"
                    @blur="validateEmployeeMobileNo"
                    @validate="validateEmployeePhoneFormat"
                  ></vue-tel-input>
                </div>
                <div
                  v-if="!isEmployeeMobileNoValid && employeePhoneValidationMessage"
                  class="vee-validation-error text-sm text-red-600"
                >
                  {{ employeePhoneValidationMessage }}
                </div>
              </div>
            </div>
          </div>

          <div data-v-272705a6="" class="flex items-center my-2">
            <div
              class="
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
              <BaseHeader varient="accent">Address Details::</BaseHeader>
            </div>

            <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                Address
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block"
                >
                  <BaseInput
                    v-model="itemDetails.address"
                    id="autocomplete-admin-item"
                    type="text"
                    placeholder=""
                    @input="getAddress"
                    :class="errors.length > 0 && 'error'"
                  >
                  </BaseInput>
                </ValidationProvider>
              </div>
            </div>
            <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                City
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block"
                >
                  <BaseInput
                    v-model="itemDetails.city"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                State
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block"
                >
                  <BaseInput
                    v-model="itemDetails.states"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                Country
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  class="block"
                >
                  <BaseInput
                    v-model="itemDetails.country"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
              <div
                class="
                  text-left text-gray-600
                  font-medium
                  w-250-px
                  lg:w-4/12
                  md:w-5/12
                  sm:w-6/12
                "
              >
                Zipcode
              </div>
              <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|max:10"
                  class="block"
                >
                  <BaseInput
                    v-model="itemDetails.zipcode"
                    type="text"
                    :class="errors.length > 0 && 'error'"
                  />
                </ValidationProvider>
              </div>
            </div>
          </div>

          <div data-v-272705a6="" class="flex items-center my-2">
            <div
              class="
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
              <BaseHeader varient="accent">Found Item's Details:</BaseHeader>
            </div>

            <div class="flex foundItemContainer">
              <div class="flex flex-col grow">
                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-250-px
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Item Description
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="block"
                    >
                      <div :class="errors.length > 0 && isItemDescriptionFocused && 'error'">
                        <vue-simple-suggest
                          @blur="isItemDescriptionFocused = true"
                          v-model="itemDetails.item_description"
                          :list="itemDescriptionOptions"
                          :filter-by-query="true">
                        </vue-simple-suggest>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-250-px
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Package Type
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      class="block"
                    >
                      <BaseSelect
                        v-model="itemDetails.package_type"
                        :options="packageTypeOptions"
                        :class="errors.length > 0 && 'error'"
                      />
                    </ValidationProvider>
                  </div>
                </div>
                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-250-px
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Weight Pounds
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|int|positiveNumber"
                      class="block"
                      name="Pounds"
                    >
                      <BaseInput
                        v-model="itemDetails.weight_pounds"
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
                </div>
                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-250-px
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Weight Ounces
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full"
                  >
                    <div class="block">
                      <BaseSelect
                        v-model="itemDetails.weight_ounces"
                        :options="weightOuncesOptions"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-250-px
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Length
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|float|positiveNumber"
                      class="block"
                      name="Length"
                    >
                      <BaseInput
                        v-model="itemDetails.item_length"
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
                </div>
                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-250-px
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Width
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|float|positiveNumber"
                      class="block"
                      name="Length"
                    >
                      <BaseInput
                        v-model="itemDetails.item_width"
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
                </div>
                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-250-px
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Height
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|float|positiveNumber"
                      class="block"
                      name="Length"
                    >
                      <BaseInput
                        v-model="itemDetails.item_height"
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
                </div>
                <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                  <div
                    class="
                      text-left text-gray-600
                      font-medium
                      w-250-px
                      lg:w-4/12
                      md:w-5/12
                      sm:w-6/12
                    "
                  >
                    Item Status
                  </div>
                  <div
                    class="text-gray-600 text-left md:w-7/12 sm:w-6/12"
                  >
                    {{ itemDetails.item_status === 0 ? "Claimed" : "Unclaimed" }}
                  </div>
                </div>
                <template v-if="!itemDetails.item_status">
                  <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                    <div
                      class="
                        text-left text-gray-600
                        font-medium
                        w-250-px
                        lg:w-4/12
                        md:w-5/12
                        sm:w-6/12
                      "
                    >
                      Receiver's Name
                    </div>
                    <div
                      class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full"
                    >
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        class="block"
                      >
                        <BaseInput
                          v-model="itemDetails.receiver_name"
                          type="text"
                          :class="errors.length > 0 && 'error'"
                        />
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                    <div
                      class="
                        text-left text-gray-600
                        font-medium
                        w-250-px
                        lg:w-4/12
                        md:w-5/12
                        sm:w-6/12
                      "
                    >
                      Receiver's Email
                    </div>
                    <div
                      class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full"
                    >
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|email"
                        class="block"
                        name="Reciever Email"
                      >
                        <BaseInput
                          v-model="itemDetails.receiver_email"
                          type="email"
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
                  </div>

                  <div class="flex sm:items-center items-start mt-3 flex-wrap md:flex-nowrap sm:flex-row flex-col">
                    <div
                      class="
                        text-left text-gray-600
                        font-medium
                        w-250-px
                        lg:w-4/12
                        md:w-5/12
                        sm:w-6/12
                      "
                    >
                      Receiver's Mobile No.
                    </div>
                    <div
                      class="text-gray-600 text-left md:w-7/12 sm:w-6/12 w-full"
                    >
                      <div
                        class="block relative box-content h-12"
                        :class="!isReceiverMobileNoValid && 'error'"
                      >
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
                          v-model="itemDetails.receiver_mobile_no"
                          @blur="validateReceiverMobileNo"
                          @validate="validateReceiverPhoneFormat"
                          v-bind="bindPhoneInputProps"
                        ></vue-tel-input>
                        <div
                          v-if="!isReceiverMobileNoValid"
                          class="vee-validation-error mt-2 text-sm text-red-600"
                        >
                          {{ receiverPhoneValidationMessage }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="flex item-img-container mt-16-px items-center justify-center">
                <div v-if="image" class="flex items-center justify-center mt-4 sm:mt-0 w-48 w-full">
                  <img class="w-full object-cover" :src="image" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 m-5">
            <BaseButton
              :is-loading="isLoading['Approve']"
              class="flex-1"
              @click="validate().then(handleItemApprove('Approve'))"
              :disabled="
                isLoading['Approve'] || isLoading['Approve without Image']
              "
            >
              Approve
            </BaseButton>
            <BaseButton
              class="flex-1"
              @click="showItemRejectDialog = true"
              :disabled="
                isLoading['Approve'] || isLoading['Approve without Image']
              "
            >
              Reject
            </BaseButton>
            <BaseButton
              :is-loading="isLoading['Approve without Image']"
              class="flex-auto"
              @click="validate().then(handleItemApprove('Approve without Image'))"
              :disabled="
                isLoading['Approve'] || isLoading['Approve without Image']
              "
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
            <BaseButton class="w-full" :is-loading="isLoadingEditImage" varient="secondary" @click="editImage()"
              >Edit Image</BaseButton
            >
          </div>
        </section>
      </BaseCard>
    </ValidationObserver>
    <BaseDialog
      v-if="showDialog"
      :showDialog="showDialog"
      :icon="{ name: 'circle-check', color: 'green', size: '3x' }"
      :message="dialogMessage"
      :title="dialogTitle"
      buttonTitle="Okay"
      @close="
        showDialog = false;
        $router.push('/dashboard');
      "
    />
    <BaseDialog
      v-if="showItemRejectDialog"
      :showDialog="showItemRejectDialog"
      :icon="{ name: 'circle-info', color: 'blue', size: '3x' }"
      :message="dialogMessage"
      title="Please enter rejection reason"
      :showClose="false"
      @close="closeRejectDialog"
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
                v-model="rejectReason"
                placeholder="Reject Reason"
                class="
                  border
                  inline-block
                  border-gray-300
                  w-full
                  rounded-lg
                  px-4
                  h-full
                  text-base
                  pt-4
                  pb-2
                  transition-shadow
                  text-gray-700
                "
                :class="errors.length > 0 && 'error'"
              ></textarea>
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
        >
          Submit
        </BaseButton>
      </template>
    </BaseDialog>
  </div>
</template>
  
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import RedactImage from "~/components/redactEditor/RedactImage.vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import ImageEditor from "@/mixins/imageEditor";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
import formatMobileNumber from "../../../mixins/formatMobileNumber.js";
import { weightOuncesOptions } from "static/defaults.js";
import scrollToError from "../../../mixins/scrollToError.js";
import _ from "lodash";
import VueSimpleSuggest from 'vue-simple-suggest';
import 'vue-simple-suggest/dist/styles.css';

export default {
  middleware({ $auth, redirect, route }) {
    if (!$auth.loggedIn) {
      return redirect(`/login?redirect=${route.path}?id=${route.query.id}`);
    }
  },
  mixins: [ImageEditor, formatMobileNumber, scrollToError],
  components: {
    RedactImage,
    VueCropper,
    ValidationObserver,
    ValidationProvider,
    DatePicker,
    VueSimpleSuggest
  },
  data() {
    return {
      isItemDescriptionFocused: false,
      isLoading: {
        Approve: false,
        Deny: false,
        "Approve without Image": false,
      },
      isLoadingItemDetails: false,
      responseData: {},
      itemDetails: {},
      itemDescriptionOptions: [],
      packageTypeOptions: ["Box", "Envelope"],
      isImageEdited: false,
      imageRecognitionData: [],
      weightOuncesOptions: weightOuncesOptions,
      showDialog: false,
      isLoadingEditImage: false,
      showItemRejectDialog: false,
      dialogTitle: "",
      dialogMessage: "",
      rejectReason: "",
      isVenuePhoneValid: true,
      isEmployeeMobileNoValid: true,
      isReceiverMobileNoValid: true,
      isVenuePhoneFormatValid: true,
      isEmployeeMobileNoFormatValid: true,
      isReceiverMobileNoFormatValid: true,
      venuePhoneValidationMessage: "",
      employeePhoneValidationMessage: "",
      receiverPhoneValidationMessage: "",
    };
  },
  async mounted() {
    if (this.$route.query.id) {
      this.isLoadingItemDetails = true;
      this.$axios
        .get("/getsinglelostitem?id=" + this.$route.query.id)
        .then((response) => {
          if (response.status === 200) {
            this.isLoadingItemDetails = false;
            this.responseData = {...response.data.data.Item};
            this.itemDetails = {...response.data.data.Item};
            this.itemDetails.weight_ounces = String(this.itemDetails.weight_ounces);
            this.itemDetails.datse = new Date(this.itemDetails.datse);
            this.image = this.responseData.image;
          }
        })
        .catch((error) => {
          this.$toast.error("Something went wrong! Please try again.");
          console.log(error);
        });
      await this.getItemDescriptionOptions();
    } else {
      this.$nextTick(() => {
        this.$router.push({
          name: "lost-items",
        });
      });
    }
  },
  methods: {
    getItemDescriptionOptions() {
      return new Promise((resolve) => {
        this.$axios
          .get("/viewallItemdescriptionDetails")
          .then((response) => {
            if (response.status === 200) {
              let itemDescriptionResponse = response.data?.data?.Items || [];
              this.itemDescriptionOptions = itemDescriptionResponse.map(
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
      if (this.itemDetails.address == "") {
        document.getElementById("autocomplete-admin-item").placeholder = "";
      }
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete-admin-item")
      );
      autocomplete.addListener("place_changed", () => {
        let address = autocomplete.getPlace();
        this.itemDetails.address = address.formatted_address;

        address.address_components.forEach((component) => {
          component.types.forEach((type) => {
            if (type === "locality") {
              this.itemDetails.city = component.long_name;
            }
            if (type === "administrative_area_level_1") {
              this.itemDetails.states = component.long_name;
            }
            if (type === "country") {
              this.itemDetails.country = component.long_name;
            }
            if (type === "postal_code") {
              this.itemDetails.zipcode = component.long_name;
            }
          });
        });
      });
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
      if (!this.itemDetails.venue_phone_no) {
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
      if (!this.itemDetails.employee_mobile_no) {
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
      if (!this.itemDetails.receiver_mobile_no) {
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
    async handleItemApprove(type) {
      const isValid = await this.$refs.observerMain.validate();

      this.validateVenuePhoneNo();
      this.validateEmployeeMobileNo();
      if (this.responseData.item_status === 0) this.validateReceiverMobileNo();

      if(
        isValid &&
        this.isVenuePhoneValid &&
        this.isEmployeeMobileNoValid &&
        this.isReceiverMobileNoValid
      ) {
        this.isLoading[type] = true;
        let params = {...this.itemDetails};
        params.datse = moment(this.itemDetails.datse).format("YYYY-MM-DD");
        params.venue_phone_no = this.formatMobileNumber(this.itemDetails.venue_phone_no);
        params.employee_mobile_no = this.formatMobileNumber(this.itemDetails.employee_mobile_no);
        if(this.responseData.item_status === 0){
          params.receiver_mobile_no = this.formatMobileNumber(this.itemDetails.receiver_mobile_no);
        }

        if (this.itemDetails.image && type === "Approve" && this.isImageEdited) {
          params.image = this.image;
        }

        params.is_default = type;
        params.it_type = 1;

        // compare objects

        const diff = Object.keys(this.responseData).reduce((result, key) => {
          if (!params.hasOwnProperty(key)) {
            result.push(key);
          } else if (_.isEqual(this.responseData[key], params[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
          }
          return result;
        }, Object.keys(params));
        let requestData = {};
        diff.forEach((key) => {
          if (params[key] != undefined) {
            requestData[key] = params[key];
          }
        });

        await this.handleUpdateLostItem(requestData, type);
      } else {
        this.scrollToError();
      }
    },
    async handleItemReject() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        this.isLoading["Deny"] = false;
      } else {
        const params = {
          is_default: "Deny",
          reject_reason: this.rejectReason
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
    closeRejectDialog() {
      this.showItemRejectDialog = false;
      this.dialogTitle = "";
      this.dialogMessage = "";
      this.rejectReason = "";
    },
  },
};
</script>
  
<style lang="scss">
@import "./assets/styles/image-editor.scss";
@import "./assets/styles/date-picker.scss";
@import "./assets/styles/phone-number-input.scss";
.wrapper-admin {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}

textarea.error {
  @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
}

.mt-16-px {
  margin-top: 16px;
}

.w-250-px {
  width: 200px;
}

.vs__dropdown-toggle {
  @apply h-12 border border-gray-300 rounded-lg;
}

.error {
  .vs__dropdown-toggle {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
  }
}

.vs__actions{
  display: none !important;
}

.item-img-container{
  @apply pl-3;
}

.input-wrapper {
  input{
    border-width: 1px !important;
    --tw-border-opacity: 1 !important;
    border-color: rgb(209 213 219 / var(--tw-border-opacity)) !important;
    border-radius: 0.5rem !important;
  }
}

.error {
  .input-wrapper {
    input{
      border-width: 2px !important;
      --tw-border-opacity: 1 !important;
      border-color: rgb(239 68 68 / var(--tw-border-opacity)) !important;
      --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
      --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
      --tw-ring-color: rgb(239 68 68 / var(--tw-ring-opacity));
      --tw-ring-opacity: 0.1;
      transition-property: none;
    }
  }
}

@media only screen and (max-width: 1170px) {
  .foundItemContainer {
    @apply flex-col;
  }
  .item-img-container{
    @apply pl-0;
  }
}
</style>

<style scoped>
.mb-8 {
  margin-bottom: 0 !important;
}
</style>