<template>
  <section class="filters">
    <category-filter></category-filter>
    <cost-filter :reset="setCostFilterToInitialValues"></cost-filter>
    <div class="filters__section">
      <in-stock-filter></in-stock-filter>
    </div>
    <div class="filters__reset">
      <button-component @on-click="resetFilters"
        >Reset all filters</button-component
      >
    </div>
  </section>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import ButtonComponent from '@/components/ButtonComponent.vue'
import CategoryFilter from '@/components/filters/CategoryFilter'
import CostFilter from '@/components/filters/CostFilter'
import InStockFilter from '@/components/filters/InStockFilter.vue'

export default {
  name: 'SideBar',
  components: {
    ButtonComponent,
    CategoryFilter,
    CostFilter,
    InStockFilter,
  },
  methods: {
    ...mapMutations(['resetAllFilters']),
    ...mapActions(['fetchProducts']),
    async resetFilters() {
      await this.fetchProducts()
      this.$router.push({ query: {} })
      this.resetAllFilters()
    },
  },
}
</script>

<style lang="scss" scoped>
.filters {
  flex: 0 0 200px;
  padding: 20px;
  background-color: #fff;
  &__section {
    margin-top: 20px;
  }

  &__reset {
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .filters {
    flex: 0 0 160px;
  }
}
</style>
