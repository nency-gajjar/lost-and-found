<template>
  <label class="block relative box-content h-12 bg-white">
    <div
      :class="[
        'absolute px-4 transition-all text-gray-500',
        active && 'my-2 text-[0.625rem] leading-3',
        !active && 'my-3.5 text-sm',
      ]"
    >
      {{ label }}
    </div>
    <select
      :value="value"
      class="
        relative
        border
        inline-block
        border-gray-300
        w-full
        rounded-lg
        h-full
        text-sm
        transition-shadow
        text-gray-800
        bg-transparent
      "
      :class="[
        inputClasses,
        hideValue && '!text-transparent',
        active && 'pl-3 pr-4 pt-4 pb-2',
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
        {{ option }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  props: {
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
  created() {
    if (this.value) {
      this.active = true;
    }
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
.errorWithoutRing {
  select {
    @apply border-red-500 transition-none;
  }
}
</style>
