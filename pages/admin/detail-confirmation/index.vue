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
              <h3 class="text-white">Crop Image</h3>
            </div>
            <span
              @click="showEditor = false"
              class="absolute right-5 top-5 inline-block z-10"
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
            <div
              class="top-margin-3 flex justify-center"
              v-show="loadingSpinner"
              role="status"
            >
              <svg
                aria-hidden="true"
                class="mr-2 w-16 h-16 text-gray-200 animate-spin fill-blue-600"
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
            </div>
            <div v-show="!loadingSpinner" class="w-full">
              <div class="px-6">
                <Editor
                  :canvasWidth="canvasWidth"
                  :canvasHeight="canvasHeight"
                  ref="editor"
                />
              </div>
              <div class="editor-tools mt-5 px-6 border-t pt-4">
                <div class="icons">
                  <div class="tool-undo">
                    <rotate-ccw-icon
                      :size="size_icon"
                      @click="undo()"
                    ></rotate-ccw-icon>
                  </div>
                  <div class="tool-redo">
                    <rotate-cw-icon
                      :size="size_icon"
                      @click="redo()"
                    ></rotate-cw-icon>
                  </div>
                  <div class="tool-trash">
                    <trash-2-icon
                      :size="size_icon"
                      @click="deleteEditable()"
                    ></trash-2-icon>
                  </div>
                  <!-- <div class="tool-freeDrawing">	
                    <edit-2-icon	
                      :size="size_icon"	
                      @click="freeDrawing()"	
                    ></edit-2-icon>	
                  </div>	 -->
                  <div class="tool-addCircle">
                    <circle-icon
                      :size="size_icon"
                      @click="addCicle()"
                    ></circle-icon>
                  </div>
                  <div class="tool-addSquare">
                    <square-icon
                      :size="size_icon"
                      @click="addSquare()"
                    ></square-icon>
                  </div>
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
              Venue Name
            </div>
            <div class="text-gray-600 text-left md:w-7/12 sm:w-6/12">
              {{ itemDetails.venue_name }}
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
                  {{ itemDetails.weight }} lbs
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
                  {{ itemDetails.dimensions }}
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

            <div v-if="image" class="text-gray-600 mt-4 text-left w-full">
              <img class="w-full" :src="image" alt="" />
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            :class="{ 'button--loading': isLoading['approve'] }"
            type="submit"
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
            @click="action('Approve')"
          >
            <span class="button__text"> Approve </span>
          </button>
          <button
            :class="{ 'button--loading': isLoading['deny'] }"
            type="submit"
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
            @click="action('Deny')"
          >
            <span class="button__text"> Deny </span>
          </button>
          <button
            :class="{ 'button--loading': isLoading['approve-without-image'] }"
            type="submit"
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
            @click="action('Approve without Image')"
          >
            <span class="button__text"> Approve without Image </span>
          </button>
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
            @click="editImage()"
          >
            Edit Image
          </button>
        </div>

        <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          >
            <button
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
              @click="action('Approve')"
            >
              <span class="button__text"> Approve </span>
            </button>
          </div>
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
          >
            <button
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
              @click="action('Deny')"
            >
              <span class="button__text"> Deny </span>
            </button>
          </div>
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
          >
            <button
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
              "
              @click="action('Approve without Image')"
            >
              <span class="button__text"> Approve without Image </span>
            </button>
          </div>
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
            @click="editImage()"
          >
            Edit Image
          </button>
        </div> -->
      </section>
    </div>
  </div>
</template>
  
<script>
import Editor from "~/components/vueImageEditor/Editor.vue";
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
  components: {
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
  data() {
    return {
      canvasWidth: "600",
      canvasHeight: "400",
      size_icon: "2x",
      isLoading: {
        approve: false,
        deny: false,
        "approve-without-image": false,
      },
      isLoadingItemDetails: false,
      foundItemId: "",
      responseData: {},
      image: "",
      imageKey: "",
      isSavingImage: false,
      isImageEdited: false,
      showEditor: false,
      stateCrop: true,
      loadingSpinner: false,
      imageRecognitionData: [],
      imageKey: "",
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
        .catch((error) => console.log(error));
    }
  },
  methods: {
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
    addCicle() {
      let circleModeParams = { fill: "black", stroke: "black" };
      this.$refs.editor.set("circle", circleModeParams);
    },
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
        this.loadingSpinner = true;
        setTimeout(() => {
          this.loadingSpinner = false;
        }, 2000);
      } else {
        this.showEditor = false;
      }
    },
    saveImg() {
      this.isSavingImage = true;
      const file = this.$refs.editor.saveImage();
      this.$axios.post("/demo", { file }).then((response) => {
        if (response.status === 200) {
          this.isSavingImage = false;
          this.imageRecognitionData = response.data.data;
          this.image =
            this.imageRecognitionData[
              this.imageRecognitionData.length - 1
            ].image;

          this.imageKey =
            this.imageRecognitionData[this.imageRecognitionData.length - 2].key;
        }
        this.showEditor = false;
        this.isImageEdited = true;
      });
    },
    filterAddressLine(itemDetails) {
      return itemDetails.address == "Other" || !itemDetails.address
        ? itemDetails.manualAddress
        : itemDetails.address;
    },
    action(type) {
      this.isLoading[type] = true;
      let params = {};
      if (this.itemDetails.image && type === "Approve" && this.isImageEdited) {
        params.image = this.image;
      }
      params.is_default = type;
      if (this.itemDetails.id) {
        this.$axios
          .post("/updatesinglelostitem?id=" + this.itemDetails.id, params, {
            responseType: "arraybuffer",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/pdf",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              this.isLoading[type] = false;
            }
          })
          .catch((error) => console.log(error));
      }
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
  border: 1px solid #000000;
  background-color: #ffffff;
}

.editor-tools .icons {
  div {
    cursor: pointer;
    border: 1px solid #808080;
    border-radius: 14px;
    margin-right: 7px;

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
</style>