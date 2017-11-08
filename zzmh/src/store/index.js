/**
 * Created by Administrator on 2017/10/30.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import more from './modules/more'
import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    more,
    search
  }
})
