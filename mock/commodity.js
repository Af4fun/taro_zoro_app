const faker = require('faker')

function createCommodity() {
  return {
    commodityId: faker.random.uuid(),
    commodityName: faker.random.words(1),
    commodityImage: faker.image.food(),
    brandId: faker.random.uuid(),
    brandName: faker.name.findName(),
    costPrice: `${faker.commerce.price(1, 100)}`,
    salePrice: `${faker.commerce.price(1, 50)}`,
  }
}

function createHotSaleCommodities(num) {
  const commodities = []

  for (let i = 0; i < num; i++) {
    commodities.push(createCommodity())
  }

  return commodities
}

let commodities = []
let searchBy;
function getHotSaleCommodityList(req, res) {
  const { pos, count, categoryId } = req.query
  /// 查询id变化 重新生成
  if(categoryId!=searchBy){
    commodities = createHotSaleCommodities(60)
  } else {
    if (commodities.length <= 0) {
      commodities = createHotSaleCommodities(60)
    }
  }

  const pageSize = parseInt(count)
  const current = parseInt(pos)
  const pageData = commodities.slice(
    pageSize * (current - 1),
    pageSize * (current - 1) + pageSize,
  )

  res.status(200).json({
    code: 'success',
    message: '获取热卖商品列表',
    commodities: pageData,
  })
}

module.exports = {
  'GET /v1/commodity/hotSaleList': getHotSaleCommodityList,
}
