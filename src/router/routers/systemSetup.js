import Main from '@/components/main'
export default [
	{
		path: '/',
		component: Main,
		children: [
			/**
			 * 系统设置
			*/
			{
				path: '/systemSetup/index',
				name: '系统设置',
				meta: {
					code: 'A03'
				},
				component: r => require.ensure([], () => r(require('@/views/systemSetup/index')), 'systemsetup'),
			},
		]
	}

]

