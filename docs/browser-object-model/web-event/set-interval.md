---
nav:
  title: BOM
  order: 5
group:
  title: 全局 API
  order: 2
title: setInterval
order: 2
---

# setInterval

`window.setInterval()`  方法重复调用一个函数或执行一个代码段，在每次调用之间具有固定的时间延迟。

**解决的问题**：由于 JavaScript 的单线程特征，定时器提供了一种跳出单线程限制的方法，即让一段代码在一定毫秒之后，再异步执行。

## 语法

```js
let intervalID = window.setInterval(func, delay[, param1, param2, ...]);
let intervalID = window.setInterval(code, delay);
```

### 参数

| 参数       | 描述                                                                                                                           |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------- |
| intervalId | 定时器的唯一辨识符，可以作为参数传给 `clearInvterval()`                                                                        |
| func       | 需要重复调用的函数                                                                                                             |
| code       | 是另一种语法的应用，是指你想重复执行的一段字符串构成的代码（不推荐使用，不推荐的原因和 `eval()` 一样）                         |
| delay      | 是每次延迟的毫秒数（一秒等于 1000 毫秒），函数的每次调用会在该延迟之后发生。和 `setTimeout` 一样，实际的延迟时间可能会稍长一点 |

需要注意的是，IE 不支持第一种语法中向延迟函数传递额外参数的功能。如果你想要在 IE 中达到同样的功能，你必须使用一种兼容代码。

### 注意

- 定时器的时间间隔设为 0，也会有几毫秒的延迟
- 在使用 `setInterval` 和 `setTimeout` 时最好将其返回值赋值给一个变量，以便取消定时器
- 在使用 `Vue` 的时候，`setTimeout` 和 `setInterval` 的 `this` 指向时 window 对象，访问不到组件数据以及方法
- 在使用 `Vue` 的时候，路由跳转但不会销毁 `setInterval` ，但是组件已经销毁了，这会导致问题
- 在执行线程中 `setTimeout` / `setInterval` 无法保证准时执行回调函数的
- `setInterval` 调用有可能会被废弃以及 `setInterval` 的连续执行

## 停止间歇调用

使用 `clearInterval(timeId)` 可以清除间歇调用定时器（定时器还在，只是没调用）。

## 使用方法

### 基本用法

```js
// 间歇调用的函数
const animate = () => {
  console.log('间隙调用');
};

// 间歇调用定时器（表示每过500毫秒执行一次animate函数）
const intervalID = setInterval(animate, 500);

// 清除调用
clearInterval(intervalID);
```
