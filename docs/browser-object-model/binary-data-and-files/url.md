---
nav:
  title: BOM
  order: 5
group:
  title: 二进制数据和文件 API
  order: 10
title: URL API
order: 20
---

# URL API

> ⚠️ 这是一个实验中的功能，此功能某些浏览器尚在开发中，请参考浏览器兼容性表格以得到在不同浏览器中适合使用的前缀。由于该功能对应的标准文档可能被重新修订，所以在未来版本的浏览器中该功能的语法和行为可能随之改变。

URL 接口是一个包含若干静态方法的对象，用来创建 URLs。

当使用一个没有实现该构造器的用户代理时，可以通过 Window.URL 属性来访问该对象（基于 Webkit 和 Blink 内核的浏览器均可用 `Window.webkitURL` 代替）。

## 基本用法

```js
const url = new URL();
```

## 属性

实现 URLUtils 中定义的属性。

| 属性                  | 说明                                                           |
| :-------------------- | :------------------------------------------------------------- |
| URLUtils.href         | 包含完整 URL 的 DOMString。                                    |
| URLUtils.protocol     | 包含 URL 协议名的 DOMString。                                  |
| URLUtils.host         | 包含 URL 域名，`:` 和端口号的 DOMString。                      |
| URLUtils.hostname     | 包含 URL 域名的 DOMString。                                    |
| URLUtils.port         | 包含 URL 端口号的 DOMString。                                  |
| URLUtils.pathname     | 以 `/` 起头紧跟着 URL 文件路径的 DOMString。                   |
| URLUtils.search       | 以 `?` 起头紧跟着 URL 请求参数的 DOMString。                   |
| URLUtils.hash         | 以 `#` 起头紧跟着 URL 锚点标记的 DOMString。                   |
| URLUtils.username     | 包含在域名前面指定的用户名 DOMString。                         |
| URLUtils.password     | 包含在域名前面指定的密码的 DOMString。                         |
| URLUtils.origin       | 返回一个包含协议名、域名和端口号的 DOMString。                 |
| URLUtils.searchParams | 返回一个用来访问当前 URL GET 请求参数的 URLSearchParams 对象。 |

## 方法

URL 接口实现的在 URLUtils 中定义的方法。

| 属性                | 说明                                                                                                 |
| :------------------ | :--------------------------------------------------------------------------------------------------- |
| URLUtils.toString() | 返回一个包含完整 URL 的 DOMString。它是 URLUtils.href 的别名，但区别在于 `toString` 不能用于修改值。 |

## 静态方法

| 属性                  | 说明                                                         |
| :-------------------- | :----------------------------------------------------------- |
| URL.createObjectURL() | 返回一个 DOMString，包含一个唯一的 Blob URL（该 URL 协议）。 |
| URL.revokeObjectURL() | 销毁之前使用 `URL.createObjectURL()` 创建的 URL 实例。       |

```js
const blobUrl = 'blob://'

const URL

```
