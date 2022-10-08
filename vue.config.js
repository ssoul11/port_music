const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()]
      }),
      new SpeedMeasurePlugin(),
      // new BundleAnalyzerPlugin()

    ]
  },
  // chainWebpack: config => {
  //   const imagesRule = config.module.rule('images')
  //   imagesRule
  //     .use('image-webpack-loader')
  //     .loader('image-webpack-loader')
  //     .options({
  //       bypassOnDebug: true
  //     })
  //     .end()
  // },
  devServer: {
    // host: '127.0.1.222',
    // port: 2222,
    proxy: {
      '/api': {
        // target: 'https://autumnfish.cn',	//实际请求地址
        target: 'https://lianghj.top:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  }
})
