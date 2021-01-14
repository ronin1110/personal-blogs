# 手写call/apply/bind



## 原生call

call()是一个指定的this值（上下文）和一个或者多个参数（参数列表）来调用一个函数，

function.call(this值，arg1，arg2，……)

## 手写call

```js
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
```







## 原生apply

apply函数接受指定this值（上下文）和一个数组或者类数组的参数（与call类似）

function.call(thisArg, [argArrays])



## 手写apply

```js
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
```





## 原生的bind

bind()方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

function.bind(thisArg, arg1, arg2, ...)

- `arg1, arg2, ...`：当目标函数被调用时，被预置入绑定函数的参数列表中的参数。



## 手写bind

```js
Function.prototype.myBind = function(thisArg, args1) {
  if(typeof this !== 'function') {
    return TypeError('error')
  }
  let that = this
  let result = function(args2) {
    return that.apply(this instanceof result ? this : thisArg, args1.concat(args2)) // 如果是通过 new 调用的，绑定 this 为实例对象
	// 否则普通函数形式绑定 context
  }
  // 解决原型指向问题
  let fnEmpty = function(){}
  fnEmpty.prototype = this.prototype
  result.prototype = new fnEmpty()
  return result
}
```



​		首先 获取到第一次传递的参数args1，此处要做截取处理，因为第一个参数是this。接下来声明一个函数bindFn，在该bindFn中获取了第二次传的参数args2，并且返回了that的执行。此处的that就是原函数，执行该原函数绑定原函数this的时候要注意判断。如果this是构造函数bindFn new出来的实例，那么此处的this一定是该实例本身。反之，则是bind方法传递的this(context)。最后再把两次获得的参数通过concat()连接起来传递进去，这样就实现了前3条。
最后一条：构造函数上的属性和方法，每个实例上都有。 此处通过一个中间函数Fn，来连接原型链。Fn的prototype等于this的prototype。Fn和this指向同一个原型对象。bindFn的prototype又等于Fn的实例。Fn的实例的__proto__又指向Fn的prototype。即bindFn的prototype指向和this的prototype一样，指向同一个原型对象。至此，就实现了自己的bind方法。