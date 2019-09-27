import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'
import { dispatcher } from '@opcjs/zoro'

import ComponentCommonSkeleton from '../../components/common/skeleton/skeleton'
import ComponentHomeNavigation from '../../components/home/navigation/navigation'
import ComponentHomeCarousel from '../../components/home/carousel/carousel'
import ComponentHomeHotSale from '../../components/home/hotSale/hotSale'
import styles from './home.scss'

@connect(({ home, loading }) => ({
  hotSaleNoMore: home.noMore,
  initialize: !loading.init || loading.init['home/getHotSaleCommodityList'],
}))
class PageHome extends Component {
  config = {
    navigationBarTitleText: '侠客团',
    enablePullDownRefresh: true,
  }

  state = {
    // 请到README.md中查看此参数说明
    __TAB_PAGE__: true, // eslint-disable-line
  }

  componentWillMount() {
    // 获取广告
    dispatcher.home.getBannerInfo()
    // 获取商品列表
    dispatcher.home.getHotSaleCommodityList(undefined, {
      loadingKey: 'init',
    })
  }

  onPullDownRefresh() {
    dispatcher.home.resetPagination()
    Promise.all([
      dispatcher.home.getBannerInfo(),
      dispatcher.home.getHotSaleCommodityList(),
    ])
      .then(() => {
        setTimeout(Taro.stopPullDownRefresh, 500)
      })
      .catch(Taro.stopPullDownRefresh)
  }

  onReachBottom() {
    const { hotSaleNoMore } = this.props
    if (hotSaleNoMore) return
    dispatcher.home.getHotSaleCommodityList()
  }

  render() {
    const { initialize } = this.props

    return (
      <View className={classNames(styles.home, 'skeleton')}>
        {initialize && <ComponentCommonSkeleton />}
        <ComponentHomeNavigation />
        <ComponentHomeCarousel />
        <View className={styles.content}>
          <ComponentHomeHotSale />
        </View>
      </View>
    )
  }
}

export default PageHome
