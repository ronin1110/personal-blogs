# css 如何实现垂直居中？

## 绝对定位实现

```css
.center-ele{
  background-color:red
  width:100px;
  height:100px:
  position:absolute;
  top:50%;
  left:50%;
  margin-left:-50px; // 元素宽度一般
  margin-top:-50px; // 高度的一般
}
```



使用到了css3的translate的偏移百分比是相对于自身的大小的

```css
.center-ele{
  background-color:red
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%); // 相对自身的宽高
}
```



## margin：auto实现绝对布局

```css
.center-ele{
  width:100px;
  height:100px;
  background:red;
  position:ausolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
}
```





### 弹性布局实现

```css
.father-ele{
  display:flex;
  justify-content:center;
  align-items:center;
}
.son-ele:{
  width:100px;
  height:100px;
  background:red;
}
```





## display:table实现：

```css
.parent{
  width:300px;
  height:300px;
  background:red;
  
  texe-align:center;
  display:table
}
.son{
  display:table-cell;
  background:green;
  verticel-align:middle;
}
```





## 相对定位

```css
.parent{
  width:100%;
  height:100%;
  background:red;
  
  margin:0;
  padding:0;
  
}
.son{
  width:100px;
  height:100px;
  background:green;
  
  margin:0 auto; // 左右居中
  position:relative;
  top：50%；
  // margin-top: -150px
  transform: translate(-50%);
}
```

