# 关于BFC

## 定义

BFC全称是block formatting context 块级格式化上下文

但是一般而言，看的相关blog都很晦涩

可以理解bfc是一种个体，不受其他元素的影响，也就是bfc这个空间内部的环境与外部环境互不干扰

## 触发生成bfc的条件

- 根元素 即html的元素
- float不是none
- overflow不为visible
- display的值是inline-block，table-cell，table-option
- position的值是fixed或者absolute

## bfc的布局规则

### 普通文档流的布局规则

1. 浮动元素的不会被父级计算高度（这里就会造成如果一个div中都是float的div，那这个外部div不会被内部撑开，清除浮动就是给外部div设置bfc，）
2. 非浮动元素会覆盖浮动元素的位置（浮动脱离了文档流）
3. margin会传递给父级
4. 上下的margin会塌陷（）

### bfc文档流的布局规则

1. 浮动元素会被父级计算高度
2. 非浮动元素不会覆盖浮动的元素
3. margin不会传递给父级
4. 上下的margin不会叠加（给其中一个元素添加div触发bfc，因为bfc独立于外部，所以margin不会叠加）

