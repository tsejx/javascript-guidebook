# String 对象

String 对象是一个用于字符串或一个字符序列的构造函数。

String 对象是文本字符串的对象形式。String 对象允许操作和格式化文本字符串以及确定和定位字符串中的子字符串。

所有主流浏览器均支持该对象。

## 语法

**用法一**：充当 `String` 对象的**构造函数**使用，用于结合 `new` 关键字构造一个新的 `String` 对象。

```
new String( [ value ] )
```

**用法二**：当作**普通函数**使用，其行为与**用法一**(使用 `new` 关键字)完全一致，相当于用法一省略了 `new` 关键字。

```
String( [ value ] )
```

### 参数

| 参数    | 类型     | 描述                         |
| ------- | -------- | ---------------------------- |
| `value` | 任意类型 | 任何可以被转换成字符串的值。 |

### 描述

#### 模板字面量

从 ECMAScript 2015 开始，字符串字面量也可以称为模板字面量：

```javascript
`hello world` `hello! world!` `hello ${who}` escape `<a>${who}</a>`
```

#### 转义字符

除了普通的可打印字符以外，一些特殊有特殊功能的字符可以通过转义字符的形式放入字符串中：


转义字符	| 输出 
:-------|:----------
`\0`	    |空字符
`\'`	    |单引号
`\"`	    |双引号
`\\`	    |反斜杠
`\n`	    |换行
`\r`	    |回车
`\v`	    |垂直制表符
`\t`	    |水平制表符
`\b`	    |退格
`\f`	    |换页
`\uXXXX`	|Unicode 码
`\u{X} ... \u{XXXXXX}`    |	Unicode Codepoint 
`\xXX`	|Latin-1 字符(x小写)

和其他语言不同，Javascript 的字符串不区分单引号和双引号，所以不论是单引号还是双引号的字符串，上面的转义字符都能运行 。

## String 实例

### 属性

属性  | 释义
:----:|:--------------:
String.prototype.constructor|返回创建该对象的构造函数。
String.prototype.length|返回字符串的长度(字符数)。
String.prototype.N|用于访问第 N 个位置的字符，其中 N 是小于 length 和0之间的正整数。这些属性都是只读性质，不能编辑。

### 方法

方法  | 释义
:-----|:---------------
`String.prototype.charAt()`|从一个字符串中返回指定位置的字符。
`String.prototype.charCodeAt()`|返回表示给定索引的字符的Unicode的值。（值的范围是0到65535）
`String.prototype.codePointAt()`|返回使用UTF-16编码的给定位置的值的非负整数。
`String.prototype.concat()`|将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。
`String.prototype.includes()`|用于判断一个字符串里是否包含在另一个字符串中，根据情况返回 `true` 和 `false`。
`String.prototype.endsWith()`|用于判断当前字符串是否是以另外一个给定的字符串结尾的，根据判断结果返回 `true` 或 `false`。
`String.prototype.indexOf()`|返回调用 String 对象中第一个发现的指定值的索引值，如果没有找到则返回-1。从 `fromIndex` 进行搜索。
`String.prototype.lastIndexOf()`|返回调用该方法的字符串中最后出现的位置，如果没有找到则返回-1。从该字符串的后面向前查找，从 `fromIndex` 处开始。
`String.prototype.localeCompare()`|返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。
`String.prototype.match()`|检索一个字符串与一个正则表达式的匹配项。
`String.prototype.normalize()`|按照指定一种 Unicode 正规形式将当前字符串正规化。
`String.prototype.padEnd()`|用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。
`String.prototype.padStart()`|用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的开头（右侧）开始填充。
`String.prototype.repeat()`|构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
`String.prototype.replace()`|返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的函数。
`String.prototype.search()`|对正则表达式和指定字符串进行匹配搜索，返回第一个出现的匹配项的下标。
`String.prototype.slice()`|摘取一个字符串区域（字符串的一部分），返回一个新的字符串。
`String.prototype.split()`|使用指定的分隔符字符串将一个 String 对象分割成字符串数组，以将字符串分割为子字符串，以确定每个拆分的位置。
`String.prototype.startsWith()`|判断字符串的起始位置是否匹配其他字符串中的字符，根据判断结果返回 `true` 或 `false`。
`String.prototype.substr()`|通过指定字符数返回从指定位置开始到指定字符串数的字符。
`String.prototype.substring()`|返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引知道字符串的末尾的一个子集。
`String.prototype.toLocaleLowerCase()`|根据任何特定于语言环境的案例映射，返回调用字符串值转换为小写的值。
`String.prototype.toLocaleUpperCase()`|使用本地化的大小写映射规则将输入的字符串转化成大写形式并返回结果字符串。
`String.prototype.toLowerCase()`|将字符串转换成小写并返回。
`String.prototype.toSource()`|返回一个对象文字代表着特定的对象。你可以使用这个返回值来创建新的对象。重写  `Object.prototype.toSource`  方法。
`String.prototype.toString()`|返回用字符串表示的特定对象。重写  `Object.prototype.toString`  方法。
`String.prototype.toUpperCase()`|将调用该方法的字符串值转换为大写形式，并返回。
`String.prototype.trim()`|从字符串的两端删除空白字符。在这个上下文的空白字符是所有的空白字符（`space`、`tab`、`no-break space`）。
`String.prototype.trimLeft()` |移除原字符串的左侧的连续空白符。
`String.prototype.trimRight()` |移除原字符串的左侧的连续空白符。
`String.prototype.valueOf()`|返回特定对象的原始值。重写 `Object.prototype.valueOf` 方法。
`String.prototype[@@iterator]\()`|返回一个新的 Iterator 对象，它遍历字符串的代码点，返回每一行代码点 的字符串值。

## 示例

### 标准示例

### 从字符串中获取单个字符

获取字符串的某个字符有两种方法。 第一种是使用 charAt 方法：

```javascript
return 'cat'.charAt(1); // returns "a"
```

另一种 (在ECMAScript 5中有所介绍) 是把字符串当作一个类似数组的对象，其中的每个字符对应一个数值索引：

```javascript
return 'cat'[1]; // returns "a"
```

使用括号访问字符串不可以对其进行删除或添加，因为字符串对应未知的属性并不是可读或配置的。 (更多的信息请参阅 Object.defineProperty。 )

### 长字符串

有时，你的代码可能含有很长的字符串。你可能想将这样的字符串写成多行，而不是让这一行无限延长或着被编辑器折叠。有两种方法可以做到这一点。

- 可以使用 `+` 运算符将多个字符串连接起来。

```javascript
let longString = "This is a very long string which needs " +
                 "to wrap across multiple lines because " +
                 "otherwise my code is unreadable.";
```

- 可以在每行末尾使用反斜杠字符（`\`），以指示字符串将在下一行继续。确保反斜杠后面没有空格或任何除换行符之外的字符或缩进；否则反斜杠将不会工作。 

```javascript
let longString = "This is a very long string which needs \
to wrap across multiple lines because \
otherwise my code is unreadable.";
```

使用这两种方式会创建相同的字符串。
