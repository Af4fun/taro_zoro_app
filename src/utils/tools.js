import Taro from '@tarojs/taro'

import { TOKEN_KEY } from '../constants/common'

export function weappApiFail(message) {
  return /:fail/.test(message)
}

export function throttle(handler, time) {
  let can = true
  return function() {
    if (can) {
      can = false
      handler()
      setTimeout(() => {
        can = true
      }, time)
    }
  }
}

export function delay(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export function checkToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await Taro.getStorage({ key: TOKEN_KEY })
      if (token) resolve()
      else reject()
    } catch (error) {
      reject()
    }
  })
}

export function formatPagination(pagination = {}) {
  const { PageIndex, PageSize } = pagination

  return {
    PageIndex: parseInt(PageIndex) || 0,
    PageSize: parseInt(PageSize) || 0,
  }
}
