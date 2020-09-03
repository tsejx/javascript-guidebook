---
nav:
  title: OOP
  order: 4
group:
  title: 理解对象
  order: 2
title: 对象状态
order: 4
---

# 对象状态

JavaScript 对象具有扩展、密封以及冻结三大特征。

这些特征有相对应的方法：

* [扩展特性](#扩展特性)
* [密封特性](#密封特性)
* [冻结特性](#冻结特性)

## 扩展特性

默认情况下，对象是可扩展的，可扩展的对象能够添加新的属性，对象的原型对象也可以被更改。

```js
const foo = {};

foo.a = 1;

foo.__proto__ = null;

console.log(foo);
// { a: 1 }
```

使用 [Object.isExtensible](../../standard-built-in-objects/fundamental-objects/object-objects/properties-of-the-object-constructor/isExtensible) 可以检测指定对象是否可扩展。

```js
const foo = {};

console.log(Object.isExtensible(foo));
// true
```

使用 [Object.preventExtensions](../../standard-built-in-objects/fundamental-objects/object-objects/properties-of-the-object-constructor/preventExtensions) 方法可以标记一个对象为不可扩展（Non-Extensible）。

不可扩展的对象具有以下特征：

* 不能添加新的属性
* 不能变更原型对象

对象属性仍能删除，仍可为该对象原型添加属性。

```js
const foo = { a: 1 };

Object.preventExtensions(foo);

// 添加或删除属性均为静默失败不抛出错误
// 严格模式下会抛出错误
foo.b = 1;
delete foo.a;

console.log(foo);
// {}
```

使用 [Object.defineProperty](../../standard-built-in-objects/fundamental-objects/object-objects/properties-of-the-object-constructor/defineProperty) 为不可扩展对象添加属性会抛出异常。

```js
const foo = { a: 1};

Object.preventExtensions(foo);

Object.defineProperty(foo, 'a', {
    value: 2
})

console.log(foo.a);
// 2

Object.defineProperty(foo, 'b', {
    value: 1
})
// Uncaught TypeError: Cannot define property a, object is not extensible
```

## 密封特性

密封对象具有以下特性：

* 密封对象不可扩展
  * 不能添加新的属性
  * 不能设置原型对象
* 所有已有属性变为不可配置 `configurable: false`
  * 意味着已有属性不可删除
  * 数据属性不能被重新定义
* 所有已有属性仍可以被修改 `writable: true`

密封对象无法添加新属性，也无法删除已有属性。

```js
const foo = Object.seal({ a: 1 });

// 无法删除属性
delete foo.a;
// 也无法添加新属性
foo.b = 1;

console.log(foo.a);
// 1
console.log(foo.b);
// undefined
```

尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，结果会静默失败或抛出 TypeError。

```js
// 无法将数据属性重新定义为访问器属性
Object.defineProperty(foo, 'c', {
	get: function(){ return 'c' }
});
// Uncaught TypeError: Cannot define property b, object is not extensible

Object.defineProperty(foo, 'd', {
	value: 1
})
// Uncaught TypeError: Cannot define property c, object is not extensible
```

对象密封前已有属性在密封后仍可以被修改。

```js
Object.defineProperty(foo, 'a', {
  value: 2
});
console.log(foo.a);
// 2
```

使用方法 [Object.seal](../../standard-built-in-objects/fundamental-objects/object-objects/properties-of-the-object-constructor/seal) 可将对象变为**密封状态**。

* 如果把一个空对象变得不可扩展，则它同时也会变成个密封对象
* 如果该对象不是空对象，则它不会变成密封对象，因为密封对象的所有自身属性必须是不可配置的
* 如果把对象所有自身属性变为不可配置，则这个对象是密封对象

```js
const foo = Object.seal({});

console.log(Object.isSealed(foo));
// true
```

使用 [Object.isSealed](../../standard-built-in-objects/fundamental-objects/object-objects/properties-of-the-object-constructor/isSealed) 可以检测指定对象是否已密封。

```js
const foo = {};
const bar = Object.seal({});

console.log(Object.isSealed(foo));
// false
console.log(Object.isSealed(bar));
// true
```

## 冻结特性

冻结对象具有以下特征：

* 冻结对象不可扩展
  * 不能添加新的属性
  * 不能设置原型对象
* 所有已有属性变为不可配置 `configurable: false`
  * 意味着已有属性不可删除
  * 数据属性不能被重新定义
  * 访问器属性也不能被重新定义，但由于是函数调用，给人的错觉是还是可以修改这个属性
* 不能修改已有属性值 `writable: false`

这也意味着，冻结对象永远不可变。

冻结对象不能添加新的属性。

```js
const foo = Object.freeze({ a: 1 })

foo.b = 1

console.log(foo.b);
// undefined

Object.defineProperty(foo, 'c', {
    value: 1
});
// Uncaught TypeError: Cannot define property c, object is not extensible
```

冻结对象不能设置原型对象。下面两个语句都会抛出 TypeError 错误。

```js
const foo = Object.freeze({ a: 1 });

Object.setPrototypeOf(foo, { x: 20 });
// Uncaught TypeError: #<Object> is not extensible

foo.__proto__ = { x: 20 };
// Uncaught TypeError: #<Object> is not extensible
```

如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象。

```js
const foo = { bar: {} };

Object.freeze(foo);

foo.bar.a = 1;

console.log(foo.bar.a);
// 1
```

数组作为一种对象，被冻结，其元素不能被修改。没有数组元素可以被添加或移除。

```js
const foo = [0];

Object.freeze(foo);

a[0] = 1;
a.push(2);

console.log(a);
// [0]
```

使用 [Object.isFrozen](../../standard-built-in-objects/fundamental-objects/object-objects/properties-of-the-object-constructor/isFrozen) 可以检测指定对象是否已冻结。

```js
const foo = Object.freeze({})

console.log(Object.isFrozen(foo));
// true
```

倘若一个对象的属性是一个对象，那么对这个外部对象进行冻结，内部对象的属性是依旧可以改变的，这就叫浅冻结，若把外部对象冻结的同时把其所有内部对象甚至是内部的内部无限延伸的对象属性也冻结了，这就叫深冻结。

```js
// 深冻结函数.
function deepFreeze(o) {

  // 取回定义在obj上的属性名
  const propNames = Object.getOwnPropertyNames(o);

  // 在冻结自身之前冻结属性
  propNames.forEach(function(name) {
    const prop = o[name];

    // 如果 prop 是个对象，冻结它
    if (typeof prop == 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });

  // 冻结自身(no-op if already frozen)
  return Object.freeze(o);
}

const foo = { bar: {} };

deepFreeze(foo);

foo.bar.a = 1;

console.log(foo.bar.a);
// undefined
```

## 总结

|          | 添加新属性 | 删除已有属性 | 配置数据属性 | 已有属性可写 |
| :------- | :--------: | :----------: | :----------: | :----------: |
| 扩展特性 |     ❎      |      ✅       |      ✅       |      ✅       |
| 密封特性 |     ❎      |      ❎       |      ❎       |      ✅       |
| 冻结特性 |     ❎      |      ❎       |      ❎       |      ❎       |

---

**参考资料：**

- [📝 浅谈 JavaScript 对象之扩展、密封及冻结三大特征](<https://segmentfault.com/a/1190000003894119>)