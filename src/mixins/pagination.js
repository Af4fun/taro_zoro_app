import { PAGINATION } from '../constants/common'
import { formatPagination } from '../utils/tools'

export default {
  namespace: 'pagination',
  state: {
    pagination: { ...PAGINATION },
    noMore: false,
  },
  effects: {
    // 存储分页数据采用静默刷新模式
    updatePageData(
      {
        payload: { key, data, pagination },
      },
      { select, put },
    ) {
      put({ type: 'setPagination', payload: { pagination } })
      const oldState = select()
      const oldData = oldState[key]
      const { PageIndex } = oldState.pagination // 获取当前页码

      let newData = [] /// 新列表
      /// 这里判断逻辑 旧数据数量大于页码
      if (oldData.length > PageIndex) {
        newData = oldData.slice(0, PageIndex)
      } else {
        newData = oldData.slice(0)
      }
      newData[PageIndex - 1] = data
      /// [data, data, data] 按页码塞入数据 在利用reselect 优化渲染算法
      put({
        type: 'update',
        payload: { [key]: newData, noMore: data.length <= 0 },
      })
    },
    // 存储分页数据为伪双列瀑布流模式
    updatePageDataToDoubleColunms(
      {
        payload: { firstKey, secondKey, data, pagination },
      },
      { select, put },
    ) {
      put({ type: 'setPagination', payload: { pagination } })
      const oldState = select()
      const oldFirstData = oldState[firstKey] || []
      const oldSecondData = oldState[secondKey] || []
      const { PageIndex } = oldState.pagination

      let newFirstData = []
      if (oldFirstData.length > PageIndex) {
        newFirstData = oldFirstData.slice(0, PageIndex)
      } else {
        newFirstData = oldFirstData.slice(0)
      }

      let newSecondData = []
      if (oldSecondData.length > PageIndex) {
        newSecondData = oldSecondData.slice(0, PageIndex)
      } else {
        newSecondData = oldSecondData.slice(0)
      }
      const { first, second } = data.reduce(
        (result, item, index) => {
          if (index % 2) {
            result.second.push(item)
          } else {
            result.first.push(item)
          }

          return result
        },
        { first: [], second: [] },
      )

      newFirstData[PageIndex - 1] = first
      newSecondData[PageIndex - 1] = second
      put({
        type: 'update',
        payload: {
          [firstKey]: newFirstData,
          [secondKey]: newSecondData,
          noMore: data.length <= 0,
        },
      })
    },
  },
  reducers: {
    setPagination(
      {
        payload: { pagination },
      },
      state,
    ) {
      const currentPagination = formatPagination(pagination)
      return { ...state, pagination: { ...currentPagination } }
    },
    resetPagination(action, state) {
      return { ...state, pagination: { ...PAGINATION } }
    },
  },
}
