<template>
  <div class="my-switch row text-center badge-pill p-0">
    <div v-if="local_value === 1" class="w-100">
      <div @click="local_value = 2" class="buttons button-left">
        {{ wrongText }}
      </div>
      <div class="switch-normal rounded-circle" />
      <div @click="local_value = 3" class="buttons button-right">
        {{ correctText }}
      </div>
    </div>
    <div @click="local_value = 1" v-else-if="local_value === 2" class="switch-fail badge-pill buttons">
      {{ failText }}
    </div>
    <div @click="local_value = 1" v-else class="switch-pass ml-auto badge-pill buttons">
      {{ passText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    correctText: {
      type: String,
      required: false,
      default: '✔'
    },
    wrongText: {
      type: String,
      required: false,
      default: '❌'
    },
    passText: {
      type: String,
      required: false,
      default: 'PASS'
    },
    failText: {
      type: String,
      required: false,
      default: 'FAIL'
    }
  },
  data () {
    return {
      local_value: this.value
    }
  },
  watch: {
    local_value (val) {
      if (this.value !== val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped>
.my-switch {
  width: 100px;
  height: 28px;
  border: 2px #bdc3c7 solid;
  background: white;
  margin: 10px;
}
.switch-fail {
  border: 2px #c0392b solid;
  background: #e74c3c;
  margin-top: -3px;
  margin-left: -3px;
  height: 30px;
  color: white;
  font-weight: 600;
}
.switch-pass {
  border: 2px #27ae60 solid;
  background: #2ecc71;
  margin-top: -3px;
  margin-right: -3px;
  height: 30px;
  color: white;
  font-weight: 600;
}
.switch-normal {
  border: 2px #bdc3c7 solid;
  background: #ecf0f1;
  width: 30px;
  height: 30px;
  float: left;
  margin-top: -3px;
}
.buttons {
  cursor: pointer;
}
.button-left {
  width: 33.33%;
  float: left;
}
.button-right {
  width: 33.33%;
  float: right;
}
</style>
