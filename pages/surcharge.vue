<template>
  <div class="wrapper">
    <div class="container max-w-full mx-auto px-4">
      <main class="my-10 space-y-6">
        <div class="flex flex-col md:space-y-0 md:flex-row justify-between">
          <div class="mr-6 order-2 md:order-1 mt-3 md:mt-0">
            <h1 class="text-2xl text-gray-600 font-semibold">
              Surcharge
            </h1>
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
            @click="showSurchargeModel = true; mode = 'create'"
            class="sm:ml-2 mt-3 sm:mt-0"
          >
            + Create
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
                  <th data-priority="1" class="py-3 px-6 text-left">Key</th>
                  <th class="py-3 px-6 text-left">Service</th>
                  <th class="py-3 px-6 text-left">Package Type</th>
                  <th class="py-3 px-6 text-left">Effective after</th>
                  <th class="py-3 px-6 text-left">Effective before</th>
                  <th class="py-3 px-6 text-left">Dollar amount</th>
                  <th class="py-3 px-6 text-left">Percentage</th>
                  <th class="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white text-gray-800">
                <tr
                  class="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <div class="flex justify-content-center gap-4">
                      <div class="bg-blue-600 px-3 py-2 rounded">
                        <BaseIcon
                          @click="editSurcharge"
                          icon="pencil"
                          color="white"
                        />
                      </div>
                      <div class="bg-red-600 px-3 py-2 rounded">
                        <BaseIcon
                          @click="deleteSurcharge" 
                          icon="trash"
                          color="white"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr
                  class="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <div class="flex justify-content-center gap-4">
                      <div class="bg-blue-600 px-3 py-2 rounded">
                        <BaseIcon
                          @click="editSurcharge"
                          icon="pencil"
                          color="white"
                        />
                      </div>
                      <div class="bg-red-600 px-3 py-2 rounded">
                        <BaseIcon
                          @click="deleteSurcharge" 
                          icon="trash"
                          color="white"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr
                  class="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <p>Any</p>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <div class="flex justify-content-center gap-4">
                      <div class="bg-blue-600 px-3 py-2 rounded">
                        <BaseIcon
                          @click="editSurcharge"
                          icon="pencil"
                          color="white"
                        />
                      </div>
                      <div class="bg-red-600 px-3 py-2 rounded">
                        <BaseIcon
                          @click="deleteSurcharge" 
                          icon="trash"
                          color="white"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
    <SurchargeModel
      v-if="showSurchargeModel"
      :show-modal="showSurchargeModel"
      :mode="mode"
      :data="tempSurchargeData"
      @close="showSurchargeModel = false"
    />
  </div>
</template>

<script>
import SurchargeModel from '~/components/SurchargeModel.vue';
export default {
  components: { SurchargeModel },
  middleware: ["auth-admin"],
  data() {
    return {
      showSurchargeModel: false,
      mode: "create",
      tempSurchargeData: {
        key: "Any",
        service: "Any",
        packageType: "Any",
        effectiveAfter: new Date(),
        effectiveBefore: new Date(),
        dollarAmount: 200,
        percentage: 3,
      }
    }
  },
  methods: {
    editSurcharge() {
      this.mode = "edit";
      this.showSurchargeModel = true;
    },
    deleteSurcharge() {
      console.log("delete")
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    @apply flex flex-col justify-start pt-0 items-center text-center mx-0 sm:mx-8;
  }
</style>