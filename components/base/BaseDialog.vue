<template>
  <div
    v-show="showDialog"
    class="fixed z-10 overflow-y-auto top-0 w-full left-0"
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
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-900 opacity-75" />
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >
      <div
        class="
          inline-block
          align-center
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div
          class="
            w-full
            max-w-lg
            p-3
            relative
            mx-auto
            my-auto
            rounded-xl
            shadow-lg
            bg-white
          "
        >
          <div>
            <div class="text-center p-3 flex-auto justify-center leading-6">
              <BaseIcon
                v-if="icon"
                :icon="icon.name"
                :color="icon.color"
                :size="icon.size"
              />

              <h2 v-if="title" class="text-xl font-semibold py-4 text-gray-800">
                {{ title }}
              </h2>
              <slot name="input" />
              <p v-if="message" class="text-md text-gray-600 px-8">
                {{ message }}
              </p>
            </div>
            <div class="p-3 mt-2 text-center space-x-4 md:block">
              <button
                v-if="showClose"
                class="
                  mb-2
                  md:mb-0
                  bg-white
                  px-5
                  py-2
                  text-sm
                  shadow-sm
                  font-medium
                  tracking-wider
                  border border-gray-300
                  text-gray-600
                  rounded-md
                  hover:shadow-lg hover:bg-gray-100
                "
                @click="$emit('close')"
              >
                {{ buttonTitle }}
              </button>
              <slot name="action" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
      required: true,
    },
    icon: {
      type: Object,
      default: () => ({}),
      required: false,
    },
    title: {
      type: String,
      default: null,
      required: true,
    },
    message: {
      type: String,
      default: null,
      required: false,
    },
    buttonTitle: {
      type: String,
      default: null,
      required: false,
    },
    showClose: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
};
</script>
