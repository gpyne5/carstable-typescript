<template>
  <div>
    <div class="curret-month">
      <a href="jacascript:void(0)" v-if="exist" @click="beforeMonth">&lt;&lt;</a>
      <h2>{{ workingMonth }}月</h2>
      <a href="jacascript:void(0)" @click="nextMonth">&gt;&gt;</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      currentDate: new Date().toISOString().slice(0, 7),
      workingMonth: new Date().toISOString().slice(0, 7),
      calDate: new Date(),
      exist: false,
    }
  }, 
  methods: {
    nextMonth(this: Vue) {
      this.$data.calDate.setMonth(this.$data.calDate.getMonth() + 1);
      this.$data.workingMonth = this.$data.calData.toISOString().slice(0, 7);
      this.$store.commit('changeMonth', this.$data.workingMonth);
      this.$store.commit('changeDate');
    },
    beforeMonth(this: Vue) {
      this.$data.calDate.setMonth(this.$data.calDate.getMonth() - 1);
      this.$data.workingMonth = this.$data.calData.toISOString().slice(0, 7);
      this.$store.commit('changeMonth', this.$data.workingMonth);
      this.$store.commit('changeDate');
    }
  },
  watch: {
    workingMonth(this: Vue) {
      if(this.$data.workingMonth > this.$data.currentDate){
        this.$data.exist = true;
      } else {
        this.$data.exist = false;
      }
    }
  }
})
</script>

<style>
.current-month {
    width: 100%;
    text-align: center;
}

h2 {
    text-align: center;
    font-size: 20px;
    display: inline-table;
    margin: 0 auto;
}
</style>