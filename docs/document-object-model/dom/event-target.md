---
nav:
  title: DOM
  order: 6
group:
  title: 文档对象模型
  order: 3
title: EventTarget
order: 5
---

# EventTarget

EventTarget 是一个 DOM 接口，由可以接收事件、并且可以创建侦听器的对象实现。

Element、Document 和 Window 是最常见的 EventTarget，但是其他对象也可以作为 EventTarget，比如 XMLHttpRequest、AudioNode 和 AudioContext 等等。

```plain
EventTarget <- Node <- Element
```

## 原型方法

| 方法                            | 说明                                                      |
| :------------------------------ | :-------------------------------------------------------- |
| EventTarget.addEventListener    | 注册事件，在 EventTarget 上注册特定事件类型的事件处理程序 |
| EventTarget.removeEventListener | 注销事件，移除 EventTarget 中事件侦听器                   |
| EventTarget.dispatchEvent       | 触发事件，将事件分派到此 EventTarget 中                   |

## 简单实现

```js
let EventTarget = function() {
  this.listeners = {};
};

EventTarget.prototype.listeners = null;

EventTarget.prototype.addEventListener = function(type, callback) {
  if (!(type in this.listeners)) {
    this.listeners[type] = [];
  }

  this.listeners[type].push(callback);
};

EventTarget.prototype.removeEventListener = function(type, callback) {
  if (!(type in this.listeners)) {
    return;
  }

  let stack = this.listeners[type];

  for (let i = 0, len = stack.length; i < len; i++) {
    if (stack[i] === callback) {
      stack.splice(i, 1);
      return this.removeEventListener(type, callback);
    }
  }
};

EventTarget.prototype.dispatchEvent = function(event) {
  if (!(event.type in this.listeners)) {
    return;
  }

  let stack = this.listeners[event.type];

  event.target = this;

  for (let i = 0, len = stack.length; i < len; i++) {
    stack[i].call(this, event);
  }
};
```

---

**参考资料：**

- [DOM EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget)
