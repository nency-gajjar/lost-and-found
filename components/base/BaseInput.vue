<template>
  <div class="block relative box-content h-12">
    <label class="block relative box-content h-12 cursor-text">
      <div
        :class="[
          'absolute px-4 transition-all text-gray-500 z-10',
          active && 'my-2 text-[0.625rem] leading-3',
          !active && 'my-3.5 text-sm',
        ]"
      >
        {{ label }}
      </div>
      <input
        :id="id"
        ref="input"
        :value="value"
        :type="type"
        :step="step"
        class="
          border
          inline-block
          border-gray-300
          w-full
          rounded-lg
          px-4
          h-full
          text-sm
          pt-4
          pb-2
          transition-shadow
          text-gray-800
        "
        :class="[
          inputClasses,
          icon && 'pr-10',
          hideValue && '!text-transparent',
        ]"
        @blur="
          active = value !== '';
          $emit('blur', $event);
        "
        @focus="
          active = true;
          $emit('focus', $event);
        "
        @keyup="$emit('keyup', $event)"
        @keydown="$emit('keydown', $event)"
        @input="updateValue"
      />
      <!-- <UiSpinner
        v-if="loading"
        class="!h-6 !w-6 absolute inset-y-3 right-[50%] !border-4"
      />
      <div
        v-if="icon"
        :class="[
          iconWrapperClasses,
          'absolute inset-y-0 right-0 pr-3 flex items-center',
        ]"
        @click="$emit('icon:click', $event)"
      >
        <UiIcon :name="icon" :class="iconClasses" />
      </div> -->
    </label>
    <!-- <button
      v-if="iconSearch"
      :class="[
        iconWrapperClasses,
        'absolute inset-y-0 right-0 pr-3 flex items-center',
      ]"
      @click="$emit('icon:click', $event)"
    >
      <UiIcon :name="iconSearch" :class="iconClasses" />
    </button> -->
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String | Number, default: "" },
    label: { type: String, default: "" },
    type: { type: String, default: "" },
    id: { type: String | Number, default: "" },
    step: { type: Number, default: 1 },
    inputClasses: { type: String | Array },
    icon: { type: String, default: "" },
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
    if (this.value.length != 0) {
      this.active = true;
    }
  },
};
</script>

<style scoped>
.error input {
  @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
}
</style>