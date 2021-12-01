---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: for...in 语句
order: 23
---

# for...in 语句

**for...in 语句**用于遍历数组或者对象的属性（对数组或者对象的属性进行循环操作）。

## 语法

```js
for (property in expression) statement;
```

### 参数

| 参数         | 类型        | 描述                                   |
| ------------ | ----------- | -------------------------------------- |
| `property`   | 任意类型    | 每次迭代时，将不同的属性名分配给变量。 |
| `expression` | Object 类型 | 被迭代枚举其属性的对象。               |
| `statement`  | -           | 循环执行代码块。                       |

### 描述

- `for...in` 循环只遍历可枚举属性。循环将遍历对象本身的所有可枚举属性，以及对象从其构造函数原型中继承的属性（更接近原型链中对象的属性覆盖原型属性）。
- `for...in` 不应该用于迭代一个数组，其中索引顺序很重要。数组索引只是具有整数名称的枚举属性，并且与通用对象属性相同。不能保证 `for...in` 将以任何特定的顺序返回索引。`for...in` 循环语句将返回所有可枚举属性，包括非整数类型的名称和继承的那些。因为迭代的顺序是依赖于执行环境的，所以数组遍历不一定按次序访问元素。因此当迭代访问顺序很重要的数组时，最好用整数索引去进行 `for` 循环（或用 `Array.prototype.forEach()` 或 `for...of` 循环）。

* ECMAScript 对象的属性没有顺序，因此通过 `for...in` 循环输出的属性名的顺序是不可预测的。具体来说，所有可枚举的属性都会被返回一次，但返回的先后次序可能会因为浏览器而异。
* 迭代的对象的变量值为 `null` 或 `undefined`，`for...in` 语句不抛出错误，但不会执行循环体（ECMAScript5 以上版本可行）。为了保证最大限度的兼容性，建议使用 `for...in` 之前，先检测确认该对象的值不是 `null` 或 `undefined`。

## 示例

### 代码示例

```js
for (var propName in window) {
  console.log(propName);
}
```

### 提取实例自身属性

```js
var seat = { a: 1, b: 2, c: 3 };

function Car() {
  this.color = 'red';
}

Car.prototype = seat;

var lamborghini = new Car();

// for...in statement
for (var prop in lamborghini) {
  if (lamborghini.hasOwnProperty(prop)) {
    console.log(`lamborghini.${prop} = ${lamborghini[prop]}`);
  }
}

// Output:
// "lamborghini.color = red"
```
