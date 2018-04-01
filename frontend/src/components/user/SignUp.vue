<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card id="component" raised class="pb-3">
          <v-card-title>
            <v-toolbar flat dark color="primary">
              <v-toolbar-title class="mx-auto">
                <v-icon left dark class="mr-3">face
                </v-icon>Sign Up
              </v-toolbar-title>
            </v-toolbar>

          </v-card-title>
          <v-flex xs12 class="mx-4">

            <form>
              <v-text-field :label="labels['Name']" v-model="name" :error-messages="nameErrors" :counter="10" @input="$v.name.$touch()" @blur="$v.name.$touch()" required></v-text-field>
              <v-text-field :label="labels['e-mail']" v-model="email" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" required></v-text-field>
              <v-select 
                  :label="labels['Organization']" 
                  v-model="organization" 
                  :items="organizations"
                  item-text="name"
                  item-value="id"
                  :error-messages="selectErrors" 
                  @change="$v.organization.$touch()" 
                  @blur="$v.organization.$touch()" 
                  required></v-select>
              <v-checkbox :label="labels['Do you agree?']" v-model="checkbox" :error-messages="checkboxErrors" @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()" required></v-checkbox>

              <v-btn @click="submit">{{ labels['Submit'] }}</v-btn>
              <v-btn @click="clear">{{ labels['Clear']}}</v-btn>
            </form>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      name: '',
      email: '',
      organization: null,
      organizations: [],
      terms: false,
      labels: {
        'Name': 'Name',
        'e-mail': 'e-mail',
        'Organization': 'Organization',
        'Do you agree?': 'Do you agree?',
        'Submit': 'Submit',
        'Clear': 'Clear'
      }

    }
  },
  created () {
    axios.get('http://localhost:8000/vapp/default/api/organization.json')
    .then(resp => {
      this.organizations = resp.data.content
    }, err => {
      console.log(err.response)
    })
    axios.post('http://localhost:8000/vapp/api/translate.json', this.labels)
    .then(resp => {
      this.labels = resp.data
    }, err => {
      console.log(err.response)
    })
  }
}
</script>


<style>

</style>
