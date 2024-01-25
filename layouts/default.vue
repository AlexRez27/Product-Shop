<template>
  <div>
    <header-component></header-component>
    <Nuxt />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent'

export default {
  components: { HeaderComponent },
}
</script>
