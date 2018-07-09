# 块作用域

> 任何一对花括号中的语句集都属于一个块，在这之中定义的所有变量在代码块外都是不可见的，我们称之为块级作用域。

尽管函数作用域是最常见的作用域单元，也是现行大多数 Javascript 最普遍的设计方法，但其他类型的作用域单元也是存在的，并且通过使用其他类型的作用域单元甚至可以实现维护起来更加优秀、简洁的代码，比如块作用域。随着ES6的推广，块作用域也将用得越来越广泛。

## var

ES5及之前是木有块级变量这个说法的，常规性是用**闭包**来防止变量泄露; 
我来列出下ES5 var声明的一些特点

1. 函数内的变量若是带 `var` 声明，则会覆盖外部的全局变量**优先使用**；若是函数内部声明变量不带 `var` 声明，则直接**覆盖同名的全局变量**
2. 函数内存在**变量提升**的情况，可以先使用后声明
3. for循环中的 `var` 会污染全局【不局限于循环内】

```js
// 
var foo = 5;
function bar(){
    var foo = 3;
    console.log(foo);
}
bar(); // 输出结果为 3
```

```js
// 变量提升
var foo = 5;
function bar(){
    console.log(foo);
    var foo = 3;

}
bar(); // 输出结果为 undefined, JS允许不存在的变量先使用,默认会初始化为一个 undefined
```

```js
// 3. 
for(var i = 0 ; i < 9 ; i++){
    console.log("循环内部"+i);
}

console.log(i); 		// 输出结果为 9 
console.log(i * 5); 	// 输出结果为 45
```

## let

`let` 可以理解为“更完美的 `var`”，使用方法很简单；

```js
let foo = 3;
```

使用方法基本和 `var` 相同，而且声明的变量只在其块和子块中可用，这点也与 `var` 相同。 二者之间最主要的区别在于 `var` 声明的变量的作用域是整个封闭函数。

```js
function foo() {
    if(true) {
        var temp = 5;
         console.log(temp);
    }
    
    console.log(temp);
}

function bar(） {
    if(true) {
        let temp = 5;
        console.log(temp);
    }
    
    console.log(temp);
}

foo(); // 5 和 5
bar(); // 5 和 "ReferenceError: temp is not defined
```

`let` 声明的变量的作用域只有外层块，而不是整个外层函数。

我们可以利用这个特性来替代立即执行函数（IIFE）。

```js
// IIFE
(function(){
    var temp = 1;
    /*
     * other code
     */
}())

// Block 块级
{
    let temp = 1;
    /*
     * other code
     */
}
```

**特点汇总：**

- `let` 不允许重新声明同名变量，会抛出异常，具有唯一性；
- `let` 不允许没声明就使用，会抛出异常，只有执行该声明的时候才能使用；
- `let` 有自己特色的闭包特性，比如在`for`循环的应用中。

## const

`const` 的用法跟 `let` 差不多，但是 `const` 一定要初始化, 不初始化是会报错的。

```js
// 用法
const temp = 4;

// 没有初始化报错
const t; 	// SyntaxError: Missing initializer in const declaration
```

`const` 是块级作用域，`const` 跟 `let` 的语义相似，就是用来声明常量的，一旦声明了就不能更改。

⚠️值得注意的是 `const` 声明的变量记录的是**指针**，不可更改的是**指针**,如果 `const` 所声明的是对象，对象的内容还是可以修改的。

```js
// 重新赋值声明导致报错
const PI = 3.14;
PI = 3.1415926; // TypeError: Assignment to constant variable.

// 给对象增加属性不会导致 obj 的指针变化，所以不会报错
const obj = { foo: 2 };
obj.bar = 3;
console.log(obj); // {foo: 2, bar: 3}
```

**特点汇总：**

- 与 `let` 一样，具有唯一性，不可重复声明；
- 可以将 `const` 声明的基本类型变量理解为只读变量，但是其声明的引用类型变量则是可编辑的。

## 暂时性死区

使用 `let` 或 `const` 声明的变量，在声明没有到达之前，访问该变量都会导致报错，就连一直以为安全的 `typeof` 也不再安全。

```js
// TDZ1
function foo() {
    // TDZ 开始
    console.log(typeof temp);
    let temp = 5; // TDZ 结束
}

foo(); // ReferenceError: temp is not defined 
```

报的错是 `ReferenceError`，如果使用 `var` 声明的话，`temp` 输出应该是 `undefined`，从 `let` 声明的变量的块的第一行，到声明变量之间的这个区域被称作暂时性死区（TDZ）。凡是在这个区域使用这些变量都会报错。

```js
// TDZ2
function bar() {
    console.log(typeof temp);
}

bar(); // undefined
```

看到上面两个例子仔细思考有没有觉得想到点什么？

在函数里没有用 `let` 声明 `temp` 的时候，`temp` 是 undefined，讲道理在 `let` 声明前也应该是 temp，然而 `foo` 函数却报了错，证明了就算是在未到达 `let` 声明的地方，但是在用 `let` 之前已经起到了作用。这是不是说明其实 `let` 也有提升（这个提升并不是 `var` 的那种提升，只是有影响），只是在 TDZ 使用的时候报错了，而不是 `undefined`。

事实上，当 JavaScript 引擎检视下面的代码块有变量声明时，对于 `var` 声明的变量，会将声明提升到函数或全局作用域的顶部，而对 `let` 或 `const` 的时候会将声明放在暂时性死区内。任何在暂时性死区内访问变量的企图都会导致“运行时”错误（runtime error）。只有执行到变量的声明语句时，该变量才会从暂时性死区内被移除并可以安全使用。

 ## 禁止重复声明

在同一个块内，`let` 和 `const` 不能声明相同的标识符。禁止的情况包括：

- `let` 或 `const` 和 `let` 或 `const`
- `var` 和 `let` 或者 `const`
- 函数参数与 `let` 或 `const`

```js
// let 和 let
let foo = 1;
let foo = 2;

// let 和 const
let foo = 1;
const foo = 2;

// var 与 let
var foo = 1;
let foo = 2;

// 函数参数与 let
function bar(foo, baz) {
    let foo = 1;
    const baz = 2;
}
```

以上情况都是会报 SyntaxError。

## 显式块级作用域

但是在嵌套的作用域内使用 `let` 声明同一变量是被允许的。这个嵌套的作用域，在 ES6 中又称显式块级作用域。

```js
var foo = 1;

{
    // 不会报错
    let = 2;
    // other code
}
```

同时因为是 `let` 和 `const` 是块级作用域，声明的变量在当前块使用完之后就会被释放，所以就算使用相同的标识符也不会覆盖外部作用域的变量, 而 `var` 是会覆盖外部作用域的变量的。

```js
function foo() {
    var bar = 1;
    {
        let bar = 2;
    }
    
    console.log(bar);
}

function zoo() {
    var bar = 1;
    {
        var bar = 2;
    }
    
    console.log(bar);
}

foo(); // 1
zoo(); // 2
```

## 最佳实践

在 ES6 的发展阶段，被广泛认可的变量声明方式是：默认情况下应当使用 `let` 而不是 `var` 。对于多数 JavaScript 开发者来说， `let` 的行为方式正是 `var` 本应有的方式，因此直接用 `let` 替代 `var` 更符合逻辑。在这种情况下，你应当对**需要受到保护的变量**使用 `const`。

在默认情况下使用 `const` ，而只在你知道变量值**需要被更改**的情况下才使用 `let` 。这在代码中能确保基本层次的不可变性，有助于防止某些类型的错误。
