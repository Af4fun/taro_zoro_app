import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'
import classNames from 'classnames'
import styles from './submenus.scss'

@connect(({ category }) => ({
  category,
}))
class CategroySubMenus extends Component {
  static defaultProps = {
    onChange: () => {},
  }

  handleClick(item) {
    dispatcher.category.categoryIdChange({ id: item.id }, { noAuth: true })
  }

  render() {
    const { subMenus, categoryId } = this.props.category
    return (
      <ScrollView scrollX>
        {subMenus.length > 1 ? (
          <View className={classNames(styles.submenulist, 'skeleton-square')}>
            {subMenus.map(item => {
              return (
                <View
                  key={item.id}
                  onClick={this.handleClick.bind(this, item)}
                  className={classNames(styles.item, {
                    [styles.active]: item.id == categoryId,
                  })}
                >
                  <Text>{item.name}</Text>
                </View>
              )
            })}
          </View>
        ) : (
          <View />
        )}
      </ScrollView>
    )
  }
}

export default CategroySubMenus
