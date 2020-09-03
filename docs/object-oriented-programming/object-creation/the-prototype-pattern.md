---
nav:
  title: OOP
  order: 4
group:
  title: 创建对象
  order: 3
title: 原型模式
order: 3
---

# 原型模式

我们创建的每个函数都有一个 `prototype`（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由 **特定类型的所有实例共享的属性和方法**。如果按照字面意思来理解，那么 `prototype` 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。

```js
function Person(){}

Person.prototype.name = 'Uzi';
Person.prototype.age = 22;
Person.prototype.job = 'E-Sports Player';
Person.prototype.sayName = function(){
  console.log(this.name);
}

const uzi1 = new Person();
uzi1.sayName();
// 'Uzi'

const uzi2 = new Person();
uzi2.sayName();
// 'Uzi'

// 共用公用方法
console.log(person1.sayName == person2.sayName);
// true
```

与构造函数不同，新对象的这些属性和方法是由所有实例共享的。

## 理解原型对象

无论什么时候，只要创建一个新函数，就会根据一组特定的规则为该函数创建一个 `prototype` 属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 `constructor`（构造函数）属性，这个属性是一个指向 `prototype` 属性所在函数的指针。

创建了自定义的构造函数之后，其原型对象默认只会取得 `constructor` 属性；至于其他方法，则都是从 Object 继承而来的。当调用构造函数创建一个新的实例后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。ECMAScript 5 中管这个指针叫做 `[[Prototype]]`。虽然在脚本中没有标准的方式访问 `[[Prototype]]`，但 Firefox、Safari 和 Chrome 在每个对象上都支持一个属性 `__proto__`；而在其他实现中，这个属性对脚本则是完全不可见的。不过，要明确的真正重要的一点就是，这个连接存在于实例与构造函数的原型之间，而不是存在于实例与构造函数之间。

原型最初只包含 `constructor` 属性，而该属性也是共享的，因此可以通过对象实例访问。

虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。如果我们在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那我们就在实例中创建该属性，该属性将会屏蔽原型中的属性。

```js
function Person(){}

Person.prototype.name = 'Nicholas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function(){
console.log(this.name);
};

const person1 = new Person();
const person2 = new Person();

person1.name = 'Greg';
console.log(person1.name);
// 'Greg' 		// from instance
console.log(person2.name);
// 'Nicholas' 	// from prototype
```

两个实例访问 `name` 属性的过程：

- `person1` ==> 实例中读取 `name` 属性 ==> 在实例中读取 `name` 属性成功
- `person2` ==> 实例中读取 `name` 属性 ==> 实例中无 `name` 属性 ==> 从原型链中读取 `name` 属性 ==> 读取成功

当为对象实例添加一个属性时，这个属性就会 **屏蔽** 原型对象中保存的同名属性。换句话说，添加这个属性只会阻止我们访问原型中的那个属性值，但不会修改那个属性。即使这个属性设置为 `null`，也只会在实例中设置这个属性，而不会恢复其指向原型的连接。不过，使用 `delete` 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性。

> ECMAScript5 的 `Object.getOwnPropertyDescriptor()` 方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型对象上调用 `Object.getOwnPropertyDescriptor()` 方法。

## 原型与实例属性检测

有两种方式使用 in 操作符：单独使用和在 `for-in` 循环中使用。在单独使用时，`in` 操作符会在通过对象能够访问给定属性时返回 `true`，**无论该属性存在于实例中还是原型中**。

同时使用 `hasOwnProperty()` 方法和 `in` 操作符，就可以确定该属性到底是存在于对象中，还是存在于原型中。

由于 `in` 操作符只要通过对象能够访问到属性就返回 `true`，`hasOwnProperty()` 只在属性存在于实例中时才返回 `true`，因此只要 `in` 操作符返回 `true` 而 `hasOwnProperty()` 返回 `false`，就可以确定属性是原型中的属性。

## 更简单的原型语法

前面的例子中每添加一个属性和方法就要输入一遍 `Person.prototype`，为减少不必要的输入，也为了从视觉上更好地封装原型的功能，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象。

```js
function Person(){}

Person.prototype = {
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  sayName: function (){
    console.log(this.name);
  }
}
```

前面介绍过，没创建一个函数，就会同时创建它的原型对象，这个对象自动获得构造函数。而这里的语法，这里相当于重写了实例的原型对象，相应地原型对象中的构造函数 `constructor` 亦被覆盖，不再指向 `Person` 函数。此时，尽管 `instanceof` 操作符还能返回正确的结果，但通过 `constructor` 已经无法确定对象的类型了。

当然，我们可以手动为它设置回适当的值。但是，以这种方式重设 `constructor` 属性回导致它的 `[[Enumerable]]` 特性被设置为 `true`。默认情况下，原生的 `constructor` 属性是不可枚举的。

```js
function Person(){}

Person.prototype = {
  constructor: Person,
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  sayName: function (){
    console.log(this.name);
  }
}
```

重设构造函数，只适用于 ECMAScript5 兼容的浏览器。

```js
Object.defineProperty(Person, 'constructor', {
  enumerable: false,
  value: Person
})
```

## 原型的动态性

由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来，即使是先创建了实例后修改原型也照样如此。

实例与原型之间的关系是松散的，

```js
function Person(){}

const friend = new Person();

Person.prototype = {
  constructor: Person,
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  sayName: function (){
    console.log(this.name);
  }
};

friend.sayName();
// error
```

重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系，它们引用的仍然是最初的原型。

## 原型对象的原型

原型模式的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都是采用这种模式创建的。所有原生引用类型（Object、Array、String 等等）都在其构造函数的原型上定义了方法。

通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。可以像修改自定义对象的原型一样修改原生对象的原型，因此可以随时添加方法。

尽管可以这样做，但我们不推荐在产品化的程序中修改原生对象的原型。如果因某个实现中缺少某个方法，就在原生对象的原型中添加这个方法，那么当在另一个支持该方法的实现中运行代码时，就可能会导致命名冲突。而且，这样做也可能会意外地重写原生方法。

## 原型对象的问题

原型模式省略了为构造函数传递初始参数的环节，结果所有实例在默认情况下都将取得相同的属性值。

原型中的所有属性是被很多实例共享的，这种共享对于函数非常合适。对于那些包含基本值的属性倒也说得过去，毕竟，通过在实例上添加一个同名属性，可以隐藏原型中的对应属性。然而，对于包含引用类型值的属性来说，问题就比较突出了。

```js
function Person(){}

Person.prototype = {
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  friends: ['Shelby', 'Court'],
  sayName: function (){
    console.log(this.name);
  }
}

const person1 = new Person();
const person2 = new Person();

person1.friends.push('Van');

console.log(person1.friends);
// 'Shelby,Court,Van'
console.log(person2.friends);
// 'Shelby,COurt,Van'
console.log(person1.friends == person2.friends);
// true
```

