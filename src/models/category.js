import { SKELETON_CATEGORIES } from '../constants/skeleton'
import { getHotSaleCommodityList } from '../requests/commodity'
import { getCategoryList } from '../requests/category'

export default {
  namespace: 'category',

  mixins: ['common', 'pagination'],

  state: {
    categories: SKELETON_CATEGORIES, /// 分类大项
    subMenus: [], /// 分类子项
    CategoryId: null, /// 激活项 id
    activeCategory: 0, /// 激活项
    commodities: [],
    topNum: 0,
  },

  effects: {
    /// 加载分类项
    async loadCategories(action, { put }) {
      /// 异步获取源数据
      let Data = await getCategoryList()
      /// 处理 返回函数
      let list = Data.map(item => {
        if (!item.children) item.children = []
        item.children.unshift({
          Id: item.Id,
          Name: '全部',
        })
        return item
      })
      let subMenus = list[0].children
      let CategoryId = subMenus[0].Id

      put({
        type: 'update',
        payload: { categories: list, subMenus, CategoryId },
      })
      put({ type: 'changeList', mate: { noAuth: true } })
    },
    /// 分类id 选择
    categoryParentChange({ payload }, { put, select }) {
      let active = payload
      const { categories, activeCategory } = select()
      if (active === activeCategory) return
      let subMenus = categories[active].children
      let id = subMenus[0].Id
      put({
        type: 'update',
        payload: {
          activeCategory: active,
          subMenus,
          CategoryId: id,
          topNum: Math.random(), /// 加随机数 回到顶部
        },
        meta: { noAuth: true },
      })
      put({ type: 'changeList', meta: { noAuth: true } })
    },

    categoryIdChange({ payload }, { put, select }) {
      const id = payload.Id
      const { CategoryId } = select()
      if (id === CategoryId) return
      put({
        type: 'update',
        payload: { CategoryId: id, topNum: Math.random() },
      })
      put({ type: 'changeList', meta: { noAuth: true } })
    },

    changeList(action, { put }) {
      put({ type: 'resetPagination', meta: { noAuth: true } })
      put({ type: 'queryGoods', meta: { noAuth: true } })
    },

    async queryGoods(
      { payload: { PageIndex: current } = {} },
      { put, select },
    ) {
      let {
        // pageination 分页查询参数
        pagination: { PageIndex, PageSize },
        CategoryId,
      } = select()
      const pagination = {
        PageIndex: current || PageIndex + 1,
        PageSize,
        CategoryId,
        Type: 1,
      }
      const { commodities = [] } = await getHotSaleCommodityList(pagination)
      put({
        type: 'updatePageData',
        payload: {
          key: 'commodities',
          data: commodities,
          pagination,
        },
        meta: { noAuth: true },
      })
    },
  },
}
