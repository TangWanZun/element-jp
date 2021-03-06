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
				path: '/dataAnalysis/index',
				name: '数据分析',
				meta: {
					code: 'A01'
				},
				component: r => require.ensure([], () => r(require('@/views/dataAnalysis/main')), 'dataAnalysis'),
			},
		]
	}

]

