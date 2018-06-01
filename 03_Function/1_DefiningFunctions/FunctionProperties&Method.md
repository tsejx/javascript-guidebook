# 函数的属性与方法

## 函数的属性

### `length` 属性

在函数中，`arguments` 对象的 `length` 属性表示实参个数，而函数的 `length` 属性则表示函数希望接受**形参个数**。

```javascript
function sayName(name){
    // do something
}

function sum(num1, num2){
    // do something
}

function sayHi(){
    // do something
}

console.log(sayName.length);	// 1
console.log(sum.length);		// 2
console.log(sayHi.length);		// 0
```

### `name` 属性

函数定义了一个非标准的 `name` 属性，通过这个属性可以访问到给定函数指定的名字，这个属性的值永远等于跟在 `function` 关键字后面的**标识符**，匿名函数的 `name` 属性为空。

```javascript
// IE11-浏览器无效，均输出undefined
// chrome在处理匿名函数的name属性时有问题，会显示函数表达式的名字
function fn(){
    
};
console.log(fn.name); // 'fn'

var fn = function(){
    
};
console.log(fn.name); // ''，在chrome浏览器中会显示'fn'

var fn = function abc(){
    
};
console.log(fn.name); // 'abc'
```

- ES6列入标准

ES6对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5的 `name` 属性，会返回空字符串，而ES6的 `name` 属性会返回实际的函数名。

```javascript
var func1 = function () {
    
};
func1.name // ES5:  ""
func1.name // ES6: "func1"
```

如果将一个具名函数赋值给一个变量，则ES5和ES6的 `name` 属性都返回这个具名函数原本的名字。

```javascript
var bar = function baz() {};
bar.name // ES5: "baz"
bar.name // ES6: "baz"
```

- 构造函数

Function构造函数返回的函数实例，name属性的值为“anonymous”

```javascript
(new Function).name // "anonymous"
```

`bind` 返回的函数，`name` 属性值会加上“bound ”前缀

```javascript
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "
```

### `prototype` 属性

每一个函数都有一个 `prototype` 属性，这个属性指向一个对象的引用，这个对象称做原型对象（Prototype Object）。每一个函数都包含不同的原型对象。将函数用做构造函数时，新创建的对象会从原型对象上继承属性。

```javascript
function fn(){
    // do something
};
var obj = new fn;
fn.prototype.a = 1;
console.log(obj.a); // 1
```

## 函数的方法

每个函数都包含两个非继承而来的方法：`apply()` 和 `call()`。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内 `this` 对象的值。

### `apply()` 方法

`apply()` 方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以是 `Array` 的实例，也可以是 `arguments` 对象。

```javascript
function sum(num1, num2){
    return num1 + num2;
}

function callSum1(num1, num2){
    // 传入this作为this值（因为是在全局作用域中调用的，所以传入的就是window对象）和arguments对象
    return sum.apply(this, arguments);	// 传入 arguments 对象
}

function callSum2(num1, num2){
    // 传入this和一个参数数组
    return sum.apply(this, [num1, num2]);	// 传入数组
}

console.log(callSum1(10, 10));	// 20
console.log(callSum2(10, 10));	// 20
```

在严格模式下，未指定环境对象而调用函数，则 `this` 值不会转型为 `window`。除非明确把函数添加到某个对象或者调用 `apply()` 或`call()`，否则this值将是 `undefined`。

### `call()` 方法

`call()` 方法与 `aplly()` 方法的作用相同，它们的区别仅在于接收参数的方式不同。对于 `call()` 方法而言，第一个参数是 this 值没有变化，变化的是其余参数都直接传递给函数。

```javascript
function sum(num1, num2){
    return num1 + num2;
}

function callSum(num1, num2){
    return sum.call(this, num1, num2);
}

console.log(callSum(10, 10));	// 20
```

### `apply()` 方法和 `call()` 方法区别

`call()` 方法与 `apply()` 方法的作用相同，它们的区别仅仅在于接收参数的方式不同。对于 `call()` 方法而言，第一个参数是 `this` 值没有变化，变化的是其余参数都直接传递给函数。换句话说，在使用 `call()` 方法时，传递给函数的参数必须逐个列举出来。

```javascript
function sum(num1, num2){
    return num1 + num2;
}
function callSum(num1, num2){
    return sum.call(this, num1, num2);
}
console.log(callSum(10,10));   //20
```

至于是使用 `apply()` 还是 `call()`，完全取决于采取哪种函数传递参数的方式最方便。如果打算直接传入 `arguments` 对象，或者包含函数中先接收到的也是一个数组，那么使用 `apply()` 肯定更方便；否则，选择 `call()` 可能更合适 

在非严格模式下，使用函数的 `call()` 或 `apply()` 方法时，`null` 或 `undefined` 值会被转换为全局对象。而在严格模式下，函数的 `this` 值始终是指定的值

```javascript
var color = 'red';
function displayColor(){
    console.log(this.color);
}
displayColor.call(null); // red
```

```javascript
var color = 'red';
function displayColor(){
    'use strict';
    console.log(this.color);
}
displayColor.call(null); // TypeError: Cannot read property 'color' of null
```

## 应用

### 调用对象的原生方法

```javascript
var obj = {};
obj.hasOwnProperty('toString'); 		// false
obj.hasOwnProperty = function (){
  return true;
};
obj.hasOwnProperty('toString'); 	// true
Object.prototype.hasOwnProperty.call(obj, 'toString'); // false
```

### 找出数组最大元素

Javascript不提供找出数组最大元素的函数。结合使用 `apply` 方法和 `Math.max` 方法，就可以返回数组的最大元素。

```javascript
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a);	//	15
```

### 将类数组对象转换成真正的数组

```javascript
Array.prototype.slice.apply({0:1,length:1}); // [1]

// 或者
[].prototype.slice.apply({0:1,length:1}); // [1]
```

### 将一个数组的值push到另一个数组中

```javascript
var a = [];
Array.prototype.push.apply(a,[1,2,3]);
console.log(a); // [1,2,3]

Array.prototype.push.apply(a,[2,3,4]);
console.log(a); // [1,2,3,2,3,4]
```

如果使用 ES6 中的不定参数则非常简单

```javascript
var a  = [...[1,2,3],...[2,3,4]];
console.log(a); // [1,2,3,2,3,4]
```

### 绑定回调函数的对象

由于 `apply()` 方法（或者 `call()` 方法）不仅绑定函数执行时所在的对象，还会立即执行函数，因此不得不把绑定语句写在一个函数体内。更简洁的写法是采用下面介绍的 `bind()` 方法。

```javascript
var o = {};
o.f = function () {
  console.log(this === o);
}
var f = function (){
  o.f.apply(o);
};
$('#button').on('click', f);
```

**bind()**

`bind()` 是ES5新增的方法，这个方法的主要作用就是将函数绑定到某个对象 

```javascript
function f(y){
    return this.x + y; 	// 这个是待绑定的函数
}
var o = {x:1}; 			// 将要绑定的对象
var g = f.bind(o); 		// 通过调用g(x)来调用o.f(x)
g(2); 					// 3
```

**兼容代码**

```javascript
Function.prototype.bind = function(context){
  var self = this;
  return function(){
    return self.apply(context,arguments);
  }
}
```

通常，会把它实现得稍微复杂一点，使得可以填入一些参数。

```javascript
Function.prototype.bind = function(context){
  var self = this,
      context = [].shift.call(arguments),
      args = [].slice.call(arguments);
  return function(){
    return self.apply(context,[].concat.call(args,[].slice.call(arguments)));
  }
}
```

`bind()` 方法不仅是将函数绑定到一个对象，它还附带一些其他应用：除了第一个实参之外，传入`bind()` 的实参也会绑定到 `this`，这个附带的应用是一种常见的函数式编程技术，有时也被称为**'柯里化'(currying)**

```javascript
var sum = function(x,y){
    return x+y;
}
var succ = sum.bind(null,1);
succ(2); // 3，x绑定到1，并传入2作为实参y
function f(y,z){
    return this.x + y + z;
}
var g = f.bind({x:1},2);
g(3); // 6，this.x绑定到1，y绑定到2，z绑定到3
```

使用 `bind()` 方法实现柯里化可以对函数参数进行拆分

```javascript
function getConfig(colors,size,otherOptions){
    console.log(colors,size,otherOptions);
}
var defaultConfig = getConfig.bind(null,'#c00','1024*768');
defaultConfig('123');//'#c00 1024*768 123'
defaultConfig('456');//'#c00 1024*768 456'
```

**toString()**

函数的 `toString()` 实例方法返回函数代码的字符串，而静态 `toString()` 方法返回一个类似 `[native code]`的字符串作为函数体。

```javascript
function test(){
    alert(1);//test
}
test.toString();/*"function test(){
                    alert(1);//test
                  }"*/
Function.toString();//"function Function() { [native code] }"
```

**toLocaleString()**

函数的 `toLocaleString()` 方法和 `toString()` 方法返回的结果相同。

```javascript
function test(){
    alert(1);//test
}
test.toLocaleString();/*"function test(){
                    alert(1);//test
                  }"*/
Function.toLocaleString();//"function Function() { [native code] }"
```

**valueOf()**

函数的 `valueOf()` 方法返回函数本身。

```javascript
function test(){
    alert(1);//test
}
test.valueOf();

/*function test(){
	alert(1);//test
 }*/
typeof test.valueOf();	// 'function'
Function.valueOf();		// Function() { [native code] }
```
