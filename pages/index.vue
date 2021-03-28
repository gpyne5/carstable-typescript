<template>
  <div class="container">
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

     <button @click="hoge">クリック</button>
     <CurrentMonth />
     <CarsCreate />
     <CarDelete v-bind:cars='cars' />
     <br>
     <CarsTable v-bind:id="cars" v-bind:calender="calender" v-bind:workingMonth="workingMonth" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
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
.delete {
    position: relative;
    padding: 10px;
    border: solid 1px #000;
    height: 80px;
    width: 150px;
    background-color: rgba(0, 123, 255, 0.2);
}
.car-delete {
    padding: 10px;
    float: left;
}
</style>
