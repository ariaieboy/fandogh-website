import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            paths: ['manifest', 'transactionDetail', 'activePlan'],
        })(store)
    })
}
