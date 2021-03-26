<template>
  <div>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      car: 'NX'
    }
  },
  methods: {
    changeCar(this: Vue) {
      this.$data.car = 'lala'
    }
  }
})
</script>

<style>

</style>