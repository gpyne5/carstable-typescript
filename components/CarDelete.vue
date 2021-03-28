<template>
  <div class="car-delete">
    <button type="button" v-on:click="onoff" class="btn btn-outline-primary">車両削除</button>
    <div v-show="flag" class="delete">
        <select v-model="deleteCar">
            <option v-for="(car, index) in cars" v-bind:value="car.id" v-bind:key="index">{{ car.car_name + ' ' + car.car_number }}</option>
        </select>
        <input type="submit" value="削除" v-on:click="onclick" class="submit">
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CarDelete',
  props: ['cars'],
  data() {
    return {
      deleteCar: '',
      flag: false,
    }
  },
  methods: {
    onclick(this: Vue) {
      this.$store.dispatch('deleteData', this.$data.deleteCar);
      this.$data.deleteCar = '';
      if(this.$data.flag){
        this.$data.flag = false;
      } else {
        this.$data.flag =true;
      }
    },
    onoff() {
      if(this.$data.flag){
        this.$data.flag = false;
      } else {
        this.$data.flag =true;
      }
    }
  }
})
</script>

<style>

</style>