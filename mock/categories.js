const faker = require('faker/locale/zh_CN')
function createitem(){
    let id = faker.random.uuid()
    let name = faker.commerce.product()
    let children = []
    let num = faker.random.number({
        min: 0,
        max: 8
    })
    for (let i = 0; i < num; i++) {
        children.push({
            id: 'sub' + faker.random.uuid(),
            name: faker.random.words(1)
        })
    }
    return {
        id,
        name,
        children
    }
}

function generatorList(num){
  const list = []

  for (let i = 0; i < num; i++) {
    list.push(createitem())
  }

  return list
}

function getCategioryList(req, res){
    let categories = generatorList(15)
    res.status(200).json({
        code: 'success',
        message: '获取分类列表成功',
        categories: categories,
    })
}

module.exports = {
'GET /v1/category/list': getCategioryList,
}
  