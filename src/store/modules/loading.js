export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  mutations: {
	setUserInfo(state,data){
		state.userInfo = data
	}
  },
  actions: {
	userInfoAction({commit},){
		return new Promise((resolve,reject)=>{
			
		})
	}
  }
})
