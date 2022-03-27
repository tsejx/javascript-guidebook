---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.sort
order: 45
---

# Array.prototype.sort()

`Array.prototype.sort()` 方法用于将数组对象的成员按指定顺序进行排序，并返回排序后的数组。

## 语法

语法：

```js
arr.sort(compareFn);
```

类型声明：

```ts
interface Array<T> {
  sort(compareFn?: (a: T, b: T) => number): this;
}
```

参数说明：

| 参数      | 说明                                   | 类型     |
| :-------- | :------------------------------------- | :------- |
| compareFn | （可选）指定如何比较元素顺序的函数名称 | function |

返回值：

返回排序后的数组对象。

在排序过程中，并不会创建新的数组对象，返回的数组对象就是经过排序后的当前数组本身。

## 方法说明

如果省略 `compareFn` 参数，元素将按 ASCII 字符顺序的**升序**进行排列。[ASCII 字符表](http://ascii.911cha.com/)

如果提供了 `compareFn` 参数，那么该函数必须返回下列值之一：

- 如果所传递的第一个参数小于第二个参数，则返回负值。
- 如果两个参数相等，则返回零。
- 如果第一个参数大于第二个参数，则返回正值。

比较函数格式如下：

```js
function compare(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1;
  }
  if (a is greater than b by the ordering criterion) {
    return 1;
  }
  return 0;
}
```

## 代码示例

### 基本用法

```js
const foo = ['b', 'c', 'a'];

fruit.sort();
// ['a', 'b', 'c']
```

```js
const bar = [1, 10, 21, 2];

bar.sort();
// [1, 10, 2, 21]
```

注意 10 在 2 之前，因为在 Unicode 指针顺序中 `"10"` 在 `"2"` 之前。

```js
const baz = ['word', 'Word', '1 Word', '2 Words'];

baz.sort();
// ['1 Word', '2 Words', 'Word', 'word']
```

在 Unicode 中，数字在大写字母之前，大写字母在小写字母之前。

### 数字排序

希望比较数字而非字符串，比较函数可以简单的以 `a` 减 `b`，如下的函数将会将数组**升序**排列。

```js
const compareNumbers = (a, b) => a - b;
```

`sort()` 方法可以使用函数表达式方便地书写。

```js
const foo = [4, 2, 5, 1, 3];

foo.sort((a, b) => a - b);

console.log(foo);
// [1, 2, 3, 4, 5]
```

### 对象属性排序

对象可以按照某个属性排序。

```js
var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 },
];

items.sort(function (a, b) {
  if (a.value > b.value) {
    return 1;
  }
  if (a.value < b.value) {
    return -1;
  }
  return 0;
});
```

### `undefined` 排序

如果数组包含 `undefined` 元素，它们会被排到数组的尾部。

```js
const arr = ['3', 3, undefined, 2, '2'];

console.log(arr);
// [2, "2", "3", 3, undefined]

console.log(arr.sort());
// [2, "2", "3", 3, undefined]
```

### 大小写排序

如果对一个字符串数组执行不区分大小写的字母表排序，比较函数首先将参数转化为小写字符串再开始比较。

```js
a = ['ant', 'Bug', 'cat', 'Dog'];

a.sort();
// ['Bug','Dog','ant','cat'];

a.sort(function (s, t) {
  var a = s.toLowerCase();
  var b = t.toLowerCase();

  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
});
// ['ant','bug','cat','dog']
```

### 升降序

- 降序函数

```js
function desc = function (x, y) {
    if (x > u){
        return -1; // 返回一个小于 0 的数即可
    } else if (x < y){
        return 1; // 返回一个大于 0 的数即可
    }else {
        return 0;
    }
}
```

- 升序函数

```js
function asc = function (x, y) {
    if (x > y){
        return 1; // 返回一个大于 0 的数即可
    } else if (x < y){
        return -1; // 返回一个小于 0 的数即可
    }
}
```

### 对非 ASCII 字符排序

当排序非 ASCII 字符的字符串（如包含类似 e, é, è, a, ä 等字符的字符串）。一些非英语语言的字符串需要使用`String.localeCompare`。这个函数可以将函数排序到正确的顺序。

```js
let items = ['réservé', 'premier', 'cliché', 'communiqué', 'café', 'adieu'];

items.sort(function (a, b) {
  return a.localeCompare(b);
});

console.log(item);
// ['adieu', 'café', 'cliché', 'communiqué', 'premier', 'réservé']
```

### 使用映射改善排序

`compareFunction` 可能需要对元素做多次映射以实现排序，尤其当 `compareFunction` 较为复杂，且元素较多的时候，某些 `compareFunction` 可能会导致很高的负载。使用 `map()` 辅助排序将会是一个好主意。基本思想是首先将数组中的每个元素比较的实际值取出来，排序后再将数组恢复。

```js
// 需要被排序的数组
let list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// 对需要排序的数字和位置的临时存储
let mapped = list.map(function (el, i) {
  return { index: i, value: el.toLowerCase() };
});

// 按照多个值排序数组
mapped.sort(function (a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// 根据索引得到排序的结果
let result = mapped.map(function (el) {
  return list[el.index];
});
```

## 参考资料

- [MDN: Array.prototype.sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
