---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.getPrototypeOf
order: 12
---

# Object.getPrototypeOf

`Object.getPrototypeOf()` 方法用于获取指定对象的原型（内部 `[[Prototype]]` 属性的值）。

## 语法

语法：

```js
Object.getPrototypeOf(o);
```

类型声明：

```ts
interface ObjectConstructor {
  getPrototypeOf(o: any): any;
}
```

参数说明：

| 参数 | 说明     | 类型   |
| :--- | :------- | :----- |
| o    | 目标对象 | object |

返回值：

返回目标对象的原型对象。

## 代码示例

### 基本示例

```js
const proto = {};

const foo = Object.create(proto);
Object.getPrototypeOf(foo) === proto;
// true

const reg = /a/;
Object.getPrototypeOf(reg) === Regexp.prototype;
// true
```

### 标准内置对象

```js
const foo = new Object();

Object.getPropertyOf(Object);
// f () { [native code] }
Object.getPropertyOf(Function);
// f () { [native code] }

Object.getPropertyOf(Object) === Function.prototype;
// true

const bar = new Object();
Object.prototype === Object.getPrototypeOf(bar);
// true
Obejct.prototype === Object.getPrototypeOf({});
// true
```

## 参考资料

- [MDN: Object.getPrototypeOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
