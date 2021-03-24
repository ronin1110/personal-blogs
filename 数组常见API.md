# 数组常见API

| API         | 作用                                  |
| ----------- | ------------------------------------- |
| push        | 尾部添加元素                          |
| unshift     | 头部添加元素                          |
| pop         | 数组尾部移除元素                      |
| splice      | 操作数组元素（删除或增加 ：参数控制） |
| slice       | 截取数组元素                          |
| indexOf     | 查找某一个元素第一次出现的位置        |
| lastIndexof | 查找某一元素最后一次出现的位置        |
| findIndex   | 查找某元素第一次出现的位置            |
| forEach     | 遍历数组                              |
| map         | 遍历数组                              |
| filter      | 过滤数组                              |
| some        | 包含某元素                            |
| every       | 所有元素和某元素一致                  |
| includes    | 查找是否包含某元素                    |
| concat      | 合并元素                              |
| join        | 合并数组，变成字符串                  |
| toString    | 变成字符串                            |
| sort        | 元素排序                              |





## slice与splice

**slice（first，end）**的参数是first与end含义是截取的index,会返回一个新的数组，

**splice（index，howmany，item1，item2……）**index表示要增加或删除的位置，howmany是指需要删除的元素的个数，后面的item就是需要添加的元素具体。howmany如果为0，就代表不减，然后加上后面的元素





## forEach和map

两者都是会执行一个回调函数，便利执行数组中的每一项，支持有三个参数：array.map(function(item,index,array){……操作})

匿名函数的this指向都是window

forEach没有返回值，map有返回值，需要return出来



## filter函数

filter函数用指定的函数去校验每一个数组元素，并创建包含每一个通过测试的元素的数组，

示例：array.filter(function(item,index,array) {return item>3})



## sort函数

sort函数如果直接调用会按照英语字母的升序排序

也可以传入函数参数，实现对数字的排序

array.sort() // 数字升序

array.sort(dunction(a, b) { return a - b}) // 数字升序

array.sort(dunction(a, b) { return b - a}) // 数字降序

