export const state = () => ({
    shippingRates: {},
    lableDetails: {},
    selectedRate: {},
    customInfo: {},
    insuranceValue: "",
    insuranceCharges: 0,
    signature: null,
    labelUrl: "",
    itemId: "",
    shipmentId: "",
    itemDeliveryId: "",
})

export const getters = {
    shippingRates: (state) => {
        return state.shippingRates;
    },
    lableDetails: (state) => {
        return state.lableDetails;
    },
    selectedRate: (state) => {
        return state.selectedRate;
    },
    insuranceValue: (state) => {
        return state.insuranceValue;
    },
    signature: (state) => {
        return state.signature;
    },
    labelUrl: (state) => {
        return state.labelUrl;
    },
    itemId: (state) => {
        return state.itemId;
    },
    shipmentId: (state) => {
        return state.shipmentId;
    },
    itemDeliveryId: (state) => {
        return state.itemDeliveryId;
    },
    customInfo: (state) => {
        return state.customInfo;
    },
    insuranceCharges: (state) => {
        return state.insuranceCharges;
    },
}

export const actions = {
}

export const mutations = {
    SET_SHIPPING_RATES(state, shippingRates) {
        state.shippingRates = shippingRates;
    },
    SET_LABLE_DETAILS(state, lableDetails) {
        state.lableDetails = lableDetails;
    },
    SET_SELECTED_RATE(state, selectedRate) {
        state.selectedRate = selectedRate;
    },
    SET_INSURANCE_VALUE(state, insuranceValue) {
        state.insuranceValue = insuranceValue;
    },
    SET_SIGNATURE(state, signature) {
        state.signature = signature;
    },
    SET_LABEL_DETAILS(state, labelDetails) {
        state.labelUrl = labelDetails.lableUrl;
        state.itemId = labelDetails.itemId;
        state.shipmentId = labelDetails.shipmentId;
    },
    SET_ITEM_DELIVERY_ID(state, itemDeliveryId) {
        state.itemDeliveryId = itemDeliveryId;
    },
    SET_CUSTOM_INFO(state, customInfo) {
        state.customInfo = customInfo;
    },
    SET_INSURANCE_CHARGES(state, insuranceCharges) {
        state.insuranceCharges = insuranceCharges;
    },
}
