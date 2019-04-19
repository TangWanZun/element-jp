import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

//获取全部路由信息
import wxMinManage from './routers/wxMinManage'
import dataAnalysis from './routers/dataAnalysis'
import systemSetup from './routers/systemSetup'

//添加注册页面
let Loading = [
	{
		path: '/Loading/index',
		name: '登录页面',
		// meta:{
		// 	code:'A02'
		// },
		component: r => require.ensure([], () => r(require('@/views/loading')), 'loading'),
	},
]

//路由合并
const routes = wxMinManage.concat(dataAnalysis,Loading,systemSetup)

Vue.use(Router)

const router = new Router({
	routes,
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

router.beforeEach((to, from, next) => {
	//如果是登录页面则直接进入
	if(to.name=="登录页面"){
		next();
		return
	}
	//检查当前是否存在有用户信息
	if(JSON.stringify(store.state.loading.userInfo)=="{}"){
		//表示当前不存在用户信息，及没有登录，需要跳转到登录页面
		next('/Loading/index')
		return
	}
	if(to.path=="/"){
		//默认跳转到主数据管理页面
		next('/wxMinManage/boutique')
		return
	}
	next();
})


export default router
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: function () { 
//         return import(/* webpackChunkName: "about" */ '@/views/About.vue')
//       }
//     }
//   ]
// })
