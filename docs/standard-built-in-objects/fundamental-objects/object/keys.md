---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.keys
order: 16
---

# Object.keys

`Object.keys()` 方法用于获取指定对象自身可枚举 Property 组成的键名数组。

## 语法

语法：

```js
Object.keys(o);
```

类型声明：

```ts
interface ObjectConstructor {
  keys(o: {}): string[];
}
```

参数说明：

| 参数 | 说明     | 类型   |
| :--- | :------- | :----- |
| o    | 指定对象 | object |

返回对象所有可枚举 Property 的键名组成的数组。

## 方法说明

获取到的数组中键名顺序与使用 `for` 系列循环语句获取到的键名顺序一致。

## 代码示例

### 数组

```js
const foo = ['a', 'b', 'c'];

console.log(Object.keys(foo));
// console: ['0', '1', '2']
```

### 类数组

```js
const foo = { 0: 'a', 1: 'b', 2: 'c' };

console.log(Object.keys(foo));
// console: ['0', '1', '2']
```

### 不可枚举属性

```js
// getBar is a property which isn't enumerable
const foo = Object.create(
  {},
  {
    getBar: {
      value: function () {
        return this.bar;
      },
    },
  }
);

foo.bar = 1;

console.log(Object.keys(foo));
// ['bar']
```

## 参考资料

- [MDN: Object.keys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)
