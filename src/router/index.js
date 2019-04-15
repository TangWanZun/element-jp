import Vue from 'vue'
import Router from 'vue-router'

//获取全部路由信息
import wxMinManage from './routers/wxMinManage'
import dataAnalysis from './routers/dataAnalysis'

//添加注册页面
let Register = [
	{
		path: '/Register/index',
		name: '登录页面',
		// meta:{
		// 	code:'A02'
		// },
		component: r => require.ensure([], () => r(require('@/views/register')), 'register'),
	},
]

//路由合并
const routes = wxMinManage.concat(dataAnalysis,Register)

Vue.use(Router)

const router = new Router({
	routes,
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

router.beforeEach((to, from, next) => {
	if(to.path=="/"){
		//默认跳转到数据分析
		next('/dataAnalysis/index')
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
