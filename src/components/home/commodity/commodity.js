import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'

import styles from './commodity.scss'

class ComponentHomeCommodity extends Component {
  static defaultProps = {
    commodity: {},
  }

  render() {
    const {
      commodity: { GoodsName, FullImageUrl, Price, OriginalPrice },
    } = this.props

    return (
      <View className={styles.commodity}>
        <Image
          className={classNames(styles.image, 'skeleton-square')}
          lazyLoad
          src={FullImageUrl}
        />
        <View className={classNames(styles.name, 'skeleton-square')}>
          {GoodsName}
        </View>
        <View className={styles.tool}>
          <View className={styles.price}>
            <View className={classNames(styles.sprice, 'skeleton-square')}>
              <Text className={styles.unit}>¥</Text>
              {Price}
            </View>
            <View className={classNames(styles.cprice, 'skeleton-square')}>
              ¥{OriginalPrice}
            </View>
          </View>
          <View className={classNames(styles.btn, 'skeleton-square')}>+</View>
        </View>
      </View>
    )
  }
}

export default ComponentHomeCommodity
