<template>
  <div>
    <div
      v-for="category in categories"
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
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { categories } from '@/data/constants'
export default {
  name: 'CategoryFilter',
  data() {
    return {
      categories,
    }
  },
  computed: {
    ...mapGetters(['getFilteredCategory']),
  },
  methods: {
    ...mapMutations(['filterByCategory']),
    ...mapActions(['filter']),
    filterHandler(category) {
      const currentQueryParams = { ...this.$route.query }
      currentQueryParams.category = category
      this.$router.push({ query: currentQueryParams })
      this.filterByCategory(category)
      this.filter()
    },
  },
}
</script>

<style lang="scss" scoped>
.filter {
  width: 150px;
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
