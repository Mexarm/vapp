// import Vue from 'vue'
import axios from 'axios'

export default {

  authenticate(request) {
    return axios.post('http://localhost:8000/vapp/api/authenticate', request)
    // return Vue.http.post('https://crossorigin.me/http://postb.in/VWOhALuu', request)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}
