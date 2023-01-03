<template>
  <div class="wrapper">
    <BaseCard class="md:w-8/12 lg:w-7/12 xl:w-6/12">
      <ValidationObserver v-slot="{ validate }" ref="observer">
        <form @submit.prevent="validate().then(onSubmit)">
          <div class="sm:p-6 p-4 space-y-4">
            <div class="form-title">
              <BaseHeader varient="gray">Custom Shipping Details</BaseHeader>
            </div>

            <!-- Custom Items Value -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|numeric"
              class="block"
              name="Custom Item's value"
            >
              <BaseInput
                :isRequired="true"
                v-model="customItemsValue"
                type="text"
                label="Custom Item's Value"
                :class="errors.length > 0 && 'error'"
              />
            </ValidationProvider>

            <!-- EEL code or PFC -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="block"
            >
              <BaseInput
                :isRequired="true"
                v-model="eel_pfc"
                type="text"
                label="EEL code or PFC"
                :class="errors.length > 0 && 'error'"
              />
            </ValidationProvider>

            <!-- Contents Explanation -->
            <div class="block">
              <textarea
                v-model="contentsExplanation"
                placeholder="Contents Explanation (Optional)"
                class="
                  border
                  inline-block
                  border-gray-300
                  w-full
                  rounded-lg
                  px-4
                  h-full
                  text-base
                  pt-4
                  pb-2
                  transition-shadow
                  text-gray-700
                "
              ></textarea>
            </div>

            <!-- Restriction Comments -->
            <div class="!mt-3">
              <textarea
                v-model="restrictionComments"
                placeholder="Restriction Comments (Optional)"
                class="
                  border
                  inline-block
                  border-gray-300
                  w-full
                  rounded-lg
                  px-4
                  h-full
                  text-base
                  pt-4
                  pb-2
                  transition-shadow
                  text-gray-700
                "
              ></textarea>
            </div>

            <!-- Customs Certify -->
            <div class="text-gray-500 flex items-center space-x-3 ml-4">
              <input
                v-model="customsCertify"
                id="customs-certify"
                type="checkbox"
                class="
                  text-accent-100
                  rounded-sm
                  focus:ring-accent-100
                  border-gray-300
                  transition-all
                  h-5
                  w-5
                "
              />
              <label for="customs-certify"> Customs Certify</label>
            </div>
            <ValidationProvider
              v-if="customsCertify"
              v-slot="{ errors }"
              name="Customs Signer"
              class="block"
              rules="required"
            >
              <BaseInput
                v-model="customsSigner"
                type="text"
                label="Customs Signer"
                :class="errors.length > 0 && 'error'"
              />
            </ValidationProvider>

            <ValidationAlert :show-alert="showValidateAlert" />

            <div class="flex justify-end">
              <BaseButton type="submit">
                Submit
              </BaseButton>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </BaseCard>
  </div>
</template>

<script>
import eventListners from "../mixins/eventListners.js";
import scrollToError from "../mixins/scrollToError.js";
import ValidationAlert from '~/components/shared/ValidationAlert.vue'

export default {
  mixins: [eventListners, scrollToError],
  components: {
    ValidationAlert
  },
  data() {
    return {
      eel_pfc: "NOEEI 30.37(a)",
      contentsExplanation: "",
      restrictionComments: "",
      customItemsValue: "",
      customsCertify: false,
      customsSigner: "",
      itemDetails: {},
      showValidateAlert: false,
    };
  },
  async mounted() {
    if(!this.$route.params.fromItemDelivery) {
      if (
        JSON.parse(
          JSON.stringify(this.$store.getters["shipment/itemDeliveryId"])
        )
      ) {
        this.$nextTick(() => {
          this.$router.push({
            name: "item-delivery",
            query: {
              id: JSON.parse(
                JSON.stringify(this.$store.getters["shipment/itemDeliveryId"])
              ),
            },
          });
        });
      } else {
        this.$nextTick(() => {
          this.$router.push({
            name: "lost-items",
          });
        });
      }
    }
    else{
      try {
        let response = await this.$axios.get(
          "/getsinglelostitem?id=" + this.$route.query.id
        );
        this.itemDetails = response.data.data.Item;
        } catch (err) {
        console.log(err);
      }
      if(this.$store.getters["shipment/insuranceValue"]) {
        this.customItemsValue = JSON.parse(
          JSON.stringify(this.$store.getters["shipment/insuranceValue"])
        )
      }
    }
    
    this.callEventListners();
  },
  watch: {
    customItemsValue(value){
      if(value === ""){
        this.eel_pfc = "NOEEI 30.37(a)";
      }
      else if(Number(value) < 2500){
        this.eel_pfc = "NOEEI 30.37(a)";
      }
      else{
        this.eel_pfc = "AES X20120502123456";
      }
    }
  },
  methods: {
    async onSubmit(){
      const isValid = await this.$refs.observer.validate();
      if(isValid){
        let params = {
          eel_pfc: this.eel_pfc,
          customs_certify: this.customsCertify,
          customs_signer: this.customsSigner,
          contents_explanation: this.contentsExplanation,
          restriction_type: "none",
          restriction_comments: this.restrictionComments,
          customs_items: [
            {
              description: this.itemDetails.item_description,
              quantity: 1,
              weight: Number(this.itemDetails.weight_pounds),
              value: Number(this.customItemsValue),
              origin_country: this.itemDetails.country.trim()
            }
          ]
        }
        this.$store.commit("shipment/SET_CUSTOM_INFO", params);
        this.$nextTick(() => {
          this.$router.push({
            name: "rate-quotes",
            query: { id: this.$route.query.id },
            params: { fromItemDelivery: true },
          });
        });
      }
      else{
        this.scrollToError();
        this.showValidateAlert = true;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}
</style>