---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.isSealed
order: 15
---

# Object.isSealed

`Object.isSealed()` 方法用于检测指定对象是否已被密封。

## 语法

语法：

```js
Object.isSealed(o);
```

类型声明：

```ts
interface ObjectConstructor {
  isSealed(o: any): boolean;
}
```

参数说明：

| 参数 | 说明               | 类型   |
| :--- | :----------------- | :----- |
| o    | 指定用于检测的对象 | object |

返回值：

返回 Boolean 类型的值表示用于检测的对象是否可扩展。

## 方法说明

密封对象不可扩展，自身 Property 不可配置并且不可删除（但不一定是不可写）对象。

## 代码示例

```js
let foo = { a: 1, b: 2 };

console.log(Object.isSealed(foo));
// false

console.log(Object.seal(foo));
// { a: 1, b: 2 }

console.log(Object.isSealed(foo));
// true

console.log(delete foo.b);
// false

foo.c = 3;

console.log(foo);
// { a: 1, b: 2 }
```

这个方法实际上会在现有对象上调用 `Object.preventExtensions()` 方法，并把所有现有属性的 `configurable` 描述符置为 `false`。

```js
let foo = { a: 1, b: 2 };

console.log(Object.getOwnPropertyDescriptor(foo, 'a'));
// { value: 1, writable: true, enumerable: true, configurable: true }

console.log(Object.seal(foo));
// {a: 1, b: 2}

console.log(Object.getOwnPropertyDescriptor(foo, 'a'));
// { value: 1, writable: true, enumerable: true, configurable: false }
```

## 参考资料

- [MDN: Object.isSealed](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
