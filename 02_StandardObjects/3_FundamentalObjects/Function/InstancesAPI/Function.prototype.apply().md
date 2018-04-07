# Function.prototyp.apply()

`apply() ` 函数用于调用当前函数，并可同时使用指定对象作为本次函数执行时函数内部的 `this` 指针引用。

该函数属于`Function`对象，所有主流浏览器均支持该函数。

> 注意：call() 方法的作用和 apply() 方法类似，只有一个区别，就是  call() 方法接受的是若干个**参数的列表**，而 apply() 方法接受的是一个包含多个参数的数组。

## 语法

```javascript
func.apply( [thisArg [, argsArray]])
```

### 参数

| 参数        | 类型                                     | 描述                                                         |
| ----------- | ---------------------------------------- | ------------------------------------------------------------ |
| `func`      | `Function` 类型                          | 当前函数调用 `apply()` 函数的函数，通常为 `this` （函数内部执行）。 |
| `thisArg`   | 可选，`Object` 类型                      | 执行函数时，函数内部 `this` 指针引用的对象。需要注意的是，使用的 `this` 值并不一定是该函数执行时真正的 `this` 值，如果这个函数处于非严格模式下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象（浏览器中就是 Window 对象），同时值为原始值（数字，字符串，布尔值）的 `this` 会指向该原始值的包装对象。 |
| `argsArray` | 可选，`Array` 类型或 `TypedArray `  类型 | 一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值 `为null` 或 `undefined`，则表示不需要传入任何参数。从 ECMAScript 5 开始可以使用类数组对象。 |

### 返回值

调用有指定 `this` 值和参数的函数的结果。

### 描述

在调用一个存在的函数时，你可以为其指定一个 `this` 对象。 `this` 指当前对象，也就是正在调用这个函数的对象。 使用 `apply`， 你可以只写一次这个方法然后在另一个对象中继承它，而不用在新对象中重复写该方法。

`apply` 与 `call()` 非常相似，不同之处在于提供参数的方式。`apply` 使用参数数组而不是一组参数列表（原文：a named set of parameters）。`apply ` 可以使用数组字面量（array literal），如  `*fun*.apply(this, ['eat', 'bananas'])`，或数组对象， 如  `*fun*.apply(this, new Array('eat', 'bananas'))`。

你也可以使用 `arguments ` 对象作为 `argsArray` 参数。 `arguments` 是一个函数的局部变量。 它可以被用作被调用对象的所有未指定的参数。 这样，你在使用 `apply` 函数的时候就不需要知道被调用对象的所有参数。 你可以使用 `arguments` 来把所有的参数传递给被调用对象。 被调用对象接下来就负责处理这些参数。

从 ECMAScript 5 开始，可以使用任何种类的类数组对象，就是说只要有一个 `length` 属性和 `[0...length)`  范围的整数属性。例如现在可以使用 `NodeList` 或一个自己定义的类似 `{'length': 2, '0': 'eat', '1': 'bananas'}` 形式的对象。

## 示例

### 标准示例

```javascript
// 定义一个人类
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 定义一个学生类
function Student(name, age, grade) {
    Person.apply(this, arguments);
    this.grade = grade;
}

// 创建一个学生实例
var ben = new Student('Ben', 21, 'Grade 1');

console.log(ben.nam);		// "Ben"
console.log(ben.age);		// 21
console.log(ben.grade);		// "Grade 1"
```

### 使用 apply 来链接构造器

我们可以使用 `apply` 来链接一个对象构造器。

- 使用 `Object.create()` 创建对象

```javascript
Function.prototype.construct = function (arrArgs) {
    let newObject = Object.create(this, prototype);
    // 将 arrArgs 继承到 newObject
    this.apply(newObject, arrArgs);
    return newObject;
};
```

- 使用 `Object.__proto__`

```javascript
Function.prototype.construct = fucntion (arrArgs) {
    let newObject = {};
    newObject.__proto__ = this.prototype;
    this.apply(newObject, arrArgs);
    return newObject;
}
```

- 使用闭包

```javascript
Function.prototype.constuct = function (arrArgs) {
    let funcConstructor = this, funcNewContructor = function() {
        funcConstructor.apply(this, arrArgs);
    }
    funcConstructor.prototype = funcConstructor.prototype;
    return new funcNewConstructor();
 }
```

- 使用 `Function` 构造器

```javascript
Function.prototype.construct = function(arrArgs) {
    let funcNewContructor = new Function("");
    funcNewContructor.prototype. = this.prototype;
    let newObject = new funcNewContructor();
    this.apply(newObject, arrArgs);
    return newObject;
}
```

案例：

```javascript
function MyConstructor() {
    for (var nProp = 0; nProp < arguments.length; nProp++) {
        this["property" + nProp] = arguments[nProp];
    }
}

var myArray = [4, "Hello world!", false];
var myInstance = MyConstructor.construc(myArray);

console.log(myInstance.property1);					// logs "Hello world!"
console.log(myInstance instanceof MyConstructor);	 // logs "true"
console.log(myInstacne.constructor);				// logs "MyConstructor"
```

**注意：** 这个非 native 的 `Function.construct` 方法无法和一些 native 构造器（例如 `Date`）一起使用。 在这种情况下你必须使用 `Function.bind` 方法（例如，想象有如下一个数组要用在 Date 构造器中： `[2012, 11, 4]`；这时你需要这样写： `new (Function.prototype.bind.apply(Date, [null].concat([2012, 11, 4])))()` 无论如何这不是最好的实现方式并且也许不该用在任何生产环境中）