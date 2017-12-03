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

`trim()` 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）。

### 语法

> str.trim()

### 描述

`trim()` 方法并不影响原字符串本身，它返回的是一个新的字符串。

### 例子

**使用 trim()**

下面的例子中将显示小写的字符串 'foo':

```javascript
var orig = '   foo  ';
console.log(orig.trim()); // 'foo'

// 另一个.trim()例子，只从一边删除

var orig = 'foo    ';
console.log(orig.trim()); // 'foo'
```

### 兼容旧环境Edit

如果 `trim()` 不存在，可以在所有代码前执行下面代码

```javascript
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
```

# 分割方法

## String.prototype.split()

split() 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。

### 语法

> str.split([separator[, limit]])

*Tip: 如果空字符串("")被用作分隔符，则字符串会在每个字符之间分割。*

**参数**

 - `separator`
指定表示每个拆分应发生的点的字符串。`separator` 可以是一个字符串或正则表达式。 如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点。如果在str中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。如果分隔符为空字符串，则将str原字符串中每个字符的数组形式返回。

 - `limit`
一个整数，限定返回的分割片段数量。当提供此参数时，split 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。

### 描述

找到分隔符后，将其从字符串中删除，并将子字符串的数组返回。如果没有找到或者省略了分隔符，则该数组包含一个由整个字符串组成的元素。如果分隔符为空字符串，则将 `str` 转换为字符数组。如果分隔符出现在字符串的开始或结尾，或两者都分开，分别以空字符串开头，结尾或两者开始和结束。因此，如果字符串仅由一个分隔符实例组成，则该数组由两个空字符串组成。

如果分隔符是包含捕获括号的正则表达式，则每次分隔符匹配时，捕获括号的结果（包括任何未定义的结果）将被拼接到输出数组中。但是，并不是所有浏览器都支持此功能。

Note: 当字符串为空时，`split（）` 返回一个包含一个空字符串的数组，而不是一个空数组，如果字符串和分隔符都是空字符串，则返回一个空数组。

### 示例

```javascript
"Webkit Moz O ms Khtml".split( " " )   // ["Webkit", "Moz", "O", "ms", "Khtml"]
```

**例子：使用 split**

下例定义了一个函数：根据指定的分隔符将一个字符串分割成一个字符串数组。分隔字符串后，该函数依次输出原始字符串信息，被使用的分隔符，返回数组元素的个数，以及返回数组中所有的元素。

```javascript
function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);

  console.log('The original string is: "' + stringToSplit + '"');
  console.log('The separator is: "' + separator + '"');
  console.log("The array has " + arrayOfStrings.length + " elements: ");

  for (var i=0; i < arrayOfStrings.length; i++)
    console.log(arrayOfStrings[i] + " / ");
}

var tempestString = "Oh brave new world that has such people in it.";
var monthString = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec";

var space = " ";
var comma = ",";

splitString(tempestString, space);
splitString(tempestString);
splitString(monthString, comma);
```

上例输出下面结果：

```javascript
The original string is: "Oh brave new world that has such people in it."
The separator is: " "
The array has 10 elements: Oh / brave / new / world / that / has / such / people / in / it. /

The original string is: "Oh brave new world that has such people in it."
The separator is: "undefined"
The array has 1 elements: Oh brave new world that has such people in it. /

The original string is: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec"
The separator is: ","
The array has 12 elements: Jan / Feb / Mar / Apr / May / Jun / Jul / Aug / Sep / Oct / Nov / Dec /
```

**例子：移出字符串中的空格**

下例中，split 方法会查找“0 或多个空白符接着的分号，再接着 0 或多个空白符”模式的字符串，找到后，就将空白符从字符串中移除，nameList 是 split 的返回数组。

```javascript
var names = "Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ";

console.log(names);

var re = /\s*;\s*/;
var nameList = names.split(re);

console.log(nameList);
```

上例输出两行，第一行输出原始字符串，第二行输出结果数组。

```javascript
Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand
Harry Trump,Fred Barney,Helen Rigby,Bill Abel,Chris Hand
```

**例子：限制返回值中分割元素数量**

下例中，`split` 查找字符串中的 0 或多个空格，并返回找到的前 3 个分割元素（splits）。

```javascript
var myString = "Hello World. How are you doing?";
var splits = myString.split(" ", 3);

console.log(splits);
```

上例输出：

```javascript
["Hello", "World.", "How"]
```

**例子：捕获括号（Capturing parentheses）**

如果 `separator` 包含捕获括号（capturing parentheses），则其匹配结果将会包含在返回的数组中。

```javascript
var myString = "Hello 1 word. Sentence number 2.";
var splits = myString.split(/(\d)/);

console.log(splits);
```

上例输出：

```javascript
[ "Hello ", "1", " word. Sentence number ", "2", "." ]
```
 
# 合并方法

## String.prototype.concat()

# 大小写转换

## String.prototype.toUpperCase()

## String.prototype.toLowerCase()
