<template>
  <!-- <div v-show="!loading">
    <form @submit.prevent.stop="onSubmit" v-html="w2pForm"></form>
  </div> -->
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Login</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <form @submit.prevent.stop="onSubmit" id="w2pform" enctype="multipart/form-data">
            <fieldset v-html="w2pForm">
            </fieldset>
          </form>
          <iframe src="http://localhost:8000/vapp/default/user_form/login" frameborder="0"></iframe>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-btn @click="getData">
            get data
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
export default {
  data() {
    return {
      w2pForm: null,
      loading: false,
      message: ''
    }
  },
  methods: {
    onSubmit() {
      var form = document.getElementById('w2pform')
      console.log(form)
      var formData = new FormData(form)
      console.log(formData)
      this.$http.post('http://localhost:8000/vapp/default/user_form/login', formData).then(
        resp => {
          var el = document.createElement('div')
          el.innerHTML = resp.body
          var frm = el.getElementsByTagName('form')[0] // Live NodeList of your anchor elements
          this.w2pForm = frm.innerHTML
          console.log(resp)
        },
        err => {
          console.log(err)
        }
      )
    },
    getData() {
      this.$http.get('http://localhost:8000/vapp/default/api_get_user_email').then(
        resp => {
          this.message = resp.body.email
          console.log(resp.data)
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  created() {
    this.$http.get('http://localhost:8000/vapp/default/user_form/login').then(
      resp => {
        var el = document.createElement('div')
        el.innerHTML = resp.body
        var frm = el.getElementsByTagName('form')[0] // Live NodeList of your anchor elements
        this.w2pForm = frm.innerHTML
        console.log(frm)
      },
      err => {
        console.log(err)
      }
    )
  }
}
</script>