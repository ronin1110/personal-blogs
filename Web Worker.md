# Web Worker

Web Worker是web内容在后台线程中运行脚本的一种简单的方法。

应为js的单线程的，所以无法同时运行两个js脚本，但是试想一下，如果我们可以同时运行多个js脚本，一个 用来处理UI界面，一个用来处理复杂计算，那么性能就会起飞。

所以在es5中，用Web Worker 来实现了js的多线程技术，说到底，Web Worker就是在运行js线程中加载运行另一个或多个js线程。

*值得注意的是js本质上还是单线程的，Web Worker只是浏览器给予的Api，要多线程也是浏览器多线程*



## 使用

```js
// index.js
console.log('index-同步任务')
Promise.resolve().then(res => {
    console.log('index-Promise')
})
setTimeout(() => {
    console.log('index-setTimeout')
}.1000)
```

```html
// index.html
<script>
	window.onload = function() {
        console.log('本地-同步任务')
        Promise.resolve().then(res => {
            console.log('本地-微任务1')
        })
        const worker1 = new Worker(./index.js)
        Promise.resolve().then(res => {
            console.log(本地-微任务2)
        })
        
        setTimeout(() => {
            console.log('本地-宏任务1')
        }，1000)
        const worker2 =new Worker(./index.js)
        setTimeout(() => {
            console.log('本地-宏任务2')
        }，1000)
    }
</script>
```

执行后：

```js
// 本地-同步任务
// 本地-微任务 1
// 本地-微任务 2
// index-同步任务
// index-Promise
// index-同步任务
// index-Promise
// 本地-宏任务 1
// 本地-宏任务 2
// index-setTimeout
// index-setTimeout
```



1. 先执行了script中的同步任务
2. 再执行 script 中的微任务
3. 然后执行UI线程中的渲染工作 （）
4. 接下来才是Web Worker中的内容宏任务加到宏任务队列的后边，微任务执行完
5. 再来是index.html中的宏任务
6. 最后才是Web Worker文件中的宏任务

**自己理解下就是，先运行script中的同步代码，宏任务进宏任务队列，微任务进微任务队列，然后遇到的Web Worker，先不管，当我们执行完微任务队列中的任务的时候，再去执行Web Worker中的代码，然后来到Web Worker中，一样，执行同步代码，微任务进微任务队列，宏任务进宏任务队列，接着执行微任务队列，清空微任务队列后，进入下个宏任务。**



## 数据通讯

```js
// index.js
onmessage = (res) => {
    // Worker 接收数据
    console.log('Worker 收到数据：', res);
    // Worker 收到数据：
    // MessageEvent {isTrusted: true, data: "查房，这里是 index.html！", origin: "", lastEventId: "", source: null, …}
  
    // Worker 发送数据
    postMessage('开门！这里是 index.js');
}

```

```html
// index.html
<script>
window.onload = function() {
  // 实例化 Worker
  const worker = new Worker('./index.js');

  // index.html 接收数据
  worker.addEventListener('message', (res) => {
  console.log('index.html 收到数据：', res);
  // index.html 收到数据：
  // MessageEvent {isTrusted: true, data: "开门！这里是 index.js", origin: "", lastEventId: "", source: null, …}
  });

  // index.html 发送数据
  worker.postMessage('查房，这里是 index.html！');

  //  终止 Worker
  worker.terminate();
};
</script>
```





在 `index.html` 中，通过：

- `worker.addEventListener('message', callback)`。接收 Web Worker 传递的数据。
- `worker.postMessage('xxx')`。发送数据给 Web Worker。
- `worker.terminate()`。终止通讯

在 `index.js` 中，通过：

```js
onmessage = (res) => {
  console.log(res); // 在 onmessage 方法接受数据
  postMessage('xxx'); // 通过 postMessage 发送数据
}
```





## 可用API

- `setTimeout()， clearTimeout()， setInterval()， clearInterval()`：有了这几个函数，就可以在 `Web Worker` 线程中执行定时操作了；
- `XMLHttpRequest` 对象：意味着我们可以在 `Web Worker` 线程中执行 `Ajax` 请求；
- `navigator` 对象：可以获取到 `ppName`，`appVersion`，`platform`，`userAgent` 等信息；
- `location` 对象（只读）：可以获取到有关当前 URL 的信息；

