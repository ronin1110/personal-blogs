/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-01-14 21:18:23
 * @LastEditors: yaolin
 */
Function.prototype.myCall = function (thisArg, ...args) {
  if(typeof this !== 'function') {
    return new TypeError('error')
  } // 判断调用的对象是不是函数，不是的话就返回个error
  // const fn = Symbol ('fn') // 声明一个独有的symbol属性，防止覆盖原本就有个fn函数
  thisArg = thisArg || window // 如果没有传入上下文 默认是全局的window
  thisArg.fn = this // this指向call的对象
  const result = thisArg.fn(...args) // 执行函数
  delete thisArg.fn // 删除fn属性
  return result // 返回结果
}


// 和call差不多
Function.prototype.myApply = function(thisArg, args) {
  if(typeof this !== 'function') {
    return TypeError('error')
  }
  
  thisArg = thisArg || window
  thisArg.fn = this
  let result = thisArg.fn(args)
  delete thisArg.fn
  return result
}

// bind
Function.prototype.myBind = function(thisArg, args1) {
  if(typeof this !== 'function') {
    return TypeError('error')
  }
  // thisArg = thisArg || window
  let that = this
  
  let result = function(args2) {
    return that.apply(this instanceof result ? this : thisArg, args1.concat(args2))
  }
  // 解决原型指向问题
  let fnEmpty = function(){}
  fnEmpty.prototype = this.prototype
  result.prototype = new fnEmpty()
  return result
}