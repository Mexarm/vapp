<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
            <v-btn @click="getFecha">obtener fecha de API</v-btn>
            {{ fecha }}
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      fecha: null
    }
  },
  computed: {
    sideNav() {
      return this.$store.getters.sideNav
    }
  },
  methods: {
    getFecha() {
      axios.get('http://localhost:8000/vapp/api/fecha')
      .then(res => {
        this.fecha = res.data.fecha
        console.log(res)
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
