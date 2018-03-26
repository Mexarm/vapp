<template>
  <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    sideNav: {
      get() {
        return this.$store.getters.sideNav
      },
      set(value) {
        this.$store.dispatch('updateSideNav', value)
      }
    },
    menuItems() {
      return this.$store.getters.menuItems
    },
    userIsAuthenticated() {
      return this.$store.getters.userIsAuthenticated
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('signOutUser')
    }
  }
}
</script>

