<template>
  <div class="text-center p-2 mt-5">
    <div v-if="isLoading" class="text-center">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" variant="primary" />
    </div>
    <div v-else>
      <h1>LOGIN</h1>
      <div class="p-2 m-auto">
        <b-alert :show="error.length > 0" variant="danger">
          {{ error }}
        </b-alert>
        <b-form-input v-model="employeeNumber" placeholder="Employee Number" class="col-md-12 my-2 rounded-0" />
        <b-form-select v-model="password" :options="options" class="col-md-12 my-2 rounded-0" />
        <b-button @click="login" variant="danger" size="lg" squared class="col-md-12 my-3">
          LOG IN
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '~/api/index'
export default {
  data () {
    return {
      error: '',
      employeeNumber: '',
      password: 'IAD',
      asset: this.$route.params.asset,
      station: null,
      isLoading: false,
      users: [
        {
          id: '123456',
          name: 'John Doe',
          password: '456',
          station: 'Dulles, VA'
        },
        {
          id: '456789',
          name: 'Steve',
          password: '789',
          station: 'Dulles, VA'
        },
        {
          id: '789101',
          name: 'Alex',
          password: '101',
          station: 'Dulles, VA'
        },
        {
          id: '101112',
          name: 'Tommy',
          password: '111',
          station: 'Dulles, VA'
        }
      ],
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
  mounted () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.isLoading = true
      const { data } = await api.getStations()
      this.isLoading = false
      this.options = data.map(option => option.station_name)
    },
    async login () {
      this.error = ''
      this.isLoading = true
      const { data } = await api.login(this.asset, this.employeeNumber, this.password)
      this.isLoading = false
      if (data.error === 0) {
        this.$emit('login', data)
      } else {
        this.error = 'Wrong user credentials.'
      }
    }
  }
}
</script>

<style scoped>

</style>
