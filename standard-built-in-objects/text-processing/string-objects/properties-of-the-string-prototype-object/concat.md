# String.prototype.concat()

`concat()` 函数用于将当前字符串与指定字符串进行拼接，并返回拼接后的字符串。

## 语法

```javascript
str.concat( string2, string3[, ..., stringN] )
```

### 参数

| 参数          | 类型          | 描述                         |
| ------------- | ------------- | ---------------------------- |
| `str2...strN` | `String` 类型 | 和原字符串连接的多个字符串。 |

### 返回值

`concat()` 函数的返回值为 `String` 类型，其返回值为拼接后的字符串。

`concat()` 函数的作用等同于运算符 `+`，例如：`str.concat(str1, str2) ` 等同于 `str + str1 + str2`。

### 描述

`concat` 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。 `concat ` 方法并不影响原字符串。

## 示例

### 标准示例

下面的例子演示如何将多个字符串与原字符串合并为一个新字符串

```javascript
var hello = "Hello, ";

hello.concat("Kevin", " have a nice day.");	// Hello, Kevin have a nice day.
```
