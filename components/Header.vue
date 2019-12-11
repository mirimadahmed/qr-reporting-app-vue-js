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
  data () {
    return {
      now: new Date()
    }
  },
  computed: {
    currentDate () {
      return moment(this.now).format('h:mm - MMM DD YYYY').toString().toUpperCase()
    }
  },
  created () {
    setInterval(function () {
      this.now = new Date()
    }, 1000 * 60)
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
