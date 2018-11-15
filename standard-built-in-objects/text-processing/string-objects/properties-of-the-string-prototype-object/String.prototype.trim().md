# String.prototype.trim()

`trim()` 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符（space, tab, no-break space 等）以及所有行终止符字符（如 `LF`，`CR`）。

## 语法

```javascript
str.trim()
```

### 返回值

`trim()` 方法并不影响原字符串本身，它返回的是一个新的字符串。

## 示例

### 标准示例

```javascript
var orig = '   foo  ';
orig.trim(); 	// 'foo'

// 另一个.trim()例子，只从一边删除

var orig = 'foo    ';
orig.trim(); 	// 'foo'
```

### 兼容性

```javascript
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
```

