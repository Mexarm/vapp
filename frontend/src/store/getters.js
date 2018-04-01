import { expiredJwt } from './utils/utils'

export default {
  menuItems(state, getters) {
    let menuItems = [
      { icon: 'face', title: 'Sign up', link: {name: 'SignUp'} },
      { icon: 'lock_open', title: 'Sign in', link: {name: 'SignIn'} }
    ]
    if (getters.userIsAuthenticated) {
      menuItems = [
        { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
        { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
        { icon: 'person', title: 'Profile', link: '/profile' }
      ]
    }
    return menuItems
  },
  user (state) {
    return state.user
  },
  userIsAuthenticated(state) {
    return state.user !== null && state.user !== undefined
  },
  sideNav(state) {
    return state.sideNav
  },
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  },

  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  },

  tokenIsExpired() {
    var jwt = localStorage.getItem('token')
    return expiredJwt(jwt)
  }
}
