import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'

import ComponentCommonLoading from '../../common/loading/loading'
import ComponentHomeCommodity from '../commodity/commodity'
import { hotSaleCommoditiesSelector } from '../../../selectors/commodity'

import styles from './hotSale.scss'

@connect(state => ({
  ...hotSaleCommoditiesSelector(state),
  noMore: state.home.noMore,
  loading: state.loading.effect['home/getHotSaleCommodityList'],
}))
class ComponentHomeHotSale extends Component {
  static defaultProps = {
    leftCommodities: [],
    rightCommodities: [],
    noMore: false,
    loading: false,
  }

  render() {
    const { leftCommodities, rightCommodities, loading, noMore } = this.props
    return (
      <View className={classNames(styles.hotsale, 'skeleton-light')}>
        <View className={styles.header}>
          <View className={classNames(styles.title, 'skeleton-square')}>
            今日团购
          </View>
          <View className={classNames(styles.tip, 'skeleton-square')}>
            每日推荐，超值抢购
          </View>
        </View>
        <View className={styles.list}>
          <View className={styles.left}>
            {leftCommodities.map(commodity => (
              <View className={styles.commodity} key={commodity.GroupBuyId}>
                <ComponentHomeCommodity commodity={commodity} />
              </View>
            ))}
          </View>
          <View className={styles.right}>
            {rightCommodities.map(commodity => (
              <View className={styles.commodity} key={commodity.commodityId}>
                <ComponentHomeCommodity commodity={commodity} />
              </View>
            ))}
          </View>
        </View>
        <ComponentCommonLoading loading={loading} />
        {noMore && <View className={styles.nomore}>没有更多了</View>}
      </View>
    )
  }
}

export default ComponentHomeHotSale
