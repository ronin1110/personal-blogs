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

