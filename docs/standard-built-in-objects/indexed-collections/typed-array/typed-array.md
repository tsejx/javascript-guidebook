---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Typed Array
order: 100
---

# Typed Array

JavaScript 类型化数组是一种类似数组的对象，并提供了一种用于访问原始二进制数据的机制。 正如你可能已经知道，`Array` 存储的对象能动态增多和减少，并且可以存储任何 JavaScript 值。JavaScript 引擎会做一些内部优化，以便对数组的操作可以很快。然而，随着 Web 应用程序变得越来越强大，尤其一些新增加的功能例如：音频视频编辑、访问 WebSockets 的原始数据等，很明显有些时候如果使用 JavaScript 代码可以快速方便地通过类型化数组来操作原始的二进制数据将会非常有帮助。

但是，不要把类型化数组与正常数组混淆，因为在类型数组上调用 `Array.isArray()` 会返回 `false`。此外，并不是所有可用于正常数组的方法都能被类型化数组所支持（如 `push` 和 `pop`）。

可以使用类型化数组来处理来自网络协议、二进制文件格式和原始图形缓冲区等源的二进制数据。类型化数组还可用于管理具有已知字节布局的内存中二进制数据。

## 缓冲和视图：类型数组架构

为了达到最大的灵活性和效率，JavaScript 类型数组（Typed Arrays）将实现拆分为**缓冲**和**视图**两部分。一个缓冲（由 `ArrayBuffer` 对象实现）描述的是一个数据块。缓冲没有格式可言，并且不提供机制访问其内容。为了访问在缓冲对象中包含的内存，你需要使用视图。视图提供了上下文 — 即数据类型、起始偏移量和元素数 — 将数据转换为实际有类型的数组。

![ArrayBuffer](https://mdn.mozillademos.org/files/8629/typed_arrays.png)

### 数组缓冲

`ArrayBuffer` 是一种数据类型，用来表示一个通用的、固定长度的二进制数据缓冲区。你不能直接操纵一个 `ArrayBuffer` 中的内容；你需要创建一个类型化数组的视图或一个描述缓冲数据格式的 `DataView`，使用它们来读写缓冲区中的内容。

### 类型化数组视图

类型化数组的类型表示可对其创建索引和进行操作的 `ArrayBuffer` 对象的视图。所有数组类型都具有固定长度。

| 类型                | 大小（以字节为单位） | 描述                      | Web IDL 类型        | Equivalent C type |
| ------------------- | -------------------- | ------------------------- | ------------------- | ----------------- |
| `Int8Array`         | 1                    | 8 位补码带符号整数        | byte                | int8_t            |
| `Uint8Array`        | 1                    | 8 位无符号整数            | octet               | uint8_t           |
| `Uint8ClampedArray` | 1                    | 8 位无符号整数（Clamped） | octet               | uint8_t           |
| `Int16Array`        | 2                    | 16 位补码带符号整数       | short               | int16_t           |
| `Uint16Array`       | 2                    | 16 位无符号整数           | unsigned short      | uint16_t          |
| `Int32Array`        | 4                    | 32 位补码带符号整数       | long                | int32_t           |
| `Uint32Array`       | 4                    | 32 位无符号整数           | unsigned short      | uint32_t          |
| `Float32Array`      | 4                    | 32 位 IEEE 浮点           | unrestricted float  | float             |
| `Float64Array`      | 8                    | 64 位 IEEE 浮点           | unrestricted double | double            |

### 数据视图

`DataView` 是一种底层接口，它提供有可以操作缓冲区中任意数据的读写接口。这对操作不同类型数据的场景很有帮助，例如：类型化数组视图都是运行在本地字节序模式（参考 Endianness），可以通过使用 `DataView`来控制字节序。默认是大端字节序（Big-endian），但可以调用读写接口改为小端字节序（Little-endian）。

## 示例

### 使用视图和缓冲

首先，我们创建一个 16 字节固定长度的缓冲：

```js
var buffer = new ArrayBuffer(16);
```

现在我们有了一段初始化为 0 的内存，目前还做不了什么太多操作。让我们确认一下数据的字节长度：

```js
if (buffer.byteLength === 16) {
  console.log("Yes, it's 16 bytes.");
} else {
  console.log("Oh no, it's the wrong size!");
}
```

在实际开始操作这个缓冲之前，需要创建一个视图。我们将创建一个视图，此视图将把缓冲内的数据格式化为一个 32 位的有符号整数数组：

```js
var int32View = new Int32Array(buffer);
```

现在我们可以像普通数组一样访问该数组中的元素：

```js
for (var i = 0; i < int32View.length; i++) {
  int32View[i] = i * 2;
}
```

该代码会将数组以 0, 2, 4 和 6 填充 （一共 4 个 4 字节元素，所以总长度为 16 字节）。

### 同一数据的多个视图

更有意思的是，你可以在同一数据上创建多个视图。例如：基于上文的代码，我们可以添加如下代码处理：

```js
var int16View = new Int16Array(buffer);

for (var i = 0; i < int16View.length; i++) {
  console.log('Entry ' + i + ': ' + int16View[i]);
}
```

这里我们创建了一个 2 字节整数视图，该视图共享上文的 4 字节整数视图的缓冲，然后以 2 字节整数打印出缓冲里的数据，这次我们会得到 0, 0, 2, 0, 4, 0, 6, 0 这样的输出。

那么，这样呢？

```js
int16View[0] = 32;
console.log('Entry 0 in the 32-bit array is now ' + int32View[0]);
```

这次的输出是"Entry 0 in the 32-bit array is now 32"。也就是，这 2 个数组都是同一数据的以不同格式展示出来的视图。你可以使用任何一种 [view types](#类型化数组视图) 中的定义的视图。
