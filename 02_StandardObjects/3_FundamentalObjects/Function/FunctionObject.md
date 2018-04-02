# Function 对象

**Function 构造函数** 创建一个新的 Function 对象。 在 JavaScript 中, 每个函数实际上都是一个 Function 对象。

## 语法

- **用法一**：充当 `Function` 对象的构造函数，用于结合 `new` 关键字构造一个新的 `Function` 对象。

```javascript
new Function ( [ argName1 [, argName1 [, argNameN... [, funcBody ]]]] )
```

- **用法二**：用作普通函数使用，其行为与用法一（使用 `new` 关键字）完全一致，相当于用法一省略了 `new` 关键字。

```javascript
Function ( [ argName1 [, argName1 [, argNameN... [, funcBody ]]]] )
```

### 参数

| 参数        | 类型          | 说明                                                     |
| ----------- | ------------- | -------------------------------------------------------- |
| `argName1`  | `String` 类型 | 定义的第1个参数的名称                                    |
| `argName2`  | `String` 类型 | 定义的第2个参数的名称                                    |
| `argNameN`  | `String` 类型 | 定义的第N个参数的名称，可以有任意多个                    |
| ` funcBody` | `String` 类型 | 定义的函数主体，即函数内部的执行代码，默认为空字符串("") |

`Function()` 会把传入的**最后一个参数**作为函数定义的执行代码，之前的所有参数均依次作为函数定义的参数。

- 如果没有指定任何参数，则表示该函数没有定义参数列表，函数的执行代码也为空。
- 如果只指定了一个参数，则该参数将被视作函数的执行代码。如果你想定义一个参数、执行代码为空，请传入两个参数，第二个参数为空字符串即可：`new Function("argName1", "")`。

### 返回值

- `Function()` 的返回值是 Function 类型，返回一个函数对象。

### 说明

- 使用 Function 构造器生成的 Function 对象是在函数创建时解析的。这比你使用**函数声明**或者**函数表达式**（`function`）并在你的代码中调用更为低效，因为使用后者创建的函数是跟其他代码一起解析的。
- 所有被传递到构造函数中的参数，都将被视为将被创建的函数的参数，并且是相同的标示符名称和传递顺序。
- 使用 Function 构造器生成的函数，并不会在创建它们的上下文中创建闭包；它们一般**在全局作用域中被创建**。当运行这些函数的时候，它们只能访问自己的本地变量和全局变量，不能访问 Function 构造器被调用生成的上下文的作用域。这和使用带有函数表达式代码的 `eval` 不同。
- 以调用函数的方式调用 Function 的构造函数（不是用 `new` 关键字）跟以构造函数来调用是一样的。


## 属性

| **属性**                         | **说明**                                                     |
| -------------------------------- | ------------------------------------------------------------ |
| `Function.arguments`:-1:         | 以数组形式获取传入函数的所有参数。此属性已被 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments) 替代。 |
| `Function.caller` :warning:      | 获取调用函数的具体对象。(此属性未标准化)                     |
| `Function.length`                | 获取函数的接收参数个数。                                     |
| `Function.name` :warning:        | 获取函数的名称。                                             |
| `Function.displayName` :warning: | 获取函数的 display name。                                    |
| `Function.prototype.constructor` | 声明函数的原型构造方法，详细请参考 [`Object.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) 。 |

## 方法

| 方法                               | 说明                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| `Function.prototype.apply()`       | 在一个对象的上下文中应用另一个对象的方法；参数能够以数组形式传入。 |
| `Function.prototype.bind()`        | `bind()` 方法会创建一个新函数，称为绑定函数。当调用这个绑定函数时，绑定函数会以创建它时传入 `bind()` 方法的第一个参数作为 `this`，传入 `bind()` 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。 |
| `Function.prototype.call()`        | 在一个对象的上下文中应用另一个对象的方法；参数能够以列表形式传入。 |
| `Function.prototype.isGenerator()` | 若函数对象为 Generator，返回 `true` ，反之返回 `false`。     |
| `Function.prototype.toSource()`    | 获取函数的实现源码的字符串。 覆盖了 `Object.prototype.toSource` 方法。 |
| `Function.prototype.toString()`    | 获取函数的实现源码的字符串。覆盖了 `Object.prototype.toString` 方法。 |

## 示例

### 标准示例

```javascript
// 定义一个求和函数：带有2个参数x、y。
var sum = new Function("x", "y", "return x + y;");

// 定义一个输出函数：没有定义参数，输出"CodePlayer"
var foo = Function('var name="CodePlayer"; console.log(name);');

// 执行函数
console.log( sum(12, 23) );		// 35
foo();						  // CodePlayer

console.log(typeof sum);				// function
console.log(sum instanceof Function);	 // true
console.log(sum instanceof Object);		 // true
```

### 函数声明

JS支持以 `function` 关键字形式直接声明函数，多数情况下，我们也推荐以 `function` 关键字形式声明函数。我们以 `function` 关键字形式声明等价于上面两个函数的对应代码如下：

```javascript
function sum(x, y){
    return x + y;   
}

function foo(){
    var name = "CodePlayer";
    console.log( name );
}

// 执行函数
console.log( sum( 12, 23 ) ); // 35
foo(); // CodePlayer

console.log( typeof sum ); 				// function
console.log( sum instanceof Function );  // true
console.log( sum instanceof Object ); 	 // true
```

### 匿名函数声明

使用 `function` 关键字也可以声明匿名函数，并将函数的引用赋给某个变量。我们还可以在声明一个匿名函数后，立即执行该函数。

```javascript
var foo = function(){
    var name = "CodePlayer";
    console.log( name );
};

foo(); // CodePlayer


// 在匿名函数的定义代码外面必须加小括号，表示强迫计算并返回计算结果(否则JS只是解析该匿名函数，但无法获得函数引用，进而无法执行该函数)
// 定义代码后面加上小括号，里面可以传入执行所需的参数(这里为2和3)
( function(x, y){
    console.log( x + y );
} )(2, 3); // 5

// 上述匿名函数立即执行的代码，还可以如下书写(请注意小括号的位置和匹配)：

( function(x, y){
    console.log( x + y );
}(2, 3) ) ; // 5
```

### Function 构造函数生成的实例处于全局作用域

```javascript
// f()函数返回的function e()是闭包.
var n = 1;
function f(){
    var n = 2;
    function e(){
        return n;
    }
    return e;
}
console.log (f()());               //2

// f()函数返回的function e()是全局作用域函数
var n = 1;
function f(){
    var n = 2;
    var e = new Function("return n;");
    return e;
}
console.log (f()());                //1
```

