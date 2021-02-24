

# html5新增及css3新增

## html5新增

### 语义化标签

| 标签       | 描述                      |
| ---------- | ------------------------- |
| <header>   | 文档头部区域              |
| <footer>   | 文档尾部区域              |
| <nav>      | 导航                      |
| <section>  | 节，段，区段              |
| <article>  | 独立的内容区域            |
| <aside>    | 侧边栏区域                |
| <detailes> | 描述文档或部分的细节      |
| <summary>  | 标签包含details元素的标题 |
| <dialog>   | 对话框（提示框）          |

主要目的还是为了代码可读性





### 增强型表单

#### 新的表单输入类型

**color** date(从一个日期选择器选择一个日期) datetime datetime-local **email** month number range(一定范围内数字值的输入域) search **tel** time url week(选择周和年)

### 新的表单属性

| 属性名          | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| placehoder      | 简短的提示在用户输入值前会显示在输入域上。即我们常见的输入框默认提示，在用户输入后消失。 |
| required        | 是一个 boolean 属性, 要求填写的输入域不能为空                |
| pattern         | 描述了一个正则表达式用于验证<input> 元素的值                 |
| min 和 max      | 设置元素最小值与最大值                                       |
| step            | 为输入域规定合法的数字间隔                                   |
| height 和 width | 用于 image 类型的 <input> 标签的图像高度和宽度               |
| autofocus       | 是一个 boolean 属性。规定在页面加载时，域自动地获得焦点。    |
| multiple        | 是一个 boolean 属性。规定<input> 元素中可选择多个值          |

### 音频视频

- audio

```html
<audio controls>
 	<source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
	您的浏览器不支持 audio 元素。
</audio>
```

controls提供添加播放、暂停、和音量控件

在标签之间害应该插入你的浏览器不支持的提示文本

audio标签之间云溪添加多个source，默认会使用第一个音频链接文件



- video

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
	您的浏览器不支持Video标签。
</video>
```

control 提供了 播放、暂停和音量控件来控制视频。也可以使用dom操作来控制视频的播放暂停，如 play() 和 pause() 方法。

同时 video 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变。

video 元素支持多个source 元素. 元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式（ MP4, WebM, 和 Ogg）

### canvas绘图（图形，路径，文本，渐变，图像）

canvas只是个图形容器，必须使用脚本来绘制图形，

```html
<canvas id="myCanvas" width=" 200px" height="200px" style="border:3px solid red" >
</canvas>
```

图形：

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
//getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
ctx.fillStyle="#FF0000";
ctx.fillRect(20,30,150,75);
```

路径：

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
//getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
ctx.moveTo(0, 0)
ctx.lineTo(100, 200)
ctx.stroke()
```

文字：

font - 定义字体

fillText(*text,x,y*) - 在 canvas 上绘制实心的文本

strokeText(*text,x,y*) - 在 canvas 上绘制空心的文本

```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.font = '30px Arial'
ctx.fillText('绘制文字', 10, 50)
```

渐变：

渐变可以填充在矩形, 圆形, 线条, 文本等等, 各种形状可以自己定义不同的颜色。

以下有两种不同的方式来设置Canvas渐变：

　　createLinearGradient(*x,y,x1,y1*) - 创建线条渐变

　　createRadialGradient(*x,y,r,x1,y1,r1*) - 创建一个径向/圆渐变



```js
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
 
// Create gradient
var grd=ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");
 
// Fill with gradient
ctx.fillStyle=grd;
ctx.fillRect(10,10,150,80);
```

类似颜色，一种填充的方式

### SVG绘图

SVG 意为可缩放矢量图形（Scalable Vector Graphics）。

SVG 使用 XML 格式定义图像。

没了解



### 地理定位

**HTML5 Geolocation（地理定位）用于定位用户的位置。**

### 拖放API

拖放是一种常见的特性，即抓取对象以后拖到另一个位置。在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。

拖放的过程分为源对象和目标对象。源对象是指你即将拖动元素，而目标对象则是指拖动之后要放置的目标位置。



**拖放**的源对象(可能发生移动的)可以触发的事件——3个**：**

dragstart：拖动开始

drag：拖动中

dragend：拖动结束

整个拖动过程的组成： dragstart*1 + drag*n + dragend*1



**拖放的目标对象(不会发生移动)可以触发的事件——4个**：

dragenter：拖动着进入

dragover：拖动着悬停

dragleave：拖动着离开

drop：释放

整个拖动过程的组成1： dragenter*1 + dragover*n + dragleave*1

整个拖动过程的组成2： dragenter*1 + dragover*n + drop*1



**拖动的源对象和目标对象之间的数据传递：**

　　源对象数据保存：e.data.Transfer.setData(k,v)  // k-v必须都是string类型

　　目标对象获取数据：e.data.Transfer.getData(k,v)





### Web Storage

使用HTML5可以在本地存储用户的浏览数据

数据以 键/值 对存在, web网页的数据只允许该网页访问使用。

客户端存储数据的两个对象为：

localStorage - 没有时间限制的数据存储

sessionStorage - 针对一个 session 的数据存储, 当用户关闭浏览器窗口后，数据会被删除。



不管是 localStorage，还是 sessionStorage，可使用的API都相同，常用的有如下几个（以localStorage为例）：

- - 保存数据：localStorage.setItem(key,value);
  - 读取数据：localStorage.getItem(key);
  - 删除单个数据：localStorage.removeItem(key);
  - 删除所有数据：localStorage.clear();
  - 得到某个索引的key：localStorage.key(index);



## CSS3新增

### 新增的边框属性

#### **border-color**

来为边框设置多种颜色

```css
#border{
  width: 100px;
  height: 100px;
  border-style: dotted;
  border-color: red green;
}
```

border-color的值分布规则与margin一样，上右下左

这里说一下题外话，需要注意："`border-width`" 属性如果单独使用的话是不会起作用的。请首先使用 "`border-style`" 属性来设置边框。（必须先设定边框的样式，才有宽度一说）

#### border-image

图片创建边框

```css
  border-image: url('./test-image.jpg') 1000 1000 round;
```

| 值                    | 描述                                                     |
| :-------------------- | :------------------------------------------------------- |
| *border-image-source* | 用在边框的图片的路径。                                   |
| *border-image-slice*  | 图片边框向内偏移。                                       |
| *border-image-width*  | 图片边框的宽度。                                         |
| *border-image-outset* | 边框图像区域超出边框的量。                               |
| *border-image-repeat* | 图像边框是否应平铺(repeat)、铺满(round)或拉伸(stretch)。 |

#### border-radius

圆角边框

```css
div
{
border:2px solid;
border-radius:25px;
}
```

#### box-shadow

设置阴影

```css
div
{
	box-shadow: 10px 10px 5px #888888;
}
```

| 值         | 说明                                                         |
| :--------- | :----------------------------------------------------------- |
| *h-shadow* | 必需的。水平阴影的位置。允许负值                             |
| *v-shadow* | 必需的。垂直阴影的位置。允许负值                             |
| *blur*     | 可选。模糊**距离**                                           |
| *spread*   | 可选。阴影的**大小**                                         |
| *color*    | 可选。阴影的颜色。在[CSS颜色值](https://www.runoob.com/cssref/css_colors_legal.aspx)寻找颜色值的完整列表 |
| inset      | 可选。从外层的阴影（开始时）改变阴影内侧阴影                 |

### 新增的背景属性

#### background-size

指定背景图片的大小

```css
#background-image{
  background-image: url('./jump-gif.gif');
  /* background-image: url('./test-image.jpg'); */
  background-size: 100% 100%;
}
```

#### background-origin

背景的显示位置（从padding-box，border-box或者content-box开始）

```css
#background-image{
  padding: 50px;
  background-image: url('./jump-gif.gif');
  /* background-image: url('./test-image.jpg'); */
  background-size: 100% 100%;
  background-origin: padding-box;
}
```

#### background-clip

背景图片从什么位置开始裁剪

```css
#background-clip{
  padding: 50px;
  background-color:yellow;
  background-clip:padding-box;
  /* background-image: url('./test-image.jpg'); */
  background-size: 100% 100%;
}
```

属性取值和上面的background-origin一样

（从padding-box，border-box或者content-box开始）



### 新增的文字效果

#### text-shadow

文字阴影

```css
h1
{
text-shadow: 5px 5px 5px #FF0000;
}
```

| 值         | 描述                                |
| :--------- | :---------------------------------- |
| *h-shadow* | 必需。水平阴影的位置。允许负值。    |
| *v-shadow* | 必需。垂直阴影的位置。允许负值。    |
| *blur*     | 可选。模糊的距离。                  |
| *color*    | 可选。阴影的颜色。参阅 CSS 颜色值。 |

#### word-wrap

文字自动换行

```css
p {word-wrap:break-word;}
```

| 值         | 描述                                         |
| :--------- | :------------------------------------------- |
| normal     | 只在允许的断字点换行（浏览器保持默认处理）。 |
| break-word | 在长单词或 URL 地址内部进行换行。            |



### 新增的动画效果

#### transform

变换效果

css3提供了元素变形效果，也叫做变换。它可以将元素实现旋转、缩放和平移的功能。

取值太多，不列举了

https://www.runoob.com/cssref/css3-pr-transform.html

#### animation动画效果

CSS3 提供了类似 Flash 关键帧控制的动画效果，通过 animation 属性实现。那么之前的 transition 属性只能通过指定属性的初始状态和结束状态来实现动画效果，有一定的局限性。

animation 实现动画效果主要由两个部分组成：1、通过类似 Flash 动画中的关键帧声明一个动画；2、在 animation 属性中调用关键帧声明的动画。

```css
div
{
width:100px;
height:100px;
background:red;
position:relative;
animation:mymove 5s infinite;
-webkit-animation:mymove 5s infinite; /*Safari and Chrome*/
}

@keyframes mymove
{
from {left:0px;}
to {left:200px;}
}
```

### 新增的过渡属性

#### transition

过渡效果一般是通过一些简单的 CSS 动作触发平滑过渡功能，比如：:hover、:focus、:active、:checked 等。CSS3 提供了 transition 属性来实现这个过渡功能。

```css
div
{
width:100px;
height:100px;
background:blue;
transition:width 2s;
-moz-transition:width 2s; /* Firefox 4 */
-webkit-transition:width 2s; /* Safari and Chrome */
-o-transition:width 2s; /* Opera */
}

div:hover
{
width:300px;
}
```

| 属性值                     | 描述                                |
| -------------------------- | ----------------------------------- |
| transition-property        | 规定设置过渡效果的 CSS 属性的名称。 |
| transition-duration        | 规定完成过渡效果需要多少秒或毫秒。  |
| transition-timing-function | 规定速度效果的速度曲线。            |
| transition-delay           | 定义过渡效果何时开始。              |





![图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/567d894c8b014ed8acc6071914dc36bd~tplv-k3u1fbpfcp-zoom-1.image)