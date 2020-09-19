---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 函数睡眠
order: 16
---

# 函数睡眠

伪命题，JavaScript 引擎线程无法挂起，通过异步实现类似 sleep 的效果。

## 代码实现

### 回调函数实现

```js
const sleep = (cb, time) => setTimeout(cb, time);

sleep(() => {
  console.log('Hello world!');
}, 1000);
```

### Promise 实现

```js
function sleep(time) {
  return function() {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, time);
    });
  };
}

const promise = new Promise(function(resolve) {
  console.log('do something');
  resolve();
})
  .then(sleep(2000))
  .then(function() {
    console.log('after sleep 2000');
  });
```

- 优点：这种方式实际上是用了 `setTimeout`，没有形成进程阻塞，不会造成性能和负载问题
- 缺点：虽然不像 `callback` 套那么多层，但仍不怎么美观，而且当我们需要在某过程中需要停止执行（或者在中途返回了错误的值），还必须得层层判断后跳出，非常麻烦，而且这种异步并不是那么彻底，还是看起来别扭

### Generator 实现

```js
function* sleep(time) {
  yield new Promise(function(resolve, reject) {
    setTimeout(resolve, time);
  });
}

sleep(1000)
  .next()
  .value.then(() => {
    console.log('Hello world!');
  });
```

- 优点：同 Promise 优点，另外代码就变得非常简单干净，没有 `then` 那么生硬和恶心
- 缺点：但不足也很明显，就是每次都要执行 `next` 显得很麻烦，虽然有 `co`（第三方包）可以解决，但就多包了一层不好看，错误也必须按 `co` 的逻辑来处理不爽

### Async/Await 实现

```js
function sleep(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

async function test() {
  const res = await sleep(1000);

  console.log('Hello world!');
  return res;
}
// 延迟 1000ms 输出 "Hello world!"
```

- 优点：同 Promise 和 Generator 的优点。Async/Await 可以看座是 Generator 的语法糖，Async 和 Await 相较于 `*` 和 `yield` 更加语义，另外各个函数都是扁平的，不会产生多余的嵌套，代码更加清爽易读。
- 缺点：ES7 语法存在兼容性问题，有 Babel 一切兼容性都不是问题

### 使用 node-sleep

```js
const sleep = requir('node-sleep');
const sec = 10;

sleep.sleep(sec);
// Sleep for sec seconds
sleep.msleep(sec);
// Sleep for sec milliseconds
sleep.usleep(sec);
// Sleep for sec microseconds（1 second is 1000000 microseconds）
```
