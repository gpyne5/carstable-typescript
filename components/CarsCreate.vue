<template>
  <div class="cars-create">
    <button type="button" v-on:click="onoff" class="btn btn-outline-primary">車両追加</button>
    <div v-show="flag" class="create">
      車種名：<input name="car_name" v-model="carName" type="text"><br>
      ナンバー（4桁）：<input name="car_number" v-model="carNumber" type="number"><br>
      <input type="submit" id="submit" v-on:click="onclick" class="submit">
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CarsCreate',
  data() {
    return {
      carName:     '',
      carNumber:   null,
      flag:        false,
    };
  },
  methods: {
    async onclick(this: Vue) {
      let data = {
        'car_name':    this.$data.carName as string,
        'car_number':  String(this.$data.carNumber),
      }
      await this.$store.dispatch('postData', data);
      
      if(this.$data.flag) {
        this.$data.flag = false;
      } else {
        this.$data.flag = true;
      }

      this.$data.carName = '';
      this.$data.carNumber = null;


    },
    onoff(this: Vue) {
      if(this.$data.flag) {
        this.$data.flag = false;
      } else {
        this.$data.flag = true;
      }
    }
  }
})
</script>

<style>
.cars-create {
  padding: 10px;
  float: left;
}

.submit {
  margin:5px;
}

.create {
  color:gray;
  padding: 10px;
  position: relative;
  border: solid 1px #000;
  height: 180px;
  width: 200px;
  background-color: rgba(0, 123, 255, 0.2);
}
</style>