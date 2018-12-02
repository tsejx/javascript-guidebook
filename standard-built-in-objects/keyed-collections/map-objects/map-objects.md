## Map

`Map` 对象保存键值对。任何值（对象或者原始值）都可以作为一个键或一个值。

### 语法

```js
new Map([iterable])
```

#### 参数

| 参数       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| `iterable` | `Iterable` 可以是一个数组或者其他 `Iterable` 对象，其元素或为键值对，或为两个元素的数组。 每个键值对都会添加到新的 `Map`。`null` 会被当做 `undefined`。 |

### 描述

#### 键的相等

键的比较是基于 **SameValueZero** 算法：`NaN` 是与 `NaN` 相同的（虽然 `NaN !== NaN`），剩下所有其它的值是根据 `===` 运算符的结果判断是否相等。

#### `Object` 和 `Map` 的比较

`Object` 和 `Map` 类似的一点是，它们都允许你按键存取一个值，都可以删除键，还可以检测一个键是否绑定了值。因此，一直以来，我们都把对象当成 `Map` 来使用，不过现在有了 `Map` 下面的区别解释了为什么使用 `Map` 更好点。

| Object                                                       | Map                                   |
| ------------------------------------------------------------ | ------------------------------------- |
| 一个对象实例通常有自己的原型，所以一个对象总有一个 `prototype` 键 | 通过 Map 可以创建一个没有原型的类对象 |
| 对象的键只能是字符串或者 Symbol                              | Map 的键可以是任意值                  |
| 对象的键值只能手动确认                                       | 通过 `size` 属性能获得 Map 的键值个数 |

但是这并不意味着你可以随意使用 `Map`，对象仍旧是最常用的。`Map` 实例只适合用于集合（collections），你应当考虑修改你原来的代码——先前使用对象来处理集合的地方。对象应该用其字段和方法来作为记录的。
如果你不确定要使用哪个，请思考下面的问题：

- 在运行之前 key 是否是未知的，是否需要动态地查询 key 呢？
- 是否所有的值都是统一类型，这些值可以互换么？
- 是否需要不是字符串类型的 key ？
- 键值对经常增加或者删除么？
- 是否有任意个且非常容易改变的键值对?
- 这个集合可以遍历么（Is the collection iterated）？

假如以上全是“是”的话，那么你需要用 Map 来保存这个集。相反，你有固定数目的键值对，独立操作它们，区分它们的用法，那么你需要的是对象。

### Map 实例

#### 属性

| 属性                        | 描述                                                  |
| --------------------------- | ----------------------------------------------------- |
| `Map.prototype.constructor` | 返回一个函数，它创建了实例的原型。默认是 `Map` 函数。 |
| `Map.prototype.size`        | 返回 `Map` 对象的键/值对的数量。                      |

#### 方法

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

### 示例

#### 基本用法

```js
var myMap = new Map();

var o = {},
	f = funtion(){},
	s = 'a string';

// Add key
myMap.set(o, 'Lamborghibi');
myMap.set(f, 'Lexus');
myMap.set(s, 'Maserati');

maMap.size;					// 3

// Get key
myMap.get(o);				// 'Lamborghini'
myMap.get(f);				// 'Lexus'
myMap.get(s);				// 'Maserati'

myMap.get('a string');		// 'Lamborghini',because keyString === 'a string'
myMap.get({});		    	// undefined,because keyObj != {}
myMap.get(function(){})		// undefined,because keyFunc !== function(){}
```

#### 内存地址绑定

`Map` 键与内存地址绑定。

⚠️ **注意**：只有对同一个对象的引用， `Map` 结构才将其视为同一个键。

```js
const map = new Map();

map.set(['a'], 555);

map.get(['a']);			// Output: undefined
```

上面的 `set` 方法和 `get` 方法表面上是针对同一个键，实际上却是两个值，内存地址不一样的，因此 `get` 方法无法读取该值，返回 `undefined`。

同样的值的两个实例在 `Map` 结构中被视为两个键。

```js
const map = new Map();

const a = ['foo'];
const b = ['foo'];

map
.set(a, 123)
.set(b, 456);

map.get(a);		// 123
map.get(b);		// 456
```

`Map` 的键实际上是和内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了**同名属性碰撞（Clash）**的问题，我们扩展别人的库时，如果使用对象作为键名，不用担心自己的属性与原作者的属性同名。

如果 `Map` 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，`Map` 就将其视为一个键，包括 `0` 和 `-0`。另外，虽然 `NaN` 不严格等于自身，但 `Map` 将其视为同一个键。

```js
const map = new Map();

map.set(-0, 123);
map.get(-0);			// 123

map.set(true, 1);
map.set('true', 2);
map.get(true);			// 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined);		// 3

map.set(NaN, 123);
map.get(NaN);			// 123
```

#### Set 和 Map 作键名

```js
// set作为参数
const s = new Set([
    ['foo', 1],
    ['bar', 2]
]);
const x = new Map(s);
x.get('foo');			// 1

// map作为参数
const y = new Map([['baz'], 3]);
const z = new Map(y);
z.get('baz');			// 3
```

如果对同一个键多次赋值，后面的值会将覆盖前面的值。

```js
const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');

map.get(1);		// 'bbb'
```

#### NaN 作键名

`NaN` 也可以作为 `Map` 对象的键，虽然 `NaN` 和任何值甚至和自己都不相等（`NaN !== NaN` 返回 `true`），但下面的例子表明，两个 `NaN` 作为 `Map` 的键来说是没有区别的。

```js
const myMap = new Map();
myMap.set(NaN, 'Not a number');

myMap.get(NaN);				// 'Not a number'

const otherNaN = Number('foo');
myMap.get(otherNaN);		// 'Not a number'
```

#### 迭代映射

映射也可以使用 `for..of` 循环来实现迭代。

```js
let myMap = new Map();
myMap.set(0, 'zero');
myMap.set(1, 'one');

for (var [key, value] of myMap) {
    console.log(key + '=' + value);
}
// Output: '0 = zero'
// Output: '1 = one'

for (var key of myMap.keys()) {
  console.log(key);
}
// Output: '0'
// Output: '1'

for (var value of myMap.values()) {
  console.log(value);
}
// Output: 'zero'
// Output: 'one'

for (var [key, value] of myMap.entries()) {
  console.log(key + " = " + value);
}
// Output: '0 = zero'
// Output: '1 = one'
```

#### 类型转换

##### 数组

**Map 转数组**

`Map` 转为数组最方便的方法就是使用扩展运算符 `...`。

```js
const myMap = new Map().set(true, 1).set({foo: 2}, ['abc'])

console.log([...myMap])		// Output: [ [true, 1], [ { foo: 2}, ['abc'] ] ]
```

**数组转为Map**

将数组传入 Map 构造函数就可以转为 Map。

```js
const m = new Map([
    [true, 7],
    [{foo: 3}, ['abc']]
])

console.log(m)
// Map {
//	true => 7,
//  Object {foo: 3} => ['abc']
// }
```

##### 对象

**Map转为对象**

如果 Map 的所有键都是字符串，则可以转为对象。

```js
function toObject (strMap) {
    let o = Object.create(null);
    for (let [k, v] of strMap){
        o[k] = v;
    }
    return o;
}

const m = new Map().set('yes', true).set('no', false)

console.log(toObject(m))		// Output: {'yes': true, 'no': false}
```

**对象转为Map**

```js
function toMap(obj){
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k])
    }
    return strMap;
}

const m = toMap({yes: true, no: false})

console.log(m);		// Output: Map {"yes" => true, "no" => false}
```

##### JSON

**Map转为JSON**

Map 转为 JSON 要区分两种情况。一种情况是， Map 的键名都是字符串，这时可以选择转为对象 JSON。

```js
const toJSON = (strMap) => JSON.stringify(toObject(strMap));

let m = new Map().set('yes', true).set('no', false);

console.log(toJSON(m))	// Output: '{"yes": true, "no": false}'
```

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```js
const toArrayJSON = (map) => JSON.stringify([...map])

let m = new Map().set(true, 1).set({foo: 2}, ['abc']);

console.log(toArrayJSON(m))		// Output: '[[true], 1], [{'foo': 2}, ['abc']]'
```

**JSON转为Map**

```js
const toMap = jsonStr => toMap(JSON.parse(jsonStr));

console.log(toMap('{"yes": true, "no": false}'))	// Output: Map {'yes' => true, 'no': false}
```

但是，有一种特殊情况：整个 JSON 就是一个数组，且每个数组成员本身又是一个具有两个成员的数组。这时，它可以一一对应地转为 Map 。这往往是数组转为 JSON 的逆操作。

```js
const toMap = (jsonStr) => new Map(JSON.parse(jsonStr));

console.log(toMap('[[true, 7], [{"foo": 3}, ["abc"]]]'))
// Output: Map(true => 7, Object {foo: 3} => ['abc'])
```
