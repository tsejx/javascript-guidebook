---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array
order: 1
---

# Array 对象

`Array` 对象时用于构造数组的全局对象，类似时类似于列表的高阶对象。

`Array` 对象主要用于存储多个数据项，数据可以是任意类型。

所有主流浏览器均支持该对象。

## 语法

**字面量**

```js
[element0, element1, ..., elementN]
```

**数组类型转换函数**

```js
Array(element0, element1, ..., elementN)
```

**构造函数**

```js
new Array(element0, element1, ..., elementN)

new Array(arrayLength)
```

类型声明：

```ts
interface ArrayConstructor {
  new (arrayLength?: number): any[];
  new <T>(arrayLength: number): T[];
  new <T>(...items: T[]): T[];
  (arrayLength?: number): any[];
  <T>(arrayLength: number): T[];
  <T>(...items: T[]): T[];
  isArray(arg: any): arg is any[];
  readonly prototype: any[];
}

declare var Array: ArrayConstructor;
```

参数说明：

| 参数          | 类型          | 描述                                                                                                                                                                                                                                                                      |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `elementN`    | 任意类型      | `Array` 构造器会根据给定的元素创建一个 JavaScript 数组，但是当仅有一个参数且为数字时除外（详见下面的 `arrayLength` 参数）。                                                                                                                                               |
| `arrayLength` | `Number` 类型 | 一个范围在 0 到 2[32]-1 之间的整数，此时将返回一个 `length` 的值等于 `arrayLength` 的数组对象（言外之意就是该数组此时并没有包含任何实际的元素，不能理所当然地认为它包含 `arrayLength` 个值为 `undefined` 的元素）。如果传入的参数不是有效值，则会抛出 `RangeError` 异常。 |

## 描述

数组是类似列表的对象，本质上，数组是一种特殊的对象（有次序的对象），在原型中提供了遍历以及改变其中元素的很多方法。 数组的长度及其中元素的类型都是不固定的。因为数组的长度可读可写，有时数组中的元素也不是在连续的位置，所以 JavaScript 数组不一定是密集的。通常情况下，这是一些方便的特性；如果这些特性不适用于你的特定使用场景，你可以考虑使用固定类型数组。

```js
typeof [1, 2, 3]; // "object"
```

数组的特殊性体现在，它的键名是按次序排列的一组整数。由于数组成员的键名是固定的，因此数组不用为每个元素指定键名，而对象的每个成员都必须指定键名。

```js
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // ["0", "1", "2"]

var obj = {
  name1: 'a',
  name2: 'b',
  name3: 'c',
};
```

数组是对象的特殊形式，使用方括号访问数组元素就像用方括号访问对象的属性一样。

JavaScript 语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串，然后将其作为属性名来使用

```js
// 创建一个普通的对象
o = {};

// 用一个整数来索引它
o[1] = 'one';

// 数值键名被自动转成字符串
var arr = ['a', 'b', 'c'];
console.log(arr['0']);
// 'a'
console.log(arr[0]);
// 'a'
```

但是，一定要区分数组索引和对象的属性名：所有的索引都是属性名，但只有在 0~232-2(4294967294)之间的整数属性名才是索引。

```js
var a = [];

//索引
a['1000'] = 'abc';
a[1000]; // 'abc'

//索引
a[1.0] = 6;
a[1]; // 6
```

单独的数值不能作为标识符（Identifier）。所以，数组成员只能用方括号法表示。（在 JavaScript 中，以数字开头的属性不能用点号引用，必须用方括号）

```js
var arr = [1, 2, 3];

console.log(arr[0]);
// 1

console.log(arr.0);
// SyntaxError
```

可以使用负数或非整数来索引数组。但由于其不在 0~2 的 32 次方-2 的范围内，所以其只是数组的属性名，而不是数组的索引，明显的特征是不改变数组的长度。

```js
var a = [1, 2, 3];

// 属性名
a[-1.23] = true;
console.log(a.length);
// 3

// 索引
a[10] = 5;
console.log(a.length);
// 11

// 属性名
a['abc'] = 'testing';
console.log(a.length);
// 11
```

## 构造函数

### 属性

| 属性              | 描述                                                                                             |
| :---------------- | :----------------------------------------------------------------------------------------------- |
| `Array.length`    | `Array` 构造函数的 `length` 属性，其值为 1（注意该属性为静态属性，不是数组实例的 `length` 属性） |
| `Array.prototype` | 通过数组的原型对象可以为所有数组对象添加属性。                                                   |

### 方法

| 方法              | 描述                                                             |
| :---------------- | :--------------------------------------------------------------- |
| `Array.form()`    | 从一个类似数组或可迭代对象中创建一个新的数组实例。               |
| `Array.isArray()` | 用于判断指定值是否为数组。                                       |
| `Array.of()`      | 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。 |

## 原型对象

所有数组实例都会从 `Array.prototype` 继承属性和方法。修改 `Array` 的原型会影响到所有的数组实例。

### 属性

| 属性                          | 描述                                                                                                    |
| :---------------------------- | :------------------------------------------------------------------------------------------------------ |
| `Array.prototype.constructor` | 所有的数组实例都继承了这个属性，它的值就是 `Array`，表明了所有的数组都是由 `Array` 构造出来的。         |
| `Array.prototype.length`      | 上面说了，因为 `Array.prototype` 也是个数组，所以它也有 `length` 属性，这个值为 `0`，因为它是个空数组。 |

### 方法

#### Mutator 突变方法

下面这些方法会改变调用它们的对象自身的值

| 方法名                                 | 描述                                                                                                        |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| [Array.prototype.fill()](./fill)       | 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。                                                |
| [Array.prototype.pop()](./pop)         | 从数组中删除的最后一个元素，并返回这个元素。此方法更改数组长度。                                            |
| [Array.prototype.push()](./push)       | 将一个或多个元素添加到数组末尾，并返回数组的新长度。                                                        |
| [Array.prototype.reverse()](./reverse) | 颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。                            |
| [Array.prototype.shift()](./shift)     | 从数组中删除第一个元素，并返回该元素的值。此方法更改数组长度。                                              |
| [Array.prototype.sort()](./sort)       | 用就地的算法对数组元素进行排序，并返回当前数组。排序不一定是稳定的。默认排序顺序是根据字符串 Unicode 码点。 |
| [Array.prototype.splice()](./splice)   | 通过删除现有元素和/或添加新元素来更改一个数组的内容。                                                       |
| [Array.prototype.unshift()](./unshift) | 在数组的开头增加一个或多个元素，并返回数组的新长度                                                          |

#### Accessor 访问方法

下面的这些方法绝对**不会改变调用它们的对象的值**，只会返回一个新的数组或者返回一个其它的期望值

| 方法名                                           | 描述                                                                                                        |
| :----------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| [Array.prototype.indexOf()](./index-of)          | 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。                                 |
| [Array.prototype.lastIndexOf()](./last-index-of) | 返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。             |
| [Array.prototype.concat()](./concat)             | 用于合并当前数组和其他若干个数组或者若干个非数组值组合而成的新数组。                                        |
| [Array.prototype.includes()](./includes)         | 判断当前数组是否包含某指定的值，如果是返回 `true`，否则返回 `false`                                         |
| [Array.prototype.join()](./join)                 | 将一个数组（或一个类数组对象） 的所有元素连接成一个字符串并返回这个字符串。                                 |
| [Array.prototype.slice()](./slice)               | 返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。                                |
| `Array.prototype.toSource()`                     | 返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 `Object.prototype.toSource()`                          |
| `Array.prototype.toString()`                     | 返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 `Object.prototype.toString()` 方法。               |
| `Array.prototype.toLocaleString()`               | 返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 `Object.prototype.toLocaleString()` 方法 |
| [Array.prototype.copyWithin()](./copy-within)    | 在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。                                            |
| [Array.prototype.flat()](./flat)                 | 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回            |
| [Array.prototype.flatMap()](./flat-map)          | 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组                                                |

#### Iteration 迭代方法

在下面的众多遍历方法中，有很多方法都需要指定一个回调函数作为参数。在每一个数组元素都分别执行完回调函数之前，数组的 `lengt` 属性会被缓存在某个地方，所以，如果你在回调函数中为当前数组添加了新的元素，那么那些新添加的元素是不会被遍历到的。此外，如果在回调函数中对当前数组进行了其它修改，比如改变某个元素的值或者删掉某个元素，那么随后的遍历操作可能会受到未预期的影响。总之，**不要尝试在遍历过程中对原数组进行任何修改，虽然规范对这样的操作进行了详细的定义，但为了可读性和可维护性，请不要这样做。**

| 方法名                                          | 描述                                                                                                                               |
| :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| [Array.prototype.forEach()](./for-each)         | 对数组的每个元素执行一次回调函数。                                                                                                 |
| [Array.prototype.entries()](./entries)          | 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。                                                                       |
| [Array.prototype.every()](./every)              | 测试数组的所有元素是否都通过了指定函数的测试。                                                                                     |
| [Array.prototype.some()](./some)                | 测试数组中的某些元素是否通过由提供的函数实现的测试。                                                                               |
| [Array.prototype.filter()](./filter)            | 创建一个新数组，其包含通过所提供函数实现的测试的所有元素。                                                                         |
| [Array.prototype.find()](./find)                | 返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`。                                                               |
| [Array.prototype.findIndex()](./find-index)     | 返回数组中满足提供的测试函数的第一个元素的缩影。否则返回-1。                                                                       |
| [Array.prototype.keys()](./keys)                | 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。                                                                           |
| [Array.prototype.map()](./map)                  | 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。                                                       |
| [Array.prototype.reduce()](./reduce)            | 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。 |
| [Array.prototype.reduceRight()](./reduce-right) | 从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。 |
| `Array.prototype.values()`                      | 返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。                                                                           |
| `Array.prototype[@@iterator]()`                 | 和上面的 `values()` 方法是同一个函数。                                                                                             |

## 代码示例

### 创建数组

- 没有参数，创建一个空数组

```js
// 该方法创建一个没有任何元素的空数组，等同于数组直接量[]
var car = new Array();
```

- 有一个数值参数，该参数用于指定数组的长度

```js
var car = new Array(10);

console.log(car); // return []
console.log(car[0], car.length); // return undefined and 10
```

- 若存在一个其他类型的参数，则会创建包含那个值的只有一项的数组

```js
var car = new Array('10');

console.log(car); // return ['10']
console.log(car[0], car.length); // return 10 1
```

- 有多个参数时，参数表示为数组的具体元素

```js
var car = new Array(1, 2, 3);
console.log(car); // return [1,2,3]
console.log(car[0], car[1], car[2]); // return 1 2 3
```

### 稀疏数组

稀疏数组就是包含从 0 开始的**不连续索引的数组**

- 制造稀疏数组最直接的方法就是使用 delete 操作符

```js
var car = [1, 2, 3, 4, 5];
delete car[1];

console.log(car[1]); // undefined
console.log(1 in car); // false
```

- 数组的逗号之间可以省略元素值，通过省略元素值也可以制造稀疏数组

```js
var a = [1, , 3, 4, 5];

console.log(a[1]); // undefined
console.log(1 in a); // false
```

- 省略的元素值和值为 `undefined` 的元素值是有区别的

```js
var a = [1, , 3, 4, 5];

console.log(a[1]); // return undefined
console.log(1 in a); // return false

var a = [1, undefined, 3, 4, 5];

console.log(a[1]); // return undefined
console.log(1 in a); // return true
```

- 如果在数组的末尾使用逗号时，浏览器之间是有差别的。标准浏览器会忽略该逗号，而 IE8- 浏览器则会在末尾添加 `undefined` 值。

```js
// 标准浏览器输出[1,2]，而IE8-浏览器输出[1,2,undefined]
var a = [1, 2];
console.log(a);

// 标准浏览器输出2，而IE8-浏览器输出3
var a = [, ,];
console.log(a.length);
```

足够稀疏的数组通常在实现上比稠密的数组更慢，内存利用率更高，在这样的数组中查找元素的时间与常规对象属性的查找时间一样长。

### 数组长度

每个数组有一个 `length` 属性，就是这个属性使其区别于常规的 JavaScript 对象。针对稠密（也就是非稀疏）数组，`length` 属性值代表数组中元素的个数，其值比数组中最大的索引大 1。

```js
[].length[('a', 'b', 'c')].length; //=>0:数组没有元素,length为0 //=>3:最大的索引为2，length为3
```

- 当数组是稀疏数组时，`length` 属性值大于元素的个数，同样地，其值比数组中最大的索引大 1。

```js
[, , ,].length; // return 3
Array(10).length; // return 10

var a = [1, 2, 3];
console.log(a.length); // return 3
delete a[1];
console.log(a.length); // return 3
```

数组的特殊性主要体现在数组长度是可以动态调整的：

- 如果为一个数组元素赋值，索引 `i` 大于等于现有数组的长度时，`length` 属性的值将设置为 `i+1`

```js
var arr = ['a', 'b'];
arr.length; // return 2

arr[2] = 'c';
arr.length; // return 3

arr[9] = 'd';
arr.length; // return 10

arr[1000] = 'e';
arr.length; // return 1001
```

- 设置 `length` 属性为小于当前长度的非负整数 `n` 时，当前数组索引值大于等于 `n` 的元素将从中删除。

```js
a = [1, 2, 3, 4, 5]; // 从5个元素的数组开始
a.length = 3; // 现在a为[1,2,3]
a.length = 0; // 删除所有的元素。a为[]
a.length = 5; // 长度为5，但是没有元素，就像new Array(5)
```

- **清空数组**：将数组清空的一个有效方法，就是将 `length` 属性设为 0

```js
var arr = ['a', 'b', 'c'];
arr.length = 0;
arr; //  return []
```

将数组的 `length` 属性值设置为大于其当前的长度。实际上这不会向数组中添加新的元素，它只是在数组尾部创建一个空的区域。

```js
var a = ['a'];
a.length = 3;
console.log(a[1]); //undefined
console.log(1 in a); //false
```

如果人为设置 `length` 为不合法的值（即 0——2[32]-2 范围以外的值），Javascript 会报错

```js
// 设置负值
[].length = -1 				// RangeError: Invalid array length

// 数组元素个数大于等于2的32次方
[].length = Math.pow(2,32)	 // RangeError: Invalid array length

// 设置字符串
[].length = 'abc'			// RangeError: Invalid array length
```

由于数组本质上是对象，所以可以为数组添加属性，但是这不影响 `length` 属性的值

```js
var a = [];

a['p'] = 'abc';
console.log(a.length); // 0

a[2.1] = 'abc';
console.log(a.length); // 0
```

### 数组遍历

- 使用 `for` 循环语句遍历数组元素是最常见的方法

```js
var a = [1, 2, 3];
for (var i = 0; i < a.length; i++) {
  console.log(a[i]);
}
```

- 当然，也可以使用 `while` 循环语句

```js
var a = [1, 2, 3];
var i = 0;
while (i < a.length) {
  console.log(a[i]);
  i++;
}

var l = a.length;
while (l--) {
  console.log(a[l]);
}
```

- 但如果数组是稀疏数组时，使用 `for` 循环语句，就需要添加一些条件

```js
// 跳过不存在的元素
var a = [1, , , 2];
for (var i = 0; i < a.length; i++) {
  if (!(i in a)) continue;
  console.log(a[i]);
}
```

还可以使用 `for/in` 循环语句处理稀疏数组。循环每次将一个可枚举的属性名（包括数组索引）赋值给循环变量。**不存在的索引将不会遍历到。**

```js
var a = [1, , , 2];
for (var i in a) {
  console.log(a[i]);
}
```

由于 `for/in` 循环能够枚举继承的属性名，如添加到 `Array.prototype` 中的方法。由于这个原因，在数组上不应该使用 `for/in` 循环，除非使用额外的检测方法来过滤不想要的属性。

```js
var a = [1, , , 2];
a.b = 'b';
for (var i in a) {
  console.log(a[i]); //1 2 'b'
}
```

```js
// 跳过不是非负整数的 i
var a = [1, , , 2];
a.b = 'b';
for (var i in a) {
  if (String(Math.floor(Math.abs(Number(i)))) !== i) continue;
  console.log(a[i]); //1 2
}
```

JavaScript 规范允许 `for/in` 循环以不同的顺序遍历对象的属性。通常数组元素的遍历实现是升序的，但不能保证一定是这样的。特别地，如果数组同时拥有对象属性和数组元素，返回的属性名很可能是按照创建的顺序而非数值的大小顺序。**如果算法依赖于遍历的顺序，那么最好不要使用 `for/in` 而用常规的 `for` 循环。**

### 数组乱序

数组乱序的英文为 shuffle，也称为洗牌。一般地，有如下两种方法

- 给数组原生的 `sort()` 方法传入一个函数，此函数随机返回 1 或 -1，达到随机排列数组元素的目的

```js
var array = [1, 2, 3, 4, 5];
array.sort(function () {
  return Math.random() - 0.5;
});
// return [2,1,5,4,3]
```

- 依次遍历数组中的每个元素，遍历到的元素与一个随机位置的元素交换值（效率比第一种方法搞）

```js
var arr = [1, 2, 3, 4, 5];
for (var i = 0; i < arr.length; i++) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log(arr); // [2, 3, 1, 4, 5]
```
