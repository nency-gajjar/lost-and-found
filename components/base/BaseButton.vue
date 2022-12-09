<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    :type="type"
    :disabled="disabled || isLoading"
    :class="['base', varient]"
  >
    <svg
      v-if="isLoading"
      :class="[!isEmpty(icon) ? 'mr-3 -ml-1' : 'absolute left-1/2 -ml-2.5']"
      class="w-5 h-5 text-white animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
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
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      ></path>
    </svg>
    <BaseIcon
      v-if="!isLoading && !isEmpty(icon)"
      :icon="icon.name"
      :color="icon.color"
      :size="icon.size"
      class="mr-2"
    />
    <span :class="{ invisible: isLoading && isEmpty(icon) }">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import { isEmpty } from "lodash";
export default {
  inheritAttrs: false,
  props: {
    isLoading: {
      type: [Boolean, Object],
    },
    type: {
      type: String,
      required: false,
      default: "button",
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    varient: {
      type: String,
      required: false,
      default: "primary",
    },
    icon: {
      type: Object,
      default: () => ({}),
      required: false,
    },
  },
  methods: {
    isEmpty,
  },
};
</script>

<style lang="scss" scoped>
.base {
  @apply font-medium tracking-widest text-sm rounded-md leading-5 relative uppercase py-2.5 px-12 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all  disabled:cursor-not-allowed;
}
.primary {
  @apply bg-accent-100 text-white focus:ring-accent-100  hover:bg-accent-200;
}
.primaryAlt {
  @apply text-accent-100 border border-accent-100 focus:ring-accent-100 hover:bg-accent-20 hover:border-accent-200;
}
.secondary {
  @apply bg-primary-100 text-white focus:ring-primary-100  hover:bg-primary-200;
}
.secondaryAlt {
  @apply text-primary-100 border border-primary-100 focus:ring-primary-100 disabled:focus:ring-[#E1E3E6] disabled:border-[#E1E3E6] disabled:text-[#E1E3E6];
}
.gray {
  @apply bg-gray-100 hover:shadow-md focus:ring-gray-300 hover:bg-gray-100 text-gray-600 border border-gray-300;
}
.blue {
  @apply bg-blue-500 text-white focus:ring-blue-500;
}
.green {
  @apply bg-green-600 text-white hover:shadow-md focus:ring-green-600;
}
.indigo {
  @apply bg-indigo-500 text-white focus:ring-indigo-500 hover:shadow-md;
}
.red {
  @apply bg-red-600 text-white focus:ring-red-600 hover:bg-red-600;
}
</style>
