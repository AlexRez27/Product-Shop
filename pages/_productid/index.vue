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
  asyncData({ params }) {
    const productid = params.productid // When calling /abc the slug will be "abc"
    return { productid }
  },
  computed: {
    ...mapGetters(['getProductDetails']),
  },
  mounted() {
    this.setProductDetails(+this.productid)
  },
  methods: {
    ...mapMutations(['setProductDetails']),
  },
}
</script>
