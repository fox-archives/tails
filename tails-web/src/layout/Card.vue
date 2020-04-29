<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          src="https://bulma.io/images/placeholders/1280x960.png"
          alt="project image"
        />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <h1 class="title"><slot /></h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
}
</script>

<style lang="postcss" scoped>
.card {
  width: 100px;
}
</style>
