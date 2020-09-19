---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 偏函数
order: 20
---

# 偏函数

维基百科中对偏函数（Partial）的定义为：

> In computer science, partial application(or partial function application) refers to the process of fixing a number of arguments to a function, producing another function of smaller arity.

在计算机科学中，局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。

什么是元？

元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数。

🌰 **示例：**

```js
function add(a, b) {
  return a + b;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2); // 3

// 假设有一个 partial 函数可以做到局部应用
var addOne = partial(add, 1);

addOne(2); // 3
```

偏函数与柯里化十分相像：

- **柯里化：**将多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数
- **偏函数：**则是固定一个函数的一个或多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数

## 实际应用

`bind` 函数可以让我们传入一个或多个预设的参数，之后返回一个新函数，并拥有指定的 `this` 值和预设参数。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数跟在它们后面。

```js
function addition(x, y) {
  return x + y;
}

const plus5 = addition.bind(null, 5);

plus5(10);
// 15

plus5(25);
// 30
```

我们预先传入参数 `5`，并返回一个新函数赋值给 `plus5`，此函数可以接受剩余的参数。调用 `plus5` 传入剩余参数 `10` 得到最终结果 `15`，又传入参数 `20` 得到结果 `30`。偏函数通过设定预设值，帮助哦我们实现代码上的复用。

## 实现偏函数

在 Underscore.js 和 Lodash 均有实现 `partial` 偏函数，这里稍微实现一下：

```js
var _ = {};

function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
    var position = 0,
      leng = args.length;
    for (var i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i];
    }
    while (position < arguments.length) args.push(arguments[position++]);
    return fn.apply(this, args);
  };
}
```

---

**参考资料：**

- [📝 JavaScript 专题之偏函数](https://github.com/mqyqingfeng/Blog/issues/43)
- [📝 函数柯里化和偏函数应用](https://juejin.im/post/5ca862bce51d45534839ab96)
