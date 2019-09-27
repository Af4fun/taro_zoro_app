import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { dispatcher } from '@opcjs/zoro'
import classNames from 'classnames'

import styles from './cartCommodity.scss'

class CartCommodity extends Component {
  static defaultProps = {
    commodity: {},
  }

  handlAdd(commodity) {
    dispatcher.cart.addCart(commodity)
  }

  render() {
    const { commodity } = this.props
    const { commodityName, commodityImage, costPrice, salePrice } = commodity
    return (
      <View className={styles.commodity}>
        <View className={styles.pic}>
          <Image
            className={classNames(styles.image, 'skeleton-square')}
            lazyLoad
            src={commodityImage}
          />
        </View>
        <View className={styles.content}>
          <View className={classNames(styles.name, 'skeleton-square')}>
            {commodityName}
          </View>
          <View className={styles.tool}>
            <View className={styles.price}>
              <View className={classNames(styles.sprice, 'skeleton-square')}>
                <Text className={styles.unit}>¥</Text>
                {salePrice}
              </View>
              <View className={classNames(styles.cprice, 'skeleton-square')}>
                ¥{costPrice}
              </View>
            </View>
            <View
              className={classNames(styles.btn, 'skeleton-square')}
              onClick={this.handlAdd.bind(this, commodity)}
            >
              +
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default CartCommodity
