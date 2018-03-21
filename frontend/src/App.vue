<template>

  <v-app>
    <app-drawer></app-drawer>
    <app-toolbar></app-toolbar>
    <main>
      <v-content>
        <router-view></router-view>
      </v-content>
    </main>
    <app-footer></app-footer>
  </v-app>

</template>

<script>
import appFooter from './components/core/AppFooter'
import appToolbar from './components/core/AppToolbar'
import appDrawer from './components/core/AppDrawer'

export default {
  components: {
    appFooter,
    appToolbar,
    appDrawer
  }
}
</script>
