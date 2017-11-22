# String字符串对象类型——查找方法

# 字符方法

## String.prototype.charAt()

### 概述

charAt() 方法从一个字符串中返回指定的字符。

### 语法

> str.charAt(index)

**参数**

 - **`index`**
一个介于0 和字符串长度减1之间的整数。 (0~length-1)
如果没有提供索引，charAt() 将使用0。

### 描述

字符串中的字符从左向右索引，第一个字符的索引值为 0，最后一个字符（假设该字符位于字符串 stringName 中）的索引值为 stringName.length - 1。 如果指定的 index 值超出了该范围，则返回一个空字符串。

### 示例

例子：输出字符串中不同位置的字符

**下例输出字符串 "Brave new world" 不同位置处的字符：**

```javascript
var anyString = "Brave new world";

console.log("The character a    t index 0   is '" + anyString.charAt(0)   + "'");
console.log("The character at index 1   is '" + anyString.charAt(1)   + "'");
console.log("The character at index 2   is '" + anyString.charAt(2)   + "'");
console.log("The character at index 3   is '" + anyString.charAt(3)   + "'");
console.log("The character at index 4   is '" + anyString.charAt(4)   + "'");
console.log("The character at index 999 is '" + anyString.charAt(999) + "'");
```

上面代码的输出为：

```javascript
The character at index 0 is 'B'
The character at index 1 is 'r'
The character at index 2 is 'a'
The character at index 3 is 'v'
The character at index 4 is 'e'
The character at index 999 is ''
```

**例子：获取所有字符**

以下提供了一种确保通过字符串循环总是提供整个字符的方法，即使该字符串包含不在基本多文种平面（BMP）中的字符。

```javascript
var str = 'A \uD87E\uDC04 Z'; // We could also use a non-BMP character directly
for (var i=0, chr; i < str.length; i++) {
  if ((chr = getWholeChar(str, i)) === false) {
    continue;
  } // Adapt this line at the top of each loop, passing in the whole string and
    // the current iteration and returning a variable to represent the 
    // individual character

  alert(chr);
}

function getWholeChar (str, i) {
  var code = str.charCodeAt(i);     
 
  if (isNaN(code)) {
    return ''; // Position not found
  }
  if (code < 0xD800 || code > 0xDFFF) {
    return str.charAt(i);
  }

  // High surrogate (could change last hex to 0xDB7F to treat high private
  // surrogates as single characters)
  if (0xD800 <= code && code <= 0xDBFF) { 
    if (str.length <= (i+1))  {
      throw 'High surrogate without following low surrogate';
    }
    var next = str.charCodeAt(i+1);
      if (0xDC00 > next || next > 0xDFFF) {
        throw 'High surrogate without following low surrogate';
      }
      return str.charAt(i)+str.charAt(i+1);
  }
  // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
  if (i === 0) {
    throw 'Low surrogate without preceding high surrogate';
  }
  var prev = str.charCodeAt(i-1);
  
  // (could change last hex to 0xDB7F to treat high private
  // surrogates as single characters)
  if (0xD800 > prev || prev > 0xDBFF) { 
    throw 'Low surrogate without preceding high surrogate';
  }
  // We can pass over low surrogates now as the second component
  // in a pair which we have already processed
  return false; 
}
```

在允许解构分配的独占JavaScript 1.7+环境（如Firefox）中，以下是一个更简洁和更灵活的替代方法，它会自动递增一个递增变量（如果字符保证它是一个替代对）。

```javascript
var str = 'A\uD87E\uDC04Z'; // We could also use a non-BMP character directly
for (var i=0, chr; i < str.length; i++) {
  [chr, i] = getWholeCharAndI(str, i);
  // Adapt this line at the top of each loop, passing in the whole string and
  // the current iteration and returning an array with the individual character
  // and 'i' value (only changed if a surrogate pair)

  alert(chr);
}

function getWholeCharAndI (str, i) {
  var code = str.charCodeAt(i);

  if (isNaN(code)) {
    return ''; // Position not found
  }
  if (code < 0xD800 || code > 0xDFFF) {
    return [str.charAt(i), i]; // Normal character, keeping 'i' the same
  }

  // High surrogate (could change last hex to 0xDB7F to treat high private 
  // surrogates as single characters)
  if (0xD800 <= code && code <= 0xDBFF) { 
    if (str.length <= (i+1))  {
      throw 'High surrogate without following low surrogate';
    }
    var next = str.charCodeAt(i+1);
      if (0xDC00 > next || next > 0xDFFF) {
        throw 'High surrogate without following low surrogate';
      }
      return [str.charAt(i)+str.charAt(i+1), i+1];
  }
  // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
  if (i === 0) {
    throw 'Low surrogate without preceding high surrogate';
  }
  var prev = str.charCodeAt(i-1);

  // (could change last hex to 0xDB7F to treat high private surrogates
  // as single characters)
  if (0xD800 > prev || prev > 0xDBFF) { 
    throw 'Low surrogate without preceding high surrogate';
  }
  // Return the next character instead (and increment)
  return [str.charAt(i+1), i+1]; 
}
```

示例：修复charAt以支持非基本多文种平面（BMP）字符

虽然上面的例子对于那些希望支持非BMP字符的用户可能更有用（因为它不要求调用者知道任何非BMP字符可能出现在哪里），在人们希望的情况下，在选择字符 通过索引，将字符串中的替代对作为它们表示的单个字符，可以使用以下：

```javascript
function fixedCharAt (str, idx) {
  var ret = '';
  str += '';
  var end = str.length;

  var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  while ((surrogatePairs.exec(str)) != null) {
    var li = surrogatePairs.lastIndex;
    if (li - 2 < idx) {
      idx++;
    } else {
      break;
    }
  }

  if (idx >= end || idx < 0) {
    return '';
  }

  ret += str.charAt(idx);

  if (/[\uD800-\uDBFF]/.test(ret) && /[\uDC00-\uDFFF]/.test(str.charAt(idx+1))) {
    // Go one further, since one of the "characters" is part of a surrogate pair
    ret += str.charAt(idx+1); 
  }
  return ret;
}
```

## String.prototype.charCodeAt()

charCodeAt() 方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元 (在 Unicode 编码单元表示一个单一的 UTF-16 编码单元的情况下，UTF-16 编码单元匹配 Unicode 编码单元。但在——例如 Unicode 编码单元 > 0x10000 的这种——不能被一个 UTF-16 编码单元单独表示的情况下，只能匹配 Unicode 代理对的第一个编码单元) 。如果你想要整个代码点的值，使用 `codePointAt()`。

### 语法

> str.charCodeAt(index)

**参数**

 - **`index`**
一个大于等于 0，小于字符串长度的整数。如果不是一个数值，则默认为 0。

**返回值**

返回值是一表示给定索引处（String中index索引处）字符的 UTF-16 代码单元值的数字；如果索引超出范围，则返回 `NaN`。

### 描述

Unicode 编码单元（code points）的范围从 0 到 1,114,111（0x10FFFF）。开头的 128 个 Unicode 编码单元和 ASCII 字符编码一样。关于 Unicode 的更多信息，可查看 JavaScript Guide。

注意，`charCodeAt` 总是返回一个小于 65,536 的值。这是因为高位编码单元（higher code point）使用一对（低位编码（lower valued））代理伪字符（"surrogate" pseudo-characters）来表示，从而构成一个真正的字符。因此，为了查看或复制（reproduce）65536 及以上编码字符的完整字符，需要在获取 `charCodeAt(i)` 的值的同时获取 `charCodeAt(i+1)` 的值（如同查看/reproducing 拥有两个字符的字符串一样），或者改为获取 `codePointAt(i)` 的值。参看下面例 2 和例 3。

如果指定的 index 小于 0 或不小于字符串的长度，则 `charCodeAt` 返回 `NaN`。

向后兼容：在历史版本中（如 JavaScript 1.2），charCodeAt 返回一个数字，表示给定 index 处字符的 ISO-Latin-1 编码值。ISO-Latin-1 编码集范围从 0 到 255。开头的 0 到 127 直接匹配 ASCII 字符集。

### 示例

**使用 `charCodeAt()`**

下例介绍了不同索引情况下返回的 Unicode 值：

```javascript
"ABC".charCodeAt(0) // returns 65:"A"

"ABC".charCodeAt(1) // returns 66:"B"

"ABC".charCodeAt(2) // returns 67:"C"

"ABC".charCodeAt(3) // returns NaN
```

使用 `charCodeAt()` 修复字符串中出现的未知的非基本多语言范围（非BMP，non-Basic-Multilingual-Plane）字符

这段代码可以被用在 for 循环和其他类似语句中，当在指定引索之前不确定是否有非BMP字符存在时。

```javascript
function fixedCharCodeAt (str, idx) {
    // ex. fixedCharCodeAt ('\uD800\uDC00', 0); // 65536
    // ex. fixedCharCodeAt ('\uD800\uDC00', 1); // false
    idx = idx || 0;
    var code = str.charCodeAt(idx);
    var hi, low;
    
    // High surrogate (could change last hex to 0xDB7F to treat high
    // private surrogates as single characters)
    if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx+1);
        if (isNaN(low)) {
            throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        // We return false to allow loops to skip this iteration since should have
        // already handled high surrogate above in the previous iteration
        return false;
        /*hi = str.charCodeAt(idx-1);
        low = code;
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;*/
    }
    return code;
}
```

使用 charCodeAt()修复字符串中出现的已知的非BMP字符

```javascript
function knownCharCodeAt (str, idx) {
    str += '';
    var code,
        end = str.length;

    var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    while ((surrogatePairs.exec(str)) != null) {
        var li = surrogatePairs.lastIndex;
        if (li - 2 < idx) {
            idx++;
        }
        else {
            break;
        }
    }

    if (idx >= end || idx < 0) {
        return NaN;
    }

    code = str.charCodeAt(idx);

    var hi, low;
    if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx+1);
        // Go one further, since one of the "characters" is part of a surrogate pair
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    return code;
```

## String.prototype.codePointAt()

codePointAt() 方法返回 一个 Unicode 编码点值的非负整数。

### 语法

> str.codePointAt(pos)

**参数**

 - **`pos`**
这个字符串中需要转码的元素的位置。

**返回值**

返回值是在字符串中的给定索引的编码单元体现的数字，如果在索引处没找到元素则返回 `undefined` 。

### 描述

如果在指定的位置没有元素则返回 `undefined` 。如果在索引处开始没有 UTF-16 代理对，将直接返回在那个索引处的编码单元。

Surrogate Pair是UTF-16中用于扩展字符而使用的编码方式，是一种采用四个字节(两个UTF-16编码)来表示一个字符，称作代理对。

### 示例

**使用 `codePointAt()`**

```javascript
'ABC'.codePointAt(1);          // 66
'\uD800\uDC00'.codePointAt(0); // 65536

'XYZ'.codePointAt(42); // undefined
```

### 兼容性(Polyfill)

给原生不支持 ECMAScript 6 的浏览器使用 `codePointAt()` 方法的的一个字符串扩展方法。

```javascript
/*! http://mths.be/codepointat v0.1.0 by @mathias */
if (!String.prototype.codePointAt) {
  (function() {
    'use strict'; // 严格模式，needed to support `apply`/`call` with `undefined`/`null`
    var codePointAt = function(position) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      var size = string.length;
      // 变成整数
      var index = position ? Number(position) : 0;
      if (index != index) { // better `isNaN`
        index = 0;
      }
      // 边界
      if (index < 0 || index >= size) {
        return undefined;
      }
      // 第一个编码单元
      var first = string.charCodeAt(index);
      var second;
      if ( // 检查是否开始 surrogate pair
        first >= 0xD800 && first <= 0xDBFF && // high surrogate
        size > index + 1 // 下一个编码单元
      ) {
        second = string.charCodeAt(index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
      }
      return first;
    };
    if (Object.defineProperty) {
      Object.defineProperty(String.prototype, 'codePointAt', {
        'value': codePointAt,
        'configurable': true,
        'writable': true
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  }());
}
```

# 位置方法

## String.prototype.indexOf()

indexOf() 方法返回调用  String 对象中第一次出现的指定值的索引，开始在 fromIndex进行搜索。

如果未找到该值，则返回-1。

### 语法

> str.indexOf(searchValue[, fromIndex])

**参数**

 - **`searchValue`**
一个字符串表示被查找的值。

 - **`fromIndex`** *可选*
表示调用该方法的字符串中开始查找的位置。可以是任意整数。默认值为 0。如果 fromIndex < 0 则查找整个字符串（如同传进了 0）。如果 fromIndex >= str.length，则该方法返回 -1，除非被查找的字符串是一个空字符串，此时返回 `str.length`。

**返回值**

指定值的第一次出现的索引; 如果没有找到 -1。

### 描述

字符串中的字符被从左向右索引。首字符的索引（index）为 0，字符串 `stringName` 的最后一个字符的索引是 `stringName.length - 1`。

```javascript
"Blue Whale".indexOf("Blue");     // returns  0
"Blue Whale".indexOf("Blute");    // returns -1
"Blue Whale".indexOf("Whale", 0); // returns  5
"Blue Whale".indexOf("Whale", 5); // returns  5
"Blue Whale".indexOf("", 9);      // returns  9
"Blue Whale".indexOf("", 10);     // returns 10
"Blue Whale".indexOf("", 11);     // returns 10
```

**区分大小写**

`indexOf` 方法区分大小写。例如，下面的表达式返回 -1：

```javascript
"Blue Whale".indexOf("blue") // returns -1
```

**检测是否存在某字符串**

当检测某个字符串是否存在于另一个字符串中时，可使用下面的方法：

```javascript
"Blue Whale".indexOf("Blue") !== -1; // true
"Blue Whale".indexOf("Bloe") !== -1; // false
```

### 示例

**使用`indexOf()` 和 `lastIndexOf()`**

下例使用 `indexOf()` 和 `lastIndexOf()` 方法定位字符串中 "`Brave new world`" 的值。

```javascript
var anyString = "Brave new world";

console.log("The index of the first w from the beginning is " + anyString.indexOf("w"));
// logs 8
console.log("The index of the first w from the end is " + anyString.lastIndexOf("w")); 
// logs 10

console.log("The index of 'new' from the beginning is " + anyString.indexOf("new"));   
// logs 6
console.log("The index of 'new' from the end is " + anyString.lastIndexOf("new"));
// logs 6
```

**`indexOf` 和区分大小写**

下例定义了两个字符串变量。两个变量包含相同的字符串，除了第二个字符串中的某些字符为大写。第一个 `log` 方法输出 19。但是由于 `indexOf` 方法区分大小写，因此不会在 `myCapString` 中发现字符串 `“cheddar"`，结果第二个 `log` 方法输出 -1。

```javascript
var myString    = "brie, pepper jack, cheddar";
var myCapString = "Brie, Pepper Jack, Cheddar";

console.log('myString.indexOf("cheddar") is ' + myString.indexOf("cheddar"));    
// logs 19
console.log('myCapString.indexOf("cheddar") is ' + myCapString.indexOf("cheddar")); 
// logs -1
```

**使用 indexOf 统计一个字符串中某个字母出现的次数**

在下例中，设置了 count 来记录字母 e 在字符串 str 中出现的次数：

```javascript
var str = 'To be, or not to be, that is the question.';
var count = 0;
var pos = str.indexOf('e');

while (pos !== -1) {
  count++;
  pos = str.indexOf('e', pos + 1);
}

console.log(count); // displays 4
```

## String.prototype.lastIndexOf()

lastIndexOf() 方法返回指定值在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。从该字符串的后面向前查找，从 fromIndex 处开始。

### 语法

> str.lastIndexOf(searchValue[, fromIndex])

**参数**

- **`searchValue`**
一个字符串，表示被查找的值。

- **`fromIndex`**
从调用该方法字符串的此位置处开始查找。可以是任意整数。默认值为 `str.length`。如果为负值，则被看作 0。如果 `fromIndex > str.length`，则 `fromIndex` 被看作 `str.length`。

### 描述

字符串中的字符被从左向右索引。首字符的索引（index）是 0，最后一个字符的索引是 `stringName.length - 1`。

```javascript
"canal".lastIndexOf("a")   // returns 3
"canal".lastIndexOf("a",2) // returns 1
"canal".lastIndexOf("a",0) // returns -1
"canal".lastIndexOf("x")   // returns -1
```

**区分大小写**

`lastIndexOf` 方法区分大小写。例如，下面的表达式返回 -1：

```javascript
"Blue Whale, Killer Whale".lastIndexOf("blue"); // returns -1
```

### 示例

例子：使用 `indexOf` 和 `lastIndexOf`

下例使用 `indexOf` 和 `lastIndexOf` 方法来定位字符串 "`Brave new world`" 中的值。

```javascript
var anyString = "Brave new world";

console.log("The index of the first w from the beginning is " + anyString.indexOf("w"));
// Displays 8
console.log("The index of the first w from the end is " + anyString.lastIndexOf("w")); 
// Displays 10

console.log("The index of 'new' from the beginning is " + anyString.indexOf("new"));   
// Displays 6
console.log("The index of 'new' from the end is " + anyString.lastIndexOf("new"));
// Displays 6
```

# 匹配方法

## String.prototype.match()

当一个字符串与一个正则表达式匹配时， match()方法检索匹配项。

### 语法

> str.match(regexp);

**参数**

 - **`regexp`**
一个正则表达式对象。如果传入一个非正则表达式对象，则会隐式地使用 `new RegExp(obj)` 将其转换为一个 RegExp 。如果你未提供任何参数，直接使用 `match()` ，那么你会得到一个包含空字符串的 `Array ：[""]` 。

**返回值**

 - **`array`**
一个包含了整个匹配结果以及任何括号捕获的匹配结果的 Array ；如果没有匹配项，则返回 null 。

### 描述

如果正则表达式没有 g 标志，则 `str.match()` 会返回和 `RegExp.exec()` 相同的结果。而且返回的 `Array` 拥有一个额外的 `input` 属性，该属性包含被解析的原始字符串。另外，还拥有一个 index 属性，该属性表示匹配结果在原字符串中的索引（以0开始）。

如果正则表达式包含 g 标志，则该方法返回一个 `Array` ，它包含所有匹配的子字符串而不是匹配对象。捕获组不会被返回(即不返回index属性和input属性)。如果没有匹配到，则返回  null 。

参看：RegExp 方法

 - 如果你需要知道一个字符串是否匹配一个正则表达式 RegExp ，可使用 search() 。
 - 如果你只是需要第一个匹配结果，你可能想要使用 RegExp.exec() 。
 - 如果你想要获得捕获组，并且设置了全局标志，你需要用 RegExp.exec() 。

### 示例

**例子：使用 match**

在下例中，使用 match 查找 "Chapter" 紧跟着 1 个或多个数值字符，再紧跟着一个小数点和数值字符 0 次或多次。正则表达式包含 i 标志，因此大小写会被忽略。

```javascript
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);

console.log(found);

// logs [ 'see Chapter 3.4.5.1',
//        'Chapter 3.4.5.1',
//        '.1',
//        index: 22,
//        input: 'For more information, see Chapter 3.4.5.1' ]

// 'see Chapter 3.4.5.1' 是整个匹配。
// 'Chapter 3.4.5.1' 被'(chapter \d+(\.\d)*)'捕获。
// '.1' 是被'(\.\d)'捕获的最后一个值。
// 'index' 属性(22) 是整个匹配从零开始的索引。
// 'input' 属性是被解析的原始字符串。
```

**例子：match 使用全局（global）和忽略大小写（ignore case）标志**

下例展示了 match 使用 global 和 ignore case 标志。A-E、a-e 的所有字母将会作为一个数组的元素返回。

```javascript
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);

console.log(matches_array);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
```

**使用match()，不传参数**

```javascript
var str = "Nothing will come of nothing.";

str.match();   // returns [""]
```

**一个非正则表达式对象作为参数**

当参数是一个字符串或一个数字，它会使用new RegExp(obj)来隐式转换成一个 RegExp。如果它是一个有正号的正数，RegExp() 方法将忽略正号。

```javascript
var str1 = "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.",
    str2 = "My grandfather is 65 years old and My grandmother is 63 years old.",
    str3 = "The contract was declared null and void.";
str1.match("number");   // "number" 是字符串。返回["number"]
str1.match(NaN);        // NaN的类型是number。返回["NaN"]
str1.match(Infinity);   // Infinity的类型是number。返回["Infinity"]
str1.match(+Infinity);  // 返回["Infinity"]
str1.match(-Infinity);  // 返回["-Infinity"]
str2.match(65);         // 返回["65"]
str2.match(+65);        // 有正号的number。返回["65"]
str3.match(null);       // 返回["null"]
```

## String.prototype.search()

search() 方法执行正则表达式和 String对象之间的一个搜索匹配。

### 语法

> str.search(regexp)

**参数**

regexp
一个正则表达式（regular expression）对象。如果传入一个非正则表达式对象，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象。

**返回值**

如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引。否则，返回 -1。

### 描述

当你想要知道字符串中是否存在某个模式（pattern）时可使用 search，类似于正则表达式的 test 方法。当要了解更多匹配信息时，可使用 match（会更慢），该方法类似于正则表达式的 exec 方法。

### 示例

**例子：使用 search**

下例记录了一个消息字符串，该字符串的内容取决于匹配是否成功。

```javascript
function testinput(re, str){
  var midstring;
  if (str.search(re) != -1){
    midstring = " contains ";
  } else {
    midstring = " does not contain ";
  }
  console.log (str + midstring + re);
}
```

## String.prototype.replace()

replace() 方法返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是一个字符串或者一个正则表达式, 替换值可以是一个字符串或者一个每次匹配都要调用的函数。

注意：原字符串不会改变。

### 语法

> str.replace(regexp|substr, newSubStr|function)

**参数**

 - **`regexp (pattern)`**
一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。

 - **`substr (pattern)`**
一个要被 newSubStr 替换的字符串。其被视为一整个字符串，而不是一个正则表达式。仅仅是第一个匹配会被替换。

 - **`newSubStr (replacement)`**
 用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。参考下面的使用字符串作为参数。
 
 - **`function (replacement)`**
一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的指定一个函数作为参数。

**返回值**

一个部分或全部匹配由替代模式所取代的新的字符串。

### 描述

该方法并不改变调用它的字符串本身，而只是返回一个新的替换后的字符串。

在进行全局的搜索替换时，正则表达式需包含 g 标志。

**使用字符串作为参数**

替换字符串可以插入下面的特殊变量名：

变量名  |	代表的值
:------:|:-------------
$$      |	插入一个 "$"。
$&      |	插入匹配的子串。
$`      |	插入当前匹配的子串左边的内容。
$'      |	插入当前匹配的子串右边的内容。
$n      |	假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。

**指定一个函数作为参数**

你可以指定一个函数作为第二个参数。在这种情况下，当匹配执行后， 该函数就会执行。 函数的返回值作为替换字符串。 (注意:  上面提到的特殊替换参数在这里不能被使用。) 另外要注意的是， 如果第一个参数是正则表达式， 并且其为全局匹配模式， 那么这个方法将被多次调用， 每次匹配都会被调用。

下面是该函数的参数：

变量名  |	代表的值
:------:|:--------------------------
match   |	匹配的子串。（对应于上述的\$&。）
p1,p2, ...	| 假如replace()方法的第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。（对应于上述的\$1，$2等。）
offset	| 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是“abcd”，匹配到的子字符串是“bc”，那么这个参数将是1）
string |被匹配的原字符串。

(精确的参数个数依赖于replace()的第一个参数是否是一个正则表达式对象， 以及这个正则表达式中指定了多少个括号子串。)

下面的例子将会使 newString 变成'abc - 12345 - #$*%'：

```javascript
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
```

### 示例

**在 replace() 中使用正则表达式**

在下面的例子中，replace() 中使用了正则表达式及忽略大小写标示。

```javascript
var str = 'Twas the night before Xmas...';
var newstr = str.replace(/xmas/i, 'Christmas');
console.log(newstr);  // Twas the night before Christmas...
```

**在 replace() 中使用 global 和 ignore 选项**

下面的例子中,正则表达式包含有全局替换(g)和忽略大小写(i)的选项,这使得replace方法用'oranges'替换掉了所有出现的"apples".

```javascript
var re = /apples/gi;
var str = "Apples are round, and apples are juicy.";
var newstr = str.replace(re, "oranges");

// oranges are round, and oranges are juicy.
console.log(newstr);
```

**交换字符串中的两个单词**

下面的例子演示了如何交换一个字符串中两个单词的位置，这个脚本使用$1 和 $2 代替替换文本。

```javascript
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
// Smith, John
console.log(newstr);
```

**使用行内函数来修改匹配到的字符。**

在这个例子中，所有出现的大写字母转换为小写，并且在匹配位置前加一个连字符。重要的是，在返回一个替换了的字符串前需要在匹配元素前需要进行添加操作。

在返回前，替换函数允许匹配片段作为参数，并且将它和连字符进行连接作为新的片段。

```javascript
function styleHyphenFormat(propertyName) {
  function upperToHyphenLower(match) {
    return '-' + match.toLowerCase();
  }
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}
```

此代码 `styleHyphenFormat('borderTop')` 将返回 'border-top'。

因为我们想在最终的替换中进一步转变匹配结果，所以我们必须使用一个函数。这迫使我们在使用toLowerCase()方法前进行评估。如果我们尝试不用一个函数进行匹配，那么使用toLowerCase() 方法将不会有效。

```javascript
var newString = propertyName.replace(/[A-Z]/g, '-' + '$&'.toLowerCase());  // won't work
```

这是因为 `'$&'.toLowerCase()` 会先被解析成字符串字面量（这会导致相同的'$&')而不是当作一个模式。

**将华氏温度转换为对等的摄氏温度**

下面的例子演示如何将华氏温度转换为对等的摄氏温度。华氏温度用一个数字加一个"F"来表示，这个函数将返回一个数字加"C"来表示的摄氏温度。例如，如果输入是212F，这个函数将返回100C。如果输入数字时0F，这个方法将返回"-17.77777777777778C"。

正则表达式test检查任何数字是否以 F 结尾。华氏温度通过第二个参数p1进入函数。这个函数基于华氏温度作为字符串传递给f2c函数设置成摄氏温度。然后f2c()返回摄氏温度。这个函数与Perl的 s///e 标志相似。

```javascript
function f2c(x)
{
  function convert(str, p1, offset, s)
  {
    return ((p1-32) * 5/9) + "C";
  }
  var s = String(x);
  var test = /(\d+(?:\.\d*)?)F\b/g;
  return s.replace(test, convert);
}
```

**使用行内函数和正则来避免循环**

下例把某种模式的字符串转换为一个对象数组（其元素为对象）。

**输入：**
一个由 x，- 和 _ 组成的字符串。

```javascript
x-x_

---x---x---x---

-xxx-xx-x-

_x_x___x___x___
```

**输出：**

一个数组对象。'x' 产生一个 'on' 状态，'-'（连接符）产生一个 'off' 状态，而 '_' （下划线）表示 'on' 状态的长度。

```javascript
[
  { on: true, length: 1 },
  { on: false, length: 1 },
  { on: true, length: 2 }
  ...
]
```

代码片段：

```javascript
var str = 'x-x_';
var retArr = [];
str.replace(/(x_*)|(-)/g, function(match, p1, p2) {
  if (p1) { retArr.push({ on: true, length: p1.length }); }
  if (p2) { retArr.push({ on: false, length: 1 }); }
});

console.log(retArr);
```

该代码片段生成了一个数组，包含三个期望格式的对象，避免了使用 for 循环语句。

