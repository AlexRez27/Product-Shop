export const state = () => ({
  productList: {},
  filteredCategory: null,
  costFilter: {
    from: null,
    to: null,
  },
  inStock: false,
  productDetails: {},
})

export const actions = {
  async fetchProducts({ commit }, filters) {
    try {
      const response = await this.$axios.get('/api/products', {
        params: filters,
      })
      commit('setProductList', response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  },

  async fetchProductByID({ commit }, id) {
    try {
      const response = await this.$axios.get(`/api/products/${id}`)
      commit('setProductDetails', response.data)
    } catch (error) {
      console.error('Error fetching product by ID:', error)
    }
  },
}

export const mutations = {
  filterByCategory(state, payload) {
    state.filteredCategory = payload
  },
  filterByCost(state, payload) {
    state.costFilter = payload
  },
  filterByStock(state, payload) {
    state.inStock = payload
  },
  setProductList(state, payload) {
    state.productList = payload
  },

  resetAllFilters(state) {
    state.filteredCategory = null
    state.costFilter = { from: null, to: null }
    state.inStock = false
  },
  setProductDetails(state, payload) {
    state.productDetails = payload
  },
}
export const getters = {
  getProductList(state) {
    return state.productList?.products
  },
  getMinCost(state) {
    return state.productList?.minPrice
  },
  getMaxCost(state) {
    return state.productList?.maxPrice
  },
  getInStock(state) {
    return state.inStock
  },
  getProductDetails(state) {
    return state.productDetails
  },
  getFilteredCategory(state) {
    return state.filteredCategory
  },
}
