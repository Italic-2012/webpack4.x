/**
 * Created by hong.rong.
 * Description: dll打包
 * Date: 2018/9/17
 * Time: 8:50
 *
 */

const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: resolve('build/dll'),
    filename: '[name].dll.js',
    library: 'lib_[name]'// 全局变量名，其他模块会从此变量上获取里面模块
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'lib_[name]',
      path: path.resolve(__dirname, '..', 'build/dll', 'manifest.json'),
      context: __dirname
    })
  ]
}
