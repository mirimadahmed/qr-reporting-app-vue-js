<template>
  <div>
    <div v-for="(item, i) in local_value" :key="i">
      <CheckListItem :value="item" @input="updateItem" />
    </div>
  </div>
</template>

<script>
import CheckListItem from '~/components/CheckListItem.vue'
export default {
  components: {
    CheckListItem
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      local_value: this.value
    }
  },
  methods: {
    updateItem (obj) {
      const index = this.local_value.findIndex(item => item.title === obj.title)
      this.local_value[index] = obj
      this.$emit('input', this.local_value)
    }
  }
}
</script>

<style scoped>

</style>
