---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.freeze
order: 7
---

# Object.freeze

`Object.freeze()` 方法用于**冻结**一个对象。

## 语法

语法：

```js
Object.freeze(o);
```

类型声明：

```ts
interface ObjectConstructor {
  freeze<T>(a: T[]): readonly T[];

  freeze<T extends Function>(f: T): T;

  freeze<T>(o: T): Readonly<T>;
}
```

参数说明：

| 参数 | 说明           | 类型   |
| :--- | :------------- | :----- |
| o    | 将被冻结的对象 | object |

返回值：

返回被冻结的对象。

## 方法说明

一个被冻结的对象再也不能被修改。

冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。

数据属性的值不可更改，访问器属性（有 `getter` 和 `setter`）也同样（但由于是函数调用，给人的错觉是还是可以修改这个属性）。

如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象。

数组作为一种对象，被冻结，其元素不能被修改。没有数组元素可以被添加或移除。

## 参考资料

- [MDN: Object.freeze](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
