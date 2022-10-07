
export const state = () => ({
    itemDetails: {},
})

export const getters = {
    itemDetails: (state) => {
        return state.itemDetails
    },
}

export const actions = {
}

export const mutations = {
    SET_ITEM_DETAILS(state, itemDetails) {
        state.itemDetails = itemDetails
    },
}
