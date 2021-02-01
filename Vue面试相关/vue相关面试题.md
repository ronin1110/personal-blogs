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



