import request from '@/utils/request'
/**
 * 获取品牌数据
 * @param {*} limit
 * @returns
 */
export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}
/**
 * 获取广告图
 * @returns Promise
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}
export const findNew = () => {
  return request('home/new', 'get')
}
export const findHot = () => {
  return request('home/hot', 'get')
}
