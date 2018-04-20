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

