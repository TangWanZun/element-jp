import { login,loginOut } from '@/api/user'
import router from '@/router/index'

export default {
	namespaced: true,
	state: {
		//当前用户登录的令牌
		rsid: '',
		//用于保存用户名和密码
		user:{
			userName:'',
			password:"",
			//是否记住密码
			checked:false
		}
	},
	mutations: {
		setRsid(state, data) {
			state.rsid = data
		},
		setUser(state,{userName,password,checked}){
			state.user.userName = userName;
			state.user.password = password;
			state.user.checked = checked;
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
			loginOut()
				.then(()=>{
					router.replace('/Loading/index')
				})
		}
	}
}
