---
nav:
  title: DOM
  order: 6
group:
  title: DOM 事件流
  order: 20
title: 事件处理程序
order: 2
---

## 事件处理程序

事件就是用户或浏览器自身执行的某种动作。诸如 click、load 和 mouseover，都是事件的名字。而响应某个事件的函数就叫做**事件处理程序（或事件侦听器）**。事件处理程序的名字以“on”开头，因此 click 事件的事件处理程序就是 onclick，load 事件的事件处理程序就是 onload。为事件指定处理程序的方式有好几种

- HTML 事件处理程序
- DOM0 级事件处理程序
- DOM2 级事件处理程序
- IE 事件处理程序
- 跨浏览器的事件处理程序

### HTML 事件处理程序

某个元素支持的每种事件，都可以使用一个与相应事件处理程序同名的 HTML 特性来指定。这个特性的值应该是能够执行的 JavaScript 代码。

```html
<div onclick="alert(event.type)"></div>
```

在事件处理程序函数内部，`this` 值等于事件的目标元素。

```html
<div id="box" onclick="this.innerHTML+= '1';"></div>
```

### DOM0 级事件处理程序

通过 JavaScript 指定事件处理程序的传统方式，就是将一个函数赋值给一个事件处理程序属性。这种为事件处理程序赋值的方法是在第四代 Web 浏览器中出现的，而且至今仍然为所有现代浏览器所支持。

每个元素都有自己的事件处理程序属性，这些属性通常全部小写，将这种属性的值设置为一个函数，就可以指定事件处理程序。

以 DOM0 级方式添加的事件处理程序会在**事件流的冒泡阶段**被处理。

```html
<div id="box"></div>
```

```js
const box = document.querySelector('#box');
box.onclick = function() {
  this.innerHTML += '1';
};
```

**删除事件处理程序**：可以通过将事件处理程序属性设置为 `null` 来删除事件处理程序。

```js
box.onclick = null;
```

**缺点**：DOM0 级事件处理程序的缺点是围绕着每个事件目标对于每种事件类型只能添加一个事件处理程序

### DOM2 级事件处理程序

DOM2 级事件处理程序属于 W3C 标准模型，现代浏览器（除 IE6-8 之外的浏览器）都支持该模型。在该事件模型中，一次事件共有三个过程：

- 事件捕获阶段：事件从文档节点一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行
- 事件处理阶段：事件到达目标元素，触发目标元素的监听函数。
- 事件冒泡阶段：事件从目标元素冒泡到文档节点，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。

DOM2 级事件处理程序定义了两个方法用于处理指定和删除事件处理程序的操作：

**绑定方式**

```js
element.addEventListener(eventType, handler, useCapture);
```

**移除方式**

```js
element.removeEventListener(eventType, handler, useCapture);
```

所有 DOM 节点中都包含这两个方法，并且它们都接受 3 个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后的布尔值参数如果是 `true`，表示在捕获阶段调用事件处理程序；如果是 `false`，表示在冒泡阶段调用事件处理程序。若最后的布尔值不填写，则和 `false` 效果一样。

#### 参数传递

如果希望向监听函数传递参数，可以用匿名函数包装一下监听函数

```html
<div id="box" style="height:30px;width:200px;background-color:pink;"></div>
<script>
  box.addEventListener(
    'click',
    function() {
      test('123');
    },
    false
  );
  function test(x) {
    box.innerHTML += x;
  }
</script>
```

#### 注销事件绑定

通过 `addEventListener()` 添加的事件处理程序只能使用 `removeEventListener()` 来移除。

- 移除时传入的参数与添加处理程序时使用的参数相同
- `addEventListener()` 添加的匿名函数将无法移除

```html
<div id="box"></div>
```

以下无效：

```js
box.addEventListener(
  'click',
  function() {
    this.innerHTML += '1';
  },
  false
);

box.removeEventListener(
  'click',
  function() {
    this.innerHTML += '1';
  },
  false
);
```

以下有效：

```js
const handle = function() {
  this.innerHTML += '1';
};

box.addEventListener('click', handle, false);
box.removeEventListener('click', handle, false);
```

### IE 事件处理程序

IE 事件模型共有两个过程：

- 事件处理阶段：事件到达目标元素，触发目标元素的监听函数。
- 事件冒泡阶段：事件从目标元素冒泡到文档节点，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。

事件绑定：

```js
attachEvent(eventType, handler);
```

事件移除：

```js
detachEvent(evnetType, handler);
```

参数说明：

- eventType：指定事件类型
- handler：事件处理函数

```js
// Example
cont btn = document.getElmentById('.btn');
btn.attachEvent('onclick', showMessage);
btn.detachEvent('onclick', showMessage);
```

### 跨浏览器的事件处理程序

为了以跨浏览器的方式处理事件，不少开发人员会使用能够隔离浏览器差异的 JavaScript 库，还有一些开发人员会自己开发最合适的事件处理的方法。自己编写代码其实也不难，只要恰当地使用能力检测即可。要保证处理事件的代码能在大多数浏览器下一致运行，只需关注冒泡阶段。

`EventUtil` 的用法如下所示

```js
var EventUtil = {
    addHandler: function(element, type, handler){
    if (element,.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    } else {
        element["on" + type] = handler;
    }
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        } else {
            element["on" + type] = null;
        }
    }
}
```

### 总结

- HTML 事件处理程序：用户可能在元素刚出现就触发了事件，但此时 JS 代码可能还未加载完毕。其次，HTML 代码和 JavaScript 代码紧密耦合，不利于开发和维护，所以不推荐使用这种方法。
- DOM0 级事件处理程序：简单且兼容性好，但是在需要对一个元素设置多个事件处理程序时便显得孱弱。
- DOM2 级事件处理程序：可以轻易的设置多个事件处理程序，但是在删除事件处理程序时，传给 `removeEventListener()` 的参数必须与之前一致，且 IE9 以下不支持。

事件处理函数需要注意的：

- `this` 指的是 `target` 或 `currentTarget`。
- 两种 DOM 方法都会给事件处理函数传一个事件对象作为参数。HTML 方法直接引用 `event`。
