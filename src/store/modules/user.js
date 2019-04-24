import { login } from '@/api/user'

export default {
	namespaced: true,
	state: {
		//当前用户登录的令牌
		rsid: ''
	},
	mutations: {
		setRsid(state, data) {
			state.rsid = data
		}
	},
	actions: {
		/**
		 *登录用户与密码
		 */
		userLoginAction({ commit },{userName,password}) {
			return new Promise((resolve, reject) => {
				login({
					userName,
					password
				})
					.then((res)=>{
						commit('setRsid',res);
						resolve()
					})
			})
		}
	}
}
