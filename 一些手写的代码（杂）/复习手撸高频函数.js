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

// 手写Promise
function myPromise(executor) {
  let self = this
  this.status = 'pending'
  let resolveCallbacks = []
  let rejectCallbacks = []

  function resolve(value) {
    if(self.status === 'pending') {
      // console.log(this, 'resolve')
      self.value = value
      self.status = 'resolved'
      resolveCallbacks.forEach((fn) => {
        fn(value)
      })
    }
  }
  
  function reject(reason) {
    if(self.status === 'pending') {
      // console.log(this, 'reject')
      self.value = reason
      self.status = 'rejected'
      rejectCallbacks.forEach((fn) => {
        fn(value)
      })
    }
  }

  executor(resolve, reject)
}

myPromise.prototype.then = function(onFulfilled, onRejected) {
  let self = this
  if(self.status === 'pending') {
    self.resolveCallbacks.push(onFulfilled)
    self.rejectCallbacks.push(onRejected)
  }
  if(self.status === 'resolved') {
    onFulfilled(self.value)
  }
  if(self.status === 'rejected') {
    onRejected(self.value)
  }
}

// 数组去重
let arr = [1,2,3,45,56,77,77,8,7,7,3]
// let newArr1 = [...new Set(arr)]

// let newArr2 = []
// arr.forEach((item, index) => {
//   if(arr.indexOf(item) === index) {
//     newArr2.push(item)
//   }
// })
// let newArr4 = []
// arr = arr.sort()
// for(let index = i; index<arr.length; index++) {
//   if(arr[index] !== arr[index - 1]) {
//     newArr4.push[arr[index]]
//   }
// }

// 实现sleep
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout( function() {
      resolve(time)
    }, sleep)
  }) 
}
sleep().then(time => {
 console.log(time)
}
  
)