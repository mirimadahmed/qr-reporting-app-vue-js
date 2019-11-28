<template>
  <div class="my-switch row text-center badge-pill p-0">
    <div v-if="local_value === 1" class="row text-center m-0 p-0">
      <div @click="local_value = 2" class="col-md-4 buttons">
        {{ wrongText }}
      </div>
      <div class="switch-normal col-md-2 md-offset-2 rounded-circle" />
      <div @click="local_value = 3" class="col-md-4 buttons">
        {{ correctText }}
      </div>
    </div>
    <div @click="local_value = 1" v-else-if="local_value === 2" class="col-md-auto switch-fail badge-pill h-100 buttons">
      {{ failText }}
    </div>
    <div @click="local_value = 1" v-else class="col-md-auto switch-pass ml-auto badge-pill h-100 buttons">
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
  width: 10vw;
  border: 2px #bdc3c7 solid;
  background: white;
  margin: 10px;
}
.switch-fail {
  border: 2px #c0392b solid;
  background: #e74c3c;
  margin-top: -3px;
  margin-bottom: -3px;
  margin-left: -3px;
}
.switch-pass {
  border: 2px #27ae60 solid;
  background: #2ecc71;
  margin-top: -3px;
  margin-bottom: -3px;
  margin-right: -3px;
}
.switch-normal {
  border: 2px #bdc3c7 solid;
  background: #ecf0f1;
  margin-top: -3px;
  margin-bottom: -3px;
}
.buttons {
  cursor: pointer;
}
</style>
