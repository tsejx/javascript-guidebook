---
nav:
  title: 基本语法
  order: 1
group:
  title: 运算符
  order: 5
title: delete
order: 3
---

# delete

`delete` 操作符用于删除对象的某个属性。如果没有指向这个属性的引用了，它最终会被自动地释放。

## 语法

```js
delete expression;
```

`expression` 的计算结果应该是某个属性的引用

```js
delete object.property;
delete object['property'];
```

### 参数

| 参数       | 说明                                 |
| :--------- | :----------------------------------- |
| `object`   | 对象的名称，或计算结果为对象的表达式 |
| `property` | 要删除的属性                         |

### 返回值

对于所有情况都是 `true`，除非属性是一个自己 **不可配置** 的属性，在这种情况下，非严格模式返回 `false`。

> ⚠️ 注意：与通常对 `delete` 的理解不同，`delete` 操作符与直接释放内存无关。内存管理通过断开引用来间接完成的。
>
> 查看 [内存模型](../../../core-modules/executable-code-and-execution-contexts/memory-management/memory-model) 了解更多。

## 说明

`delete` 操作符会从某个对象上移除指定属性。

成功删除的时候回返回 `true`，否则返回 `false`。

但是，以下情况需要重点考虑：

- 如果你试图删除的属性**不存在**，那么 `delete` 将不会起任何作用，但仍会返回 `true`
- 如果对象的原型链上有一个与待删除属性同名的属性，那么删除属性之后，对象会使用原型链上的那个属性（也就是说，`delete` 操作只会在自身的属性上起作用）
- 任何使用 `var` 声明的属性不能从全局作用域或函数的作用域中删除。
  - 这样的话，`delete` 操作不能删除任何在全局作用域中的函数（无论这个函数是来自于函数声明或函数表达式）
  - 除了在全局作用域中的函数不能被删除，在对象中的函数是能够用 `delete` 操作删除的。
- 任何用 `let` 或 `const` 声明的属性不能够从它被声明的作用域中删除。
- 不可设置的（Non-configurable）属性不能被移除。这意味着像 `Math`、`Array` 和 `Object` 等内置对象的属性以及使用 `Object.defineProperty()` 方法设置为不可设置的属性不能被删除。

## 示例

```js
var Employee = {
  age: 28,
  name: 'abc',
  designation: 'developer',
};

console.log(delete Employee.name);
// true
console.log(delete Employee.age);
// true

// 当试着删除一个不存在的属性时
// 同样会返回 true
console.log(delete Employee.salary);
// true
```
