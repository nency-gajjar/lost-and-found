<template>
  <div class="wrapper">
    <div class="container max-w-full mx-auto px-4">
      <main class="my-10 space-y-6">
        <div class="flex flex-col md:space-y-0 md:flex-row justify-between">
          <div class="mr-6 order-2 md:order-1 mt-3 md:mt-0">
            <BaseHeader class="text-left" varient="h4">Users</BaseHeader>
          </div>
        </div>
        <div
          class="
            justify-end
            w-full
            flex
            mt-8
            mb-5
          "
        >
          <BaseButton
            varient="secondary"
            class="sm:ml-2 mt-3 sm:mt-0"
          >
            Export
          </BaseButton>
        </div>
        <div
          class="
            overflow-x-auto
            rounded-tl-lg rounded-tr-lg
            inline-block
            w-full
            bg-white
            shadow-lg
          "
        >
          <div
            class="
              align-middle
              inline-block
              min-w-full
              whitespace-nowrap
              overflow-hiddenrounded-bl-lg
              rounded-br-lg
            "
          >
            <table class="min-w-full">
              <thead class="sticky top-0">
                <tr
                  class="
                    bg-accent-100
                    text-white
                    uppercase
                    text-sm
                    leading-normal
                  "
                >
                  <th data-priority="1" class="py-3 px-6 text-left">Name</th>
                  <th class="py-3 px-6 text-left">Email</th>
                  <th class="py-3 px-6 text-left">Phone No.</th>
                  <th class="py-3 px-6 text-left">Business Name</th>
                </tr>
              </thead>
              <tbody class="bg-white text-gray-800">
                <tr
                  class="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td class="py-3 px-6 text-left">
                    <p>Nency</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>nency.bhadeshiya@bacancy.com</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>7564895452</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Bacancy</p>
                  </td>
                </tr>
                <tr
                  class="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td class="py-3 px-6 text-left">
                    <p>Nency</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>nency.bhadeshiya@bacancy.com</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>7564895452</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Bacancy</p>
                  </td>
                </tr>
                <tr
                  class="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td class="py-3 px-6 text-left">
                    <p>Nency</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>nency.bhadeshiya@bacancy.com</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>7564895452</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Bacancy</p>
                  </td>
                </tr>
                <tr
                  class="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td class="py-3 px-6 text-left">
                    <p>Nency</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>nency.bhadeshiya@bacancy.com</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>7564895452</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Bacancy</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth-admin"],
};
</script>

<style lang="scss" scoped>
  .wrapper {
    @apply min-h-screen flex flex-col justify-start pt-0 items-center text-center mx-0 sm:mx-8;
  }
</style>