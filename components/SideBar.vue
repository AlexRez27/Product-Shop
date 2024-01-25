<template>
  <section class="filters">
    <category-filter></category-filter>
    <cost-filter
      :reset="setCostFilterToInitialValues"
      @on-reset="reset"
    ></cost-filter>
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
import { mapMutations } from 'vuex'
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
  data() {
    return {
      setCostFilterToInitialValues: false,
    }
  },
  methods: {
    ...mapMutations(['resetAllFilters']),
    resetFilters() {
      this.setCostFilterToInitialValues = true
      this.resetAllFilters()
    },
    reset() {
      this.$router.push({ query: {} })
      this.setCostFilterToInitialValues = false
    },
  },
}
</script>

<style lang="scss" scoped>
.filters {
  height: 100%;
  width: 500px;
  padding: 20px;
  &__section {
    margin-top: 20px;
  }

  &__reset {
    margin-top: 20px;
  }
}
</style>
