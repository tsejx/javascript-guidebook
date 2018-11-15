# this





## 调用位置

在理解 `this` 的绑定过程之前，首先要理解**调用位置**：调用位置就是函数在代码中被调用的位置（而不是声明的位置）。

最重要的是要分析调用栈（就是为了到达当前执行位置所调用的所有函数）。我们关心的调用位置就在当前正在执行的函数的前一个调用中。



```javascript
function baz() {
    // 当前调用栈是：baz
    // 因此，当前调用位置是全局作用域
    
    console.log("baz");
    bar();	// <-- bar 的调用的位置
}

function bar() {
    // 当前调用栈是 baz -> bar
    // 因此，当前调用调用位置在 baz 中
    console.log("bar");
    foo();	// <-- foo 的调用位置
} 

function foo() {
    // 当前调用栈是 baz -> bar -> foo
    // 因此，当前调用位置在 bar 中
    console.log("foo");
}

baz();	// <-- baz 的调用位置
```

注意我们是如何（从调用栈中）分析出真正的调用位置，因为它决定了 `this` 的绑定。



## 绑定规则

函数的执行过程中调用位置决定 `this` 的绑定对象。

你必须找到调用位置，然后判断需要应用下面四条规则中的哪一条。我们首先会分别解释这四条规则，然后解释多条规则都可用时它们的优先级如何排列。

### 默认绑定

首先要介绍的是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则。

```javascript
function foo() {
    console.log(this.a);
}

// 声明在全局作用域中的变量就是全局对象的一个同名属性
var a = 2;

// 调用 foo 函数时，this.a 被解析成了全局变量 a
// 因为在本例中，函数调用时应用了 this 的默认绑定，因此 this 指向全局对象
// 分析调用位置来获知 foo 是如何调用的
// foo 函数直接使用不带任何修饰的函数引用进行调用，因此只能使用默认绑定，无法应用其他规则
foo();		// 2
```

如果使用严格模式（strict mode），则不能将全局对象用于默认绑定，因此 `this` 会绑定到 `undefined`。

```javascript
function foo() {
    "use strict";
    
    console.log( this.a );
}

var a = 2;

foo();		// TypeError:this is undefined
```

这里有一个微妙但是非常重要的细节，虽然 `this` 的绑定规则完全取决于调用位置，但是只有 `foo()` 运行在非严格模式下时，默认绑定才能绑定到全局对象；在严格模式下调用 `foo` 则不影响默认绑定。

```javascript
function foo() {
    console.log( this.a )
}

var a = 2;

(function foo() {
    "use strict";
    
    foo();	// 2
})()
```

**注意**：通常来说你不应该在代码中混合使用严格模式和非严格模式。整个程序要么严格要么非严格。然而，有时候你可能会用到第三方库，其严格程度和你代码有所不同，因此一定要注意这类兼容性细节。

### 隐式绑定

另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含，不过这种说法可能会造成一些误导。

```javascript
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

obj.foo();	// 2
```

首先需要注意的是 `foo()` 的声明方式，及其之后是如何被当作引用属性添加到 `obj` 中的。但是无论是直接在 `obj` 中定义还是先定义再添加为引用属性，这个函数严格来说都不属于 `obj` 对象。

然而，调用位置会使用 `obj` 上下文来引用函数，因此你可以说函数被调用时 `obj` 对象“拥有”或者“包含”它。

无论你如何称呼这个模式，当 `foo()` 被调用时，它的前面确实加上了对 `obj` 的引用。当函数引用有上下文时，隐式绑定规则会把函数调用中的 `this` 绑定到这个上下文对象。因为调用 `foo()` 时 `this` 被绑定到 `obj` ，因此 `this.a` 和 `obj.a` 是一样的。

对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。

```javascript
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
}

obj1.obj2.foo();		// 42
```

#### 隐式丢失

一个最常见的 `this` 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 `this` 绑定到全局对象或者 `undefined` 上，取决于是否是严格模式。

```javascript
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo;	// 函数别名

var a = "oops, global";	// a 是全局对象的属性

bar();		// "oops, global"
```

虽然 `bar` 是 `obj.foo` 的一个引用，但是实际上，它引用的是 `foo` 函数本身，因此此时的 `bar()` 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。 

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：

```javascript
function foo() {
    console.log( this.a ); 
}

function doFoo(fn) {
    // fn 其实引用的是 foo
    
    fn();		// <--调用位置
}

var obj = {
    a: 2,
    foo: foo
}

var a = "opps, global";		// a 是全局对象的属性

doFoo( obj.foo );			// "opps, global"
```

参数传递其实是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和尚一个例子一样。

如果把函数传入语言内置的函数而不是传入你自己声明的函数，结果是一样的，没有区别。

```javascript
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var a = "opps, global";		// a 是全局对象的属性

setTimeout(obj.foo, 100);	// "opps, global"
```

```javascript
// JavaScript 环境中内置的 setTimeout() 函数实现和下面的伪代码类似：
function setTimeout(fn, delay) {
    // 等待 delay 毫秒
    fn();	// <-- 调用位置
}
```

回调函数丢失 `this` 绑定是非常常见的。除此之外，还有一种情况 `this` 的行为会出乎我们意料：调用回调函数的函数可能会修改 `this`。在一些流行的 JavaScript 库中事件处理器会把回调函数的 `this` 强制绑定到触发事件的 DOM 元素上。这在一些情况下可能很有用，但是有时它可能会让你感到非常郁闷。遗憾的是，这些工具通常无法选择是否启用这个行为。

无论是哪种情况，`this` 的改变都是意想不到的，实际上你无法控制回调函数的执行方式，因此就没有办法控制调用位置以得到期望的绑定。之后我们会介绍如何通过固定 `this` 来修复这个问题。

### 显式绑定

就像我们刚才看到的那样，在分析隐式绑定时，我们必须在一个对象爱你个内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把 `this` 间接（隐式）绑定到这个对象上。

JavaScript 中的“所有”函数都有一些有用的特性（这和它们的 `[[Prototype]]` 有关），可以解决这个问题。具体点说，可以使用函数 `call()` 和 `apply()` 方法。严格来说，JavaScript 的宿主环境有时会提供一些非常特殊的函数，他们并没有这两个方法。但是这样的函数非常罕见，JavaScript 提供了绝大多数函数以及你自己创建的所有函数都可以使用 `call()` 和 `apply()` 方法。

通过 `foo.call()` ，我们可以在调用 `foo` 时强制把它的 `this` 绑定到 `obj` 上。

如果你传入了一个原始值u（字符串类型、布尔类型或者数字类型）来当作 `this` 的绑定对象，这个原始值会被转换成它的对象形式（也就是 `new String` 、`new Boolean` 或者 `new Number()`）。这通常被称为“装箱”。

#### 硬绑定

硬绑定可以解决之前提出的丢失绑定的问题。

```javascript
function foo() {
    console.log( ths.a );
}

var obj = {
    a: 2
}

var bar = function() {
    foo.call(obj)
}

bar();	// 2
setTimeout( bar, 100);	// 2

// 硬绑定的 bar 不可能再修改它的 this
bar.call( window );		// 2
```

我们创建了函数 `bar()`，并在它的内部手动调用了 `foo.call(obj)` ，因此强制把 `foo` 的 `this` 绑定到了 `obj` 。无论之后如何调用函数 `bar`，它总会手动在 `obj` 上调用 `foo`。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。

硬绑定的典型应用场景就是创建一个包裹函数，负责接收参数并返回值：

```javascript
function foo(something) {
    console.log( this.a, something);
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function() {
    return foo.apply( obj, arguments );
};

var b = function() {
    return foo.apply(obj, arguments);
}

var b = bar( 3 );	// 2 3
console.log( b );	// 5
```

另一种使用方法是创建一个可以重复使用的辅助函数。

```javascript
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

// 简单的辅助绑定函数
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments );
    }
}

var obj = {
    a: 2
}

var bar = bind( foo, obj);

var b = bar( 3 );		// 2 3
console.log( b );		// 5
```

由于硬绑定是一种非常常用的模式，所以 ES5 提供了内置的方法 `Function.prototype.bind` 。

```javascript
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 );	// 2 3
console.log( b );	// 5
```

`bind()` 会返回一个硬编码的新函数，它会把你指定的参数设置为 `this` 的上下文并调用原始函数。

#### API 调用的上下文

第三方库的许多函数，以及 JavaScript 语言和宿主环境中许多新的内置函数，都提供了一个可选的参数，通常被称为“上下文”（context），其作用和 `bind()` 一样，确保你的回调函数使用指定的 `this` 。

```javascript
function foo(el) {
    console.log( el, this.id );
}

var obj = {
    id: "awesome"
};

// 调用 foo(..) 时把 this 绑定到 obj
[1, 2, 3].forEach( foo, obj);
// 1 awesome 2 awesome 3 awesome
```

这些函数实际上就是通过 `call()` 或者 `apply()` 实现了显式绑定，这样你可以少写一些代码。  

### `new` 绑定

这是第四条也是最后一条 `this` 的绑定规则，在讲解它之前我们首先需要澄清一个非常常见的关于 JavaScript 中函数和对象的误解。

在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 `new` 初始化类时会调用类中的构造函数。通常形式是这样的。

```javascript
something = new MyClass();
```

JavaScript 也有一个 `new ` 操作符，使用方法看起来也和那些面向类的语言一样，绝大多数开发者都认为 JavaScript 中 `new` 的机制也和那些语言一样。然而， JavaScript 中 `new` 的机制实际上和面向类的语言完全不同。

首先我们重新定义一下 JavaScript 中的“构造函数”。在 JavaScript 中，构造函数只是一些使用 `new` 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类，实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被 `new` 操作符调用的普通函数而已。

举例来说，思考一下 `Number()` 作为构造函数时的行为，ES5.1 中这样描述它：

> 15.7.2 Number 构造函数
>
> 当 Number 在 new 表达式中被调用时，它是一个构造函数：它会初始化新创建的对象。

所以，包括内置对象函数在内的所有函数都可以用 `new` 来调用，这种函数调用被称为构造函数调用。这里有一个重要但是非常细微的区别：实际上并不存在所谓的“构造函数”，只是对于函数的“构造调用”。

使用 `new` 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造）一个全新的对象
2. 这个新对象会被执行 `[[Prototype]]` 连接
3. 这个新对象会绑定到函数调用的 `this`
4. 如果函数没有返回其他对象，那么 `new` 表达式中的函数调用会自动返回这个新对象



## 优先级

上文介绍了函数调用中 `this` 绑定的四条规则，你需要做的就是找到函数的调用位置并判断应用哪条规则。但是，如果某个调用位置应用多条规则，则必须给这些规则设定优先级。

毫无疑问，默认绑定的优先级是四条规则中最低的，所以我们先不考虑它。

#### 隐式绑定和显式绑定

```javascript
function foo() {
    console.log( this.a );
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

obj1.foo();			// 2
obj2.foo();			// 3

obj1.foo.call( obj2 );		// 3
obj2.foo.call( obj1 );		// 2
```

可以看到，显式绑定优先级更高，也就是说在判断时应当先考虑是否可以存在显式绑定。

#### `new` 绑定和隐式绑定

```javascript
function foo(something) {
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj.a );		// 2

obj1.foo( obj2, 3);
console.log( obj.a );		// 3

var bar = new obj1.foo( 4 );
console.log( obj1.a );		// 2
console.log( bar.a );		// 4
```

可以看到 `new` 绑定比隐式绑定优先级高。但是 `new` 绑定和显式绑定谁的优先级更高呢？

`new` 和 `call/apply` 无法一起使用，因此无法通过 `new foo.call(obj1)` 来直接进行测试。但是我们可以使用硬绑定来测试他俩的优先级。

在看代码之前先回忆一下硬绑定是如何工作的。`Function.prototype.bind(..)` 会创建一个新的包装函数，这个函数会忽略它当前的 `this` 绑定（无论绑定的对象是什么），并把我们提供的对象绑定到 `this` 上。

这样看起来硬绑定（也是显式绑定的一种）似乎比 `new` 绑定的优先级更高，无法使用 `new` 来控制 `this` 绑定。

```javascript
function foo(something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a );			// 2

var baz = new bar( 3 );
console.log( obj1.a );			// 2
console.log( baz.a );			// 3
```



## 绑定例外



### 被忽略的 `this`





### 间接引用





### 软绑定



## `this` 词法









 

