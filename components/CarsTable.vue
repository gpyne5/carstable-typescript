<template>
  <div>
    <div>
      <table class="table">
        <thead>
          <tr><th></th><th v-for="(i, index) in daysCount" v-bind:key="index">{{ i }}</th></tr>
        </thead>
        <tbody>
          <tr v-for="(car, index) in cars" v-bind:id="car.id" v-bind:key="index"><th>{{ car.car_name }}</th>
          <td v-for="(reservation, key) in makeCalender(car)" v-on:mousedown="mousedown" v-bind:id="key" v-bind:key="key" class="td01">{{ reservation }}</td></tr>
        </tbody>
      </table>
    </div>
    {{ Number(daysCount) }}
    <UpdateTable />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UpdateTable from './UpdateTable.vue'
import { mapState } from 'vuex'

export default Vue.extend({
  template: 'UpdateTable',
  name: 'CarsTable',
  props: ['days'],
  computed: mapState(['daysCount', 'cars', 'workingMonth', 'cellColor', 'pos']),
  data() {
    return {
      reservation:     '',
      //date: new Date().toISOString().slice(0,7), // 2021-02 のような文字列
      currentDate:     new Date().toISOString().slice(0,7),
      carId:           [] as string[],
      onClick:         {},
      show:            false,
      selectCell:      false,
      makeCalender(this: Vue, car: {id: number, car_name: string, carNumber: string}) {
        let result: string[] = [];
        for(let j=0,len=this.$store.getters.calender.length;j<len;j++){
          if(this.$store.getters.calender[j].y_m === this.$store.getters.workingMonth){
            if(this.$store.getters.calender[j].car_id === car.id){
              for(let i=1,len=this.$store.getters.daysCount+1;i<len;i++){
                result.push(this.$store.getters.calender[j]['_' + i.toString()]);
              }
              return result;
            }
          }
        }
      }
    };
  },
  methods: {
    mousedown(this: Vue, e: MouseEvent) {
      if(this.$el instanceof HTMLElement) {

        this.$el.style.backgroundColor = 'rgba(0,123,255,0.2)';
        this.$store.commit('selectCar', this.$el.parentElement!.id);
        this.$data.carId.push(this.$el.id);
        
        if(this.$data.carId.length === 2){
          this.$data.carId.sort();
          this.$data.pos = {
            top: e.pageY + 'px',
            left: e.pageX + 'px',
            position: 'absolute'
          };
            // this.carId...○日〜○日の配列
          this.$store.commit('selectDays', this.$data.carId);
          this.$store.commit('changePutForm', true);
          this.$store.commit('changePos', this.$data.pos);
        }
      }
      if(this.$data.carId.length === 3){
        this.$data.carId.splice(1, 1);
      };
    }
  }
  
})
</script>

<style>

</style>