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
    url=""
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
				url: url ? url : '/Dealer/Delete',
				data: {
					Id: item.Id,
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
					message:error.Msg,
					duration:0
				})
				reject();
			})
	})
}

/**
 * 添加与更新事件
 */
export const addUpdate = function ({
	docType="",
	docJson={},
	//表示当前是否为添加
	isAdd = true,
} = {}) {
	let guid = uuidv1();
	//添加更新ug
	docJson.UnionGuidTemp = guid;
	if(isAdd){
        docJson.UnionGuid = guid;
		// 为添加
		return request({
			url: `/${docType}/Add`,
			data:docJson
		  })
	}else{
		//为更新
		return request({
			url: `/${docType}/Update`,
			data:docJson
		  })
	}
}