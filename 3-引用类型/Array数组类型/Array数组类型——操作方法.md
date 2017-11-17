# Array数组类型——操作方法

## Array.prototype.concat()（数组拼接方法）

concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

```javascript
var arr1 = ['a', 'b', 'c'];
var arr2 = ['d', 'e', 'f'];

var arr3 = arr1.concat(arr2);

// arr3 is a new array [ "a", "b", "c", "d", "e", "f" ]
// arr1 ['a', 'b', 'c']
// arr2 ['d', 'e', 'f']
```

### 语法

> var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

**参数**

*valueN* 将数组和/或值连接成新数组。详情请参阅下文描述。

**返回值** 

新的 Array 实例。

### 描述

concat 方法创建一个新的数组，它由被调用的对象中的元素组成，每个参数的顺序依次是该参数的元素（如果参数是数组）或参数本身（如果参数不是数组）。它不会递归到嵌套数组参数中。

concat 方法不会改变this或任何作为参数提供的数组，而是返回一个浅拷贝，它包含与原始数组相结合的相同元素的副本。 原始数组的元素将复制到新数组中，如下所示：

 - 对象引用（而不是实际对象）：concat将对象引用复制到新数组中。原始数组和新数组都引用相同的对象。 也就是说，如果引用的对象被修改，则更改对于新数组和原始数组都是可见的。这包括也是数组的数组参数的元素。
 - 数据类型如字符串，数字和布尔（不是String，Number 和 Boolean 对象）：concat将字符串和数字的值复制到新数组中。

> 注意：数组/值在连接时保持不变。此外，对于新数组的任何操作（仅当元素不是对象引用时）都不会对原始数组产生影响，反之亦然。

### 示例

**连接两个数组**

以下代码将两个数组合并为一个新数组：

```javascript
var alpha = ['a', 'b', 'c'];
var numeric = [1, 2, 3];

alpha.concat(numeric);
// result in ['a', 'b', 'c', 1, 2, 3]
```

**连接三个数组**

以下代码将三个数组合并为一个新数组：


```javascript
var num1 = [1, 2, 3],
    num2 = [4, 5, 6],
    num3 = [7, 8, 9];

var nums = num1.concat(num2, num3);

console.log(nums); 
// results in [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

**将值连接到数组**

以下代码将三个值连接到数组：

```javascript
var alpha = ['a', 'b', 'c'];

var alphaNumeric = alpha.concat(1, [2, 3]);

console.log(alphaNumeric); 
// results in ['a', 'b', 'c', 1, 2, 3]
```

**合并嵌套数组**

以下代码合并数组并保留引用：

```javascript
var num1 = [[1]];
var num2 = [2, [3]];

var nums = num1.concat(num2);

console.log(nums);
// results in [[1], 2, [3]]

// modify the first element of num1
num1[0].push(4);

console.log(nums);
// results in [[1, 4], 2, [3]]


Array.prototype.slice()

Array.prototype.splice()
```

**将对象合并为数组**

```javascript
var newArray = Array.prototype.concat.call({ a: 1 }, { b: 2 })
console.log(newArray); // [{ a: 1 }, { b: 2 }]
console.log(newArray[0].a); // 1
```

## Array.prototype.slice()（创建子数组方法）

slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。原始数组不会被修改。

```javascript
var a = ['zero', 'one', 'two', 'three'];
var sliced = a.slice(1, 3);

console.log(a);      // ['zero', 'one', 'two', 'three']
console.log(sliced); // ['one', 'two']
```

### 语法

```javascript
arr.slice();
// [0, end]

arr.slice(begin);
// [begin, end]

arr.slice(begin, end);
// [begin, end)
```

**参数**

**begin** *可选*

 - 从该索引处开始提取原数组中的元素（从0开始）。
 - 如果该参数为负数，`则表示从原数组中的倒数第几个元素开始提取`，slice(-2)表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
 - 如果省略 begin，则 slice 从索引 0 开始。

**end** *可选*

 - 在该索引处结束提取原数组元素（从0开始）。slice会提取原数组中索引从 begin 到 end 的所有元素（包含begin，但不包含end）。
 - slice(1,4) 提取原数组中的第二个元素开始直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。
 - 如果该参数为负数， `则它表示在原数组中的倒数第几个元素结束抽取`。slice(-2,-1)表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
 - 如果 end 被省略，则slice 会一直提取到原数组末尾。
 - 如果 end 大于数组长度，slice 也会一直提取到原数组末尾。

**返回值**

一个含有提取元素的新数组

### 描述

slice 不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：

 - 如果该元素是个对象引用 （不是实际的对象），`slice` 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
 - 对于字符串、数字及布尔值来说（不是 `String`、`Number` 或者 `Boolean` 对象），`slice` 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。
如果向两个数组任一中添加了新元素，则另一个不会受到影响。


`slice()` 方法涉及到Number()转型函数的隐式类型转换，当start被转换为NaN时，相当于start = 0；当end被转换为NaN时(end为undefined除外)，则输出空数组

```javascript
var numbers = [1,2,3,4,5];

console.log(numbers.slice(NaN));//[1,2,3,4,5]

console.log(numbers.slice(0,NaN));//[]

console.log(numbers.slice(true,[3]));//[2,3]

console.log(numbers.slice(null,undefined));//[1,2,3,4,5]

console.log(numbers.slice({}));//[1,2,3,4,5]

console.log(numbers.slice('2',[5]));//[3,4,5]
```

### 示例

**返回现有数组的一部分**

```javascript
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']
```

**使用 slice**

在下例中, slice从myCar中创建了一个新数组newCar.两个数组都包含了一个myHonda对象的引用. 当myHonda的color属性改变为purple, 则两个数组中的对应元素都会随之改变.

```javascript
// 使用slice方法从myCar中创建一个newCar.
var myHonda = { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 } };
var myCar = [myHonda, 2, "cherry condition", "purchased 1997"];
var newCar = myCar.slice(0, 2);

// 输出myCar, newCar,以及各自的myHonda对象引用的color属性.
console.log('myCar = ' + JSON.stringify(myCar)); // myCar = [{color: 'red', wheels: 4, engine: {cylinders: 4, size: 2.2}}, 2, 'cherry condition', 'purchased 1997']
console.log('newCar = ' + JSON.stringify(newCar)); // newCar = [{color: 'red', wheels: 4, engine: {cylinders: 4, size: 2.2}}, 2]
console.log('myCar[0].color = ' + JSON.stringify(myCar[0].color)); // myCar[0].color = red 
console.log('newCar[0].color = ' + JSON.stringify(newCar[0].color)); // newCar[0].color = red

// 改变myHonda对象的color属性.
myHonda.color = 'purple';
console.log('The new color of my Honda is ' + myHonda.color); // The new color of my Honda is purple

//输出myCar, newCar中各自的myHonda对象引用的color属性.
console.log('myCar[0].color = ' + myCar[0].color); // myCar[0].color = purple
console.log('newCar[0].color = ' + newCar[0].color); // newCar[0].color = purple
```

### 类似数组（Array-like）对象

slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个数组。你只需将该方法绑定到这个对象上。下述代码中 list 函数中的 arguments 就是一个类数组对象。

```javascript
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
```

除了使用 `Array.prototype.slice.call(arguments)`，你也可以简单的使用 `[].slice.call(arguments)` 来代替。另外，你可以使用 bind 来简化该过程。

```javascript
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

function list() {
  return slice(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
```

## Array.prototype.splice()（数组删改方法）

splice() 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。

```javascript
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

myFish.splice(2, 0, 'drum'); // 在索引为2的位置插入'drum'
// myFish 变为 ["angel", "clown", "drum", "mandarin", "sturgeon"]

myFish.splice(2, 1); // 从索引为2的位置删除一项（也就是'drum'这一项）
// myFish 变为 ["angel", "clown", "mandarin", "sturgeon"]
```

### 语法

> array.splice(start)
array.splice(start, deleteCount) 
array.splice(start, deleteCount, item1, item2, ...)

**参数**

**start**
指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从1计数）；若只使用start参数而不使用deleteCount、item，如：array.splice(start) ，表示删除[start，end]的元素。

**deleteCount** *可选*

 - 整数，表示要移除的数组元素的个数。如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素。如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
 - 如果deleteCount被省略，则其相当于(arr.length - start)。

**item1, item2, ...** *可选*
要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。

**返回值**

由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

### 描述

如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。

注释：请注意，splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。

### 示例

**使用 splice()**

如下代码演示了 splice 的用法：

```javascript
var myFish = ["angel", "clown", "mandarin", "surgeon"];

//从第 2 位开始删除 0 个元素，插入 "drum"
var removed = myFish.splice(2, 0, "drum");
//运算后的 myFish:["angel", "clown", "drum", "mandarin", "surgeon"]
//被删除元素数组：[]，没有元素被删除

//从第 3 位开始删除 1 个元素
removed = myFish.splice(3, 1);
//运算后的myFish：["angel", "clown", "mandarin",]
//被删除元素数组：["surgeon"]

//从第 2 位开始删除 1 个元素，然后插入 "trumpet"
removed = myFish.splice(2, 1, "trumpet");
//运算后的myFish: ["angel", "clown", "trumpet", "surgeon"]
//被删除元素数组：["drum"]

//从第 0 位开始删除 2 个元素，然后插入 "parrot", "anemone" 和 "blue"
removed = myFish.splice(0, 2, "parrot", "anemone", "blue");
//运算后的myFish：["parrot", "anemone", "blue", "trumpet", "surgeon"]
//被删除元素的数组：["angel", "clown"]

//从第 3 位开始删除 2 个元素
removed = myFish.splice(3, Number.MAX_VALUE);
//运算后的myFish: ["parrot", "anemone", "blue"]
//被删除元素的数组：["trumpet", "surgeon"]

//从第1位开始删除其后所有即[1，end]的元素
removed = myFish.splice(1);
//运算后的myFish: ["parrot"]
//被删除元素的数组：["anemone","blue"]
```