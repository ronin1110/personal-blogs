/*
 * @Description: 入口文件
 * @Author: yaolin
 * @Date: 2021-01-18 04:35:23
 * @LastEditors: yaolin
 * 开发运行指令：webpack ./src/index.js -o ./build/built.js --mode=development
 */
import data from './data.json'
import './index.css'

function add (x, y) {
  return x + y
}
console.log(data)
alert(add(3,6))