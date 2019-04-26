import { login } from '@/api/user'
import {ROOT_URL} from '@/config'

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
					.catch((error)=>{
						reject(error)
					})
			})
		},
		/**
		 * 退出登录
		 */
		userLoginOut({commit}){
			commit('setRsid','');
			window.location.href = `${ROOT_URL}/Login/LoginOut`;
		}
	}
}
