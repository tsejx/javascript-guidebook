---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.allSettled
order: 8
---

# Promise.allSettled

⭐️ `ES2020(ES11)新特性`

`Promise.allSettled` 方法返回一个在所有给定的 Promise 都已经 `fullfilled` 或 `rejected` 后的 Promise，并带有一个对象数组，每个对象表示对应的 Promise 结果。

当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个 Promise 的结果时，通常使用它。

## 语法

语法：

```js
Promise.allSettled(iterable);
```

类型声明：

```ts
interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

interface PromiseRejectedResult {
  status: 'rejected';
  reason: any;
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

interface PromiseConstructor {
  allSettled<T extends readonly unknown[] | readonly [unknown]>(
    values: T
  ): Promise<
    { -readonly [P in keyof T]: PromiseSettledResult<T[P] extends PromiseLike<infer U> ? U : T[P]> }
  >;

  allSettled<T>(
    values: Iterable<T>
  ): Promise<PromiseSettledResult<T extends PromiseLike<infer U> ? U : T>[]>;
}
```

参数说明：

| 参数     | 说明   | 类型 |
| :------- | :----- | :--- |
| iterable | 见下方 | any  |

根据传入参数的不同，会有不同的响应效果：

- 空的具备 Iterator 接口的对象，返回状态为 Fulfilled 的 Promise
- 不包含任何 Promise，返回异步完成的 Promise
- 其他情况，返回状态为 Pending 的 Promise

<br />

- 参数 `iterable` 必须具备 [Iterator](../../iterator-objects/iterator) 接口，且每个成员都是 Promise 实例
- 如果 `iterable` 内每个成员都不是 Promise 实例，会先调用 [Promise.resolve](resolve) 将每个成员转化为 Promise 实例，再进一步处理

## 方法描述

对于 `Promise.allSettled` 执行集合中的每个 Promise 都已经完成后，无论时成功（`fulfiiled`）或是拒绝（`rejected`），未决议的 Promise 将被异步完成。那时，所返回的 Promise 的处理器将传入一个数组作为输入，该数组包含原始 Promise 集合中每个 Promise 的结果。

对于每个结果对象，都有一个 `status` 字段。

- 如果值为 `fulfilled`，则结果对象上存在一个 `value`
- 如果值为 `rejected`，则存在一个 `reason`

`value` 和 `reason` 分别反映了每个 Promise 决议（或拒绝）的值。

## 代码示例

应用场景：

- 同时上传多张图片，实现异步并发（例如使用阿里云 OSS 同时批量上传多张图片）

### 基本用法

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status))
);

// 结果：
// fulfilled
// rejected
```

### 异步并发

```js
let files = [{ file: new File() }, { file: new File() }];
const ossConfig = {
  accessKeyId: 'xxx',
  accessKeySecret: 'xxx',
  stsToken: 'xxx',
  bucket: 'xxx',
  region: xxx'',
};

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = genPath('');
      const client = new OSS(ossConfig);
      client.put(filePath, file).then(res => {
        if (res?.res?.status === 200) {
          resolve(res.url);
        } else {
          reject('上传失败');
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function uploadFiles(files) {
  const promises = [],
    urls = [];

  try {
    for (const item of files) {
      const promise = uploadFile(item.file);

      promises.push(promise);
    }

    const result = await Promise.allSettled(promises);

    urls = result.reduce((acc, item) => {
      if (item.status === 'fulfilled') {
        acc.push({ url: item.value });
      }

      return acc;
    }, []);
  } catch (err) {
    console.log(err);
  }

  return urls;
}
```

## 参考资料

- [ECMAScript(ECMA-262)：The definition of Promise.allSettled in taht specification](https://tc39.es/proposal-promise-allSettled/)
