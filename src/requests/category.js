import request from '../utils/request'

export function getCategoryList(data) {
  return request({
    url: '/GroupBuy/CategoryList',
    method: 'GET',
    data,
  })
}
