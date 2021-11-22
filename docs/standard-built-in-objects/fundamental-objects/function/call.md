---
nav:
  title: 内置对象
  order: 2
group:
  title: Function
  order: 5
title: Function.prototype.call
order: 3
---

# Function.prototype.call

`Function.prototype.call` 方法用于指定函数调用指向的 `this` 指针，并分别提供参数作为指定函数的参数。

## 语法

语法：

```ts
call(thisArg: any, ...argArray: any[]): any;
```

参数

| 参数    | 说明                                     | 类型 |
| :------ | :--------------------------------------- | :--- |
| thisArg | 可选参数。调用函数时指向的 `this` 指针。 |      |
| args    | 可选参数。调用函数参数列表。             |      |

## 示例

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

const cheese = new Food('cheese', 5);
const robot = new Toy('robot', 40);

console.log(cheese);
// {
//   category: "food",
//   name: "cheese",
//   price: 5,
// }
console.log(robot);
// {
//   category: "toy",
//   name: "robot",
//   price: 40,
// }
```

## 兼容实现

实现步骤：

1. 确保调用 `call` 方法的调用方为 `function` 类型
2. 参数：将参数数组转化为数组形式 ❗️（重点）
3. 执行上下文：确保 `context` 执行上下文，用 `window` 全局变量兜底
4. 将 `this`（调用方函数）赋值到执行上下文上，用 `Symbol` 创建属性键名以防冲突
5. 执行调用方函数，并保存调用结果 ❗️（重点）
6. 删除调用方（执行上下文）的键值对
7. 返回结果

```js
Function.prototype.call = function (context) {
  // context 是调用 call 的时候参数中的第一个参数

  // 先判断当前的调用方是不是一个函数
  if (typeof this !== 'function') {
    throw new TypeError(`${this}.call is not a function.`);
  }

  // 保存调用方给的参数
  const args = [...arguments].slice(1);

  // 确定执行方的类型，因为可以传 null 和 undefined
  context = context || window;

  // 将调用方的内容保存为执行方的一个属性，为了保证不与执行方中的 key 键名重复
  const fn = Symbol('fn');

  context[fn] = this;

  // 执行保存的函数，这个时候作用域就是在调用方的对象的作用域下执行，改变 this 的指向
  const result = context[fn](...args);

  // 执行完删除刚才新增的属性值
  delete context[fn];

  // 返回执行结果
  return result;
};
```

由于 `call` 和 `apply` 的区别就在于传参的方式不同：

```js
fn.call(ctx, arg1, arg2, arg3);
fn.call(ctx, [arg1, arg2, arg3]);
```

- `call` 调用函数的参数是散列的形式
- `apply` 调用函数的参数是数组的形式
