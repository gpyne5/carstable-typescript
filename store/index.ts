import {getAccessorType} from 'typed-vuex'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => {
  return {
    cars:           [] as Data1[],
    calender:       [] as Data2[],
    date:           new Date(),
    calDate:        null,
    daysCount:      0,
    workingMonth:   new Date().toISOString().slice(0,7),
    selectedDays:   [] as string[], //選択した期間
    selectedCarId:  '', //選択した車のid
    putForm:        false,
    pos:            { top: "0", left: "0", position: "" },
    cellColor:      {backgroundColor: ''},
  }
}
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  cars(state) {
    return state.cars;
  },
  calender(state) {
    return state.calender;
  },
  date(state) {
    return state.date;
  },
  calDate(state) {
    return state.calDate;
  },
  daysCount(state) {
    return state.daysCount;
  },
  workingMonth(state) {
    return state.workingMonth;
  },
  selectedDays(state) {
    return state.selectedDays;
  },
  selectedCarId(state) {
    return state.selectedCarId;
  },
  putForm(state) {
    return state.putForm;
  },
  pos(state) {
    return state.pos;
  },
  cellColor(state) {
    return state.cellColor;
  }
}

export const mutations: MutationTree<RootState> = {
  setData(state, payload: [Data1[], Data2[]]) {
    state.cars = payload[0];
    state.calender = payload[1];
  },
  changeMonth(state, payload: string) {
    state.workingMonth = payload;
  },
  selectDays(state, payload: string[]) {
    state.selectedDays = payload;
  },
  selectCar(state, payload: string) {
    state.selectedCarId = payload;
  },
  changePutForm(state,payload: boolean) {
    state.putForm = payload;
  },
  changePos(state, payload: {top: string, left: string, position:string}) {
    state.pos = payload;
  },
  changeCellColor(state, payload: {backgroundColor: string}) {
    state.cellColor = payload;
  },
  changeDate(state) {
    let splitWorkingM = state.workingMonth.split('-');
    // new Date(parseInt(year, 10進数), parseInt(month, １０進数), 0)...monthは0~11で指定するわけだから
    //   2021-03は2021-04になる
    let date = new Date(parseInt(splitWorkingM[0], 10), parseInt(splitWorkingM[1], 10), 0).getDate();
    state.daysCount = date;
  },
  setLoadDate(state) {
    let splitWorkingM = state.workingMonth.split('-');
    let date = new Date(parseInt(splitWorkingM[0], 10), parseInt(splitWorkingM[1], 10), 0).getDate();
    state.daysCount = date;
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async getData(context){
    await this.$axios.get('http://localhost/admin')
      .then(res => context.commit('setData', res.data))
      .catch(e => console.log(e));
  },
  async postData(context, payload: {car_name: string, car_number: string}) {
    await this.$axios.post('http://localhost/admin', payload)
      .then(res => context.commit('setData',res.data))
      .catch(e => console.log(e));
  },
  async deleteData(context, payload:string){
    await this.$axios.delete('http://localhost/admin/' + payload)
      .then(res => context.commit('setData',res.data))
      .catch(e => console.log(e));
  },
  async putData(context, payload: putData){
    await this.$axios.put('http://localhost/admin/' + payload.id, payload.data)
      .then(res => context.commit('setData',res.data))
      .catch(e => console.log(e));
  },
}

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions
})

type Data1 = {
  car_name:    string,
  car_number:  string,
  id:          number
}
export type Data2 = {
  car_id:   number,
  id:       number,
  y_m:      string,
  _1:       string | null,
  _2:       string | null,
  _3:       string | null,
  _4:       string | null,
  _5:       string | null,
  _6:       string | null,
  _7:       string | null,
  _8:       string | null,
  _9:       string | null,
  _10:      string | null,
  _11:      string | null,
  _12:      string | null,
  _13:      string | null,
  _14:      string | null,
  _15:      string | null,
  _16:      string | null,
  _17:      string | null,
  _18:      string | null,
  _19:      string | null,
  _20:      string | null,
  _21:      string | null,
  _23:      string | null,
  _24:      string | null,
  _25:      string | null,
  _26:      string | null,
  _27:      string | null,
  _28:      string | null,
  _29:      string | null,
  _30:      string | null,
  _31:      string | null,
}
type putData = {
  id: string,
  data: {
    customerName: string,
    currentMonth: string,
    dateStart: string,
    dateEnd: string
  }
}

export interface KeyType {
  [key: string]: number | string | null
}


