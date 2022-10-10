
export const state = () => ({
    itemDetails: {},
})

export const getters = {
    itemDetails: (state) => {
        return JSON.parse(JSON.stringify(state.itemDetails))
    },
}

export const actions = {
}

export const mutations = {
    SET_ITEM_DETAILS(state, itemDetails) {
        localStorage.setItem('itemDetails', JSON.stringify(itemDetails));
        state.itemDetails = itemDetails
    },
}
