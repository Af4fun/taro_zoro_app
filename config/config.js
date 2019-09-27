module.exports = {
  server: {
    dev: 'https://tsapi.guodaxia.cn/xktmall/Mall',
    prod: 'https://prodapiserver',
  },
  // 阿里云oss插件配置
  oss: {
    dev: {
      accessKeyId: '************',
      accessKeySecret: '***************',
      endpoint: 'https://************.aliyuncs.com',
      region: '*************',
      bucket: '*********',
    },
    prod: {
      accessKeyId: '************',
      accessKeySecret: '***************',
      endpoint: 'https://************.aliyuncs.com',
      region: '*************',
      bucket: '*********',
    },
    path: 'src/assets/',
    prefix: '@oss',
    formats: ['png', 'jpeg', 'jpg', 'svg'],
  },
  debug: false,
}
