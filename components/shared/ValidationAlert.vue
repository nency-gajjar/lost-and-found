<template>
  <div
    v-if="showAlert"
    class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
    role="alert"
    >
    <template v-if="alertMessage"><span>{{ alertMessage }}</span></template>
    <template v-else>
      <span  class="font-medium">Oops!</span> Please fill all required fields and try submitting again.
    </template>
  </div>
</template>

<script>
export default {
  props: {
    showAlert: { type: Boolean, default: false },
    alertMessage: { type: String, default: '', required: false },
  }
}
</script>

<style>

</style>