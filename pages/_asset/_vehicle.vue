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
      <div v-if="page === 1" />
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
