## XMLHttpRequest 对象

使用 XMLHttpRequest（XHR） 对象可以与服务器交互。您可以从 URL 获取数据，而无需让整个的页面刷新。这使得 Web 页面可以只更新页面的局部，而不影响用户的操作。XMLHttpRequest 在 Ajax 编程中被大量使用。

**Ajax**（Asynchronous JavaScript and XML）是一系列 Web 开发技术的集合，使用很多的 Web 技术在客户端开发异步 Web 应用。利用 Ajax，Web应用可以异步的发送数据获取数据，而不干扰现有页面的显示和行为。通过解耦数据接口层和展现层，Ajax 允许 Web 页面或者其他扩展的 Web 应用动态的改变数据而不用重新加载整个页面。实现通常选择 JSON 代替 XML，因为更接近 JavaScript。

### XMLHttpRequest 详解

#### 构造函数

用于初始化一个 XMLHttpRequest 对象，必须在所有其他方法被调用前调用构造函数。

```js
const req = new XMLHttpRequest()
```

#### 属性

此接口继承了 `XMLHttpRequestEventTarget` 和 `EventTarget` 的属性。

| 属性                 | 说明                                                         | 类型                       |
| -------------------- | ------------------------------------------------------------ | -------------------------- |
| `onreadystatechange` | 当 `readyState` 属性改变时会调用它                           | function                   |
| `readyState`         | 用于表示请求的五种状态                                       | unsigned short             |
| `response`           | 响应体的类型由 responseType 来指定，可以是 ArrayBuffer、Blob、Document、JSON，或者是字符串。如果请求未完成或失败，则该值为 null | varies                     |
| `responseText`       | 此请求的响应为文本，或者当请求未成功或还是未发送时未 null（只读） | DOMString                  |
| `responseType`       | 设置该值能够改变响应类型，就是告诉服务器你期望的响应格式     | XMLHttpRequestResponseType |
| `status`             | 请求的响应状态码（只读）                                     | unsigned short             |
| `statusText`         | 请求的响应状态信息，包含一个状态码和消息文本（只读）         | DOMString                  |
| `timeout`            | 表示一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时时间。超时并不能应用在同步请求中，否则会抛出一个 InvalidAccessError 异常。当发生超时时，timeout 事件将会被触发。 | unsigned long              |
| `upload`             | 可以在 upload 上添加一个事件监听来跟踪上传过程               | XMLHttpRequestUpload       |
| `withCredentials`    | 表明指定跨域的请求是否应该使用认证信息（例如 Cookie 或授权请求头） | boolean                    |

#### 方法

* `abort()` - 如果请求已经被发送，则立刻中止请求

* `getAllResquestHeaders()` - 返回所有响应头信息（响应头名和值），如果响应头还没有接收，则返回 null。**注意：使用该方法获取的 response headers 与在开发者工具 Network 面板中看到的响应头不一致**

* `getRequestHeader()` - 返回指定响应头的值，如果响应头还没有被接收，或该响应头不存在，则返回 null。**注意：使用该方法获取某些响应头时，浏览器会抛出异常，具体原因如下：**

  * W3C 的 xhr 标准中做了限制，规定客户端无法获取 response 中的 `Set-Cookie`、`Set-Cookie2` 这2个字段，无论是同域还是跨域请求
  * W3C 的 cors 标准对于跨域请求也做了限制，规定对于跨域请求，客户端允许获取的 response header 字段只限于 simple response header（常见的 simple response header 如下）
    * Cache-Control
    * Content-Language
    * Content-Type
    * Expires
    * Last-Modified
    * Pragma
    * Access-Control-Expose-Headers

* `open()` - 初始化一个请求

  * 方法签名：

    ```js
    void open(
    	DOMString method,
        DOMString url,
        optional boolean async,
        optional DOMString user,
        optional DOMString password
    )
    ```

   * 参数

      * `method` - 请求方法，如 GET、POST、PUT、DELETE
      * `url` - 请求的 URL 地址
      * `async` - 一个可选的布尔值参数，默认值为 true，表示执行异步操作。如果值为 false，则 `send()` 方法不会返回任何东西，直到接收到了服务器的返回数据
      * `user` - 用户名，可选参数，用于授权。默认参数为空字符串
      * `password` - 密码，可选参数，用于授权。默认参数为空字符串

   * 备注

      * 如果 method 不是有效的 HTTP 方法或 URL 地址不能被成功解析，将会抛出 `SyntaxError` 异常
      * 如果请求方法（不区分大小写）为 `CONNECT`、`TRACE` 或 `TRACK` 将会抛出 `SecurityError` 异常

 * `overrideMimeType()` - 重写由服务器返回的 MIME 类型。例如，可以用于强制把响应流当做 `text/xml` 来解析，即使服务器没有指明数据是这个类型。**注意：这个方法必须在 send() 之前被调用。**

 * `send()` - 发送请求。如果该请求是异步模式(默认)，该方法会立刻返回。相反，如果请求是同步模式，则直到请求的响应完全接受以后，该方法才会返回。**注意：所有相关的事件绑定必须在调用 send() 方法之前进行。**

    * 方法签名：

      ```js
      void send()
      void send(ArrayBuffer, data)
      void send(Blbo data)
      void send(Document data)
      void send(DOMString? data)
      void send(FormData data)
      ```

   * `sentRequestHeader()` 设置 HTTP 请求头信息。**注意：在这之前，你必须确认已经调用了 open() 方法打开了一个 url**

       * 方法签名：

        ```js
        void setRequestHeader(
           DOMString header,
           DOMString value
        )
        ```

    * 参数

        * `header` 请求头名称
        * `value` 请求头值

* `sendAsBinary()` 发送二进制的 `send()` 方法的变种

    * 方法签名：

        ```js
        void sendAsBinary(
        	in DOMString body
        )
        ```

    * 参数：

        * body 消息体

#### 事件

* [loadstart](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FEvents%2Floadstart) - 当程序开始加载时，loadstart 事件将被触发。

* [progress](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FEvents%2F%25E8%25BF%259B%25E5%25BA%25A6%25E6%259D%25A1) - 进度事件会被触发用来指示一个操作正在进行中。

* [abort](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FEvents%2Fabort) - 当一个资源的加载已中止时，将触发 abort 事件。

* [error](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FEvents%2Ferror) - 当一个资源加载失败时会触发error事件。

* [load](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FEvents%2Fload) - 当一个资源及其依赖资源已完成加载时，将触发load事件。

* [timeout](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FEvents%2Ftimeout) - 当进度由于预定时间到期而终止时，会触发timeout 事件。

* [loadend](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FEvents%2Floadend) - 当一个资源加载进度停止时 (例如，在已经分派“错误”，“中止”或“加载”之后)，触发loadend事件。

* [readystatechange](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FEvents%2Freadystatechange) - readystatechange 事件会在 document.readyState属性发生变化时触发。

### XMLHttpRequest Level 1

XMLHttpRequest Level 1使用：

```js
const xhr = new XMLHttpRequest()

xhr.open('GET', 'example.php')
xhr.send()

xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200) {
        alert(xhr.responseText)
    } else {
        alert(xhr.statusText)
    }
}
```

XMLHttpRequest Level1缺点

* 只支持文本数据的传送，无法用来读取和上传二进制文件
* 传送和接收数据时，没有进度信息，只能提示有没有完成
* 受到[「同域限制」](https://www.w3.org/Security/wiki/Same_Origin_Policy)(Same Origin Policy)，只能向同一域名的服务器请求数据

### XMLHttpRequest Level 2

XMLHttpRequest Level 2针对 XMLHttpRequest Level 1 的缺点，做了大幅改进。

* 可以设置 HTTP 请求的超时时间
* 可以使用 FormData 对象管理表单数据
* 可以上传文件
* 可以请求不同域名下的数据（跨域请求）
* 可以获取服务端的二进制数据
* 可以获得数据传输的进度信息

#### 设置超时时长

新版本 XMLHttpRequest 对象，增加了 timeout 属性，可以设置 HTTP 请求的时限。

```js
xhr.timeout = 3000
```

上面的语句，将最长等待时间设为3000毫秒。过了这个时限，就自动停止HTTP请求。与之配套的还有一个 `timeout` 事件，用来指定回调函数。

```js
xhr.ontimeout = function(event){
　　console.log('请求超时');
}
```

#### FormData 对象

AJAX 操作往往用来传递表单数据。为了方便表单处理，HTML 5新增了一个 FormData 对象，可以用于模拟表单。

点击查看 [FormData 对象](./the-form-data-object.md)详细分析。

#### 上传文件

新版 XMLHttpRequest 对象，不仅可以发送文本信息，还可以上传文件。

```html
<input id='input' type='file'>
```

```js
const input = document.getElementById('input')
formData = new FormData()
formData.append('file', input.files[0])		// file名称与后台接收的名称一致

const url = 'http://localhost:3000/upload'
method = 'POST

xhr.send(formData)
```

#### 跨域资源共享（CORS）

新版本的 XMLHttpRequest 对象，可以向不同域名的服务器发出 HTTP 请求。这叫做 [「跨域资源共享」](https://link.juejin.im/?target=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCross-Origin_Resource_Sharing)（Cross-origin resource sharing，简称 CORS）。

使用「跨域资源共享」的前提，是浏览器必须支持这个功能，而且服务器端必须同意这种「跨域」。如果能够满足上面的条件，则代码的写法与不跨域的请求完全一样。

```js
xhr.open('GET', 'http://other.server/and/path/to/script')
```

#### 接收二进制数据

从服务器取回二进制数据，较新的方法是使用新增的 `responseType` 属性。如果服务器返回文本数据，这个属性的值是 `TEXT`，这是默认值。较新的浏览器还支持其他值，也就是说，可以接收其他格式的数据。

你可以把 `responseType` 设为 `blob`，表示服务器传回的是二进制对象。

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', '/path/to/image.png')
xhr.responseType = 'blob'
xhr.send()
```

接收数据的时候，用浏览器自带的 [Blob 对象](./the-blob-object.md)即可。

> 一个 **Blob** 对象表示一个不可变的, 原始数据的类似文件对象。Blob 表示的数据不一定是一个 JavaScript 原生格式。 [`File`](./the-file-object.md) 接口基于Blob，继承 blob功能并将其扩展为支持用户系统上的文件。

```js
const blob = new Blob([xhr.response], {type: 'image/png'})
```

#### 进度信息

新版本的 XMLHttpRequest 对象，传送数据的时候，有一个 `progress` 事件，用来返回进度信息。

它分成上传和下载两种情况。下载的 `progress` 事件属于 XMLHttpRequest 对象，上传的 `progress` 事件属于 XMLHttpRequest.upload 对象。

我们先定义 `progress` 事件的回调函数：

```js
xhr.onprogress = updateProgress;
xhr.upload.onprogress = updateProgress
```

然后，在回调函数里面，使用这个事件的一些属性。

```js
function updateProgress(event) {
　　if (event.lengthComputable) {
　　　　var percentComplete = event.loaded / event.total;
　　}
}
```

上面的代码中，`event.total` 是需要传输的总字节，`event.loaded` 是已经传输的字节。如果event.lengthComputable 不为真，则 `event.total` 等于0。

各个浏览器 XMLHttpRequest Level 2 的兼容性 - [Can I use/xhr2](https://link.juejin.im?target=http%3A%2F%2Fcaniuse.com%2F%23feat%3Dxhr2)

### XHR 下载数据

XHR 可以传输基于文本和二进制数据。实际上，浏览器可以为各种本地数据类型提供自动编码和解码，这样可以让应用程序将这些类型直接传递给 XHR，以便正确编码，反之亦然，这些类型可以由浏览器自动解码：

- ArrayBuffer - 固定长度二进制数据缓冲区
- Blob - 二进制不可变数据
- Document - HTML或XML文档
- JSON - JavaScript Object Notation
- Text - 普通文本

 ```js
const xhr = new XMLHttpRequest()
xhr.open('GET', 'https://images.github.com/u/123456')
xhr.responseType = 'blob'										// Step 1

xhr.onload = function(){
    if (this.status === 200) {
        const img = document.createElement('img')
        img.src = window.URL.createObjectURL(this.response)		// Step 2
        img.onload = function (){
            window.URL.revokeObjectURL(this.src)				// Step 3
        }
        document.body.appendChild(img)
    }
}
xhr.send()
 ```

1. 设置响应的数据类型为 `blob`
2. 基于 Blob 创建一个唯一的对象 URL，并作为图片的源地址（URL.createObjectURL）
3. 图片加载完成后释放对象的 URL（URL.revokeObjectURL）

### XHR 上传数据

通过 XHR 上传数据对于所有数据类型来说都是简单而有效的。实际上，唯一的区别是当我们在XHR请求中调用 `send()` 时，我们需传递不同的数据对象。其余的由浏览器处理：

```js
var xhr = new XMLHttpRequest();
xhr.open('POST','/upload');
xhr.onload = function() { ... };
xhr.send("text string"); 						// Step 1

var formData = new FormData(); 					// Step 2
formData.append('id', 123456);
formData.append('topic', 'performance');

var xhr = new XMLHttpRequest();
xhr.open('POST', '/upload');
xhr.onload = function() { ... };
xhr.send(formData); 							// Step 3

var xhr = new XMLHttpRequest();
xhr.open('POST', '/upload');
xhr.onload = function() { ... };
var uInt8Array = new Uint8Array([1, 2, 3]); 	// Step 4
xhr.send(uInt8Array.buffer); 					// Step 5
```

1. 发送普通的文本到服务器
2. 通过 [FormData API](./the-form-data-object.md) 创建动态表单
3. 发送 FormData 数据到服务器
4. 创建 Unit8Array 数组（Unit8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0）
5. 发送二进制数据到服务器

除此之外，XHR 还支持大文件分片上传：

```js
var blob = ...; 							// Step 1

const BYTES_PER_CHUNK = 1024 * 1024; 		// Step 2
const SIZE = blob.size;

var start = 0;
var end = BYTES_PER_CHUNK;

while(start < SIZE) { 						// Step 3
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload');
  xhr.onload = function() { ... };

  xhr.setRequestHeader('Content-Range', start+'-'+end+'/'+SIZE); 	// Step 4
  xhr.send(blob.slice(start, end)); 		// Step 5

  start = end;
  end = start + BYTES_PER_CHUNK;
}
```

1. 一个任意的数据块（二进制或文本）
2. 将数据库大小设置为1MB
3. 迭代提供的数据，增量为1MB
4. 设置上传的数据范围（Content-Range请求头）
5. 通过 XHR 上传1MB数据块

### 监听上传和下载速度

XHR 对象提供了一系列 API，用于监听进度事件，表示请求的当前状态：

| 事件类型  | 描述           | 触发次数  |
| --------- | -------------- | --------- |
| loadstart | 开始传输       | 1次       |
| progress  | 传输中         | 0次或多次 |
| error     | 传输中出现错误 | 0次或1次  |
| abort     | 传输被用户取消 | 0次或1次  |
| load      | 传输成功       | 0次或1次  |
| loadend   | 传输完成       | 1次       |

每个 XHR 传输都以 `loadstart` 事件开始，并以 `loadend` 事件结束，并在这两个事件期间触发一个或多个附加事件来指示传输的状态。因此，为了监控进度，应用程序可以在 XHR 对象上注册一组 JavaScript 事件侦听器：

```js
var xhr = new XMLHttpRequest();
xhr.open('GET','/resource');
xhr.timeout = 5000; 										// Step 1

xhr.addEventListener('load', function() { ... }); 			// Step 2
xhr.addEventListener('error', function() { ... }); 			// Step 3

var onProgressHandler = function(event) {
  if(event.lengthComputable) {
    var progress = (event.loaded / event.total) * 100; 		// Step 4
    ...
  }
}

xhr.upload.addEventListener('progress', onProgressHandler); // Step 5
xhr.addEventListener('progress', onProgressHandler); 		// Step 6
xhr.send();
```

1. 设置请求超时时间为 5000 ms （默认无超时时间）
2. 注册成功回调

3. 注册异常回调

4. 计算已完成的进度

5. 注册上传进度事件回调
6. 注册下载进度事件回调

### 使用XHR流式传输数据

在某些情况下，应用程序可能需要或希望逐步处理数据流：将数据上传到服务器，使其在客户机上可用，或者在从服务器下载数据时，进行流式处理。

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/stream');
xhr.seenBytes = 0;

xhr.onreadystatechange = function() {  							// Step 1
  if(xhr.readyState > 2) {
    var newData = xhr.responseText.substr(xhr.seenBytes); 		// Step 2
    // process newData
    xhr.seenBytes = xhr.responseText.length; 					// Step 3
  }
};

xhr.send();
```

1. 监听 `onreadystatechange` 事件
2. 从部分响应中提取新数据
3. 更新处理的字节偏移

这个例子可以在大多数现代浏览器中使用。但是，性能并不好，而且还有大量的注意事项和问题：

- 请注意，我们正在手动跟踪所看到字节的偏移量，然后手动分割数据：`responseText` 正在缓冲完整的响应！对于小的传输，这可能不是一个问题，但对于更大的下载，特别是在内存受限的设备，如手机，这是一个问题。释放缓冲响应的唯一方法是完成请求并打开一个新的请求。
- 部分响应只能从 `responseText` 属性中读取，这将限制为仅限文本传输。没有办法读取二进制传输的部分响应。
- 一旦读取了部分数据，我们必须识别消息边界：应用程序逻辑必须定义自己的数据格式，然后缓冲并解析流以提取单个消息。
- 浏览器在处理缓冲数据方面有所不同：一些浏览器可能会立即释放数据，而其他浏览器可能会缓冲小的响应并等到积累到一定大小的数据块才释放它们。
- 浏览器对不同 Content-Type 资源类型的处理方式不同，对于某些资源类型允许逐步读取。例如，`text / html ` 类型，而其他 Content-Type 类型只能使用 `application / x-javascript`。

### XHR 定时轮询

从服务器检索更新的最简单的策略之一是让客户端进行定期检查：客户端可以以周期性间隔（轮询服务器）启动后台 XHR 请求，以检查更新。如果新数据在服务器上可用，则在响应中返回，否则响应为空。

定时轮询的方式很简单，但如果定时间隔很短的话，也是很低效。因此设置合适的时间间隔显得至关重要：轮询间隔时间过长，会导致更新不及时，然而间隔时间过短的话，则会导致客户端与服务器不必要的流程和高开销。接下来我们来看一个简单的示例：

 ```js
function checkUpdates(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() { ... }; 								// Step 1
  xhr.send();
}

setInterval(function() { checkUpdates('/updates') }, 60000); 	// Step 2
 ```

1.  处理服务端接收的数据
2. 设置定时轮询时间为60s

定时轮询会产生以下的问题：

* 每个 XHR 请求都是一个独立的 HTTP 请求，平均来说，HTTP 的请求头可能会引起大约 800 字节的开销 (不带HTTP cookie)。

> 每个浏览器发起 HTTP 请求时都将携带额外的 500 - 800 字节的元数据 (请求头)，如 `user-agent`、`accept`、`Cache-Control` 缓存控制头等。更糟糕的是，500 - 800 字节是理想的情况，如果携带 Cookies 信息，那么这个数值将会更大。总而言之，这些未压缩的 HTTP 元数据会引起很大开销。

* 如果数据能够在间隔期间顺序到达，那么定时轮询可以正常工作。但我们并没有任何机制保证数据的正常接收。另外周期性轮询也将会引起服务器上可用的消息及其传送到客户端之间引入额外的延迟。简单的理解是如果有轮询期间有新的可用消息，客户端是不会马上收到此新消息，而是要等到下一次轮询的时候，才能获取最新数据。
* 除非仔细考虑，不然轮询通常会成为无线网络上昂贵的性能反模式。频繁地轮询会大量的消耗移动设备的电量。

#### 轮询开销

平均每个 HTTP 1.x 请求会增加大约800字节的请求和响应开销（详细信息可以查看 - [Measuring and Controlling Protocol Overhead](https://link.juejin.im?target=https%3A%2F%2Fhpbn.co%2Fhttp1x%2F%23measuring-and-controlling-protocol-overhead)） 。另外在客户端登录后，我们还将产生一个额外的身份验证 cookie 和 消息ID; 假设这又增加了50个字节。因此，不返回新消息的请求将产生 850字节开销！现在假设我们有10,000个客户端，所有的轮询间隔时间都是60秒：

```
(850 bytes  *8 bits*  10,000) / 60 seconds ≈ 1.13 Mbps
```

每个客户端在每个请求上发送 850 字节的数据，这转换为每秒 167 个请求，服务器上的吞吐量大约为 1.13 Mbps！这不是一个固定的值，此外该计算值还是在假设服务器没有向任何客户端传递任何新的消息的理想情况下计算而得的。

### XHR 长轮训

周期性轮询的挑战在于有可能进行许多不必要的和空的检查。

![XHR长轮询](https://user-gold-cdn.xitu.io/2017/4/5/48adb62206ddbaf5ec726b623f534809.svg?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

通过保持长连接，直到更新可用，数据可以立即发送到客户端，一旦它在服务器上可用。因此，长时间轮询为消息延迟提供了最佳的情况，并且还消除了空检查，这减少了 XHR 请求的数量和轮询的总体开销。一旦更新被传递，长的轮询请求完成，并且客户端可以发出另一个长轮询请求并等待下一个可用的消息：

```js
function checkUpdates(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() { 			// Step 1
    ...
    checkUpdates('/updates'); 			// Step 2
  };
  xhr.send();
}

checkUpdates('/updates'); 				// Step 3
```

1. 处理接收到的数据并启动下一轮检测更新
2. 启动下一轮检测更新
3. 发起首次更新请求

那么长时间轮询总是比定期轮询更好的选择？除非消息到达率已知且不变，否则长轮询将始终提供更短的消息延迟。

另一方面，开销讨论需要更细微的观点。首先，请注意，每个传递的消息仍然引起相同的 HTTP 开销；每个新消息都是独立的 HTTP 请求。但是，如果消息到达率高，那么长时间轮询会比定期轮询发出更多的 XHR 请求！

长轮询通过最小化消息延迟来动态地适应消息到达速率，这是您可能想要的或可能不需要的行为。如果对消息延迟要求不高的话，则定时轮询可能是更有效的传输方式。例如，如果消息更新速率较高，则定时轮询提供简单的”消息聚合“机制（即合并一定时间内的消息），这可以减少请求数量并提高移动设备的电池寿命。

### XMLHttpRequest 库

#### Mock.js

Mock.js 是一款模拟数据生成器，旨在帮助前端攻城师独立于后端进行开发，帮助编写单元测试。提供了以下模拟功能：

- 根据数据模板生成模拟数据
- 模拟 Ajax 请求，生成并返回模拟数据
- 基于 HTML 模板生成模拟数据

详细信息，请查看 - [Mock.js 文档](https://link.juejin.im?target=http%3A%2F%2Fmockjs.com%2F0.1%2F)

#### Zone.js

[Zone](https://link.juejin.im?target=https%3A%2F%2Fdomenic.github.io%2Fzones%2F) 是下一个 ECMAScript 规范的建议之一。Angular 团队实现了 JavaScript 版本的 [zone.js](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fangular%2Fzone.js%2F) ，它是用于拦截和跟踪异步工作的机制。

Zone 是一个全局的对象，用来配置有关如何拦截和跟踪异步回调的规则。Zone 有以下能力：

- 拦截异步任务调度，如 setTimeout、setInterval、XMLHttpRequest 等
- 提供了将数据附加到 zones 的方法
- 为异常处理函数提供正确的上下文
- 拦截阻塞的方法，如 alert、confirm 方法

zone.js 内部使用 [Monkey Patch](https://link.juejin.im?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMonkey_patch) 方式，拦截 XMLHttpRequest.prototype 对象中的 open、send、abort 等方法。

```js
// zone.js 源码片段
var openNative = patchMethod(window.XMLHttpRequest.prototype, 'open', function () { 
    return function (self, args) {
        self[XHR_SYNC] = args[2] == false;
        return openNative.apply(self, args);
    }; 
});
```

#### Oboe.js

Oboe.js 通过将 HTTP 请求-应答模型封装在一个渐进流式接口中，帮助网页应用快速应答。它将 streaming 和downloading 间的转换与 SAX 和 DOM 间 JSON 的解析整合在一起。它是个非常小的库，不依赖于其他程序库。它可以在 ajax 请求结束前就开始解析 json 变得十分容易，从而提高应用的应答速度。另外，它支持 Node.js 框架，还可以读入除了 http 外的其他流。

有兴趣的读者，推荐看一下官网的可交互的演示示例 - [Why Oboe.js](https://link.juejin.im?target=http%3A%2F%2Foboejs.com%2Fwhy)

```js
// oboe-browser.js 源码片段
function handleProgress() {            
    var textSoFar = xhr.responseText,
        newText = textSoFar.substr(numberOfCharsAlreadyGivenToCallback);
    if( newText ) {
        emitStreamData( newText );
    } 
    numberOfCharsAlreadyGivenToCallback = len(textSoFar);
}
```

#### fetch.js

fetch 函数是一个基于 Promise 的机制，用于在浏览器中以编程方式发送 Web 请求。该项目是实现标准 [Fetch](https://link.juejin.im?target=https%3A%2F%2Ffetch.spec.whatwg.org%2F) 规范的一个子集的 polyfill ，足以作为传统 Web 应用程序中 XMLHttpRequest 的代替品。

详细信息，请参考 - [Github - fetch](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fgithub%2Ffetch) 

Fetch API 兼容性，请参考 - [Can I use Fetch](https://link.juejin.im?target=http%3A%2F%2Fcaniuse.com%2F%23search%3DFetch)

---

参考资料：

* [你不知道的 XMLHttpRequest](https://juejin.im/post/58e4a174ac502e006c1e18f4)
* [前端必备 HTTP 技能之 Ajax 技术](https://juejin.im/entry/5839848b67f356006ba4d453)