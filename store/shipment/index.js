export const state = () => ({
    shippingRates: {},
    lableDetails: {},
    selectedRate: {},
    insuranceValue: "",
    signature: null,
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
    }
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
}
