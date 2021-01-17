/*
 * @Description: webpack配置文件 只是webpack工作 项目配置模块用common.js
 * @Author: yaolin
 * @Date: 2021-01-18 05:24:26
 * @LastEditors: yaolin
 */
const path = require('path')
// const webpack = require('webpack')

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'main.js',
    // __dirname 当前文件坐在目录绝对路
    path: path.join(__dirname,'build')
  },
  // loader
  module: {
    rules: [
      {
        //匹配那些文件
        test: /\.css$/,
        //用哪些loader处理
        use:[
          // 从下往上
          // 创建style标签，将js中的样式资源插入，添加在head中生效，
          'style-loader',
          // 将css文件资源变成commonjs模块加载到js中，内容是样式字符串，
          'css-loader'
        ]
      },
      {
        //匹配那些文件
        test: /\.less$/,
        //用哪些loader处理
        use:[
          // 从下往上 less->css->style
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },

    ]
  },
  // plugins配置
  plugins:[
    
  ],
  // 模式
  mode: 'development', // 开发模式
  // mode: 'procuction'
}