<template>
  <div class="container">
    <side-bar></side-bar>
    <product-list :product-list="getProductList"></product-list>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ProductList from '~/components/ProductList.vue'
import SideBar from '~/components/SideBar.vue'

export default {
  name: 'IndexPage',
  components: {
    ProductList,
    SideBar,
  },
  computed: {
    ...mapGetters(['getProductList']),
  },
  mounted() {
    const { query } = this.$route
    if (query.category) this.filterByCategory(query.category)
    if (query.from && query.to)
      this.filterByCost({ from: query.from, to: query.to })
    if (query.inStock) this.filterByStock(query.inStock)

    if (query) this.filter()
  },
  methods: {
    ...mapMutations(['filterByStock', 'filterByCost', 'filterByCategory']),
    ...mapActions(['filter']),
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
}
</style>
