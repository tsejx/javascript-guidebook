---
nav:
  title: DOM
  order: 6
group:
  title: DOM 事件流
  order: 20
title: 事件对象
order: 3
---

## 事件对象

在触发 DOM 上的某个事件时，会产生一个事件对象（Event Object），这个对象中包含着所有与事件有关的属性和方法。该对象会作为第一个参数传递给监听函数。

- DOM 事件模型中的事件对象常用属性方法
  - `type`：用于获取事件类型
  - `target`：获取事件目标
  - `stopPropagation()`：阻止事件冒泡
  - `preventDefault()`：阻止默认行为
- IE 事件模型中的事件对象常用属性方法
  - `type`：用于获取事件类型
  - `srcElement`：获取事件目标
  - `cancelBubble`：阻止事件冒泡
  - `returnValue`：阻止事件默认行为

### DOM 中的事件对象

兼容 DOM 的浏览器会将一个 `event` 对象传入到事件处理程序中。无论指定事件处理程序时使用什么方法（DOM0 级或 DOM2 级），都会传入 `event` 对象。

以这种方式提供 `event` 对象，可以让 HTML 特性事件处理程序与 JavaScript 函数执行相同的操作。`event` 对象包含与创建它的特定事件相关的属性和方法。触发的事件类型不一样。不过，所有事件都会有下表列出的成员。

|          属性/方法           |     类型     | 读/写 |                                                     说明                                                     |
| :--------------------------: | :----------: | :---: | :----------------------------------------------------------------------------------------------------------: |
|           bubbles            |   Boolean    | 只读  |                                               表明事件是否冒泡                                               |
|          cancelable          |   Boolean    | 只读  |                                        表明是否可以取消事件的默认行为                                        |
|        currentTarget         |   Element    | 只读  |                                   其事件处理程序当前正在处理事件的那个元素                                   |
|       defaultPrevented       |   Boolean    | 只读  |                       为 `true` 表示已经调用了 `preventDefault()`（DOM3 级事件中新增）                       |
|            detail            |   Integer    | 只读  |                                             与事件相关的细节信息                                             |
|          eventPhase          |   Integer    | 只读  |                   调用事件处理程序的阶段：1 表示捕获阶段，2 表示“处于目标”，3 表示冒泡阶段                   |
|      `preventDefault()`      |   Function   | 只读  |                    取消事件的默认行为。如果 `cancelable` 是 `true`，则可以使用这个方法。                     |
| `stopImmediatePropagation()` |   Function   | 只读  |               取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用（DOM3 级事件中新增）                |
|     `stopPropagation()`      |   Function   | 只读  |                    取消事件的进一步捕获或冒泡。如果 bubbles 为 `true`，则可以使用这个方法                    |
|            target            |   Element    | 只读  |                                                  事件的目标                                                  |
|           trusted            |   Boolean    | 只读  | 为 `true` 表示事件是浏览器生成的。为 `false` 表示事件是由开发人员通过 JavaScript 创建的（DOM3 级事件中新增） |
|             type             |    String    | 只读  |                                              被触发的事件的类型                                              |
|             view             | AbstractView | 只读  |                             与事件关联的抽象视图。等同于发生事件的 `window` 对象                             |

#### 事件处理程序内部 this 指向

在事件处理程序内部，对象 `this` 始终等于 `currentTarget` 的值，而 `tartget` 则只包含事件的实际目标。如果直接将事件处理程序指定给了目标元素，则 `this`、`currentTarget` 和 `tartget` 包含相同的值。

```js
// Example
var btn = doocument.getElementById('myBtn');
btn.onclick = function(event) {
  alert(event.currentTarget === this); // true
  alert(event.target === this); // true
};
```

当单击这个例子中的按钮时，`this` 和 `currentTarget` 都等于 `document.body`，因为事件处理程序是注册到这个元素上的。然而，`target` 元素却等于按钮元素，因为它是 `click` 事件真正的目标。由于按钮上并没有注册事件处理程序，结果 `click` 事件就冒泡到了 `document.body`，在那里事件才得到了处理。

#### 单函数处理多事件

在需要通过一个函数处理多个事件时，可以使用 `type` 属性。例如：

```js
var btn = document.getElementById('myBtn');
var handler = function(event) {
  switch (event.type) {
    case 'click':
      alert('Clicked');
      break;
    case 'mouseover':
      event.target.style.backgroundColor = 'red';
      break;
    case 'mouseout':
      event.target.style.backgroundColor = '';
      break;
  }
};

btn.onclick = handler;
btn.mouseover = handler;
btn.mouseout = handler;
```

这个例子定义了一个名为 `handler` 的函数，用于处理 3 种事件：`click`、`mouseover`和`mouseout`。当单击按钮时，会出现一个与前面例子中一样的警告框。当按钮移动到按钮上面时，背景颜色应该会变成红色，而当鼠标移动出按钮的范围时，背景颜色应该会恢复为默认值。这里通过检测 `event.type`属性，让函数能够确定发生了什么事件，并执行相应的操作。

#### 阻止浏览器默认行为

要阻止特定事件的默认行为，可以使用 `preventDefault()` 方法。例如，链接的默认行为就是在被单击时会导航到其 `href` 特性指定的 URL。如果你想阻止链接导航这一默认行为，那么通过链接的 `onclick` 事件处理程序可以取消它。

```js
var link = document.getElementById('myLink');
link.onclick = function(event) {
  // 阻止鼠标的默认行为
  event.preventDefault();
};
```

只有 `cancelable` 属性设置为 `true` 的事件，才可以使用 `preventDefault()`来取消其默认行为。

#### 阻止事件冒泡

`stopPropagation()` 方法用于立即停止事件在 DOM 层次中的传播，即取消进一步的事件捕获或冒泡。

```js
function stopPropagation(e) {
  const event = e || window.event;
  event.stopPropagation ? event.stopPropagation() : (window.event.cancelBubbl = true);
}
```

⚠️ 只有在事件处理程序执行期间，event 对象才会存在。一旦事件处理程序执行完成，event 对象就会被销毁。

### 跨浏览器的事件对象

虽然 DOM 和 IE 中的 `event` 对象不同，但基于它们之间的相似性依旧可以拿出跨浏览器的方案来。IE 中 `event` 对象的全部信息和方法 DOM 对象中都有，只不过实现方式不一样。不过，这种对应关系让实现两种事件模型之间的映射非常容易。可以对前面介绍的 EventUtil 对象加以增强，添加如下方法以求同存异。

```js
const EventUtil = {
  addHandler: function(element, type, handler) {
    // 省略的代码
  }，

  getEvent: function(event) {
    return event ? event : window.event;
	}

	getTarget: function(event) {
    return event.target || event.srcElement;
	}

	preventDefault: function(event) {
    if (event.preventDefault){
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
	}

	removeHandler: function(element, type, handler) {
    // 省略的代码
	}

	stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation;
    } else {
      event.cancelBubble = true;
    }
	}
}
```

---

参考资料：

- [JS 事件：捕获与冒泡、事件处理程序、事件对象、跨浏览器、事件委托](https://github.com/amandakelake/blog/issues/38)
