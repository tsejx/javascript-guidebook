---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数内部
  order: 9
title: 函数原型对象方法
order: 2
---

# 函数原型对象方法

## Function.prototyp.apply()

`apply()` 函数用于调用当前函数，并可同时使用指定对象作为本次函数执行时函数内部的 `this` 指针引用。

## 语法

```js
func.apply( [thisArg [, argsArray]])
```

## 参数

| 参数        | 类型                                   | 描述                                                                                                                                                                                                                                                                                                              |
| ----------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `func`      | `Function` 类型                        | 当前函数调用 `apply()` 函数的函数，通常为 `this` （函数内部执行）。                                                                                                                                                                                                                                               |
| `thisArg`   | 可选，`Object` 类型                    | 执行函数时，函数内部 `this` 指针引用的对象。需要注意的是，使用的 `this` 值并不一定是该函数执行时真正的 `this` 值，如果这个函数处于非严格模式下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象（浏览器中就是 Window 对象），同时值为原始值（数字，字符串，布尔值）的 `this` 会指向该原始值的包装对象。 |
| `argsArray` | 可选，`Array` 类型或 `TypedArray` 类型 | 一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值 `为null` 或 `undefined`，则表示不需要传入任何参数。从 ECMAScript 5 开始可以使用类数组对象。                                                                                                                                |

## 示例

### 基本用法

```js
const a = {
    name: 'Cherry',

    func1: function(){
		console.log(this.name)
	}

	func2: function(){
		setTimeout(function(){
			this.func1()
		}.apply(a), 100)
	}
}

a.func2()		// Cherry
```

## Function.prototype.call()

`call()` 函数用于调用当前函数，并可同时使用指定对象作为本次执行时函数内部的 `this` 指针引用。

## 语法

```js
func.call( [thisArg [, arg1 [, arg2 [, argN...]]]] )
```

## 参数

| 参数             | 类型                                   | 描述                                                                                                                                                                                                                                                                                                               |
| ---------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `func`           | `Function` 类型                        | 当前函数调用 `call()` 函数的函数，通常为 `this` （函数内部执行）。                                                                                                                                                                                                                                                 |
| `thisArg`        | 可选，`Object` 类型                    | 在*fun*函数运行时指定的 `this` 值*。*需要注意的是，指定的 `this` 值并不一定是该函数执行时真正的 `this` 值，如果这个函数处于非严格模式下，则指定为 `null` 和 `undefined` 的 `this` 值会自动指向全局对象（浏览器中就是 Window 对象），同时值为原始值（数字，字符串，布尔值）的 `this` 会指向该原始值的自动包装对象。 |
| `arg1,arg2,argN` | 可选，`Array` 类型或 `TypedArray` 类型 | 指定的参数列表。                                                                                                                                                                                                                                                                                                   |

## 示例

```js
const sayName = function () {
  console.log(this.name);
};

const peter = {
  name: 'peter',
};

sayName.call(peter); // peter
```

```js
function Person1() {
  this.name = 'person1';
  this.sayName = function () {
    alert(this.name);
  };
}

function Person2() {
  this.name = 'person2';
}

var sam = new Person2();

Person1.call(sam);

sam.sayName(); // person1
```

## Function.prototype.bind()

`bind()` 方法创建一个新的函数, 当被调用时，将其 `this` 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

## 语法

```js
func.bind( thisArg [, arg1 [, arg2 [, ...]]] )
```

## 参数

| 参数             | 类型                                   | 描述                                                                                                      |
| ---------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `func`           | `Function` 类型                        |                                                                                                           |
| `thisArg`        | 可选，`Object` 类型                    | 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 `new` 操作符调用绑定函数时，该参数无效。 |
| `arg1,arg2,argN` | 可选，`Array` 类型或 `TypedArray` 类型 | 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。                                            |

## 描述

`bind()` 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的 `call` 属性）。当**新函数**被调用时 `this` 值绑定到 `bind()` 的第一个参数，该参数不能被重写。绑定函数被调用时，`bind()` 也接受预设的参数提供给原函数。一个绑定函数也能使用 `new` 操作符创建对象：这种行为就像把原函数当成构造器。提供的 `this` 值被忽略，同时调用时的参数被提供给模拟函数。

## 示例

### 代码示例

`bind()` 最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的 `this` 值。JavaScript 新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，希望方法中的 `this` 是原来的对象（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题。

```js
this.x = 9;

var module = {
  x: 8,
  getX: function () {
    return this.x;
  },
};

module.getX(); // return 8

var retrieveX = module.getX;
retrieveX(); // return 9

var boundGetX = retrieveX.bind(module);
boundGetX(); // return 8
```

### 偏函数

`bind()` 的另一个最简单的用法是使一个函数拥有预设的初始参数。这些参数（如果有的话）作为 `bind()` 的第二个参数跟在 `this`（或其他对象）后面，之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument
var defaultsList = list.bind(undefined, 10);

var list2 = defaultsList(); // [10]
var list3 = defaultsList(1, 2, 3); // [10, 1, 2, 3]
```

### 配合定时器

在默认情况下，使用 `window.setTimeout()` 时，`this` 关键字会指向 `window` （或全局）对象。当使用类的方法时，需要 `this` 引用类的实例，你可能需要显式地把 `this` 绑定到回调函数以便继续使用实例。

```js
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function () {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function () {
  console.log('I am a beautiful flower with ' + this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom(); // 一秒钟后, 调用'declare'方法
```

##
