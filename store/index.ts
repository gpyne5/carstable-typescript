import {getAccessorType} from 'typed-vuex'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => {
  return {
    cars: ['fafaf'] as string[],
    calender: ['2090-12'] as string[],
    date: new Date(),
    calDate: null,
    daysCount: 0,
    workingMonth: new Date().toISOString().slice(0,7),
    selectedDays: [] as string[], //選択した期間
    selectedCarId: null, //選択した車のid
    // putForm: false,
    pos: { top: "0", left: "0", position: "" },
    // cellColor: {},
  }
}
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  cars(state) {
    return state.cars
  },
  calender(state) {
    return state.calender
  },
  date(state) {
    return state.date
  },
  calDate(state) {
    return state.calDate
  },
  daysCount(state) {
    return state.daysCount
  },
  workingMonth(state) {
    return state.workingMonth
  },
  selectedDays(state) {
    return state.selectedDays
  },
  selectedCarId(state) {
    return state.selectedCarId
  },
  // putForm(state) {
  //   return state.putForm
  // },
  pos(state) {
    return state.pos
  },
  // cellColor(state) {
  //   return state.cellColor
  // }
}

export const mutations: MutationTree<RootState> = {
  setData(state, payload) {
    state.cars = payload.data[0],
    state.calender = payload.data[1]
  },
  changeMonth(state, payload) {
    state.workingMonth = payload
  },
  selectDays(state, payload) {
    state.selectedDays = payload
  },
  selectCar(state,payload) {
    state.selectedCarId = payload
  },
  // putForm(state,payload) {
  //   state.putForm = payload
  // },
  changePos(state, payload: {top: string, left: string, position:string}) {
    state.pos = payload
  },
  // cellColor(state, payload) {
  //   state.cellColor = payload
  // },
  changeDate(state, payload) {
    let splitWorkingM = state.workingMonth.split('-')
    // new Date(parseInt(year, 10進数), parseInt(month, １０進数), 0)...monthは0~11で指定するわけだから
    //   2021-03は2021-04になる
    let date = new Date(parseInt(splitWorkingM[0], 10), parseInt(splitWorkingM[1], 10), 0).getDate()
    state.daysCount = date
  },
  setLoadDate(state, payload) {
    let splitWorkingM = state.workingMonth.split('-')
    let date = new Date(parseInt(splitWorkingM[0], 10), parseInt(splitWorkingM[1], 10), 0).getDate()
    state.daysCount = date
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async getData(context){
    await this.$axios.get('http://localhost/admin')
      .then(res => context.commit('setData', res))
      .catch(e => console.log(e))
  },
  async postData(context, payload) {
    await this.$axios.post('http://localhost/admin', payload)
      .then(res => context.commit('setData',res))
      .catch(e => console.log(e))
  },
  async deleteData(context, payload){
    await this.$axios.delete('http://localhost/admin/' + payload)
      .then(res => context.commit('setData',res))
      .catch(e => console.log(e))
  },
  async putData(context, payload){
    await this.$axios.put('http://localhost/admin/' + payload.id, payload.data)
      .then(res => context.commit('setData',res))
      .catch(e => console.log(e))
  },
}

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions
})