import { request } from '@/library/request'
import { Notification } from 'element-ui';
import uuidv1 from "uuid/v1";

/**
 * 删除事件
 */
export const delData = function ({
	docType = '',
	//删除数据  DocId  主键
	list = [],
} = {}) {
	// //console.log({
	// 	url: '/DoAction/Submit',
	// 	data: {
	// 		DocType: docType,
	// 		ActionType: "Delete",
	// 		UnionGuid: guid,
	// 		UnionGuidTemp: uuidv1(),
	// 		DocJson: {
	// 			List: list
	// 		}
	// 	}
	// })
	let proList = [];
	for (let i = 0; i < list.length; i++) {
		let item = list[i];
		proList.push(
			request({
				url: '/DoAction/Submit',
				data: {
					DocType: docType,
					ActionType: "Delete",
					DocId: item.DocId,
					UnionGuid: item.UnionGuid,
					UnionGuidTemp: uuidv1(),
				}
			})
		)
	}
	return new Promise((resolve, reject) => {
		Promise.all(proList)
			.then((res) => {
				resolve(res)
			})
			.catch((error) => {
				Notification.error({
					title: '错误',
					message:error.ErrMsg,
					duration:0
				})
				reject();
			})
	})
}