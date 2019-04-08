## HTML 拖放 API

### 常见业务场景

* 操作类拖拽：拖拽文件上传
* 功能性拖拽：拖拽排序，具有指向性，位置互换
* 使用方便型：对某些固定元素，使其随处可放

### 拖放的流程

拖放的流程：用户通过鼠标选中一个可拖动的（draggable）元素，移动鼠标到一个可放置的（droppable）元素，然后释放鼠标。

```
选中 ===> 拖放 ===> 释放
```

#### 定义可拖动元素

在 HTML5 标准中，为了使元素可拖动，需要将元素的 `draggable` 属性设置为 `true`。

文本、图片和链接时默认可以拖放的，它们的 `draggable` 属性自动被设置为 `true`。

图片和链接按住鼠标左键选中即可拖放。

文本只有在被选中的情况下才能拖放。如果显示设置文本的 `draggable` 属性为 `true`，按住鼠标左键也可以直接拖放。

`draggable` 属性：设置元素是否可拖动。

```html
<element draggable="true | false | auto"></element>
```

* `true`：可以拖动
* `false`：禁止拖动
* `auto`：跟随浏览器定义是否可以拖动

#### 拖动事件

每一个可拖动的元素，在拖动过程中，都会经历三个过程：`拖动开始` ==> `拖动过程中` ==> `拖动结束`。

| 针对对象     | 事件名称  | 说明                                                | MDN文档                                                      |
| ------------ | --------- | --------------------------------------------------- | ------------------------------------------------------------ |
| 被拖动的元素 | dragstart | 在元素开始拖动时触发                                | [文档](https://developer.mozilla.org/zh-CN/docs/Web/Events/dragstart) |
|              | drag      | 在元素拖动时反复触发                                | [文档](https://developer.mozilla.org/zh-CN/docs/Web/Events/drag) |
|              | dragend   | 在拖动操作完成时触发                                | [文档](https://developer.mozilla.org/zh-CN/docs/Web/Events/dragend) |
| 目的地对象   | dragenter | 当被拖动元素进入目的地元素所占据的屏幕空间时触发    | [文档](https://developer.mozilla.org/zh-CN/docs/Web/Events/dragenter) |
|              | dragover  | 但被拖动元素在目的地元素内时触发（每100ms触发一次） | [文档](https://developer.mozilla.org/zh-CN/docs/Web/Events/dragover) |
|              | dragleave | 当被拖动元素没有放下就离开目的地元素时触发          | [文档](https://developer.mozilla.org/zh-CN/docs/Web/Events/dragleave) |

⚠️ `dragenter` 和 `dragover` 事件的默认行为时拒绝接收任何被拖放的元素。因此，我们必须阻止浏览器这种默认行为。

⚠️ 注意当从操作系统向浏览器中拖动文件时，不会触发 `dragstart` 和 `dragend` 事件。

#### 释放事件

到达目的地之后，释放元素事件。

| 针对对象   | 事件名称 | 说明                                                         | MDN文档                                                      |
| ---------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 目的地对象 | drop     | 当被拖动元素在目的地元素里放下时触发，一般需要取消浏览器的默认行为 | [文档](https://developer.mozilla.org/zh-CN/docs/Web/Events/drop) |

### DataTransfer 对象

与拖放操作所触发的事件同时派发的对象是 DragEvent，它派生于 MouseEvent，具有 Event 与 MouseEvent 对象的所有功能，并增加了 `dataTransfer` 属性。该属性用于保存拖放的数据和交互信息，返回 DataTransfer 对象。

DataTransfer 对象定义的属性和方法有很多种，我们看下列入标准的几个。

| 属性                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [types](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/types) | 只读属性。它返回一个我们在 `dragstart` 事件中设置的**拖动数据格式的数组**。 格式顺序与拖动操作中包含的数据顺序相同。IE10+、Edge、Safari3.1、Firefox3.5+ 和 Chrome4 以上支持该属性。 |
| [files](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/files) | 返回拖动操作中的**文件列表**。包含一个在数据传输上所有可用的本地文件列表。如果拖动操作不涉及拖动文件，此属性是一个空列表。 |
| [dropEffect](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect) | 获取当前选定的拖放操作的类型或将操作设置为新类型。可选值包括 `none`、`move`、`copy`、`link`。`dragover` 事件处理程序中针对放置目标来设置 dropEffect。 |
| [effectAllowed](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/effectAllowed) | 指定拖放操作所允许的效果。可选值为 `none`、`copy`、`copyLink`、`copyMove`、`link`、`linkMove`、`move`、`all`、`uninitialized` 默认为 `uninitialized` 表示允许所有的效果。`ondragstart` 处理程序中设置 `effectAllowed` 属性。 |

| 方法                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`void setData(format, data)`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/setData) | 将拖动操作的拖动数据设置为指定的数据和类型。`format` 可以是 MIME 类型。 |
| [`String getData(format)`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/getData) | 返回指定格式的数据，`format` 与 `setData()` 中一致。         |
| [`void clearData([format])`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/clearData) | 删除给定类型的拖动操作的数据。如果给定类型的数据不存在，此方法不执行任何操作。如果不给定参数，则删除所有类型的数据。 |
| [`void setDragImage(img, xOffset, yOffset)`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/setDragImage) | 指定一副图像，当拖动发生时，显示在光标下方。大多数情况下不用设置，因为被拖动的节点被创建成默认图片。`x`、`y` 参数分别指示图像的水平、垂直偏移量 |

### 兼容性

| IE   | Edge | Firefox | Chrome | Safari | Opera |
| ---- | ---- | ------- | ------ | ------ | ----- |
| 11   | 16   | 56      | 62     | 11     | 48    |

### 社区类库

* [HTML5 Sortable jQuery Plugin](https://github.com/farhadi/html5sortable)
* [React-Draggable](https://github.com/mzabriskie/react-draggable)
* [Awesome-Vue:Drag&Drop Component](https://github.com/vuejs/awesome-vue#drag-and-drop)

---

**参考资料：**

* [HTML5 拖放实现](https://juejin.im/entry/59eebc39f265da431c6f7bdb)
* [HTML5 原生拖拽/拖放 Drag & Drop 详解](https://developer.mozilla.org/zh-CN/docs/Web/Events/dragleave)
* [HTML5 进阶系列：拖放 API 实现拖放排序](https://juejin.im/post/5907d058da2f60005d0f8b15)