---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.getOwnPropertyDescriptors
order: 9
---

# Object.getOwnPropertyDescriptors

⭐️ `ES2017(ES8)新特性`

`Object.getOwnPropertyDescriptors()` 方法用于获取一个对象的所有自身 Property 的 Attributes。

## 语法

语法：

```js
Object.getOwnPropertyDescriptors(obj);
```

类型声明：

```ts
interface ObjectConstructor {
  getOwnPropertyDescriptors<T>(
    o: T
  ): { [P in keyof T]: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor };
}

interface TypedPropertyDescriptor<T> {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
  value?: T;
  get?: () => T;
  set?: (value: T) => void;
}

interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}
```

参数说明：

| 参数  | 说明                                   | 类型   |
| :---- | :------------------------------------- | :----- |
| `obj` | 用于获取 Property 的 Attributes 的对象 | object |

## 代码示例

```js
const a = {
  name: 'Ben',
  get age() {
    return '18';
  },
};

Object.getOwnPropertyDescriptors(a);
```

## 参考资料

- [TypeScript - lib.es2017.object.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2017.object.d.ts)
