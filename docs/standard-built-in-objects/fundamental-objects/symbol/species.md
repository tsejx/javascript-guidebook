---
nav:
  title: 内置对象
  order: 2
group:
  title: Symbol
  order: 6
title: Symbol.species
order: 8
---

# Symbol.species

对象的 `Symbol.species` 属性，指向一个构造函数，创建衍生对象时，会使用该属性。

```js
class MyArray extends Array {}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray; // true
c instanceof MyArray; // true
```

为 `MyArray` 设置 `Symbol.species` 属性

```js
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
```

上述代码中，由于定义了 `Symbol.species` 属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子说明，定义 `Symbol.species` 属性要采用 `get` 取值器。默认的 `Symbol.species` 属性等同于下面的写法。

```js
static get [Symbol.species]() {
    return this
}
```

```js
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray; // false
b instanceof Array; // true
```

上述代码中，`a.map(x => x)` 生成的衍生对象，就不是 `MyArray` 的实例，而直接就是 `Array` 的实例。
