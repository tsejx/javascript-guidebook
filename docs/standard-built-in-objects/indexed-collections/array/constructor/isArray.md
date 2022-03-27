---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.isArray
order: 4
---

## Array.isArray()

`Array.isArray()` 方法用于确定某个值是否是数组类型。

### 语法

语法：

```js
Array.isArray(arg);
```

类型声明：

```ts
interface ArrayConstructor {
  isArray(arg: any): arg is any[];
}

declare var Array: ArrayConstructor;
```

参数说明：

| 参数 | 说明         | 类型 |
| :--- | :----------- | :--- |
| arg  | 需要检测的值 | any  |

返回值：

如果对象是 `Array` 的实例，则返回 `true` ；否则为 `false`。

### 代码示例

下面的函数调用都返回 `true`

```js
Array.isArray([]);

Array.isArray([1]);

Array.isArray(new Array());

Array.isArray(Array.prototype);
```

鲜为人知的事实：其实 `Array.prototype` 也是一个数组。

```js
Array.isArray(Array.prototype);
```

下面的函数调用都返回 `false`。

```js
Array.isArray();

Array.isArray({});

Array.isArray(null);

Array.isArray(undefined);

Array.isArray(17);

Array.isArray('Array');

Array.isArray(true);

Array.isArray(false);

Array.isArray({ __proto__: Array.prototype });
```

## 参考资料

- [MDN: Array.isArry](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
