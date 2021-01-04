# 对于js原型链的个人理解

![img](https://upload-images.jianshu.io/upload_images/15932532-cb246befed007789.png?imageMogr2/auto-orient/strip|imageView2/2/w/638/format/webp)

借用网上找到的一张图，我们从实例对象**b,c**来看，首先在b中，对象有着自己的数据，这就不说了，然后会有一个\_\_proyo\_\_的属性，那这个属性指向的是什么呢，指向的是这个对象的原型对象，也就是继承的父辈对象，在说到这个对象怎么创建的呢？是通过new Foo的操作实现的，这个Foo就是个构造函数，这个构造函数中有个一个prototype的属性，指向原型对象，也就是之前对象的\_\_proyo\_\_指向的对象，（b.\_\_proyo\_\_ ===  Foo.prototype）,同样，由于我们的js中万物皆对象，作为构造函数，其实就是一种特殊的对象，那我们前面说到了，对象都有一个\_\_proyo\_\_属性，那构造函数的\_\_proyo\_\_指向谁呢，就是Function构造函数的prototype属性指向的对象，也就是我们新建函数时用到的new function(){}的function构造函数的原型，那这个function.prototype的\_\_proyo\_\_指向的就是js继承链的根本Object对象了，在说到我们说到b的原型对象也一样，首先有个constructor指向本身的构造函数Foo，然后对象的\_\_proyo\_\_属性指向的就是上一级的原型对象（或者如果继承链到头了，指向的就是Object.prototype，也就是根对象）。







# 顺带复习一下new一个对象的过程

有个person类

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
var person = new Person("Alice", 23);
```



1. 创建一个空的对象

   ```js
   var obj = {}
   ```

   

2. 设置类中的this指针指向obj，然后执行构造函数的操作

   ```js
   var result = Person.call(obj)
   ```

   

3. 设置原型链（原型链继承）将obj的`__proto__`成员指向了Person函数对象的`prototype`成员对象

   ```js
   obj.__proto__ = Person.prototype
   ```

4. 判断Person返回类型，如果是基础类型，就直接返回obj，如果是对象，就返回引用result

   ```js
   if (typeof(result) === 'object') {
     person = result
   } elese {
     person = obj
   }
   ```

   

**与上面的原型链中所说的是完全吻合的**



## 实现一个new函数



```js
function myNew(constructor, ...arg) {
  var obj = Object.create(constructor.prototype) 
  // var obj = {}
  var res = constructor.apply(obj, arg)
 //  obj.__proto__ = constructor.prototype
  return typeof(res) === 'object' ? res : obj
}

function Person (name) {
  this.name = name
}

let test = myNew(Person, 'yaolin')
```

