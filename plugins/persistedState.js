import createPersistedState from 'vuex-persistedstate';

// Add a new store path here to persist it
const pathsToPersist = ['item', 'shipment']

export default ({ store }) => {
  pathsToPersist.forEach((path) => {
    createPersistedState({
      key: 'L&F_' + path,
      paths: [path],
      rehydrated: (store) => {
        store.state.rehydrated = true
      },
    })(store)
  })
}
