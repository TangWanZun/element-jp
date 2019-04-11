export default [
	/**
	 * 小程序管理
	*/
	{
		path: '/wxMinManage',
		name: '小程序管理',
		meta:{
			code:'A02'
		},
		component: r => require.ensure([], () => r(require('@/views/wxMinManage/main')), 'wxMinManage'),
		children:[
			{
				path: 'boutique',
				name: '精品管理',
				component: r => require.ensure([], () => r(require('@/views/wxMinManage/children/boutique')), 'boutique'),
			},
			{
				path: 'distributor',
				name: '经销商管理',
				component: r => require.ensure([], () => r(require('@/views/wxMinManage/children/distributor')), 'distributor'),
			}
		]
	},
	{
		path: '/wxMinManage/classify',
		name: '精品分类',
		meta:{
			code:'A02'
		},
		component: r => require.ensure([], () => r(require('@/views/wxMinManage/children/classify')), 'classify'),
	},
	
]

