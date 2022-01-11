import request from '@/utils/request'
/**
 * 获取品牌数据
 * @param {*} limit
 * @returns
 */
export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}
