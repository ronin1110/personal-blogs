# js中类的继承

类的创建：

```js
//定义一个动物类
function Animal(name) {
	this.name = name;  //属性
	this.sleep = function() {   //实例方法
		console.log(this.name + 'sleep...');
	}
}
//在原型链上添加一个原型方法
Animal.prototype.eat = function(food) {
	console.log(this.name + 'eat...' + food)
}
```



## 原型链继承

```js
function Cat () {
}
Cat.prototype = Animal()
Cat.prototype.name = 'cat' // 同等于Animal.name = 'cat'
let cat = new Cat
```

![image-20201211205453293](C:\Users\LENOVO\AppData\Roaming\Typora\typora-user-images\image-20201211205453293.png)



可以看到 cat对象继承了Animal的属性还有方法，包括所有原型链上的数据

特点：

既是父类的实例，又是子类的实例

缺点：不能实现多继承（prototype属性只能有一个）

## 构造继承

使用父类的构造函数来增强子类实例，等于是*复制*父类的实例属性给子类（没用到原型）。

```js
function Cat() {
    Animal.call(this);
    this.name = name || 'cat';
}
var cat = new Cat();
```

运行结果

![](https://img-blog.csdnimg.cn/20200424142117872.png)



可以看到只继承了父类的属性（name）和方法(sleep())，并没有继承原型链上的方法eat（），

**理解上就是在类上通过apply或者call方法，运行父类的构造函数**所以不会继承原型链上的数据

但是可以多继承，通过多次运行不同的类的构造函数

特点：可以实现多继承。
缺点：只能实现继承父类的属性和方法，不能继承原型链上的属性和方法。



## 组合继承

相当于构造继承和原型链继承的组合体。通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用。

```js
function Cat() {
    Animal.call(this);
    this.name = name || 'cat';
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat = new Cat();
```

控制台输出，通过对比前面介绍的**原型链继承**的控制台输出，可以明显的发现其调用了两份父类构造函数。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042414425122.png)



缺点：调用了两次父类构造函数，生成了两份实例。

## 寄生组合继承

可以说是组合继承的优化。通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例。



```js
function Cat() {
    Animal.call(this);
    this.name = name || 'cat';
}
(function() {
    //创建一个空对象
    var Super = function() {};
    //将实例作为子类的原型
    Super.prototype = Animal.prototype;
    Cat.prototype = new Super();
}) ()
var cat = new Cat();

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200424150930732.png)