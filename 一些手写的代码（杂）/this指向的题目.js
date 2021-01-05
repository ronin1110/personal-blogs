/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-01-05 17:47:59
 * @LastEditors: yaolin
 */
var name = 'window name'
function a() {
    var name = 'ronin'
    console.log(this.name);
    console.log('inner: ' + this)
}
a() // 这里的a()可以理解为 window.a(),所以this指向的window
console.log('outer: ' + this)

// 输出：
// window name 
// inner: [Object window]
// outer: [Object window]
// 


var name = 'window name'
var a = {
    name: 'ronin',
    fn: function() {
      console.log(this.name)
    }
}
a.fn() // 这里的fn的调用山下文是a 所以输出的是a.name
// 输出 
// ronin 



var name = 'window name'
var a = {
    // name: 'ronin',
    fn: function() {
      console.log(this.name)
    }
}
a.fn() // 这里的fn的调用山下文是a 所以输出的是a.name a没有定义name 所以undefined
// 输出 
// undefined




var name = 'window name'
var a = {
    name: 'ronin',
    fn: function() {
      console.log(this.name)
    }
}
var f = a.fn // 这里只是在赋值 没有执行
f() // 这里的fn的调用山下文是window 所以输出的是window.name
// 输出 
// window name



var name = 'window name';
function fn() {
  var name = 'ronin';
  function innerFn() {
    console.log(this.name);
  };
  innerFn();
}
fn(); // 这里执行fn()之后，会运行到innerFn()，这里为什么this指定的上下文是window
// 呢?可以总结为,函数的执行若没有明确指定调用对象,都会默认绑定到全局
// 输出：
// window name




// 经典例子:
let userInfo = {
  name: 'ronin',
  age: 22,
  sex: 'male',
  updateInfo: function() {
    setTimeout(function() {
      this.name = '7777',
      this.age = 20,
      this.sex = 'female'
    }, 1000)
  }
}
userInfo.updateInfo();
// 在这里 是会发生错误的，因为setTimeout()里面的this的指向是window，更改的就是window的数据，我们需要
// 使this的指向指向uerInfo 可以通过箭头函数
// setTimeout(() => {...}),
// 或者可以在
// setTimeout(function() {
//   this.name = '7777',
//   this.age = 20,
//   this.sex = 'female'
// }.call(this), 1000)
// 也就是在函数的后面call重新绑定上下文