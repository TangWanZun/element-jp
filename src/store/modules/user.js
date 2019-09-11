import { login,loginOut } from '@/api/user'
import router from '@/router/index'
import vm from "vue"

export default {
	namespaced: true,
	state: {
	    isLogin:false,
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
		isLogin(state, isLogin) {
			state.isLogin = isLogin
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
						commit('isLogin',true);
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
		userLoginOut({ commit }){
			commit('isLogin',false);
            console.log(this.state.user.isLogin);
            loginOut()
				.then(()=>{
                    router.replace('/Loading/index')
				})
		}
	}
}
