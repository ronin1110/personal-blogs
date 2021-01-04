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
 