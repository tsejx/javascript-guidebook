# String.prototype.substr()

`substr()` 函数用于返回当前字符串中一个连续的片段。

## 语法

```javascript
str.substr( startIndex[, length] )
```

### 参数

| 参数         | 类型                | 描述                               |
| ------------ | ------------------- | ---------------------------------- |
| `startIndex` | `Number` 类型       | 指向字符串指定部分的开头的索引。   |
| `length`     | `Number` 类型，可选 | 返回的子字符串片段中包含的字符数。 |

### 描述

`substr()` 函数从 `str` 的索引 `startIndex` 处开始复制，直到复制 `length` 个字符或字符串的结尾为止。

- 如果 `startIndex` 为正值，且大于或等于字符串的长度，则返回一个空字符串。
- 如果 `startIndex` 为负值，则将其视为 `str.length + startIndex` 开始的一个字符索引。若 `str.length + startIndex` 大于字符串的长度，则使用 0 作为开始提取的索引。
- 如果 `length` 为负数或0，则不会复制任何字符，返回空字符串。
- 如果省略了 `length` 参数，则一直复制到字符串的结尾。

## 示例

### 标准示例

```javascript
var str = "abcdefghij";

// 开始索引为1，截取长度为2
str.substr(1,2);   // 'bc'

// 开始索引为-3+10=7，截取长度为2
str.substr(-3,2);  // 'hi'

// 开始索引为-3+10=7，截取长度为延伸至字符结尾
str.substr(-3);    // 'hij'

// 开始索引为1，截取长度为延伸至字符结尾
str.substr(1);     // 'bcdefghij'

// 开始索引为-20+10=-10即0，截取长度为2
str.substr(-20,2); // 'ab'

// 开始索引为20大于字符串长度（返回空字符串），截取长度为2
str.substr(20,2);  // ''

// 开始索引为0，截取长度为-1和0（返回空字符串）
str.substr(0, -1);	// ''
str.substr(0, 0);	// ''
```

### 兼容性

```javascript
// only run when the substr function is broken
if ('ab'.substr(-1) != 'b')
{
  /**
   *  Get the substring of a string
   *  @param  {integer}  start   where to start the substring
   *  @param  {integer}  length  how many characters to return
   *  @return {string}
   */
  String.prototype.substr = function(substr) {
    return function(start, length) {
      // did we get a negative start, calculate how much it is
      // from the beginning of the string
      if (start < 0) start = this.length + start;
      
      // call the original function
      return substr.call(this, start, length);
    }
  }(String.prototype.substr);
}
```

