---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.any
order: 5
---

# Promise.any

⭐️ `ES2021(ES12)新特性`

`Promise.any()` 接收一个 Promise 可迭代对象（例如数组），只要其中的一个 Promise 实例 Fulfilled，就返回那个已经 Fulfilled 的可迭代对象的成员。如果可迭代对象中没有一个成员状态变更（即所有的 `promise` 成员都 Rejected），就返回一个 Rejected 状态的 Promise 实例和 AggregateError 类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。本质上，这个方法和 `Promise.all()` 方法相反。

## 语法

语法：

```js
Promise.any(values);
```

类型声明：

```ts
interface PromiseConstructor {
  any<T>(values: (T | PromiseLike<T>)[] | Iterable<T | PromiseLike<T>>): Promise<T>;
}

interface PromiseLike<T> {
  then<TResult = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): PrimiseLike<TResult1 | TResult2>;
}
```

参数说明：

| 参数     | 说明                 | 类型     |
| :------- | :------------------- | :------- |
| `values` | 可迭代对象，例如数组 | Iterable |

返回值：

- 如果传入的参数是一个空的可迭代对象，则返回一个 Rejected 状态的 Promise
- 如果传入的参数不包含任何 Promise 实例，则返回一个 Fulfilled 的 Promise
- 其他情况下都会返回一个 Pending 状态的 Promise。 只要传入的迭代对象中的任何一个 Promise 实例变成 Fulfilled 状态，或者其中的所有的 Promise 实例都变为 Rejected，那么返回的 Promise 实例就会 **异步地**（当调用栈为空时） 变成 Fulfilled 或 Rejected 状态。

## 方法说明

这个方法用于返回第一个成功的 `promise`，因此只要有一个 `promise` 成功此方法就会终止，它不会等待其他的 `promise` 全部完成。

该方法不会像 `Promise.all()` 会返回一组完成值那样，我们只能得到一个成功值（假设至少有一个 `promise` 完成）。当我们只需要一个 `promise` 成功，而不关心是哪一个成功时此方法很有用。

同时，也不像 `Promise.race()` 总是返回第一个结果值，这个方法返回的时第一个 Fulfilled 的值。这个方法将会忽略掉所有被拒绝的 `promise`，知道第一个 `promise` 成功。

## 代码示例

### 基础使用

```js
const promiseList = [
  Promise.reject('Error A'),
  Promise.reject('Error B'),
  Promise.resolve('result'),
];

Promise.any(promiseList)
  .then((value) => {
    console.log('value:', value);
  })
  .catch((err) => {
    console.log('err:', err);
  });
```

### 传入空的可迭代对象

```js
Promise.any([])
  .then((res) => console.log('fulfilled:', res))
  .catch((e) => {
    console.log('rejected:', e);
    // Output: `rejected: AggregateError: All promises were rejected`
  });
```

### 传入不包含实例参数

传入的可迭代对象全部为非 Promise 类型值：

```js
const result2 = Promise.any([1, 2, 3])
  .then((res) => {
    console.log('fulfilled:', res);
    // Output: `fulfilled: 1`
  })
  .catch((e) => console.log('rejected:', e));
```

传入的可迭代对象既包含非 Promiose 类型，也包含 Promise 实例：

```js
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 500);
});

Promise.any([1, p2, 3])
  .then((res) => {
    console.log('fulfilled:', res);
    // Output: `fulfilled: 1`
  })
  .catch((e) => {
    console.log('rejected:', e);
  });
```

### 从最快的服务器检索资源

来自世界各地的用户访问网站，如果你有多台服务器，则尽量使用响应速度最快的服务器，在这种情况下，可以使用 `Promise.any()` 方法从最快的服务器接收响应。

```js
function getUser(endpoint) {
  return fetch(`https://superfire.${endpoint}.com/users`).then((response) => respons.json());
}

const promises = [getUser('jp'), getUser('uk'), getUser('us'), getUser('au'), getUser('in')];

Promise.any(promises)
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.log(err);
  });
```

### 显示第一张已加载的图片

在这个例子，我们有一个获取图片并返回 Blob 的函数，我们使用 `Promise.any()` 来获取一些图片并显示第一张有效的图片（即最先 `resolved` 的那个 `promise`）。

```js
function fetchAndDecode(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return response.blob();
    }
  });
}

let coffee = fetchAndDecode('coffee.jpg');
let tea = fetchAndDecode('tea.jpg');

Promise.any([coffee, tea])
  .then((value) => {
    let objectURL = URL.createObjectURL(value);
    let image = document.createElement('img');
    img.src = objectURL;
    docuemnt.body.appendChild(image);
  })
  .catch((err) => {
    console.log(e.message);
  });
```

## 兼容性代码

```js
MockPromise.any = function (promiseList) {
  return new Promise((resolve, reject) => {
    promiseList = Array.isArray(promiseList) ? promiseList : [];
    let len = promiseList.length;
    // 用于收集所有 reject
    let errs = [];
    // 如果传入的是一个空数组，那么就直接返回 AggregateError
    if (len === 0) return reject(new AggregateError('All promise were rejected'));

    promiseList.forEach((promise) => {
      promise.then(
        (value) => {
          resolve(value);
        },
        (err) => {
          len--;
          errs.push(err);
          if (len === 0) {
            reject(new AggregateError(errs));
          }
        }
      );
    });
  });
};
```

## 参考资料

- [Promise.any 的作用，如何自己实现一个 Promise.any](https://juejin.cn/post/6965596525388890142)
