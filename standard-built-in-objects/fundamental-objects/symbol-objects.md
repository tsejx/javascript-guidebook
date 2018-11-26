## Symbol 对象

ES6 之前只有6种数据类型，包括5种基本数据类型（值本身无法改变），分别是：Undefied、Null、Boolean、Number、String，和一种 Object 类型的数据。而ES6 中新增的 Symbol 是第七种数据类型，它表示独一无二的值。

Symbol 值只能通过 `Symbol` 函数生成。 Symbol 类型的对象属性名可以保证不会与其他属性名不产生冲突。

```js
let s = Symbol()

typeof s		// Output: 'symbol'
```

注意，`Symbol` 函数前不能使用 `new` 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

```js
new Symbol('symbol')		// TypeError: Symbol is not a constructor
```

`Symbol` 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

如果 Symbol 的参数是一个对象，就会调用该对象的 `toString` 方法，将其转为字符串，然后才生成一个 Symbol 值。

```js
const obj = {
    toString() {
        return 'abc'
    }
}

const sym = Symbol(obj)

console.log(sym)			// Symbol(abc)
```

**参数相同值不同**

⚠️ 注意，`Symbol` 函数的参数只是表示对当前 Symbol 值的描述，因此**相同参数**的 `Symbol` 函数的返回值是不相等的。

```js
// 没有参数的情况
let s1 = Symbol()
let s2 = Symbol()

s1 === s2			// false

// 有参数的情况
let s3 = Symbol('foo')
let s4 = Symbol('foo')

s3 === s4			// false
```

**与其他类型**

Symbol 值不能与其他类型的值进行运算，会报错

```js
let sym = Symbol('symbol')

'HELLO' + sym		// TypeError: Cannot convert a Symbol value to a string

`HELLO ${sym}`		// TypeError: Cannot convert a Symbol value to a string
```

但是，Symbol 值可以显式转为字符串。

```js
let sym = Symbol('symbol')

String(sym)				// 'Symbol(symbol)'

sym.toString()			// 'Symbol(symbol)'
```

另外，Symbol 值也可以转为布尔值，但是不能转为数值。

```js
let sym = Symbol()
Boolean(sym)			// true
console.log(!sym)		// false

if (sym) {
    // ...
}

Number(sym)				// TypeError: Cannot convert a Symbol value to a number
console.log(sym + 2)	// TypeError: Cannot convert a Symbol value to a number
```

### 作为属性名的 Symbol

由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

在实际工作中，肯能会经常使用到别人的类库，然后因为不知道某个对象的属性名，就不小心重写了那个对象的某个属性，导致一些不必要的错误出现。但是有了 Symbol 类型后，我们可以很容易的避免掉这样的失误。

```js
let mySymbol = Symbol()

// 第一种写法 属性访问器
let a = {}
a[mySymbol] = 'Hello!'

// 第二种写法 字面量
let b = {
    [mySymbol]: 'Hello!'
}

// 第三种写法 对象原型方法
let c = {}
Object.defineProperty(c, mySymbol, { value: 'Hello!' })

// 以上写法都得到同样结果
a[mySymbol]		// 'Hello!'
```

⚠️ 注意，Symbol 值作为对象属性名时，**不能用点运算符**。

```js
const sym = Symbol()
const a = {}

a.sym = 'Hello!'

console.log(a[sym])		// undefined

console.log(a['sym'])	// 'Hello!'
```

上面代码中，因为点运算符后面总是字符串，所以不会读取 `sym` 作为标识名所指代的那个值，导致 `a` 的属性名实际上是一个字符串，而不是一个 Symbol 值。

同理，在对象内部，使用 Symbol 值定义属性时，Symbol 值必须放在**方括号**内。

```js
let sym = Symbol()

let foo = {
    [sym]: function (arg) {...}
}
    
foo[sym](123)
```

采用增强的对象写法。

```js
let foo = {
    [sym](arg) {...}
}
```

Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。

```js
const foo = {}

foo.constants = {
    a: Symbol('a'),
    b: Symbol('b'),
    c: Symbol('c')
}

console.log(foo.constants.a)	// Symbol(a)
```

还有一点需要注意，Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。

### 属性名的遍历

Symbol 作为属性名，该属性不会出现在 `for...in`、`for...of` 循环中，也不会被 `Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()` 返回。但是，它也不是私有属性，有一个 `Object.getOwnPropertySymbols` 方法，可以获取指定对象的所有 Symbol 属性名。

`Object.getOwnPropertySymbols` 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

```js
const foo = {}
let a = Symbol('a')
let b = Symbol('b')

foo[a] = 'Hello'
foo[b] = 'world'

const sym = Object.getOwnPropertySymbols(foo)

console.log(sym)		// [Symbol(a), Symbol(b)]
```

### Symbol.for()

`Symbol.for(key)` 方法会根据给定的键，来从运行时的 Symbol 注册表中找到对应的 Symbol，如果找到了，则返回它，否则，新建一个与该键关联的 Symbol，并放入全局 Symbol 注册表中。

```js
Symbol.for(key)
```

```js
let s1 = Symbol.for('foo')
let s2 = Symbol.for('foo')

s1 === s2		// true
```

上面两个变量均为同样参数的 `Symbol.for` 方法生成的，所以实际上是同一个值。

`Symbol.for()` 与 `Symbol()` 这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。

⚙️ `Symbol.for()` 不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的 `key` 是否已存在，如果不存在才会新建一个值。否则，返回的是同一个 Symbol 类型的值。

```js
let s1 = Symbol('foo')
let s2 = Symbol('foo')
let s3 = Symbol.for('foo')
let s4 = Symbol.for('foo')

s1 === s2		// false

s3 === s4		// true

s1 === s3		// false
```

### Symbol.keyFor()

`Symbol.keyFor(sym)` 方法用于获取 Symbol 注册表中指定的 Symbol 值关联的键。

```js
Symbol.keyFor(sym)
```

参数 `sym` 为存储在 Symbol 注册表中的某个 Symbol。

```js
const s1 = Symbol.for('s1')
Symbol.keyFor(globalSym)			// 's1'

const s2 = Symbol()
Symbol.keyFor(s2)					// undefined
```

⚠️ 注意，这个函数用于查找一个 Symbol 值的注册信息的，如果你使用 Symbol 函数创建的 Symbol 值，不论你传不传递参数，通过 `Symbol.keyFor()` 函数是查不到它的注册信息的。也就是说，通过 `Symbol()` 函数产生的 Symbol 值是没户口的孩子。但是通过 `Symbol.for()` 函数产生的 Symbol 值都是可以查到注册信息的。

### 内置的 Symbol 值

除了自定义的 Symbol 值以外，ES6 还提供了11个内置的 Symbol 值，指向语言内部使用的方法。

#### Symbol.hasInstance

`Symbol.hasInstance` 用于判断某对象是否为某构造器的实例。当其他对象使用 `instanceof` 运算符，判断是否为该对象的实例时，会调用这个方法。

```js
class MyArray {
    static [Symbol.hasInstance]() {
        return Array.isArray(instance)
    }
}

[] instanceof new MyArray		// true
```

#### Symbol.isConcatSpreadable

`Symbol.isConcatSpreadable` 用于配置某对象作为 `Array.prototype.concat()` 方法的参数时是否展开其数组元素。

```js
let s1 = ['c', 'd']
['a', 'b'].concat(s1, 'e')			// ['a', 'b', 'c', 'd', 'e']
s1[Symbol.isConcatSpreadable]		// undefined

let s2 = ['c', 'd']
s2[Symbol.isConcatSpreadable]	= false
['a', 'b'].concat(s2, 'e')			// ['a', 'b', ['c', 'd'], 'e']
```

上面代码说明，数组的默认行为时可以展开，`Symbol.isConcatSpreadable` 默认等于 `undefined`。该属性等于 `ture` 时，也有展开的效果。

类似数组的对象正好相反，默认不展开。它的 `Symbol.isConcatSpreadable` 属性设为 `true`，才可以展开。

```js
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') 	// ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') 	// ['a', 'b', 'c', 'd', 'e']
```

#### Symbol.species

对象的 `Symbol.species` 属性，指向一个构造函数，创建衍生对象时，会使用该属性。

```js
class MyArray extends Array {}

const a = new MyArray(1, 2, 3)
const b = a.map(x => x)
const c = a.filter(x => x > 1)

b instanceof MyArray	// true
c instanceof MyArray	// true
```

为 `MyArray` 设置 `Symbol.species` 属性

```js
class MyArray extends Array {
    static get [Symbol.species]() { return Array }
}
```

上述代码中，由于定义了 `Symbol.species` 属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子说明，定义 `Symbol.species` 属性要采用 `get` 取值器。默认的 `Symbol.species` 属性等同于下面的写法。

```js
static get [Symbol.species]() {
    return this
}
```

```js
class MyArray extends Array {
    static get [Symbol.species]() { return Array }
}

const a = new MyArray()
const b = a.map(x => x)

b instanceof MyArray		// false
b instanceof Array			// true
```

上述代码中，`a.map(x => x)` 生成的衍生对象，就不是 `MyArray` 的实例，而直接就是 `Array` 的实例。

#### Symbol.match

对象的 `Symbol.match` 属性，指向一个函数。

```js
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher{
    [Symbol.match](string) {
        return 'hello world'.indexOf(string)
    }
}

'e'.match(new MyMatcher())		// 1
```

#### Symbol.replace

对象的 `Symbol.replace` 属性，指向一个方法，当该对象被 `String.prototype.replace` 方法调用时，会返回该方法的返回值。

```js
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)
```

下面是例子。

```js
const x = {}
x[Symbol.replace] = (...s) => console.log(s)

'Hello'.replace(x, 'World')		// []
```

`Symbol.replace` 方法会收到两个参数，第一个参数是 `replace` 方法正在作用的对象，上面例子是 `Hello`，第二个参数是替换后的值，上面例子是 `World`。

#### Symbol.search

对象的 `Symbol.search` 属性，指向一个方法，当该对象被 `String.prototype.search` 方法调用时，会返回该方法的返回值。

```js
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
    constructor(value) {
        this.value = value
    }
    [Symbol.search](string) {
        return string.indexOf(this.value)
    }
}

'foobar'.search(new MySearch('foo'))		// 0
```

#### Symbol.split

对象的 `Symbol.split` 属性，指向一个方法，当该对象被 `String.prototype.split` 方法调用时，会返回该方法的返回值。

```js
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)
```

```js
class MySplitter {
    constructor(value){
        this.value = value
    }
    [Symbol.split](string){
        let index = string.indexOf(this.value)
        if (index === -1) {
            return string
        }
        return [
            string.substr(0, index),
            string.substr(index + this.value.length)
        ]
    }
}

'foobar'.split(new MySplitter('foo'))		// ['', 'bar']

'foobar'.split(new MySplitter('bar'))		// ['foo', '']

'foobar'.split(new MySplitter('baz'))		// 'foobar'
```

上面方法使用 `Symbol.split` 方法，重新定义了字符串对象的 `split` 方法的行为。

#### Symbol.iterator

对象的 `Symbol.iterator` 属性，指向该对象的默认遍历器方法。

```js
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

对象进行 `for...of` 循环时，会调用 `Symbol.iterator` 方法，返回该对象的默认遍历器。

```js
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
  console.log(value);
}
// 1
// 2
```

#### Symbol.toPrimitive

对象的`Symbol.toPrimitive`属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

`Symbol.toPrimitive`被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

- Number：该场合需要转成数值
- String：该场合需要转成字符串
- Default：该场合可以转成数值，也可以转成字符串

```js
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

#### Symbol.toStringTag

对象的`Symbol.toStringTag`属性，指向一个方法。在该对象上面调用`Object.prototype.toString`方法时，如果这个属性存在，它的返回值会出现在`toString`方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制`[object Object]`或`[object Array]`中`object`后面的那个字符串。

```js
// 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

// 例二
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
let x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
```

ES6 新增内置对象的`Symbol.toStringTag`属性值如下。

- `JSON[Symbol.toStringTag]`：'JSON'
- `Math[Symbol.toStringTag]`：'Math'
- Module 对象`M[Symbol.toStringTag]`：'Module'
- `ArrayBuffer.prototype[Symbol.toStringTag]`：'ArrayBuffer'
- `DataView.prototype[Symbol.toStringTag]`：'DataView'
- `Map.prototype[Symbol.toStringTag]`：'Map'
- `Promise.prototype[Symbol.toStringTag]`：'Promise'
- `Set.prototype[Symbol.toStringTag]`：'Set'
- `%TypedArray%.prototype[Symbol.toStringTag]`：'Uint8Array'等
- `WeakMap.prototype[Symbol.toStringTag]`：'WeakMap'
- `WeakSet.prototype[Symbol.toStringTag]`：'WeakSet'
- `%MapIteratorPrototype%[Symbol.toStringTag]`：'Map Iterator'
- `%SetIteratorPrototype%[Symbol.toStringTag]`：'Set Iterator'
- `%StringIteratorPrototype%[Symbol.toStringTag]`：'String Iterator'
- `Symbol.prototype[Symbol.toStringTag]`：'Symbol'
- `Generator.prototype[Symbol.toStringTag]`：'Generator'
- `GeneratorFunction.prototype[Symbol.toStringTag]`：'GeneratorFunction'

#### Symbol.unscopables

对象的`Symbol.unscopables`属性，指向一个对象。该对象指定了使用`with`关键字时，哪些属性会被`with`环境排除。

```js
Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']
```

上面代码说明，数组有 7 个属性，会被`with`命令排除。

```js
// 没有 unscopables 时
class MyClass {
  foo() { return 1; }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 1
}

// 有 unscopables 时
class MyClass {
  foo() { return 1; }
  get [Symbol.unscopables]() {
    return { foo: true };
  }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 2
}
```

上面代码通过指定`Symbol.unscopables`属性，使得`with`语法块不会在当前作用域寻找`foo`属性，即`foo`将指向外层作用域的变量。

### 总结

- Symbol 值只能通过 `Symbol()` 函数生成
- `Symbol()` 的参数只是表示对当前 Symbol 值的描述，相同参数调用返回值不相等
- `Symbol` 函数前不能使用 `new` 命令
- 对象的属性名可以为 Symbol 类型，能避免对象属性重名
- `Symbol` 值作为对象属性名不能用点运算符

---

**参考资料：**

- [ECMAScript 6 入门：Symbol](http://es6.ruanyifeng.com/?search=ad&x=0&y=0#docs/symbol)
- [Symbols in ECMAScript 6](http://2ality.com/2014/12/es6-symbols.html)