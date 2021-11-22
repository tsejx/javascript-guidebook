---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 函数柯里化
order: 7
---

# 函数柯里化

> 在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

柯里化（Currying），又称部分求值（Partial Evaluation），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。核心思想是把多参数传入的函数拆成单参数（或部分）函数，内部再返回调用下一个单参数（或部分）函数，依次处理剩余的参数。

```js
// 传统写法
fn(1, 2, 3, 4);

// 柯里化
fn(1)(2)(3)(4);
```

假设这个函数是用于求和，那么就是把本来接收多个参数一次性求和的函数改成了接收单一参数逐个求和的函数。这样是不是容易理解了。

## 代码实现

一步步实现一个柯里化函数。

```js
const sum3(x, y, z) {
  return x + y + z
}
console.log(sum(1,2,3));
// 6
```

```js
// 柯里化
const sum3(x) {
  return function (y) {
    return function (z) {
      return x + y + z
    }
  }
}
console.log(sum(1)(2)(3));
// 6
```

```js
function curry(fn) {
  return function (y) {
    return function (z) {
      return fn(x, y, z);
    };
  };
}
var sum3 = curry((x, y, z) => {
  return x + y + z;
});
console.log(sum3(1)(2)(3)); // 6
```

更多参数：

```js
function curryN(fn) {
  return function (a1) {
    return function (a2) {
      return function (a3) {
        //......
        return function (aN) {
          return fn(a1, a2, a3, ...aN);
        };
      };
    };
  };
}
```

通过 <strong style="color:red">递归</strong> 来简化这种写法：

```js
function nest(fn) {
  return function (x) {
    return nest(fn);
  };
}
function curry(fn) {
  return nest(fn);
}
```

这里缺少一个循环终止的判断，所以 `nest` 函数先引入一个新参数 `i`，当 `i === N` 时递归终止

```js
function nest(fn, i) {
  return function(x) {
    if (i === N) {
        return fn(...)
    }
    return nest(fn, i + 1)
  }
}
function curry(fn) {
  return nest(fn, 1)
}
```

接着，需要一个存放任意多个参数的数组，将这个数组命名为 `args`，然后传入 `nest` 函数。

```js
function nest(fn, i, args) {
  return function (x) {
    args.push(x);
    if (i === fn.length) {
      return fn(...args);
    }
    return nest(fn, i + 1, args);
  };
}
function curry(fn) {
  const args = [];
  return nest(fn, 1, args);
}
```

最后在添加一个处理 0 个参数的情况，我们就完成了最终版的柯里化函数。

```js
function curry(fn) {
  if (fn.length === 0) {
    return fn;
  }
  const args = [];
  return nest(fn, 1, args);
}
```

## 代码示例

**示例一：实现一个柯里化求和函数**

```js
const currying = function (fn, ...args) {
  const len = fn.length;
  args = args || [];
  return () => {
    const totalArgs = [...args].concat([...arguments]);

    return totalArgs.length >= len ? fn.call(this, totalArgs) : currying.call(this, fn, totalArgs);
  };
};

const sum = (a, b, c) => a + b + c;

const newSum = currying(sum);

newSum(1)(2)(3)(4);
// 10
```

看起来挺巧妙，但是这种案例明摆着就像不从实际出发的面试题。

**示例二：查询数组中是否存在某值**

```js
const find = function (arr, value) {
  return arr.indexOf(value) !== -1;
};
```

一个简单的函数用于查询数组中是否某个值，每次使用都需要这样调用。

```js
find(arr, 1);
find(arr, 2);
```

既然 `arr` 是个固定参数，那么我们可以先保存一个接收过 `arr` 的函数，再用这个函数去处理变化的参数。

```js
const collection = [5, 4, 3, 2, 1];
const findInCollection = currying(find)(collection);

findInCollection(1);
findInCollection(2);
```

函数柯里化的用途可以理解为：参数复用。本质上是降低通用性，提高适用性。

**柯里化简便实现**

```js
const curry = (fn) =>
  (judge = (...args) => (args.length === fn.length ? fn(...args) : (arg) => judge(...args, arg)));

// 展开
const currying = (fn) => {};
```

## 反柯里化

与柯里化相对应。

- 柯里化是为了缩小适用范围，创建一个针对性更强的函数；
- 反柯里化则是扩大适用范围，创建一个应用范围更广的函数。

对应的代码转换就变成这样。

```js
fn(1)(2)(3)(4)  ->  fn(1, 2, 3, 4)
```

实例

```js
Array.forEach = function () {
  const fn = [].pop.call(arguments);

  const arr = arguments.length > 1 ? arguments : arguments[0];

  return [].forEach.call(arr, fn);
};

Array.forEach(1, 2, 3, function (i) {
  console.log(i);
  // 1 2 3
});

Array.forEach('123', function (i) {
  console.log(i);
  // 1 2 3
});

Array.forEach(
  {
    '0': 1,
    '1': 2,
    '2': 3,
    length: 3,
  },
  function (i) {
    console.log(i);
    // 1 2 3
  }
);
```

类数组借用 Array 原型函数，是很常见的应用了。这个例子应用 `call` 函数提取出一个新的函数，可以接收更多的参数和类型，适用性更广。

## 参考资料

- [📝 JavaScript 专题之函数柯里化](https://github.com/mqyqingfeng/Blog/issues/42)
- [📝 JavaScript 高阶函数介绍](https://juejin.im/entry/5815876c8ac247004fb6d132)
- [从一道面试题认识函数柯里化](https://juejin.cn/post/6844903665308794888)
