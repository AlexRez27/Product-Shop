<template>
  <product-details :product-details="getProductDetails"></product-details>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ProductDetails from '~/components/ProductDetails'
export default {
  components: {
    ProductDetails,
  },
  async asyncData({ store, params }) {
    const productid = params.productid // When calling /abc the slug will be "abc"
    await store.dispatch('fetchProductByID', productid)
    // return { productid }
  },
  computed: {
    ...mapGetters(['getProductDetails']),
  },
  methods: {
    ...mapMutations(['setProductDetails']),
  },
}
</script>
