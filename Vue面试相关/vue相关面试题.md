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



## 