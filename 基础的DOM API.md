# 基础的DOM API

1. 获取
2. 创建
3. 添加
4. 删除

```js
const node = document.getElementById(id); // 获取元素，或者querySelect('.class || #id || name')

const addNode = document.createElement(name) // 创建 div p span h1…… 
addNode.innerHtml = ''

document.body.appendChild(addNode); // 添加

document.body.removeChild(node)
```

