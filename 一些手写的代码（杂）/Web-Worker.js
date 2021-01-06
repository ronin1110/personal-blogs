/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-01-07 01:20:10
 * @LastEditors: yaolin
 */

// index.js
onmessage = (res) => {
    // Worker 接收数据
    console.log('Worker 收到数据：', res);
    // Worker 收到数据：
    // MessageEvent {isTrusted: true, data: "查房，这里是 index.html！", origin: "", lastEventId: "", source: null, …}
  
    // Worker 发送数据
    postMessage('开门！这里是 index.js');
}

// index.html
{/* <script> */}
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
{/* </script> */}
