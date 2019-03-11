## WebWorkers

Worker 使用构造函数 `WebWorker` 运行一个命名的 JavaScript 文件，这个文件包含将在工作线程中运行的代码。Worker 运行在另一个全局上下文中，不同与当前的 `window`。因此，使用 `window` 快捷方式获取当前全局范围在一个 Worker 内将返回错误。

在 Worker 线程中你可以运行任何代码，不过有一些例外情况。比如：在 Worker 内，不能直接操作 DOM 节点，也不能使用 `window` 对象的默认方法和属性。然而你可以使用大量 `window` 对象之下的东西，包括 WebSockets，IndexDB 以及 FIreFox OS 专用的 Data Store API 等数据存储机制。

Workers 和主线程间的数据传递通过这样的消息机制进行，双方都使用 `postMessage()` 方法发送各自的消息，使用 `onmessage` 事件处理函数来响应消息（消息被包含在 `Message` 事件的 `data` 属性中）。这个过程中数据并不是被共享而是被复制。

### 实现

#### 创建

主线程调用构造函数 Worker 新建一个 `worker` 线程，构造函数参数是一个 URL。创建方式分为脚本文件和字符串形式。

脚本文件

```js
const worker = new Worker('https:// ~.js')
```

Worker 限制

* 分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

* Worker 不能读取本地的文件（不能打开本机的文件系统 `file://`），它所加载的脚本必须来自网络。

字符串形式

```js
const data = `
	// worker 线程 do something
`
// 转成二进制对象
const blob = new Blob([data])
// 生成URL
const url = window.URL.createObjectURL(blob)
// 加载URL
const worker = new Worker(url)
```

#### 消息接收和发送

Workers 通过 `postMessage()` 方法和 `onmessage` 事情处理函数生效。

```js
first.onchange = function(){
    worker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
}
second.onchange = function(){
    worker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
}
```

在 Worker 中接收到消息后，我们可以写这样一个事件处理函数代码作为响应。

```js
onmessage = function(e){
    console.log('Message received from main script');
    const workerResult = 'Result:' + (e.data[0] * e.data[]1);
    console.log('Posting message back to main script');
    postMessage(workerResult);
}
```

`onmessage` 处理函数允许我们在任何时刻，一旦接收到消息就可以执行一些代码，代码中消息本身作为事件的 `data` 属性进行使用。这里我们简单的对这两个数字作乘法处理并再次使用 `postMessage()` 方法，将结果回传给主线程。

回到主线程，我们再次使用 `onmessage` 以响应 Worker 回传的消息。

```js
worker.onmessage = function(e){
    result.textContent = e.data;
    console.log('Message received from worker');
}
```

#### 终止

如果需要从主线程中立刻终止一个运行中的 Worker，可以调用 Worker 的 `terminate` 方法。

```js
worker.terminate()
```

Worker 线程会被立即杀死，不会有任何机会让它完成自己的操作或清理工作。

而在 Worker 线程中，Workers 也可以调用自己的 `close` 方法进行关闭。

```js
close()
```

### 应用场景

WebWorker 带来后台计算能力，WebWorker 自身是由 Webkit 多线程实现，但它并没有为 JavaScript 语言带来多线程编程特性，我们现在仍然不能在 JavaScript 代码中创建并管理一个线程，或者主动控制线程间的同步与锁等特性。Web Worker 只是浏览器（宿主环境）提供的一个能力 / API。而且它不支持 IE。

**使用专用线程进行数学运算**
Web Worker 最简单的应用就是用来做后台计算，而这种计算并不会中断前台用户的操作

**图像处理**
通过使用从 Canvas 或者 Video 元素中获取的数据，可以把图像分割成几个不同的区域并且把它们推送给并行的不同 Workers 来做计算

**大量数据的检索**
当需要在调用 AJAX 后处理大量的数据，如果处理这些数据所需的时间长短非常重要，可以在 Web Worker 中来做这些，避免冻结 UI 线程。

**背景数据分析**
由于在使用 Web Worker 的时候，我们有更多潜在的 CPU 可用时间，我们现在可以考虑一下 JavaScript 中的新应用场景。我们现在可以考虑一下 JavaScript 中的新应用场景。例如，我们可以想像在不影响 UI 体验的情况下实时处理用户输入。利用这样一种可能，我们可以想像一个像 Word（Office Web Apps 套装）一样的应用：当用户打字时后台在词典中进行查找，帮助用户自动纠错等等。

