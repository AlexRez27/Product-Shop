import products from '../data/products.json'

export const state = () => ({
  productList: products,
  filteredCategory: null,
  costFilter: {
    from: null,
    to: null,
  },
  inStock: false,
  productDetails: {},
})
export const actions = {
  filter({ commit, state }) {
    let filteredList = products
    if (state.filteredCategory) {
      filteredList = filteredList.filter(
        (el) => el.category === state.filteredCategory
      )
    }
    if (state.costFilter.from && state.costFilter.to) {
      filteredList = filteredList.filter(
        (el) =>
          el.price >= state.costFilter.from && el.price <= state.costFilter.to
      )
    }
    if (state.inStock) {
      filteredList = filteredList.filter((el) => el.count > 0)
    }
    commit('setProductList', filteredList)
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
    state.productList = products
    state.filteredCategory = null
    state.costFilter = { from: null, to: null }
    state.inStock = false
  },
  setProductDetails(state, id) {
    state.productDetails = products.find((el) => el.id === id)
  },
}
export const getters = {
  getProductList(state) {
    return state.productList
  },
  getMinCost() {
    return products.reduce((prev, curr) =>
      prev.price < curr.price ? prev : curr
    )?.price
  },
  getMaxCost() {
    return products.reduce((prev, curr) =>
      prev.price > curr.price ? prev : curr
    )?.price
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
