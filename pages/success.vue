<template>
  <main class="text-center mt-8 space-y-5 max-w-5xl mx-auto">
    <div
      class="
        border border-[#E1E3E6]
        rounded-lg
        bg-white
        md:mt-14
        mt-24
        mx-4
        md:px-12
        px-6
        sm:space-x-2
        lg:space-x-0 lg:h-[10.375rem]
        flex
        justify-between
        flex-col
        sm:flex-row
      "
      style="box-shadow: -10px 18px 32px rgba(54, 28, 93, 0.04)"
    >
      <div
        class="
          space-y-2
          lg:mt-9
          sm:w-1/2
          w-full
          text-center
          sm:text-left
          py-4
          lg:py-0
          max-w-md
        "
      >
        <h2
          class="
            font-bold
            text-4xl
            md:text-[2.625rem] md:leading-[3.125rem]
            text-accent-100
          "
        >
          Success!
        </h2>
        <p class="text-gray-800 text-sm max-w-[21.875rem]">
          Your shipment created successfully!
        </p>
      </div>
    </div>
    <div class="text-center mt-8 space-y-5 max-w-xl mx-auto">
      <h3 class="text-xl font-medium text-primary-100 font-display">
        You have succesfully created a label!
      </h3>
      <p class="text-gray-800">
        Thank you for choosing Lost and Found! Your next step is to print the
        label, attach it to your package and wait for pickup.
      </p>
      <BaseButton> Print Label </BaseButton>
    </div>
    <!-- <p class="text-gray-800">
      Optionally, you can schedule a pickup for your package:
    </p>
    <BaseButton
      class="
        bg-primary-100
        focus:ring-primary-100
        shadow-primary
        hover:bg-primary-200
      "
    >
      Schedule Pickup
    </BaseButton> -->
  </main>
</template>

<script>
export default {};
</script>

<style>
</style>