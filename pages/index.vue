<template>
  <div>
    <Header />
    <CustomSwitch v-model="switchVal" />
    <CustomSwitch v-model="switchVal1" />
    <CustomSwitch v-model="switchVal2" />
  </div>
</template>

<script>
import CustomSwitch from '~/components/CustomSwitch.vue'
import Header from '~/components/Header.vue'

export default {
  components: {
    CustomSwitch,
    Header
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
</style>
