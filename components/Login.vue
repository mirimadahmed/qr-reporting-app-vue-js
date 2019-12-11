<template>
  <div class="text-center p-2 mt-5">
    <h1>LOGIN</h1>
    <div class="p-2 m-auto">
      <b-alert :show="error.length > 0" variant="danger">
        {{ error }}
      </b-alert>
      <b-form-input v-model="employeeNumber" placeholder="Employee Number" class="col-md-12 my-2 rounded-0" />
      <b-form-input v-model="password" type="password" placeholder="Password" class="col-md-12 my-2 rounded-0" />
      <!-- <b-form-select v-model="station" :options="options" class="col-md-12 my-2 rounded-0" /> -->
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
      error: '',
      employeeNumber: '',
      password: '',
      station: null,
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
          station: 'Philadelphia, PA'
        },
        {
          id: '789101',
          name: 'Alex',
          password: '101',
          station: 'Albany, NY'
        },
        {
          id: '101112',
          name: 'Tommy',
          password: '111',
          station: 'Windsor Locks, CT'
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
  methods: {
    login () {
      this.error = ''
      let foundUser = null
      this.users.forEach((user) => {
        if (user.id === this.employeeNumber && user.password === this.password) {
          foundUser = user
        }
      })
      if (foundUser === null) {
        this.error = 'Wrong user credentials.'
      } else {
        this.$emit('login', foundUser)
      }
    }
  }
}
</script>

<style scoped>

</style>
