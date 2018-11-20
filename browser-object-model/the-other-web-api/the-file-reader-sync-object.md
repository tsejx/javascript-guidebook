## FileReaderSync对象

FileReaderSync 接口允许以同步的方式读取 File 或 Blob 对象中的内容。

该接口只在 Workers 里可用，因为在主线程里进行同步 I/O 操作可能会阻塞用户界面。

### 属性

该接口没有任何属性.

### 方法

#### readAsArrayBuffer()

该方法可以读取指定的 Blob 或者 File 对象中的内容。当读取完毕后, 返回一个  ArrayBuffer 对象，里面包含了被读取文件的内容数据。如果在读取过程中发生了错误，则会抛出相关的异常。

```js
ArrayBuffer readAsArrayBuffer(
  in Blob blob
);
```

##### 参数

- `blob`

  将要被读取内容的 Blob 或 File 对象。

##### 返回值

一个 ArrayBuffer 对象，包含了被读取文件的内容。

##### 异常

该方法可能引发下述异常:

- `NotFoundError`

  当 Blob 或 File 对象指代的资源无法找到时，触发该异常。比如，该资源已被删除的情况下。

- `SecurityError`

  当检测到下述几种问题情形时触发该异常：资源已被第三方修改；同时在进行多个读取操作；资源的安全级别过高，不允许浏览器进行操作 （比如系统文件）。

- `NotReadableError`

  当资源由于权限问题不能被读取时触发该异常（比如并发锁）。

- `EncodingError`

  当资源是一个data URL，并且超过了浏览器的限制大小时触发该异常。

- 当资源是一个data URL,并且超过了浏览器的限制大小时触发该异常.

#### readAsText()

该方法可以读取指定的 Blob 或者 File 对象的内容。当读取完毕后，返回一个 DOMString 对象，里面包含了被读取文件的内容数据。可选参数 `encoding` 用来表示文件的编码类型，如果省略该参数，则该方法会使用一些算法自动检测文件的编码类型。如果在读取过程中发生了错误，则会抛出相关的异常。

```js
String readAsText(
  in Blob blob,
  in DOMString encoding 可选
);
```

##### 参数

- `blob`

  将要被读取内容的 Blob 或 File 对象。

- `encoding`

  可选参数，表示被读取文件的编码类型，比如**GBK** 或者 **UTF-8**。

##### 返回值

一个 DOMString 对象，包含了被读取文件的内容。

##### 异常

该方法可能引发下述异常:

- `NotFoundError`

   当 Blob 或 File 对象指代的资源无法找到时,触发该异常.比如,该资源已被删除的情况下。

- `SecurityError`

  当检测到下述几种问题情形时触发该异常：资源已被第三方修改；同时在进行多个读取操作；资源的安全级别过高，不允许浏览器进行操作（比如系统文件）。

- `NotReadableError`

  当资源由于权限问题不能被读取时触发该异常（比如并发锁）。

#### readAsDataURL()

该方法可以读取指定的  Blob 或者 File 对象的内容。当读取完毕后，返回一个Data URL格式的DOMString 对象,里面包含了被读取文件的内容数据。如果在读取过程中发生了错误，则会抛出相关的异常。

```
String readAsDataURL(
  in Blob file
);
```

##### 参数

- `blob`

将要被读取内容的 Blob 或 File 对象.

##### 返回值

一个 DOMString 对象，data URL格式，包含了被读取文件的内容。

##### 异常

该方法可能引发下述异常:

- `NotFoundError`
当 Blob 或 File 对象指代的资源无法找到时，触发该异常。比如，该资源已被删除的情况下。

- `SecurityError`
当检测到下述几种问题情形时触发该异常：资源已被第三方修改；同时在进行多个读取操作；资源的安全级别过高，不允许浏览器进行操作（比如系统文件）。

- `NotReadableError`
当资源由于权限问题不能被读取时触发该异常（比如并发锁）。

- `EncodingError`
当资源是一个data URL，并且超过了浏览器的限制大小时触发该异常。