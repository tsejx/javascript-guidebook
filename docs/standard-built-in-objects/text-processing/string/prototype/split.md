---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.split
order: 30
---

# String.prototype.split()

`split()` 函数用于使用指定分隔符分割字符串，并返回分割后的若干个子字符串组成的数组。

## 语法

```js
str.split( [separator [, limit]] )
```

| 参数        | 说明                                                                                                                                                                                                                                                                                          | 类型            |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `separator` | 指定表示每个拆分应发生的点的字符串。`separator` 可以是一个字符串或正则表达式。 如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点。如果在 str 中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。如果分隔符为空字符串，则将 str 原字符串中每个字符的数组形式返回。 | string / RegExp |
| `limit`     | 可选，一个整数，限定返回的分割片段数量。当提供此参数时，`split` 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。                                                    | number          |

- 找到分隔符后，将其从字符串中删除，并将子字符串的数组返回。

* 如果没有找到或者省略了分隔符，则该数组包含一个由整个字符串组成的元素。
* 如果分隔符为空字符串，则字符串会在每个字符之间分割。
* 如果分隔符出现在字符串的开始或结尾，或两者都分开，分别以空字符串开头，结尾或两者开始和结束。因此，如果字符串仅由一个分隔符实例组成，则该数组由两个空字符串组成。
* 如果分隔符是包含捕获括号的正则表达式，则每次分隔符匹配时，捕获括号的结果（包括任何未定义的结果）将被拼接到输出数组中。但是，并不是所有浏览器都支持此功能。
* 当被查找的字符串为空时，返回一个包含一个空字符串的数组，而不是一个空数组，如果字符串和分隔符都是空字符串，则返回一个空数组。

## 描述

如果提供了 `limit` 参数，此函数返回的数组最多包含 `limit` 个元素。如果参数 `limit` 为负数，则该参数将被忽略掉。如果省略了 `limit`，则 `split()` 函数不会考虑长度，直到分割完毕为止。如果 `limit` 为 0，则返回空的数组。

## 示例

### 代码示例

```js
'abcd'.split();
// ["abcd"]
'abcd'.split('b');
// ["a", "cd"]
'abcd'.split('a');
// ["", "bcd"]
'abcd'.split('d');
// ["abc", ""]
'abcd'.split('abcd');
// ["", ""]
'abcd'.split('');
// ["a", "b", "c", "d"]
'abcd'.split(' ');
// ["abcd"]

''.split();
// [""]
''.split('');
// []
''.split(' ');
// [""]
```

### 移除字符串中的空格

下例中，`split` 方法会查找 0 或多个空白符接着的分号，再接着 0 或多个空白符模式的字符串，找到后，就将空白符从字符串中移除，`nameList` 是 `split` 的返回数组。

```js
var names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ';
var re = /\s*;\s*/;
var nameList = names.split(re);

console.log(nameList);
// ["Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand "]
```

### 限制返回值中分割元素数量

下例中，`split` 查找字符串中的 0 或多个空格，并返回找到的前 3 个分割元素（splits）。

```js
var myString = 'Hello World. How are you doing?';
var splits = myString.split(' ', 3);

console.log(splits);
// ["Hello", "World.", "How"]
```

### 捕获括号（Capturing parentheses）

如果 `separator` 包含捕获括号（capturing parentheses），则其匹配结果将会包含在返回的数组中。

```js
var myString = 'Hello 1 word. Sentence number 2.';
var splits = myString.split(/(\d)/);

console.log(splits);
// [ "Hello ", "1", " word. Sentence number ", "2", "." ]
```
