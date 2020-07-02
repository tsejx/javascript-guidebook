---
nav:
  title: BOM
  order: 5
group:
  title: 数据通信 API
  order: 11
title: Progress Event
order: 10
---

# Progress Event

这个 `ProgressEvent` 接口用来测量底层操作一个 HTTP 请求的进度。

## 构造函数

```js
const progressEvent = new ProgressEvent();
```

## 属性

同时继承它的父元素 `Event` 的属性。

| 属性                           | 说明                                                                                                                                                                                                |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ProgressEvent.lengthComputable | （只读）它是一个布尔值标识，表明总共需要完成的工作量和已经完成的工作是否可以被底层所计算到。换而言之，它表示的就是过程是否是可以测量的。                                                            |
| ProgressEvent.loaded           | （只读）是一个 `unsigned long long` 类型，表示底层进程已经执行到的工作量。所做的工作比率可以用属性和 ProgressEvent.total 计算。当使用 HTTP 下载资源，这只表示内容本身的一部分，而不是头和其他开销。 |
| ProgressEvent.total            | （只读）是 `unsigned long long` 类型，表示底层进程正在执行的工作总量。当使用 HTTP 下载资源时，这只表示内容本身，而不是头和其他开销。                                                                |

## 示例

下面的例子向一个新的 XMLHTTPRequest 请求添加了一个 ProgressEvent，并且用它来显示这个请求的状态。

```js
const progressBar = document.getElementById('p');
const client = new XMLHttpRequest();

client.open('GET', 'magical-unicorns');
client.onprogress = function(pe) {
  if (pe.lengthComputable) {
    progressBar.max = pe.total;
    progressBar.value = pe.loaded;
  }
};
client.onloadend = function(pe) {
  progressBar.value = pe.loaded;
};
client.send();
```
