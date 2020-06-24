---
nav:
  title: 内置对象
  order: 2
group:
  title: 全局对象 - 函数属性
  order: 3
title: encodeURI
order: 8
---

# encodeURI

`encodeURI()` 函数可把 URI 字符串采用 UTF-8 编码格式转化成 escape 格式的字符串。

该函数属于 `Global` 对象，所有主流浏览器均支持该函数。

## 语法

```js
encodeURI(URIString);
```

| 参数        | 类型          | 说明                  |
| ----------- | ------------- | --------------------- |
| `URIString` | `String` 类型 | 需要编码的 URI 字符串 |

该方法返回一个已经编码的 URI 字符串。

## 说明

如果要对使用 `encodeURI()` 函数编码的 URI 字符串进行解码，请使用 `decodeURI()` 函数。

`encodeURI()` 函数不编码字符有 82 个 `!`、`#`、`$`、`'`、`(`、`)`、`*`、`+`、`,`、`-`、`.`、`/`、`:`、`;`、`=`、`?`、`@`、`_`、`~`、`0-9`、`a-z`、`A-Z` 。

如果你只是想编码一个带有特殊字符（比如中文）的 URI，这个 URI 用作请求地址，请使用本函数。

如果你想把 URI 当作请求参数传递，那么你可以使用 `encodeURIComponent()` 函数。`encodeURIComponent()` 函数会编码所有的字符。

## 示例

```js
// 原URI
var ftpUri = 'ftp://192.168.0.100/共享文件夹';

// 编码URI
var encodedFtpUri = encodeURI(ftpUri);
console.log(encodedFtpUri); // ftp://192.168.0.100/%E5%85%B1%E4%BA%AB%E6%96%87%E4%BB%B6%E5%A4%B9

// 解码URI
var decodedFtpUri = decodeURI(encodedFtpUri);
console.log(decodedFtpUri); // ftp://192.168.0.100/共享文件夹
```
