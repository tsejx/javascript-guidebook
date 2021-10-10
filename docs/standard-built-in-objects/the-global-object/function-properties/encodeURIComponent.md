---
nav:
  title: 内置对象
  order: 2
group:
  title: 全局对象 - 函数属性
  order: 3
title: encodeURIComponent
order: 9
---

# encodeURIComponent

`encodeURIComponent()` 函数用于对统一资源标识符（URI）的有效组件进行编码，并返回编码后的字符串。

该函数属于 `Global` 对象，所有主流浏览器均支持该函数。

## 语法

```js
encodeURIComponent(URIString);
```

| 参数        | 类型          | 说明                      |
| ----------- | ------------- | ------------------------- |
| `URIString` | `String` 类型 | 需要编码的 URI 组件字符串 |

`encodeURIComponent()` 函数的返回值是 `string` 类型，返回一个编码后的 URI 组件字符串。

## 说明

- 如果要对使用`encodeURIComponent()` 函数编码后的 URI 组件字符串进行解码，请使用 [decodeURIComponent()](./decodeURIComponent) 函数。
- `encodeURIComponent()` 函数会编码所有的字符。如果你想把 URI 当作请求参数传递，那么你可以使用本函数。如果你只是想编码一个带有特殊字符（比如中文）的 URI，这个 URI 用作请求地址，请使用 [encodeURI](./encodeURI) 函数。

## 示例

### 代码示例

```js
// 原 URI 组件
var origin = 'ftp://192.168.0.100/共享文件夹';

// 编码 URI 组件
var encodedUri = encodeURIComponent(origin);
document.writeln(encodedUri); // ftp%3A%2F%2F192.168.0.100%2F%E5%85%B1%E4%BA%AB%E6%96%87%E4%BB%B6%E5%A4%B9

// 解码 URI 组件
var decodedUri = decodeURIComponent(encodedUri);
document.writeln(decodedUri); // ftp://192.168.0.100/共享文件夹
```
