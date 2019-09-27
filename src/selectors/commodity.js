import { createSelector } from 'reselect'

export const hotSaleCommoditiesSelector = createSelector(
  state => state.home,
  ({ leftCommodities, rightCommodities }) => ({
    leftCommodities: leftCommodities.reduce(
      (result, item) => result.concat(item),
      [],
    ),
    rightCommodities: rightCommodities.reduce(
      (result, item) => result.concat(item),
      [],
    ),
  }),
)

export const categoryCommoditiesSelector = createSelector(
  category => category.commodities,
  commodities => ({
    commodities: commodities.reduce((result, item) => result.concat(item), []),
  }),
)
