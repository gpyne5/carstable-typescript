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
    putForm: false,
    pos: { left: 0, top: 0 },
    cellColor: {},
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
  putForm(state) {
    return state.putForm
  },
  pos(state) {
    return state.pos
  },
  cellColor(state) {
    return state.cellColor
  }
}

export const mutations: MutationTree<RootState> = {

}

export const actions: ActionTree<RootState, RootState> = {

}

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions
})