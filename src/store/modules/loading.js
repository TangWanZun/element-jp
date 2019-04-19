// import {request} from '@/library/request'
export default {
	namespaced: true,
	state: {
		userInfo: {}
	},
	mutations: {
		setUserInfo(state, data) {
			state.userInfo = data
		}
	},
	actions: {
		userInfoAction({ commit }) {
			return new Promise((resolve, reject) => {
				commit('setUserInfo', {
					name: 'admin'
				})
				resolve()
			})
		}
	}
}
