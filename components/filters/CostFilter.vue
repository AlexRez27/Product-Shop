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
import { mapMutations, mapGetters, mapActions } from 'vuex'
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
  props: {
    reset: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['on-reset'],
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
  watch: {
    reset(newValue, oldValue) {
      if (newValue === true) {
        this.resetValues()
        this.$emit('on-reset')
      }
    },
  },
  mounted() {
    this.resetValues()
  },
  methods: {
    ...mapMutations(['filterByCost']),
    ...mapActions(['filter']),
    filterHandler() {
      if (!this.isDisabled) {
        const currentQueryParams = { ...this.$route.query }
        currentQueryParams.from = this.costFrom
        currentQueryParams.to = this.costTo
        this.$router.push({ query: currentQueryParams })
        this.filterByCost({ from: +this.costFrom, to: +this.costTo })
        this.$nextTick(() => {
          this.filter()
        })
      }
    },
    resetValues() {
      this.costFrom = this.getMinCost
      this.costTo = this.getMaxCost
    },
  },
}
</script>

<style lang="scss" scoped>
.costfilter {
  width: 300px;
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
</style>
