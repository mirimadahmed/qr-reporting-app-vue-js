<template>
  <div>
    <Submissions :data="data" v-if="data" />
  </div>
</template>

<script>
import api from '~/api'
import Submissions from '~/components/Submissions.vue'

export default {
  components: {
    Submissions
  },
  data () {
    return {
      data: null
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const { data } = await api.getData()
      this.data = data
    }
  }
}
</script>

<style>
</style>
