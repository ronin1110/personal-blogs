# 手写简易的Promise



## 代码

```js
/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-01-07 12:49:18
 * @LastEditors: yaolin
 */

 const PENDING = 'pending'
 const RESOLVED = 'resolve'
 const REJECTED = 'rejected'


function myPromise(fn) {
  
  const that = this
  that.status = PENDING
  that.value = null
  that.reason = null
  
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []

  function resolve(value) {
    if(that.status === PENDING) {
      that.status = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(value))
    }
  }

  function reject(reason) {
    if(that.status === PENDING) {
      that.status = REJECTED
      that.reason = reason
      that.rejectedCallbacks.map(cb => cb(reason))
    }
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(e)
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  
  if(that.status === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }

  if(that.status === RESOLVED) {
    onFulfilled(that.value)
  }

  if(that.status === RESOLVED) {
    onRejected(that.reason)
  }

  return that
}

// 实现的案例
const p = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1000);
  }, 1000);
});

p.then((res) => {
  console.log('结果：', res); // 结果：1000
}).then(() => {
  console.log('ronin'); // ronin
})


// myPromise {status: "pending", value: null, reason: null, resolvedCallbacks: Array(2), rejectedCallbacks: Array(2)}
// reason: null
// rejectedCallbacks: Array(2)
// 	0: undefined
// 	1: undefined
// 	length: 2
// 	__proto__: Array(0)
// resolvedCallbacks: Array(2)
// 	0: (res) => { console.log('结果：', res); // 结果：1000 }
// 	1: () => { console.log('ronin'); // jsliang }
// 	length: 2
// 	__proto__: Array(0)
// status: "resolved"
// value: 1000
// __proto__: Object
```

## 解释

1. 一个Promise有三种状态：pending；rejected；resolved (这里fulfilled 与resolved我感觉只是一个叫法的问题)
2. promise 的状态改变是不可变的，所以在 function resolve和reject函数中我们首先要做的就是验证promise的状态
3. 再到执行到.then的时候，会有两种情况，一种是在promise的函数中进行的是同步代码，就是状态的改变不是异步的，状态直接变成了resolved或者rejected，这时我们就直接执行代码就好了
4. 但是有第二种情况，在promsie中的是异步代码，就是状态改变可能在几秒之后，这时我们promise的状态还是pending，我们就需要把处理函数分别压入resolvedCallbacks 和 rejectedCallbacks，然后在resolve和reject函数中遍历执行函数（就是先把处理函数存起来了，知道函数执行到resolve或者reject的时候再执行，这一手即使防止promise里面异步操作的）



## Promise.all和Promise.race实现

```js
Promise.myAll = function (arr) {
  return new Promise((resolve, reject) => {
    const result = []
    let index = 0
    const length = arr.length
    
    for (let i = 0; i <length; i++) {
      arr[i].then(res => {
        result[i] = res
        index++
        if(index === length) {
          resolve(result)
        }
      }).catch(e => {
        throw new Error(e)
      })
    }
  })
}


Promise.myRace = function(arr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].then((res) => {
        return resolve(res);
      }).catch((err) => {
        throw new Error(err);
      })
    }
  })
};
```

