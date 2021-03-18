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
      cloneObj[key] = clone(obj[key], map)
    }
    return cloneObj
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
      self.value = value
      self.status = 'resolved'
      resolveCallbacks.forEach(fn => {
        fn(value)
      })
    }

  }
  function reject(reason) {
    if(self.status === 'pending') {
      self.value = reason
      self.status = 'rejected'
      rejectCallbacks.forEach(fn => {
        fn(value)
      })
    }

  }
  executor(resolve, reject)
}
myPromise.prototype.then = function(onFulfilled, onRejected) {
  let self = this
  if(self.status === 'resolved') {
    onFulfilled(self.value)
  }
  if(self.status === 'rejected') {
    onRejected(self.value)
  }
  if(self.status === 'pending') {
    self.resolveCallbacks.push(onFulfilled)
    self.rejectCallbacks.push(onRejected)
  }
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
        fn(self.value)
      })
    }
  }
  
  function reject(reason) {
    if(self.status === 'pending') {
      // console.log(this, 'reject')
      self.value = reason
      self.status = 'rejected'
      rejectCallbacks.forEach((fn) => {
        fn(self.value)
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

// js中的继承
function Animal(name) {
  this.name = name
  this.sleep = function() {
    console.log(this.name + 'sleep');
  }
}
Animal.prototype.eat = function() {
  console.log(this.name + 'eat something')
}

//原型链继承 父级的实例作为子级的原型对象 
function Cat() {
  this.prototype = new Animal()
  this.name = 'cat'
}

// 构造函数继承
function Dog() {
  Animal.call(this)
  this.name= name || 'dog'
}

// 组合继承
function Pig() {

  Animal.call(this)
  this.name = 'pig'

  this.prototype = new Animal()
  this.prototype.constructor = this
}


// 防抖
function debounce(fn, time) {
  let timeout = null;
  return function() {
    let _this = this
    clearTimeout(timeout)
    let args = arguments
    timeout = setTimeout(() => {
      fn.apply(_this, args)
    }, time)
  }
}

// 节流
function throttle(fn, time) {
  let timeout
  return function() {
    let _this = this
    let args = arguments
    if(timeout) {
      return 
    } else{
      timeout = setTimeout(()=>{
        fn.apply(_this, args)
        timeout = null
      }, time)
    }
  }
}

// 数组扁平化
let res = []
function myFlat(target) {
  target.forEach((item ,index) =>{
    if ( Array.isArray(item) ) {
      myFlat(item)
    } else {
      res.push(item)
    }
  })
}
// 或者es6的flat函数
res = res.flat(Infinity)



// 实现一个eventEmiter类 包括on()，off()，once(),emit()方法
// 1、on(event,fn)：监听event事件，事件触发时调用fn函数；
// 2、once(event,fn)：为指定事件注册一个单次监听器，单次监听器最多只触发一次，触发后立即解除监听器；
// 3、emit(event,arg1,arg2,arg3...)：触发event事件，并把参数arg1,arg2,arg3....传给事件处理函数；
// 4、off(event,fn)：停止监听某个事件。

class EventEmitter{
  constructor() {
    this._events = {}
  }

  on(event, callback) {
    let callbacks = this._events[event] || []
    callbacks.push(callback)
    this._events[event] = callbacks
    return this
  }

  off(event, callback) {
    let callbacks = this._events[event]
    this._events[event] = callbacks && callbacks.filter(fn => fn !== callback)
    return this
  }

  emit(...args) {
    const event = args[0]
    const params = [].slice.call(args, 1)
    const callbacks = this._events[event]
    callbacks.forEach(fn => fn.apply(this.params))
    return this
  }

  once(event, callback){
    let wrapFanc = (...args) => {
      callback.apply(this.args)
      this.off(event, wrapFanc)
    }
    this.on(event, wrapFanc)
    return this
  }

}

// 原型继承
function Person (name) {
  this.name = name || 'ququuq'
  this.getName = function() {
    console.log(this.name)
  }
}
let person = new Person('姚霖')
let me = Object.create(person)

me.getName()


//es5去重
let arr = [3, 6, 4, 6, 7, 6, 5, 4, 1]
let res = []
arr.forEach((item, index) => {
  if (index === arr.indexOf(item)) {
    res.push(item)
  }
})
console.log(res)
// es6去重 Set
let arr = [3, 6, 4, 6, 7, 6, 5, 4, 1]
let res = Array.from(new Set(arr))
console.log(res);


// es5的数组扁平化
let test = [1, 2, 3, 4, [5, 6, [7, 8]]]
let res = []
function myFlat(arr) {
  if (Array.isArray(arr)) {
    arr.forEach(item => {
      myFlat(item)
    })
  } else {
    res.push(arr)
  }
}
myFlat(test)
console.log(res);

// es6扁平化
let test = [1, 2, 3, 4, [5, 6, [7, 8]]]
let res = test.flat(Infinity)

// 冒泡排序 
let arr = [1,4,2,3,4,5,76,8,7,4,3,2,6,8]
function sortBob(arr) {

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if(arr[i] < arr[j]) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

// 选择排序
let arr = [1,4,2,3,4,5,76,8,7,4,3,2,6,8]
function sortSelect(arr) {
  let res = []

  while(arr.length != 0) {
    let max = arr[0]
    let index = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= max) {
        max = arr[i]
        index = i
      }
      // console.log(index);
    }
    arr.splice(index, 1)
    // console.log(arr.length);
    res.push(max)
  }
  return res
}
sortSelect(arr)

// 插入排序
let arr = [1,4,2,3,4,5,76,8,7,4,3,2,6,8]
function sortInsert(arr) {

}
sortInsert(arr)

// 快排
let arr = [1,4,2,3,4,5,76,8,7,4,3,2,6,8]
function sortFast(arr) {
  if(arr.length <=1) {
    return arr
  } else {
    let right = []
    let left = []
    let temp = arr.splice(0, 1)
    for (let i = 0; i < arr.length; i++) {
      if(arr[i] > temp) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    // console.log(left.concat(right));
    return sortFast(left).concat(temp, sortFast(right))
  }
}
sortFast(arr)


let myAjax= {
  get:function(url) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest
      xhr.open('GET', url, true)
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if(xhr.status === 200 || xhr.status === 304) {
            console.log(xhr.responseText);
            resolve(xhr.responseText)
          }
        }
      }
      xhr.send()
    })
  }.then(res => {
    console.log(res);
  }),
  post:function(url,data) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if(xhr.status === 200 || xhr.status === 304) {
            console.log('post:',xhr.responseText);
            resolve(xhr.responseText)
          }
        }
      }
      xhr.send(data)
    })
  }.then(res => {
    console.log(res);
  })

}

// 柯里化
function curry(...args1) {
  let args = Array.from(args1)

  let fn = function(...args2) {
    return curry.apply(null, args.concat(Array.from(args2)))
  }
  fn.toString = function() {
    let res = 0
    args.forEach(item => {
      res += item
    })
    return res
  }
  
  return fn
}


// 防抖
function debounce(fn, delay) {
  let timer = null

  return function() {
    if(timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(fn, delay)
  }
}

// 节流 
// function throttle(fn, time) {
//   // let time = new Date()
//   let first = true
//   let start = ''
//   return function() {

//     if(first) {
//       start = new Date()
//       first = false
//     }
//     if(new Date() - start >time) {
//       fn()
//       console.log(new Date() - start);
//       first = true
//     }
//   }
// }
// 方法2
function throttle(fn, time) {
  // let time = new Date()
  let timer
  return function() {
    if(timer) {
      return
    } else {
      timer = setTimeout(() => {
        fn()
        timer =null
      }, time)
    }
  }
}
function handle() {    
  console.log(Math.random())
}
// 滚动事件
window.addEventListener('scroll', throttle(handle, 1000));

// 数组扁平化
let res =[]
function flat(arr) {
  if(Array.isArray(arr)) {
    arr.forEach(item => {
      flat(item)
    })
  } else {
    res.push(arr)
  }
}
let test = [1,2,3,4, [4,3,[4,5,6],4,5]]
flat(test)


// 去重
let test = [1,1,1,1,1,1,2,3,4,5,5,5,5]
function unique (arr) {
  // return Array.from(new Set(arr)) 使用Set

  // let map = new Map  // map存
  // let res = []
  // arr.forEach((item, index) => {
  //   if(!map.has(item)) {
  //     map.set(item , true)
  //     res.push(item)
  //   }
  // })
  // return res


  let res =[]
  arr.forEach((item, index) => {
    if(arr.indexOf(item) === index) {
      res.push(item)
    }
  })
  return res
}
unique(test)


// 深拷贝 
function deepCopy(obj, map= new Map) {
  let res = Array.isArray(obj) ? [] : {}

  if(obj instanceof Object) {
    if (map.get(obj)) {
      return map.get(obj)
    } else {

      map.set(obj, res)
      for(let key in obj) {
        res[key] = deepCopy(obj[key], map)
      }
    }
  } else {
    res = obj
  }
  return res
}
let a = {
  i: 4,
  j:5
}
let b =deepCopy(a)
b.i = 999
console.log(a);

// 发布订阅模式

class myEvent {

  constructor() {
    this.events = {}
  }
  on(eventName, callback) {
    if(!this.events[eventName]) {
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }

  emit(eventName, ...rest) {
    this.events[eventName] && 
    this.events[eventName].forEach(callback => {
      callback.apply(this, rest)
    })
  }
}

let myE = new myEvent
function fn(...args) {
  console.log(...args);
}
function fn2(...args) {
  console.log('woiewpo');
}
myE.on('click', fn)
myE.on('click', fn2)
myE.emit('click', 1,2,3,4,5,6)



// es5实现继承
function Parent(name) {
  this.type = 'parent'
  this.name = name
}
Parent.prototype.say = function() {
  console.log(this.name);
}

function Child(name) {
  this.name = name
  Parent.call(this, name)
}
// 原型连继承
// Child.prototype = new Parent()
// let c1 =new Child('yaolin')

// 实现instanceof
function myInstanceof(obj, con) {
  let tempObj = obj
  while(tempObj.__proto__) {
    if(con.prototype == tempObj.__proto__) {
      return true
    } else {
      tempObj=tempObj.__proto__
    }
  }
  return false
}


// call
function myCall(context = window, ...args) { 
  const handle = Symbol('879')
  context[handle] = this

  let res = context[handle](...args)
  delete context[handle]
  return res
}
//  apply
function myApply(context = window, args) { 
  const handle = Symbol('879')
  context[handle] = this

  let res = context[handle](...args)
  delete context[handle]
  return res
}

// bind
function myBind(context = window, ...args1) {
  let _this = this
  return function(...args2) {
    _this.apply(context, args1.concat(args2))
  }
}
// new 
function myNew (constructor, ...args) {
  let obj = Object.create(new constructor)
  let res = constructor.apply(obj, args)
	//如果构造函数没有返回一个对象,则返回新创建的对象
	//如果构造函数返回了一个对象,则返回那个对象
	//如果构造函数返回原始值,则当作没有返回对象
  return typeof res === 'object' ? res : obj
  
}

// 封装ajax
function myAjax(){
  this.get = function(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest
      xhr.open('GET', url, true)
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText)
          }

        }
      }
      xhr.send()
    }).then((res) => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  }
  this.post = function(url,data) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText)
          }
        }
      }
      xhr.send(data)
    }).then((res) => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  }
}

