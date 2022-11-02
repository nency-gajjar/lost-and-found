<template>
  <font-awesome-icon
    :icon="[type, icon]"
    class="base-icon"
    :size="size"
    :class="color"
    v-bind="$attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    icon: { type: String, default: "account" },
    color: { type: String, default: "white" },
    type: { type: String, default: "fas" },
    size: {
      type: String,
      default: "1x",
      validator: (value) =>
        [
          "lg",
          "xs",
          "sm",
          "1x",
          "2x",
          "3x",
          "4x",
          "5x",
          "6x",
          "7x",
          "8x",
          "9x",
          "10x",
        ].indexOf(value) > -1,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.$emit("input", event.target.value);
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.base-icon {
  cursor: pointer;

  &.white {
    color: white;
  }
  &.lightblack {
    color: #343434;
  }
  &.blue {
    color: #3b82f6;
  }
  &.green {
    color: green;
  }
  &.red {
    color: #f34242;
  }
  &.gray {
    color: gray;
  }
  &.black {
    color: rgb(20, 20, 20);
  }
  &.purple {
    color: #4f46e5;
  }
  &.lightgray {
    color: #939393;
  }
}
</style>