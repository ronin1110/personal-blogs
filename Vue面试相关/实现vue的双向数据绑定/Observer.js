/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-03-11 01:49:25
 * @LastEditors: yaolin
 */
// let data = {name: 'ronin769'}
// observe(data)
// // data.name = 'lalalla'

function Observer(data) { // 关注者类
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  constructor: Observer,
  walk(data){ // 遍历需要监听的对象
    let me = this
    Object.keys(data).forEach(key => {
      me.defineReactive(this.data, key, data[key]) // 遍历属性修改get和set
      // me.convert(key, data[key])
    })
    
  },
  // convert(key, val) {
  //   this.defineReactive(this.data, key, val)
  // },

  defineReactive(data, key, val) {
    let dep = new Dep() // 订阅器 
    let childObj = observe(val)

    Object.defineProperty(data, key, {
      enumerable:true,
      configurable:false,
      get(){
        if(Dep.target) { // 添加订阅者
          dep.depend()
        }
        return val
      },
      set(newVal) {
        if(newVal === val) {
          return
        }
        val = newVal
        childObj = observe(newVal)
        dep.notify() // 通知变化
      }
    })
  }

}

function observe(value) {
  if(!value || typeof value !== 'object') {
    return
  }
  return new Observer(value)
}

let uid = 0

function Dep() {
  this.id = uid++
  this.subs = [] // 订阅者数组
}

Dep.prototype ={
  addSub(sub) { // 添加订阅者
    this.subs.push(sub)
  },
  depend() {
    Dep.target.addDep(this)
  },
  removeSub(sub) { // 移除订阅者
    let index = this.subs.indexOf(sub)
    if(index !== -1) {
      this.subs.splice(index, 1)
    }
  },
  notify() { // 通知所有订阅者更新
    this.subs.forEach((sub) => {
      sub.updater()
    })
  }
}

Dep.target = null
