---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.prototype.hasOwnProperty
order: 21
---

# Object.prototype.hasOwnProperty

`Object.prototype.hasOwnProperty` 方法用于检测指定对象自有 Properties 中是否具有指定的 Property。

## 语法

语法：

```js
obj.hasOwnProperty(v);
```

类型声明：

```ts
declare type PropertyKey = string | number | symbol;

interface Object {
  hasOwnProperty(v: PropertyKey): boolean;
}
```

参数说明：

| 参数 | 说明                                      | 类型          |
| :--- | :---------------------------------------- | :------------ |
| v    | 需要检测的 Property 字符串名称或者 Symbol | string/symbol |

返回值：

返回该对象是否含有指定 Property 的 Boolean 值。

## 方法说明

所有继承了 Object 的对象都会继承到 `hasOwnProperty` 方法。

这个方法可以用来检测一个对象是否含有特定的自身属性；和 [in](../../../../basic-concept/expressions/operators/in) 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

## 代码示例

### 基本用法

```js
const foo = new Object();
foo.a = 'exist';

function change() {
  foo.b = foo.a;
  delete foo.a;
}

foo.hasOwnProperty('a');
// true

change();

foo.hasOwnProperty('b');
// false
```

### 自有属性与继承属性

```js
const foo = new Object();

foo.a = 'Hello world!';

foo.hasOwnProperty('a');
// true
foo.hasOwnProperty('toString');
// false
foo.hasOwnProperty('hasOwnProperty');
// false
```

## 参考资料

- [MDN: Object.hasOwnProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
