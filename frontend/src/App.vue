<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app color="primary" dark fixed height="58px" flat ref="toolbar" id="app-toolbar">
      <router-link :to="{ name : 'Home' }" class="d-flex ml-3">
        <img src="@/assets/logo.png" height="38px" width="38px" alt="vapp">
      </router-link>
      <v-fade-transsition mode="out-in">
        <v-toolbar-title class="pb-1 hidden-xs-only">vuetify web2py scaffolding app</v-toolbar-title>
      </v-fade-transsition>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>

    <app-footer></app-footer>

  </v-app>
</template>

<script>
import appFooter from './components/core/AppFooter'

export default {
  data() {
    return {
      test: ''
    }
  },
  components: {
    appFooter
  }
}
</script>

<style>
#app-toolbar .toolbar__title {
  margin-left: 0.5em;
  font-weight: 300;
  font-size: 21px;
  position: relative;
  top: 1px;
}

#app-toolbar .toolbar__items .btn {
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 300;
}
</style>
