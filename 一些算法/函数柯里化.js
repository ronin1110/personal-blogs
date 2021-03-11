/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-01-04 23:28:36
 * @LastEditors: yaolin
 */
// 第一种 add（a,b,c,d） === currying(add) (a,b,c...)
let add = (...args) => {
  return args.reduce((total,currValue) => {
      return total + currValue
  })
}


let currying = (func) => {
  return function(...args) {
      return func.apply(this, args)
  }
}
add(1,2,3,4,5,6) === curring(add)(1,2,3,4,5,6)


// 第二种 add(1,3)(2)(3)() === 9

function add() {
  // 利用闭包，不断保存 arguments
  let _args = [].slice.call(arguments)
  
  // _add函数用已返回
  let _add = function () {

    // 当后面没有参数的时候 调用之前保存的_args进行数据操作 这里是进行累加 当然可以进行其他操作
    if(arguments.length === 0) {
      return _args.reduce(function(total,currentValue) {
        return total + currentValue
      })
    } else {
      _args.push.apply(_args, arguments)
      // 当还有参数的时候，把参数压入_args 进行保存，然后返回一个函数
      return _add
    }
  }
  return _add
}
console.log(add(1,2,3,4)(5,7,6,5)() ) // 33


// 第三种 面试题老看到的 add(1,2,3,34)(4,4,6)

function add () {
  let _args = [].slice.call(arguments)

  let _add = function() {
    _args.push(...arguments)
    return _add
  }
  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _add.toString = function () {
    return _args.reduce(function(total,currentValue) {
      return total + currentValue
    })
  }

  return _add
}
console.log(add(1,2,3,4)(5,7,6,5) ) // 33 这里其实是