---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.assign
order: 2
---

# Object.assign

`Object.assign()` 方法用于将所有可枚举自有 Property 的值从一个或多个源对象拷贝到目标对象。

## 语法

语法：

```js
Object.assign(target, ...sources);
```

类型声明：

```ts
interface ObjectConstructor {
  assign<T, U>(target: T, source: U): T & U;

  assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;

  assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

  assign(target: object, ...sources: any[]): any;
}
```

参数说明：

| 参数    | 说明     | 类型   |
| :------ | :------- | :----- |
| target  | 目标对象 | object |
| sources | 源对象   | object |

返回值：

返回目标对象。

## 方法说明

如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

`Object.assign` 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。

该方法使用源对象的 `[[Get]]` 和目标对象的 `[[Set]]`，所以它会调用相关 `getter` 和 `setter`。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含 `getter`，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用 [Object.getOwnPropertyDescriptor](./getOwnPropertyDescriptor) 和 [Object.defineProperty](./defineProperty) 。

## 代码示例

### 基本用法

```js
const obj1 = { a: 1 };

const obj2 = Object.assign({}, obj1);

console.log(obj2);
// Output: { a: 1 }
```

## 参考资料

- [MDN: Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)
