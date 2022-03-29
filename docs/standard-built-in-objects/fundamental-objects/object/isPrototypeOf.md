---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.prototype.isPrototypeOf
order: 22
---

# Object.prototype.isPrototypeOf

`Object.prototype.isPrototypeOf()` 方法用于测试指定对象是否存在于目标对象的原型链上。

## 语法

语法：

```js
obj.isPrototypeOf(V);
```

类型声明：

```ts
interface Object {
  isPrototypeOf(v: Object): boolean;
}
```

参数说明：

| 参数 | 说明                             | 类型   |
| :--- | :------------------------------- | :----- |
| V    | 目标对象（在该对象原型链上搜寻） | object |

返回值：

返回指定对象是否位于目标对象原型链上的 Boolean 类型值。

## 代码示例

```js
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

const baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz));
// true

console.log(Bar.prototype.isPrototypeOf(baz));
// true

console.log(Foo.prototype.isPrototypeOf(baz));
// true

console.log(Object.prototype.isPrototypeOf(baz));
// true
```

## 参考资料

- [MDN: Object.isPrototypeOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
