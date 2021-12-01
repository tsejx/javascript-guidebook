---
nav:
  title: BOM
  order: 5
group:
  title: 二进制数据和文件 API
  order: 10
title: File API
order: 4
---

# File API

File 对象接口提供有关文件的信息，并允许网页中的 JavaScript 访问起内容。

通常情况下，File 对象是来自：

- 用户在一个 `<input type="file">` 元素上选择文件后返回的 [FileList](./file-list) 对象
- 拖拽中生成的 DataTransfer 对象
- HTMLCanvasElement 上的 `mozGetAsFile()` API

在 Gecko 中，特权代码可以创建代表任何本地文件的 File 对象，而无需用户交互。

File 对象是特殊类型的 Blob 对象，且可以用在任意的 Blob 类型的 `context` 中。比如说，[FileReader](./file-reader)，`URL.createObjectURL()`，`createImageBitmap()` 及 `XMLHttpRequest.send()` 都能处理 Blob 和 File。

## 基本用法

通过 `new` 操作符构建文件对象 File。

```js
const file = new File();
```

## 属性和方法

File 对象也继承了 Blob 对象的属性。以下属性均为 **只读** 属性，不可修改。

| 属性                         | 说明                                                                          |
| :--------------------------- | :---------------------------------------------------------------------------- |
| `File.lastModified`          | 当前引用文件 **最后的修改时间**，为自 1970 年 1 月 1 日 0 时 0 分以来的毫秒数 |
| `File.lastModifiedDate` 🗑    | 当前引用文件 **最后的修改时间**，为 Date 对象                                 |
| `File.name`                  | 当前引用文件的 **名称**                                                       |
| `File.size`                  | 当前引用文件的 **大小**                                                       |
| `File.webkitRelativePath` ⚠️ | 当前引用文件的 **路径或 URL**                                                 |
| `File.type`                  | 当前引用文件的多用途互联网邮件 **扩展类型**                                   |

File 对象接口没有定义任何方法，但是继承了 Blob 对象接口的方法。

## 注意事项

- 下面的非标准的属性及方法在 Gecko 7（Firefox 7.0 / Thunderbird 7.0 / SeaMonkey 2.4)）里就被移除：
  - `File.fileName`
  - `File.fileSize`
  - `File.getAsBinary()`
  - `File.getAsDataURL()`
  - `File.getAsText`

应该使用 `File.name` ，`Blob.size`，和 `FileReader` 的方法来代替。

## 实践应用

### 文件上传

### 视频文件

[获取视频文件时长](https://www.jianshu.com/p/f1b714f1a9f8)

```ts
interface File {}
```

```js
const file = {
  lastModified: 1612420035903,
  lastModifiedDate: Thu Feb 04 2021 14:27:15 GMT+0800 (China Standard Time) {},
  name: "10min.mp4",
  size: 191763419,
  type: "video/mp4",
  webkitRelativePath: "",
}
```

## 参考资料

- [📖 W3C FileAPI](https://w3c.github.io/FileAPI/#file-section)
- [文件上传](https://www.jianshu.com/p/0846d7d60481)
