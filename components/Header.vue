<template>
  <div class="row m-0 my-2 p-2 text-left">
    <div class="col">
      {{ station }}
    </div>
    <div class="col text-center">
      {{ currentDate }}
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    station: {
      type: String,
      required: true
    }
  },
  computed: {
    currentDate () {
      return moment().format('HH:MM - MM DD YYYY').toString().toUpperCase()
    }
  }
}
</script>

<style scoped>
div {
  font-weight: 700;
  color: #013A71;
  background: white;
}
</style>
