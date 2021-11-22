---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy
order: 1
---

# Proxy

Proxy 对象用于修改某些操作的默认行为（如属性查找、赋值、枚举、函数调用等），等同于在语言层面做出修改，所以属于一种 **元编程**（Meta Programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层 **拦截**，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

Proxy 这个词的原意是 **代理**，用在这里表示由它来 **代理** 某些操作，可以译为 **代理器**。

- `target`：被 Proxy 处理虚拟化的对象，它常被作为代理的存储后端，根据目标验证关于对象不可扩展性或不可配置属性的不变量（保持不变的语义）
- `handler`：包含捕捉器（Trap）的占位符对象，可译为处理器对象
- `traps`：提供属性访问的方法，这类似于操作系统中捕获器的概念

**使用方式：**

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```js
const proxy = new Proxy(target, handler);
```

Proxy 对象的所有用法，都是上面这种形式，不同的只是 `handler` 参数的写法。其中，`new Proxy()` 表示生成一个 Proxy 实例，`target` 参数表示所要拦截的目标对象，`handler` 参数也是一个对象，用于定制拦截行为。

## 基本使用

```js
const proxy = new Proxy(
  {},
  {
    get: function (target, property, receiver) {
      console.log(`Getting ${property}!`);

      return Reflect.get(target, property, receiver);
    },
    set: function (target, proxyKey, value, receiver) {
      console.log(`Getting ${property}!`);

      return Reflect.set(target, property, value, receiver);
    },
  }
);
```

上面代码对一个空对象架设了一层拦截，重定义了属性的 **读取**（`get`）和 **设置**（`set`）行为。这里暂时先不解释具体的语法，只看运行结果。对设置了拦截行为的对象 `proxy`，去读写它的属性，就会得到下面的结果。

```js
proxy.count = 1;
// Setting count!

++proxy.count;
// Getting count!
// Setting count!
// 2
```

上面代码说明，Proxy 实际上 **重载**（Overload）了点运算符，即用自己的定义覆盖了语言的原始定义。

## 代理的引用上下文问题

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是 Proxy 代理的情况下，目标对象内部的 `this` 关键字会指向 Proxy 代理。

```js
const target = {
  foo: function () {
    console.log(this === proxy);
  },
};

const handler = {};

const proxy = new Proxy(target, handler);

console.log(target.foo());
// false
console.log(proxy.foo());
// true
```

上面代码中，一旦 `proxy` 代理 `target.foo`，后者内部的 `this` 就是指向 `proxy`，而不是 `target`。

## 嵌套支持

Proxy 也是 **不支持嵌套** 的，这点和 `Object.defineProperty()` 是一样的。因此与需要通过逐层遍历来解决。Proxy 的写法是在 `get` 里面递归调用 Proxy 并返回。

```js
// 需要代理的数据
const data = {
  info: {
    name: 'Eason',
    blogs: ['Webpack', 'Babel', 'React'],
  },
};

// 处理器对象
const handler = {
  get(target, key, receiver) {
    console.log('GET', key);

    // 递归创建并返回
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler);
    }

    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log('SET', key, value);

    return Reflect.set(target, key, value, receiver);
  },
};

const proxy = new Proxy(data, handler);

// 以下两段代码能够进入 set
proxy.info.name = 'Zoe';
proxy.info.blogs.push('proxy');
```

## Proxy 与 Object.defineProperty

ES5 提供了 `Object.defineProperty` 方法，该方法可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

`Object.defineProperty` 的三个主要问题：

- 无法监听数组变化，Vue 通过 Hack 改写八种数组方法实现
- 只能劫持对象的属性，因此对需要双向绑定的属性需要显式地定义
- 必须深层遍历嵌套的对象

与 Proxy 的区别：

- Proxy 可以直接监听数组的变化
- Proxy 可以直接监听对象而非属性
- Proxy 直接可以劫持整个对象，并返回一个新的对象，不管是操作便利程度还是底层功能上都远强于 `Object.defineProperty`
- Proxy 有多达 13 中拦截方法，不限于 `apply`、`ownKeys`、`deleteProperty`、`has` 等等是 `Object.defineProperty` 不具备的

Proxy 的劣势：

Proxy 的劣势就是兼容性问题，而且无法用 Polyfill 磨平。

## 应用场景

### 管道

在最新的 ECMAScript 提案中，出现了原生的管道操作符 `|>`，在 RxJS 和 Node.js 中都有类似的 `pipe` 概念。

使用 Proxy 也可以实现 `pipe` 功能，只要使用 `get` 对属性访问进行拦截就能轻易实现，将访问的方法都放到 `stack` 数组里面，一旦最后访问了 `execute` 就返回结果。

```js
const pipe = (value) => {
  const stack = [];
  const proxy = new Proxy(
    {},
    {
      get(target, prop) {
        if (prop === 'execute') {
          return stack.reduce(function (val, fn) {
            return fn(val);
          }, value);
        }
        stack.push(window[porp]);
        return proxy;
      },
    }
  );
  return proxy;
};

const double = (n) => n * 2;
const pow = (n) => n * n;

console.log(pipe(3).double.pow.execute);
```

### 运算符重载

`in` 操作符用于检查指定的属性是否位于指定的对象或其原型链中，但它也是语法上最优雅的重载操作符，这个例子定义了一个连续 `range` 函数来比较数字。

```js
const range = (min, max) => {
  return new Proxy(Object.create(null), {
    has: (_, prop) => +prop >= min && +prop <= max,
  });
};
```

与 Python 不同，Python 使用生成器与有限的整数序列进行比较，这种方法支持十进制比较，可以扩展为支持其他数值范围。

```js
const num = 11;
const data = [1, 5, num, 50, 100];

if (num in range(1, 100)) {
  // do something
}

data.filter((n) => n in range(1, 10));
// [1, 5]
```

尽管这个用例不能解决复杂的问题，但它确实提供了干净、可读和可重用的代码。

除了 `in` 运算符，我们还可以重载 `delete` 和 `new`。

### 通过属性查找数组中的特定对象

以下代理为数组扩展了一些实用工具。如你所见，通过 Proxy，我们可以灵活地定义属性，而不需要实用 `Object.defineProperties` 方法。以下例子可以用于通过单元格来查找表格中的一行。

```js
const data = [
  { name: 'Firefox', type: 'browser' },
  { name: 'SeaMonkey', type: 'browser' },
  { name: 'Thunderbrid', type: 'mailer' },
];

const products = new Proxy(data, {
  get: function (target, prop) {
    // 默认行为是返回属性值
    if (prop in target) {
      return target[prop];
    }

    // 获取 products 的 number，它是 products.length 的别名
    if (typeof prop === 'number') {
      return target.length;
    }

    let result,
      types = {};

    for (let item of target) {
      if (item.name === prop) {
        result = item;
      }
      if (types[item.type]) {
        types[item.type].push(item);
      } else {
        types[item.type] = [item];
      }
    }

    // 通过 name 获取 item
    if (result) return result;

    // 通过 type 获取 item
    if (prop in types) return types[prop];

    // 获取 item type
    if (prop === 'types') {
      return Object.keys(types);
    }

    return undefined;
  },
});

console.log(products[0]);
// { name: 'Firefox', type: 'browser' }

console.log(products['Firefox']);
// { name: 'Firefox', type: 'browser' }

console.log(products['Chrome']);
// undefined

console.log(products.browser);
// [
//   { name: 'Firefox', type: 'browser' },
//   { name: 'SeaMonkey', type: 'browser' }
// ]
//

console.log(products.types);
// ['browser', 'mailer']

console.log(products.number);
// 3
```

### 扩展构造函数

方法代理可以轻松地通过一个新构造函数来扩展一个已有的构造函数。

```js
const extend = function (sup, base) {
  const descriptor = Object.getOwnPropertyDescriptor(base.prototype, 'constructor');

  base.prototype = Object.create(sup.prototype);

  const handler = {
    construct: function (target, args) {
      const obj = Object.create(base.prototype);

      this.apply(target, obj, args);

      return obj;
    },
    apply: function (target, context, args) {
      sup.apply(context, args);
      base.apply(context, args);
    },
  };

  const proxy = new Proxy(base, handler);

  descriptor.value = proxy;

  Object.defineProperty(base.prototype, 'constructor', descriptor);

  return proxy;
};
```

使用示例：

```js
const Person = function (name) {
  this.name = name;
};

const Boy = extend(Person, function (name, age) {
  this.age = age;
});

Boy.prototype.sex = 'Male';

const Peter = new Boy('Peter', 20);

console.log(Peter.sex);
// 'Male'
console.log(Peter.name);
// 'Peter'
console.log(Peter.age);
// 20
```

### 副作用

我们可以通过 Proxy 来创建一个在读写属性时的副作用. 出发点在于某些特定的属性被访问或者写入时触发一些函数。

```js
const dosomething = () => {
  console.log('Do something after task completion');
};

const handler = {
  set: function (target, prop, value) {
    if (prop === 'status' && value === 'complete') {
      dosomething();
    }

    target[prop] = value;
  },
};

const tasks = new Proxy({}, handler);

tasks.status = 'complete';
```

当 `status` 属性写入并且值为 `complete` 时，会触发副作用函数 `dosomething()`。

### 缓存

利用介入干涉对象属性读写的能力，我们能够创建一个基于内存的缓存，它只会在值过期前返回值：

```js
const cacheTarget = (target, ttl = 60) => {
  const CREATED_AT = Date.now();
  const isExpired = () => (Date.now() - CREATED_AT) > (ttl * 1000);
  const handler = {
    get: (target, prop) => isExpired() ? undefined : target[prop];
  };

  return new Proxy(target, handler);
}

const cache = cacheTarget({ age: 25 }, 5);

console.log(cache.age);

setTimeout(() => {
  console.log(cache.age);
}, 6 * 1000);
```

这里我们创建了一个函数，并返回一个 Proxy。在获取 `target` 的属性前，这个 Proxy 的 `handler` 首先会检查 `target` 对象是否过期，基于此，我们可以针对每个键值都设置一个基于 TTLs 或者其他机制的过期检查。

### Cookie 对象

如果你曾经与 Cookie 进行交互，那么必须处理 `document.cookie`。这是一个不寻常的 API，因为 API 是一个 String，它读出所有 Cookie，以分号分隔。

`document.cookie` 是一个看起来像这样的字符串：

```js
_octo=GH1.2.2591.47507; _ga=GA1.1.62208.4087; has_recent_activity=1
```

简而言之，处理 `document.cookie` 比较麻烦且容易出错。一种方法是使用简单的 Cookie 框架，可以适用于 Proxy。

```js
const getCookie = () => {
  const cookies = document.cookie.split(';').reduce((acc, item) => ({
    [item.substr(0, item.indexOf('=')).trim()]: item.substr(item.indexOf('=') + 1),
    ...acc,
  }));

  const setCookie = (name, val) => (document.cookie = `${name}=${val}`);

  const deleteCookie = (name) =>
    (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`);

  return new Proxy(cookies, {
    set: (obj, prop, val) => (setCookie(prop, val), Reflect.set(obj, prop, val)),
    deleteProperty: (obj, prop) => (deleteCookie(prop), Reflect.deleteProperty(obj, prop)),
  });
};
```

此函数返回一个键值对对象，但代理 `document.cookie` 进行持久性的所有更改。

```js
let docCookies = getCookies();

docCookies.has_recent_activity;
// 1
docCookies.has_recent_activity = '2';
// 2
delete docCookies['has_recent_activity'];
// true
```

在 11 行代码中，修改 Cookie 提供了更好的交互，尽管在生产环境中还需要诸如字符串规范化之类的附加功能。

### 日志和统计

在做服务端时，可以使用 Proxy 代理函数，统一一段时间内调用的次数。

在后期做性能分析时可能会能够用上：

```js
function noop() {}

const proxyFunction = new Proxy(noop, {
  apply(target, context, args) {
    logger();

    return target.apply(context, args);
  },
});
```

或者：

```js
const data = {
  name: 'Jerry',
  author: 'Lauren Weisberger'
}

const proxy = new Proxy(data, {
  set (target, key, value) => {
    console.log('设置', key, ':', target[key], '->', value);

    target[key] = value;
  }
})

proxy.name = 'Notebook';
// 设置 name : The Devil wears prada -> Notebook
proxy.name = 'asdf';
// 设置 name : Notebook -> asdf
```

如上述例子一样，来定位对象的某个属性到底是什么时候被修改，并且你也可以通过 console.trace 等方法来排查是在什么地方被修改了。

扩展到其他类型的 handler，你对某个对象包了一层 Proxy 之后，你还可以知道它上面的属性是什么时候什么地方被读取、被调用、被初始化、被删除、被存取 property 等等。

听起来排查动态类型的问题可以变得更简单了。如果有了流行的对象监控库，开发者可以主需要引入这个库然后包一下需要监控的对象就可以把这个对象完整的操作记录都打印出来了。

### 动态代理

简单实现代理：

```js
const axios = require('axios');

const instance = axios.create({ baseURL: 'http://localhost:3000/api' });
const METHODS = ['get', 'post', 'patch'];

// proxy api
const api = new Proxy(
  {},
  {
    // proxy api.${name}
    get: (_, name) =>
      new Proxy(
        {},
        {
          // proxy api.${name}.${method}
          get: (_, method) =>
            METHODS.includes(method) &&
            new Proxy(() => {}, {
              // proxy api.${name}.${method}()
              apply: (_, self, [config]) =>
                instance.request({
                  url: name, // /api/${name}
                  method, // ${method}
                  ...config,
                }),
            }),
        }
      ),
  }
);
```

使用方式可以是：

```js
// GET /api/user?id=12
api.user
  .get({ params: { id: 12 } })
  .then((user) => console.log(user))
  .catch(console.error);

// POST /api/register
api.register
  .post({ body: { username: 'xxx', passworld: 'xxxx' } })
  .then((res) => console.log(res))
  .catch(console.error);
```

设计模式中有一种中介者模式（Mediator pattern），在这个模式中，可以把 Proxy 当做对象之间的交互时候的中介。在这种情况下，我们不需要定义不同的对象之间的关系，只需要 Proxy 对外保证一致的体验即可。

更长远一点来说，通过 Proxy 也可以实现热重载的场景，我们可以通过让 Proxy 指向新 require 的代码来替换旧版的代码来实现热重载而对开发者隐藏这个细节。

---

**参考资料：**

- [你不知道的 Proxy：ES6 Proxy 可以做哪些有意思的事情？](https://mp.weixin.qq.com/s/USybqGEQHW8ncuzVe1g_Rw)
- [如何使用 Proxy 来代理 JavaScript 里的类](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651557259&idx=1&sn=3aa73167ba3e5f073c0181d65fe2b966&chksm=80255a4ab752d35c0771a981a594d2811cbec39c80f21e37314c1d7aa083b478e91915e8c9cc&scene=21#wechat_redirect)
