---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.match
order: 19
---

# String.prototype.match()

`match()`函数用于使用指定的正则表达式模式在当前字符串中进行匹配查找，并返回数组形式的查找结果。

## 语法

```js
str.match(regexp);
```

| 参数     | 说明                                                                                 | 类型   |
| -------- | ------------------------------------------------------------------------------------ | ------ |
| `regexp` | 包含正则表达式模式的 RegExp 对象的实例。也可以是包含正则表达式模式的变量名或字符串。 | RegExo |

💡 如果参数 `regExp` 不是正则表达式对象（RegExp），而是字符串类型，则 `match()` 先将该字符串传递给 RegExp 的构造函数，将其转换为一个 RegExp 对象。

`match()`方法的返回值为 Array 类型，其返回数组的成员取决于指定的正则表达式模式是否设有全局标志 `g`。

- 如果参数 `regExp` 没有全局标志 `g`，则 `match()` 函数只查找**第一个匹配**，并返回包含查找结果的数组，该数组对象包含如下成员：
  - 索引 `0`：存放第一个匹配的子字符串。
  - 属性 `index`：匹配文本在字符串中的起始索引位置。
  - 属性 `input`：整个字符串对象（`str`）。

在 IE 6 ~ IE 8 中，该数组还具有额外的 `lastIndex` 属性，用于存储匹配文本最后一个字符的下一个位置。

- 如果参数 `regExp` 设有全局标志 `g`，则 `match()` 函数会查找**所有的匹配**，返回的数组不再有 `index` 和 `input` 属性，其中的数组元素就是所有匹配到的子字符串，形如：
  - 索引 `0`：存放第一个匹配的子字符串(如果存在的话)。
  - 索引 `1`：存放第二个匹配的子字符串(如果存在的话)。
  - ……
  - 索引 `N-1`：存放第 N 个匹配的字符串(如果存在的话)。

* `match()` 函数如果没有查找到任何匹配，则返回 `null`。

## 说明

- 如果你需要知道一个字符串是否匹配一个正则表达式 RegExp ，可使用 `String.prototype.search()`。
- 如果你只是需要第一个匹配结果，你可能想要使用 `RegExp.prototype.exec()`。
- 如果你想要获得捕获组，并且设置了全局标志，你需要用 `RegExp.prototype.exec()` 。

## 示例

在下例中，使用 match 查找 `"Hello world!"` 紧跟着 1 个或多个数值字符，再紧跟着一个小数点和数值字符 0 次或多次。正则表达式包含 `i` 标志，因此大小写会被忽略。

```js
var str = 'Hello world!';

str.match();
// ["", index: 0, input: "Hello world!", groups: undefined]

str.match(/\b\w/);
// ["H", "w"]

str.match(/\w(?=r)/g);
// null

str.match(/\w[^\w]/g);
// ["o", "d!"]
```

### 全局模式和不区分大小写模式

下例展示了 `match()` 使用 `global` 和 `ignore case` 标志。`A-E`、`a-e` 的所有字母将会作为一个数组的元素返回。

```js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matchArray = str.match(regexp);

console.log(matchArray);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
```

### 不传参数

```js
var str = 'Nothing will come of nothing.';

str.match();
// [""]
```

### 判断是否是微信浏览器

```js
const isWeixin = function() {
  const ua = naviagtor.userAgent.toLowerCase();

  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false;
  }
}
```
