import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'

import styles from './navigation.scss'

class ComponentHomeNavigation extends Component {
  static options = {
    addGlobalClass: true,
  }

  render() {
    return (
      <View className={styles.navigation}>
        <View className={classNames(styles.address, 'skeleton-cylinder')}>
          <Text>三利云锦店</Text>
        </View>
      </View>
    )
  }
}

export default ComponentHomeNavigation
