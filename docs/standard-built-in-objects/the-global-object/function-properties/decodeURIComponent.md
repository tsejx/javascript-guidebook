---
nav:
  title: 内置对象
  order: 2
group:
  title: 全局对象 - 函数属性
  order: 3
title: decodeURIComponent
order: 7
---

# decodeURIComponent

**`decodeURIComponent()`** 函数用于对统一资源标识符(URI)的一个已编码的组件进行解码，并返回其非编码形式。

该函数属于`Global`对象，所有主流浏览器均支持该函数。

> 所谓的 URI 组件，就是 URI 的一部分，尤其是 URI 的参数部分。

## 语法

```js
decodeURIComponent(encodedURIString);
```

| 参数               | 类型          | 说明                |
| ------------------ | ------------- | ------------------- |
| `encodedURIString` | `String` 类型 | 已编码的 URI 字符串 |

如果参数 `encodedURIString` 无效，将引发 URIError 错误。

`decodeURIComponent()` 函数的返回值是 String 类型，返回一个已经解码的 URI 组件。

## 示例

```js
var a = 'Hello JavaScript';
var b = encodeURIComponent(a);

console.log(b);
// return '%E4%BD%A0%E5%A5%BDJavascript'

var c = decodeURIComponent(b);
console.log(c);
// return '你好Javascript'
```
