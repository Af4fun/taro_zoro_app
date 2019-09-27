import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'
import classNames from 'classnames'
import styles from './slider.scss'

@connect(({ category }) => ({
  category,
}))
class CategorySlider extends Component {
  static options = {
    addGlobalClass: true,
  }
  static defaultProps = {
    list: [
      {
        id: 1,
        name: '',
        children: [
          {
            id: 11,
            name: '',
          },
        ],
      },
    ],
    current: -1,
    onChange: () => {},
  }
  handleClick(index) {
    dispatcher.category.categoryParentChange(index, { noAuth: true })
  }
  render() {
    const { categories, activeCategory } = this.props.category
    return (
      <View className={classNames(styles.slider, 'skeleton-dark')}>
        <ScrollView scrollY className={styles.menuList}>
          {categories.map((menu, index) => (
            <View
              key={menu.Id}
              className={classNames(styles.menu, {
                [styles.active]: index == activeCategory,
              })}
              onClick={this.handleClick.bind(this, index)}
            >
              <Text className="skeleton-square">{menu.Name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}

export default CategorySlider
