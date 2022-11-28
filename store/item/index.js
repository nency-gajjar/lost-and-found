
export const state = () => ({
    itemDetails: {},
    itemConfirmationDetails: {}
})

export const getters = {
    itemDetails: (state) => {
        return JSON.parse(JSON.stringify(state.itemDetails))
    },
    itemConfirmationDetails: (state) => {
        return state.itemConfirmationDetails
    }
}

export const actions = {
}

export const mutations = {
    SET_ITEM_DETAILS(state, itemDetails) {
        // localStorage.setItem('itemDetails', JSON.stringify(itemDetails));
        state.itemDetails = itemDetails
    },
    SET_ITEM_CONFIRMATION_DETAILS(state, itemConfirmationDetails) {
        state.itemConfirmationDetails = itemConfirmationDetails
    },
}
