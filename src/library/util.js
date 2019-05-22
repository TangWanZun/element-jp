/**
 * 	数组去重 去处arrA的数据
 * @param {Array} arrA 	 需要去重的数组
 * @param {Array} arrB 	 用来查询重复的数据
 * @param {String} keyA  数据A的key值
 * @param {String} keyB  shujuB的key值
 */
export const arrUnique = function (arrA, arrB, keyA, keyB) {
	for (let i = arrA.length - 1; i >= 0; i--) {
		for (let j = 0; j < arrB.length; j++) {
			if (arrA[i][keyA] == arrB[j][keyB]) {
				arrA.splice(i, 1);
				break;
			}
		}
	}
	return arrA
}
/**
 * objArror对象数组第一个出现属性等于prname的对象索引
 */
export const find =  function(objArror, prNamn, value) {
	for (let i = objArror.length - 1; i >= 0; i--) {
		if (objArror[i][prNamn] == value) {
			return i
		}
	}
	return -1;
}