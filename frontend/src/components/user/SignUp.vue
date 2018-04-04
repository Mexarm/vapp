<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card id="component" raised class="pb-3">
          <v-card-title>
            <v-toolbar flat dark color="primary">
              <v-toolbar-title class="mx-auto">
                <v-icon left dark class="mr-3">face
                </v-icon>{{ $t("title.signup") }}
              </v-toolbar-title>
            </v-toolbar>

          </v-card-title>
          <v-flex xs12 class="mx-4">

            <form>
              <v-text-field :label="$t('user.name')" 
                  v-model="user.name" 
                  :error-messages="nameErrors" 
                  @input="$v.user.name.$touch()" 
                  @blur="$v.user.name.$touch()" 
                  required></v-text-field>
              <v-text-field 
                  :label="$t('user.lastname')" 
                  v-model="user.lastname" 
                  :error-messages="lastnameErrors" 
                  @input="$v.user.lastname.$touch()" 
                  @blur="$v.user.lastname.$touch()" 
                  required></v-text-field>
              <v-text-field 
                  :label="$t('user.email')" 
                  v-model="user.email" 
                  :error-messages="emailErrors" 
                  @blur="$v.user.email.$touch()" 
                  required></v-text-field>
              <v-text-field 
                  :label="$t('user.password')" 
                  v-model="user.password" 
                  :error-messages="passwordErrors" 
                  @input="$v.user.password.$touch()" 
                  @blur="$v.user.email.$touch()" 
                  type="password" 
                  required></v-text-field>
              <v-text-field 
                  :label="$t('user.confirmPassword')" 
                  v-model="confirmPassword" 
                  :error-messages="confirmPasswordErrors" 
                  @input="$v.confirmPassword.$touch()" 
                  @blur="$v.confirmPassword.$touch()" 
                  type="password" 
                  required></v-text-field>
              <v-select 
                  :label="$t('user.organization')" 
                  v-model="user.organization" 
                  :items="organizations" 
                  item-text="name" 
                  item-value="id" 
                  :error-messages="organizationErrors" 
                  @change="$v.user.organization.$touch()" 
                  @blur="$v.user.organization.$touch()" 
                  required></v-select>
              <v-subheader>{{ $t('user.termsAndConditions') }}</v-subheader>
              <v-checkbox :label="$t('user.iAgree')" 
                  v-model="user.terms" 
                  :error-messages="termsErrors" 
                  @change="$v.user.terms.$touch()"
                  @blur="$v.user.terms.$touch()"
                  required></v-checkbox>
<pre> {{ $v }} </pre>
              <v-btn @click="submit">{{ $t('actions.ok') }}</v-btn>
              <v-btn @click="clear">{{ $t('actions.clear') }}</v-btn>
            </form>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
  mixins: [ validationMixin ],
  validations: {
    user: {
      name: {
        required,
        maxLength: maxLength(50)
      },
      lastname: {
        required,
        maxLength: maxLength(50)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      organization: {
        required
      },
      terms: {
        required
      }
    },
    confirmPassword: {
      sameAsPassword: sameAs(vm => {
        return vm.user.password
      })
    }
  },
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        organization: null,
        terms: false
      },
      confirmPassword: '',
      organizations: []
    }
  },
  methods: {
    submit() {
      this.$v.touch()
      console.log(this.user)
    },
    clear() {
      this.$v.reset()
      this.user.name = ''
      this.user.lastname = ''
      this.user.email = ''
      this.user.lastname = ''
      this.confirmPassword = ''
      this.user.organization = null
      this.user.terms = false
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.user.name.$dirty) return errors
      !this.$v.user.name.maxLength && errors.push(this.$t('errors.maxLength', [this.$t('user.name'), this.$v.user.name.$params.maxLength.max]))
      !this.$v.user.name.required && errors.push(this.$t('errors.required', [this.$t('user.name')]))
      return errors
    },
    lastnameErrors () {
      const errors = []
      if (!this.$v.user.lastname.$dirty) return errors
      !this.$v.user.lastname.maxLength && errors.push(this.$t('errors.maxLength', [this.$t('user.lastname'), this.$v.user.name.$params.maxLength.max]))
      !this.$v.user.lastname.required && errors.push(this.$t('errors.required', [this.$t('user.lastname')]))
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.user.email.$dirty) return errors
      !this.$v.user.email.email && errors.push(this.$t('errors.email'))
      !this.$v.user.email.required && errors.push(this.$t('errors.required', [this.$t('user.email')]))
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.user.password.$dirty) return errors
      !this.$v.user.password.minLength && errors.push(this.$t('errors.minLength', [this.$t('user.password'), this.$v.user.password.$params.minLength.min]))
      !this.$v.user.password.required && errors.push(this.$t('errors.required', [this.$t('user.password')]))
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.sameAsPassword && errors.push(this.$t('errors.passwordsDoesNotMatch'))
      return errors
    },
    organizationErrors () {
      const errors = []
      if (!this.$v.user.organization.$dirty) return errors
      !this.$v.user.organization.required && errors.push(this.$t('errors.required', [this.$t('user.organization')]))
      return errors
    },
    termsErrors () {
      const errors = []
      if (!this.$v.user.terms.$dirty) return errors
      !this.$v.user.terms.required && errors.push(this.$t('errors.acceptTermsRequired'))
      return errors
    }
  },
  created() {
    axios.get('http://localhost:8000/vapp/default/api/organization.json').then(
      resp => {
        this.organizations = resp.data.content
      },
      err => {
        console.log(err.response)
      }
    )
  }
}
</script>


<style>
</style>
