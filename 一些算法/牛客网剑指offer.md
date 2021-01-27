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



## 二进制中1的个数

输入一个整数，输出该数32位二进制表示中1的个数。其中负数用补码表示。



```js
function NumberOf1(n)
{
    // write code here
  // 每一位都进行比较 只有都是
  let flag = 1
  let count= 0
  while(flag != 0) {
    if((n & flag) != 0) {
      count ++
    }
    flag <<= 1
  }
  return count
  
//   let count = 0
//   while(n != 0) {
//     count ++
//     n = (n - 1) & n
//   }
//   return count
  
//   如果一个整数不为0，那么这个整数至少有一位是1。如果我们把这个整数减1，
//   那么原来处在整数最右边的1就会变为0，原来在1后面的所有的0都会变成1(如
//  果最右边的1后面还有0的话)。其余所有位将不会受到影响。


// 举个例子：一个二进制数1100，从右边数起第三位是处于最右边的一个1。减去1后，第三位变成0，
// 它后面的两位0变成了1，而前面的1保持不变，因此得到的结果是1011.
// 我们发现减1的结果是把最右边的一个1开始的所有位都取反了。这个时候如果我们再把原来的整数和减去
//   1之后的结果做与运算，从原来整数最右边一个1那一位开始所有位都会变成0。如1100&1011=100
//   0.也就是说，把一个整数减去1，再和原整数做与运算，会把该整数最右边一个1变成0.那么一个整数的
//   二进制有多少个1，就可以进行多少次这样的操作。
}
```





## 数值的整次方

给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。

保证base和exponent不同时为0

```js
function Power(base, exponent)
{
//   return base**exponent; 调api
    // write code here
  
  // 递归实现 分多种情况
  if(base == 0) {
    return 0
  }
  if(exponent == 0) {
    return 1
  } else {
    if(exponent > 0) {
      return Power(base, exponent - 1) * base
    } else {
      return (Power(base, exponent + 1) * (1/base))
    }
  }
}
```



## 反转链表

输入一个链表，反转链表后，输出新链表的表头。

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(p)
{
//     write code here
  let cur = null
  let pre = p
  let temp = null
  while(pre) { // 交换指向
    temp = pre.next
    pre.next = cur
    cur = pre
    pre = temp
  }
  return cur
}
```



## 栈的压入，弹出序列

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）



```js
function IsPopOrder(pushV, popV)
{
    // write code here
  let stack = []

  let j = 0
  let i = 0
  
  // 用一个栈每次压入数据，并与出栈的顺序第一位比较，如果相等，pop()出来，出栈index后移，最后
  for(i = 0; i < pushV.length; i++) {
    stack.push(pushV[i])
    while(stack.length > 0 && stack[stack.length-1] === popV[j]) {
      stack.pop()
      j++
    }
  }
  return j >= popV.length
}
```



## 二叉树搜索与双向链表



输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。



```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */


function Convert(p)
{
  // 把中序遍历记录在数组中，数组的顺序就是排序后的顺序，然后改变每一个节点的指针指向
  let res = []
  if(!p) {
    return null
  }
    // write code here
  recursive(p, res)
  
  for (let i = 0; i < res.length; i++) {
    if(i == 0) {
      res[i].left = null
      res[i].right = res[1]
    }
    else if (i == res.length - 1) {
      res[i].right = null
      res[i].left = res[i-1]
    } else {
      res[i].right = res[i+1]
      res[i].left = res[i-1]
    }
  }
  // 由于res[0]的left和res[res.length-1]本身就是null，
//   for(var i=0;i<res.length-1;i++){
//     res[i].right=res[i+1];
//     res[i+1].left=res[i];
//   }
  return res[0]
}

function recursive (p, res) {
  if(!p) {
    return null
  }
  recursive(p.left, res)
  res.push(p)
  recursive(p.right, res)
  
//   if(p.left){recursive(p.left,res);}
//   res.push(p);
//   if(p.right){recursive(p.right,res);}
}
```



## 整数中1出现的次数

求出1~13的整数中1出现的次数,并算出100~1300的整数中1出现的次数？为此他特别数了一下1~13中包含1的数字有1、10、11、12、13因此共出现6次,但是对于后面问题他就没辙了。ACMer希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中1出现的次数（从1 到 n 中1出现的次数）。



```js
function NumberOf1Between1AndN_Solution(n)
{
    // write code here
  let resCount = 0
  
  // 对每个数都取余取整，比较每位上的是不是1
  
  for(let i = n; i >= 1; i--) {
    let temp = i
    while(temp !== 0) {
      if(temp % 10 === 1 ) {
        resCount++
      }
      temp = Math.floor( temp / 10)
    }
  }
  return resCount
}
```





## 两个链表的第一个公共节点

输入两个链表，找出它们的第一个公共结点。（注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindFirstCommonNode(p1, p2)
{
    // write code here
  // 暴力比对 两层循环
  if(!p1 || !p2) {
    return null
  }
  
  let tempArray = []
  while(p1) {
    tempArray.push(p1)
    p1 = p1.next
  }
  
  while(p2) {
    for(let i = 0;i<tempArray.length; i++) {
      if(p2.val === tempArray[i].val) {
        return p2
      }
    }
//     tempArray.forEach(obj => { // 不知道为啥这样写不行
//       if(obj.val === p2.val) {
//         return obj.val
//       }
//     })
//     return p2
    p2 = p2.next
  }
  return null
}
```





## 数字在升序数组中出现的次数

统计一个数字在升序数组中出现的次数。

```js
function GetNumberOfK(data, k)
{
  return data .indexOf(k) == -1 ? 0 : data.lastIndexOf(k) - data .indexOf(k) + 1  // 一行就行
    // write code here
//   let resCount = 0
//   data.forEach(val => { // 1这样可行
//     if(val == k) {
//       resCount++
//     }
//   })
  
  // 也可以二分
  
//   return resCount
  
}
```





## 数组中只出现一次的数字

一个整型数组里除了两个数字之外，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。



```js
function FindNumsAppearOnce(array)
{
  // write code here
  // return list, 比如[a,b]，其中ab是出现一次的两个数字
  // 第一种就是用两个下标查找的函数比较
  
//   let res = []
//   array.forEach((val, index) => {
//     if(array.indexOf(val) === array.lastIndexOf(val)) {
//       res.push(val)
//     }
//   })
//   return res
  
//   第二种遍历存到对象中，hash存 当已经有一个的时候，直接删了竖向多余2的属性，减少后面的遍历
  let hash = {}
  let res = []
  
  array.forEach(val => {
    if(hash[val]){
      delete hash[val]
    }else {
      hash[val] = 1
    }
  })
  for(let key in hash) {
      res.push(key)
  }
  
  return res
  
  // 第三种 用位运算  没看懂  算了
  
  
}
```







## 和为s的连续正数序列

小明很喜欢数学,有一天他在做数学作业时,要求计算出9~16的和,他马上就写出了正确答案是100。但是他并不满足于此,他在想究竟有多少种连续的正数序列的和为100(至少包括两个数)。没多久,他就得到另一组连续正数和为100的序列:18,19,20,21,22。现在把问题交给你,你能不能也很快的找出所有和为S的连续正数序列? Good Luck!



```js
function FindContinuousSequence(sum)
{
    // write code here
  // 两层循环，完成左边界，内层右边界，累加和比较。
  let res = []
  for(let i = 1; i < sum / 2; i++) {
    let tempRes = []
//     let iter = i
    let tempSum = 0
    for(let iter = i; iter < sum; iter++) {
      tempSum += iter
      tempRes.push(iter)
      
      if(tempSum === sum) {
        res.push(tempRes)
        break
      }
    }
    
  }
  return res
  
  
  
}
```





## 合为S的两个数字

输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。

```js
function FindNumbersWithSum(array, sum)
{
    // write code here
  // 双指针法 记录每次的状态变化，一般有序数组都用这个
  let res = []
  let product = sum * sum
  
  
  let i = 0
  let j = array.length - 1
  
  while(i < j) {
    let tempSum = array[i] + array[j]
    let tempProduct = array[i] * array[j]
    if(tempSum === sum) {
      if(tempProduct < product) {
        product = tempProduct
        res.push(array[i])
        res.push(array[j])
      }
      i++
    } else if(tempSum > sum){
      j--
    }else {
      i++
    }
  }
  return res
}
```

## 左旋转字符串

汇编语言中有一种移位指令叫做循环左移（ROL），现在有个简单的任务，就是用字符串模拟这个指令的运算结果。对于一个给定的字符序列S，请你把其循环左移K位后的序列输出。例如，字符序列S=”abcXYZdef”,要求输出循环左移3位后的结果，即“XYZdefabc”。是不是很简单？OK，搞定它！



```js
function LeftRotateString(str, n)
{
    // write code here\
  if(!str) {
    return ''
  }
  // 取余
  let num = n % str.length
  return str.substr(num) + str.substr(0, num)
}
```





## 扑克牌顺子

LL今天心情特别好,因为他去买了一副扑克牌,发现里面居然有2个大王,2个小王(一副牌原本是54张^_^)...他随机从中抽出了5张牌,想测测自己的手气,看看能不能抽到顺子,如果抽到的话,他决定去买体育彩票,嘿嘿！！“红心A,黑桃3,小王,大王,方片5”,“Oh My God!”不是顺子.....LL不高兴了,他想了想,决定大\小 王可以看成任何数字,并且A看作1,J为11,Q为12,K为13。上面的5张牌就可以变成“1,2,3,4,5”(大小王分别看作2和4),“So Lucky!”。LL决定去买体育彩票啦。 现在,要求你使用这幅牌模拟上面的过程,然后告诉我们LL的运气如何， 如果牌能组成顺子就输出true，否则就输出false。为了方便起见,你可以认为大小王是0。

```js
function IsContinuous(numbers)
{
    // write code here
  
  // 我们分两种情况考虑，
// 一. 如果vector中不包含0的情况：
// 那么如何判断呢？因为需要是顺子，所以首先不能有重复值， 如果没有重复值，那么形如[1 2 3 4 5]
// [5 6 7 8 9]， 会发现最大值与最小值的差值应该小于5.

// 二. 如果vector中包含0：
// 发现除去0后的值，判断方法和1中是一样的。
  if(numbers.length === 0) {
    return false
  }
  let hash = {}
  let max = 0
  let min = 14
    for(let i = 0; i<numbers.length; i++)  {
     let val = numbers[i]
    if(val > 0) {
      if(hash[val]) {
        return false
      } else {
        hash[val] = true
      }
      max = max > val ? max : val
      min = min < val ? min : val
    }
  }
  return max - min < 5
//   return hash
}
```



## 孩子们的游戏

每年六一儿童节,牛客都会准备一些小礼物去看望孤儿院的小朋友,今年亦是如此。HF作为牛客的资深元老,自然也准备了一些小游戏。其中,有个游戏是这样的:首先,让小朋友们围成一个大圈。然后,他随机指定一个数m,让编号为0的小朋友开始报数。每次喊到m-1的那个小朋友要出列唱首歌,然后可以在礼品箱中任意的挑选礼物,并且不再回到圈中,从他的下一个小朋友开始,继续0...m-1报数....这样下去....直到剩下最后一个小朋友,可以不用表演,并且拿到牛客名贵的“名侦探柯南”典藏版(名额有限哦!!^_^)。请你试着想下,哪个小朋友会得到这份礼品呢？(注：小朋友的编号是从0到n-1)



```js
function LastRemaining_Solution(n, m)
{
  // write code here
//   f(n, m) = (m % n + x) % n = (m + x) % n。
  if(n <= 0) {
    return -1
  }
  let index = 0
  for(let i = 2; i <= n; i++) {
    index = (index + m) % i
  }
  
  return index
}
```





### 累加

求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。



```js
function Sum_Solution(n)
{
    // write code here
  // 递归累加
  return n === 1 ? 1:Sum_Solution(n-1) +n
}
```





## 数组中重复复的数字

在一个长度为n的数组里的所有数字都在0到n-1的范围内。 数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中第一个重复的数字。 例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是第一个重复的数字2。

返回描述：

如果数组中有重复的数字，函数返回true，否则返回false。

如果数组中有重复的数字，把重复的数字放到参数duplication[0]中。（ps:duplication已经初始化，可以直接赋值使用。）



```js
function duplicate(numbers, duplication)
{
    // write code here
    //这里要特别注意~找到任意重复的一个值并赋值到duplication[0]
    //函数返回True/False
  let hash = {}
   for(let i =0; i<numbers.length; i++){
     var val = numbers[i]
     if(hash[val]) {
       duplication[0] = val
       return val
     } else {
       hash[val] = val
     }
  }
  return false
  
//   for (let i = 0; i < numbers.length; i++) {
//         if (numbers.lastIndexOf(numbers[i]) !== i) {
//             duplication[0] = numbers[i]
//             return true
//         }
//     }
//     return false
}
```



## 表示数值的字符串

请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。



```js
//s字符串
function isNumeric(s)
{
    // write code here
//   正则
    var reg = /^[\+-]?\d*\.?\d+(e[\+-]?\d+)?$/i;
    return reg.test(s);
}
```





## 字符流中第一个不重复的字符

请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。

```js
//Init module if you need
let map ={}
function Init()
{
    // write code here
  map = {}
}
//Insert one char from stringstream
function Insert(ch)
{
    // write code here
  // 每次传入一个字符串存进hash
  if(map[ch]){
        map[ch] = map[ch]+1;
    } else{
        map[ch]=1;
    }
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce()
{
    // write code here
  // 比较计数返回
  for(let i in map){
    if(map[i]==1) {
      return i
    };
  }
    return "#";
}
```





## 链表中环的入口节点

给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/

function EntryNodeOfLoop(p)
{
  // 存hash 看节点是否存在 如果存在相同的数据，就直接返回那个节点，如果没有 已val做key值存整个节点
  let hash = {}
  while(p) {
    if(hash[p.val] === p) {
      return p
    } else {
      hash[p.val] = p
      p = p.next
    }
  }
  return null
    // write code here
}
```



## 二叉树的下一个节点

给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。



![图片说明](https://uploadfiles.nowcoder.com/images/20200526/284295_1590477193692_99D648423BB3F2113395149399A1462A)

[1] 是一类：特点：当前结点是父亲结点的左孩子
[2 3 6] 是一类，特点：当前结点右孩子结点，那么下一节点就是：右孩子结点的最左孩子结点,如果右孩子结点没有左孩子就是自己
[4 5]是一类，特点：当前结点为父亲结点的右孩子结点，本质还是[1]那一类
[7]是一类，特点：最尾结点





```js
/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/
function GetNext(p)
{
    // write code here
  if(p == null) {
    return null
  }
  // 属于[2 3 6]类
  if(p.right) {
    p = p.right
    while(p.left) {
      p = p.left
    }
    return p
  }
  // 属于 [1] 和 [4 5]
  while(p.next) {
    let par = p.next
    if(par.left == p) {
      return par
    }
    p = p.next
  }
  // 属于[7]
  return null
  
}
```





## 二叉树打印多行

从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。



```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// 用队列实现广度优先搜索 套模板！！
function Print(root)
{
  if(root == null) {
    return []
  }
  
  let res = []
  
  let queue = []
  queue.push(root)
  while(queue.length) {
    let len = queue.length // 因为循环的内部queue的长度在变 所以变量存
    let tempRes = []
    for(let i = 0; i< len; i++) {
      let temp = queue.shift()
      tempRes.push(temp.val)
      
      if(temp.left) {
        queue.push(temp.left)
      }
      if(temp.right) {
        queue.push(temp.right)
      }
    }
    res.push(tempRes)
  }
  
  return res
    // write code here
}
```





## 数据流中的中位数

如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流，使用GetMedian()方法获取当前读取数据的中位数。



```js
let res = []
function Insert(num)
{
    // write code here
  // 每次读入都存入数组
  res.push(num)
  res = res.sort()
}
function GetMedian(){
	// write code here
  // 依据数组的长度奇偶 返回中位数
  return res.length % 2 === 0 ? (res[res.length / 2 - 1] + res[res.length / 2])/2 : res[Math.floor(res.length / 2)]
}
```





## 剪绳子

给你一根长度为n的绳子，请把绳子剪成整数长的m段（m、n都是整数，n>1并且m>1，m<=n），每段绳子的长度记为k[1],...,k[m]。请问k[1]x...xk[m]可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。



```js
function cutRope(number)
{
    if(number==2){
        return 1
    }
    if(number==3){
        return 2
    }
    var dp = [];
    dp[2] = 2;
    dp[3] = 3;
    for(let i=4; i<number+1; i++){
        let max = 0;
        for(let j = 2; j<=number/2; j++){
            max = Math.max(max, dp[j]*dp[i-j]) // 动态规划 dp[i] 记录长为i的最优解（乘积最大）
        }
        dp[i] = max;
    }
    return dp[number]

```





## 替换空格

请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。



```js
function replaceSpace(str)
{
    // write code here
  if(str.includes(' ')) {
    return replaceSpace(str.replace(' ', '%20')) // replace 会改变第一个匹配到的字符串  // 否则则用正则去匹配
  } else {
    return str
  }
}
```





## 从尾到头打印空格

输入一个链表，按链表从尾到头的顺序返回一个ArrayList。

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    // write code here
  let res = []
  while(head) {
    res.unshift(head.val)
    head = head.next
  }
  
  return res
}
```





## 调整数组的顺序奇数在前偶数在后

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。



```js
function reOrderArray(array)
{
  
    // write code here
  // 用辅助变量来做很简单
  let resA = []
  let resB = []
  array.forEach(val=>{
    if(val % 2 ==1) {
      resA.push(val)
    } else {
      resB.push(val)
    }
  })
  return resA.concat(resB)
}
```





## 链表中倒数第K个节点

输入一个链表，输出该链表中倒数第k个结点。

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k)
{
    // write code here
  if(!head) {
    return null
  }
  
  let res = null
  res = head
  
  // 两个指针相隔k个节点
  while(k--) {
//     res = head
    if(!head) {
      return null
    }else {
      head = head.next
    }
  }

  while(head) {
    head = head.next
    res = res.next
  }
  
  return res
}
```





## 树的子结构

输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function HasSubtree(pRoot1, pRoot2)
{
    // write code here
  if(!pRoot1 || !pRoot2) {
    return false
  }else {
    // 三颗树，分别判断
    return dfs(pRoot1, pRoot2) || dfs(pRoot1.left, pRoot2) || dfs(pRoot1.right, pRoot2)
  }

  
}

// 遍历判断两棵树是否相等 
// 根据题意可知，需要一个函数判断树A和树B是否有相同的结构。显然是个递归程序。可考察递归程序3部曲。
// 1.递归函数的功能：判断2个数是否有相同的结构，如果相同，返回true，否则返回false
// 2.递归终止条件：
// 如果树B为空，返回true，此时，不管树A是否为空，都为true
// 否则，如果树B不为空，但是树A为空，返回false，此时B还没空但A空了，显然false
// 3.下一步递归参数：
// 如果A的根节点和B的根节点不相等，直接返回false

function dfs(p1, p2) {
  if(!p2) {
    return true
  }
  if(!p1) {
    return false
  }
  return p1.val === p2.val && dfs(p1.left, p2.left) && dfs(p1.right, p2.right)
}
```







## 顺时针打印矩阵

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下4 X 4矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.

```js
function printMatrix(matrix)
{
  
  // 旋转打印 用4个变量记录位置 每次变化都判断是否越过
    // write code here
  if(!matrix) {
    return []
  }
  
  let res = []
  
  let left = 0
  let right = matrix[0].length-1
  let top = 0
  let bottom = matrix.length-1
  
  while(left <= right && top <= bottom) {
    for(let i = left; i<= right; i++) {
      res.push(matrix[top][i])
    }
    top++
    for(let i = top; i<= bottom; i++) {
      res.push(matrix[i][right])
    }
    right--
    
    if(top > bottom || left > right) break
    
    for(let i = right; i>= left; i--) {
      res.push(matrix[bottom][i])
    }
    bottom--
    for(let i = bottom; i>= top; i--) {
      res.push(matrix[i][left])
    }
    left++
  }
  return res

  
}
```



## 包含min函数的栈

定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））

```js
let stack = []
let min_val = Number.MAX_VALUE
function push(node)
{
    // write code here
  stack.push(node)
  if(node < min_val) {
    min_val = node
  }
}
function pop()
{
    // write code here
  let node = stack.pop()
  if(node === min_val) {
    let m = Number.MAX_VALUE
    stack.forEach(val => {
      if(val < m) {
        m = val
      }
    })
    min_val = m
  }
  
}
function top()
{
  return stack[stack.length-1]
    // write code here
}
function min()
{
  return min_val
    // write code here
}
```





## 二叉搜索树后序遍历序列

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则返回true,否则返回false。假设输入的数组的任意两个数字都互不相同。

```js
function VerifySquenceOfBST(sequence)
{
  由题意可得：

// 1. 后序遍历序列的最后一个元素为二叉树的根节点；

// 2. 二叉搜索树左子树上所有的结点均小于根结点、右子树所有的结点均大于根结点。


// 算法步骤如下：

// 1. 找到根结点；

// 2. 遍历序列，找到第一个大于等于根结点的元素i，则i左侧为左子树、i右侧为右子树；

// 3.
// 我们已经知道i左侧所有元素均小于根结点，那么再依次遍历右侧，看是否所有元素均大于根结点；若出现小于根结点的元素，则直接返回false；若右侧全都大于根结点，则：

// 4. 分别递归判断左/右子序列是否为后序序列；
  if(sequence.length == 0) {
    return false
  }
    // write code here
  return judge(sequence, 0 , sequence.length-1)
}
function judge(arr, start, end) {
  if(start >= end) {
    return true
  }
  let i = start
  while(arr[end] > arr[i]) {
    i++
  }
  for(let j = i; j< end; j++) {
    if(arr[j]< arr[end]) {
      return false
    }
  }
  
  return judge(arr, start, i-1) && judge(arr, i, end-1)
  
}
```



## 二叉树中和为某一值的路径

输入一颗二叉树的根节点和一个整数，按字典序打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。、

```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

function FindPath(root, expectNumber)
{  
  // write code here
  let res=[]
  let tempRes = []
  dfs(root, expectNumber)
  return res
  
  function dfs(root, number) { // 深度递归
    if(!root) {
     return  
    }
    tempRes.push(root.val) // 路径添加进去
    
    number = number - root.val // 消耗的值
    
    if(!root.left && !root.right && number == 0) { // 和为目标值 路劲添加进结果
      res.push(tempRes.concat())
    }
    
    dfs(root.left, number) // 左右子树
    dfs(root.right, number)
    tempRes.pop() // 路径吐出
  }
 

}


```





## 复杂链表的复制

输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针random指向一个随机节点），请对此链表进行深拷贝，并返回拷贝后的头结点。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）

```js
/*function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}*/
function Clone(node)
{
    // write code here
  if(!node) {
    return null
  } else {
    let res = new RandomListNode(node.label)
    res.random = node.random
    res.next = Clone(node.next)
    return res  
  }
}
```





、