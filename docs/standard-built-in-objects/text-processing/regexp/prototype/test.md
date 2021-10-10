---
nav:
  title: 内置对象
  order: 2
group:
  title: RegExp
  path: /text-processing/regexp/
  order: 10
title: RegExp.prototype.test
order: 4
---

# RegExp.prototype.test()

`test()` 方法执行一个检索，用来测试正则表达式与指定的字符串是否匹配。

## 语法

```js
regExpObject.test(str);
```

| 参数           | 类型          | 描述                                   |
| -------------- | ------------- | -------------------------------------- |
| `regExpObject` | `RegExp` 类型 | 匹配的正则表达式。                     |
| `str`          | `String` 类型 | 指定的字符串。将在该字符串中执行搜索。 |

如果正则表达式与指定的字符串匹配 ，返回 `true`；否则 `false`。

## 描述

- 值得注意的是，每次执行`test()`函数都只查找最多一个匹配，如果找到就立即返回 `true`，否则返回 `false`。
- 如果为正则表达式设置了全局标志 `g`，`test()`函数仍然只查找最多一个匹配，不过我们再次调用该对象的 `test()` 函数就可以查找下一个匹配。

其原因是：如果 `regExpObject` 带有全局标志 `g`，`test()` 函数不是从字符串的开头开始查找，而是从属性 `regExpObject.lastIndex` 所指定的索引处开始查找。该属性值默认为 0，所以第一次仍然是从字符串的开头查找。当找到一个匹配时，`test()` 函数会将 `regExpObject.lastIndex` 的值改为字符串中本次匹配内容的最后一个字符的下一个索引位置。当再次执行 `test()` 函数时，将会从该索引位置处开始查找，从而找到下一个匹配。

因此，当我们使用 `test()` 函数执行了一次匹配之后，如果想要重新使用 `test()` 函数**从头开始**查找，则需要手动将 `regExpObject.lastIndex` 的值重置为 0。如果 `test()` 函数再也找不到可以匹配的文本时，该函数会自动把 `regExpObject.lastIndex` 属性重置为 0。

## 示例

### 代码示例

一个简单的例子，测试 "hello" 是否包含在字符串的最开始，返回布尔值。

```js
let str = 'hello world!';

let result = /^hello/.test(str);

console.log(result); // true
```

### 当设置全局标志的正则使用 `test()`

如果正则表达式设置了全局标志，`test()` 的执行会改变正则表达式 `lastIndex`属性。连续的执行 `test()` 方法，后续的执行将会从 `lastIndex` 处开始匹配字符串，(`exec()` 同样改变正则本身的 `lastIndex` 属性值).

下面的实例表现了这种行为：

```js
var regex = /foo/g;

// regex.lastIndex is at 0
regex.test('foo'); // true

// regex.lastIndex is now at 3
regex.test('foo'); // false
```
