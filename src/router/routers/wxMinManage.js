import Main from '@/components/main'
export default [
	{
		path: '/',
		component: Main,
		children: [
			/**
			 * 小程序管理
			*/
			{
				path: '/wxMinManage',
				name: '小程序管理',
				meta: {
					code: 'A02'
				},
				component: r => require.ensure([], () => r(require('@/views/wxMinManage/main')), 'wxMinManage'),
				children: [
					{
						path: 'cartype',
						name: '车系定义',
						component: r => require.ensure([], () => r(require('@/views/wxMinManage/children/cartype')), 'cartype'),
					},
					{
						path: 'boutique',
						name: '精品管理',
						component: r => require.ensure([], () => r(require('@/views/wxMinManage/children/boutique/index')), 'boutique'),
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
				meta: {
					code: 'A02'
				},
				component: r => require.ensure([], () => r(require('@/views/wxMinManage/children/classify')), 'classify'),
			},
		]
	},
]

