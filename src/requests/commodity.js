import request from '../utils/request'

export function getHotSaleCommodityList(data) {
  return request({
    url: '/GroupBuy/List',
    method: 'GET',
    data,
  })
}
