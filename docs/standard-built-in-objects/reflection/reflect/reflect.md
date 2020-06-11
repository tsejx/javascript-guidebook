---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Reflect
order: 20
---

# Reflect

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与处理器对象的方法相同。Reflect 不是一个函数对象，因此它不是不可构造的。

设计目的：

1. 将 Object 对象的一些明显属于语言内部的方法（比如 `Object.defineProperty`），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。

2. 修改某些 Object 方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)` 在无法定义属性时，会抛出一个错误，而 `Reflect.defineProperty(obj, name, desc)` 则会返回 `false`。

3. 让 Object 的 **命令式操作** 都变成 **函数行为**。比如 `name in obj` 和 `delete obj[name]`，而 `Relfect.has(obj, name)` 和 `Reflect.deleteProperty(obj, name)` 让它们变成了函数行为

4. Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

```js
Proxy(target, {
  set: function(target, name, value, receiver) {
    const success = Reflect.set(target, name, value, receiver);

    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }

    return successs;
  },
});
```

上面代码中，Proxy 方法拦截 `target` 对象的属性赋值行为。它采用 `Reflect.set` 方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

```js
const proxy = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  },
});
```

上面代码中，每一个 Proxy 对象的拦截操作（`get`、`delete`、`has`），内部都调用对应的 Reflect 方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。

有了 Reflect 对象以后，很多操作会更易读。

```js
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]);
// 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]);
// 1
```

与大多数全局对象不同，Reflect 没有构造函数，你不能将其与一个 `new` 运算符一起使用，或者 Reflect 对象作为一个函数来调用。Reflect 的所有属性和方法都是静态的（就像 Math 对象）。

## 静态方法

| 静态方法                           | 说明                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `Reflect.apply`                    | 对函数进行调用操作，同时传入一个数组作为调用参数，与 `Function.prototype.apply` 功能类似 |
| `Reflect.construct`                | 对构造函数进行 `new` 操作，相当于执行 `new target(...args)`                              |
| `Reflect.defineProperty`           | 和 `Object.defineProperty` 类似                                                          |
| `Reflect.deleteProperty`           | 作为函数的 `delete` 操作符，相当于执行 `delete target[name]`                             |
| `Reflect.get`                      | 获取对象属性值                                                                           |
| `Reflect.getOwnPropertyDescriptor` | 类似于 `Object.getOwnPropertyDescriptor`                                                 |
| `Reflect.getPrototypeOf`           | 类似于 `Object.getPrototypeOf`                                                           |
| `Reflect.has`                      | 判断对象是否存在某个属性，和 `in` 运算符的功能完全相同                                   |
| `Reflect.isExtensible`             | 类似于 `Object.isExtensible`                                                             |
| `Reflect.ownKeys`                  | 返回一个包含所有自身属性（不包含继承属性）的数组                                         |
| `Reflect.preventExtensions`        | 类似于 `Object.preventExtensions`                                                        |
| `Reflect.set`                      | 将值分配给属性的函数，返回 Boolean，如果成功，则返回 `true`                              |
| `Reflect.setPrototypeOf`           | 类似于 `Object.setPrototyeOf`                                                            |

## 与传统方法的对比优势

Reflect 操作对象更加符合面向对象，操作对象的方法全部都挂在 Reflect。

|          | Reflect 操作对象                                            | 老方法操作对象                                        |
| -------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| 面向对象 | 全部挂在 `Reflect` 对象上，更加符合面向对象                 | 各种指令方法，`=`、`in`、`delete`                     |
| 函数式   | 所有方法都是函数                                            | 命令式、赋值、函数混用                                |
| 规范报错 | `defineProperty` 无效返回 `false`，后面几个方法参数非法报错 | `defineProperty` 无效报错，后面几个方法参数非法不报错 |
| 方法扩展 | 参数 `receiver` 指定 `this` 指向                            | 不能                                                  |

## 示例

### 观察者模式

观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。

```js
const person = observerable({
  name: 'Zhange San',
  age: 47,
});

function print() {
  console.log(`${person.name}, ${person.age}`);
}

observe(print);

person.name = 'Li Si';
// Li Si, 47
```

上面代码中，数据对象 `person` 是观察目标，函数 `print` 是观察者。一旦数据对象发生变化，`print` 就会自动执行。

下面，使用 Proxy 写一个观察者模式的最简单实现，即实现 `observeable` 和 `observe` 这两个函数。思路是 `observable` 函数返回一个原始对象的 Proxy 对象，拦截赋值操作，触发充当观察者的各个函数。

```js
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);

const observable = obj => new Proxy(obj, { set });

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);

  queuedObservers.forEach(observer => observer());

  return result;
}
```

### 获取设置反射属性

```js
const Ironman = {
  firstName: 'Tony',
  lastName: 'Stark',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

// 获取自身属性，新老方法都可以实现
Reflect.get(Ironman, 'firstName');
// Tony
Reflect.get(Ironman, 'lastName');
// Tony
Reflect.get(Ironman, 'fullName');
// Tony Stark

const Spiderman = {
  firstName: 'Peter',
  lastName: 'Parker',
};

// 获取反射属性，只有 Reflect 可以实现
Reflect.get(Ironman, 'fullName', Spiderman);
// Peter Parker
```
