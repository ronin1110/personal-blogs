/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-01-08 20:12:37
 * @LastEditors: yaolin
 */
// 递归实现，遇到引用类型就递归 遇到基础类型就直接赋值
 function deepClone(obj) {
   let objClone = Array.isArray(obj) ? [] : {}
   
   if(obj && typeof obj === 'object') {
     for(key in obj) {
       if(obj[key] && typeof obj[key] === 'object') {
         objClone.key = deepClone(obj[key])
       } else {
         objClone[key] = obj[key]
       }
     }
   }
   return objClone
 }

 // 利用json的api
 let rootObj
 let cloneObj
 cloneObj = JSON.parse(JSON.stringify(rootObj))
//  利用到的是
// JSON.stringify() 将对象转换成JSON字符串
// JSON.parse()  将字符串解析成对象
// 我们通过，JSON.parse(JSON.stringify())将对象转换成JSON格式的数据，再将它转回来，一来一去，开辟了新的内存空间，实现深拷贝。
// 局限：我们通过JSON的api来实现，意味着当js与JSon的格式不一样的时候，就会出错，例如：undefined；Date对象，NAN，Infinity，



// 通过被人已经写好的cloneDeep函数
// Lodash
// 我们可以通过Lodash的cloneDeep()函数来实现
let cloneObj = Lodash.cloneDeep(rootObj)

// 通过jq的extend方法……