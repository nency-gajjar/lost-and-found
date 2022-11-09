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
        <table class="min-w-full">
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
              class="border-b border-gray-200 hover:bg-gray-100"
            >
              <!-- Item Description -->
              <td class="py-3 px-2 text-left">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <BaseInput
                    :readonly="isFieldsEnable(index, item)"
                    class="w-80"
                    v-model="item.item_description"
                    label="Item Description"
                    type="text"
                    :class="errors.length > 0 && 'error'"
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
                    :disabled="isFieldsEnable(index, item)"
                    v-model="item.package_type"
                    :options="packageTypeOptions"
                    label="Package Type"
                    class="w-40"
                    :class="errors.length > 0 && 'error'"
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
                      :readonly="isFieldsEnable(index, item)"
                      v-model="item.weight_pounds"
                      class="w-20"
                      label="Pounds"
                      type="text"
                      :class="errors.length > 0 && 'error'"
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
                      :readonly="isFieldsEnable(index, item)"
                      class="w-20"
                      v-model="item.item_length"
                      label="Length"
                      type="text"
                      :class="errors.length > 0 && 'error'"
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
                      :readonly="isFieldsEnable(index, item)"
                      class="w-20"
                      v-model="item.item_width"
                      label="Width"
                      type="text"
                      :class="errors.length > 0 && 'error'"
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
                      :readonly="isFieldsEnable(index, item)"
                      class="w-20"
                      v-model="item.item_height"
                      label="Height"
                      type="text"
                      :class="errors.length > 0 && 'error'"
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
                <div class="flex item-center justify-center gap-3">
                  <template v-if="index < originalItemsLength">
                    <button
                      v-show="item.isEdit"
                      @click="editItemDesc(item)"
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
                      @click="enableFields(item.id)"
                      v-show="!item.isEdit"
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
                      Enable
                    </button>
                  </template>
                  <button
                    v-show="index < originalItemsLength"
                    @click="deleteItemDesc(item)"
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
            @click="validate().then(addNewItem)"
          >
            + Add New Item
          </button>
        </div>
      </div>
      <template v-slot:footer>
        <BaseButton
          :is-loading="isLoading"
          @click="validate().then(onSave)"
          button-type="submit"
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

export default {
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
    originalItemsLength: null,
  }),
  computed: {
    enableSaveButton(){
      if(this.items.length > this.originalItemsLength){
        return true;
      }
      return false;
    },
  },
  methods: {
    isFieldsEnable(index, item){
      if(index < this.originalItemsLength){
        if(!item.isEdit){
          return true;
        }
      }
      return false;
    },
    enableFields(id){
      let index = this.items.findIndex(item => {
        return id === item.id;
      });

      if(index !== -1){
        this.items[index].isEdit = true;
      }
    },
    getItemDescriptionOptions() {
      this.$axios
        .get("/viewallItemdescriptionDetails")
        .then((response) => {
          if (response.status === 200) {
            this.items = response.data?.data?.Items || [];
            this.items = this.items.map(item => {
              return{
                ...item,
                weight_ounces: String(item.weight_ounces),
                isEdit: false,
              }
            })
            this.originalItemsLength = this.items.length;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async editItemDesc(item){
      const isValid = await this.$refs.observer.validate();
      if(isValid){
        let id = item.id;
        delete item.id;
        this.$axios
          .post("/updateItemdescriptionDetails", item, { 
            headers: {
              Authorization: localStorage.getItem("auth._token.local")
            }, params: {id: id} })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
      }
      else{
        console.log("invalid");
      }
    },
    deleteItemDesc(item){
      this.$axios
        .post("/deleteItemdescriptionDetails", item, { 
          headers: {
            Authorization: localStorage.getItem("auth._token.local")
          }, params: {id: item.id} })
        .then(res => {
          console.log(res);
          this.getItemDescriptionOptions();
        })
        .catch(err => {
          console.log(err);
        })
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
        };
        this.items.push(itemObject);
      } else {
        console.log("invalid");
      }
    },
    async onSave() {
      let itemsToSave = [...this.items];
      itemsToSave.splice(0, this.originalItemsLength);
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        // console.log("valid");
        this.$axios
          .post("/storeItemdescriptionDetails", itemsToSave, { 
            headers: {
              Authorization: localStorage.getItem("auth._token.local")
            }})
          .then(res => {
            console.log(res);
            this.getItemDescriptionOptions();
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        console.log("invalid");
      }
    },
  },
  mounted(){
    this.getItemDescriptionOptions();
  },
};
</script>

<style lang="sass" scoped>
</style>