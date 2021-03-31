<template>
  <div>
    <div>
      <table class="table">
        <thead>
          <tr><th></th><th v-for="(i, index) in daysCount" v-bind:key="index">{{ i }}</th></tr>
        </thead>
        <tbody>
          <tr v-for="(car, index) in cars" v-bind:id="car.id" v-bind:key="index"><th>{{ car.car_name }}</th>
          <!-- <td v-for="(reservation, key) in makeCalender(car)" v-on:mousedown="mousedown($event, String(car.id), index, key)" v-bind:id="key" v-bind:key="key" class="td01">{{ reservation }}</td></tr> -->
          <td v-for="(testResult, key) in makeCalender(car)" v-on:mousedown="mousedown($event, String(car.id), index, key)" v-bind:id="key" v-bind:key="key" class="td01"><span v-bind:class="testResult.reservation.sales">{{ testResult.reservation.customer }}</span></td></tr>
        </tbody>
      </table>
    </div>
    <UpdateTable />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import UpdateTable from './UpdateTable.vue'
import { mapState } from 'vuex'
import { KeyType } from '../store/index'

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
      firstClick:      [] as number[],
      makeCalender(this: Vue, car: {id: number, car_name: string, carNumber: string}) {
        let result: {reservation:{customer: string, sales: string}}[] = [];
        this.$store.getters.calender.filter((_calender: KeyType) => {
          if(_calender.y_m === this.$store.getters.workingMonth){
            if(_calender.car_id === car.id){
              for(let i=1,len=this.$store.getters.daysCount+1;i<len;i++){
                let param = '_' + i.toString()
                let spl = _calender[param]
                if(typeof spl === 'string') {
                  result.push({reservation: {
                                    customer: spl.split('_')[0],
                                    sales: spl.split('_')[1]
                                  }})
                } else {
                  // result.push(this.$store.getters.calender[j]['_' + i.toString()]);
                  result.push({reservation: {
                                    customer: '',
                                    sales: ''
                                  }})
                }
                // result.push(this.$store.getters.calender[j]['_' + i.toString()]);
              }
            }
          }
        })
        return result;
      }
    };
  },
  methods: {
    mousedown(this: Vue, e: MouseEvent, id: string, index: number, key: number) {
      if(this.$el instanceof HTMLElement) {

        let targetTr = document.getElementsByTagName('tr').item(index + 1)!
        if(this.$data.firstClick.length === 0) {
          this.$data.firstClick.push(key);
          targetTr.getElementsByTagName('td').item(key)!.className = 'select';
        } else if (this.$data.firstClick.length !== 0) {
          this.$data.firstClick.push(key);
          this.$data.firstClick.sort((a: number, b: number) => a - b);
          for (let i = this.$data.firstClick[0]; i < this.$data.firstClick[1] + 1; i ++){
            targetTr.getElementsByTagName('td').item(i)!.className = 'select';
          }
        }

        this.$store.commit('selectCar', id);
        this.$data.carId.push(String(key + 1)); //key...makeCalenderの返り値string[]のインデックス
        
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
.a {
  color: red ;
}
.b {
  color: turquoise;
}
.c {
  color: orange;
}
.d {
  color: pink;
}
.e {
  color: skyblue;
}
.z {
  color: white;
}
.select {
  background-color: rgba(0,123,255,0.2);
}

.td01:hover {
  background-color: rgba(0,123,255,0.6)

}
th {
  width: 50px; border-bottom:1px solid gray;border-left:1px solid gray; overflow-wrap : break-word;text-align: center;
  color:white;
}

td {
  width: 50px; border-bottom:1px solid gray;border-left:1px solid gray;overflow-wrap : break-word;text-align: center;
  color:white;
}

table {
  table-layout:fixed;width: 100%;
  color: white;
}

.post-form {
  height: 80px;
  width: 250px;
  background-color: rgba(92, 133, 245, 0.5);
  border: solid 1px blue;
}

.form-position {
  position: relative;
  padding: 10px;
}

.selected-day {
  padding: 8px;
}

</style>