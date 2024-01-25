<template>
  <div class="product">
    <div class="product__img">
      <img
        width="100px"
        height="150px"
        :src="product.image"
        :alt="product.title"
      />
    </div>
    <h2 class="product__title">
      <nuxt-link
        :class="{ disabled: isOutOfStock }"
        class="product__link"
        :to="`/${product.id}`"
        :title="product.title"
        >{{ product.title }}</nuxt-link
      >
    </h2>
    <p class="product__category">{{ product.category }}</p>
    <p class="product__price">
      <span class="product__cost">{{ product.price }}</span> $
    </p>
    <p class="product__stock">
      {{ isOutOfStock ? 'Out of stock' : '' }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isOutOfStock() {
      return this.product.count === 0
    },
  },
}
</script>

<style lang="scss" scoped>
.product {
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  &__img {
    display: flex;
    justify-content: center;
  }
  &__link {
    text-decoration: none;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #000;
    font-weight: bold;
    // &:visited {
    //   color: #000;
    // }
    &:hover {
      color: #ec9f0f;
      text-decoration: underline;
    }
  }
  &__stock {
    color: $--disabled-color;
    margin: 0;
    height: 15px;
  }
  &__cost {
    font-size: 24px;
    font-weight: bold;
  }
}

.disabled {
  color: $--disabled-color;
  pointer-events: none;
  cursor: default;
}
</style>
