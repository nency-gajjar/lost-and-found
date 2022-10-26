<template>
  <div class="wrapper-form">
    <div
      class="
        card
        w-full
        mx-6
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
            <div class="card p-6 space-y-4">
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
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  v-model="venue"
                  :options="venueArr"
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
              <ValidationProvider
                v-if="venueManually"
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  v-model="manualVenue"
                  type="text"
                  label="Type here manually..."
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  v-model="foundDate"
                  type="date"
                  label="Found Item Date"
                  :class="errors.length > 0 && 'error'"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseInput
                  v-model="address"
                  id="autocomplete"
                  type="text"
                  :label="displayVenueName"
                  :class="errors.length > 0 && 'error'"
                  @input="getAddress"
                >
                  <!-- <template v-slot:icon>
                    <div
                      class="absolute inset-y-0 right-0 pr-5 flex items-center"
                    >
                      <img
                        v-if="!isLoadingAddresses"
                        class="addres-icon"
                        src="@/assets/icons/location_cursor_solid.svg"
                        alt
                      />
                    </div>
                  </template> -->
                </BaseInput>
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

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
              <div class="block relative box-content h-12">
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
                  v-model="employeePhone"
                  v-bind="bindPhoneInputProps"
                  @blur="validateEmployeePhoneNumber"
                ></vue-tel-input>
              </div>
              <div class="flex items-center" style="margin: 2px 2px !important">
                <font-awesome-icon
                  class="shieldIcon"
                  :icon="['fas', 'shield-alt']"
                />
                &nbsp;&nbsp;
                <p style="color: #03993b; font-size: 14px">
                  Your contact will not be shared with anyone.
                </p>
              </div>
              <div
                v-if="!isEmployeePhoneValid"
                class="vee-validation-error top-margin-05 text-sm text-red-600"
              >
                *Required
              </div>
              <p>Address:</p>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  v-model="autoCompleteAddress.address"
                  :options="addressArr"
                  label="Auto select address"
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
                <div class="block relative box-content h-12">
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
                        autoCompleteAddress.phoneNumber && autoAddressSelected,
                    }"
                    v-model="autoCompleteAddress.phoneNumber"
                    @blur="validateVenuePhoneNumber"
                    v-bind="bindPhoneInputProps"
                  ></vue-tel-input>
                </div>
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
            <div class="flex mt-2">
              <span
                class="
                  w-full
                  border-t border-solid border-gray-200
                  inline-block
                "
              ></span>
            </div>
            <div class="card p-6 space-y-4">
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
                  class="block mb-2 text-sm font-medium text-gray-800"
                  for="itemImage"
                  >Found item image</label
                >
                <div class="h-12 flex">
                  <input
                    @change="uploadImg($event)"
                    class="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded-lg
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700
                      focus:bg-white
                      focus:border-blue-600
                      focus:outline-none
                    "
                    id="itemImage"
                    type="file"
                  />
                  <div v-show="image" class="flex">
                    <a
                      @click="editImage"
                      class="
                        text-indigo-600
                        hover:cursor-pointer hover:text-indigo-900
                        ml-3
                        py-2
                        inline-flex
                        items-center
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <div class="mt-3" v-if="image">
                  <img :src="image" alt="Item image" />
                </div>
              </div>
              <base-dialog v-show="actionModal">
                <div class="relative">
                  <div class="title bg-accent-100 pl-6 py-4 mb-4">
                    <h3 class="text-white">{{ actionTitle }}</h3>
                  </div>
                  <span
                    @click="actionModal = false"
                    class="
                      absolute
                      right-5
                      top-5
                      inline-block
                      z-10
                      cursor-pointer
                    "
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
                    flex-col
                    justify-around
                    items-center
                    editor-container
                  "
                >
                  <div class="w-full text-center px-4 text-xl">
                    {{ actionMessage }}
                  </div>
                  <div class="w-full flex justify-end mr-10">
                    <button
                      type="button"
                      @click="actionModal = false"
                      class="
                        font-medium
                        text-md
                        leading-5
                        uppercase
                        py-2
                        px-6
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
                    >
                      Close
                    </button>
                  </div>
                </div>
              </base-dialog>
              <base-dialog v-show="showEditor">
                <div class="relative">
                  <div class="title bg-accent-100 pl-6 py-4 mb-4">
                    <h3 class="text-white">Crop Image</h3>
                  </div>
                  <span
                    @click="showEditor = false"
                    class="
                      absolute
                      right-5
                      top-5
                      inline-block
                      z-10
                      cursor-pointer
                    "
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
                  <!-- <div
                    class="top-margin-3 flex justify-center"
                    v-show="loadingSpinner"
                    role="status"
                  >
                    <svg
                      aria-hidden="true"
                      class="
                        mr-2
                        w-16
                        h-16
                        text-gray-200
                        animate-spin
                        fill-blue-600
                      "
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div> -->
                  <div class="w-full">
                    <div class="px-6">
                      <Editor
                        :canvasWidth="canvasWidth"
                        :canvasHeight="canvasHeight"
                        ref="editor"
                      />
                    </div>
                    <div class="editor-tools mt-5 px-6 border-t pt-4">
                      <div class="icons">
                        <div>
                          <div class="tool-undo">
                            <rotate-ccw-icon
                              :size="size_icon"
                              @click="undo()"
                            ></rotate-ccw-icon>
                          </div>
                          <p>Undo</p>
                        </div>
                        <div>
                          <div class="tool-redo">
                            <rotate-cw-icon
                              :size="size_icon"
                              @click="redo()"
                            ></rotate-cw-icon>
                          </div>
                          <p>Redo</p>
                        </div>
                        <div>
                          <div class="tool-trash">
                            <trash-2-icon
                              :size="size_icon"
                              @click="deleteEditable()"
                            ></trash-2-icon>
                          </div>
                          <p>Delete</p>
                        </div>
                        <!-- <div class="tool-freeDrawing">	
                        <edit-2-icon	
                          :size="size_icon"	
                          @click="freeDrawing()"	
                        ></edit-2-icon>	
                      </div>	 -->
                        <!-- <div>
                          <div class="tool-addCircle">
                            <circle-icon
                              :size="size_icon"
                              @click="addCicle()"
                            ></circle-icon>
                          </div>
                          <p>Circle</p>
                        </div> -->
                        <div>
                          <div class="tool-addSquare">
                            <square-icon
                              :size="size_icon"
                              @click="addSquare()"
                            ></square-icon>
                          </div>
                          <p>Square</p>
                        </div>
                        <div>
                          <div class="tool-crop">
                            <maximize-icon
                              v-if="stateCrop"
                              :size="size_icon"
                              @click="crop()"
                            ></maximize-icon>
                            <check-icon
                              v-else
                              :size="size_icon"
                              @click="applyCrop()"
                            ></check-icon>
                          </div>
                          <p v-if="stateCrop">Crop</p>
                          <p v-else>Done</p>
                        </div>
                      </div>
                      <div class="save-upload">
                        <button
                          type="button"
                          :class="{ 'button--loading': isSavingImage }"
                          @click="saveImg"
                          class="
                            font-medium
                            text-md
                            leading-5
                            uppercase
                            py-2
                            px-6
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
                        >
                          <span class="button__text">
                            <save-icon :size="size_icon"></save-icon> Save
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </base-dialog>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  v-model="itemDescription"
                  :options="itemDescriptionArr"
                  label="Item Description"
                  :class="errors.length > 0 && 'error'"
                  @input="setItemDetails"
                />
                <p
                  v-if="errors.length"
                  class="vee-validation-error mt-2 text-sm text-red-600"
                >
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block col-span-1"
              >
                <BaseSelect
                  v-model="packageType"
                  :options="packageTypeArr"
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
              <label class="block mb-1 text-sm font-medium text-gray-800"
                >Weight</label
              >
              <ValidationProvider
                v-slot="{ errors }"
                rules="max:28|required"
                class="block"
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
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  v-model="weightOunces"
                  :options="weightOuncesArr"
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
              <label class="block mb-1 text-sm font-medium text-gray-800"
                >Dimensions (Inches)</label
              >
              <div class="flex justify-between gap-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="max:28|required"
                  class="block lg:col-span-2"
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
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="max:28|required"
                  class="block lg:col-span-2"
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
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="max:28|required"
                  class="block lg:col-span-2"
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
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="block"
              >
                <BaseSelect
                  v-model="itemStatus"
                  :options="itemStatusArr"
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
              <template v-if="showReceiverInputs">
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
                <div class="block relative box-content h-12">
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
                    v-model="receiverPhone"
                    v-bind="bindPhoneInputProps"
                    @blur="validateReceiverPhoneNumber"
                  ></vue-tel-input>
                  <div
                    v-if="!isReceiverPhoneValid"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    *Required
                  </div>
                </div>
              </template>
              <div
                v-show="showValidateAlert"
                class="
                  p-4
                  mb-4
                  top-margin-alert
                  text-sm text-red-700
                  bg-red-100
                  rounded-lg
                  dark:bg-red-200 dark:text-red-800
                "
                role="alert"
              >
                <span class="font-medium">Oops!</span> Please fill all required
                fields and try submitting again.
              </div>
              <!-- onclick="this.classList.toggle('button--loading')" -->
              <div class="flex justify-end">
                <button
                  :class="{ 'button--loading': isLoading }"
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
                >
                  <span class="button__text"> Preview </span>
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <div v-else>
        <div
          wire:loading
          class="
            h-screen
            z-50
            overflow-hidden
            flex flex-col
            items-center
            justify-center
          "
        >
          <div
            class="
              loader
              ease-linear
              rounded-full
              border-4 border-t-4 border-gray-200
              h-12
              w-12
              mb-4
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseSelect from "~/components/base/BaseSelect.vue";
import BaseDialog from "~/components/base/BaseDialog.vue";
import Editor from "~/components/vueImageEditor/Editor.vue";
import { mapGetters } from "vuex";

import {
  CircleIcon,
  RotateCcwIcon,
  RotateCwIcon,
  Edit2Icon,
  Trash2Icon,
  SquareIcon,
  MaximizeIcon,
  SaveIcon,
  CheckIcon,
} from "vue-feather-icons";

export default {
  data: () => ({
    actionModal: false,
    actionMessage: "",
    actionTitle: "",
    showValidateAlert: false,
    senderFormTitle: "",
    foundItemFormTitle: "",
    venueName: "",
    venueEmail: "",
    venueSecondaryEmail: "",
    manualAddressSelected: false,
    manualAddress: "",
    address: "",
    // city: "",
    // state: "",
    // country: "",
    // zipcode: "",
    manualVenue: "",
    venue: "",
    venueArr: ["Hotel", "Restaurent", "Airport", "Other"],
    // venuePhone: "",
    employeePhone: "",
    foundDate: new Date().toISOString().slice(0, 10),
    venueManually: false,
    itemDescription: "",
    itemDescriptionArr: [
      "Laptop",
      "Tablet",
      "Cell phone",
      "Mobile Phone",
      "Pillow",
      "Shoes",
      "Slipper",
      "Socks",
      "Headphone",
      "Earphone",
      "Wristwatch",
      "ID",
      "Credit Card",
      "Passport",
      "Phone charger",
      "Charger for Laptop",
      "Blanket",
      "Shirt",
      "Pant",
      "T-shirt",
      "Clothes",
      "Jacket",
      "Suit",
      "Water bottle",
      "Stuffed toy",
      "Bed sheet",
      "Towel",
      "Tool box",
      "Box - Shoe size",
      "Small Box",
      "Medium Box",
      "Large Box",
      "Bagpack - Carry on",
      "Luggage - Carry on",
      "Luggage - Check in size",
      "Documents",
      "Keys",
      "Purse",
      "Wallet",
      "Medication Pills",
      "Folder",
      "Jewelery",
      "Thermos",
      "Other",
    ],
    packageType: "",
    packageTypeArr: ["Box", "Envelope"],
    weight: "",
    weightOunces: "",
    weightOuncesArr: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
    ],
    itemLength: "",
    itemWidth: "",
    itemHeight: "",
    itemStatus: "",
    itemStatusArr: ["Claimed", "Unclaimed"],
    showReceiverInputs: false,
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    responseData: {
      venueName: [],
      venueEmail: [],
      venuePhone: [],
    },
    addressArr: ["Other"],
    itemImage: "",
    canvasWidth: "600",
    canvasHeight: "400",
    showEditor: false,
    stateCrop: true,
    size_icon: "2x",
    isSavingImage: false,
    // loadingSpinner: false,
    imageRecognitionData: [],
    image: "",
    imageKey: "",
    bindPhoneInputProps: {
      mode: "international",
      autoDefaultCountry: true,
      validCharactersOnly: true,
      autoFormat: true,
      preferredCountries: ["US", "CN"],
      placeholder: "Enter a phone number",
      name: "telephone",
      maxLen: 15,
      // wrapperClasses: "",
      // inputClasses: "",
      inputOptions: {
        showDialCode: false,
      },
    },
    foundItemId: "",
    isLoading: false,
    isLoadingItemDetails: false,
    isVenuePhoneValid: true,
    isEmployeePhoneValid: true,
    isReceiverPhoneValid: true,
    currentPosition: {
      lat: null,
      long: null,
    },
    isLoadingAddresses: true,
    autoCompleteAddress: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      phoneNumber: "",
    },
    autoCompleteAddressArr: [],
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
    BaseInput,
    BaseSelect,
    BaseDialog,
    Editor,
    CircleIcon,
    RotateCcwIcon,
    RotateCwIcon,
    Edit2Icon,
    Trash2Icon,
    SquareIcon,
    MaximizeIcon,
    CheckIcon,
    SaveIcon,
  },
  computed: {
    ...mapGetters("item", ["itemDetails"]),
    displayVenueName() {
      if (this.venue === "Restaurent") {
        return "Restaurent Name";
      } else if (this.venue === "Hotel") {
        return "Hotel Name";
      } else if (this.venue === "Airport") {
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
    getCurrentPosition() {
      fetch("http://ip-api.com/json")
        .then((data) => {
          return data.json();
        })
        .then(async (data) => {
          this.currentPosition = { lat: data.lat, long: data.lon };
        });
    },
    getAddress() {
      // this.autoCompleteAddress = {};
      // this.isLoadingAddresses = true;
      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete")
        // {
        //   bounds: new google.maps.LatLngBounds(
        //     new google.maps.LatLng(
        //       this.currentPosition.lat,
        //       this.currentPosition.long
        //     )
        //   ),
        // }
        // {
        //   types: ["address"],
        //   fields: ["address_components", "geometry"],
        // }
      );
      autocomplete.addListener("place_changed", () => {
        this.autoCompleteAddress = {
          address: "",
          city: "",
          state: "",
          country: "",
          zipcode: "",
          phoneNumber: "",
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
        obj.address = this.addressArr[0];
        this.autoCompleteAddress.phoneNumber =
          address.international_phone_number || address.formatted_phone_number;
        ("");
        obj.phoneNumber = this.autoCompleteAddress.phoneNumber;

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
              phoneNumber: addressObj.phoneNumber,
            };
          }
        });
      }
    },
    resetAddressFields() {
      this.autoCompleteAddress = {
        address: "Other",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        phoneNumber: "",
      };
    },
    validateVenuePhoneNumber() {
      if (!this.autoCompleteAddress.phoneNumber) {
        this.isVenuePhoneValid = false;
      } else {
        this.isVenuePhoneValid = true;
      }
    },
    validateEmployeePhoneNumber() {
      if (!this.employeePhone) {
        this.isEmployeePhoneValid = false;
      } else {
        this.isEmployeePhoneValid = true;
      }
    },
    validateReceiverPhoneNumber() {
      if (!this.receiverPhone) {
        this.isReceiverPhoneValid = false;
      } else {
        this.isReceiverPhoneValid = true;
      }
    },
    formatMobileNumber(phoneNumber) {
      let arr = phoneNumber.split(" ");
      let countryCode = arr.shift();
      return countryCode + " " + arr.join("");
    },
    setItemDetails(value) {
      switch (value) {
        case "Laptop":
          this.packageType = "Box";
          this.itemLength = "18";
          this.itemWidth = "12";
          this.itemHeight = "6";
          this.weight = "6";
          this.weightOunces = "0";
          break;
        case "Tablet":
          this.packageType = "Box";
          this.itemLength = "12";
          this.itemWidth = "10";
          this.itemHeight = "6";
          this.weight = "2";
          this.weightOunces = "0";
          break;
        case "Cell phone":
          this.packageType = "Box";
          this.itemLength = "9";
          this.itemWidth = "6";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Mobile Phone":
          this.packageType = "Box";
          this.itemLength = "9";
          this.itemWidth = "6";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Pillow":
          this.packageType = "Box";
          this.itemLength = "20";
          this.itemWidth = "12";
          this.itemHeight = "6";
          this.weight = "3";
          this.weightOunces = "0";
          break;
        case "Shoes":
          this.packageType = "Box";
          this.itemLength = "14";
          this.itemWidth = "12";
          this.itemHeight = "7";
          this.weight = "3";
          this.weightOunces = "0";
          break;
        case "Slipper":
          this.packageType = "Box";
          this.itemLength = "13";
          this.itemWidth = "8";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Socks":
          this.packageType = "Box";
          this.itemLength = "8";
          this.itemWidth = "6";
          this.itemHeight = "4";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Headphone":
          this.packageType = "Box";
          this.itemLength = "12";
          this.itemWidth = "12";
          this.itemHeight = "4";
          this.weight = "2";
          this.weightOunces = "0";
          break;
        case "Earphone":
          this.packageType = "Box";
          this.itemLength = "6";
          this.itemWidth = "6";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Wristwatch":
          this.packageType = "Box";
          this.itemLength = "6";
          this.itemWidth = "6";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "ID":
          this.packageType = "Box";
          this.itemLength = "6";
          this.itemWidth = "6";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Credit Card":
          this.packageType = "Box";
          this.itemLength = "6";
          this.itemWidth = "6";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Passport":
          this.packageType = "Box";
          this.itemLength = "6";
          this.itemWidth = "6";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Phone charger":
          this.packageType = "Box";
          this.itemLength = "6";
          this.itemWidth = "6";
          this.itemHeight = "6";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Charger for Laptop":
          this.packageType = "Box";
          this.itemLength = "8";
          this.itemWidth = "8";
          this.itemHeight = "6";
          this.weight = "2";
          this.weightOunces = "0";
          break;
        case "Blanket":
          this.packageType = "Box";
          this.itemLength = "20";
          this.itemWidth = "12";
          this.itemHeight = "6";
          this.weight = "3";
          this.weightOunces = "0";
          break;
        case "Shirt":
          this.packageType = "Box";
          this.itemLength = "12";
          this.itemWidth = "10";
          this.itemHeight = "6";
          this.weight = "2";
          this.weightOunces = "0";
          break;
        case "Pant":
          this.packageType = "Box";
          this.itemLength = "12";
          this.itemWidth = "10";
          this.itemHeight = "6";
          this.weight = "2";
          this.weightOunces = "0";
          break;
        case "T-shirt":
          this.packageType = "Box";
          this.itemLength = "12";
          this.itemWidth = "10";
          this.itemHeight = "6";
          this.weight = "2";
          this.weightOunces = "0";
          break;
        case "Clothes":
          this.packageType = "Box";
          this.itemLength = "12";
          this.itemWidth = "10";
          this.itemHeight = "6";
          this.weight = "2";
          this.weightOunces = "0";
          break;
        case "Jacket":
          this.packageType = "Box";
          this.itemLength = "18";
          this.itemWidth = "12";
          this.itemHeight = "6";
          this.weight = "3";
          this.weightOunces = "0";
          break;
        case "Suit":
          this.packageType = "Box";
          this.itemLength = "15";
          this.itemWidth = "12";
          this.itemHeight = "7";
          this.weight = "4";
          this.weightOunces = "0";
          break;
        case "Water bottle":
          this.packageType = "Box";
          this.itemLength = "13";
          this.itemWidth = "10";
          this.itemHeight = "5";
          this.weight = "2";
          this.weightOunces = "0";
          break;
        case "Stuffed toy":
          this.packageType = "Box";
          this.itemLength = "12";
          this.itemWidth = "10";
          this.itemHeight = "6";
          this.weight = "2";
          this.weightOunces = "0";
          break;
        case "Bed sheet":
          this.packageType = "Box";
          this.itemLength = "12";
          this.itemWidth = "12";
          this.itemHeight = "4";
          this.weight = "4";
          this.weightOunces = "0";
          break;
        case "Towel":
          this.packageType = "Box";
          this.itemLength = "15";
          this.itemWidth = "12";
          this.itemHeight = "3";
          this.weight = "2";
          this.weightOunces = "0";
          break;
        case "Tool box":
          this.packageType = "Box";
          this.itemLength = "15";
          this.itemWidth = "12";
          this.itemHeight = "10";
          this.weight = "10";
          this.weightOunces = "0";
          break;
        case "Box - Shoe size":
          this.packageType = "Box";
          this.itemLength = "13";
          this.itemWidth = "12";
          this.itemHeight = "6";
          this.weight = "5";
          this.weightOunces = "0";
          break;
        case "Small Box":
          this.packageType = "Box";
          this.itemLength = "15";
          this.itemWidth = "12";
          this.itemHeight = "12";
          this.weight = "10";
          this.weightOunces = "0";
          break;
        case "Medium Box":
          this.packageType = "Box";
          this.itemLength = "18";
          this.itemWidth = "18";
          this.itemHeight = "16";
          this.weight = "20";
          this.weightOunces = "0";
          break;
        case "Large Box":
          this.packageType = "Box";
          this.itemLength = "18";
          this.itemWidth = "18";
          this.itemHeight = "24";
          this.weight = "30";
          this.weightOunces = "0";
          break;
        case "Bagpack - Carry on":
          this.packageType = "Box";
          this.itemLength = "17";
          this.itemWidth = "10";
          this.itemHeight = "9";
          this.weight = "10";
          this.weightOunces = "0";
          break;
        case "Luggage - Carry on":
          this.packageType = "Box";
          this.itemLength = "22";
          this.itemWidth = "14";
          this.itemHeight = "9";
          this.weight = "17";
          this.weightOunces = "0";
          break;
        case "Luggage - Check in size":
          this.packageType = "Box";
          this.itemLength = "30";
          this.itemWidth = "18";
          this.itemHeight = "14";
          this.weight = "46";
          this.weightOunces = "0";
          break;
        case "Documents":
          this.packageType = "Box";
          this.itemLength = "13";
          this.itemWidth = "10";
          this.itemHeight = "1";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Keys":
          this.packageType = "Box";
          this.itemLength = "6";
          this.itemWidth = "6";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Purse":
          this.packageType = "Box";
          this.itemLength = "15";
          this.itemWidth = "11";
          this.itemHeight = "7";
          this.weight = "7";
          this.weightOunces = "0";
          break;
        case "Wallet":
          this.packageType = "Box";
          this.itemLength = "6";
          this.itemWidth = "6";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Medication Pills":
          this.packageType = "Box";
          this.itemLength = "6";
          this.itemWidth = "6";
          this.itemHeight = "6";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Folder":
          this.packageType = "Box";
          this.itemLength = "13";
          this.itemWidth = "10";
          this.itemHeight = "1";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Jewelery":
          this.packageType = "Box";
          this.itemLength = "6";
          this.itemWidth = "6";
          this.itemHeight = "2";
          this.weight = "1";
          this.weightOunces = "0";
          break;
        case "Thermos":
          this.packageType = "Box";
          this.itemLength = "12";
          this.itemWidth = "10";
          this.itemHeight = "6";
          this.weight = "5";
          this.weightOunces = "0";
          break;
        case "Other":
          this.packageType = "";
          this.itemLength = "";
          this.itemWidth = "";
          this.itemHeight = "";
          this.weight = "";
          this.weightOunces = "0";
          break;
      }
    },
    async onSubmit() {
      this.validateVenuePhoneNumber();
      this.validateEmployeePhoneNumber();
      if (this.itemStatus == "Claimed") {
        this.validateReceiverPhoneNumber();
      }
      this.isLoading = true;
      let venuePhoneNo = this.formatMobileNumber(
        this.autoCompleteAddress.phoneNumber
      );
      let employeePhone = this.formatMobileNumber(this.employeePhone);
      const isValid = await this.$refs.observer.validate();
      if (
        !isValid ||
        !this.isVenuePhoneValid ||
        !this.isEmployeePhoneValid ||
        !this.isReceiverPhoneValid
      ) {
        this.showValidateAlert = true;
        this.isLoading = false;
      } else {
        this.showValidateAlert = false;
        const params = {
          venu_type: this.venue === "Other" ? this.manualVenue : this.venue,
          datse: this.foundDate,
          // venue_name: this.venueName,
          venue_email: this.venueEmail,
          secondary_email: this.venueSecondaryEmail,
          venue_phone_no: venuePhoneNo,
          employee_mobile_no: employeePhone,
          address:
            this.autoCompleteAddress.address === "Other"
              ? this.manualAddress
              : this.autoCompleteAddress.address,
          city: this.autoCompleteAddress.city,
          states: this.autoCompleteAddress.state,
          country: this.autoCompleteAddress.country,
          zipcode: this.autoCompleteAddress.zipcode,
          image: this.image,
          item_description: this.itemDescription,
          package_type: this.packageType,
          weight_pounds: this.weight,
          weight_ounces: this.weightOunces,
          item_length: this.itemLength,
          item_width: this.itemWidth,
          item_height: this.itemHeight,
          item_status: this.itemStatus === "Claimed" ? 0 : 1,
        };
        params.foundItemId = this.foundItemId;
        if (this.itemStatus === "Claimed") {
          let receiverPhone = this.formatMobileNumber(this.receiverPhone);
          params.receiver_name = this.receiverName;
          params.receiver_email = this.receiverEmail;
          params.receiver_mobile_no = receiverPhone;
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
        }, 1000);
      }
    },
    resetForm() {
      console.log("======Reset");
    },
    undo() {
      this.$refs.editor.undo();
    },
    redo() {
      this.$refs.editor.redo();
    },
    deleteEditable() {
      this.$axios
        .post("/removes3files", { key: this.imageKey })
        .then((response) => {
          if (response.status === 200) {
            console.log("===remove file response", response);
          }
        });
      this.$refs.editor.clear();
      this.showEditor = false;
      this.stateCrop = true;
    },
    // freeDrawing() {
    //   let customizeFreeDrawing = { stroke: "black", strokeWidth: "5" };
    //   this.$refs.editor.set("freeDrawing", customizeFreeDrawing);
    // },
    // addCicle() {
    //   let circleModeParams = { fill: "black", stroke: "black" };
    //   this.$refs.editor.set("circle", circleModeParams);
    // },
    addSquare() {
      let customizeRectangle = {
        fill: "black",
        stroke: "black",
        strokeWidth: 1,
      };
      this.$refs.editor.set("rect", customizeRectangle);
    },
    crop() {
      let cropModeOptions = {
        width: "100",
        height: "100",
        overlayOpacity: "0",
        hasControls: true,
      };
      this.$refs.editor.set("crop", cropModeOptions);
      this.stateCrop = false;
    },
    applyCrop() {
      this.$refs.editor.applyCropping();
      this.stateCrop = true;
    },
    async editImage() {
      this.showEditor = false;
      if (this.image) {
        const response = await fetch(this.image);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });
        this.$refs.editor.uploadImage(file);
        this.showEditor = true;
        // this.loadingSpinner = true;
        // setTimeout(() => {
        //   this.loadingSpinner = false;
        // }, 2000);
      } else {
        this.showEditor = false;
      }
    },
    async uploadImg(event) {
      this.showEditor = false;
      if (event.target.files[0]) {
        this.$refs.editor.uploadImage(event.target.files[0]);
        this.showEditor = true;
        // this.loadingSpinner = true;
        // setTimeout(() => {
        //   this.loadingSpinner = false;
        // }, 2000);
      } else {
        this.showEditor = false;
      }
    },
    saveImg() {
      this.isSavingImage = true;
      this.actionModal = false;
      const file = this.$refs.editor.saveImage();
      this.$axios.post("/demo", { file }).then((response) => {
        if (response.status === 200) {
          this.isSavingImage = false;
          let tempItemDescriptionArr = this.itemDescriptionArr;
          this.imageRecognitionData = response.data.data;
          this.itemDescriptionArr = response.data.data
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
          this.itemDescriptionArr = this.itemDescriptionArr.map(
            (apiDescription) => {
              let description = "";
              for (let i = 0; i < tempItemDescriptionArr.length; i++) {
                let staticDescription = tempItemDescriptionArr[i];
                if (
                  apiDescription
                    .toLowerCase()
                    .includes(staticDescription.toLowerCase()) ||
                  staticDescription
                    .toLowerCase()
                    .includes(apiDescription.toLowerCase())
                ) {
                  description = staticDescription;
                  break;
                } else {
                  description = apiDescription;
                }
              }
              return description;
            }
          );
          this.itemDescription = this.itemDescriptionArr[0];
          this.image =
            this.imageRecognitionData[
              this.imageRecognitionData.length - 1
            ].image;

          this.imageKey =
            this.imageRecognitionData[this.imageRecognitionData.length - 2].key;
        }
        this.itemDescriptionArr.push("Other");
        this.showEditor = false;
        this.actionMessage = "Image uploaded successfully!";
        this.actionTitle = "Success";
        this.actionModal = true;
      })
      .catch(err => {
        console.log(err);
        this.actionMessage = "Something went wrong! Please try again.";
        this.actionTitle = "Error";
        this.actionModal = true;
      });
    },
  },
  watch: {
    venue(newValue, oldValue) {
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
        if (newValue == "Claimed") {
          this.showReceiverInputs = true;
        } else {
          this.showReceiverInputs = false;
        }
      }
    },
    itemDescription(value) {
      switch (value) {
        case "Laptop":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "18";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "6";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Tablet":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "12";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "2";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Cell phone":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "9";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Mobile Phone":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "9";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Pillow":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "20";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "3";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Shoes":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "14";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "7";
          this.weight = this.weight ? this.weight : "3";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Slipper":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "13";
          this.itemWidth = this.itemWidth ? this.itemWidth : "8";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Socks":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "8";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "4";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Headphone":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "12";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "4";
          this.weight = this.weight ? this.weight : "2";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Earphone":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "6";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Wristwatch":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "6";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "ID":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "6";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Credit Card":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "6";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Passport":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "6";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Phone charger":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "6";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Charger for Laptop":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "8";
          this.itemWidth = this.itemWidth ? this.itemWidth : "8";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "2";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Blanket":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "20";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "3";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Shirt":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "12";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "2";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Pant":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "12";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "2";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "T-shirt":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "12";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "2";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Clothes":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "12";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "2";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Jacket":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "18";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "3";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Suit":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "15";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "7";
          this.weight = this.weight ? this.weight : "4";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Water bottle":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "13";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "5";
          this.weight = this.weight ? this.weight : "2";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Stuffed toy":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "12";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "2";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Bed sheet":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "12";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "4";
          this.weight = this.weight ? this.weight : "4";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Towel":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "15";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "3";
          this.weight = this.weight ? this.weight : "2";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Tool box":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "15";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "10";
          this.weight = this.weight ? this.weight : "10";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Box - Shoe size":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "13";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "5";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Small Box":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "15";
          this.itemWidth = this.itemWidth ? this.itemWidth : "12";
          this.itemHeight = this.itemHeight ? this.itemHeight : "12";
          this.weight = this.weight ? this.weight : "10";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Medium Box":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "18";
          this.itemWidth = this.itemWidth ? this.itemWidth : "18";
          this.itemHeight = this.itemHeight ? this.itemHeight : "16";
          this.weight = this.weight ? this.weight : "20";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Large Box":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "18";
          this.itemWidth = this.itemWidth ? this.itemWidth : "18";
          this.itemHeight = this.itemHeight ? this.itemHeight : "24";
          this.weight = this.weight ? this.weight : "30";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Bagpack - Carry on":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "17";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "9";
          this.weight = this.weight ? this.weight : "10";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Luggage - Carry on":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "22";
          this.itemWidth = this.itemWidth ? this.itemWidth : "14";
          this.itemHeight = this.itemHeight ? this.itemHeight : "9";
          this.weight = this.weight ? this.weight : "17";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Luggage - Check in size":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "30";
          this.itemWidth = this.itemWidth ? this.itemWidth : "18";
          this.itemHeight = this.itemHeight ? this.itemHeight : "14";
          this.weight = this.weight ? this.weight : "46";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Documents":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "13";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "1";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Keys":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "6";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Purse":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "15";
          this.itemWidth = this.itemWidth ? this.itemWidth : "11";
          this.itemHeight = this.itemHeight ? this.itemHeight : "7";
          this.weight = this.weight ? this.weight : "7";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Wallet":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "6";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Medication Pills":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "6";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Folder":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "13";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "1";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Jewelery":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "6";
          this.itemWidth = this.itemWidth ? this.itemWidth : "6";
          this.itemHeight = this.itemHeight ? this.itemHeight : "2";
          this.weight = this.weight ? this.weight : "1";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Thermos":
          this.packageType = this.packageType ? this.packageType : "Box";
          this.itemLength = this.itemLength ? this.itemLength : "12";
          this.itemWidth = this.itemWidth ? this.itemWidth : "10";
          this.itemHeight = this.itemHeight ? this.itemHeight : "6";
          this.weight = this.weight ? this.weight : "5";
          this.weightOunces = this.weightOunces ? this.weightOunces : "0";
          break;
        case "Other":
          this.packageType = "";
          this.itemLength = "";
          this.itemWidth = "";
          this.itemHeight = "";
          this.weight = "";
          this.weightOunces = "0";
          break;
      }
    },
  },
  created() {
    this.$root.$on("detail-submitted", (data) => {
      if (data) {
        this.resetForm();
      }
    });
  },
  mounted() {
    this.getCurrentPosition();
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
            let index = this.venueArr.indexOf(data.venu_type) !== -1;
            if (index) this.venue = data.venu_type;
            else {
              this.venue = "Other";
              this.manualVenue = data.venu_type;
            }
            this.foundDate = new Date().toISOString().slice(0, 10);
            this.venueEmail = data.venue_email;
            this.venueSecondaryEmail = data.secondary_email;
            this.employeePhone = data.employee_mobile_no;
            this.addressArr.unshift(data.address);
            this.address = data.address;
            this.autoCompleteAddress.address = this.addressArr[0];
            // this.manualAddress = data.address;
            this.autoCompleteAddress.phoneNumber = data.venue_phone_no;
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
            this.itemStatus = data.item_status === 0 ? "Claimed" : "Unclaimed";

            if (data.item_status === 0) {
              this.receiverName = data.receiver_name;
              this.receiverEmail = data.receiver_email;
              this.receiverPhone = data.receiver_mobile_no;
            }
          }
        })
        .catch((error) => console.log(error));
    } else if (this.$route.params?.itemDetails) {
      this.senderFormTitle = "EDIT SENDER'S DETAILS";
      this.foundItemFormTitle = "EDIT FOUND ITEM'S DETAILS";
      let data = this.$route.params.itemDetails;
      var index = this.venueArr.indexOf(data.venu_type) !== -1;
      if (index) this.venue = data.venu_type;
      else {
        this.venue = "Other";
        this.manualVenue = data.venu_type;
      }
      if (data.foundItemId) {
        this.foundItemId = data.foundItemId;
      } else {
        this.foundItemId = data.id;
      }
      this.foundDate = data.datse;
      this.venueEmail = data.venue_email;
      this.venueSecondaryEmail = data.secondary_email;
      this.employeePhone = data.employee_mobile_no;
      this.addressArr.unshift(data.address);
      this.address = data.address;
      this.autoCompleteAddress.address = this.addressArr[0];
      // this.manualAddress = data.manualAddress;
      this.autoCompleteAddress.phoneNumber = data.venue_phone_no;
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
      this.itemStatus = data.item_status === 0 ? "Claimed" : "Unclaimed";

      if (data.item_status === 0) {
        this.receiverName = data.receiver_name;
        this.receiverEmail = data.receiver_email;
        this.receiverPhone = data.receiver_mobile_no;
      }
    } else {
      this.senderFormTitle = "SENDER'S DETAILS";
      this.foundItemFormTitle = "FOUND ITEM'S DETAILS";
    }
  },
};
</script>

<style lang="scss">
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
    padding-right: 7px;
    p {
      font-size: 12px;
      text-align: center;
    }
    div {
      cursor: pointer;
      border: 1px solid #808080;
      border-radius: 14px;
      &:hover {
        background: #dfdfdf;
      }
      padding: 2px 10px;
      background-color: #f3f3f3;
      margin-bottom: 5px;
      color: #ff9800;
      svg {
        width: 18px;
      }
    }
  }
}

.top-margin-05 {
  margin-top: 0.5rem !important;
}

.top-margin-alert {
  margin-top: 2.5rem !important;
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
  width: 0 !important;
  object-fit: contain;
}
.canvas-container {
  width: 100% !important;
}
.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 500px !important;
  min-height: 384px;
}
.upper-canvas {
  margin: 0px 0px;
  min-width: 500px !important;
  min-height: 384px;
}
.lower-canvas {
  min-width: 500px !important;
  min-height: 384px;
  position: static !important;
}

.vs__dropdown-toggle {
  @apply h-12 rounded-lg;
}

.error {
  & > div {
    @apply text-red-500;
  }
  .vs__dropdown-toggle {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
  }
}

.top-margin-3 {
  margin-top: 3px !important;
}

.shieldIcon {
  max-width: 15px;
  color: #03993b;
  opacity: 0.75;
}

@media only screen and (max-width: 650px) {
  .canvas-container,
  .upper-canvas,
  .lower-canvas {
    min-width: 0 !important;
    min-height: 0 !important;
    width: 500px !important;
    height: 384px !important;
  }
}

@media only screen and (max-width: 510px) {
  .canvas-container,
  .upper-canvas,
  .lower-canvas {
    min-width: 0 !important;
    min-height: 0 !important;
    width: 350px !important;
    height: 350px !important;
  }
}

@media only screen and (max-width: 410px) {
  .canvas-container,
  .upper-canvas,
  .lower-canvas {
    min-width: 0 !important;
    min-height: 0 !important;
    width: 300px !important;
    height: 300px !important;
  }
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}

.fade-leave-to {
  opacity: 0;
}
.vue-tel-input {
  border-radius: 0.5rem;
}
.vti__dropdown-list {
  z-index: 100;
}
.vs__actions svg {
  display: none;
}
.vs__actions {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23737373' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  width: 26px;
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
</style>