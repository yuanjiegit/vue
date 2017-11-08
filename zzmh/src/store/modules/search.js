/**
 * Created by Administrator on 2017/11/2.
 */
import * as types from '../mutation-types'

const state = {
  history: [],
  isnull: false,
  show: false,
  isfocus: true
}
const getters = {
  gethistory: state => state.history,
  getisnull: state => state.isnull,
  getshow: state => state.show,
  getisfocus: state => state.isfocus
}
const mutations = {
  [types.ADD_HISTORY](state, history){
    if (state.history.length == 0) {
      state.history.push(history)
    } else {
      let flag = false
      let index = 0
      for (let i = 0; i < state.history.length; i++) {
        if (state.history[i] == history) {
          flag = true
          index = i
        }
      }
      if (flag) {
        state.history.splice(index, 1)
        state.history.unshift(history)
      } else {
        state.history.unshift(history)
      }

    }
  },
  [types.IS_SHOW](state, num){
    if (num) {
      state.isnull = true
    } else {
      state.isnull = false
    }
  },
  [types.DELETE_ALLHISTORY](state){
    state.history = []
  },
  [types.DELETE_ONEHISTORY](state, index){
    state.history.splice(index, 1)
  },
  [types.SHOW_COMICS](state, show){
    state.show = show
  },
}
const actions={
  timer({state},isshow){
    setTimeout(function () {
      state.isfocus=isshow
    },0)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
