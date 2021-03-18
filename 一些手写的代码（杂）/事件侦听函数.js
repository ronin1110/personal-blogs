/*
 * @Description: 
 * @Author: yaolin
 * @Date: 2021-03-14 16:24:55
 * @LastEditors: yaolin
 */
 // event(事件)工具集，来源：github.com/markyun
 markyun.Event = {
       
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 参数： 操作的元素,事件名称 ,事件处理程序
  addEvent : function(element, type, handler) {
      if (element.addEventListener) {
          //事件类型、需要执行的函数、是否捕捉
          element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
          element.attachEvent('on' + type, function() {
              handler.call(element);
          });
      } else {
          element['on' + type] = handler;
      }
  },
  // 移除事件
  removeEvent : function(element, type, handler) {
      if (element.removeEventListener) {
          element.removeEventListener(type, handler, false);
      } else if (element.datachEvent) {
          element.detachEvent('on' + type, handler);
      } else {
          element['on' + type] = null;
      }
  },
  // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
  stopPropagation : function(ev) {
      if (ev.stopPropagation) {
          ev.stopPropagation();
      } else {
          ev.cancelBubble = true;
      }
  },
  // 取消事件的默认行为
  preventDefault : function(event) {
      if (event.preventDefault) {
          event.preventDefault();
      } else {
          event.returnValue = false;
      }
  },
  // 获取事件目标
  getTarget : function(event) {
      return event.target || event.srcElement;
  }
}