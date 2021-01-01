# 关于Promise和async，await

首先说在开始，两者都是为了实现异步操作，只是在一些写法上还有表现上不一样，async和await是队promise的进一步的优化



## async，await的优点

1. 方便奶奶级联调用，即调用依次发生的场景；
2. 同步代码的编写方式，Promise用到的是通过.then()函数链式调用，横向写法，这样写结构容易理解，async/await则是同步编写的方式，顺序编写，
3. 多个参数传递方便，Promise当然可以通过封装成对象来实现多参数的传递，不过相比于async/await来说，后者可以通过let const来定义变量
4. 基于协程：promise是基于函数思想，把异步的过程封装起来，返回异步操作的结果，async/await则是协程的机制，是真正的“保存上下文，控制权切换……控制权恢复，取回上下文”这种机制，是对异步过程更精确的一种描述；





## async关键字

1. 表明程序里面可能有异步过程：async表明里面可能有异步过程，也就是有await，当然也可以都是同步代码，当然这样async就没有意义
2. 非阻塞：async函数式非阻塞的，也就是说async函数执行后，会立即返回，不会阻塞主线程，我理解的是async函数虽然在主线程中，但是内部的异步工作在其他协程上，不会阻塞主线程，
3. async的返回值是个Promise对象：
   1.return new Promise();复合本意
   2.return data是个同步函数的写法，async会把data变成Promise.resolve(data),也就是async会默认把返回值转换成promise对象，需要通过.then()函数才能获取到data
   3.如果没有返回值，就会返回Promise.resolve(undefined)
4. await不处理异步error：在async函数中的await是不处理promise对象error对象的，async函数会返回一个promise，这个promise的catch会处理错误（什么意思呢，就是error会在async的catch函数中处理，内部不处理）
5. async函数的执行与不同函数没有不同，函数名加个括号就行，然后函数的返回值中可以调用then函数处理数据，catch函数处理错误

## await关键字

1. await只能在async中存在，不能在普通函数中
2. await 后面跟一个promise对象，（本质上是个运算符，得到一个结果，如果返回的是一个promise，就会执行promise的then函数得到结果数据）
3. await 等待的是 后面跟着的promise.resolve（data）的结果
4. await对于error消息的处理：await只关心后面promise的resolve()的结果，对于reject()不做处理，可以直接后面的promise对象自己定义catch来处理，也可以像我上面说的那样，在async函数return promise之后，定义async函数的catch处理子await中的error
5. await对于结果处理：是个运算符，作用就是如果await后面的是个数据，就返回数据，如果是promise对象，await就会阻塞后面的代码，直到promise执行完resolve()函数，得到数据结果，才会返回这个数据，这里的阻塞 并不会造成主线程的阻塞，因为是异步中的，这也是为什么await得在async函数中，





## 代码分析

一

```js
// 封装 异步过程
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('sleep for ' + ms + 'ms');
        }, ms)
    })
}

// 异步流程
async function asyncFunction() {
    console.time('asyncFunction total executing:')
    const sleep1 = await sleep(2000);
    console.log('sleep1:' + sleep1)
    
    const [sleep2, sleep3, sleep4] = await Promise.all([sleep(2000), sleep(1000), sleep(1500)])
    console.log('sleep2:' + sleep2)
    console.log('sleep3:' + sleep3)
    console.log('sleep4:' + sleep4)
    
    const sleepRace = await Promise.race([sleep(3000), sleep(1000), sleep(1000)])
    console.log('sleepRace: ' + sleepRace)
    console.timeEnd('asyncFunction total executing:');
    
    return 'asyncFunction finished'
}

asyncFunction().then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
});

console.log('lalalla')  // 这里会先执行 就可以看出async函数的进入执行后会立即返回，不会阻塞主线程


// 结果：
// lalalla
// undefined
// VM1148:14 sleep1:sleep for 2000ms
// VM1148:17 sleep2:sleep for 2000ms
// VM1148:18 sleep3:sleep for 1000ms
// VM1148:19 sleep4:sleep for 1500ms
// VM1148:22 sleepRace: sleep for 1000ms
// VM1148:23 asyncFunction total executing:: 5004.550048828125 ms
// VM1148:29 asyncFunction finished
```



二

```js
/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-01-02 01:28:21
 * @LastEditors: yaolin
 */
function takeLongTime(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ms + 200), ms
    })
  })
}

function step1(ms) {
  console.log('step1: ' + ms);
  return takeLongTime(ms)
}

function step2(ms) {
  console.log('step2: ' + ms);
  return takeLongTime(ms)
}

function step3(ms) {
  console.log('step3: ' + ms);
  return takeLongTime(ms)
}

 // Promise写法，真的长

// function doIt() {
//   console.time('start');
//   const time1 = 300;
//   step1(time1)
//     .then(time2 => step2(time2))
//       .then(time3 => step3(time3))
//         .then(result => {
//           console.log('result: ' + result);
//           console.timeEnd('start')
//         })
// }
// doIt()

// 结果：
// step1: 300
// undefined
// VM1170:21 step2: 500
// VM1170:26 step3: 700
// VM1170:37 result: 900
// VM1170:38 start: 43818.161865234375 ms


// async/await写法  结果是一样的
async function doIt() {
  console.time('doIt')
  const time1 = 300;
  const time2 = await step1(time1)
  const time3 = await step2(time2)
  const result = await step3(time3);

  console.log('result: '+ result);
  console.timeEnd('doIt')

}
doIt()
 
```

