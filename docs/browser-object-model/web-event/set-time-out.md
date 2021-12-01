---
nav:
  title: BOM
  order: 5
group:
  title: 全局 API
  order: 2
title: setTimeout
order: 1
---

# setTimeout

`window.setTimeout()` 方法用于在指定的毫秒数后调用函数或计算表达式。

## 语法

```js
let timeoutId = window.setTimeout(func [, delay, param1, param2, ...]);
let timeoutId = window.setTimeout(func [, delay]);
let timeoutId = window.setTimeout(code [, delay]);
```

### 参数

| 参数      | 描述                                                                                                                           |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------- |
| timeoutId | 定时器的唯一辨识符，可以作为参数传给 `clearInvterval()`                                                                        |
| func      | 需要重复调用的函数                                                                                                             |
| code      | 是另一种语法的应用，是指你想重复执行的一段字符串构成的代码（不推荐使用，不推荐的原因和 `eval()` 一样）                         |
| delay     | 是每次延迟的毫秒数（一秒等于 1000 毫秒），函数的每次调用会在该延迟之后发生。和 `setTimeout` 一样，实际的延迟时间可能会稍长一点 |
| param     | 传入调用函数的参数                                                                                                             |

## 停止超时调用

使用 `clearTimeout(timeId)` 可以停止间歇调用定时器（定时器还在，只是没调用）。

## 示例

### 基本用法

```js
// 超时调用函数
const animate = function () {
  console.log('超时调用');
};

// 超时调用定时器（经过500毫秒后执行一次animate函数）
const timeoutID = setTimeout(animate, 500);

// 清除超时调用
clearTimeout(timeoutID);
```

### 实现间歇调用

```js
window.timeWorkers = {};

const _setInterval = function (cb, time) {
  let key = Symbol('interval');

  const execute = function (fn, time) {
    timeWorkers[key] = setTimeout(function () {
      fn();
      execute(fn, time);
    });

    return key;
  };

  execute(cb, time);
};

const _clearInterval = function (key) {
  if (key in window.timeWorkers) {
    clearTimeout(timeWorkers[key]);
    delete timeWorkers[key];
  }
};
```
