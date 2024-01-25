// plugins/vuelidate.js
import Vue from 'vue'
import Vuelidate, { validationMixin } from 'vuelidate'

Vue.use(Vuelidate)

// Optional: You can use validationMixin to make Vuelidate work with Nuxt's fetch method
Vue.mixin(validationMixin)

export default ({ app }) => {
  // You can also add Vuelidate-related configurations here if needed
}
