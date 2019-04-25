export default {
	namespaced: true,
	state: {
		//缓存车系映射的数据
		classifyCache:{}
	},
	mutations: {
		setClassifyCache(state, data) {
			state.classifyCache = data
		}
	},
}
