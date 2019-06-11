/**
 * 用于存储系统配置
 */
const ROOT_URL = "https://vip.sap-unis.com/jppc/"
/**
 * 根url
 */
export const HOST_URL = process.env.NODE_ENV == 'development' ? '' : ROOT_URL
/**
 * API接口 url
 */
export const REQUEST_URL = `${HOST_URL}`
/**
 * 媒体文件URL
 */
export const FILE_URL = `${HOST_URL}Integrated/UploadFile`
/**
 * 图片URL
 */
export const IMG_URL = ROOT_URL