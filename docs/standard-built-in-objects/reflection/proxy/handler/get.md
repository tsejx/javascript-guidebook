---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.get
order: 2
---

# Proxy - handler.get

`handler.get()` 方法用于拦截对象属性的读取操作。

## 语法

```js
const proxy = new Proxy(target, {
  get: function (target, property, receiver) {
    // do something
  },
});
```

| 参数       | 说明                        | 类型   |
| :--------- | :-------------------------- | :----- |
| `target`   | 目标对象                    | object |
| `property` | 被获取的属性名              | string |
| `receiver` | Proxy 或者继承 Proxy 的对象 | object |

## 说明

### 拦截

该方法会拦截目标对象的以下操作：

- 访问属性：`proxy[foo]` 和 `proxy.bar`
- 访问原型链上的属性：`Object.create(proxy)[foo]`
- `Reflect.get()`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError：

- 如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同
- 如果要访问的目标属性没有配置访问方法，即 `get` 方法是 `undefined` 的，则返回值必须为 `undefined`

## 示例

以下代码演示如何拦截属性值的读取操作：

```js
const proxy = new Proxy(
  {},
  {
    get: function (target, prop, receiver) {
      console.log('Called:' + prop);
      return 10;
    },
  }
);

console.log(proxy.foo);
// foo
```

以下是违反约束的情况：

```js
const foo = {};

Object.defineProperty(foo, 'a', {
  configurable: false,
  enumerable: false,
  value: 10,
  writable: false,
});

const proxy = new Proxy(foo, {
  get: function (target, prop) {
    return 'b';
  },
});

console.log(proxy.a);
// Uncaugt TypeError: 'get' on proxy: property 'a' is a read-only and non-configurable data
// property on the proxy target but the proxy did not return its actual value
```

### 数组读取负数的索引

```js
const createArr = function (...elements) {
  const handler = {
    get(target, propKey, receiver) {
      const index = Number(propKey);

      if (index < 0) {
        propKey = String(target.length + index);
      }

      return Reflect.get(target, propKey, receiver);
    },
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
};

const arr = createArr('a', 'b', 'c');

console.log(arr[-1]);
// c
```

### 链式操作

```js
const pipe = function (value) {
  const stack = [];

  const proxy = new Proxy(
    {},
    {
      get: function (pipeObject, fnName) {
        if (fnName === 'get') {
          return stack.reduce(function (val, fn) {
            return fn(val);
          }, value);
        }
        stack.push(window[fnName]);
        return proxy;
      },
    }
  );

  return proxy;
};

const double = (x) => x * 2;
const pow = (x) => x * x;
const reverseInt = (x) => x.toString().split('').reverse().join('') | 0;

pipe(3).double.pow.reverseInt.get;
// 63
```

### 生成 DOM 节点

```js
const dom = new Proxy(
  {},
  {
    get(target, property) {
      return function (attrs = {}, ...children) {
        const ele = document.createElement(property);

        for (let prop of Object.keys(attrs)) {
          ele.setAttribute(prop, attrs[prop]);
        }

        for (let child of children) {
          if (typeof child === 'string') {
            child = document.createTextNode(child);
          }
          ele.appendChild(child);
        }

        return ele;
      };
    },
  }
);

const el = dom.div(
  {},
  'Hello, my name is ',
  dom.a({ href: '//example.com' }, 'Mark'),
  '. I like:',
  dom.ul({}, dom.li({}, 'The web'), dom.li({}, 'Food'), dom.li({}, "…actually that's it"))
);

document.body.appendChild(el);
```
