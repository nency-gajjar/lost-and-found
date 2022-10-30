<template>
  <font-awesome-icon
    :icon="[type, icon]"
    class="base-icon"
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
  &.lightgray {
    color: #939393;
  }
}
</style>