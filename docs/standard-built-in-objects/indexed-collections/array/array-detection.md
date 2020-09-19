---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: 数组检测
order: 2
---

# 数组检测

常用的变量是否为数组类型的检测方法通常有五种

- `typeof` 操作符
- `instanceof` 操作符
- 数组对象的构造函数
- `Array.isArray()`
- `Object.prototype.toString()`

## `typeof` 操作符

```js
var arr = [1,2,3,4]
console.log(typeof arr); // 'object'
```

这种方法对于一些常用的类型来说那算是毫无压力，比如Function、String、Number、Undefined等，但是要是检测Array的对象就不起作用了。 利用typeof除了array和null判断为object外，其他的都可以正常判断。

## `instanceof` 操作符

```js
var arr = [1,2,3,4,5];
console.log(arr instanceof Array); // true
```

这个操作符和JavaScript中面向对象有点关系，了解这个就先得了解JavaScript中的面向对象。因为这个操作符是检测对象的原型链是否指向构造函数的prototype对象的。

## 数组对象的构造函数

```js
var arr = [1,2,3,4];
console.log(arr.__proto__.constructor == Array); // true
console.log(arr.constructor == Array); // true
```

在IE早期版本里面 `__proto__` 是没有定义的，而且，仍然有局限性。 `instanceof` 和 `constructor` 的问题在于，它假定单一的全局执行环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在连个以上不同版本的Array
构造函数。如果你从一个人框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

```js
var iframe = document.createElement('iframe'); // 创建iframe
document.body.appendChild(iframe); // 添加到body中
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // 声明数组[1,2,3];
console.log(arr instanceof Array); // false
console.log(arr.constructor === Array); // false
```

## Array.isArray()

```js
var arr = [1,2,3,4,5];
console.log(Array.isArray(arr)); // true
```

## Object.prototype.toString（通用方法）

Object.prototype.toString的行为：首先，取得对象的一个内部属性[[Class]]，然后依据这个属性，返回一个类似于"[object Array]"的字符串作为结果(看过ECMA标准的应该都知道，[[]]用来表示语言内部用到的、外部不可直接访问的属性，称为“内部属性”)。利用这 个方法，再配合call，我们可以取得任何对象的内部属性[[Class]]，然后把类型检测转化为字符串比较，以达到我们的目的。

```js
var arr = [1,2,3,4,5];
function isArray(item){
    return Object.prototype.toString.call(item) === '[object Array]';
}
console.log(isArray(arr)); //
```

call改变toString的this引用为待检测的对象，返回此对象的字符串表示，然后对比此字符串是否是 `'[object Array]'`，以判断其是否是Array的实例。为什么不直接 `o.toString()?` 嗯，虽然Array继承自Object，也会有 toString方法，但是这个方法有可能会被改写而达不到我们的要求，而Object.prototype则是老虎的屁股，很少有人敢去碰它的，所以能一定程度保证其“纯洁性”：)

JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.
这种方法在识别内置对象时往往十分有用，但对于自定义对象请不要使用这种方法。