export default {
  setUser(state, payload) {
    state.user = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  setSideNav(state, payload) {
    state.sideNav = payload
  }
}
