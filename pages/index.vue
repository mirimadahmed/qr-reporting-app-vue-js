<template>
  <div class="container">
    <CustomSwitch v-model="switchVal" />
    <CustomSwitch v-model="switchVal1" />
    <CustomSwitch v-model="switchVal2" />
  </div>
</template>

<script>
import CustomSwitch from '~/components/CustomSwitch.vue'

export default {
  components: {
    CustomSwitch
  },
  data () {
    return {
      switchVal: 1,
      switchVal1: 2,
      switchVal2: 3
    }
  }
}
</script>

<style>
.container {
  margin: 50 auto;
  min-height: 100vh;
}
</style>
