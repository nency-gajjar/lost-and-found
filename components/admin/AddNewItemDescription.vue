<template>
  <BaseModal
    header="Add New Item Description"
    :show-modal="showModal"
    size="is-large"
    @close="$emit('close')"
  >
    <div
      class="
        align-middle
        inline-block
        w-full
        whitespace-nowrap
        overflow-hiddenrounded-bl-lg
        rounded-br-lg
      "
    >
      <table class="min-w-full">
        <thead class="sticky top-0 z-20">
          <tr
            class="bg-gray-200 font-light text-gray-600 text-md leading-normal"
          >
            <th data-priority="1" class="py-3 px-2 text-left">
              Item Description
            </th>
            <th class="py-3 px-2 text-left">Package Type</th>
            <th class="py-3 px-2 text-left">Weight</th>
            <th class="py-3 px-2 text-left">Dimensions</th>
            <th class="py-3 px-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(item, index) in items"
            :key="index"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-2 text-left">
              <BaseInput
                class="w-80"
                v-model="item.itemDescription"
                label="Item Description"
                type="text"
              />
            </td>
            <td class="py-3 px-2 text-left">
              <BaseSelect
                v-model="item.packageType"
                :options="packageTypeOptions"
                label="Package Type"
                class="w-40"
              />
            </td>
            <td class="py-3 px-2 text-left">
              <div class="flex gap-3">
                <BaseInput
                  class="w-20"
                  v-model="item.weightPounds"
                  label="Pounds"
                  type="text"
                />
                <BaseSelect
                  class="w-24"
                  v-model="item.weightOunces"
                  :options="weightOuncesOptions"
                  label="Ounces"
                />
              </div>
            </td>
            <td class="py-3 px-2 text-center">
              <div class="flex gap-3">
                <BaseInput
                  class="w-20"
                  v-model="item.itemLength"
                  label="Length"
                  type="text"
                />
                <BaseInput
                  class="w-20"
                  v-model="item.itemWidth"
                  label="Width"
                  type="text"
                />
                <BaseInput
                  class="w-20"
                  v-model="item.itemHeight"
                  label="Height"
                  type="text"
                />
              </div>
            </td>
            <td class="py-3 px-2 text-center">
              <div class="flex item-center justify-center gap-3">
                <button
                  class="
                    bg-blue-500
                    text-white
                    active:bg-blue-600
                    font-bold
                    text-sm
                    px-4
                    py-2
                    rounded
                    shadow
                    hover:shadow-md
                    outline-none
                    focus:outline-none
                    mr-1
                    mb-1
                  "
                  type="button"
                >
                  Edit
                </button>
                <button
                  class="
                    bg-red-500
                    text-white
                    active:bg-red-600
                    font-bold
                    text-sm
                    px-4
                    py-2
                    rounded
                    shadow
                    hover:shadow-md
                    outline-none
                    focus:outline-none
                    mr-1
                    mb-1
                  "
                  type="button"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-start my-5 ml-2">
        <button
          class="
            bg-green-600
            text-white
            active:bg-green-700
            font-bold
            text-sm
            px-4
            py-2
            rounded
            shadow
            hover:shadow-md
            outline-none
            focus:outline-none
            mr-1
            mb-1
          "
          type="button"
          @click="addNewItem"
        >
          + Add New Item
        </button>
      </div>
    </div>
    <template v-slot:footer>
      <BaseButton :is-loading="isLoading" button-type="submit">
        Save
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script>
import {
  itemDescriptionOptions,
  weightOuncesOptions,
} from "static/defaults.js";

export default {
  props: {
    showModal: { type: Boolean, default: false },
  },
  data: () => ({
    itemDescriptionOptions: itemDescriptionOptions,
    weightOuncesOptions: weightOuncesOptions,
    packageTypeOptions: ["Box", "Envelope"],
    item: {
      itemDescription: "",
      packageType: "",
      weightPounds: "",
      weightOunces: "",
      itemLength: "",
      itemWidth: "",
      itemHeight: "",
    },
    items: [],
    isLoading: false,
  }),
  methods: {
    addNewItem() {
      let itemObject = {
        itemDescription: this.itemDescription,
        packageType: this.packageType,
        weightPounds: this.weightPounds,
        weightOunces: this.weightOunces,
        itemLength: this.itemLength,
        itemWidth: this.itemWidth,
        itemHeight: this.itemHeight,
      };
      this.items.push(itemObject);
    },
  },
};
</script>