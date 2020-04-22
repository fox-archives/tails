<template>
  <div class="app">
    <Navbar />
    <LoadNamespaces></LoadNamespaces>
  </div>
</template>

<script>
import Navbar from '~molecules/Navbar'
import LoadNamespaces from '@/components/LoadNamespaces'

export default {
  name: 'App',
  components: {
    Navbar,
    LoadNamespaces
  }
}
</script>

<style lang="postcss" scoped>
</style>
