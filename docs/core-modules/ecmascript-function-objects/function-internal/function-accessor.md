---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数内部
  order: 9
title: 函数存取器
order: 1
---

# 函数存取器

## 取值函数

`getter` 语法将对象属性绑定到查询该属性时将被调用的函数。

### 语法

```js
{get prop() {
  // do something
}}

{get [expression]() {
  // do something
}}
```

**参数：**

| 参数       | 说明                     |
| :---------- | :------------------------ |
| `prop`       | 要绑定到给定函数的属性名 |
| `expression` | 一个计算属性名的表达式   |

### 描述

有时需要允许访问返回动态计算值的属性，或者你可能需要反映内部变量的状态，而不需要使用显式方法调用。在  JavaScript 中，可以使用 `getter` 来实现。虽然可以使用 `getter` 和 `setter` 来创建一个伪属性类型，但是不可能同时将一个 `getter` 绑定到一个属性并且该属性实际上具有一个值。

使用 `get` 语法时应注意以下问题：

- 可以使用数值或字符串作为标识
- 必须不带参数
- 它不能与另一个 `get` 或具有相同属性的数据条目同时出现在一个对象字面量中。

可以通过 `delete` 操作符删除 getter。

### 示例

#### 基本用法

```js
const foo = {
  arr: [0, 1, 2, 3, 4],
  get num(){
    // 只有数组长度等于 5 时，获取 foo.b 才返回数组索引为 1 的值
    if (this.arr.length === 5) {
      return this.arr[1]
    }
  }
}

console.log(foo.num)
// 1
```

#### 删除对象的取值函数

```js
const foo = {
  get name() {
    return 'BINGO!'
  }
}

console.log(foo.name)
// Output: 'BINGO!'

delete foo.name
// true

console.log(foo.name)
// Output: undefined
```

#### 在现有对象上定义取值函数

可以使用 `defineProperty` 方法在现有对象上定义取值函数。

```js
let foo = {
  a: 0
};

Object.definedProperty(foo, "b", {
  get: function () {
    return this.a + 1;
  }
});

console.log(foo.b);
// Runs the getter, which yields a + 1 (which is 1)
```

#### 计算属性名

```js
const expr = 'foo';

const obj = {
  get [expr]() { return 'bar'; }
}

console.log(obj.foo)
// 'bar'
```

## 存值函数

当尝试设置属性时，`set` 语法将对象属性绑定到要调用的函数。

### 语法

```js
{set prop(val) { . . . }}
{set [expression](val) { . . . }}
```

**参数：**

| 参数       | 说明                                                         |
| :---------- | :------------------------------------------------------------ |
| `prop`       | 要绑定到给定函数的属性值                                     |
| `val`        | 用于保存尝试分配给 `prop` 值的变量的一个别名                 |
| `expression` | 从 ECMAScript 2015 开始，还可以使用一个计算属性名的表达式绑定到给定的函数 |

### 描述

在 JavaScript 中，如果试着改变一个属性的值，那么对应的 `setter` 将被执行。`setter` 经常和 `getter` 连用以创建一个伪属性。不可能在具有真实值的属性上同时拥有一个 `setter` 器。

使用 `set` 语法时请注意：

- 它的标识符可以是数字或字符串
- 它必须有一个明确的参数
- 在对象字面量中，不能为一个已有真实值的变量使用 `set`，也不能为一个属性设置多个 `set`

### 示例

#### 基本用法

```js
const foo = {
  set current(name) {
    this.log.push(name)
  },
  log: []
}

foo.current = 'EN'

console.log(foo.log)
// ['EN']

foo.current = 'ZN'

console.log(foo.log)
// ['EN', 'ZN']
```