# 牛客网剑指offer

## 斐波那契数列

大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0，第1项是1）。

n≤39



```js
function Fibonacci(n)
{
  // write code here
  if(n === 0 || n === 1) {
    return n
  } // 是0或者1的时候 直接返回
  let result = 0 // 记录结果，默认是0
  let first = 0 // 记录第一个值
  let second = 1 // 记录第二个值
  for(let i= 2; i <= n; i++){ // 从2开始（因为0 1 直接返回了）
    result = first + second // 第三项等于前两项的和
    first = second // 前进一步
    second = result
  }
  return result
}
```



## 二叉搜索树的第k大的节点

给定一棵二叉搜索树，请找出其中的第k小的结点。

```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function KthNode(pRoot, k)
{
  let count = 0;

  function find(node){ // 递归中序遍历搜索树
    if(node == null){
      return
    }
    find(node.left);
    
    count++; //有值的话就加一个计数
    if(count == k){
      result = node
    }
    
    find(node.right)
  }
  
  let result = null
  find(pRoot)
  return result
    // write code here
}
```





## 旋转数组的最小数字

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。



```js
function minNumberInRotateArray(rotateArray)
{
    // write code here
  if(rotateArray.length === 0) {
    return 0
  }
  for(let i = 1; i<rotateArray.length; i++) {
    if(rotateArray[i] < rotateArray[i - 1]) { // 非递减数组就是递增或者所有元素相同，只需要遍历数组，将当前元素与前一个元素相比较，比他小就是旋转的地方
      return rotateArray[i]
    }
  }
}
```





## 变态跳台阶

一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

```js
function jumpFloorII(number)
{
  // 一个f(n)=f(n-1)+f(n-2)+...+f(1)
// 因为f(n-1)=f(n-2)+f(n-3)+...+f(1)
// 所以f(n)=2*f(n-1)
// 递归就行，每次*2（直接阶乘？）
  let result = 0
  function k(temp, n) {
    if(n === 1) {
      result = temp
      return
    }
    k(temp*2, n-1)
  }
  k(1,number)

  return result
}
```



## 合并两个排序的链表

输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。



```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(p1, p2) // 传入的是两个头节点
{
    // write code here
// 其中一个链表为空的时候 返回另一个节点
  if(p1 == null) {
    return p2
  }
  if(p2 == null) {
    return p1
  }
  
  let result = null // 用以保存临时节点
  if(p1.val < p2.val) {
    result = p1
    result.next = Merge(p1.next, p2)
  } else {
    result = p2
    result.next = Merge(p1, p2.next)
  }
  return result
}
```



## 镜像二叉树

操作给定的二叉树，将其变换为源二叉树的镜像。



```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Mirror(root)
{
    // write code here
  // 递归实现 递归节点，交换子节点的值就行
    if(root === null) {
      return
    }
    let temp = root.left
    root.left = root.right
    root.right = temp
    
    Mirror(root.left)
    Mirror(root.right)
}
```





## 数组中出现次数超一半（众数）的数字

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。



```js
function MoreThanHalfNum_Solution(numbers)
{
    // write code here
//   let sortArray = numbers.sort()
//   let key = sortArray[0]
//   let count = 1
//   if(sortArray.length === 1) {
//     return key
//   }
//   for(let i = 1; i < sortArray.length; i++) {
//     if(sortArray[i] === key){
//       count++
//       if(count > sortArray.length/2) {
//         return key
//       }
//     } else {
//       key = sortArray[i]
//       count = 1
//     }
//   }
//   return 0
  let hash = {} // key为元素，存的个数
  numbers.forEach(item=>{
    if(item in hash) { // 已经在hash对象中就加一
      hash[item] += 1
    }else {
      hash[item] = 1
    }
  })
  for(let item in hash) { // 遍历其中，如果个数超过一半直接返回
    if(hash[item] > numbers.length / 2){
      return item
    }
  }
  return 0
  
}
```





## 连续子数组的最大和

输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。要求时间复杂度为 O(n).



```js
function FindGreatestSumOfSubArray(array)
{
    // write code here
  let max = array[0]
  let sum = array[0]
  for (let i = 1; i<array.length; i++){
    sum += array[i]
    if(sum > max) {
      max = sum
    }
    if(sum < 0) { // 也就是说当值一段的数组和小于0的时候，对后面的添加进去的数据就是没有贡献的，所以还不如从0计数
      sum = 0
    }
  }
  return max
}
```



## 第一个出现一次的字符

在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.（从0开始计数）

```js
function FirstNotRepeatingChar(str)
{
    // write code here
  // 取巧用了js的函数
  let hash = {}
  let max = 0
  for (let i = 0; i< str.length; i++){
    if(str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      return i
    }
  }
  return -1
}
```



## 二叉树的深度

输入一棵二叉树，求该树的深度。从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。



```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// let count = 0
function TreeDepth(r)
{
    // write code here
  if(r == null) {
    return 0
  }
   // 树的深度有三种情况 1、没有右支，深度等于左支深度+根1，相反等于右支深度+根1，或者没有返回0
  let leftCount = TreeDepth(r.left)
  let rightCount = TreeDepth(r.right)
  return leftCount > rightCount ? leftCount + 1 : rightCount + 1
}
```



## 平衡二叉树判断

输入一棵二叉树，判断该二叉树是否是平衡二叉树。

在这里，我们只需要考虑其平衡性，不需要考虑其是不是排序二叉树

**平衡二叉树**（Balanced Binary Tree），具有以下性质：它是一棵空树或它的**左右两个子树的高度差的绝对值不超过1**，并且左右两个子树都是一棵平衡二叉树。



```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

function IsBalanced_Solution(r)
{
    // write code here
      // write code here
  let flag = true
  function deep(r) {
    if(r == null) {
    return 0
    }
    let leftCount = deep(r.left)
    let rightCount = deep(r.right)
    if(Math.abs(leftCount - rightCount) > 1) { // 在之前判断深度的基础上判断深度差
      flag = false
    }
    return leftCount > rightCount ? leftCount + 1 : rightCount + 1
  }
  deep(r)
  return flag
  
}
```





## 构建乘积数组

给定一个数组A[0,1,...,n-1],请构建一个数组B[0,1,...,n-1],其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。不能使用除法。（注意：规定B[0] = A[1] * A[2] * ... * A[n-1]，B[n-1] = A[0] * A[1] * ... * A[n-2];）

对于A长度为1的情况，B无意义，故而无法构建，因此该情况不会存在。



```js
function multiply(array)
{
    // write code here
  let res = []
  for(let i =0 ;i<array.length; i++) {
    let temp = 1
    array.forEach((val, index) => {
      if(index != i) { // 当index相等的时候，跳过
        temp = temp * val
      }
    })
    res.push(temp)
  }
  return res
}
```





## 重建二叉树

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// 前序，中左右；中序，左中右
// 不管如何，每一个值都是一个结点，关键在于插入在父节点的左边还是右边
//前序遍历第一个一定是根节点，中序遍历根节点之前的是左子树，右边的是右子树，
function reConstructBinaryTree(pre, vin) // 递归关注点 是输入什么东旭，需要输出什么东西， 还有就是终止条件
{
  if (pre.length === 0) {
    return null
  }
    // write code here
  let root = pre[0]
  let index = vin.indexOf(root)
  
  let leftPre = pre.slice(1, index + 1)
  let rightPre = pre.slice(index+1)
  
  let leftVin = vin.slice(0, index)
  let rightVin = vin.slice(index+1)
  
  let node = new TreeNode(root)
  
  node.left = reConstructBinaryTree(leftPre, leftVin)
  node.right = reConstructBinaryTree(rightPre, rightVin)
  
  return node
  
}
```





## 二维数组中的查找

在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。



```js
// while(line=readline()){
//     var index=line.indexOf(",");
//     var left=parseInt(line.substring(0,index));
//     var right=JSON.parse(line.substring(index+1));
//     print(Find(left,right))
// }
function Find(target, array)
{
    // write code here 
// 暴力破解
//   for(let i = 0; i<array.length; i++) {
//     for(let j = 0; j<array[0].length; j++) {
//       if(array[i][j] === target) {
//         return true
//       }
//     }
//   }
//   return false
  
  let i = 0
  let j = array[0].length-1
  
  // 当 m < target，由于 m 已经是该行最大的元素，想要更大只有从列考虑，取值右移一位
// 当 m > target，由于 m 已经是该列最小的元素，想要更小只有从行考虑，取值上移一位
// 当 m = target，找到该值，返回 true
  while(i < array.length && j >= 0) {
    if(array[i][j] === target) {
      return true
    }
    else if (array[i][j] > target) {
      j--
    }
    else if (array[i][j] < target) {
      i++
    }
  }
  return false
}
```





## 跳台阶

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。



```js
function jumpFloor(number)
{
    // write code here
  
  if(number == 1) {
    return 1
  }
  if(number == 2) {
    return 2
  }
  
  let count = jumpFloor(number-1) +jumpFloor(number-2) // f(n)= f[n-1] + f{n-2} 斐波那契数列
  
  return count
  
      // write code here
//     if(number==1) return 1;
//     if(number==2) return 2;
//     var pre1=1,pre2=2,cur=0;
//     for(var i=3;i<=number;i++){
//         cur = pre1+pre2;
//         pre1 = pre2;
//         pre2 = cur;
//     }
//     return cur;
}
```



## 从上到下打印二叉树的每个节点

从上往下打印出二叉树的每个节点，同层节点从左至右打印。

```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// 输入一个根节点,push进数组节点的值，
function PrintFromTopToBottom(root)
{
    // write code here
  if(!root) {return true}
  
  let queue = []
  
  let res = []
  queue.push(root) 
  
  // 广度优先 队列实现！
  
  while(queue.length !== 0) {
    let node = queue.shift()
    res.push(node.val)
    if(node.left !== null) {
      queue.push(node.left)
    }
    if(node.right !== null) {
      queue.push(node.right)
    }
  }
  return res
}
```



## 矩形覆盖

我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？

比如n=3时，2*3的矩形块有3种覆盖方法：

![img](https://uploadfiles.nowcoder.com/images/20201028/59_1603852524038_7FBC41C976CACE07CB222C3B890A0995)

```js
function rectCover(number)
{
    // write code here
  // wdnmd number为0没写 你报语法错误或者数组越界？
  
  // 斐波那契数列
  if(number === 0) {
    return 0
  }
  if(number === 1 || number === 2) {
   return number
  } else {
    return rectCover(number - 1) + rectCover(number - 2)
  }
}
```



