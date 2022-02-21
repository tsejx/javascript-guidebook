---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.replace
order: 26
---

# String.prototype.replace()

`replace()` 函数用于使用指定字符串替换当前字符串中匹配指定正则表达式模式的子字符串，并返回完成替换后的字符串。

## 语法

```js
str.replace(pattern, replacement);
```

| 参数          | 说明                                                       | 类型              |
| :------------ | :--------------------------------------------------------- | :---------------- |
| `pattern`     | 指定的正则表达式模式的 RegExp 对象的实例。也可以是字符串。 | string / RegExp   |
| `replacement` | 用于替换的字符串，或返回替换字符串的函数。                 | string / function |

一个部分或全部匹配由替代模式所取代的新的字符串。

## 描述

- 如果参数 `pattern` 是字符串，则 `replace()` 函数将直接根据该字符串进行精确匹配，而不会试图转换为正则表达式，并且 **只替换第一个匹配到** 的子字符串
- 参数 `replacement` 可以使用以下以 `$` 开头的 **匹配变量** 来动态确定用于替换的字符串内容（参数 `pattern` 为正则表达式时才生效）

| 字符                                              | 描述                                                                                                  |
| :------------------------------------------------ | :---------------------------------------------------------------------------------------------------- |
| `$n`                                              | 假如第一个参数是 `RegExp` 对象，并且 `n` 是个小于 100 的非负整数，那么插入第 `n` 个括号匹配的字符串。 |
| `$&`                                              | 插入匹配的子串。                                                                                      |
| <code>\$`</code> | 插入当前匹配的子串左边的内容。 |
| `$'`                                              | 插入当前匹配的子串右边的内容。                                                                        |
| `$$`                                              | 插入一个 `$`。                                                                                        |

在进行全局的搜索替换时，正则表达式需包含 `g` 标志。

- 指定一个函数作为参数

你可以指定一个函数作为第二个参数。在这种情况下，当匹配执行后， 该函数就会执行。 函数的返回值作为替换字符串。（注意: 上面提到的特殊替换参数在这里不能被使用。) 另外要注意的是， 如果第一个参数是正则表达式， 并且其为全局匹配模式， 那么这个方法将被多次调用， 每次匹配都会被调用。

下面是该函数的参数：

|   变量名   | 代表的值                                                                                                                |
| :--------: | :---------------------------------------------------------------------------------------------------------------------- |
|   match    | 匹配的子串。（对应于上述的 `\$&`。）                                                                                    |
| p1,p2, ... | 假如 `replace()` 方法的第一个参数是一个 `RegExp` 对象，则代表第 `n` 个括号匹配的字符串。（对应于上述的 `$1`，`$2`等。） |
|   offset   | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 `'abcd'`，匹配到的子字符串是 `'bc'`，那么这个参数将是 1）  |
|   string   | 被匹配的原字符串。                                                                                                      |

精确的参数个数依赖于 `replace()`的第一个参数是否是一个正则表达式对象， 以及这个正则表达式中指定了多少个括号子串。

## 示例

### 代码示例

在下面的例子中，`replace()` 中使用了正则表达式及忽略大小写标示。

```js
var str = 'Twas the night before Xmas...';

var newstr = str.replace(/xmas/i, 'Christmas');

console.log(newstr);
// Twas the night before Christmas...

var str = 'Hello world!';

// 将字符 'lo' 替换为 '**'
str.replace('lo', '**');
// "Hel** world!"

// 将所有 'h' 替换为 '**'（全局，忽略大小写）
str.replace(/h/ig);
 // '**ello world!'

// 将位于单词边界前的两个字母替换为 '**'
str.replace(/\w{2}\b/g, '**');
 // "Hel** wor**!"

// 将位于起始位置与单词边界的两个字母替换为 '**'（没有匹配项）
str.replace(/^\w{2}\b/g/, '**');
// "Hello world!"

// 在所有的连续两个字母并且后面不跟字母 'l' 的字母前添加 "**"
// 这里的 "$1" 就表示正则表达式中第一个小括号内的子表达式匹配到的内容
str.replace(/(\w{2}(?!l))/g, '**$1');
// "He**llo **wo**rld!"
```

### 全局模式和区分大小写模式

下面的例子中，正则表达式包含有全局替换（g）和忽略大小写（i）的选项，这使得 `replace()` 方法用 `oranges` 替换掉了所有出现的 `apples`。

```js
var re = /apples/gi;
var str = 'Apples are round, and apples are juicy.';
var newstr = str.replace(re, 'oranges');

// oranges are round, and oranges are juicy.
console.log(newstr);
```

### 单词互换

下面的例子演示了如何交换一个字符串中两个单词的位置，这个脚本使用 `$1` 和 `$2` 代替替换文本。

```js
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2, $1');

console.log(newstr); // Smith, John
```

### 使用行内函数来修改匹配到的字符

在这个例子中，所有出现的大写字母转换为小写，并且在匹配位置前加一个连字符。重要的是，在返回一个替换了的字符串前需要在匹配元素前需要进行添加操作。

在返回前，替换函数允许匹配片段作为参数，并且将它和连字符进行连接作为新的片段。

```js
function styleHyphenFormat(propertyName) {
  function upperToHyphenLower(match) {
    return '-' + match.toLowerCase();
  }
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}
```

此代码 `styleHyphenFormat('borderTop')` 将返回 'border-top'。

因为我们想在最终的替换中进一步转变匹配结果，所以我们必须使用一个函数。这迫使我们在使用 `toLowerCase()` 方法前进行评估。如果我们尝试不用一个函数进行匹配，那么使用 `toLowerCase()` 方法将不会有效。

```js
var newString = propertyName.replace(/[A-Z]/g, '-' + '$&'.toLowerCase()); // won't work
```

这是因为 `'$&'.toLowerCase()` 会先被解析成字符串字面量（这会导致相同的'\$&')而不是当作一个模式。

### 将华氏温度转换为对等的摄氏温度

下面的例子演示如何将华氏温度转换为对等的摄氏温度。华氏温度用一个数字加一个"F"来表示，这个函数将返回一个数字加"C"来表示的摄氏温度。例如，如果输入是 212F，这个函数将返回 100C。如果输入数字时 0F，这个方法将返回 `"-17.77777777777778C"`。

正则表达式 test 检查任何数字是否以 F 结尾。华氏温度通过第二个参数 p1 进入函数。这个函数基于华氏温度作为字符串传递给 f2c 函数设置成摄氏温度。然后 f2c() 返回摄氏温度。这个函数与 Perl 的 s///e 标志相似。

```js
function f2c(x) {
  function convert(str, p1, offset, s) {
    return ((p1 - 32) * 5) / 9 + 'C';
  }
  var s = String(x);
  var test = /(\d+(?:\.\d*)?)F\b/g;
  return s.replace(test, convert);
}
```

### 转义用户输入特殊字符

把用户输入的特殊字符进行转义，避免 XSS 攻击。

```js
function htmlEscape(text) {
  return text.replace(/[<>"&]/g, function (match, pos, originalText) {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case '&':
        return '&amp;';
    }
  });
}
```

### 转换驼峰命名

```js
function camelCased(str) {
  const regexp = /-(\w)/g;
  str.replace(regexp, function (match, pos) {
    return pos.toUpperCase();
  });
}
```

### 数值千位隔断

```js
const str = '123456789';

const res = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

console.log(res);
// 123,456,789
```
