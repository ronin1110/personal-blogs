# vue相关面试题

## vue框架的优势

1. 轻量级：只关注图层，大小只有几十kb
2. 简单易学：文档通顺，语法简单，上手快
3. 数据啥双向绑定：数据视图结构分离，操作数据就可作用于图层
4. 组件化开发：工程结构清晰，代码维护方便
5. 虚拟DOM加载html节点，效率高。



## 什么是MVVM

MVVM是Model-View—ModelView的缩写，是一种脱胎于MVC模式的设计模式。

Model表示数据层，负责业务相关的数据

View表示视图层，负责在页面上展示数据

View-Model的作用是同步View与Model之间的关联，其实实现同步关联的核心是DOM Listeners和Data Bindings连个工具，Dom Listener工具用于监听View中DOM的变化，并会选择性的传给Model，Data Bindings 工具用于监听Model数据变化，并将其更新给View

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0b7be8c807844a78993bc28bbb1585c~tplv-k3u1fbpfcp-zoom-1.image)



## 组件之间传值的方法

### 父组件像子组件传值

1. 父组件在标签中绑定自定义属性
2. 子组件通过props进行接收

```vue
// 父组件
export default {
	conponents: {
		child
	}
}
<child :name='123'></child>

// 子组件
export default {
	props: ['name']
}
```



### 子组件想父组件进行传值

1. 在父组件的子组件标签上绑定自定义事件
2. 子组件通过this.$emit() 方法触发自定义事件，传值给父组件

```vue
// 父组件
export default {
	components: {child},
	data:{name:'123'},
	methods: {
    changeName(val) {
			this.name = val
    }
	}
}

<child @changeName= 'changeName'></child>

// 子组件
export default {
	methods: {
		changeName:val=>{
			this.$emit('changeName', '456')
		}
	}
}
<button @click= 'changeName'></button>
```

### 兄弟组件之间的传值

1. 传给共同的父组件，父组件在分发
2. 使用vuex
3. 利用bus 事件总线

```vue
let bus = new Vue()
a组件：methods:{函数：{bus.$emit('事件名'， 数据)}// 发送
b组件：created(){bus.$on('a传过来的事件名', 处理函数)} // 接收
```





## vue的生命周期钩子函数

一共有8个

1. 创建阶段：
   BeforeCreate：在Vue的实例初始化后，组件创建，数据监测，watch/event事件配置前调用，此时不能访问data，ref，Vue实例对象上仅有生命周期函数和部分默认事件
   created：在组件创建完成后调用，此时数据监测，事件配置已完成，data对象可以访问，但组件还没有渲染成html模板，ref仍为undefined，$el尚不可用

   **如果此阶段要对DOM进行操作，就应放在Vue.nextTick的回调函数中，应为此阶段DOM尚未被渲染，无法执行DOM操作，Vue.nextTick会在下次DOM更新循环结束的之后，执行延迟回调，在修改数据之后回去更新后的DOM**

2. 挂载阶段：
   BeforeMount：该函数在挂载前调用，此时Html模板编译已经完成，虚拟Dom已经存在，$el为可用状态，但是ref仍不可用，
   **一般在此进行数据的获取**
   Mounted:在挂载后进行调用，这时$el元素被Vm.$el替代，ref可进行操作。
   **一般在这进行异步请求的发送操作，Mounted不会保证所有的子组件一起挂载，如果希望所有的视图都加载完毕，可以在Mounted内部使用vm.nextTick()操作**

3. 更新阶段
   BeforeUpdate：在数据更新，虚拟dom打补丁前调用
   **适合在更新之前访问所有的DOM，比如手动移除添加的事件监听器**
   updated：在数据更新，虚拟Dom打补丁后调用，

4. 卸载阶段
   BeforeDestory：该函数在实例销毁前调用，这时实例完全可用，ref仍然存在，
   **一般在这个阶段进行性能优化操作，比如清除计时器，防止内存泄漏**
   destoryed：在实例销毁后调用，此时Vue李默庵所有的指令都被解绑，所有事件监听器都被移除，ref状态为undefined
   **组件销毁前，先销毁父组件，后销毁子组件**



针对keep-alive组件的两个钩子函数

1. actived：在被keep-alive缓存的组件启用时调用，
2. deactived：在被keep-alive缓存的组件停用时调用，

![微信图片_20201017092359.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad42e2e3e86b432ab39d3591540bd5ed~tplv-k3u1fbpfcp-zoom-1.image)





## 为什么vue中的data必须是个函数

​	如果data是个对象，挡在复用组件的时候，data会指向同一个引用类型的地址，其中一个组件的data一旦发生修改，则其他重用的组件中的data也会一并修改，

​	如果data是个返回对象的函数，因为每次组件返回的都是一个新的对象，引用地址不同，所以不会出翔上面的情况。



## vue中v-show和v-if的区别

v-if在切换的时候，会对标签进行穿件或者销毁，不显示的不会再DOM树里面。v-show在切换的时候，会作用在标签的css属性display上，v-if的切换开销比v-show大，频繁切换适合使用v-show



## Vue中计算属性computed和侦听属性watch的区别

### 计算属性:computed

1. 支持缓存,只有依赖的数据变化的时候,才会重新计算
2. 计算属性不支持异步操作
3. 计算属性所有一个默认的get(默认具有,获取计算属性,和set(手动 添加,设置计算属性)方法
4. 计算属性自动监听依赖值的变化,从而动态返回内容

### 侦听属性watch

1. 不支持缓存,只要珊瑚橘变化,就会执行相关函数
2. 支持异步操作
3. 侦听属性的值可以是个对象,接受handler回调，deep，immediate三个属性
4. 监听是个过程，监听的值变化的时候，可以触发一个回调，进行一些操作



```js
watch: { 
	obj: { 
    	//handler接收两个参数（newVal：新值，oldVal：旧值 
    	handler: function(newVal, oldVal){ 
    		console.log(newVal); 
		}, 
	deep: true,//设置为true时会监听对象内部值的变化； 
	immediate: true//设置为true时会立即以表达式的当前值触发回调； 组件创建的时候立即获取一次列表的数据，同时监听<input/>框，每当发生变化的时候重新获取一次筛选后的列表。
	} 
}

```



## $nextTick是什么

vue的响应式并不是数据发生变化之后立即更新Dom，使用vm.$nextTick是在下次更新循环结束之后，立即执行延迟回调，在修改数据之后使用，就可以获取更新后的Dom



## v-for中的key的作用是什么？

key是vue中使用v-for渲染的节点标示，使用key之后，当列表项发生变化时，vue会基于key的变化而重新排列元素顺序，并且移除key不存在的元素，提高运行效率

## vue的双向数据绑定原理是什么

vue采用的是**数据劫持+发布订阅模式**实现的双向绑定，通过Object.defineProperty()方法来为组件中data的每个属性添加get和set方法，在数据变动时，触发set里面相应的监听监听回调函数，将变动信息发布给订阅者，主要有以下步骤：

1. 组件初始化：
   创建一个dep对象作为观察者，（依赖收集，订阅发布的载体）
   通过Object.defineProperty()方法对data中的属性及子属性对象的属性 添加getter和setter方法，通过getter方法，可以去dep里面注册函数，调用setter时，便去通知执行刚刚注册的函数
2. 组件挂载时：
   compile解析模板指令，将其中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定上更新函数，监听函数，后续其中的变量发生变化，便会更新页面，页面发生变化，也会相应发布变动信息
   组件同时还会定义一个watcher类作为订阅者，watcher可以视作dep和组件之间的桥梁，其在实例化时会向dep中添加自己，同时自身又有一个update方法，待收到dep的变动通知的时候们就会调用自身的update方法，触发compile中的相应函数完成是更新，

![data.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c94a6e6ceba4ff193d3d518a3a52c7e~tplv-k3u1fbpfcp-zoom-1.image)

### 如何动态刷新对象或者 数组的值？

由于Object.defineProperty()的限制，vue无法监听到对象或者树内部的属性值的变化，所以在我们直接设置以上两种数据的值时，页面不会实时刷新，设这时，可以通过this.$set方法来解决

> //this.$set(要改变的数组/对象，要改变的位置/key，要改成的value) this.$set(this.arr, 0, "OBKoro1");
> // 改变数组 this.$set(this.obj, "c", "OBKoro1"); // 改变对象
>
> 数组原生方法造成的数据更新，可以被 Vue 监听到。如 splice()push()pop()等。
>
> 



## 常用的事件修饰符

- .stop：阻止冒泡
- .prevent：阻止默认行为
- .self：仅绑定的元素自生可触发
- .once：只触发一次



## Vue如何获取dom元素

首先给标签设置ref属性，然后可以通过this.$refs.属性值获取

```html
<div ref="test"></div>

const dom = this.$refs.test

```

## 如何通过v-on绑定多个事件

通过v-on传入对象来绑定多个事件：

```html
<!--单事件绑定-->
<input type="text" @click="onClick">
<!--多事件绑定-->
<input type="text" v-on="{ input:onInput,focus:onFocus,blur:onBlur }">


```

## vue初始化页面闪动问题如何解决

原因：vue代码尚未被解析之前，尚无法控制页面中Dom的显示，所以会看到模板字符串等代码

解决：css代码中添加v-cloak规则，同时在编译的标签上添加v-cloak属性：

```vue
[v-cloak] { display: none; }

<div v-cloak>
  {{ message }}
</div>
```

## vue如何清理浏览器缓存

1. 项目打包的时候给每个打包文件加上hash值，一般是时间戳
2. 在html文件加上meta标签，content属性设置为no-cache
3. 服务器静止缓存

## vue-router路由有哪些模式？

1. hash模式，后面的hash值发生变化，浏览器不会像服务器请求资源，浏览器也不会刷新，每次hash的变化会触发hashchange事件，路由中#之后的内容，
2. history模式：利用html5中新添加的pushState()和replaceState()方法，两个方法用于流量拿起的历史记录栈，在当前已有的back，forward，go的基础上，他们提供了对历史记录惊醒修改的功能，只有当他们执行修改的时候，虽然改变了当前的URL，但浏览器不会立即向后端发送请求

## vue-cli项目中每个文件夹和文件的用处大致是什么，

1. build文件夹：存放webpack的相关配置和脚本文件，实际开发中一般用来配置less，babel和配置webpack.base.config.js文件
2. config文件夹，常用到这个文件夹下面的config.js(index.js)文件配置开发环境的端口号，是否开启热加载或者设置生产环境的静态资源相对路径，是否开启gzip压缩，npm run build命令打包的生成的静态资源的名称和路径等
3. node_module文件夹，存放npm install命令下载的开发环境和生产环境的各种依赖，
4. src文件夹，源码，图片样式资源，入口文件，路由配置

## vue-cli项目中assets和static文件夹的区别

都用于存放项目中的静态资源

asset文件夹中文件在运行npm run build的时候会打包，就是会被压缩，代码格式化之类的，打包后会放到static中，static文件不会被打包



## vuex是什么？有哪些属性？

vuex是专门为vue设计的状态管理工具，用于集中管理vue中所有组件的状态

1. state属性：基本数据

2. getters属性：从state中派生出的数据

3. mutation属性：更新store中的唯一途径，其接收一个以state为第一参数的回调函数

   ```js
   const store = new Vuex.Store({
     state: {
       count: 1,
     },
     mutations: {
       increment(state) {
         // 变更状态
         state.count++;
       },
     },
   });
   
   ```

4. action属性：提交mutation以更新state，其中可包含异步操作

   ```js
   const store = new Vuex.Store({
     state: {
       count: 0,
     },
     mutations: {
       increment(state) {
         state.count++;
       },
     },
     actions: {
       increment2(context) {
         context.commit('increment');
       },
       fun(context) {
         context.dispatch('increment2');
       },
     },
   });
   
   ```

5. module属性：用于分割store分割成不同的模块

   ```js
   const moduleA = {
     state: () => ({ ... }),
     mutations: { ... },
     actions: { ... },
     getters: { ... }
   }
   
   const moduleB = {
     state: () => ({ ... }),
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       a: moduleA,
       b: moduleB
     }
   })
   
   store.state.a // -> moduleA 的状态
   store.state.b // -> moduleB 的状态
   
   ```

   

