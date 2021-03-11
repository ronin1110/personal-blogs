/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-03-10 00:31:33
 * @LastEditors: yaolin
 */// 反转链表
 function reverseList(p) {
   let pre = p
   let cur = null
   
   let temp = null
   while(pre) {
     temp = pre.next
     pre.next = cur
     cur = pre
     pre = temp
   }
 }

 // 链表倒数第K个节点
 function findK(p, k) {
  let cur = p
  let res = null
  while(cur) {
    if(k === 0) {
      res = p
    } else if(k < 0) {
      res = res.next
    }
    k--
    cur = cur.next
  }
 }
// 并发请求控制

var urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 
  'https://www.kkkk1000.com/images/getImgData/gray.gif', 
  'https://www.kkkk1000.com/images/getImgData/Particle.gif', 
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 
  'https://www.kkkk1000.com/images/wxQrCode2.png'
]
function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function () {
            console.log('一张图片加载完成');
            resolve();
        }
        img.onerror = reject
        img.src = url
    })
};

let total = 3, count = 0

function control() {
  count++
  loadImg(urls.shift())
  .then(() => {
    count--
    if(count<total && urls.length) {
      control()
    }
  })
  .catch((res) => {
    console.log('加载失败：' + res)
    count--
    if (count<total && urls.length) {
      control()
    }
  })
}

for(let i = 0; i<total; i++) {
  control()
}

// 原生document api
// 创建一个div元素，内容为我是一个文本，样式为宽300px，高为300px，背景颜色为粉色
let div = document.createElement('div')
document.body.appendChild(div)

let text = document.createTextNode('我是文本')
div.appendChildren(text)

let style = document.createAttribute('style')
style.value = 'width:200px;height:200px; background-color:pink'
div.setAttribute(style)


// 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
// • 要求最大并发数 maxNum
// • 每当有一个请求返回，就留下一个空位，可以增加新的请求
// • 所有请求完成后，结果按照 urls 里面的顺序依次打出

function multiRequest (urls, maxNum) {
  let count = 0
  
  function next() {
    count++
    loadImg(urls.shift())
    .then(() => {
      count--
      if (urls.length && count < maxNum) {
        next()
      }
    })
    .catch((error) => {
      console.log(error)
      if (urls.length && count < maxNum) {
        next()
      }
    })
  }

  for(let i = 0; i < maxNum; i++) {
    next()
  }
}

// 函数柯里化
// function add() {
//   let tempArgs = [].slice.call(arguments)

//   let _add = function() {
//     tempArgs.push(...arguments)
//     return _add
//   }

//   _add.toString = function() {
//     let res = 0
//     console.log(res);
//     tempArgs.forEach((item, index) => {
//       res += item
//     })
//     console.log(res);
//     return res
//   }

//   return _add
// }

function add() {
  let _args = Array.from(arguments)
  let _add = function() {
    _args.push(...Array.from(arguments))
    return _add
  }

  _add.toString = function() {
    let res = 0
    _args.forEach(item => {
      res+=item
    })
    return res
  }

  return _add
}


// 去重
// function single(arr) {
//   return Array.from(new Set(arr)) 
// }