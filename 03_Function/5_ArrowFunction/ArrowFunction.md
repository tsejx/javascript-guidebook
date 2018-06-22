# 箭头函数

箭头函数表达式的语法比函数表达式更短，并且没有自己的 `this`,`arguments`,`super` 或 `new.target`。这些函数表达式更适用于那些本来需要匿名函数的地方，并且它们不能用作构造函数。

## 语法

ES6 箭头函数的引入，使函数的写法变得更加简洁，但在书写上要遵循一定的规则。

### 基础语法

- **规则一：箭头函数只能用赋值式写法，不能用声明式写法**

```js
const functionName = () => {
    // do something
}
```

- **规则二：当只有一个参数时，圆括号是可选的，如果没有参数或者参数多于一个就需要加括号**

```js
const functionName1 = param1 => {
    // do something
}

const functionName2 = () => {
    // do something 
} 

const functionName3 = (param1, param2) => {
    // do something
}
```

- **规则三：如果函数体只有一个表达式，可以不加花括号**

```js
const functionName4 = (param1, param2) => param1 + param2 
```

- **规则四：如果函数没有括号，可以不写 `return` ，箭头函数会帮你 `return`**

```js
const functionName5 = (param1, param2) => param1 + param2
functionName5(1, 2)
```

### 高级语法

```js
// 加括号的函数体返回对象字面表达式
参数 => ({ foo: bar })

// 支持剩余参数和默认参数
(params1, params2, ...rest) => { functionDeclarations }
(params1 = default1, params2, ..., paramsN = defaultN) => { functionDeclarations }

// 同样支持参数列表解构
let f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();	// 6
```

## 示例

### 简化回调函数

```js
// 正常函数写法
[1, 2, 3].map(function(x){
    return x * x
})

// 箭头函数写法
[1, 2, 3].map(x => x * x);
```

```js
// 正常函数写法
var result = values.sort(function (a, b){
    return a - b;
})

// 箭头函数写法
var result = values.sort((a, b) => a - b)
```

### rest 参数与箭头函数结合

```js
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5);
// [1, 2, 3, 4, 5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5);
// [1, [2, 3, 4, 5]]
```

### 箭头函数与解构赋值结合

```js
const full = ({ first, last }) => firsr + '' + last;

// 等同于
function full(person){
    return person.first + '' + person.last;
}
```

## 使用注意

- 函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误
- 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替
- 不可以使用 `yield` 命令，因此箭头函数不能用作 Generator 函数

### 箭头函数中的 `this`

`this` 对象的指向时可变的，但是在箭头函数中，它是固定的。因为箭头函数内部的 `this` 是词法作用域，由上下文确定。

```js
function foo(){
    setTimeout(() => {
        console.log('id', this.id);
    }, 100);
}

var id = 21;

foo.call({id: 42});
// id: 42
```

<details>

<summary>例子解析</summary>

上面的代码中，`setTimeout` 的参数一个箭头函数，这个箭头函数的定义生效是在 `foo` 函数生成时，而它的真正执行要等到100毫秒后。如果是普通函数，执行时 `this` 应该指向全局对象 `window`，这时应该输出 `21`。但是，箭头函数导滞 `this` 总是指向函数定义生效时所在的对象（本例时 `{id: 42}`），所以输出的是 `42`。

</details>

箭头函数可以让 `setTimeout` 里面的 `this`，绑定定义时所在的作用域，而不是指向运行时所在的作用域。下面是另一个例子。

```js
function Timer(){
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000)
    // 普通函数
    setInterval(function (){
        this.s2++;
    }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1', timer.s1), 3100);
setTimeout(() => console.log('s2', timer.s2), 3100);
// s1: 3
// s2: 0
```

<details>

<summary>例子解析</summary>

上面的代码中，`Timer` 函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的 `this` 绑定定义时所在的作用域（即 `Timer` 函数），后者的 `this` 指向运行时所在的作用域（即全局对象）。所以，3100毫秒之后， `timer.s1` 被更新了3次，而 `timer.s2` 一次都没更新。

</details>

箭头函数可以让 `this` 指向固定化，这种特征很有利于封装回调函数。

```js
var handler = {
    id: '123456',
    init: function (){
        document.addEventListener('click',
        	event => this.doSomething(event.type), false);
    },
    doSomething: function (type) {
        console.log('Handling' + type + ' for ' + this.id);
    }
}
```

<details>

<summary>例子解析</summary>

以上的代码的 `init` 方法中使用了箭头函数，这导致箭头函数里面的 `this` 总是指向 `handler` 对象。否则，回调函数运行时，`this.doSomething` 一行会报错，因为此时 `this` 指向 `document` 对象。

`this` 指向的固定化并不是因为箭头函数内部有绑定 `this` 的机制，实际原因时箭头函数根本没有自己的 `this`，导致内部的 `this` 就是外层代码块的 `this`。正是因为它没有 `this`，所以不能用作构造函数。

</details>

箭头函数转成ES5的代码如下。

```js
// ES6
function foo(){
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}

// ES5
function foo(){
    var _this = this;
    
    setTimeout(function(){
        console.log('id:', _this.id);
    }, 100)
}
```

上面的代码中，转换后的 ES5 版本清楚地说明了箭头函数里面根本没有自己的 `this`，而是引用外层的 `this`。

```js
// 请问下面的代码之中有几个this?
function foo(){
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            }
        }
    }
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()();	// id: 1
var t2 = f().call({id: 3})();	// id: 1
var t3 = f()().call({id: 4});	// id: 1
```

<details>

<summary>例子解析</summary>

上面的代码中只有一个 `this`，就是函数 `foo` 的 `this`，所以 t1、t2、t3 都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的 `this`，它们的 `this` 其实都是最外层 `foo` 函数的 `this`。

</details>

除了 `this` 外，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：`arguments`、`super`、`new.target`。

```js
function foo(){
    setTimeout(() => {
        console.log('args:', arguments);
    }, 100);
}

foo(2, 4, 6, 8);
// args: [2, 4, 6, 8]
```

上面代码中，箭头函数内部的变量 `arguments` ，其实是函数 `foo` 的 `arguments` 变量。

另外，由于箭头函数没有自己的`this`，所以当然也就不能用`call()`、`apply()`、`bind()`这些方法去改变`this`的指向。

```js
(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
// ['outer']
```

上面代码中，箭头函数没有自己的`this`，所以`bind`方法无效，内部的`this`指向外部的`this`。

### 嵌套的箭头函数

箭头函数内部，还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数。

```js
function insert(value){
    return {into:function (array){
        return {after: function (afterValue){
        	array.splice(array.indexOf(afterValue) + 1, 0, value);
            return array;
        }}
    }}
}

insert(2).into([1, 3]).after(1);	// [1, 2, 3]
```

上面这个函数，可以使用箭头函数改写。

```js
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1);	// [1, 2, 3]
```

下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。

```js
const pipeline = (...focus) => 
	val => focus.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addTheMult(5);
// 12
```

如果觉得上面的可读性比较差，也可以采用下面的写法。

```js
const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))
// 12
```

