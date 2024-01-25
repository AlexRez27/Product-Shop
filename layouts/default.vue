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

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>
