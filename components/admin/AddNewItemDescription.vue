<template>
  <ValidationObserver v-slot="{ validate }" ref="observer">
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
        <table class="min-w-full" v-if="!isLoadingItemDesc && items.length > 0">
          <thead class="sticky top-0 z-20">
            <tr
              class="
                bg-gray-200
                font-light
                text-gray-600 text-md
                leading-normal
              "
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
              class="border-b border-gray-200 hover:bg-orange-50"
            >
              <!-- Item Description -->
              <td class="py-3 px-2 text-left">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <BaseInput
                    :isRequired="true"
                    :readonly="isFieldsEnable(index, item)"
                    class="w-80"
                    v-model="item.item_description"
                    label="Item Description"
                    type="text"
                    :class="{
                      error: errors.length > 0,
                      readonly: isFieldsEnable(index, item),
                    }"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </td>

              <!-- Package Type -->
              <td class="py-3 px-2 text-left">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <BaseSelect
                    :isRequired="true"
                    :disabled="isFieldsEnable(index, item)"
                    v-model="item.package_type"
                    :options="packageTypeOptions"
                    label="Package Type"
                    class="w-40"
                    :class="{
                      error: errors.length > 0,
                      readonly: isFieldsEnable(index, item),
                    }"
                  />
                  <p
                    v-if="errors.length"
                    class="vee-validation-error mt-2 text-sm text-red-600"
                  >
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </td>

              <!-- Weight -->
              <td class="py-3 px-2 text-left">
                <div class="flex gap-3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="int|weight"
                    name="Pounds"
                  >
                    <BaseInput
                      :isRequired="true"
                      :readonly="isFieldsEnable(index, item)"
                      v-model="item.weight_pounds"
                      class="w-20"
                      label="Pounds"
                      type="text"
                      :class="{
                        error: errors.length > 0,
                        readonly: isFieldsEnable(index, item),
                      }"
                    />
                    <p
                      v-if="errors.length"
                      class="vee-validation-error mt-2 text-sm text-red-600"
                    >
                      {{ errors[0] }}
                    </p>
                  </ValidationProvider>
                  <BaseSelect
                    :disabled="isFieldsEnable(index, item)"
                    class="w-24"
                    v-model="item.weight_ounces"
                    :options="weightOuncesOptions"
                    label="Ounces"
                    :class="{
                      readonly: isFieldsEnable(index, item),
                    }"
                  />
                </div>
              </td>

              <!-- Dimensions -->
              <td class="py-3 px-2 text-center">
                <div class="flex gap-3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|float|positiveNumber"
                    name="Length"
                  >
                    <BaseInput
                      :isRequired="true"
                      :readonly="isFieldsEnable(index, item)"
                      class="w-20"
                      v-model="item.item_length"
                      label="Length"
                      type="text"
                      :class="{
                        error: errors.length > 0,
                        readonly: isFieldsEnable(index, item),
                      }"
                    />
                    <p
                      v-if="errors.length"
                      class="vee-validation-error mt-2 text-sm text-red-600"
                    >
                      {{ errors[0] }}
                    </p>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|float|positiveNumber"
                    name="Width"
                  >
                    <BaseInput
                      :isRequired="true"
                      :readonly="isFieldsEnable(index, item)"
                      class="w-20"
                      v-model="item.item_width"
                      label="Width"
                      type="text"
                      :class="{
                        error: errors.length > 0,
                        readonly: isFieldsEnable(index, item),
                      }"
                    />
                    <p
                      v-if="errors.length"
                      class="vee-validation-error mt-2 text-sm text-red-600"
                    >
                      {{ errors[0] }}
                    </p>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|float|positiveNumber"
                    name="Height"
                  >
                    <BaseInput
                      :isRequired="true"
                      :readonly="isFieldsEnable(index, item)"
                      class="w-20"
                      v-model="item.item_height"
                      label="Height"
                      type="text"
                      :class="{
                        error: errors.length > 0,
                        readonly: isFieldsEnable(index, item),
                      }"
                    />
                    <p
                      v-if="errors.length"
                      class="vee-validation-error mt-2 text-sm text-red-600"
                    >
                      {{ errors[0] }}
                    </p>
                  </ValidationProvider>
                </div>
              </td>
              <td class="py-3 px-2 text-center">
                <div class="flex item-center gap-3">
                  <template v-if="index < originalItemsLength">
                    <BaseButton
                      v-show="item.isEdit"
                      class="!capitalize !px-4 !py-2 !mr-1 !mb-1"
                      varient="green"
                      :is-loading="isEditingItem[item.id]"
                      @click="editItemDesc(item)"
                    >
                      Update
                    </BaseButton>
                    <BaseButton
                      v-show="!item.isEdit"
                      class="!capitalize !px-4 !py-2 !mr-1 !mb-1"
                      varient="blue"
                      @click="enableFields(item.id)"
                    >
                      Edit
                    </BaseButton>
                  </template>
                  <BaseButton
                    v-if="index < originalItemsLength"
                    :is-loading="isRemovingItem[item.id]"
                    class="!capitalize !px-4 !py-2 !mr-1 !mb-1"
                    varient="red"
                    @click="deleteItemDesc(item)"
                  >
                    Delete
                  </BaseButton>
                  <BaseButton
                    v-else
                    class="!capitalize !px-4 !py-2 !mr-1 !mb-1"
                    @click="items.splice(index, 1)"
                    varient="gray"
                  >
                    Remove
                  </BaseButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pt-8" v-else-if="!isLoadingItemDesc && items.length === 0">
          No Result Found
        </div>
        <div class="pt-8" v-else>
          <BaseLoader :needFullScreen="false" />
        </div>
        <div class="flex justify-start my-5 ml-2">
          <BaseButton
            class="!capitalize !px-4 !py-2 !mr-1 !mb-1"
            varient="green"
            @click="validate().then(addNewItem)"
          >
            + Add New Item
          </BaseButton>
        </div>
      </div>
      <template v-slot:footer>
        <BaseButton
          :is-loading="isLoading"
          @click="validate().then(onSave)"
          type="submit"
          v-show="enableSaveButton"
        >
          Save
        </BaseButton>
      </template>
    </BaseModal>
  </ValidationObserver>
</template>

<script>
import {
  itemDescriptionOptions,
  weightOuncesOptions,
} from "static/defaults.js";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { omit } from "lodash";
import scrollToError from "../../mixins/scrollToError.js";
export default {
  mixins: [scrollToError],
  props: {
    showModal: { type: Boolean, default: false },
  },
  components: {
    ValidationObserver,
    ValidationProvider,
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
    isLoadingItemDesc: false,
    isRemovingItem: {},
    isEditingItem: {},
    originalItemsLength: null,
  }),
  computed: {
    enableSaveButton() {
      if (this.items.length > this.originalItemsLength) {
        return true;
      }
      return false;
    },
  },
  methods: {
    isFieldsEnable(index, item) {
      if (index < this.originalItemsLength) {
        if (!item.isEdit) {
          return true;
        }
      }
      return false;
    },
    enableFields(id) {
      let index = this.items.findIndex((item) => {
        return id === item.id;
      });

      if (index !== -1) {
        this.items[index].isEdit = true;
      }
    },
    getItemDescriptionOptions() {
      this.isLoadingItemDesc = true;
      this.$axios
        .get("/viewallItemdescriptionDetails")
        .then((response) => {
          if (response.status === 200) {
            this.isLoadingItemDesc = false;
            this.items = response.data?.data?.Items || [];
            this.items = this.items.map((item) => {
              return {
                ...item,
                weight_ounces: String(item.weight_ounces),
                isEdit: false,
              };
            });
            this.originalItemsLength = this.items.length;
          }
        })
        .catch((error) => {
          this.isLoadingItemDesc = false;
          console.log(error);
        });
    },
    async editItemDesc(item) {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.$set(this.isEditingItem, item.id, true);
        let id = item.id;
        const data = omit(item, ["id", "isEdit"]);
        this.$axios
          .post("/updateItemdescriptionDetails", data, {
            headers: {
              Authorization: localStorage.getItem("auth._token.local"),
            },
            params: { id: id },
          })
          .then((res) => {
            if (res.status === 200) {
              let index = this.items.findIndex((item) => {
                return id === item.id;
              });
              if (index !== -1) {
                this.items[index].isEdit = false;
              }
              this.isEditingItem[item.id] = false;
            }
          })
          .catch((err) => {
            this.isEditingItem[item.id] = false;
            console.log(err);
          });
      }
    },
    deleteItemDesc(item) {
      this.$set(this.isRemovingItem, item.id, true);
      this.$axios
        .post("/deleteItemdescriptionDetails", item, {
          headers: {
            Authorization: localStorage.getItem("auth._token.local"),
          },
          params: { id: item.id },
        })
        .then((res) => {
          if (res.status === 200) {
            this.isRemovingItem[item.id] = false;
            this.getItemDescriptionOptions();
          }
        })
        .catch((err) => {
          this.isRemovingItem[item.id] = false;
          console.log(err);
        });
    },
    async addNewItem() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        let itemObject = {
          item_description: "",
          package_type: "",
          weight_pounds: "",
          weight_ounces: "0",
          item_length: "",
          item_width: "",
          item_height: "",
          isNew: true,
        };
        this.items.push(itemObject);
      }
    },
    async onSave() {
      let itemsToSave = [...this.items];
      itemsToSave.splice(0, this.originalItemsLength);
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.isLoading = true;
        this.$axios
          .post("/storeItemdescriptionDetails", itemsToSave, {
            headers: {
              Authorization: localStorage.getItem("auth._token.local"),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              this.isLoading = false;
              this.getItemDescriptionOptions();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else{
        this.scrollToError();
      }
    },
  },
  mounted() {
    this.getItemDescriptionOptions();
  },
};
</script>