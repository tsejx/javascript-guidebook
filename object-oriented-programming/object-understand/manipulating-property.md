## 属性操作

### 属性查询

属性查询一般有两种方法，包括点运算符和方括号运算符

变量中可以存在中文，因为中文相当于字符，与英文字符同样对待，因此可以写成 `person.白` 或 `person['白']`。

```javascript
var person = {
    白 : 1
}
person.白; // 1
person['白']; // 1
```

### 点运算符

点运算符是很多面向对象语句的通用写法，由于其比较简单，所以较方括号运算符相比，更常用。

由于Javascript是弱类型语言，在任何对象中都可以创建任意数量的属性。但当通过点运算符 `. ` 访问对象的属性时，属性名用一个标识符来表示，标识符要符合变量命名规则。标识符必须直接出现在 Javascript 程序中，它们不是数据类型，因此程序无法修改它们。

```javascript
var foo = {
    a: 1,
    1: 2
};
console.log(foo.a); // 1

// 由于变量不可以以数字开头，所以o.1报错
console.log(o.1); // Uncaught SyntaxError: missing ) after argument list
```

### 方括号运算符

当通过方括号运算符 `[]` 来访问对象的属性时，属性名通过字符串来表示。字符串是 Javascript 的数据类型，在程序运行中可以修改和创建它们。

使用方括号运算符有两个优点：

- 可以通过变量来访问属性
- 属性名称可以为 Javascript 无效标识符

方括号中的值若是非字符串类型会使用 `String()` 隐式转换成字符串再输出；如果是字符串类型，若有引号则原值输出，否则会被识别为变量，若变量未定义，则报错。

#### 可计算属性名

在方括号运算符内部可以使用表达式。

```javascript
const a = 1;
const foo = {
    3: 'abc'
};

foo[a + 2]; // 'abc'
```

但如果要在对象字面量内部对属性名使用表达式，则需要使用 ES6 的可计算属性名。

```javascript
const a = 1;

// Uncaught SyntaxError: Unexpected token +
const foo = {
    a + 3: 'abc'
};
```

ES6 增加了可计算属性名，可以在文字中使用[]包裹一个表达式来当作属性名

```javascript
const a = 1;

const foo = {
    [a + 3]: 'bar'
};

foo[4];	//'bar'
```

#### 属性查询错误

查询一个不存在的属性不会报错，而是返回 `undefined`

```javascript
const foo = {};
console.log(foo.a); // undefined
```

如果对象不存在，试图查询这个不存在的对象的属性会报错

```javascript
console.log(foo.a); // Uncaught ReferenceError: person is not defined
```

可以利用这一点，来检查一个全局变量是否被声明

```javascript
// 检查a变量是否被声明
if (a) {...} 		// 报错

// 所有全局变量都是window对象的属性。window.a的含义就是读取window对象的a属性，如果该属性不存在，就返回undefined，并不会报错
if (window.a) {...}	// 不报错
```

## 属性设置

属性设置又称为属性赋值，与属性查询相同，具有点运算符和方括号运算符这两种方法。

```javascript
// 点运算符
foo.p = 'bar';

// 方括号运算符
foo['p'] = 'bar';
```

#### 赋值检测

在给对象设置属性之前，一般要先检测对象是否存在。

```javascript
// Bad
const len = undefined;
if(book){
    if(book.subtitle){
        len = book.subtitle.length;
    }
}

// Good
const len = book && book.subtitle && book.subtitle.length;
```
#### 原始类型

由于字符串、数字和布尔等数据类型的值有对应的包装对象，所以给它们设置属性不会报错。

```javascript
'foo'.a = 1; 	// 1
(1).a = 1; 		// 1
true.a = 1; 	// 1
```

而`null` 和 `undefined` 不是对象，给它们设置属性会报错。

```javascript
null.a = 1; 		// Uncaught TypeError: Cannot set property 'a' of null
undefined.a = 1; 	// Uncaught TypeError: Cannot set property 'a' of undefined
```

## 属性删除

使用 `delete` 运算符可以删除对象属性（包括数组元素）。

```javascript
const foo = { a : 1 };

console.log( foo.a ); 			// 1
console.log( 'a' in foo ); 		// true

// delete object attribute
console.log( delete foo.a ); 	// true

console.log( foo.a ); 			// undefined
console.log( 'a' in foo ); 		// false
```

- 给对象属性置 `null` 或 `undefined`，并没有删除该属性。
- 使用 `delete` 删除数组元素时，不会改变数组长度。
- `delete` 运算符只能删除自有属性，不能删除继承属性（要删除继承属性必须从定义这个属性的原型对象上删除它，而且这会影响到所有继承自这个原型的对象）
- `delete` 操作符的返回值是个布尔值 `true` 或 `false`。
  - 当使用 `delete` 操作符删除对象属性或数组元素删除成功时，返回 `true`
  - 当使用 `delete` 操作符删除不存在的属性或非左值时，返回 `true`
  - 当使用 `delete` 操作符删除变量时，返回 `false`，严格模式下会抛出 ReferenceError 错误
  - 当使用 `delete` 操作符删除不可配置的属性时，返回 `false`，严格模式下会抛出 TypeError 错误

## 属性继承

每一个 Javascript 对象都和另一个对象相关联。“另一个对象”就是我们熟知的原型，每一个对象都从原型继承属性。所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过 `Object.prototype` 获得对原型对象的引用。

```javascript
const foo = {};
console.log(foo.__proto__ === Object.prototype); // true
```

`Object.prototype` 的原型对象是 `null`，所以它不继承任何属性。

```javascript
console.log(Object.prototype.__proto__ === null); // true
```

对象本身具有的属性叫**自有属性（own property）**，从原型对象继承而来的属性叫**继承属性**。

#### 判断方法

##### in操作符

`in` 操作符可以判断属性在不在该对象上，但无法区别自有还是继承属性。

```javascript
let foo = { a:1 };
let bar = Object.create(foo);
bar.b = 2;

console.log('a' in bar); 		// true
console.log('b' in bar); 		// true
console.log('b' in foo); 		// false
```

##### for-in循环

通过 `for-in` 循环可以遍历出该对象中所有可枚举属性。

```javascript
let foo = { a:1 };
let bar = Object.create(foo);
bar.b = 2;

for(let i in bar){
    console.log(bar[i]);	//2 1
}
```

##### hasOwnProperty()

通过 `hasOwnProperty()` 方法**可以确定该属性是自有属性还是继承属性**。

```javascript
let foo = {a:1};
let bar = Object.create(foo);
bar.b = 2;

console.log(bar.hasOwnProperty('a')); 	// false 继承属性
console.log(bar.hasOwnProperty('b')); 	// true 自有属性
```

##### Object.keys()

`Object.keys()` 方法返回所有**可枚举的自有属性**。

```javascript
let foo = {a:1};
let bar = Object.create(foo,{
    c:{ value:3,configurable: false }
});
bar.b = 2;

console.log(Object.keys(bar));	//['b']
```

##### Object.getOwnPropertyNames()

与 `Object.keys()` 方法不同，`Object.getOwnPropertyNames()` 方法返回所有自有属性（包括不可枚举的属性）。

```javascript
var foo = { a:1 };
var bar = Object.create(o,{
    c:{value:3,configurable: false}
});
bar.b = 2;

console.log(Object.getOwnPropertyNames(bar));	// ['c','b']
```