/**
 * Created by Administrator on 2017/10/30.
 */
import * as types from '../mutation-types'

const state={
  showmore:false
}

const getters={
  getshowmore:state=>state.showmore
}

const mutations={
   [types.GET_ISSHOW](state,show){
     state.showmore=show
   }
}
export default {
  state,
  getters,
  mutations
}
