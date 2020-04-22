<template>
  <div class="grid">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Grid'
}
</script>

<style lang="postcss" scoped>
.grid {
  display: grid;
}
</style>
