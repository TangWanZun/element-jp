import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

//获取全部的modules
import user from './modules/user'

Vue.use(Vuex)

//信息持久化
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  modules:{
    user
  },
  state: {
    
  },
  mutations: {

  },
  actions: {

  },
  plugins: [vuexLocal.plugin]
})
