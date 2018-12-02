## Map 实例的属性和方法

### 属性

#### `size` 属性

`size` 属性返回 `Map` 结构的成员总数。

```javascript
const map = new Map();

map.set('foo', true);
map.set('bear', false);

map.size;	// Output: 2
```

### 方法

#### `Map.prototype.set(key, value)`

`set` 方法设置 `key` 对应的键值，然后返回整个 `Map` 结构。如果 `Map` 结构。如果 `key` 已经有值，则键值会被更新，否则就新生成该键。

`set` 方法返回的是当前的 Map 对象，因此可以采用链式写法

```javascript
const m = new Map();

m.set('edition', 6);		// 键是字符串
m.set(262, 'standard');		// 键是数值
m.set(undefined, 'nah');	// 键是 undefined

let map = new Map()
			.set(1, 'a')
			.set(2, 'b')
			.set(3, 'c');
```

#### `Map.prototype.get(key)`

`get` 方法读取 `key` 对应的键值，如果找不到 `key`，则返回 `undefined`。

```javascript
const m = new Map();

const hello = function (){console.log('hello');};

m.set(hello, 'Hello ES6!')	// 键是函数

m.get(hello)				// Hello ES6!
```

#### `Map.prototype.has(key)`

`has` 方法返回一个布尔值，表示某个键是否在 `Map` 数据结构中。

```javascript
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')		// Output: true
m.has('years')			// Output: false
m.has(262)				// Output: true
m.has(undefined)		// Output: true
```

#### `Map.prototype.delete(key)`

`delete` 方法删除某个键，返回 `true` 。如果删除失败，则返回 `false`。

```javascript
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)			// Output: true

m.delete(undefined)
m.has(undefined)			// Output: false
```

#### `Map.prototype.clear()`

`clear` 方法清除所有成员，没有返回值。

```javascript
const map = new Map();

map.set('foo', true);
map.set('bar', false);
map.size 	// Output: 2

map.clear();
map.size	// Output: 0
```

