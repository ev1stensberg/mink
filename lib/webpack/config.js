require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'title',
    description: 'description',
    head: {
      titleTemplate: 'head-title',
      meta: [
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'content'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  }

}, environment);
