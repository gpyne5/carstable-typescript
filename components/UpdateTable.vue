<template>
<div class="post-form" v-show="putForm" v-bind:style="[pos]">
  <div  class="form-position">
    <input type="text" v-model="customerName">
    <select v-model="sales">
      <option value="_z"> </option>
      <option value="_a">瓶子</option>
      <option value="_b">林</option>
      <option value="_c">南</option>
      <option value="_d">箕輪</option>
      <option value="_e">江良</option>

    </select>
    <input type="submit" v-on:click="click" value="予約">

  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'


export default Vue.extend({
  name: 'UpdateTable',
  computed: mapState(['workingMonth', 'selectedDays', 'selectedCarId', 'putForm', 'pos']),
  data() {
    return {
      customerName: '',
      sales: ''
    }
  },
  methods: {
    click(this: Vue) {
      let data = {
        customerName:  this.$data.customerName + this.$data.sales,
        currentMonth:  this.$store.getters.workingMonth,
        dateStart:     this.$store.getters.selectedDays[0],
        dateEnd:       this.$store.getters.selectedDays[1]
      };
      let payload = {
        id :   this.$store.getters.selectedCarId,
        data:  data
      }
      this.$store.dispatch('putData', payload);
      this.$store.commit('changePutForm', false);
      this.$store.commit('changeCellColor', { backgroundColor: 'rgb(255, 255, 255)' })
      this.$store.commit('selectDays', [])
    },
  },
})
</script>

<style>

</style>