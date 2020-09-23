'use strict'
const path = require('path')
const merge = require('webpack-merge')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './', // base url
  outputDir: 'dist', // build outputDir
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  // webpack相关配置
  // 链式操作
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 设置svn的加载
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // 为了补删除换行而加的配置
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    // base64相关代码
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        return merge(options, {
          limit: 1
        })
      })
      .end()
    // 如果是在开发环境下 则开启map 方便调试
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
    // runtime.js不做单独的拆包处理，直接内联到index.html中
    config
      .when(process.env.NODE_ENV !== 'development', config => {
        config.plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [{
            // 'runtime'必须与runtimechunk命名是一样的 默认为runtime
            inline: /runtime\..*\.js$/
          }])
          .end()
        config
          .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // 仅打包最初依赖的第三方
              },
              elementUI: {
                name: 'chunk-elementUI', // 单独拆分出elementui的包
                priority: 20, // 权重必须大于libs 和app 不然会被打包城libs 或者是app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应cnpm
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/comments'),
                minChunks: 3, // 最小引用次数
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })
        config.optimization.runtimeChunk('single')
      })
  },
  // 基础配置
  configureWebpack: config => {
    Object.assign(config, {
      // 开发共同配置
      resolve: {
        extensions: ['.js', '.json', '.css', '.vue'],
        // 别名配置
        alias: {
          '@': path.join(__dirname, 'src'),
          '@c': path.join(__dirname, 'src/components'),
          '@v': path.join(__dirname, 'src/views'),
          '@s': path.join(__dirname, 'src/assets'),
          '@img': path.join(__dirname, 'public/images'),
          'api': path.join(__dirname, 'src/api/wallet')
        }
      }
    })
  },
  // 是否在生产环境恒产sourceMap
  productionSourceMap: false,
  // css相关配置
  css: {
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      // sass: {
      //   data: `@import "~@/styles/reset.scss";`
      // }
    }, // css预设器配置项
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  devServer: {
    // open: process.platform === 'darwin',
    hot: true, // 热加载
    host: '0.0.0.0', // 允许外部ip访问
    port: 8084, // 端口
    https: false, // 是否启动https
    // 报错在页面弹出
    overlay: {
      errors: true
    }
  },
  // 第三方插件配置
  pluginOptions: {}

}
