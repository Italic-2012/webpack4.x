/**
 * Created by hong.rong.
 * Description: 生产环境
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
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ParallelUglifyPlugin({
      workerCount: 4,
      uglifyJS: {
        output: { beautify: false, comments: false },
        compress: { warnings: false, drop_console: true, collapse_vars: true, reduce_vars: true }
      }
    })
  ]
})
