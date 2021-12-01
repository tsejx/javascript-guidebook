---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 高阶函数
order: 6
---

# 高阶函数

**高阶函数** 指操作函数的函数，一般地，有以下两种情况：

1. 函数可以作为参数被传递
2. 函数可以作为返回值输出

JavaScript 中的函数显然满足高阶函数的条件，在实际开发中，无论是将函数当作参数传递，还是让函数的执行结果返回另外一个函数，这两种情形都有很多应用场景。

## 作为参数传递

把函数当作参数传递，代表可以抽离出一部分容易变化的业务逻辑，把这部分业务逻辑放在函数参数中，这样一来可以分离业务代码中变化与不变的部分。

### 回调函数

其中一个常见的应用场景就是回调函数。

- 在 AJAX 异步请求的过程中，回调函数使用得非常频繁
- 在不确定请求返回的时间时，将 `callback` 回调函数当作参数传入
- 待请求完成后执行 `callback` 函数

🌰 **代码示例**

```js
const getUserInfo = function (userId, callback) {
  $.ajax('http://example.com/getUserInfo?' + userId, function (data) {
    if (typeof callback === 'function') {
      callback(data);
    }
  });
};

getUserInfo(123, function (data) {
  console.log(data.userName);
});
```

回调函数的应用不仅只在异步请求中，当一个函数不适合执行一些请求时，也可以把这些请求封装成一个函数，并把它作为参数传递给另外一个函数，**委托** 给另外一个函数来执行。

比如，想在页面中创建 100 个 `div` 节点，然后把这些 `div` 节点都设置为隐藏。

```js
const appendDiv = function () {
  for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    div.innerHTML = i;
    document.body.appendChild(div);
    div.style.display = 'none';
  }
};
appendDiv();
```

把 `div.style.display = 'none'` 的逻辑硬编码在 `appendDiv` 里显然是不合理的，`appendDiv` 未免有点个性化，成为了一个难以复用的函数，并不是每个人创建了节点之后就希望它们立刻被隐藏。

于是把 `div.style.display = 'none'` 这行代码抽出来，用回调函数的形式传入 `appendDiv` 方法

```js
const appendDiv = function (callback) {
  for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    div.innerHTML = i;
    document.body.appendChild(div);
    if (typeof callback === 'function') {
      callback(div);
    }
  }
};

appendDiv(function (node) {
  node.style.display = 'none';
});
```

可以看到，隐藏节点的请求实际上是由客户发起的，但是客户并不知道节点什么时候会创建好，于是把隐藏节点的逻辑放在回调函数中，**委托** 给 `appendDiv` 方法。`appendDiv` 方法当然知道节点什么时候创建好，所以在节点创建好的时候，`appendDiv` 会执行之前客户传入的回调函数。

### 数组排序

函数作为参数传递的另一个常见场景是数组排序函数 `sort()`。`Array.prototype.sort` 接受一个函数当作参数，这个函数里面封装了数组元素的排序方法。目的是对数组进行排序，这是不变的部分；而使用什么规则去排序，则是可变的部分。把可变的部分封装在函数参数里，动态传入 `Array.prototype.sort`，使 `Array.prototype.sort` 方法成为了一个非常灵活的方法。

```js
// 从小到大排列，输出: [ 1, 3, 4 ]
[1, 4, 3].sort(function (a, b) {
  return a - b;
});

// 从大到小排列，输出: [ 4, 3, 1 ]
[1, 4, 3].sort(function (a, b) {
  return b - a;
});
```

## 作为返回值输出

相比把函数当作参数传递，函数当作返回值输出的应用场景也有很多。让函数继续返回一个可执行的函数，意味着运算过程是可延续的。

下面是使用 `Object.prototype.toString` 方法判断数据类型的一系列的 `isType` 函数

```js
let isString = function (obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
};

let isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

let isNumber = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Number]';
};
```

实际上，这些函数的大部分实现都是相同的，不同的只是 `Object.prototype.toString.call(obj)` 返回的字符串。为了避免多余的代码，可以把这些字符串作为参数提前传入 `isType` 函数。

```js
let isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };
};

const isString = isType('String');
const isArray = isType('Array');
const isNumber = isType('Number');

console.log(isArray([1, 2, 3]));
// true
```

其实上面实现的 isType 函数，也属于**偏函数**的范畴，偏函数实际上是返回了一个包含**预处理参数**的新函数，以便后续逻辑可以调用。

当然，还可以用循环语句，来批量注册这些 `isType` 函数：

```js
let Type = {};
for (var i = 0, type; (type = ['String', 'Array', 'Number'][i++]); ) {
  (function (type) {
    Type['is' + type] = function (obj) {
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };
  })(type);
}

Type.isArray([]);
// true
Type.isString('str');
// true
```

## AOP 面向切面编程

AOP 即面向切面编程，它的主要作用是 **把一些跟核心业务逻辑模块无关的功能抽离出来**，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，再通过 **动态织入** 的方式掺入业务逻辑模块中。这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便地复用日志统计等功能模块。

通常，在 JavaScript 中实现 AOP，都是指把一个函数 **动态织入** 到另外一个函数之中。下面通过扩展 `Function.prototype` 来实现

```js
Function.prototype.before = function (beforefn) {
  // 保存原函数的引用
  const _this = this;

  // 返回包含了原函数和新函数的 "代理" 函数
  return function () {
    // 先执行新函数，修正 this
    beforefn.apply(this, arguments);

    // 再执行原函数
    return _this.apply(this, arguments);
  };
};

Function.prototype.after = function (afterfn) {
  const _this = this;

  return function () {
    // 先执行原函数
    const result = _this.apply(this, arguments);

    // 再执行新函数
    afterfn.apply(this, arguments);

    return result;
  };
};

const fn = function () {
  console.log(2);
};

fn = fn
  .before(function () {
    console.log(1);
  })
  .after(function () {
    console.log(3);
  });

fn();
// 1 2 3
```

把负责输出数字 1 和输出数字 3 的两个函数通过 AOP 的方式动态植入 `fn` 函数。

通过执行上面的代码，控制台顺利地返回了执行结果 1、2、3。

```js
const service = function () {
  console.log('功能逻辑');
};

const proxyMethod = (function () {
  let startTime;

  return {
    before: function () {
      startTime = new Date();

      console.log('计时开始');
    },
    after: function () {
      const endTime = new Date() - startTime;

      console.log('计时结束，用时：' + endTime);
    },
  };
})();

const aop = function (fn, proxy) {
  proxy.before && proxy.before();

  fn();

  proxy.after && proxy.after();
};

aop(service, proxyMethod);
// 计时开始
// 功能逻辑
// 计时结束：1
```

## 其他应用

- [函数柯里化](./function-currying)
- [反柯里化](./function-currying#反柯里化)
- [函数节流](./throttle)
- [函数防抖](./debounce)

---

**参考资料：**

- [📝 高阶函数介绍](https://juejin.im/entry/5815876c8ac247004fb6d132)
