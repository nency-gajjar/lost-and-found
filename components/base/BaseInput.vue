<template>
  <div class="block relative box-content bg-transparent">
    <label class="block relative box-content cursor-text">
      <div
        v-if="label"
        class="transition-all text-gray-500 z-10 text-left"
      >
        <span style="font-size:15px;">{{ label }}</span> <span v-if="isRequired" class="text-red-500">*</span>
      </div>
      <input
        autocomplete="chrome-off"
        :id="id"
        ref="input"
        :name="name"
        :value="value"
        :type="type"
        :step="step"
        class="
          border
          inline-block
          border-gray-300
          w-full
          h-12
          rounded-lg
          px-4
          text-base
          pt-2
          pb-2
          transition-shadow
          text-gray-700
        "
        :class="[
          inputClasses,
          icon && 'pr-10',
          hideValue && '!text-transparent',
        ]"
        :readonly="readonly"
        @blur="
          $emit('blur', $event);
        "
        @focus="
          $emit('focus', $event);
        "
        @keyup="$emit('keyup', $event)"
        @keydown="$emit('keydown', $event)"
        @input="updateValue"
      />
      <slot name="icon" />
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
    isRequired: { type: Boolean, default: false },
    name: { type: String, default: "", rquired:false },
    value: { type: String | Number, default: "" },
    label: { type: String, default: "" },
    type: { type: String, default: "" },
    id: { type: String | Number, default: "" },
    step: { type: Number, default: 1 },
    inputClasses: { type: String | Array },
    icon: { type: String, default: "" },
    hideValue: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
.error label div{
  @apply text-red-500;
}
.error input {
  @apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
}
.readonly input {
  @apply bg-gray-100 cursor-pointer ring-offset-0 ring-0 cursor-not-allowed;
}
</style>