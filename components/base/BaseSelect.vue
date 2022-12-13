<template>
  <label class="mb-8 block relative box-content h-12">
    <div
      class="transition-all text-gray-500 text-left"
    >
      <span style="font-size:15px;">{{ label }}</span> <span v-if="isRequired" class="text-red-500">*</span>
    </div>
    <select
      v-show="!isComponentLoaded"
      class="
        bg-white
        border
        inline-block
        border-gray-300
        w-full
        rounded-lg
        h-full
        text-sm
        transition-shadow
        text-gray-800
      "
    >
    </select>
    <select
      v-show="isComponentLoaded"
      :value="value"
      class="
        bg-white
        border
        inline-block
        border-gray-300
        w-full
        rounded-lg
        h-full
        text-sm
        transition-shadow
        text-gray-800
      "
      :class="[
        inputClasses,
        hideValue && '!text-transparent',
        active && 'pl-3 pr-4 pt-2 pb-2',
        !active && 'p-0',
      ]"
      :disabled="disabled"
      @blur="
        active = value !== '';
        $emit('blur', $event);
      "
      @focus="
        active = true;
        $emit('focus', $event);
      "
      @input="$emit('input', $event.target.value)"
      @change="updateValue"
    >
      <option v-for="option in options" :key="option">
        <!-- <slot name="displayoption" :option="option">
          {{ option }}
        </slot> -->
        {{ option }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  props: {
    isRequired: { type: Boolean, default: false },
    value: { type: String, default: "" },
    options: { type: Array },
    label: { type: String },
    inputClasses: { type: String },
    disabled: { type: Boolean, default: false },
    hideValue: { type: Boolean, default: false },
  },
  data() {
    return {
      active: false,
      isComponentLoaded: false
    };
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue != oldValue) {
        this.active = newValue.length === 0 ? false : true;
      }
    },
  },
  mounted() {
    if (this.value) {
      this.active = true;
    }
    this.isComponentLoaded = true
  },
};
</script>

<style lang="scss" scoped>
.error {
  & > div {
    @apply text-red-500;
  }
  select {
    @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
  }
}

.readonly select {
  @apply bg-gray-100 cursor-pointer ring-offset-0 ring-0 cursor-not-allowed;
}

.errorWithoutRing {
  select {
    @apply border-red-500 transition-none;
  }
}
</style>
