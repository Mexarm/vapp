<template>
  <v-footer app>
    <v-container
      fluid
      fill-height
      py-0
    >
      <v-layout align-center justify-end>
        <v-flex shrink>
          &copy; {{ (new Date()).getFullYear() }} — vapp
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<style scoped>
  a {
	color: rgba(0,0,0,0.54);
	text-decoration: none;
}

a:hover i,
a:hover {
	color: #1867c0 !important;
}
</style>