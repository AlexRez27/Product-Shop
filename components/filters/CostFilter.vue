<template>
  <div class="costfilter">
    <h3 class="costfilter__title">Cost</h3>
    <form class="costfilter__form" @submit.prevent="filterHandler">
      <input
        v-model="$v.costFrom.$model"
        class="costfilter__input"
        :class="{ invalid: $v.costFrom.$invalid || isDisabled }"
        type="text"
      />
      <input
        v-model="$v.costTo.$model"
        class="costfilter__input"
        :class="{ invalid: $v.costFrom.$invalid || isDisabled }"
        type="text"
      />
      <div>
        <button-component :disabled="isDisabled" type="submit" class="submit"
          ><span>OK</span></button-component
        >
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { required, decimal } from 'vuelidate/lib/validators'
import ButtonComponent from '@/components/ButtonComponent.vue'

const noLeadingZeros = (value) => {
  // Custom validator function to check for leading zeros
  return !/^0[0-9]+/.test(value)
}

export default {
  name: 'CostFilter',
  components: {
    ButtonComponent,
  },
  data() {
    return {
      costFrom: null,
      costTo: null,
    }
  },
  validations: {
    costFrom: {
      required,
      decimal,
      noLeadingZeros,
    },
    costTo: {
      required,
      decimal,
      noLeadingZeros,
    },
  },
  computed: {
    ...mapGetters(['getMinCost', 'getMaxCost']),
    isDisabled() {
      return (
        this.$v.costFrom.$invalid ||
        this.$v.costTo.$invalid ||
        +this.costFrom > +this.costTo
      )
    },
  },
  mounted() {
    this.costFrom = this.getMinCost
    this.costTo = this.getMaxCost
  },
  methods: {
    ...mapActions(['fetchProducts']),
    ...mapMutations(['filterByCost']),
    async filterHandler() {
      if (!this.isDisabled) {
        const currentQueryParams = { ...this.$route.query }
        currentQueryParams.from = this.costFrom
        currentQueryParams.to = this.costTo
        this.$router.push({ query: currentQueryParams })
        this.filterByCost({ from: this.costFrom, to: this.costTo })
        await this.fetchProducts(currentQueryParams)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.costfilter {
  &__title {
    font-size: $--big-font-size;
  }
  &__form {
    display: flex;
    gap: 10px;
  }
  &__input {
    width: 40%;
    margin: 0;
    outline: none;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding-left: 10px;
  }
  &__input::-webkit-outer-spin-button,
  &__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
.invalid {
  border-color: red;
}

@media (max-width: 768px) {
  .costfilter {
    width: 100%;
    &__form {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    &__input {
      width: 90%;
      margin-right: 20px;
    }
  }
}
</style>
