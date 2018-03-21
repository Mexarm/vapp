export default {
  menuItems(state) {
    let menuItems = [
      { icon: 'face', title: 'Sign up', link: '/signup' },
      { icon: 'lock_open', title: 'Sign in', link: {name: 'SignIn'} }
    ]
    if (state.userIsAuthenticated) {
      menuItems = [
        { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
        { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
        { icon: 'person', title: 'Profile', link: '/profile' }
      ]
    }
    return menuItems
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
  }
}
