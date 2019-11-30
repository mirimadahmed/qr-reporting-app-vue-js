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
        { value: 'Dulles, VA', text: 'IAD' },
        { value: 'Philadelphia, PA', text: 'PHL' },
        { value: 'Albany, NY', text: 'ALB' },
        { value: 'Windsor Locks, CT', text: 'BDL' },
        { value: 'Baltimore, MA', text: 'BWI' },
        { value: 'Providence, RI', text: 'PVD' },
        { value: 'Raleigh, NC', text: 'RDU' }
      ]
    }
  },
  methods: {
    login () {
      const user = {
        empId: this.employeeNumber,
        station: this.station
      }
      this.$emit('login', user)
    }
  }
}
</script>

<style scoped>

</style>
