---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.from
order: 3
---

# Array.from()

⭐️ `ES2015(ES6)新特性`

`Array.from()` 方法用于将一个类数组对象或可迭代对象转换成一个新的数组实例。

## 语法

语法：

```js
Array.from(arrayLike [, mapfn [, thisArg]])
```

类型声明：

```ts
interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}

interface ArrayConstructor {
  from<T>(arrayLike: ArrayLike<T>): T[];

  from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
}
```

参数说明：

| 参数      | 说明                                                           | 类型        |
| :-------- | :------------------------------------------------------------- | :---------- |
| arrayLike | 想要转换成数组的伪数组对象或可迭代对象                         | typed array |
| mapfn     | （可选）如果指定了该参数，新数组中的每个元素会执行该回调函数。 | function    |
| thisArg   | （可选）执行回调函数 `mapFn` 时 `this` 对象                    | object      |

返回值：

返回一个新的数组实例。

## 方法说明

- 具备以下两种条件的的对象可以通过 `Array.from()` 方法转换成真正的数组：
  - 类数组对象：即拥有 `length` 属性和若干索引属性的任意对象
  - 可迭代对象：即部署了 Iterator 接口的对象，可以获取对象中的元素，如 `Map` 和 `Set` 等
- `Array.from()` 方法有一个可选参数 `mapfn`，让你可以在最后生成的数组上再执行一次 `Array.prototype.map` 方法后再返回。也就是说 `Array.from(arrayLike, mapfn, thisArg)` 就相当于 `Array.from(arrayLike).map(mapfn, thisArg)` ，除非创建的不是可用的中间数组。 这对一些数组的子类，如对[类型化数组](../../typed-array-objects/typed-array-objects)来说很重要，因为中间数组的值在调用 `map()` 时需要是适当的类型。
- `from()` 的 `length` 属性为 1 ，即 `Array.from.length === 1`。
- 在 ES2015 中， `Class` 语法允许我们为内置类型（比如 `Array`）和自定义类新建子类（比如叫 `SubArray`）。这些子类也会继承父类的静态方法，比如 `SubArray.from()`，调用该方法后会返回子类 `SubArray` 的一个实例，而不是 `Array` 的实例。

## 代码示例

### 基本用法

```js
const bar = ['a', 'b', 'c'];

Array.from(bar); // ["a", "b", "c"]

Array.from('foo'); // ["f", "o", "o"]
```

### 转换字符串

```js
Array.from('foo'); // ["f", "o", "o"]
```

### Array from a `Set`

```js
let s = new Set(['foo', window]);

Array.from(s); // ["foo", window]
```

### Array from a `Map`

```js
let m = new Map([
  [1, 2],
  [2, 4],
  [4, 8],
]);

Array.from(m); // [[1, 2], [2, 4], [4, 8]]
```

### 转换类数组

```js
function f() {
  return Array.from(arguments);
}

f(1, 2, 3); // [1, 2, 3]
```

### 使用箭头函数

```js
// Using an arrow function as the map function to
// manipulate the elements
Array.from([1, 2, 3], (x) => x + x); // [2, 4, 6]

// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`
Array.from({ length: 5 }, (v, i) => i); // [0, 1, 2, 3, 4]
```

### 数组去重合并

```js
function combine() {
  let arr = [].concat.apply([], arguments); // 没有去重复的新数组
  return Array.from(new Set(arr));
}

const m = [1, 2, 2],
  n = [2, 3, 3];

console.log(combine(m, n)); // [1, 2, 3]
```

## 参考资料

- [MDN: Array.from](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)
- [Array.from 的妙用](https://segmentfault.com/a/1190000004450221)
- [Array.from 的性能测试](https://jsperf.com/constarray/4)
