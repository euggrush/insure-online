const path = require('path')
module.exports = {chainWebpack: config => {
  config.module.rules.delete('eslint');
},
  // publicPath: '/insure-online/',
  pluginOptions: {
    'style-resources-loader': {
      'preProcessor': 'scss',
      'patterns': [
        path.resolve(__dirname, './src/styles/_variables.scss'),
        path.resolve(__dirname, './src/styles/_breakpoints.scss')
      ]
    }
  }
}