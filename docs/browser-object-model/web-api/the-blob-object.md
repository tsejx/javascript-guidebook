---
nav:
  title: BOM
  order: 5
group:
  title: Web API
  order: 7
title: Blob 对象
order: 7
---

## Blob 对象

Blob，Binary Large Object 的缩写，代表二进制类型的大对象。Blob 的概念在一些数据库中有使用到，例如，MYSQL中的 BLOB 类型就表示二进制数据的容器。在Web中，Blob 类型的对象表示不可变的类似文件对象的原始数据，通俗点说，就是 Blob 对象是二进制数据，但它是类似文件对象的二进制数据，因此可以像操作 File 对象一样操作 Blob 对象，实际上，File 继承自 Blob，并将其扩展为支持用户系统上的文件。

生成

### 构造 Blob 对象

#### 构造函数

可以通过 Blob 的构造函数创建 Blob 对象：

```js
const blob = new Blob(data [, options]);
```

##### 参数

|  参数   |                             说明                             |
| :-----: | :----------------------------------------------------------: |
|  data   | （类）数组类型，数组中的每一项连接起来构成 Blob 对象的数据，数组中的每项元素可以是 `ArrayBuffer`，`ArrayBufferView`，`Blob`，`DOMString`。 |
| options | 可选项，字典格式类型，可以指定如下两个属性：<br />type，默认值为 `""`，它代表了将会被放入到 Blob 中的数组内容的 MIME 类型<br /> endings，默认值为 `"transparent"`，用于指定包含行结束符 `\n` 的字符串如何被写入。 它是以下两个值中的一个： `"native"`，表示行结束符会被更改为适合宿主操作系统文件系统的换行符； `"transparent"`，表示会保持 Blob 中保存的结束符不变。 |

##### 示例

```js
const blob = new Blob(['我是Blob'], {type: 'text/html'});
```

#### slice方法

Blob 对象有一个 `slice()` 方法，返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。

```js
const newBlob = originBlob.slice([start [, end [, contentType]]])
```

##### 参数

|    参数     |                             参数                             |
| :---------: | :----------------------------------------------------------: |
|    start    | 可选，代表 Blob 里的下标，表示第一个会被拷贝进新的 Blob 的字节的起始位置。如果传入的是一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。 |
|     end     | 可选，代表的是 Blob 的一个下标，这个下标-1的对应将会是被拷贝进新的 Blob 的最后一个字节。如果你传入了一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。 |
| contentType | 可选，给新的 Blob 赋予一个新的文档类型。这将会把它的 type 属性设为被传入的值。它的默认值是一个空的字符串。 |

##### 示例

```js
const data = "abcdef";
const blob1 = new Blob([data]);
const blob2 = blob1.slice(0, 3);

console.log(blob1);		// export: Blob {size: 6, type: ""}
console.log(blob2);		// export: Blob {size: 3, type: ""}
```

通过 `slice()` 方法，从 `blob1` 中创建出一个新的 Blob 对象，siez 等于 3。

#### Blob 属性

| 属性      | 说明                                            |
| --------- | ----------------------------------------------- |
| blob.size | Blob 对象的大小（以字节为单位）                 |
| blob.type | Blob 对象的 MIME 类型，如果是未知，则是空字符串 |

### Blob 的使用

使用 Blob 最简单的方法就是创建一个 URL 来指向 Blob：

```html
// html
<a download="data.txt" id="getData">下载</a>
```

```js
// js
const data = 'Hello world!';
const blob = new Blob([data], {
    type: 'text/html,charset=UTF-8'
})；

window.URL = window.URL || window.webkitURL;
document.querySelect('#getData').href = URL.createObjectURL(blob);
```

上面的代码将 Blob URL 赋值给 `a` ，点击后提示下载文本文件 `data.txt` ，文件内容为 `“Hello world！”`。

---

参考资料：

- [细说Web API中的Blob](https://juejin.im/post/59e35d0e6fb9a045030f1f35)
- [Web 开发中 Blob 与 FileAPI 使用简述](https://juejin.im/post/5b544b01f265da0f800ddece)

- [前端图片canvas，file，blob，DataURL等格式转换](https://juejin.im/post/5b5187da51882519ec07fa41)
- [DataURL与File,Blob,canvas对象之间的互相转换的Javascript](https://blog.csdn.net/cuixiping/article/details/45932793)
- [前端图片转base64，转格式，转blob，上传的总结](https://blog.csdn.net/wangzhanzheng/article/details/78923013)
- [前端本地文件操作与上传](https://juejin.im/post/5a193b4bf265da43052e528a)