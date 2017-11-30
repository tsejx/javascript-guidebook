# String字符串对象类型——操作方法

tags: 前端生存指南

# 截取方法

## String.prototype.substr()

substr() 方法返回一个字符串中从指定位置开始到指定字符数的字符。

### 语法

> str.substr(start[, length])

**参数**

 - **`start`**
开始提取字符的位置。如果为负值，则被看作 strLength + start，其中 strLength 为字符串的长度（例如，如果 start 为 -3，则被看作 strLength-3）。

 - **`length`**
可选。提取的字符数。

### 描述

`start` 是一个字符的索引。首字符的索引为 0，最后一个字符的索引为 字符串的长度减去1。`substr` 从 `start` 位置开始提取字符，提取 `length` 个字符（或直到字符串的末尾）。

如果 `start` 为正值，且大于或等于字符串的长度，则 `substr` 返回一个空字符串。

如果 `start` 为负值，则 `substr` 把它作为从字符串末尾开始的一个字符索引。如果 `start` 为负值且 `abs(start)` 大于字符串的长度，则 `substr` 使用 0 作为开始提取的索引。注意负的 `start` 参数不被 Microsoft JScript 所支持。

如果 `length` 为 0 或负值，则 `substr` 返回一个空字符串。如果忽略 `length`，则 `substr` 提取字符，直到字符串末尾。

### 示例

**例子：使用 substr**

```javascript
var str = "abcdefghij";

console.log("(1,2): "    + str.substr(1,2));   // (1,2): bc
console.log("(-3,2): "   + str.substr(-3,2));  // (-3,2): hi
console.log("(-3): "     + str.substr(-3));    // (-3): hij
console.log("(1): "      + str.substr(1));     // (1): bcdefghij
console.log("(-20, 2): " + str.substr(-20,2)); // (-20, 2): ab
console.log("(20, 2): "  + str.substr(20,2));  // (20, 2):
```

### 兼容旧环境（Polyfill）

Microsoft's JScript 不支持负的 start 索引。如果你想充分利用该方法的功能，则需要使用下面的兼容性代码修复此 bug：

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

## String.prototype.substring()

substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。

### 语法

> str.substring(indexStart[, indexEnd])

**参数**

 - **`indexStart`**
一个 0 到字符串长度之间的整数。

 - **`indexEnd`**
可选。一个 0 到字符串长度之间的整数。

### 描述

`substring` 提取从 `indexStart` 到 `indexEnd`（不包括）之间的字符。特别地：

 - 如果 `indexStart` 等于 `indexEnd`，`substring` 返回一个空字符串。
 - 如果省略 `indexEnd`，`substring` 提取字符一直到字符串末尾。
 - 如果任一参数小于 0 或为 `NaN`，则被当作 0。
 - 如果任一参数大于 `stringName.length`，则被当作 `stringName.length`。
 - 如果 `indexStart` 大于 `indexEnd`，则 `substring` 的执行效果就像两个参数调换了一样。例如，`str.substring(1, 0) == str.substring(0, 1)`。

### 示例

**例子：使用 substring**

下例使用 `substring` 输出字符串 "Mozilla" 中的字符：

```javascript
var anyString = "Mozilla";

// 输出 "Moz"
console.log(anyString.substring(0,3));
console.log(anyString.substring(3,0));
console.log(anyString.substring(3,-3));
console.log(anyString.substring(3,NaN));
console.log(anyString.substring(-2,3));
console.log(anyString.substring(NaN,3));

// 输出 "lla"
console.log(anyString.substring(4,7));
console.log(anyString.substring(7,4));

// 输出 ""
console.log(anyString.substring(4,4));

// 输出 "Mozill"
console.log(anyString.substring(0,6));

// 输出 "Mozilla"
console.log(anyString.substring(0,7));
console.log(anyString.substring(0,10));
```

**运用 `length` 属性来使用 `substring()`**

下面一个例子运用了    String.length 属性去获取指定字符串的倒数元素。显然这个办法更容易记住，因为你不再像上面那个例子那样去记住起始位置和最终位置。

```javascript
// Displays 'illa' the last 4 characters
var anyString = 'Mozilla';
var anyString4 = anyString.substring(anyString.length - 4);
console.log(anyString4);

// Displays 'zilla' the last 5 characters
var anyString = 'Mozilla';
var anyString5 = anyString.substring(anyString.length - 5);
console.log(anyString5);
```

**例子：替换一个字符串的子字符串**

下例替换了一个字符串中的子字符串。可以替换单个字符和子字符串。该例结尾调用的函数将 "Brave New World" 变成了 "Brave New Web"。

```javascript
function replaceString(oldS, newS, fullS) {
// Replaces oldS with newS in the string fullS
  for (var i = 0; i < fullS.length; i++) {
    if (fullS.substring(i, i + oldS.length) == oldS) {
     fullS = fullS.substring(0, i) + newS + fullS.substring(i + oldS.length, fullS.length);
    }
  }
  return fullS;
}

replaceString("World", "Web", "Brave New World");
```

需要注意的是，如果 oldS 是 newS 的子字符串将会导致死循环。例如，尝试把 "World" 替换成 "OtherWorld"。一个更好的方法如下：

```javascript
function replaceString(oldS, newS,fullS){
  return fullS.split(oldS).join(newS);
}
```

上面的代码只是子字符串操作的一个例子。如果你需要替换子字符串，更多时候会用到 `String.prototype.replace()`。

## String.prototype.slice()

### 语法

> str.slice(beginSlice[, endSlice])

**参数**

 - `beginSlice`
从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 sourceLength + beginSlice 看待，这里的sourceLength 是字符串的长度 (例如， 如果beginSlice 是 -3 则看作是: sourceLength - 3)

 - `endSlice`
可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice会一直提取到字符串末尾。如果该参数为负数，则被看作是 sourceLength + endSlice，这里的 sourceLength 就是字符串的长度(例如，如果 endSlice 是 -3，则是, sourceLength - 3)。

**返回值**

返回一个从原字符串中提取出来的新字符串

### 描述

slice() 从一个字符串中提取字符串并返回新字符串。在一个字符串中的改变不会影响另一个字符串。也就是说，slice 不修改原字符串，只会返回一个包含了原字符串中部分字符的新字符串。

注意：slice() 提取的新字符串包括beginSlice但不包括 endSlice。

例1：`str.slice(1, 4)` 提取新字符串从第二个字符到第四个 (字符索引值为 1, 2, 和 3)。

例2：`str.slice(2, -1)` 提取第三个字符到倒数第二个字符。

### 例子

**使用 slice() 创建一个新的字符串**

下面例子使用 slice() 来创建新字符串:

```javascript
var str1 = 'The morning is upon us.';
var str2 = str1.slice(4, -2);

console.log(str2); // OUTPUT: morning is upon u
```

**给 slice() 传入负值索引**

下面的例子在 slice() 使用了负值索引:

```javascript
var str = 'The morning is upon us.';
str.slice(-3);     // returns 'us.'
str.slice(-3, -1); // returns 'us'
str.slice(0, -1);  // returns 'The morning is upon us'
```

# 空格处理

## String.prototype.trim()

# 分割方法

## String.prototype.split()

# 合并方法

## String.prototype.concat()

# 大小写转换

## String.prototype.toUpperCase()

## String.prototype.toLowerCase()
