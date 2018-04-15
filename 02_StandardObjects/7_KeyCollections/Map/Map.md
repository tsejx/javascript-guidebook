# Map

`Map` 对象保存键值对。任何值（对象或者原始值）都可以作为一个键或一个值。

## 语法

```javascript
new Map([iterable])
```

### 参数

| 参数       | 属性                               | 描述                                                         |
| ---------- | ---------------------------------- | ------------------------------------------------------------ |
| `iterable` | `Array` 类型或其他 `Iterable` 对象 | `Iterable` 可以是一个数组或者其他 `Iterable` 对象，其元素或为键值对，或为两个元素的数组。 每个键值对都会添加到新的 `Map`。`null` 会被当做 `undefined`。 |

### 描述

一个 `Map` 对象以插入顺序迭代其元素 — 一个  `for...of` 循环为每次迭代返回一个 `[key，value]` 数组。

### 键的相等

键的比较是基于 SameValueZero 算法：`NaN` 是与 `NaN` 相同的（虽然 `NaN !== NaN`），剩下所有其它的值是根据 `===` 运算符的结果判断是否相等。

### `Object` 和 `Map` 的比较

`Object` 和 `Map` 类似的一点是，它们都允许你按键存取一个值，都可以删除键，还可以检测一个键是否绑定了值。因此，一直以来，我们都把对象当成 `Map` 来使用，不过现在有了 `Map` 下面的区别解释了为什么使用 `Map` 更好点。

- 一个对象爱你个通常都有自己的原型，所以一个对象总有一个 `prototype` 键。不过，从 ES5 开始使用 `map = Object.create(null)` 来创建一个没有原型的对象爱。
- 一个对象爱你个的键只能是字符串或者 `Symbols` ，但一个 `Map` 的键可以是任意值。
- 你可以通过 `size` 属性很容易地得到一个 `Map` 的键值对个数，而对象的键值对个数只能手动确认。

但是这并不意味着你可以随意使用 `Map`，对象仍旧是最常用的。`Map` 实例只适合用于集合(collections)，你应当考虑修改你原来的代码——先前使用对象来处理集合的地方。对象应该用其字段和方法来作为记录的。
如果你不确定要使用哪个，请思考下面的问题：

- 在运行之前 key 是否是未知的，是否需要动态地查询 key 呢？
- 是否所有的值都是统一类型，这些值可以互换么？
- 是否需要不是字符串类型的 key ？
- 键值对经常增加或者删除么？
- 是否有任意个且非常容易改变的键值对?
- 这个集合可以遍历么（Is the collection iterated）？

假如以上全是“是”的话，那么你需要用 `Map 来保存这个集。` 相反，你有固定数目的键值对，独立操作它们，区分它们的用法，那么你需要的是对象。



## `Map` 实例

### 属性

| 属性                        | 描述                                                  |
| --------------------------- | ----------------------------------------------------- |
| `Map.prototype.constructor` | 返回一个函数，它创建了实例的原型。默认是 `Map` 函数。 |
| `Map.prototype.size`        | 返回 `Map` 对象的键/值对的数量。                      |

### 方法

| 方法                                            | 描述                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ |
| `Map.prototype.clear()`                         | 移除 `Map` 对象中的所有元素。                                |
| `Map.prototype.delete(key)`                     | 移除任何与键相关联的值，并且返回该值。                       |
| `Map.prototype.entries()`                       | 返回一个新的包含 `[key, value] ` 对的 `Iterable` 对象，返回迭代器的迭代顺序与 `Map` 对象的插入顺序相同。 |
| `Map.prototype.forEach(callbackFn [, thisArg])` | 按插入顺序，为 `Map` 对象里的每一键值对调用一次回调函数。如果为 `forEach` 提供了 `thisArg` ，它将在每次调用回调中作为 `this` 值。 |
| `Map.prototype.get(key)`                        | 用来获取一个 `Map` 对象中指定的元素。                        |
| `Map.prototype.has(key)`                        | 返回一个布尔值，用来表明 `Map` 中是否存在指定元素。          |
| `Map.prototype.keys()`                          | 返回一个新的 `Iterable` 对象。它包含按照顺序插入 `Map` 对象中每个元素的 `key` 值。 |
| `Map.prototype.set(key, value)`                 | 设置 `Map` 对象中键的值。返回该 `Map` 对象。                 |
| `Map.prototype.values()`                        | 返回一个新的 `Iterator` 对象，它按插入顺序包含了 `Map` 对象中每个元素的值。 |
| `Map.prototype[@@iterator]()`                   | 返回一个新的 `Iterator` 对象，它按插入顺序包含了 `Map` 对象中每个元素的 `[key, value]` 数组。 |



## 示例

### 使用映射对象

```javascript
var myMap = new Map();

var keyOj = {},
	keyFunc = funtion(){},
	keyString = 'a string';

// Add key
myMap.set(keyString, 'Lamborghibi');
myMap.set(keyObj, 'Lexus');
myMap.set(keyString, 'Maserati');

maMap.size;	// 3

// Get key
myMap.get(keyString);	// 'Lamborghini'
myMap.get(keyObj);		// 'Lexus'
myMap.get(keyFunc);		// 'Maserati'

myMap.get('a string');	// 'Lamborghini',because keyString === 'a string'
myMap.get({});		    // undefined,because keyObj != {}
myMap.get(function(){})	// undefined,because keyFunc !== function(){}
```

### 使用 `NaN` 作为映射的键

`NaN` 也可以作为 `Map` 对象的键，虽然 `NaN` 和任何值甚至和自己都不相等（`NaN !== NaN` 返回 `true`），但下面的例子表明，两个 `NaN` 作为 `Map` 的键来说是没有区别的。

```javascript
var myMap = new Map();
myMap.set(NaN, 'Not a number');

myMap.get(NaN);	// 'Not a number'

var otherNaN = Number('foo');
myMap.get(otherNaN);	// 'Not a number'
```

#### 使用 `for...of` 方法迭代映射

映射也可以使用 `for..of` 循环来实现迭代

```javascript
var myMap = new Map();
myMap.set(0, 'zero');
myMap.set(1, 'one');
for (var [key, value] of myMap) {
    console.log(key + '=' + value);
}
// 将会显示两个 log。一个是 "0 = zero"，另一个是 "1 = one"

for (var key of myMap.keys()) {
  console.log(key);
}
// 将会显示两个log。 一个是 "0" 另一个是 "1"

for (var value of myMap.values()) {
  console.log(value);
}
// 将会显示两个log。 一个是 "zero" 另一个是 "one"

for (var [key, value] of myMap.entries()) {
  console.log(key + " = " + value);
}
// 将会显示两个log。 一个是 "0 = zero" 另一个是 "1 = one"
```



























