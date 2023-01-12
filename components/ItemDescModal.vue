<template>
  <BaseModal
    :header="headerText"
    :show-modal="showModal"
    size="is-small"
    @close="$emit('close')"
    :hideCancel="true"
  >
    <div
      class="space-y-4 !shadow-primary flex flex-col text-left"
    >
      <ValidationObserver v-slot="{ validate }" ref="observer">
        <form
          class="grid gap-4 mt-1"
          @submit.prevent="validate().then(onSubmit)"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="block"
          >
            <BaseInput :isRequired="true" v-model="itemDescObj.item_description" label="Item Description" :class="errors.length > 0 && 'error'" />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="block"
          >
            <BaseSelect :isRequired="true" v-model="itemDescObj.package_type" :options="packageTypeOptions" label="Package Type" :class="errors.length > 0 && 'error'" />
          </ValidationProvider>
          <label class="text-sm mt-2 font-medium text-gray-500">Weight</label>
          <div class="grid sm:grid-cols-2 gap-4">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|weight|positiveNumber"
              class="block col-span-1"
              name="Pounds"
            >
              <BaseInput :isRequired="true" @input="changedPound" v-model="itemDescObj.weight_pounds" label="Pounds" :class="errors.length > 0 && 'error'" />
              <p
                v-if="errors.length"
                class="vee-validation-error mt-2 text-sm text-red-600"
              >
                {{ errors[0] }}
              </p>
            </ValidationProvider>
            <div class="block col-span-1">
              <BaseInput
                v-model="itemDescObj.weight_ounces"
                @input="changedOunces"
                label="Ounces"
              />
            </div>
          </div>
          <label class="text-sm mt-2 font-medium text-gray-500">Dimensions</label>
          <div class="grid sm:grid-cols-3 gap-4">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|float|positiveNumber"
              class="block col-span-1"
              name="Length"
            >
              <BaseInput :isRequired="true" v-model="itemDescObj.item_length" label="Length" :class="errors.length > 0 && 'error'" />
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
              class="block col-span-1"
              name="Width"
            >
              <BaseInput :isRequired="true" v-model="itemDescObj.item_width" label="Width" :class="errors.length > 0 && 'error'" />
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
              class="block col-span-1"
              name="Height"
            >
              <BaseInput :isRequired="true" v-model="itemDescObj.item_height" label="Height" :class="errors.length > 0 && 'error'" />
              <p
                v-if="errors.length"
                class="vee-validation-error mt-2 text-sm text-red-600"
              >
                {{ errors[0] }}
              </p>
            </ValidationProvider>
          </div>
          <BaseButton
            type="submit"
            class="max-w-[16rem] w-full mx-auto my-2"
            :is-loading="isLoading"
          >
            Submit
          </BaseButton>
        </form>
      </ValidationObserver>
    </div>
  </BaseModal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import scrollToError from "../mixins/scrollToError.js";
import { weightOuncesOptions } from "../static/defaults.js";

export default {
  mixins: [scrollToError],
  props: {
    showModal: { type: Boolean, default: false },
    mode: { type: String, default: "create" },
    data: { type: Object, default: {} },
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      weightOuncesOptions: weightOuncesOptions,
      packageTypeOptions: ["Box", "Envelope"],
      itemDescObj: {
        item_description: "",
        package_type: "",
        weight_pounds: "",
        weight_ounces: "0",
        item_length: "",
        item_width: "",
        item_height: "",
      },
      isLoading: false,
      tempEditData: {}
    };
  },
  mounted() {
    if (this.mode === "edit") {
      this.itemDescObj = {...this.data};
      this.tempEditData = {...this.data};
    }
    this.changedPound();
    this.changedOunces();
  },
  computed: {
    headerText() {
      if(this.mode === "edit"){
        return "Edit Item Description";
      }
      return "Add a new Item Description"
    },
  },
  methods: {
    changedPound(){
      this.itemDescObj.weight_ounces = Number((Number(this.itemDescObj.weight_pounds) * 16).toFixed(1));
    },
    changedOunces(){
      this.itemDescObj.weight_pounds = Number((Number(this.itemDescObj.weight_ounces) / 16).toFixed(1));
    },
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        if(this.mode === "edit"){
          this.isLoading = true;
          let updateParams = {
            ...this.itemDescObj,
            item_height: Number(this.itemDescObj.item_height),
            item_length: Number(this.itemDescObj.item_length),
            item_width: Number(this.itemDescObj.item_width),
            weight_pounds: Number(this.itemDescObj.weight_pounds),
          };

          const diff = Object.keys(this.tempEditData).reduce((result, key) => {
            if (!updateParams.hasOwnProperty(key)) {
              result.push(key);
            } else if (_.isEqual(this.tempEditData[key], updateParams[key])) {
              const resultKeyIndex = result.indexOf(key);
              result.splice(resultKeyIndex, 1);
            }
            return result;
          }, Object.keys(updateParams));

          let requestData = {};

          diff.forEach((key) => {
            if (updateParams[key] != undefined) {
              requestData[key] = updateParams[key];
            }
          });

          if(Object.keys(requestData).length > 0){
            this.$axios
              .post("/updateItemdescriptionDetails", requestData, {
                headers: {
                  Authorization: localStorage.getItem("auth._token.local"),
                },
                params: { id: this.itemDescObj.id },
              })
              .then((res) => {
                if (res.status === 200) {
                  this.$toast.info("Item Description updated successfully!");
                  this.isLoading = false;
                  this.$emit("close");
                }
              })
              .catch((err) => {
                this.$toast.error("Something went wrong! Please try again.");
                this.isLoading = false;
                console.log(err);
              });
          }
          else{
            this.isLoading = false;
            this.$emit("close");
          }
        }
        else{
          this.isLoading = true;
          let itemDescToSave = [{
            ...this.itemDescObj,
            item_height: Number(this.itemDescObj.item_height),
            item_length: Number(this.itemDescObj.item_length),
            item_width: Number(this.itemDescObj.item_width),
            weight_pounds: Number(this.itemDescObj.weight_pounds),
          }];
          
          this.$axios
            .post("/storeItemdescriptionDetails", itemDescToSave, {
              headers: {
                Authorization: localStorage.getItem("auth._token.local"),
              },
            })
            .then((res) => {
              if (res.status === 200) {
                this.$toast.info("Item Description added successfully!");
                this.isLoading = false;
                this.$emit("close");
              }
            })
            .catch((err) => {
              this.$toast.error("Something went wrong! Please try again.");
              this.isLoading = false;
              console.log(err);
            });
        }
      }
      else{
        this.scrollToError();
      }
    },
  },
};
</script>
