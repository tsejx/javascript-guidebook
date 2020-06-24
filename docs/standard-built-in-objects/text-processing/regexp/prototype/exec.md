---
nav:
  title: 内置对象
  order: 2
group:
  title: RegExp
  path: /text-processing/regexp/
  order: 10
title: RegExp.prototype.exec
order: 3
---

# RegExp.prototype.exec()

`RegExp.prototype.exec()` 方法专门为捕获组而设计，该方法在一个指定字符串中执行一个搜索匹配。然后返回包含匹配项信息的数组，在没有匹配项的情况下返回 `null`。

## 语法　　

```js
RegExp.prototype.exec(str);
```

### 参数

| 参数           | 描述                                   | 类型   |
| -------------- | -------------------------------------- | ------ |
| `regExpObject` | 匹配的正则表达式。                     | regexp |
| `str`          | 指定的字符串。将在该字符串中执行搜索。 | string |

### 返回值

- 如果匹配成功，`exec()` 方法返回一个数组，并更新正则表达式对象的属性。返回的数组将完全匹配成功的文本作为第一项，将正则括号里匹配成功的作为数组填充到后面。
- 如果匹配失败，`exec()` 方法返回 `null`。

返回的数组包含两个额外的属性。

| 属性    | 描述                       |
| ------- | -------------------------- |
| `index` | 表示匹配项在字符串的位置   |
| `input` | 表示应用正则表达式的字符串 |

`exec()` 方法的返回值为 Array 类型，如果找到了对应的匹配，则返回数组的成员如下：

- 索引 `0`：存放第一个匹配的子字符串
- 属性 `index`：匹配文本在字符串中的起始索引位置
- 属性 `input`：整个字符串对象（`stringObject`）

在 IE 6 ~ IE 8 中，该数组还具有额外的 `lastIndex` 属性，用于存储字符串中匹配文本最后一个字符的下一个位置。

## 示例

```js
// Match "quick brown" followed by "jumps", ignoring characters in between
// Remember "brown" and "jumps"
// Ignore case
let result = regexp.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
let regexp = /quick\s(brown).+?(jumps)/gi;
```

下表列出这个脚本的返回值：

**对象 Result**

| 属性/索引     | 描述                                        | 例子                                            |
| ------------- | ------------------------------------------- | ----------------------------------------------- |
| `[0]`         | 匹配的全部字符串                            | `'Quick Brown Fox Jumps'`                       |
| `[1],...,[n]` | 括号中的分组捕获                            | `[1] = Brown` `[2] = Jumps`                     |
| `index`       | 匹配到的字符位于原始字符串的基于 0 的索引值 | `4`                                             |
| `input`       | 原始字符串                                  | `'The Quick Brown Fox Jumps Over The Lazy Dog'` |

**对象 RegExp**

| 属性/索引    | 描述                                                                                                                                                              | 例子                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `lastIndex`  | 下一次匹配开始的位置                                                                                                                                              | `25`                       |
| `ignoreCase` | 是否使用了'i'标记使正则匹配忽略大小写                                                                                                                             | `true`                     |
| `global`     | 是否使用了'g'标记来进行全局的匹配                                                                                                                                 | `true`                     |
| `multiline`  | 是否使用了'm'标记使正则工作在多行模式（也就是，^ 和 \$ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。） | `false`                    |
| `source`     | 正则匹配的字符串                                                                                                                                                  | `quick\s(brown).+?(jumps)` |
