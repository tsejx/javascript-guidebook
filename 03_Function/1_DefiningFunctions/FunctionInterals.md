# 函数内部属性

## `arguments`

`arguments` 对象是所有函数中可用的局部变量。它引用着函数的实参，可以用数组下标的方式 `[]` 引用 `arguments` 的元素。

### `arguments` 对象介绍

#### 参数可设置

参数可以被设置。

```javascript
arguments[1] = 'new value';
```

#### 伪数组对象

`arguments` 对象不是一个 `array`，是一个伪数组对象，它有 `length` 属性，可以 `arguments[i]` 来访问对象中的元素，但它不能用数组的一些方法，例如 `push`，`pop`，`slice` 等。

但是可转换为真正的数组。

```javascript
let args = Array.prototype.slice.call(arguments); 

let args = [].slice.call(arguments);
```

你还可以使用 `Array.from()` 方法或 `spread` 运算符将 `arguments` 转换为真正的数组：

```javascript
let args = Array.from(arguments);
let args = [...arguments];
```

####  `length` 属性

`arguments` 的 `length` 属性，表示 `function` 函数实际所传参数的个数。`函数名.length` 可以获取函数期望的传参个数。

```javascript
function argLength(a, b, c){
    let expectation = arguments.length;	// 实际传参个数
    let reality = argTest.length;		// 期望传参个数
    
    console.log(expectation, reality);
}

argLength(1, 2);
argLength(1, 2, 3);
argLength(1, 2, 3, 4);
```

与其他程序设计语言不同，ECMAScript 不会验证传递给函数的参数个数是否等于函数定义的参数个数。开发者定义的函数都可以接受任意个数的参数（根据 Netscape 的文档，最多可接受 255 个），而不会引发任何错误。任何遗漏的参数都会以 `undefined` 传递给函数，多余的函数将忽略。

#### 参数访问

`arguments` 对象的参数访问可以用 `arguments[i]` 来访问函数所传的参数。

```javascript
function argVisit(a, b, c){
    let arg = [];
    for (let i = 0, i < arguments.length, i++){
        arg.push(arguments[i]);
    }
    console.log(arg);
}

argVisit(1, 2);			// [1, 2]
argVisit(1, 2, 3);		// [1, 2, 3]
argVisit(1, 2, 3, 4);	// [1, 2, 3, 4]
```

#### `callee` 调用

`arguments` 的 `callee` 属性可以调用函数本身，当函数正在执行时才可调用，可以实现方法的递归调用。

```javascript
function argCallee(a, b, c){
    let e = arguments.callee.toString();
    console.log(e);
}

argCallee();	// 打印出函数本身
```

#### `Function` 对象 `caller` 属性

Function 对象的 `caller` 属性可以指向当前函数的调用者，当调用者函数正在执行时才可调用。

```javascript
function callerTest(){
    if (callTest.caller){
        const caller = callerTest.caller.toString();
        
       	console.log(caller);
	} else {
		console.log("no caller");
    }
}

function handler(){
    callerTest();
}

function handlerToHandler(){
    handler()
}

callerTest();			// no caller
handler();				// 返回调用者handler函数
handlerToHandler()；		// 返回调用者handler函数
```

### `arguments` 的作用

#### 模拟函数重载

方法重载是指在一个类中定义多个同名的方法，但要求每个方法具有不同的参数的类型或参数的个数。

Javascript 并没有重载函数的功能，但是 `arguments` 对象能够模拟重载。

```javascript
// 普通方法实现方法重载
function reloadCommon (a, b, c) {
    if (a && b && c){
        console.log(a + b + )
	} else if (a && b) {
		console.log(a + b)
    } else {
		console.log(a)
    }
}
    
reloadCommon();				// undefined
reloadCommon(11, 22);			// 23
reloadCommon(11, 22, 33);		// 36
```

```javascript
// Arguments对象实现方法重载
function reloadArg(){
	var sum = 0;
	for(let i=0;i<arguments.length;i++){
		sum += arguments[i];
	}
	console.log(sum);
}

reloadArg();			// 0
reloadArg(11, 22)		// 23
reloadArg(11, 22, 33)	// 36
```

```javascript
// ES6实现方法重载
function reloadES6(...nums){
	var sum = 0;
	for(var i=0;i<nums.length;i++){
		sum += nums[i];
	}
	console.log(sum);
}

reloadES6();          // 0
reloadES6(11,12);     // 23
reloadES6(11,12,13);  // 36
```

#### 递归调用

实现匿名函数的递归调用。

```javascript
// 实现一个阶乘函数
function factorial(n){
    if (n === 1){
        return 1;
    } else {
        n * arguments.callee(n-1);
    }
}

factorial(1);	// 1
factorial(5);	// 120(5*4*3*2*1)
```

定义阶乘函数一般都要用到递归算法，在函数具名，而且名字不会改变的情况下，这样定义没问题。但问题是这个函数的执行与函数名紧紧耦合在一起。为了消除这种紧密耦合的现象，可以使用 `arguments.callee`。

#### 不定参问题

在函数代码中，使用特殊对象 `arguments` ，开发者无需明确指出参数名，就能访问它们。

```javascript
// example
function sayHi(){
    if (arguments[0] === 'bye'){
        return;
    }
    console.log(arguments[0])
}
```

在函数 `sayhi()` 中，第一个参数是 `message` 。用 `arguments[0]` 也可以访问这个值，即第一个参数的值（第一个参数位于位置0，第二参数位于位置1，依此类推）。

因此，无需明确命名参数，就可以重写函数。

```javascript
function max(){
    const maxNum = Number.NEGATIVE_INFINITY;
    for(let i = 0;i < arguments.length;i++){
        if (arguments[i] > maxNum){
            maxNum =arguments[i]
        }
    }
    return maxNum;
}

max(1, 2, 3, 4, 11, 22, 0);		// 22
max(2, -22, 11, 5);				// 11
```

**ECMAScript6（也称ECMAScript2015）是ECMAScript 标准的最新版本，显著地完善了 JavaScript 中参数的处理方式。除了其它新特性外，我们还可以使用rest参数、默认值、解构赋值等。**

## `this`

`this` 引用的是函数据以执行的环境对象——或者也可以说是 `this` 值（当在网页的全局作用域中调用函数时，`this` 对象引用的就是 window）。

```javascript
window.color = 'red';

let o = { color: 'blue' };

function sayColor(){
    console.log(this.color);
}

sayColor();				// 'red'

o.sayColor = sayColor;
o.sayColor();			// 'blue'
```

- 上面这个函数 saycolor() 是在全局作用域中定义的，它引用了 this 对象
- 由于在调用函数之前，`this` 的值并不的确定，因此 this 可能会在代码执行过程中引用不同的对象。
- 当在全局作用域中调用 `saycColor()`  时，`this` 引用的是全局对象 `window`
- 换句话说，对 `this.color` 求值会转换成对 `window.color` 求值，于是结果就返回了 red 。
- 而当把这个函数赋值给 `o` ，并调用 `o.sayColor()` 时，`this` 引用的是对象 `o`，因此对 `this.color` 求值会转换成对 `o.color` 求值，结果就返回了 blue。

> 函数名仅仅是一个包含指针的变量而已。因此，即使是在不同的环境中执行，全局的 `sayColor()` 函数和 `o.sayColor()` 指向的仍然是一个函数。

**更多关于 `this` 的相关知识，请查阅 [this](https://github.com/tsejx/JavaScript-Guidebook/blob/master/01_BasicConcept/2_Expressions%26Operators/2_Expressions/PrimaryExpression/This.md)。**