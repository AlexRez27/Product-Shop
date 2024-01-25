<template>
  <div class="details">
    <div class="details__back">
      <nuxt-link to="/"> <arrow-back-icon></arrow-back-icon> </nuxt-link>
    </div>
    <h1 class="details__title">{{ productDetails.title }}</h1>
    <!-- <p class="details__category">{{ productDetails.category }}</p> -->
    <div class="details__image">
      <img
        width="400px"
        height="500px"
        :src="productDetails.image"
        :alt="productDetails.title"
      />
    </div>
    <p class="details__description">{{ productDetails.description }}</p>
    <p class="details__price">
      <span class="details__cost">{{ productDetails.price }}</span
      >$
    </p>
    <p class="details__stock">
      {{ isOutOfStock ? 'Out of stock' : '' }}
    </p>
  </div>
</template>

<script>
import ArrowBackIcon from '@/components/icons/ArrowBackIcon.vue'
export default {
  name: 'ProductDetails',
  components: {
    ArrowBackIcon,
  },
  props: {
    productDetails: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isOutOfStock() {
      return this.productDetails.count === 0
    },
  },
}
</script>

<style lang="scss" scoped>
.details {
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  position: relative;
  &__title {
    text-align: center;
    margin-left: 100px;
    margin-right: 100px;
  }
  &__image {
    display: flex;
    justify-content: center;
  }
  &__description {
    font-size: $--big-font-size;
  }
  &__price {
    font-size: $--big-font-size;
  }
  &__cost {
    font-size: $--large-font-size;
    font-weight: bold;
  }
  &__back {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
