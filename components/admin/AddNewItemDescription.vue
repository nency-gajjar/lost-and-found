<template>
  <BaseModal
    header="Add New Item Description"
    :show-modal="showModal"
    size="is-large"
    @close="$emit('close')"
  >
    <div>Content Goes here...</div>
    <div>Content Goes here...</div>
    <div>Content Goes here...</div>
    <div>Content Goes here...</div>
    <template v-slot:footer>
      <button
        type="submit"
        class="
          !py-3
          font-medium
          text-md
          leading-5
          px-5
          py-2.5
          rounded-md
          button
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-offset-primary-60
          transition-all
          font-display
          disabled:cursor-not-allowed
          bg-accent-100
          text-white
          focus:ring-accent-100
          shadow-accent
          hover:bg-accent-200
        "
      >
        <span class="button__text"> Save </span>
      </button>
    </template>
  </BaseModal>
</template>

<script>
export default {
  props: {
    showModal: { type: Boolean, default: false },
  },
};
</script>