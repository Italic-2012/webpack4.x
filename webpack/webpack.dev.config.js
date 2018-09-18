/**
 * Created by hong.rong.
 * Description: 开发环境
 * Date: 2018/9/17
 * Time: 8:50
 *
 */

const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.base.config.js')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = merge(common, {
  output: { publicPath: '/' },
  devtool: 'eval-source-map', // 指定加source-map的方式
  watch: true,
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'build'),
    port: 4040,
    host: 'localhost',
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true, // 服务器返回浏览器的时候是否启动gzip压缩
    hot: true, // 热加载
    open: true,
    inline: true, // 打包后加入一个websocket客户端
    overlay: true
  },
  watchOptions: {
    ignored: /node_modules/, // 忽略不用监听变更的目录
    aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000 // 每秒询问的文件变更的次数
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    }),
	new HardSourceWebpackPlugin()
  ]
})