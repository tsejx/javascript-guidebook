# decodeURIComponent

**`decodeURIComponent()`** 函数用于对统一资源标识符(URI)的一个已编码的组件进行解码，并返回其非编码形式。

该函数属于`Global`对象，所有主流浏览器均支持该函数。

> 所谓的 URI 组件，就是 URI 的一部分，尤其是 URI 的参数部分。

## 语法

```javascript
decodeURIComponent(encodedURIString )
```

### 参数

| 参数               | 类型          | 说明              |
| ------------------ | ------------- | ----------------- |
| `encodedURIString` | `String` 类型 | 已编码的URI字符串 |

如果参数 `encodedURIString` 无效，将引发 URIError 错误。

### 返回值

- `decodeURIComponent()` 函数的返回值是 String 类型，返回一个已经解码的URI组件。

### 说明

- 将已编码 URI 中所有能识别的转义序列转换成原字符。

## 示例

### 标准示例

```javascript
var str1 = "你好Javascript";
var str2 = encodeURIComponent(str1);
console.log(str2);   
// return '%E4%BD%A0%E5%A5%BDJavascript'

var str3 = decodeURIComponent(str2);
console.log(str3);
// return '你好Javascript'
```

