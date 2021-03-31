<template>
  <div id="app">
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

     <CurrentMonth />
     <CarsCreate />
     <CarDelete v-bind:cars='cars' />
     <br>
     <!-- <CarsTable v-bind:id="cars" v-bind:calender="calender" v-bind:workingMonth="workingMonth" /> -->
     <CarsTable-foreach v-bind:id="cars" v-bind:calender="calender" v-bind:workingMonth="workingMonth" />

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import CarsTableForeach from '../components/CarsTable-foreach.vue'

export default Vue.extend({
  components: { CarsTableForeach },
  methods: {
    hoge: function(this: Vue, e: MouseEvent) {
      console.log(this.$el)
      console.log(this.$store.getters.cars)
    }
  },
  computed: mapState(['cars', 'calender', 'workingMonth', 'date']),
  data() {
    return {
      
    }
  },
  created(this: Vue) {
    this.$store.dispatch('getData');
    this.$store.commit('setLoadDate', this.$store.getters.date)
  },
  
})
</script>

<style>
body {
  background-color: rgba(0, 0, 0, 0.8)
}
#app {
  background-color: rgba(0,0,0, 0.8);
  color: white;
}
</style>
