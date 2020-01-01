<template>
  <div class="page">
    <Header :station="user.station" />
    <div v-if="isLoading" class="text-center">
      Checking asset number.
    </div>
    <div v-else-if="assetFound">
      <Login @login="login" v-if="!isLoggedIn" />
      <div v-else class="p-2">
        <div class="asset-info">
          <div class="row m-0">
            <div class="col">
              <div class="col-md-12 head-text">
                Vehicle type:
              </div>
              <div class="col-md-12 info-text">
                {{ user.asset.type }}
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
        <div v-if="user.type === 'mechanic'">
          <div v-if="submissions.length > 0">
            <div v-for="item in submissions" :key="item.id" class="shadow-sm p-1 mb-2">
              <div v-for="detail in item.details" :key="detail.id">
                <div v-if="detail.value === '2'">
                  {{ detail.name }} broken:
                  Comment: {{ detail.comment }}
                  Location: {{ detail.location }}
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            No problems in this asset
          </div>
        </div>
        <div v-else>
          <div v-if="page === 1" class="p-2">
            <h1 class="font-italic">
              Hi {{ user.user_details.full_name }},
            </h1>
            <p class="font-italic">
              Thank you for thing in your safety
            </p>
            <div class="row bg-white p-1 m-0 my-2">
              <div class="col py-2">
                How are you today?
              </div>
              <div class="col p-0">
                <CustomSwitch v-model="switchVal1" pass-text="GOOD" fail-text="WICKED" class="float-right" />
              </div>
            </div>
            <div class="row bg-white p-1 m-0 my-2">
              <div class="col py-2">
                Ready to be safety
              </div>
              <div class="col p-0">
                <CustomSwitch v-model="switchVal2" pass-text="GOOD" fail-text="WICKED" class="float-right" />
              </div>
            </div>
            <div class="p-2">
              <b-button @click="startPOI" variant="danger" size="lg" squared class="col-md-12 my-3">
                START POI
              </b-button>
              <b-button size="lg" squared class="col-md-12 my-3 primary-bg">
                REPORT DAMAGE
              </b-button>
            </div>
          </div>
          <div v-else>
            <CheckList v-model="checkList" />
            <b-button @click="submitPOI" variant="danger" size="lg" squared class="col-md-12 my-3">
              SUBMIT POI
            </b-button>
            <div v-if="showModal" class="custom-modal">
              <div v-if="!isValid" class="error custom-modal-content m-auto align-middle">
                <div class="font-weight-bold">
                  POI INCOMPLETE
                </div>
                <div class="font-weight-bold">
                  PLEASE COMPLETE IT!
                </div>
                <b-button @click="showModal = false" variant="danger" size="lg" squared class="col-md-12 my-3">
                  BACK
                </b-button>
              </div>
              <a v-else href="https://google.com" class="success custom-modal-content m-auto align-middle">
                <h3 class="my-3 font-weight-bold">
                  YOUR POI HAS BEEN SUBMITTED
                </h3>
                <img src="~/assets/click.png" alt="">
                <div class="my-3 font-weight-bold">
                  BE SAFE
                </div>
                <div class="font-weight-bold">
                  CLICK IT
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      Asset not found. Please scan correct QR code.
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from '~/api/index'
import CustomSwitch from '~/components/CustomSwitch.vue'
import CheckList from '~/components/CheckList.vue'
import Login from '~/components/Login.vue'
import Header from '~/components/Header.vue'

export default {
  components: {
    CheckList,
    CustomSwitch,
    Header,
    Login
  },
  data () {
    return {
      user: {
        station: '',
        name: '',
        empId: '',
        type: ''
      },
      endTime: null,
      startTime: null,
      assetNumber: this.$route.params.asset,
      vehicleType: '',
      isLoggedIn: false,
      isLoading: false,
      assetFound: false,
      page: 1,
      switchVal1: 1,
      switchVal2: 1,
      showModal: false,
      checkList: [],
      submissions: []
    }
  },
  computed: {
    isValid () {
      let valid = true
      this.checkList.forEach((item) => {
        if (item.value === 1) { valid = false }
      })
      return valid
    }
  },
  created () {
    this.check()
  },
  methods: {
    startPOI () {
      this.page = 2
      this.startTime = moment().format('h:mm:ss - MMM DD YYYY').toString().toUpperCase()
    },
    async check () {
      this.isLoading = true
      const { data } = await api.checkAsset(this.assetNumber)
      this.isLoading = false
      this.assetFound = data.error === 0
    },
    login (user) {
      this.isLoggedIn = true
      this.user = user
      this.user.type = user.user_details.type
      this.user.station = user.asset.station_city
      this.vehicleType = user.asset.type
      if (this.user.type === 'driver') {
        this.user.forms.forEach(item => this.checkList.push({
          form_field_id: item.id,
          title: item.name,
          value: 1,
          comments: '',
          ubsi: '',
          video: item.video
        }))
      } else {
        this.submissions = this.user.submissions
      }
    },
    async submitPOI () {
      this.endTime = moment().format('h:mm:ss - MMM DD YYYY').toString().toUpperCase()
      if (this.isValid) {
        let status = true
        this.checkList.forEach((item) => {
          if (item.value === 2) {
            status = false
          }
        })
        const data = {
          status,
          details: this.checkList,
          empId: this.user.user_details.id,
          station: this.user.station,
          assetNumber: this.user.asset.id,
          emp_id: this.user.user_details.emp_id,
          asset_number: this.user.asset.asset_no,
          vehicleType: this.vehicleType,
          submission_date: this.endTime,
          start_datetime: this.startTime
        }
        await api.putData(data)
        this.showModal = true
      } else {
        this.showModal = true
      }
    },
    resetPage () {
      window.open('https://google.com')
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
.custom-modal {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.596);
  display: flex;
}
.custom-modal-content {
  text-align: center;
  padding: 50px 20px;
  color: white;
  flex: 1;
}
</style>
