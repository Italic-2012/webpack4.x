/**
 * Created by hong.rong.
 * Description: 测试环境
 * Date: 2018/9/17
 * Time: 8:51
 *
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.base.config.js')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = merge(common, {
  output: { publicPath: '/' },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('uat')
    }),
    new ParallelUglifyPlugin({
      workerCount: 4, // 开启几个子进程去并发的执行压缩，默认是当前电脑的cpu数量减1
      uglifyJS: {
        output: {
          beautify: false, // 不需要格式化
          comments: false // 保留注释
        },
        compress: {
          warnings: false, // Uglifyjs 删除没有代码时，不输出警告
          drop_console: true, // 删除所有console语句
          collapse_vars: true,
          reduce_vars: true
        }
      }
    })
  ]
})
