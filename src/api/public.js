import { request } from '@/library/request'

/**
 * 删除事件
 */
export const delData = function ({
	docType = '',
	//删除数据  UnionId  主键
	list = []
} = {}) {
	console.log({
		url: '/DoAction/Submit',
		data: {
			DocType: docType,
			ActionType: "Delete",
			DocJson: {
				List: list
			}
		}
	})
	return request({
		url: '/DoAction/Submit',
		data: {
			DocType: docType,
			ActionType: "Delete",
			DocJson: {
				List: list
			}
		}
	})
}