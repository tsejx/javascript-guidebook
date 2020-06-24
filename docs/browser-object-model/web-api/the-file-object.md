---
nav:
  title: BOM
  order: 5
group:
  title: Web API
  order: 7
title: File 对象
order: 1
---

## File 对象

File 对象接口提供有关文件的信息，并允许网页中的 JavaScript 访问起内容。

通常情况下，File 对象是来自用户在一个 `<input>` 元素上选择文件后返回的 FileList 对象，也可以是来自自由拖放操作生成的 DataTransfer 对象，或者来自 HTMLCanvasElement 上的 `mozGetAsFile()` API。在 Gecko 中，特权代码可以创建代表任何本地文件的 File 对象，而无需用户交互。

File 对象是特殊类型的 Blob 对象，且可以用在任意的 Blob 类型的 context 中。比如说，FileReader，`URL.createObjectURL()`，`createImageBitmap()` 及 `XMLHttpRequest.send()` 都能处理 Blob 和 File。

### 构造函数

通过 new 操作符构建文件对象 File。

```js
const file = new File();
```

### 属性

File 对象也继承了 Blob 对象的属性。以下属性均为只读属性，不可修改。

| 属性                        | 说明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `File.lastModified`         | 当前 File 对象所引用文件最后的修改时间，为自 1970年1月1日0时0分以来的毫秒数。 |
| `File.lastModifiedDate` 🗑   | 当前 File 对象所引用文件最后的修改时间，为 Date 对象。       |
| `File.name`                 | 当前 File 对象所引用文件的名称。                             |
| `File.size`                 | 当前 File 对象所引用文件的大小。                             |
| `File.webkitRelativePath` ⚠️ | 当前 File 对象所引用文件的路径或 URL。                       |
| `File.type`                 | 当前 File 对象所引用文件的多用途互联网邮件扩展类型。         |

### 方法

File 对象接口没有定义任何方法，但是继承了 Blob 对象接口的方法。

### 注意事项

- 下面的非标准的属性及方法在 Gecko 7 (Firefox 7.0 / Thunderbird 7.0 / SeaMonkey 2.4) 里就被移除了：`File.fileName`，`File.fileSize`，`File.getAsBinary()`，`File.getAsDataURL()`，`File.getAsText`。应该使用 `File.name` ，`Blob.size`，和 `FileReader` 的方法来代替。

