<template>
  <font-awesome-icon
    :icon="[type, icon]"
    class="base-icon"
    :class="color"
    :size="size"
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
    size: { type: String, default: "lg" },
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
}
</style>