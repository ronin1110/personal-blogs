/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-03-11 01:49:25
 * @LastEditors: yaolin
 */
// let data = {name: 'ronin769'}
// observe(data)
// // data.name = 'lalalla'

function Observer(data) { // 关注插者类
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  constructor: Observer,
  walk(data){
    let me = this
    Object.keys(data).forEach(key => {
      me.convert(key, data[key])
    })
    
  },
  convert(key, val) {
    this.defineReactive(this.data, key, val)
  },

  defineReactive(data, key, val) {
    let dep = new Dep()
    let childObj = observe(val)

    Object.defineProperty(data, key, {
      enumerable:true,
      configurable:false,
      get(){
        if(Dep.target) {
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
        dep.notify()
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
  this.id = uid
  this.subs = [] // 订阅者数组
}

Dep.prototype ={
  addSub(sub) {
    this.subs.push(sub)
  },
  depend() {
    Dep.target.addDep(this)
  },
  removeSub(sub) {
    let index = this.subs.indexOf(sub)
    if(index !== -1) {
      this.subs.splice(index, 1)
    }
  },
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

Dep.target = null
