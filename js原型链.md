# js原型链

![img](file:///C:\Users\LENOVO\Documents\Tencent Files\1471656192\Image\Group2\J}\DI\J}DI$M%HKW$7%`ZQ%HVBLMN.jpg)

## 声明一个对象

```js
let p = new Person('张三', 20)
```

会进行以下三步：

1. var p={}; 初始化一个对象p。
2. p._proto_=Person.prototype;，将对象p的 __proto__ 属性设置为 Person.prototype
3. Person.call(p,”张三”,20);调用构造函数Person来初始化p。关于call/apply使用。



## 原型链

在js中，万物都是对象，每一个对象都有一个\_\_proto\_\_来指向原型对象，而对象通过一个构造函数来构造，所有构造函数有个prototype属性来指向原型，原型上也有一个constructor来指向构造函数，回到最初的原型，有个\_\_proto\_\_指向父原型。然后父原型也有个\_\_proto\_\_属性指向父的父原型，最终在Object().\_\_proto\_\_处结束（也就是对象都继承与对象原型），这样就构成了一条继承链。子对象可以使用所有的父元素对象的属性。也就是继承使用所有的祖上的‘财产’。

属性查找的时候也是会按照原型链的继承关系，向上查找，直到原型起点。



