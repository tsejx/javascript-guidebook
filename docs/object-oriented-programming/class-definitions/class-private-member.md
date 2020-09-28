---
nav:
  title: OOP
  order: 4
group:
  title: 类
  order: 5
title: 私有成员
order: 3
---

# 私有成员

私有方法和私有属性，指只能在类的内部访问而外部不能访问的方法和属性。

这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

## 私有方法

暂时的解决方案（并未真正解决，外部仍可访问）：

- 命名区别
- 私有方法移出模块
- 命名为 Symbol 值

### 命名区别

```js
class Utils {
  // 公有方法
  foo(baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return (this.snaf = baz);
  }

  // ...
}
```

上面代码中，`_bar` 方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

### Symbol 值命名

利用 `Symbol` 值的唯一性，将私有方法的名字命名为一个 `Symbol` 值。

```js
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass {
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](parm) {
    return (this[snaf] = baz);
  }
}
```

上面代码中，`bar` 和 `snaf` 都是 `Symbol` 值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，使用 `Reflect.ownKeys()`依然可以拿到它们。

```js
const instance = new Foo();

Reflect.ownKeys(Foo.prototype);
// ['constructor', 'foo', Symbol(bar)]
```

### 引用外部方法

将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

```js
class Utils {
  foo(baz) {
    bar.call(this, baz);
  }
}

function bar(baz) {
  return (this.snaf = baz);
}
```

## 私有属性

详细介绍参考 [私有属性的提案](https://github.com/tc39/proposal-private-methods)

私有属性是实例中的属性，不会出现在原型上，且只能在类的构造函数或方法中创建。建议在构造函数中创建所有私有属性，从而只通过一处就可以控制所有的私有属性。

```js
class Student {
  constructor() {
    this.state = {
      visible: true,
    };
  }
}
```

目前，有一项提案，为 `class` 加了私有属性。方法是属性名之前，使用 `#` 表示。

```js
class Point {
  #x;
  constructor (x = 0) {
    #x = !x
  }

  get x () { return #x }
  set x (value) {
    #x = !value
  }
}
```

这种写法不仅可以写私有属性，还可以用来写私有方法。
