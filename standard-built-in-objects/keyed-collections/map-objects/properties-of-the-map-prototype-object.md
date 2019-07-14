# Map 实例的属性和方法

## 属性

### size

`size` 属性返回 `Map` 结构的成员总数。

```js
const map = new Map();

map.set('foo', true);
map.set('bear', false);

map.size;
// 2
```

## 方法

### Map.prototype.set(key, value)

`set` 方法设置 `key` 对应的键值，然后返回整个 `Map` 结构。如果 `Map` 结构。如果 `key` 已经有值，则键值会被更新，否则就新生成该键。

`set` 方法返回的是当前的 Map 对象，因此可以采用链式写法。

```js
const map = new Map();

// 键是字符串
map.set('edition', 6);
// 键是数值
map.set(262, 'standard');
// 键是 undefined
map.set(undefined, 'nah');

const m = new Map().set(1, 'a').set(2, 'b').set(3, 'c');
```

### Map.prototype.get(key)

`get` 方法读取 `key` 对应的键值，如果找不到 `key`，则返回 `undefined`。

```js
const m = new Map();

const hello = function (){console.log('hello');};

m.set(hello, 'Hello ES6!');
// 键是函数

m.get(hello);
// Hello ES6!
```

### Map.prototype.has(key)

`has` 方法返回一个布尔值，表示某个键是否在 Map 数据结构中。

```js
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition');
// true
m.has('years');
// false
m.has(262);
// true
m.has(undefined);
// true
```

### Map.prototype.delete(key)

`delete` 方法删除某个键，返回 `true` 。如果删除失败，则返回 `false`。

```js
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)
// true

m.delete(undefined)
m.has(undefined);
// false
```

### Map.prototype.clear()
`clear` 方法清除所有成员，没有返回值。

```js
const map = new Map();

map.set('foo', true);
map.set('bar', false);
map.size;
// 2

map.clear();
map.size;
// 0
```
