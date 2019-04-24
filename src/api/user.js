import { request } from '@/library/request'

/**
 * 输入登录密码，获取登录信息
 */
export const login = ({ userName, password }) => {
	return request({
		url: '/Login/StaticLogin',
		data: {
			usercode: userName,
			psw: password
		}
	})
}