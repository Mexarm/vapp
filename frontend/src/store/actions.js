import authService from '../services/auth'

function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
};

export default {
  updateSideNav({ commit }, payload) {
    commit('setSideNav', payload)
  },
  signInUser({ commit }, payload) {
    commit('setLoading', true)
    authService.authenticate(payload)
      .then((resp) => {
        commit('setLoading', false)
        let parsedToken = parseJwt(resp.token)
        const user = {
          first_name: parsedToken.user.first_name,
          last_name: parsedToken.user.last_name,
          email: parsedToken.user.email,
          id: parsedToken.user.id
          // groups: parsedToken.user_groups
        }
        commit('setUser', user)
      }
      )
      .catch((err) => {
        commit('setLoading', false)
        let message = err.bodyText
        if (err.status === 401) {
          message = 'No Autorizado verifique credenciales'
        }
        commit('setError', message)
      }
      )
  }
}
