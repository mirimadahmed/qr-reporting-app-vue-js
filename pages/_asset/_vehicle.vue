<template>
  <div class="page">
    <Header />
    <Login @login="login" v-if="!isLoggedIn" />
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
          <b-button @click="page = 2" variant="danger" size="lg" squared class="col-md-12 my-3">
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
          <div v-else @click="resetPage" class="success custom-modal-content m-auto align-middle">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      user: null,
      assetNumber: this.$route.params.asset,
      vehicleType: this.$route.params.vehicle,
      isLoggedIn: false,
      page: 1,
      switchVal1: 1,
      switchVal2: 1,
      showModal: false,
      checkList: [
        {
          title: 'BRAKES',
          value: 1,
          comments: '',
          ubsi: ''
        },
        {
          title: 'TYRES',
          value: 1,
          comments: '',
          ubsi: ''
        },
        {
          title: 'FUEL',
          value: 1,
          comments: '',
          ubsi: ''
        },
        {
          title: 'SHAPE',
          value: 1,
          comments: '',
          ubsi: ''
        },
        {
          title: 'BRAKE LIGHTS',
          value: 1,
          comments: '',
          ubsi: ''
        },
        {
          title: 'HEAD LIGHTS',
          value: 1,
          comments: '',
          ubsi: ''
        },
        {
          title: 'HORN',
          value: 1,
          comments: '',
          ubsi: ''
        },
        {
          title: 'SEAT BELT',
          value: 1,
          comments: '',
          ubsi: ''
        }
      ]
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
  methods: {
    login (user) {
      this.isLoggedIn = true
      this.user = user
    },
    async submitPOI () {
      if (this.isValid) {
        this.sendMail()
        const data = {
          checkList: this.checkList,
          empId: this.user.empId,
          station: this.user.station,
          assetNumber: this.assetNumber,
          vehicleType: this.vehicleType
        }
        await api.putData(data)
        this.showModal = true
      } else {
        this.showModal = true
      }
    },
    sendMail () {
      const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey('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')
      const msg = {
        // to: 'imad@spacesly.com',
        to: 'jvrgonzaleze@gmail.com',
        from: 'developer@magooapp.com',
        subject: 'POI Submission',
        text: `Submitted by: ${this.user.empId}
                Station: ${this.user.station}
                Vehicle Type: ${this.vehicleType}
                Asset No.: ${this.assetNumber}`,
        html: `<strong>
                Submitted by: ${this.user.empId}
                Station: ${this.user.station}
                Vehicle Type: ${this.vehicleType}
                Asset No.: ${this.assetNumber}
              </strong>
              `
      }
      sgMail.send(msg)
    },
    resetPage () {
      window.location.reload()
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
