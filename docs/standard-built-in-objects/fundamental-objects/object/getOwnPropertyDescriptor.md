---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.getOwnPropertyDescriptor
order: 8
---

# Object.getOwnPropertyDescriptor

`Object.getOwnPropertyDescriptor()` 方法可以获取对象自有 Property 的某个 Attributes。

## 语法

语法：

```js
Object.getOwnPropertyDescriptor(o, property);
```

类型声明：

```ts
declare type PropertyKey = string | number | symbol;

interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}

interface ObjectConstructor {
  getOwnPropertyDescriptor(o: any, p: PropertyKey): PropertyDescriptor | undefined;
}
```

参数说明：

| 参数     | 说明                | 类型   |
| :------- | :------------------ | :----- |
| o        | 需要查找的目标对象  | object |
| property | 目标对象的 Property | string |

## 代码示例

```js
const foo = { a: 1 };

Object.getOwnPropertyDescriptor(foo, 'a');
// Object {
// 	value: "a",
// 	writable: true,
// 	enumerable: true,
// 	configurable: true,
// }
```

## 参考资料

- [MDN: Object.getOwnPropertyDescriptor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
