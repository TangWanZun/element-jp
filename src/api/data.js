import { request } from '@/library/request'

/**
 * 获取精品分类列表
 */
export const getItemGroup = function () {
	return request({
		url: "/DoAction/GetSingleList",
		data: {
			DocType: "ItemGroup",
		}
	})
}

/**
 * 获取精品列表
 */
export const getJpItem = function ({
	//页数
	page = 1,
	//精品分类的id
	Id = 0,
	//查询数据
	searchv = ''
} = {}) {
	return request({
		url: "/DoAction/GetListAndTotal",
		data: {
			DocType: "JpItem",
			Start: (page - 1) * 25,
			Limit: 25,
			Id: Id,
			Searchv: searchv
		}
	})
}