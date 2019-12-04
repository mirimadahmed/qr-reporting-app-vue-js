<template>
  <div class="page">
    <div v-for="(item, i) in data" :key="i" class="submission px-4 my-4">
      Submitted by: {{ item.emp_id }}
      Station: {{ item.station }}
      Vehicle Type: {{ item.vehicle_type }}
      Asset No.: {{ item.asset_number }}
      <div v-for="(check, j) in item.checkList" :key="j">
        Name: {{ check.name }}
        Status: {{ check.value }}
        Comments: {{ check.comment }}
        Location: {{ check.ubsi }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.submission {
  background: white;
}
.page {
  background: #F2F2F2;
}
</style>
