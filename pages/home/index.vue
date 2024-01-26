<template>
  <div class="container">
    <side-bar></side-bar>
    <product-list
      v-if="getProductList"
      :product-list="getProductList"
    ></product-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductList from '~/components/ProductList.vue'
import SideBar from '~/components/SideBar.vue'

export default {
  name: 'IndexPage',
  components: {
    ProductList,
    SideBar,
  },
  async asyncData({ store, route }) {
    const currentQueryParams = { ...route.query }
    await store.dispatch('fetchProducts', currentQueryParams)
  },
  data() {
    return { showSideBar: false }
  },
  computed: {
    ...mapGetters(['getProductList']),
  },
  methods: {
    ...mapActions(['fetchProducts']),
  },
}
</script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}

.container {
  display: flex;
  background-color: #ccc;
}
</style>
