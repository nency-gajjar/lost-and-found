<template>
  <div class="wrapper">
    <div
      class="
        w-full
        mx-6
        lg:mx-0
        md:w-8/12
        lg:w-7/12
        xl:w-6/12
        bg-white
        border border-[#E1E3E6]
        rounded-lg
      "
      style="box-shadow: rgba(54, 28, 93, 0.04) -10px 18px 32px"
    >
      <ValidationObserver v-slot="{ validate }" ref="observer">
        <form @submit.prevent="validate().then(onSubmit)">
          <div class="sm:p-6 p-4 space-y-4">
            <div class="form-title">
              <div>
                <h1
                  class="
                    w-full
                    my-2
                    text-xl
                    font-bold
                    leading-tight
                    text-gray-700
                  "
                >
                  CUSTOM SHIPPING DETAILS
                </h1>
                <div class="flex justify-start">
                  <span
                    class="
                      w-20
                      border-t-4 border-solid border-orange-200
                      inline-block
                      mb-3
                    "
                  ></span>
                </div>
              </div>
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
            <div>
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
                  text-sm
                  pt-4
                  pb-2
                  transition-shadow
                  text-gray-800
                "
              ></textarea>
            </div>

            <!-- Restriction Comments -->
            <div>
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
                  text-sm
                  pt-4
                  pb-2
                  transition-shadow
                  text-gray-800
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
            >
              <BaseInput
                v-model="customsSigner"
                type="text"
                label="Customs Signer"
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
          <div
            v-show="showValidateAlert"
            class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            <span class="font-medium">Oops!</span> Please fill all required
            fields and try submitting again.
          </div>
          <div class="flex justify-end mr-6">
            <BaseButton type="submit">
              Submit
            </BaseButton>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import eventListners from "../mixins/eventListners.js";
import scrollToError from "../mixins/scrollToError.js";

export default {
  mixins: [eventListners, scrollToError],
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

<style lang="scss">
.wrapper {
  @apply min-h-screen flex justify-center py-10 mx-auto;
}
</style>