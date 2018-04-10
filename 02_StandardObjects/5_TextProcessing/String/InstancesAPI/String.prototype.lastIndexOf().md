# String.prototype.lastIndexOf()

`lastIndexOf()` 函数用于查找子字符串在当前字符串中最后一次出现的起始位置。

## 语法

```javascript
str.lastIndexOf( searchValue[, fromIndex])
```

### 参数

| 参数          | 类型                | 描述                                                    |
| ------------- | ------------------- | ------------------------------------------------------- |
| `searchValue` | `String` 类型       | 需要查找的子字符串。                                    |
| `fromIndex`   | `Number` 类型，可选 | 在当前字符串中查找的起始索引，默认为 `str.length - 1`。 |

### 返回值

`indexOf()` 方法的返回值为 `Number` 类型，返回子字符串在当前字符串中第一次查找到的起始位置(索引)。

### 描述

`lastIndexOf()` 函数将从后向前（从右往左）搜索子字符串，并返回子字符串第一次出现的位置。（由于是从后向前搜索，第一次出现的位置就是该子字符串在当前字符串中最后一次出现的位置）。

如果提供了`fromIndex` 参数，则从指定的索引从后向前搜索。如果省略了 `fromIndex` 参数，则从字符串的末尾开始从后向前搜索。

如果 `fromIndex` 为负，则将 `fromIndex`视为零。如果它比最大字符位置索引还大，则将它视为可能的最大索引（即字符串的末尾：`str.length - 1` ）。

## 示例

### 标准示例

字符串中的字符被从左向右索引。首字符的索引（index）是 0，最后一个字符的索引是 `stringName.length - 1`。

```javascript
"canal".lastIndexOf("a")   // returns 3
"canal".lastIndexOf("a",2) // returns 1
"canal".lastIndexOf("a",0) // returns -1
"canal".lastIndexOf("x")   // returns -1
```

### 区分大小写

`lastIndexOf` 方法区分大小写。例如，下面的表达式返回 -1：

```javascript
"Blue Whale, Killer Whale".lastIndexOf("blue"); // returns -1
```

