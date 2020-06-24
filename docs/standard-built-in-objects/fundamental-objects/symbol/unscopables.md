---
nav:
  title: 内置对象
  order: 2
group:
  title: Symbol
  order: 6
title: Symbol.unscopables
order: 12
---

# Symbol.unscopables

对象的`Symbol.unscopables`属性，指向一个对象。该对象指定了使用`with`关键字时，哪些属性会被`with`环境排除。

```js
Array.prototype[Symbol.unscopables];
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables]);
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']
```

上面代码说明，数组有 7 个属性，会被`with`命令排除。

```js
// 没有 unscopables 时
class MyClass {
  foo() {
    return 1;
  }
}

var foo = function() {
  return 2;
};

with (MyClass.prototype) {
  foo(); // 1
}

// 有 unscopables 时
class MyClass {
  foo() {
    return 1;
  }
  get [Symbol.unscopables]() {
    return { foo: true };
  }
}

var foo = function() {
  return 2;
};

with (MyClass.prototype) {
  foo(); // 2
}
```

上面代码通过指定`Symbol.unscopables`属性，使得`with`语法块不会在当前作用域寻找`foo`属性，即`foo`将指向外层作用域的变量。
