<template>
  <div class="page">
    <Header />
    <Login @login="isLoggedIn = true" v-if="!isLoggedIn" />
    <div v-else class="p-2">
      <div class="asset-info">
        <div class="row m-0">
          <div class="col">
            <div class="col-md-12 head-text">
              Vehicle type:
            </div>
            <div class="col-md-12 info-text">
              {{ vehicleType }}
            </div>
          </div>
          <div class="col">
            <div class="col-md-12 head-text">
              Asset No.:
            </div>
            <div class="col-md-12 info-text">
              {{ assetNumber }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="page === 1" class="p-2">
        <h1 class="font-italic">
          Hi Javier,
        </h1>
        <p class="font-italic">
          Thank you for thing in your safety
        </p>
        <div class="row bg-white p-1 m-0 my-2">
          <div class="col py-2">
            How are you today?
          </div>
          <div class="col p-0">
            <CustomSwitch v-model="switchVal" pass-text="GOOD" fail-text="WICKED" class="float-right" />
          </div>
        </div>
        <div class="row bg-white p-1 m-0 my-2">
          <div class="col py-2">
            Ready to be safety
          </div>
          <div class="col p-0">
            <CustomSwitch v-model="switchVal" pass-text="GOOD" fail-text="WICKED" class="float-right" />
          </div>
        </div>
        <div class="p-2">
          <b-button @click="login" variant="danger" size="lg" squared class="col-md-12 my-3">
            START POI
          </b-button>
          <b-button @click="login" size="lg" squared class="col-md-12 my-3 primary-bg">
            REPORT DAMAGE
          </b-button>
        </div>
      </div>
      <div v-else />
    </div>
    <CustomSwitch v-model="switchVal" />
    <CustomSwitch v-model="switchVal1" />
    <CustomSwitch v-model="switchVal2" />
  </div>
</template>

<script>
import CustomSwitch from '~/components/CustomSwitch.vue'
import Login from '~/components/Login.vue'
import Header from '~/components/Header.vue'

export default {
  components: {
    CustomSwitch,
    Header,
    Login
  },
  data () {
    return {
      assetNumber: this.$route.params.asset,
      vehicleType: this.$route.params.vehicle,
      switchVal: 1,
      switchVal1: 2,
      switchVal2: 3,
      isLoggedIn: false,
      page: 1
    }
  }
}
</script>

<style scoped>
.page {
  background: #F2F2F2;
}
.primary-bg {
  background: #013A71;
}
.bg-white {
  background: white;
}
.head-text {
  font-weight: 300;
  font-size: 10px;
  color: grey;
}
.info-text {
  font-weight: 600;
  font-size: 20px;
  color: #013A71;
}
</style>
