import request from '../utils/request'

export function getBannerInfo() {
  return request({
    url: '/Basic/AdvList',
    method: 'GET',
  })
}

export function getGroupList(params) {
  return request({
    url: '/GroupBuy/List',
    method: 'GET',
    data: params,
  })
}
