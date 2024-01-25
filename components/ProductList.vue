<template>
  <div class="products">
    <h2 v-if="getFilteredCategory" class="products__category">
      {{ getFilteredCategory }}
    </h2>
    <div class="products__list">
      <product-item
        v-for="product in productList"
        :key="product.id"
        :product="product"
      ></product-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductItem from './ProductItem.vue'

export default {
  name: 'ProductList',
  components: {
    ProductItem,
  },
  props: {
    productList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getFilteredCategory']),
  },
}
</script>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ccc;
  padding: 50px;
  padding-top: 0;
  min-height: 100vh;
  &__category {
    font-size: $--large-font-size;
    text-transform: capitalize;
    margin: 0;
    margin-top: 30px;
  }
  &__list {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(0, 1fr));
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .products__list {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(0, 1fr));
  }
}
</style>
