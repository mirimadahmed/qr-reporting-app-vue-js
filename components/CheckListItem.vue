<template>
  <div class="my-2">
    <div :class="!local_value.value ? 'red-bg' : 'white-bg'" class="row m-0 p-2 shadow-sm">
      <div class="col py-2">
        {{ local_value.title }}
      </div>
      <div class="col py-2 text-center">
        <a :href="local_value.video" class="stretched-link">&#9432;</a>
      </div>
      <div class="col px-0 py-1">
        <toggle-button
          v-model="local_value.value"
          :height="30"
          :width="70"
          :labels="labels"
          :color="colors"
          class="m-0 float-right"
        />
      </div>
    </div>
    <div v-if="!local_value.value" class="row m-0 p-2 red-light-bg">
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
          placeholder="Location:"
          rows="1"
          max-rows="2"
          class="border-radius"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      local_value: this.value,
      labels: { checked: 'PASS', unchecked: 'FAIL' },
      colors: { checked: '#C0D107', unchecked: '#E72302' }
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
  background: rgb(221, 88, 108);
}
.red-light-bg {
  background: #E7CDCE;
}
.border-radius {
  border-radius: 20px;
  border: 2px#e74c3c solid;
}
</style>
