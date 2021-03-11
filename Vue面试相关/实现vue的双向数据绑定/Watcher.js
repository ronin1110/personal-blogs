/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-03-11 22:27:32
 * @LastEditors: yaolin
 */
function Watcher(vm, expOrFn, cb) {
  this.cb = cb
  this.vm = vm
  this.expOrFn = expOrFn
  this.depIds = {}

  if(typeof expOrFn === 'function') {
    this.getter = expOrFn
  } else {
    this.getter = this.parseGetter(expOrFn.trim())
  }

  this.value = this.get()
}


Watcher.prototype = {
  constructor: Watcher,
  updater() {
    this.run()
  },
  run() {
    let value = this.get()
    let oldValue = this.value
    if(value !== oldValue) {
      this.value = value
      this.cb.call(this.vm, value, oldValue)
    }
  },
  addDep(dep) {
    if(!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  },
  get() {
    Dep.target = this
    let value = this.getter.call(this.vm, this.vm)
    Dep.target = null
    return value
  },
  parseGetter(exp) {
    if(/[^\w.$]/.test(exp)) {
      return
    }
    let exps = exp.split('.')
    return function(obj) {
      for (let index = 0, length = exps.length; index < length; index++) {
        if(!obj) {
          return 
        }
        obj = obj[exps[index]]
      }
      return obj
    }
  }
}