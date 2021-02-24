# ES6新增

## let和const

### let

- let 定义变量，变量不可以再次定义，但可以改变其值
- 具有块级作用域。（即大括号）
- 没有变量提升，必须先定义再使用
- let声明的变量不会压到window对象中，是独立的

**如果使用var声明了变量，也不能再次用let声明了，反之也是不行的。原因也是这个变量已经被声明过了。**

### const

- 使用const关键字定义常量
- 常量是不可变的，一旦定义，则不能修改其值
- 初始化常量时，必须给初始值
- 具有块级作用域
- 没有变量提升，必须先定义再使用
- 常量也是独立的，定义后不会压入到window对象中

### 对比

| 关键词 | 变量提升 | 块级作用域 | 初始值 | 更改值 | 通过window调用 |
| ------ | :------: | :--------: | :----: | :----: | :------------: |
| let    |    no    |    yes     |   -    |  yes   |       no       |
| const  |    no    |    yes     |  yes   |   no   |       no       |
| var    |   yes    |     no     |   -    |  yes   |      yes       |



## 解构赋值

### 数组解构赋值

```js
// 情况1，变量和值一一对应
let arr = [5, 9, 10];
let [a, b, c] = arr;
console.log(a, b, c); // 输出 5 9 10

// 情况2，变量多，值少
let arr = [5, 9, 10];
let [a, b, c, d] = arr;
console.log(a, b, c, d); // 输出 5 9 10 undefined

// 情况3，变量少，值多
let arr = [5, 9, 10, 8, 3, 2];
let [a, b] = arr;
console.log(a, b); // 5, 9

// 情况4，按需取值
let arr = [5, 9, 10, 8, 3, 2];
let [, , a, , b] = arr; // 不需要用变量接收的值，用空位占位
console.log(a, b); // 10, 3 

// 情况5，剩余值
let arr = [5, 9, 10, 8, 3, 2];
let [a, b, ...c] = arr; // ...c 接收剩余的其他值，得到的c是一个数组
console.log(a, b, c); 
// 结果：
// a = 5, 
// b = 9, 
// c = [10, 8, 3, 2]

// 情况6，复杂的情况，只要符合模式，即可解构
let arr = ['zhangsan', 18, ['175cm', '65kg']];
let [, , [a, b]] = arr;
console.log(a, b); // 175cm 65kg
```



### 对象解构

```js
// 情况1，默认要求变量名和属性名一样
let { foo, bar } = {foo: 'aaa', bar: 'bbb'};
console.log(foo, bar); // aaa, bbb
let {a, c} = {a: 'hello', b: 'world'};
console.log(a, c); // hello, undefined

// 情况2，可以通过:为变量改名
let {a, b:c} = {a: 'hello', b: 'world'};
console.log(a, c); // hello, world

// 情况3，变量名和属性名一致即可获取到值，不一定要一一对应
let {b} = {a: 'hello', b: 'world'};
console.log(b); // world
// 此时，没有定义变量a，所以使用a会报错

// 情况4，剩余值
let obj = {name:'zs', age:20, gender:'男'};
let {name, ...a} = obj;
console.log(name, a);
// 结果：
// name = zs
// a = {age: 20, gender: "男"};

// 情况5，复杂的情况，只要符合模式，即可解构
let obj = {
    name: 'zhangsan',
    age: 22,
    dog: {
        name: '毛毛',
        age: 3
    }
};
let {dog: {name, age}} = obj;
console.log(name, age); // 毛毛 3
```



## 函数和参数

### 箭头函数

使用箭头定义函数 `=> goes to`，目的是**简化函数的定义**并且里面的this也比较特殊



基本定义：

```js
// 非箭头函数
let fn = function (x) {
    return x * 2;
}
// 箭头函数，等同于上面的函数
let fn = (x) => {
    return x * 2;
}
```



- 形参只有一个就可以省略小括号

```js
let fn = (x) => {
    return x * 2;
}
// 等同于
let fn = x => {
    return x * 2;
}
```

- 函数体只有一句话，可以省略大括号，并且表示返回函数体的内容

```js
let fn = (x, y) => {
    return x + y;
}
// 等同于
let fn = (x, y) => x + y;
```

- 箭头函数内部没有 arguments

```js
let fn = () => {
    console.log(arguments); // 报错，arguments is not defined
};
```

- 箭头函数内部的 `this` 指向外部作用域中的 `this` ，或者可以认为箭头函数没有自己的 `this`

```js
 // 这里必须用var，因为用let声明的变量不能使用window调用
    var name = 'lisi';
    let obj = {
        name: 'zhangsan',
        fn: () => {
            console.log(this); // window对象
            console.log(this.name); // lisi
        }
    };
    obj.fn();
```

- 箭头函数不能作为构造函数

```js
let Person = () => {
    
};
let obj = new Person(); // 报错，Person is not a constructor
// 箭头函数中都没有自己的this，不能处理成员，所以不能当构造函数
```

### 参数的默认值

```js
function fn(x, y = 'world') {
    console.log(x, y);
}
fn(2)
fn(2,3)
//打印结果
//2 “world”
//2 3
```



### rest参数

剩余参数，以 `…`修饰**最后**一个参数，把多余的参数都放到一个**数组**中。可以替代 **arguments** 的使用。
**rest 参数只能是最后一个参数。**



```js
// 参数很多，不确定多少个，可以使用剩余参数
function fn(...values) {
    console.log(values); // [6, 1, 100, 9, 10]
}
// 调用
console.log(fn(6, 1, 100, 9, 10)); //undefined


function fn(a, b, ...values) {
    console.log(a); // 6
    console.log(b); // 1
    console.log(values); // [100, 9, 10]
}
// 调用
console.log(fn(6, 1, 100, 9, 10)); //undefined
```





## 内置函数的扩展

#### 扩展运算符：...

`...`可以把数组中的每一项展开

```js
// 合并两个数组
let arr1 = [1, 2];
let arr2 = [3, 4];
let arr3 = [...arr1, ...arr2];
console.log(arr3); // [1, 2, 3, 4]
// 把数组展开作为参数，可以替代 apply
// 求数组的最大值
let arr = [6, 99, 10, 1];
let max = Math.max(...arr); // 等同于 Math.max(6, 99, 10, 1);
```



#### Array.from()

把伪数组转成数组

- 伪数组必须有length属性，如果没有将返回一个空数组
- 转换后的数组长度，是根据伪数组的length决定的

```js
let fakeArr = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};
let arr = Array.from(fakeArr);
console.log(arr); // ['a', 'b', 'c']
// 转数组的对象必须有length值，因为得到的数组的成员个数是length指定的个数
// 上例中，如果length为2，则得到的数组为 ['a', 'b']
```



#### find()方法和findIndex()方法

- find()：用于查找数组中的值
- findIndex()：用于查找数组的下标，用法与find一样

```js
    let value = [3, 5, -1, -4, 6].find((item, index, arr) => {
        console.log(item); //表示数组的每个值
        console.log(index); //表示数组的每个下标
        console.log(arr); //表示整个数组
        //如果需要查找，要用到return 条件；
        return item < 0; //find方法会返回第一个满足条件的值，-1
        //如果是findIndex方法，会返回第一个满足条件的值的下标，2
    });
    console.log(value);
```

- **find** 找到数组中第一个满足条件的成员并**返回该成员**，如果找不到返回**undefined**。
- **findIndex** 找到数组中第一个满足条件的成员并**返回该成员的索引**，如果找不到返回 **-1**。



#### includes()方法

- 判断数组是否包含某个值，返回 true / false
- 参数1，必须，表示查找的内容
- 参数2，可选，表示开始查找的位置，0表示开头的位置

```js
let arr = [1, 4, 3, 9];
console.log(arr.includes(4)); // true
console.log(arr.includes(4, 2)); // false， 从2的位置开始查，所以没有找到4
console.log(arr.includes(5)); // false
```



#### includes(), startsWith(), endsWith()

- includes(str, [position])   返回布尔值，表示是否找到了参数字符串
- `startsWith(str, [position])`         返回布尔值，表示参数字符串是否在原字符串的头部或指定位置
- `endsWith(str, [position])`            返回布尔值，表示参数字符串是否在原字符串的尾部或指定位置

```js
console.log('hello world'.includes('e', 2)); // false 从位置2开始查找e，没有找到
console.log('hello world'.includes('e')); // true
console.log('hello world'.startsWith('h')); // 未指定位置，看开头是否是h，返回true
console.log('hello world'.startsWith('l', 2)); // 指定位置的字符是l，返回true
console.log('hello world'.endsWith('d')); // 未指定位置，结尾是d，返回true
console.log('hello world'.endsWith('r', 9)); // 指定位置的字符是r，返回true
```

#### repeat()方法

`repeat`方法返回一个新字符串，表示将原字符串重复`n`次。

```js
let html = '<li>itheima</li>';
html = html.repeat(10);
```



## 新增的对象Set

数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
`Set`本身是一个构造函数，用来生成 Set 数据结构。
Set的特点就是该对象里面的成员不会有重复。

### 使用

`let set = new Set();` 得到一个空的Set对象。



### 属性

size`：属性，获取 `set` 中成员的个数，相当于数组中的 `length

`add(value)`：添加某个值，返回 Set 结构本身。

`delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。

`has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。

`clear()`：清除所有成员，没有返回值。



```js
    let set = new Set();
    //调用set对象内置的add方法，想set中添加数据。
    set.add(3);
    set.add(8);
    set.add(9);
    set.add(3); //添加失败但不报错，set中的成员不能重复
    console.log(set); // {3,8,9}
    console.log(set.size); //3
```



初始化Set的时候，也可以为其传入数组或字符串，得到的Set对象中的成员不会有重复。**根据这个特点可以完成数组或字符串去重。**

```js
    let set = new Set([4, 8, 9, 5, 4, 8, 4, 2]);
    console.log(set); //Set(5) {4,8,9,5,2}
    let arr = [...set]; //将set中的每个值展开，然后放到数组中
    console.log(arr); //(5) [4, 8, 9, 5, 2]
    let str = new Set('abcdacbdcbac'); 
    console.log(str); //Set(4) {"a", "b", "c", "d"}
    console.log([...str].join('')); //abcd
```

