<template>
  <div>
    <div class="loadProjects">
      <div class="grid">
        <Card
          v-for="namespace in data2.projects"
          :key="namespace.name"
          :loaded="loadState2"
          >{{ namespace }}</Card
        >
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/layout/Card'
import Grid from '@/layout/Grid'

export default {
  name: 'LoadNamespaces',
  components: {
    Card,
    Grid,
  },
  data() {
    return {
      loadState2: 'isWaiting',
      data2: null,
    }
  },
  async created() {
    const query2 = `{ projects { name, isSymbolicLink } }`
    console.log(query2)
    try {
      const res = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query: query2 }),
      })
      if (res.statusText !== 'OK') return
      const json = await res.json()
      console.log(json.data)
      this.data2 = json.data
      this.loadState2 = 'hasData'
    } catch (err) {
      console.error(err)
    }
  },
}
</script>

<style lang="postcss" scoped>
.grid {
  display: grid;
  grid-template-columns: 30px 300px;
  background: coral;
}
</style>
