# 浏览器的Event Loop

对于浏览器事件循环的了解这段时间其实已经差不多了，怕自己之后又忘了，就准备写下来

## 是什么

event是什么呢？

**event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event Loop。**

## 宏队列与微队列

都说是队列了，当然是先进先出啦

### 宏队列

macro task queue  一些任务的回调会进入宏队列，例如

- setTimeout
- setInterval
- IO
- requestAnimationFrame(浏览器)
- UI rendering(浏览器)
- setImmediate(Node独有)

### 微队列

micro task queue 另一些异步任务的回调会进入这个队列

- Promise
- Object.observe
- MutationObserver
- process.nextTick(Node独有)

## 浏览器的Event Loop

![browser-eventloop](https://segmentfault.com/img/remote/1460000016278118)

网上的一张图

具体的js代码流程呢

1. 首先执行全局Script的同步代码（可以理解为Script也是一个宏任务），遇到同步语句我们就直接执行，遇到异步的代码，我们按照宏任务还是微任务（微任务就那么几个），分别压入宏队列还是微队列
2. 执行完毕后，这时，调用栈Stack会清空；
3. 从微队列中取出位于队首的任务，调入执行栈，执行完后，微队列的长度减一（也就是微任务处理完一个）
4. 继续取位于首部的任务，调入执行栈，直到清空微队列，（**如果我们在执行当次的微任务时，又遇到产生的微任务怎么办呢，会被加到这次微队列的队尾，会在这个周期内执行**）
5. 然后我们执行完所有的微队列的微任务的时候，这时微队列是空的，执行栈也是空的
6. 之后就是取出宏队列队首的宏任务，放入执行栈中执行，
7. 执行结束后，调用栈为空，但是微任务队列又有了新的任务
8. 重复3-7个步骤
9. 重复3-7个步骤
10. 重复3-7个步骤
11. ……

**总结下其实就是：**

- 宏队列中取出队首任务进入执行栈，执行结束后，有些任务会被加到微队列，就去取微队列中的任务进入执行队列执行，直到微队列为空，执行栈为空，我们就会再去调用宏队列中的任务
- 微队列依次执行，直到微队列为空
- UI rendering 执行节点会在微队列为空之后，紧跟着UI rendering ,下一个macro task 之前，紧跟着UI rendering

**其实浏览器Event Loop就这么些东西**

## 题目

还是加个题目好，不然到时候又忘了



```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);
```



首先这是一段script代码，我们一条一条来看

1. 首先我们遇到console.log() 这时同步代码没得说，直接放进执行栈执行  **// 输出1**
2. 然后我们就遇到了setTimeout()，宏任务的异步代码，我们放入宏任务队列，具体代码看都别看
3. 接着我们遇到了new Promise,  Promise中的执行会在new之后立即执行，所以我们 **// 输出4**，同时Promise状态置为fulfilled 传的是5 ,但是then之后的是微任务，我们直接把then后面的操作放入微队列，
4. 接着我们又遇到了了setTimeout,也直接放入宏队列
5. 然后遇到console.log(7) **// 输出7** 没的说
6. 然后这一遍我们执行完了所有执行队列中的操作，接着就该执行微队列了，我们从微队列头部取出一个到执行栈，
7. 是前面Promise的then（），我们就执行其中的代码，**// 输出5**
8. 执行完后我们发现，微队列空了，
9. 我们就把宏队列中的头部宏任务丢进执行栈，是第一个setTimeout，我们**// 输出2** 然后我们遇到了Promise的then（）是个微任务，我们按照之前说的，把它放入当前微任务的后面，当前微任务为空，所以**// 输出2**之后会直接**// 输出3**
10. 接着下一个宏任务，没得说，**// 输出6*

输出顺序就是

```js
// 正确答案
1
4
7
5
2
3
6
```

