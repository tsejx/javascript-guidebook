# String.prototype.indexOf()

`indexOf()` 函数用于查找子字符串在当前字符串中第一次出现的位置。

## 语法

```js
str.indexOf( searchValue[, fromIndex])
```

| 参数          | 说明                                           | 类型   |
| ------------- | ---------------------------------------------- | ------ |
| `searchValue` | 需要查找的子字符串。                           | string |
| `fromIndex`   | 可选，在当前字符串中查找的起始索引，默认为 0。 | number |

`indexOf()` 方法的返回值为 `Number` 类型，返回子字符串在当前字符串中第一次查找到的起始位置（索引）。

## 示例

### 标准示例

字符串中的字符被从左向右索引。首字符的索引（index）为 0，字符串 `stringName` 的最后一个字符的索引是 `stringName.length - 1`。

```js
'Blue Whale'.indexOf('Blue'); // returns  0
'Blue Whale'.indexOf('Blute'); // returns -1
'Blue Whale'.indexOf('Whale', 0); // returns  5
'Blue Whale'.indexOf('Whale', 5); // returns  5
'Blue Whale'.indexOf('', 9); // returns  9
'Blue Whale'.indexOf('', 10); // returns 10
'Blue Whale'.indexOf('', 11); // returns 10
```

### 区分大小写

下例定义了两个字符串变量。两个变量包含相同的字符串，除了第二个字符串中的某些字符为大写。第一个 `log` 方法输出 19。但是由于 `indexOf` 方法区分大小写，因此不会在 `myCapString` 中发现字符串 `“cheddar"`，结果第二个 `log` 方法输出 -1。

```js
var myString = 'brie, pepper jack, cheddar';
var myCapString = 'Brie, Pepper Jack, Cheddar';

console.log('myString.indexOf("cheddar") is ' + myString.indexOf('cheddar'));
// logs 19
console.log('myCapString.indexOf("cheddar") is ' + myCapString.indexOf('cheddar'));
// logs -1
```

### 统计字符串中字母数量

使用 `indexOf` 统计一个字符串中某个字母出现的次数

在下例中，设置了 `count` 来记录字母 e 在字符串 `str` 中出现的次数：

```js
var str = 'To be, or not to be, that is the question.';
var count = 0;
var pos = str.indexOf('e');

while (pos !== -1) {
  count++;
  pos = str.indexOf('e', pos + 1);
}

console.log(count); // displays 4
```

### 检测字符是否存在

当检测某个字符串是否存在于另一个字符串中时，可使用下面的方法：

```js
'Blue Whale'.indexOf('Blue') !== -1; // true
'Blue Whale'.indexOf('Bloe') !== -1; // false
```
