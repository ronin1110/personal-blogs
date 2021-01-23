/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-01-15 22:04:38
 * @LastEditors: yaolin
 */
// 运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。

// 它应该支持以下操作： 获取数据 get 和 写入数据 put 。

// 获取数据 get(key)：
//   如果关键字 (key) 存在于缓存中，
//   则获取关键字的值（总是正数），否则返回 -1。

// 写入数据 put(key, value)：
//   如果关键字已经存在，则变更其数据值；
//   如果关键字不存在，则插入该组「关键字/值」。
//   当缓存容量达到上限时，
//   它应该在写入新数据之前删除最久未使用的数据值，
//   从而为新的数据值留出空间。

// 进阶：你是否可以在 O(1) 时间复杂度内完成这两种操作？

// 示例:

// LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );

// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // 返回  1
// cache.put(3, 3);    // 该操作会使得关键字 2 作废
// cache.get(2);       // 返回 -1 (未找到)
// cache.put(4, 4);    // 该操作会使得关键字 1 作废
// cache.get(1);       // 返回 -1 (未找到)
// cache.get(3);       // 返回  3
// cache.get(4);       // 返回  4

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/lru-cache
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


const LRUCash = function(capacity) {
   this.hash = {} // 存放键值对 hash
   this.keys = [] 
   this.capacity = capacity

   this.get = function(key) {
     if (this.hash.key) {
       this.keys.splice(this.keys.indexOf(key), 1)
       this.keys.unshift(key)
       return this.hash[key]
     } else {
       return -1
     }
   }

   this.put = function(key, value) {
     const index = this.keys.indexOf(key)

     if (index > -1) {
       let  outKey = this.keys.splice(index, 1)
       delete this.hash[outKey]
     } else if (index !== -1 || this.keys.length >= this.capacity) {
       let outKey = this.keys.pop()
       delete this.hash[outKey]
     }

     this.hash[key] = value
     this.keys.unshift(key)
   }
}

const cash = new LRUCash(2)
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // 返回  1
cache.put(3, 3);    // 该操作会使得关键字 2 作废
console.log(cache.get(2));       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得关键字 1 作废
console.log(cache.get(1));       // 返回 -1 (未找到)
console.log(cache.get(3));       // 返回  3
console.log(cache.get(4));       // 返回  4

// function multiply(array)
// {
//     // write code here
//   let res = []
//   for(let i =0 ;i<array.length; i++) {
//     let temp = 1
//     array.forEach((val, index) => {
//       if(index !== i) {
//         temp *= array[i]
//       }
//     })
//     res.push[temp]
//   }
//   return res
// }


// function isSymmetrical(pRoot)
// {
//     // write code here
//   function tt(leftNode, rightNode) {
//     if(leftNode ===null && rightNode === null) {
//       return true
//     }
//     if(leftNode.val !== rightNode.val) {
//       return false
//     } else {
//       return tt(leftNode.left, rightNode.right) && tt(leftNode.right, rightNode.left)
//     }
    
    
//   }
//   tt(pRoot.left, pRoot.right)
// }
// function rectCover(number)
// {
//     // write code here
//   if(number === 1 || number === 2) {
//    return number
//   } else {
//     return rectCover(number - 1) + rectCover(number - 2)
//   }
// }