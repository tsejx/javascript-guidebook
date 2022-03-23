---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.values
order: 20
---

# Object.values

⭐️ `ES2017(ES8)新特性`

`Object.values()` 方法用于指定对象自身的所有可枚举 Property 值的数组。

## 语法

语法：

```js
Object.values(obj);
```

类型声明：

```ts
interface ObjectConstructor {
  values<T>(o: { [s: string]: T } | ArrayLike<T>): T[];

  values(o: {}): any[];
}
```

参数说明：

| 参数  | 说明     | 类型   |
| :---- | :------- | :----- |
| `obj` | 指定对象 | object |

返回对象可枚举 Property 值的数组集合。

## 方法说明

返回的数组中键值的顺序与使用循环语句获取的键值组合一致。

## 代码示例

```js
const obj = {
  a: '1',
  b: '2',
  c: '3',
};

console.log(Object.values(obj));
// ['1', '2', '3']
```

## 参考资料

- [TypeScript - lib.es2017.object.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2017.object.d.ts)
