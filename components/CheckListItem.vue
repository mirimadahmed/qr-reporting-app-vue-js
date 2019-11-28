<template>
  <div class="my-2">
    <div :class="local_value.value === 2 ? 'red-bg' : 'white-bg'" class="row m-0 p-2 shadow-sm">
      <div class="col py-2">
        {{ local_value.title }}
      </div>
      <div class="col py-2 text-right">
        &#9432;
      </div>
      <div class="col p-0">
        <custom-switch v-model="local_value.value" />
      </div>
    </div>
    <div v-if="local_value.value === 2" class="row m-0 p-2 red-light-bg">
      <div class="col-md-12 m-0 my-2 p-0">
        <b-form-textarea
          id="textarea"
          v-model="local_value.comments"
          placeholder="Comments:"
          rows="3"
          max-rows="6"
          class="border-radius"
        />
      </div>
      <div class="col-md-12 m-0 p-0">
        <b-form-textarea
          id="textarea"
          v-model="local_value.ubsi"
          placeholder="Ubication:"
          rows="1"
          max-rows="2"
          class="border-radius"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomSwitch from '~/components/CustomSwitch.vue'
export default {
  components: {
    CustomSwitch
  },
  props: {
    value: {
      type: Object,
      required: true
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
.white-bg {
  background: white;
}
.red-bg {
  background: #E31836;
}
.red-light-bg {
  background: #E7CDCE;
}
.border-radius {
  border-radius: 20px;
  border: 2px#e74c3c solid;
}
</style>
