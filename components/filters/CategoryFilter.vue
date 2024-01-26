<template>
  <div>
    <div
      v-for="category in getCategories"
      :key="category"
      class="filter"
      @click="filterHandler(category)"
    >
      <p :class="{ active: category === getFilteredCategory }">
        {{ category }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'CategoryFilter',
  computed: {
    ...mapGetters(['getFilteredCategory', 'getCategories']),
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchCategories']),
    ...mapMutations(['filterByCategory']),
    async filterHandler(category) {
      const currentQueryParams = { ...this.$route.query }
      currentQueryParams.category = category
      this.$router.push({ query: currentQueryParams })
      this.filterByCategory(category)
      await this.fetchProducts(currentQueryParams)
    },
  },
}
</script>

<style lang="scss" scoped>
.filter {
  width: max-content;
  color: blue;
  font-size: 18px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
.active {
  color: #00a046;
  text-decoration: underline;
}
</style>
