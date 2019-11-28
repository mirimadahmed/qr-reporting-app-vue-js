<template>
  <div class="text-center p-2 mt-5">
    <h1>LOGIN</h1>
    <div class="p-2 m-auto">
      <b-form-input v-model="employeeNumber" placeholder="Employee Number" class="col-md-12 my-2 rounded-0" />
      <b-form-select v-model="station" :options="options" class="col-md-12 my-2 rounded-0" />
      <b-button @click="login" variant="danger" size="lg" squared class="col-md-12 my-3">
        LOG IN
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      employeeNumber: '',
      station: null,
      options: [
        { value: null, text: 'Select Station' },
        { value: 1, text: 'Station 1' },
        { value: 2, text: 'Station 2' },
        { value: 3, text: 'Station 3' },
        { value: 4, text: 'Station 4' }
      ]
    }
  },
  methods: {
    login () {
      this.$emit('login')
    }
  }
}
</script>

<style scoped>

</style>
