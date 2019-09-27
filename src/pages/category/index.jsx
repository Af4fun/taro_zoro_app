import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'
import classNames from 'classnames'
import { categoryCommoditiesSelector } from '@/selectors/commodity'
import ComponentCommonSkeleton from '@components/common/skeleton/skeleton'
import CategorySlider from '@components/category/slider/slider'
import CategroySubMenus from '@components/category/submenus/submenus'
import CategoryCommodity from '@components/category/categoryCommodity/categoryCommodity'
import ComponentCommonLoading from '@components/common/loading/loading'
import styles from './index.scss'

@connect(({ category, loading }) => ({
  ...categoryCommoditiesSelector(category),
  noMore: category.noMore,
  topNum: category.topNum,
  initialize: !loading.init || loading.init['category/loadCategories'],
  loading: loading.effect['category/queryGoods'],
}))
class PageCategory extends Component {
  config = {
    navigationBarTitleText: '商品分类',
  }

  state = {
    // 请到README.md中查看此参数说明
    __TAB_PAGE__: true, // eslint-disable-line
  }
  componentDidMount() {
    dispatcher.category.loadCategories(undefined, {
      loadingKey: 'init',
      noAuth: true,
    })
  }
  handleLoadMore() {
    const { noMore } = this.props
    if (noMore) return
    dispatcher.category.queryGoods()
  }

  render() {
    const { initialize, commodities, loading, noMore, topNum } = this.props
    return (
      <View className={classNames(styles.categoryPage, 'skeleton')}>
        {initialize && <ComponentCommonSkeleton />}
        <CategorySlider />
        <View className={classNames(styles.mainContainer, 'skeleton-light')}>
          <CategroySubMenus />
          <View className={styles.goodsList}>
            <ScrollView
              scrollY
              scrollTop={topNum}
              className={styles.views}
              onScrollToLower={this.handleLoadMore.bind(this)}
            >
              {commodities.map(commodity => (
                <View className={styles.commodity} key={commodity.commodityId}>
                  <CategoryCommodity commodity={commodity} />
                </View>
              ))}
              <ComponentCommonLoading loading={loading} />
              {noMore && <View className={styles.noMore}>没有更多了。。</View>}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

export default PageCategory
