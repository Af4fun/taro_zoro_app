import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { dispatcher } from '@opcjs/zoro'
import { connect } from '@tarojs/redux'

import CartCommodity from '../../components/cart/cartCommodity/cartCommodity'
import ComponentCommonLogin from '../../components/common/login/login'

@connect(({ user, loading, cart }) => ({
  cart,
  user,
  commodities: cart.commodities,
  initialize: !loading.init,
}))
class PageCart extends Component {
  config = {
    navigationBarTitleText: '购物车',
  }
  state = {
    // 请到README.md中查看此参数说明
    __TAB_PAGE__: true, // eslint-disable-line
  }

  render() {
    const { commodities } = this.props
    return (
      <View>
        <ComponentCommonLogin />
        {commodities.map(item => (
          <CartCommodity key={item.commodityId} commodity={item} />
        ))}
      </View>
    )
  }
}

export default PageCart
