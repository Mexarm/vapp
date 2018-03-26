import authService from '../services/auth'
import { getUser } from './utils/utils'

export default {
  updateSideNav({ commit }, payload) {
    commit('setSideNav', payload)
  },
  signInUser({ commit }, payload) {
    commit('setError', null)
    commit('setLoading', true)
    authService.authenticate(payload)
      .then((resp) => {
        commit('setLoading', false)
        localStorage.setItem('token', resp.token)
        commit('setUser', getUser(resp.token))
      }
      )
      .catch((err) => {
        commit('setLoading', false)
        let message = err.bodyText
        if (err.status === 401) {
          message = 'No Autorizado verifique credenciales'
        }
        if (err.status === 0) {
          message = 'Error de conexion'
        }
        commit('setError', { message })
      }
      )
  },

  signOutUser({ commit }) {
    localStorage.removeItem('token')
    commit('setUser', null)
  },

  checkAuth({ commit }) {
    var jwt = localStorage.getItem('token')
    if (jwt) {
      commit('setUser', getUser(jwt))
    } else {
      commit('setUser', null)
    }
  },

  clearError({ commit }) {
    commit('setError', null)
  }
}
