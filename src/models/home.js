import { getBannerInfo, getGroupList } from '../requests/homeservice'
import { SKELETON_BANNER, SKELETON_COMMODITY } from '../constants/skeleton'

export default {
  namespace: 'home',

  mixins: ['common', 'pagination'],

  state: {
    banners: SKELETON_BANNER,
    leftCommodities: SKELETON_COMMODITY, /// 默认加载骨架屏数据
    rightCommodities: SKELETON_COMMODITY,
  },

  effects: {
    /// 加载顶部banner
    async getBannerInfo(action, { put }) {
      const data = await getBannerInfo()
      let list = data[0].List
      put({ type: 'update', payload: { banners: list } })
    },
    /// 加载热销商品
    async getHotSaleCommodityList(
      { payload: { PageIndex: current } = {} },
      { put, select },
    ) {
      const {
        // pageination 分页查询参数
        pagination: { PageIndex, PageSize },
      } = select()

      const pagination = { PageIndex: current || PageIndex + 1, PageSize }
      const { List } = await getGroupList(pagination)

      put({
        type: 'updatePageDataToDoubleColunms',
        payload: {
          firstKey: 'leftCommodities',
          secondKey: 'rightCommodities',
          data: List,
          pagination,
        },
      })
    },
  },
}
