# promise

Promise 对象代表了未来将要发生的事件，用来传递异步操作的消息。

Promise对象有三个状态

1. pending: 初始状态，不是成功或失败状态。
2. fulfilled: 意味着操作成功完成。
3. rejected: 意味着操作失败。

只有异步操作的结果才可以决定当前的对象状态，切状态的切换是不可逆的，也就是只能从pending到fulfilled或rejected，而无法从fulfilled或rejected转换到pending



## 创建

```js
var promise = new Promise(function(resolve, reject) {
    // 异步处理
    // 处理结束后、调用resolve 或 reject
});
```

也就是用构造函数实例化一个Promise的对象



Promise构造函数接受一个函数作为参数，函数的参数是resolve和reject：分别代表异步操作成功后的操作和异步操作失败后的操作，

但是当我们直接创建Promise对象的时候，异步函数就已经执行了，也就是造我们new的阶段，promise对象中的操作就会执行，所以一般我们会封装成函数，

```js
function runAsync(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;            
}
```

这样就封装了一个new的过程，会返回给我们一个Promise对象，我们就可以再根据Promise对象的一些其他方法接下去



## then函数

```js
runAsync().then(function(data){
    console.log(data);
    //后面可以用传过来的数据做些其他操作
    //......
});
```

then函数接受一个函数参数，接受的函数的参数就是在Promise对象中resolve()中的data，当然这个传入的参数也可以是Promise对象，就可以再在后面接上then函数处理，就用到了链式调用

```js
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return runAsync3();
})
.then(function(data){
    console.log(data);
});
```

就是在Promise的异步操作之后，当处理的then函数也会返回一个Promise对象的时候，就可以继续在后面加上then处理函数，就可以套娃。



## catch函数

我们上面讨论到的只有函数执行机构成功的情况，那当异步函数执行失败的时候呢，对应的就是异步函数传入参数中的reject函数，用以处理执行失败的函数，

```js
getNumber()
.then(
    function(data){
        console.log('resolved');
        console.log(data);
    }, 
    function(reason, data){
        console.log('rejected');
        console.log(reason);
    }
);
```

一种是，我们可以在then处理函数中传入两个函数参数，第一个是处理resolve的函数，第二个就是处理reject的函数，另一种就是catch函数，与第一种一模一样吗，用已指定reject的回调

```js
getNumber()
.then(function(data){
    console.log('resolved');
    console.log(data);
})
.catch(function(reason){
    console.log('rejected');
    console.log(reason);
});
```

效果相同



不同的是，catch还有一个作用，当我们在执行resolve回调函数的时候，如果代码出错，出错原因会当做参数传入catch的回调函数中，代码不会报错，与try，，，catch相同功能



## all函数

Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。

```js
Promise
.all([runAsync1(), runAsync2(), runAsync3()])
.then(function(results){
    console.log(results);
});
```

用Promise.all来执行，all接收一个数组参数，里面的值最终都算返回Promise对象。这样，三个异步操作的并行执行的，等到它们都执行完后才会进到then里面。那么，三个异步操作返回的数据哪里去了呢？都在then里面呢，all会把所有异步操作的结果放进一个数组中传给then，就是上面的results。（数组）

，可以用于网页初始化的时候，等多种所有资源加载完毕后再进行初始化，

## race函数

all方法的效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是race方法，这个词本来就是赛跑的意思。race的用法与all一样，我们把上面runAsync1的延时改为1秒来看一下：

```js
Promise
.race([runAsync1(), runAsync2(), runAsync3()])
.then(function(results){
    console.log(results);
});
```

这三个异步操作同样是并行执行的。结果你应该可以猜到，1秒后runAsync1已经执行完了，此时then里面的就执行了。在then里面的回调开始执行时，runAsync2()和runAsync3()并没有停止，仍旧再执行。于是再过1秒后，输出了他们结束的标志