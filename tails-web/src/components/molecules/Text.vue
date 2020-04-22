<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Text1',
  props: {
    size: {
      default: 'md'
    }
  }
}
</script>

<style>
</style>
