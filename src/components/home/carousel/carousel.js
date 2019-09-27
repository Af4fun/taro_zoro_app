import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'

import { SKELETON_BANNER } from '../../../constants/skeleton'
import styles from './carousel.scss'

@connect(({ home }) => ({
  banners: home.banners,
}))
class ComponentHomeCarousel extends Component {
  static defaultProps = {
    banners: [],
  }

  state = {
    showBanners: SKELETON_BANNER,
    currentDotIndex: 0,
  }

  componentWillReceiveProps(nextProps) {
    const { banners } = nextProps
    this.resolveBanners(banners)
  }

  componentDidMount() {
    const { banners } = this.props
    this.resolveBanners(banners)
  }

  handleSwiperChange({ detail: { current } }) {
    const { banners } = this.props
    let currentDotIndex = current
    if (banners.length === 2) {
      currentDotIndex = current % 2
    }
    this.setState({ currentDotIndex })
  }

  resolveBanners = banners => {
    let showBanners = banners
    if (banners.length === 2) {
      showBanners = banners.concat(
        banners.map(banner => ({
          backup: true,
          ...banner,
        })),
      )
    }

    this.setState({ showBanners })
  }

  render() {
    const { banners } = this.props
    const { showBanners, currentDotIndex } = this.state
    const nextMargin = Taro.pxTransform(48)

    return (
      <View className={styles.carousel}>
        <Swiper
          className={styles.swiper}
          autoplay
          circular
          previousMargin={nextMargin}
          nextMargin={nextMargin}
          onChange={this.handleSwiperChange}
        >
          {showBanners.map((showBanner, index) => (
            <SwiperItem key={showBanner.Id} className={styles.swiperItem}>
              <Image
                className={classNames(styles.image, 'skeleton-square', {
                  [styles.active]:
                    showBanner.length == 2
                      ? currentDotIndex == index % 2
                      : currentDotIndex == index,
                })}
                lazyLoad
                src={showBanner.Image}
              />
            </SwiperItem>
          ))}
        </Swiper>
        {banners.length > 1 && (
          <View className={styles.dots}>
            {banners.map((banner, index) => (
              <View
                key={banner.bannerId}
                className={classNames(styles.dot, {
                  [styles.active]: currentDotIndex === index,
                })}
              />
            ))}
          </View>
        )}
      </View>
    )
  }
}

export default ComponentHomeCarousel
