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
          <BaseIcon
            class="close-icon absolute right-4 top-4"
            icon="close"
            size="lg"
            color="gray"
            @click="$emit('close')"
          />
          <div>
            <div class="text-center p-3 flex-auto justify-center leading-6">
              <BaseIcon
                v-if="icon"
                :icon="icon.name"
                :color="icon.color"
                :size="icon.size"
              />
              <BaseHeader v-if="title" class="py-4" varient="h4">{{ title }}</BaseHeader>
              <slot name="input" />
              <div v-if="message" class="text-md text-gray-600 px-8">
                <p v-html="message"></p>
              </div>
            </div>
            <div class="p-3 mt-2 text-center space-x-4 md:block">
              <BaseButton
                v-if="showClose"
                class="!capitalize !px-5 !py-2"
                varient="gray"
                @click="$emit('close')"
                >{{ buttonTitle }}
              </BaseButton>
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
