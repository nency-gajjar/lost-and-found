<template>
  <BaseModal
    header="Let's schedule a pickup!"
    :show-modal="showModal"
    size="is-xsmall"
    @close="$emit('close')"
    :hideCancel="true"
  >
    <div
      class="bg-primary-60 space-y-4 !shadow-primary flex flex-col text-left"
    >
      <div class="text-sm text-gray-800">
        <p class="font-medium text-base font-display">Pickup address:</p>
        <p class="leading-snug tracking-wide">Nency Bhadeshiya</p>
        <p class="leading-snug tracking-wide">
          2627 N Hollywood Way, Burbank, CA 91505, USA
        </p>
        <p class="leading-snug tracking-wide">Burbank, California, 91505</p>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form class="grid gap-4 mt-1" @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            v-slot="{ errors }"
            name="Package Location"
            rules="required"
            class="block"
          >
            <BaseSelect
              v-model="packageLocation"
              :options="Object.values(packageLocationOptions)"
              label="Package Location"
              :class="errors.length > 0 && 'error'"
            />

            <p
              v-if="errors.length > 0"
              class="mt-2 text-sm text-red-600 text-left"
            >
              {{ errors[0] }}
            </p>
          </ValidationProvider>

          <ValidationProvider
            v-if="packageLocation === 'Other'"
            v-slot="{ errors }"
            name="Other Package Location"
            rules="required"
            class="block"
          >
            <BaseInput
              v-model="otherPackageLocation"
              label="Where should we pickup the package from?"
              type="text"
              :class="errors.length > 0 && 'error'"
            />
            <p
              v-if="errors.length > 0"
              class="text-left mt-2 text-sm text-red-600"
            >
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </div>
    <template v-slot:footer>
      <BaseButton
        variant="primary"
        type="submit"
        class="max-w-[16rem] w-full mx-auto mt-2"
      >
        Submit
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script>
export default {
  props: {
    showModal: { type: Boolean, default: false },
  },
  data() {
    return {
      packageLocation: "",
      packageLocationOptions: {
        FrontDoor: "Front Door",
        BackDoor: "Back Door",
        SideDoor: "Side Door",
        RingBell: "Knock on Door/Ring Bell",
        MailRoom: "Mail Room",
        Office: "Office",
        Reception: "Reception",
        Mailbox: "In/At Mailbox",
        Other: "Other",
      },
      otherPackageLocation: "",
    };
  },
};
</script>

<style>
</style>