export default {
  namespace: 'cart',

  mixins: ['common'],

  state: {
    commodities: [],
  },

  effects: {
    async addCart({ payload }, { put, select }) {
      const commoditity = payload
      let { commodities } = select()
      let list = [...commodities]
      list.some(item => item.commodityId === commoditity.commodityId) &&
        list.push(commoditity)
      put({ type: 'update', payload: { commodities: list } })
    },
    async reduceCart({ payload }, { put, select }) {
      const commoditity = payload
      let { commodities } = select()
      let list = commodities.filter(item => {
        item.commodityId != commoditity.commodityId
      })
      put({ type: 'update', payload: { commodities: list } })
    },
  },
}
