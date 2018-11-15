# Function.prototype.bind()

`bind() ` 方法创建一个新的函数, 当被调用时，将其 `this` 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

## 语法

```javascript
func.bind( thisArg [, arg1 [, arg2 [, ...]]] )
```

### 参数

| 参数             | 类型                                     | 描述                                                         |
| ---------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `func`           | `Function` 类型                          |                                                              |
| `thisArg`        | 可选，`Object` 类型                      | 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 `new` 操作符调用绑定函数时，该参数无效。 |
| `arg1,arg2,argN` | 可选，`Array` 类型或 `TypedArray `  类型 | 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。 |

### 返回值

   返回由指定的 `this` 值和初始化参数改造的原函数拷贝

### 描述

`bind()` 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的 `call` 属性）。当**新函数**被调用时 `this` 值绑定到 `bind()` 的第一个参数，该参数不能被重写。绑定函数被调用时，`bind()` 也接受预设的参数提供给原函数。一个绑定函数也能使用 `new` 操作符创建对象：这种行为就像把原函数当成构造器。提供的 `this` 值被忽略，同时调用时的参数被提供给模拟函数。

## 示例

### 标准示例

`bind()` 最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的 `this` 值。JavaScript 新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，希望方法中的 `this` 是原来的对象（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题。

```javascript
this.x = 9;

var module = {
    x: 8,
    getX: function(){
        return this.x
    }
};

module.getX();	// return 8

var retrieveX = module.getX;
retrieveX();	// return 9

var boundGetX = retrieveX.bind(module);
boundGetX();	// return 8
```

### 偏函数

`bind()` 的另一个最简单的用法是使一个函数拥有预设的初始参数。这些参数（如果有的话）作为 `bind()` 的第二个参数跟在 `this`（或其他对象）后面，之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。

```javascript
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); 			// [1, 2, 3]

// Create a function with a preset leading argument
var defaultsList = list.bind(undefined, 10);

var list2 = defaultsList(); 			// [10]
var list3 = defaultsList(1, 2, 3); 	// [10, 1, 2, 3]
```

### 配合定时器

在默认情况下，使用 `window.setTimeout()` 时，`this ` 关键字会指向 `window` （或全局）对象。当使用类的方法时，需要 `this` 引用类的实例，你可能需要显式地把  `this`  绑定到回调函数以便继续使用实例。

```javascript
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' + this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法
```

