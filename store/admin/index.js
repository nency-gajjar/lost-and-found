export const state = () => ({
    token: "",
})

export const getters = {
    token: (state) => {
        return state.token;
    },
}

export const actions = {
}

export const mutations = {
    SET_TOKEN(state, tokenObj) {
        this.$cookiz.set('token', tokenObj.token);
        state.token = tokenObj.token;
    },
}
