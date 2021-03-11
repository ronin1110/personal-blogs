/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-03-11 13:32:49
 * @LastEditors: yaolin
 */
function Compile(el, vm) {
  this.$vm = vm
  this.$el = this.isElementNode(el) ? el: document.querySelector(el)
  if(this.$el) {
    this.$fragment = this.node2Fragment(this.$el)
    this.init()
    this.$el.appendChild(this.$fragment)
  }
}

Compile.prototype = {
  constructor: Compile,
  node2Fragment(el) {
    let fragment = document.createDocumentFragment()
    let child

    while (child = el.firstChild) {
      fragment.appendChild(child)  // 这里会移动源el的元素  所以不会死循环
    }
    return fragment
  },
  init() {
    this.compileElement(this.$fragment)
  },
  compileElement(el) {
    let childNodes = el.childNodes
    let me = this;
    [].slice.call(childNodes).forEach(node => {
      let text = node.textContent
      let reg = /\{\{(.*)\}\}/
      if(me.isElementNode(node)) {
        me.compile(node)
      } else if(me.isTextNode(node) && reg.test(text)) {
        me.compileText(node, RegExp.$1.trim())
      }
      if(node.childNodes && node.childNodes.length) {
        me.compileElement(node)
      }
    })
  },
  compile(node) {
    let nodeAttrs = node.attributes
    let me = this;
    [].slice.call(nodeAttrs).forEach(attr => {
      let attrName = attr.name
      // console.log(attrName);
      if(me.isDirective(attrName)) {
        // console.log(attrName);
        let exp = attr.value
        let dir = attrName.substring(2)

        // 事件指令
        if(me.isEventDirective(dir)) { // 普通
          // console.log(dir);
          compileUtil.eventHandler(node, me.$vm, exp, dir)
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp)
        }
        node.removeAttribute(attrName)
      }
    })
  },

  compileText(node, exp) {
    compileUtil.text(node, this.$vm, exp)
  },
  isDirective(attr) {
    return attr.indexOf('v-') == 0
  },
  isEventDirective(dir) {
    return dir.indexOf('on') === 0
  },
  isElementNode(node) {
    return node.nodeType == 1
  },
  isTextNode(node) {
    return node.nodeType == 3
  }


}

// 指令处理

let compileUtil = {
  text(node, vm, exp){
    this.bind(node, vm, exp, 'text')
  },
  html(node, vm, exp){
    this.bind(node, vm, exp, 'html')
  },
  model(node, vm, exp) {
    this.bind(node, vm, exp, 'model')

    let me = this
    let val = this._getVMVal(vm, exp)
    node.addEventListener('input', function(e) {
      let newValue = e.target.value
      if(val === newValue) {
        return 
      }
      me._setVMVal(vm, exp, newValue)
      val = newValue
    })
  },
  class(node, vm, exp) {
    this.bind(node, vm, exp, 'class')
  },
  bind(node, vm, exp, dir) {
    let updaterFn = updater[dir + 'Updater']
    updaterFn && updaterFn(node, this._getVMVal(vm, exp))
    new Watcher(vm, exp, function(value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue)
    })
  },
  eventHandler(node, vm, exp, dir) {
    // console.log(dir);
    let eventType = dir.split(':')[1]
    let fn = vm.$options.methods && vm.$options.methods[exp]
    if(eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false)
    }
  },

  _getVMVal(vm, exp) {
    let val = vm
    exp = exp.split('.')
    exp.forEach(key => {
      val = val[key]
    })
    return val
  },
  _setVMVal(vm, exp, value) {
    let val = vm
    exp = exp.split('.')
    exp.forEach((key, index) => {
      if(index < exp.length -1) {
        val = val[key]
      } else { // 最后在赋值
        val[key] = value
      }
    })
  }

}

let updater = {
  textUpdater(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value
  },
  htmlUpdater(node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value
  },
  classUpdater(node, value, oldValue) {
    let className = node.className
    className = className.replace(oldValue, '').replace(/\s$/, '')
    let space = className && String(value) ? ' ' : ''
    node.className = className + space + value
  },
  modelUpdater(node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value
  }
}