---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Promise.race
order: 6
---

# Promise.race

`Promise.race` 接收一个可迭代对象作为参数，当某个成员 Promise 状态变更后（无论是 Fulfilled 状态还是 Rejected 状态），立即调用指定的函数。

## 语法

语法：

```js
Promise.race(iterator);
```

类型声明：

```ts
interface PromiseConstructor {
  race<T>(values: readonly T[]): Promse<T extends PromiseLike<infer U> ? U : T>;
}

interface PromiseLike<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): PromiseLike<TResult1 | TResult2>;
}
```

参数说明：

| 参数     | 说明                 | 类型     |
| :------- | :------------------- | :------- |
| iterator | 可迭代对象，例如数组 | Iterator |

<br />

- 与 [Promise.all](./all) 相似，`Promise.race` 的 `iterator` 参数必须是 [Iterator](../../iterator-objects/iterator)
- 只要参数 `iterator` 的其中某个 Promise 实例成员的状态变更，那么 `Promise.race` 会立即返回一个新创建的 Promise 实例，并将返回值传递给回调函数
- `Promise.race` 方法的参数与 `Promise.all` 方法一样，如果不是 Promise 实例，就会先调用 [Promise.resolve](./resolve) 方法，将参数转为 Promise 实例，再进一步处理。

## 代码示例

```ts
const getPromise = (value: number, delay: number, fail: boolean): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => (fail ? reject(value) : resolve(value)), delay);
  });
};

const fastestPromise = Promise.race<number>([
  getPromise(0, 500, false), // 0.5s
  getPromise(1, 2000, false), // 2s
  getPromise(2, 1000, true), // 1s (rejects)
]);

console.time('settled-in');

fastestPromise
  .then((value) => {
    console.log('Fulfilled:', value);
  })
  .catch((err) => {
    console.log('Rejected:', err);
  })
  .finally(() => {
    console.timeEnd('settled-in');
  });
```

## 参考资料

- [TypeScript - lib.es2015.promise.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.promise.d.ts)
