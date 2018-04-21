## Array.prototype.slice()

`slice()` 方法返回一个从开始到结束（不包括结束）选择的数组的一部分**浅拷贝**到一个新数组对象。原始数组不会被修改。

## 语法

```javascript
arr.slice( startIndex [, endIndex ] );
```

### 参数

| 参数         | 类型                | 描述                               |
| ------------ | ------------------- | ---------------------------------- |
| `startIndex` | `Number` 类型       | 一个指向数组指定部分的开头的索引。 |
| `endIndex`   | `Number` 类型，可选 | 一个指向数组指定部分的结尾的索引。 |

### 返回值

一个含有提取元素的新数组

### 描述

`slice` 不修改原数组，只会返回一个浅拷贝的原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：

- 如果该元素是个对象引用 （不是实际的对象），`slice` 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
- 对于字符串、数字及布尔值来说（不是 `String`、`Number` 或者 `Boolean` 对象），`slice` 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。
  如果向两个数组任一中添加了新元素，则另一个不会受到影响。

`slice()` 方法涉及到 `Number()` 转型函数的隐式类型转换，当 `startIndex` 被转换为 `NaN` 时，相当于 `startIndex` 为 0；当 `endIndex` 被转换为 `NaN` 时（`endIndex` 为 `undefined` 除外），则输出空数组。

## 示例

### 标准示例

```javascript
var numbers = [1,2,3,4,5];

numbers.slice(NaN);				// [1,2,3,4,5]

numbers.slice(0,NaN);			// []

numbers.slice(true,[3]);		// [2,3]

numbers.slice(null,undefined);	 // [1,2,3,4,5]

numbers.slice({});				// [1,2,3,4,5]

numbers.slice('2',[5]);			// [3,4,5]
```

### 返回现有数组的一部分

```javascript
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']
```

### 使用 slice

在下例中，`slice` 从 `myCar` 中创建了一个新数组 `newCar` 。两个数组都包含了一个 `myHonda` 对象的引用。当 `myHonda` 的 `color` 属性改变为 `purple` ，则两个数组中的对应元素都会随之改变.

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

`slice` 方法可以用来将一个类数组（Array-like）对象/集合转换成一个数组。你只需将该方法绑定到这个对象上。下述代码中 list 函数中的 arguments 就是一个类数组对象。

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

