---
nav:
  title: 内置对象
  order: 2
group:
  title: 结构化数据
  path: /structured-data/
  order: 14
title: ArrayBuffer
order: 1
---

# ArrayBuffer 对象

`ArrayBuffer` 对象用来表示通用的、固定长度的原始二进制数据缓冲区。

`ArrayBuffer` 不能直接操作，而是要通过 **TypeArray 类型数组对象** 或 **DataView 数据视图对象** 来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

- 读取：
  - 通过 FileReader 将文件转化为 ArrayBuffer 数据
- 写入：
  - 通过 TypeArray 对象进行操作
  - 通过 DataView 对象进行操作

JavaScript 中的 Array 类型，因为有很多功能，而且是不限制类型的，或者它还可能是稀疏的。而如果你从 XHR、FileAPI、Canvas 等各种地方，读取了一大串字节流，如果用 JavaScript 里的 Array 去存储，不仅浪费空间且低效。于是为了配合这些新的 API，增强 JavaScript 的二进制处理能力，就有了 ArrayBuffer。

ArrayBuffer 和 Array 存在很大的区别：

- ArrayBuffer 初始化后固定大小，数组可以自由增减
- 数组放在堆中，ArrayBuffer 把数据放在栈中
- ArrayBuffer 没有 `push` 和 `pop` 等数组的方法
- ArrayBuffer 只能读不能写，写要借助 TypeArray 或 DataView

ArrayBuffer 简单来说就是一片内存，但是你不能（也不方便）直接访问它里面的字节。而要访问 ArrayBuffer，则需要通过 TypedArray 类型引用。（可以将 ArrayBuffer 理解为 **带类型的高速数组** 或 **类型化数组**）

使用场景：

- 上传图片读取和显示
- Canvas 转换图片下载
- WebGL

## 语法

```js
new ArrayBuffer(length);
```

<br />

| 参数     | 类型          | 说明                                        |
| :------- | :------------ | :------------------------------------------ |
| `length` | `Number` 类型 | 要创建的 `ArrayBuffer` 的大小，单位为字节。 |

一个指定大小的 `ArrayBuffer` 对象，其内容被初始化为 0。

## 描述

`ArrayBuffer` 构造函数用来创建一个指定字节长度的 `ArrayBuffer` 对象。

**以现有数据获取 ArrayBuffer**

- [从 Base64 字符串](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Appendix.3A_Decode_a_Base64_string_to_Uint8Array_or_ArrayBuffer)
- [从本地文件](<https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader#readAsArrayBuffer()>)

## 静态属性和方法

### 属性

| 属性                         | 描述                                                             |
| ---------------------------- | ---------------------------------------------------------------- |
| `ArrayBuffer.length`         | ArrayBuffer 构造函数的 length 属性，其值为 1。                   |
| `get ArrayBuffer[@@species]` | 返回 ArrayBuffer 的构造函数。                                    |
| `ArrayBuffer.prototype`      | 通过 ArrayBuffer 的原型对象可以为所有 ArrayBuffer 对象添加属性。 |

### 方法

| 方法                                                 | 描述                                                                                                                  |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `ArrayBuffer.isView(arg)`                            | 如果参数是 ArrayBuffer 的视图实例则返回 `true`，例如 类型数组对象 或 `DataView` 对象；否则返回 `false`。              |
| `ArrayBuffer.transfer(oldBuffer [, newByteLength]);` | 返回一个新的 ArrayBuffer 对象，其内容取自 `oldBuffer` 中的数据，并且根据 `newByteLength` 的大小对数据进行截取或补 0。 |
| `ArrayBuffer.slice()`                                | 和 `ArrayBuffer.prototype.slice()` 功能相同。                                                                         |

## 原型属性和方法

### 属性

| 属性                                | 描述                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `ArrayBuffer.prototype.constructor` | 指定函数，它创建一个对象的原型。其初始值是标准 ArrayBuffer 内置构造函数。 |
| `ArrayBuffer.prototype.byteLength`  | 数组的字节大小。在数组创建时确定，并且不可变更。**只读**。                |

### 方法

| 方法                            | 描述                                                                                                                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ArrayBuffer.prototype.slice()` | 返回一个新的 `ArrayBuffer` ，它的内容是这个 `ArrayBuffer` 的字节副本，从 `begin`（包括），到 `end`（不包括）。如果 `begin` 或 `end` 是负数，则指的是从数组末尾开始的索引，而不是从头开始。 |

## 示例

### 代码示例

下面的例子创建了一个 8 字节的缓冲区，并使用一个 `Int32Array` 来引用它：

```js
const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
```

### 视图生成

ArrayBuffer 作为内存区域，可以存放多种类型的数据。不同数据有不同的存储方式，这就叫做**视图**。

目前，JavaScript 提供以下类型的视图：

- Int8Array：8 位有符号整数，长度 1 个字节。
- Uint8Array：8 位无符号整数，长度 1 个字节。
- Int16Array：16 位有符号整数，长度 2 个字节。
- Uint16Array：16 位无符号整数，长度 2 个字节。
- Int32Array：32 位有符号整数，长度 4 个字节。
- Uint32Array：32 位无符号整数，长度 4 个字节。
- Float32Array：32 位浮点数，长度 4 个字节。
- Float64Array：64 位浮点数，长度 8 个字节。

每一种视图都有一个 BYTES_PER_ELEMENT 常数，表示这种数据类型占据的字节数。

```js
Int8Array.BYTES_PER_ELEMENT;
// 1
Uint8Array.BYTES_PER_ELEMENT;
// 1
//...
```

每一种视图都是一个构造函数，有多种方法可以生成。

```js
// 浏览器控制台输出：
> Int32Array
> function Int32Array() { [native code] }
```

### 通过 TypeArray 对 ArrayBuffer 进行写操作

```js
const typedArray1 = new Int8Array(8);
typeArray1[0] = 32;

const typedArray2 = new Int8Array(typedArray1);
typedArray2[1] = 42;

console.log(typedArray1);
// Int8Array [32, 0, 0, 0, 0, 0, 0, 0]

console.log(typedArray2);
// Int8Array [32, 42, 0, 0, 0, 0, 0, 0]
```

### 通过 DataView 对 ArrayBuffr 进行写操作

```js
const buffer = new ArrayBuffer(16);
const viwe = new DataView(buffer);

view.setInt8(2, 42);
console.log(view.getInt8(2));
// 42
```
