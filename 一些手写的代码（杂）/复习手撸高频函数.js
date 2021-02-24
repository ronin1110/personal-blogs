/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-02-23 11:39:33
 * @LastEditors: yaolin
 */

//  实现new
 function myNew(constructor, ...args) {
   let obj = Object.create(constructor.prototype) // 以某个对象作为原型初始化一个对象
   // 或者
  //  let obj ={}
  //  obj.__proto__ = constructor.prototype
   let res = constructor.apply(obj, args)

   return typeof(res) == 'object' ? res : obj
 }

 // 函数柯里化
 function add() {
   let args = [].slice.call(arguments)

   let fn = function() {
     let fn_args = [].slice.call(arguments)
     return add.apply(null, args.concat(fn_args)) //收集信息
   }
   fn.toString = function() { // 由于隐式转换的特性，执行到最后，会执行这一段
     // 收集到所有的参数后进行统一的计算， 
     let res = 0
     args.forEach((el, index) => {
       res += el
     })
     return res
   }
   return fn
 }

 // 深拷贝
function clone(obj, map = new Map) { // map用于防止循环引用， 
  if(typeof obj === 'object') {
    let cloneObj = Array.isArray(obj) ? {} : []
    if(map.get(obj)) {
      return map.get(obj)
    }
    map.set(obj, cloneObj)
    for(let key in obj) {
      obj[key] = clone(obj[key], map)
    }
  } else {
    return obj
  }
}
 

// 手写call 

Function.prototype.myCall = function(context = window, ...args) {
  // let context = context || window
  context.fn = this
  let res = context.fn(...args)
  delete context.fn
  return res
}

// 手写apply
Function.prototype.myApply = function(context = window, args) {
  context.fn = this
  let res = context.fn(args)
  delete context.fn
  return res
}
// 手写bind
Function.prototype.myBind = function(context = window, ...args1) {
  let _this = this
  return function(...args2) {
    return _this.call(context, ...args1.concat(...args2))
  }
}
// new 
function myNew(constructor, ...args) {
  let obj = Object.create(constructor.prototype)
  let res = constructor.call(obj, ...args)
  return typeof(res) === 'object' ? res : obj
}