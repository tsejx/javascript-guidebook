---
nav:
  title: 基本语法
  order: 1
group:
  title: 运算符
  order: 5
title: in
order: 1
---

# in

`in` 运算符用于判断属性是否存在于对象中。

## 语法

```js
key in obj;
```

### 参数

| 参数     | 说明                                                                                     |
| -------- | ---------------------------------------------------------------------------------------- |
| `key`    | 一个字符串类型或者 Symbol 类型的属性名或者数组索引（非 Symbol 类型将会强制转为字符串）。 |
| `object` | 检查（或其原型链）是否包含具有指定名称的属性的对象。                                     |

## 示例

### 代码示例

**数组**

```js
var cars = new Array('Toyota', 'Nissan', 'Mercedes', 'Buick', 'Porsche');
0 in cars;
// true

1 in cars;
// true

6 in cars;
// false

'Mercedes' in cars;
// false（必须使用索引号，而不是数组元素的值）

'length' in cars;
// rue（length是一个数组属性）

Symbol.iterator in cars;
// true（数组可迭代，只在 ES2015+ 上有效）
```

**内置对象**

```js
'PI' in Math;
//  true
```

**自定义对象**

```js
var myCar = { make: 'Honda', model: 'Accord', year: '1998' };
'make' in myCar;
'model' in myCar;
```

`in` 右操作数必须是一个对象值

例如：你可以指定使用 `String` 构造函数创建的字符串，但不能指定字符串文字。

```js
var color1 = new String('green');
'length' in color1;
//   true

var color2 = new 'coral'();
'length' in color2;
// 报错(color2不是对象)
```

### 值为 `undefined` 的对象属性

如果你使用 `delete` 运算符删除了一个属性，则 `in` 运算符对所删除属性返回 `false`。

```js
var cars = new Array('Toyota', 'Nissan', 'Mercedes', 'Buick', 'Porsche');
delete cars[3];

3 in cars;
//   false
```

如果你只是将一个属性的值赋值为 `undefined`，而没有删除它，则 `in` 运算仍然会返回 `true`。

```js
var cars = new Array('Toyota', 'Nissan', 'Mercedes', 'Buick', 'Porsche');
cars[3] = undefined;

3 in cars;
//  true
```

### 继承属性

如果一个属性是
从原型链上继承来的，`in` 运算符也会返回 `true`。

```js
'toString' in {};
//  true
```
