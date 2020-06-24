---
nav:
  title: BOM
  order: 5
group:
  title: Web API
  order: 7
title: FileReader 对象
order: 3
---

## FileReader 对象

FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容。FileReader 接口提供了一个异步API，使用该 API 可以在浏览器主线程中异步访问文件系统，读取文件中的数据。

其中 File 对象可以是来自用户在一个 `<input>` 元素上选择文件后返回的 FileList 对象，也可以来自拖放操作生成的 DataTransfer 对象，还可以是来自一个 HTMLCanvasElement 上执行 `mozGetAsFile()` 方法后返回结果。

### 构造函数

通过 new 操作符构造 FileReader 对象。

```js
const fileReader = new FileReader();
```

### 属性

以下属性均为只读属性，不可更改。

| 属性                    | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `FileReader.error`      | 一个 DOMException，表示在读取文件时发生的错误。              |
| `FileReader.readyState` | 表示 FileReader 状态的码（EMPTY=0还没有加载任何数据；LOADING=1数据正在被加载；DONE=2已完成全部的读取请求） |
| `FileReader.result`     | 文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。 |

##### 事件处理

对 FileReader 对象调用其中某一种读取方法后，可使用以下事件处理方式跟踪其读取进度。

| 事件                     | 说明                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `FileReader.onabort`     | 处理 abort 事件。该事件在读取操作被中断时触发。              |
| `FileReader.onerror`     | 处理 error 事件。该事件在读取操作发生错误时触发。            |
| `FileReader.onload`      | 处理 load 事件。该事件在读取操作完成时触发。                 |
| `FileReader.onloadstart` | 处理 loadstart 事件。该事件在读取操作开始时触发。            |
| `FileReader.onloadend`   | 处理 loadend 事件。该事件在读取操作结束（要么成功，要么失败）时触发。 |
| `FileReader.onprogress`  | 处理 progress 事件。该事件在读取 Blob 时触发。               |

> ✅ 因为 FileReader 继承自 EventTarget，所以所有这些事件也可以通过 addEventListener 方法使用。

### 方法

这些方法都是异步读取文件的。无论读取成功或失败，方法并不会返回读取结果，这一结果存储在 result 属性中。

| 方法                                       | 说明                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| `FileReader.abort()`                       | 中止读取操作。在返回时，readyState 属性为 `DONE`。           |
| `FileReader.readAsArrayBuffer()`           | 开始读取指定的 Blob 中的内容，一旦完成，result 属性中保存的将是被读取文件的 **ArrayBuffer 数据对象**。 |
| `FileReader.readAsBinaryString(file)`      | 开始读取指定 Blob 中的内容。一旦完成，result 属性中将包含所读取文件的**原始二进制数据**。 |
| `FileReader.readAsDataURL(file)`           | 开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个 **`data:URL` 格式的字符串**以表示所读取文件的内容。 |
| `FileReader.readAsText(file [, encoding])` | 开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个**字符串**以表示所读取文件的内容。 |

---

参考资料：

- [通过 File API 使用 JavaScript 读取文件](https://www.html5rocks.com/zh/tutorials/file/dndfiles/)

