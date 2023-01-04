export const state = () => ({
    tabId: "",
})

export const getters = {
    tabId: (state) => {
        return state.tabId;
    },
}

export const actions = {
}

export const mutations = {
    SET_TAB_ID(state, tabId) {
        state.tabId = tabId;
    },
}
