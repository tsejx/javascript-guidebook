# RegExp正则表达式类型

## 对象

　　Javascript中的正则表达式用RegExp对象表示，有两种写法：一种是**字面量写法**；另一种是**构造函数写法**

### Perl写法

　　正则表达式字面量写法，又叫Perl写法，因为JavaScript的正则表达式特性借鉴自Perl

　　正则表达式字面量定义为包含在一对斜杠(/)之间的字符，并且可以设置3个标志
　　
```javascript
var expression = /pattern/flags;
```
　　
　　正则表达式的匹配模式支持下列3个标志：

　　**g**：表示全局(global)模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止

　　**i**：表示不区分大小写(case-insensitive)模式，即在确定匹配项时忽略模式与字符串的大小写

　　**m**：表示多行(multiline)模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项

```javascript
// 匹配字符串所有'at'的实例
var p = /at/g;
// test()方法返回一个布尔值表示是否可以找到匹配项
console.log(p.test('ata')); // true
console.log(p.test('aba')); // false
```

### RegExp构造函数

　　和普通的内置对象一样，RegExp正则表达式对象也支持new+RegExp()构造函数的形式

　　RegExp构造函数接收两个参数：要匹配的字符串模式(pattern)和可选的标志字符串(flags)，标志字符串和字面量的三个标志含义相同：'g'、'i'、'm'

　　RegExp构造函数的两个参数都是字符串。且使用字面量形式定义的任何表达式都可使用构造函数

```javascript
// 匹配字符串所有'at'的实例
var p1 = /at/g;
// 同上
var p2 = new RegExp('at','g');
```

　　[注意]ECMAScript3规范规定，一个正则表达式直接量会在执行到它时转换为一个RegExp对象，同一段代码所表示正则表达式直接量的每次运算都返回同一个对象。ECMAScript5规范则做了相反的规定，同一段代码所表示的正则表达式直接量的每次运算都返回新对象。IE6-8一直是按照ECMAScript5规范的方式实现的，所以并没有兼容性问题

　　由于正则表达式字面量并不支持变量，所以如果正则表达式中出现变量只能使用RegExp构造函数以字符串拼接的形式，将变量拼接到RegExp构造函数的参数中

　　【tips】通过类名classname获取元素

```javascript
function getByClass(obj,classname){
    var elements = obj.getElementsByTagName('*');
    var result = [];
    var pattern = new RegExp( '(^|\\s)'+ classname + '(\\s|$)');
    for(var i = 0; i < elements.length; i++){
        if(pattern.test(elements[i].className)){
            result.push(elements[i]);
        }
    }
    return result;
}
```
 
## 实例属性

　　每个RegExp实例对象都包含如下5个属性

属性|释义
:---:|:---:
global|布尔值，表示是否设置了g标志
ignoreCase|布尔值，表示是否设置了i标志
lastIndex|整数，表示开始搜索下一个匹配项的字符位置，从0算起
multiline|布尔值，表示是否设置了标志m
source|正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回


```javascript
var pattern = new RegExp('\\[bc\\]at','i');
console.log(pattern.global); // false
console.log(pattern.ignoreCase); // true    
console.log(pattern.multiline); // false
console.log(pattern.lastIndex); // 0
console.log(pattern.source); // '\[bc\]at'
```

　　如果使用RegExp的 `exec()` 或 `test()` 函数，并且设定了全局模式'g'，正则表达式的匹配就会从lastIndex的位置开始，并且在每次匹配成功之后重新设定lastIndex。这样，就可以在字符串中重复迭代，依次寻找各个匹配结果。但是，如果需要对不同字符串调用同一个RegExp的 `exec()` 或 `test()` 方法，这个变量也可能会带来意料之外的匹配结果，所以在更换字符串时，要显式地将RegExp的lastIndex置为0

```javascript
//exec()方法以数组形式返回匹配项
var p = /\w/g;
var s = 'ab';

console.log(p.lastIndex);//0

console.log(p.exec(s));//['a']
console.log(p.lastIndex);//1

console.log(p.exec(s));//['b']
console.log(p.lastIndex);//2

console.log(p.exec(s));//null
console.log(p.lastIndex);//0
```

```javascript
var p = /\w/g;
var s1 = 'ab';
var s2 = 'ba';
console.log(p.lastIndex);//0
console.log(p.exec(s1));//['a']
console.log(p.lastIndex);//1
console.log(p.exec(s2));//['a']
console.log(p.lastIndex);//2
```
 

## 构造函数属性

　　RegExp构造函数属性被看成静态属性，这些属性基于所执行的最近一次正则表达式操作而变化

　　有两种方式访问它们，即长属性名和短属性名。短属性名大都不是有效的ECMAScript标识符，所以必须通过方括号语法来访问它们


长属性名     |       短属性名       |　　　　     说明
:-----------:|:--------------------:|:--------------------------------------:
input        |         \$_           |     最近一次要匹配的字符串
lastMatch    |         \$&           |     最近一次的匹配项
lastParen    |         \$+           |     最近一次匹配的捕获组
leftContext  |         \$`           |     input字符串中lastMatch之前的文本
multiline    |         \$*           |     布尔值，表示是否所有表达式都使用多行模式
rightContext |         \$'           |     input字符串中lastMatch之后的文本


　　使用这些属性，可以从exec()方法或test()方法执行的操作中提取出更具体的信息

```javascript
// test()用于测试一个字符串是否匹配某个正则表达式，并返回一个布尔值
var text = 'this has been a short summer';
var pattern = /(.)hort/g;
if(pattern.test(text)){
    console.log(RegExp.input); // 'this has been a short summer'
    console.log(RegExp.leftContext); // 'this has been a '
    console.log(RegExp.rightContext); // ' summer'
    console.log(RegExp.lastMatch); // 'short'
    console.log(RegExp.lastParen); // 's'
    console.log(RegExp.multiline); // false
    console.log(RegExp['$_']); // 'this has been a short summer'
    console.log(RegExp['$`']); // 'this has been a '
    console.log(RegExp["$'"]); // ' summer'
    console.log(RegExp['$&']); // 'short'
    console.log(RegExp['$+']); // 's'
    console.log(RegExp['$*']); // false        
}
```

　　Javascript有9个用于存储捕获组的构造函数属性，在调用 `exec()` 或 `test()` 方法时，这些属性会被自动填充

　　[注意]理论上，应该保存整个表达式匹配文本的RegExp.$0并不存在，值为undefined

```javascript
// RegExp.$1\RegExp.$2\RegExp.$3……到RegExp.$9分别用于存储第一、第二……第九个匹配的捕获组
var text = 'this has been a short summer';
var pattern = /(..)or(.)/g;
if(pattern.test(text)){
    console.log(RegExp.$1); // sh
    console.log(RegExp.$2); // t
}
```
 

## 实例方法

　　RegExp对象的实例方法共5个，分为两类。包括 `toString()` 、`toLocalString()`、`valueOf()` 这3种对象通用方法和 `test()`、`exec()` 正则匹配方法

### 对象通用方法

　　RegExp对象继承了Object对象的通用方法 `toString()`、`toLocaleString()`、`valueOf()` 这三个方法

**【toString()】**

　　toString()方法返回正则表达式的字面量

**【toLocaleString()】**

　　toLocaleString()方法返回正则表达式的字面量

**【valueOf()】**

　　valueOf()方法返回返回正则表达式对象本身

　　[注意]不论正则表达式的创建方式是哪种，这三个方法都只返回其字面量形式

```javascript
var pattern = new RegExp('[bc]at','gi');
console.log(pattern.toString()); // '/[bc]at/gi'
console.log(pattern.toLocaleString()); // '/[bc]at/gi'
console.log(pattern.valueOf()); // /[bc]at/gi

var pattern = /[bc]at/gi;
console.log(pattern.toString()); // '/[bc]at/gi'
console.log(pattern.toLocaleString()); // '[bc]at/gi'
console.log(pattern.valueOf()); // /[bc]at/gi
```

### 正则匹配方法

　　正则表达式RegExp对象的正则匹配方法只有两个：分别是exec()和test()

**【exec()】**

　　exec()方法专门为捕获组而设计，接受一个参数，即要应用模式的字符串。然后返回包含匹配项信息的数组，在没有匹配项的情况下返回null

　　在匹配项数组中，第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串，如果模式中没有捕获组，则该数组只包含一项

　　返回的数组包含两个额外的属性：index和input。index表示匹配项在字符串的位置，input表示应用正则表达式的字符串

```javascript
var text = 'mom and dad and baby and others';
var pattern = /mom( and dad( and baby)?)?/gi;
var matches = pattern.exec(text);
console.log(pattern,matches);
// pattern.lastIndex:20
// matches[0]:'mom and dad and baby'
// matches[1]:' and dad and baby'
// matches[2]:' and baby'
// matches.index:0
// matches.input:'mom and dad and baby and others'   
```

　　对于exec()方法而言，即使在模式中设置了全局标志(g)，它每次也只会返回一个匹配项。在不设置全局标志的情况下，在同一个字符串上多次调用exec()，将始终返回第一个匹配项的信息；而在设置全局标志的情况下，每次调用exec()都会在字符串中继续查找新匹配项

```javascript
var text = 'cat,bat,sat,fat';
var pattern1 = /.at/;
var matches = pattern1.exec(text);
console.log(pattern1,matches);
//pattern1.lastIndex:0
//matches[0]:'cat'
//matches.index:0
//matches.input:'cat,bat,sat,fat'

var text = 'cat,bat,sat,fat';
matches = pattern1.exec(text);    
console.log(pattern1,matches);    
//pattern1.lastIndex:0
//matches[0]:'cat'
//matches.index:0
//matches.input:'cat,bat,sat,fat'
```

```javascript
var text = 'cat,bat,sat,fat';
var pattern2 = /.at/g;
var matches = pattern2.exec(text);
console.log(pattern2,matches);    
//pattern2.lastIndex:3
//matches[0]:'cat'
//matches.index:0
//matches.input:'cat,bat,sat,fat'

var text = 'cat,bat,sat,fat';
matches = pattern2.exec(text);
console.log(pattern2,matches);    
//pattern2.lastIndex:7
//matches[0]:'bat'
//matches.index:4
//matches.input:'cat,bat,sat,fat'    
```

　　【tips】用exec()方法找出匹配的所有位置和所有值

```javascript
var string = 'j1h342jg24g234j 3g24j1';
var pattern = /\d/g;
var valueArray = [];//值
var indexArray = [];//位置
var temp;
while((temp=pattern.exec(string)) != null){
    valueArray.push(temp[0]);
    indexArray.push(temp.index);  
}
//["1", "3", "4", "2", "2", "4", "2", "3", "4", "3", "2", "4", "1"] [1, 3, 4, 5, 8, 9, 11, 12, 13, 16, 18, 19, 21]
console.log(valueArray,indexArray); 
```

**【test()】**

　　test()方法用来测试正则表达式能否在字符串中找到匹配文本，接收一个字符串参数，匹配时返回true，否则返回false

```javascruot
var text = '000-00-000';
var pattern = /\d{3}-\d{2}-\d{4}/;
if(pattern.test(text)){
    console.log('The pattern was matched');
}
```

　　同样地，在调用 `test()` 方法时，会造成RegExp对象的lastIndex属性的变化。如果指定了全局模式，每次执行 `test()` 方法时，都会从字符串中的lastIndex偏移值开始尝试匹配，所以用同一个RegExp多次验证不同字符串，必须在每次调用之后，将lastIndex值置为0

```javascript
var pattern = /^\d{4}-\d{2}-\d{2}$/g;
console.log(pattern.test('2016-06-23'));//true
console.log(pattern.test('2016-06-23'));//false

//正确的做法应该是在验证不同字符串前，先将lastIndex重置为0
var pattern = /^\d{4}-\d{2}-\d{2}$/g;
console.log(pattern.test('2016-06-23'));//true
pattern.lastIndex = 0;
console.log(pattern.test('2016-06-23'));//true
```

　　前面介绍过，javascript有9个用于存储捕获组的构造函数属性，在调用 `exec()` 或 `test()` 方法时，这些属性会被自动填充

　　[注意]理论上，应该保存整个表达式匹配文本的RegExp.$0并不存在，值为 `undefined`

```javascript
if(/^(\d{4})-(\d{2})-(\d{2})$/.test('2016-06-23')){
    console.log(RegExp.$1);//'2016'
    console.log(RegExp.$2);//'06'
    console.log(RegExp.$3);//'23'
    console.log(RegExp.$0);//undefined
}
```


