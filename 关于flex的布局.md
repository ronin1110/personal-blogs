# 关于flex的布局

## flex布局是什么？

flex布局是 Flexible Box 的缩写，也就是弹性布局

任何容器都可以设置flex布局，之后容器内的元素都会自动成为容器成员

**注意**在设置flex布局之后，子元素的float与clear还有vertical-align都将失效（flex布局有了自己的属性替代）

## 基本概念

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

flex的容器默认有两条轴，一条主轴（横向main axis），一条垂直（纵向 cross axis）,主轴的开始和结束称为main start 和 main end ，交叉轴的开始和结束叫做cross start 和 cross end，容器成员占据的主轴空间叫做main size ，相对应的交叉轴占据的空间叫做 cross size



## 容器的属性

### flex-direction决定主轴的方向（默认之后的主轴为row）

- row 默认是主轴横向 从左向右
- row-reverse 主轴横向 从右到左
- colum 主轴垂直 从上到下
- colum-reverse 主轴处置 从下到上



### flex-wrap 决定如何换行

- nowrap 默认不换行
- wrap 换行 第二行在第一行的下方
- wrap-reverse 换行 第二行在第一行的上方

### flex-flow ： flex-direction和flex-wrap的简写

默认是flex-flow：row nowrap



### justify-content 定义主轴上对齐方式

- flex-start 默认左对齐
- flex-end 右对齐
- center 居中
- space-between 两端对齐 项目之间的间隔相等
- space-around 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。



### align-items 定义在交叉轴上如何对齐

- flex-start 交叉轴起点对齐
- flex-end 交叉轴终点对齐
- center 交叉轴中点对齐
- baseline项目第一行文字的基线对齐
- stretch 默认值，如果项目未设置高度或设为auto，将占满整个容器的高度。
- ![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png)







### align-content 定义多根轴线时 轴线的对齐方式（当只有一条轴线时 属性不起作用）

- flex-start 与交叉轴起点对齐
- flex-end 与交叉轴终点对齐
- center 与交叉轴中点对齐
- space-between 交叉轴两端对齐，轴线之间间隔平均
- space-around 每根轴线两端的间隔相，等所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch 默认 沾满整个轴线

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png)





## 项目的属性（容器成员）

### order 定义项目的排列顺序，数值越小排列越靠前，默认为0

### flex-grow 项目的放大比例，默认是0，即即使有空间，也不放大

如果项目的flex-grow都一样假设为1，那所有的项目平分所有的空间，如果其中一个为2，那占据的空间就要大一倍

### flex-shrink 项目的所有比例，默认是1，如果空间不足就缩小该项目

若项目的flex-shrink都为1，空间不足时等比缩小，假使其中一个项目的flex-shrink为0 那当空间不足时，其他项目不缩小（负值无效）

### flex-basis 定义分配多余空间之前，项目占据主轴空间的（main size）

默认是auto，即项目本来的大小，可以设置具体长度 例如***px 这样项目占据的就是固定对的大小

### flex属性 是 flex-grow flex-shrink和flex-basis的简写，默认的值是0 1 auto

该属性有两个快捷值 auto 代表 （1 1 auto） none 代表 （0 0 auto）

### align-self 允许单个项目设置不同的对齐方式，可以覆盖align-items属性 

默认值是auto，即继承父元素的align-items属性 如果没有 就是默认stretch

属性取值与align-items完全一样

