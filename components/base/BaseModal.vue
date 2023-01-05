<template>
  <transition name="t-fade">
    <div v-show="showModal" class="base-modal !mt-0">
      <div class="base-modal-backdrop" />
      <div :class="['base-modal-content', size]">
        <div class="base-modal-header">
          <div style="display: flex; align-items: center; height: 40px">
            <slot v-if="hasHeader" name="header">
              <span class="default-header-text">{{ header }}</span>
            </slot>
          </div>
          <div style="display: flex; align-items: center">
            <slot name="before-close" />
            <BaseIcon icon="close" size="lg" @click="$emit('close')" />
          </div>
        </div>
        <div class="base-modal-body">
          <slot />
        </div>
        <div v-if="footer" class="base-modal-footer">
          <slot name="footer" />
          <slot v-if="!hideCancel" name="actions">
            <BaseButton
              class="!capitalize"
              varient="gray"
              type="submit"
              @click="$emit('close')"
              >Cancel
            </BaseButton>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      default: null,
    },
    hasHeader: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: null,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: "",
    },
    hideCancel: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "is-small",
      validator: function (value) {
        return (
          [
            "is-xsmall",
            "is-small",
            "is-medium",
            "is-large",
            "is-full",
            "is-checkout",
            "is-landing-page",
          ].indexOf(value) !== -1
        );
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.base-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11;

  .base-modal-backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .base-modal-content {
    position: relative;
    min-width: 250px;
    margin: 5% auto;
    background-color: white;
    opacity: 1;
    border-radius: 8px;
    box-shadow: 1px 4px 7px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    max-height: calc(100vh - 10vw);
    max-width: 1800px;
    height: auto;
    @media (max-width: 767px) {
      max-height: calc(90vh - 10vw);
    }

    &.is-xsmall {
      max-width: 500px;
    }

    &.is-small {
      max-width: 700px;
    }

    &.is-medium {
      max-width: 900px;
    }

    &.is-large {
      width: 90%;
      max-width: 1250px;
      @media (max-width: 767px) {
        width: 94%;
      }
    }

    &.is-full {
      width: 98%;
      margin: 0.5% auto;
      max-height: 99vh;
    }

    &.is-checkout {
      max-width: 900px;
      height: 780px;
      max-height: 99vh;
      margin: 1% auto;
      background-color: #f1f1f1;
    }

    .base-modal-header {
      display: flex;
      justify-content: space-between;
      color: white;
      // background: #6ab4e4;
      background-color: #153f5ed9;
      padding: 10px 15px;

      .default-header-text {
        color: white;
        font-size: 16px;
      }
    }

    .base-modal-body {
      background: #f7f7f7;
      overflow: auto;
      margin: 20px;

      &.white {
        background: white;
      }
    }

    .base-modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      border-top: 2px solid #ddd;
      padding: 15px;
      background: #f1f1f1;
    }
  }
}
</style>