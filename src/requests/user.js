import request from '../utils/request'

export function userLogin(data) {
  const { code } = data
  return request({
    url: '/Account/Login?code=' + code,
    header: {
      noAuth: true,
    },
    method: 'POST',
  })
}

export function uploadUserInfo(data) {
  return request({
    url: '/v1/user/info',
    data,
    method: 'POST',
  })
}

export function getUserInfo() {
  return request({
    url: '/User/Details',
    method: 'GET',
  })
}
