## export

`export` 命令用于规定模块的对外接口。

### 变量输出

在声明的变量前添加 `export` 关键字即可将相对应的变量输出。

```js
export var foo = 'Foo'

export var bar = 'Bar'

export var baz = 'Baz'
```

除了像上面的写法，也可以写成另一种形式。

```js
var foo = 'Foo'
var bar = 'Bar'
var baz = 'Baz'

export {foo, bar, baz}
```

使用这种写法可以在脚本底部清晰看到所有输出的变量，推荐这种写法。

### 重置输出

通常情况下，`export` 输出的变量就是本来的名字，但是可以使用 `as` 关键字重命名。

```js
function a(){}

function b(){}

export {
    a as A,
    b as B,
    b as _B
}
```

使用 `as` 关键字，可以重命名定义函数的对外接口，重命名后，同一函数可以定义多个不同的变量名输出。

### 对应关系

需要特别注意的是，`export` 命令规定的是**对外的接口**，必须与模块内部的变量建立一一对应关系。

```js
// Error
export 1

// Error
const foo = 1
export foo 
```

如上两种写法都会报错，因为均会输出 `1`，而 `1` 只是一个值 ，并非对外的接口。

```js
export var foo = 1

var bar = 1
export {bar}

var baz = 1
export {baz as bat}
```

其他脚本可以通过这个接口，取到值 `1`。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。

同样地，函数和类必须遵守这种书写方法。

```js
// Error
function foo(){}
export foo

// Good
export function bar(){}

// Good
function baz(){}
export {baz}
```

另外，`export` 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

### 模块顶层输出

`export` 命令可以出现在模块的任何位置，只要处于模块顶层就可以。

如果处于块级作用域内，就会报错，`import` 命令也是如此。这是因为处于条件代码块之中，就没法做**静态优化**了，违背了 ES6 模块的设计初衷。

```js
function foo() {
  export default 'bar' // SyntaxError
}

foo()
```