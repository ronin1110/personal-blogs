# 关于js模块化2020/11/24

## 什么是模块化：

起因是因为随着js的发展，项目的体量越来越大，引用的文件越来越多，容易造成维护的困难，所以就有了模块化的概念，这是一种管理概念，一种生产方式，一个模块就是一个特定功能的文件，但是这种开发需要一种统一的规范，所以及拥有了AMD与CMD还有es6中的的模块化规范

## AMD（RequireJS）

Asynchronous Module Definition（异步模块定义)，核心是异步加载模块，模块加载不影响后面的语句的运行，都定义在一个回调函数里面，等加载完毕后，这个函数才会运行

一般使用define来定义模块，用require来加载模块

### 解决的问题：

1. 多个文件之间可能存在相互依赖来的关系，被依赖的文件需要先加载，
2. js加载是堵塞加载，会停止页面渲染，，文件越多，加载越慢

### 定义模块：

RuquireJS定义了一个define函数，用以定义模块

#### 语法：

```
define([id],[dependencies],factort)
```

#### 参数：

- id: 可选，字符串类型，定义模块标识，如果没有参数，默认就是文件名
- dependencies: 可选，字符串数组，AMD推崇前置依赖，即当前模块依赖的其他模块，模块的依赖必须在factory函数执行前解决完
- factory： 必需，初始化模块需要执行的函数或者对象，如果是函数，绘只被执行一次，如果是对象，此对象会作为模块的输出值

```js
// mod1.js
define('mod1',[],function(){
    // ...
    return {
        // ...
    }
})

// mod2.js
define('mod2', ['mod1'], function (mod1) {
    // ...
    return {
        // ...
    }
})
```

### 模块的加载：

#### 语法：

```sj
require([denpencies],  function(){})
```

#### 参数：

- denpencies：字符串数组，依赖名
- function：函数，在所有的模块加载成功后进行回调，依赖的模块会以参数的形式传入该函数，从而在这个回调函数内部就可以调用这些模块

**require()函数是异步的，所以不会让浏览器失去响应**



## CMD（SeaJs）

CMD(Common Modeule Defined)，通用模块定义，解决问题和AMD规范是一样的，只不过在模块定义的当时和模块加载的实际不同，需要SeaJS

### 定义模块：

与AMD一样，define函数，用以定义函数，

#### 语法：

```js
define(id,deps,factory)
```

#### 参数：

- id：可选，字符串类型，默认是文件名
- deps：可选，字符串数组，当前模块依赖的模块，CMD推崇依赖就近
- factory：回调函数，工厂方法，初始化模块需要执行的函数，或者是对象，函数的话，执行一次，对象的话，会作为函数输出值

```js
// cmd1.js
define(function(require,exports,module){
    // ...
    module.exports={
        // ..
    }
})

// cmd2.js
define(function(require,exports,module){    
    var cmd2 = require('./cmd1') 
    // cmd2.xxx 依赖就近书写
    module.exports={
        // ...
    }
})
```

### 加载模块：

#### 语法：

```js
seajs.use([dependencies], function(){})
```

#### 参数：

- deps：字符串数组；模块的名字
- func：加载成功后回调，依赖参数会以参数的形式传入该函数，函数内部就可以使用这些模块，





## ES6的mudule语法和加载实现

### es6的module静态加载的好处：

```js
import { stat, exists, readFile } from 'fs'
```

静态加载中，不再加载整个文件，只需加载需要的（也就是括号里的三个方法）

### 语法：

主要两个命令：export与import

#### export命令：

##### 输出变量：

```js
// people.js
export var name = 'yaoyao'
export var height = '180'
export var age = 12

// 或者可以这样写
var name = 'zhangsan'
var height = 180
var age = 18

export { name, height, age }
```

##### 输出函数或者类：

```js
export function add (x, y) {
    return x + y
}
```

##### 输出别名（as 关键字）

```js
function a1 () {}
function a2 () {}
function a3 () {}
export {
	a1 as s1,
    a2 as s2,
    a3 as s3
}
```

#### import命令（加载命令）

```js
import { name, height, age } from './people.js'

function getPeople () {
    return `${name} is ${height} cm`
}
```

实现了按需加载节省了资源

#### 模块的整体加载

```js
import * as people from './people.js'
```

