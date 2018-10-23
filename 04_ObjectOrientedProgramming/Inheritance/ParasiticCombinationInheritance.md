## 寄生组合式继承

组合继承最大的问题就是无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。没错，子类型最终会包含超类型对象的全部实例属性，但我们不得不在调用子类型构造函数时重写这些属性。

```js
function SuperType(name){
	this.name = name;
	this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
	console.log(this.name);
};

function SubType(name, age){
	SuperType.call(this, name); 	// 第二次调用 SuperType()
	this.age = age;
}

SubType.prototype = new SuperType(); 	// 第一次调用 SuperType()

SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	console.log(this.age);
};
```

**所谓寄生组合式继承**，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。其背后的基本思路是：**不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。**本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。 

 寄生组合式继承的基本模式：

```js
function inheritPrototype(subType, superType){
	let prototype = object(superType.prototype); 	// 创建对象
	prototype.constructor = subType; 				// 增强对象
	subType.prototype = prototype; 					// 指定对象
}
```

这个示例中的函数实现了寄生组合式继承的最简单形式。这个函数接收两个参数：**子类型构造函数和超类型构造函数。**在函数内部，第一步是创建超类型原型的一个副本。第二步是为创建的副本添加 `constructor` 属性，从而弥补因重写原型而失去的默认的 `constructor` 属性。最后一步，将新创建的对象（即副本）赋值给子类型的原型。

 ```js
function inheritPrototype(subType, superType){
	let prototype = object(superType.prototype); 	// 创建对象
	prototype.constructor = subType; 				// 增强对象
	subType.prototype = prototype; 					// 指定对象
}

function SuperType(name){
	this.name = name;
	this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
	alert(this.name);
};

function SubType(name, age){
	SuperType.call(this, name);
	this.age = age;
}

inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
    alert(this.age);
};
 ```



 

 

 

 

 

 

 

 

 

 

 













解决两次调用的方法是使用寄生组合式继承。寄生组合式继承与组合继承相似，都是通过借用构造函数来继承不可共享的属性，通过原型链的混成形式来继承方法和可共享的属性。只不过把原型继承的形式变成了寄生式继承。使用寄生组合式继承可以不必为了指定子类型的原型而调用父类型的构造函数，从而寄生式继承只继承了父类型的原型属性，而父类型的实例属性是通过借用构造函数的方式来得到的

下方中会对寄生继承进行详细说明

```javascript
function Super(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
Super.prototype.sayName = function(){
    return this.name;
};

function Sub(name,age){
    Super.call(this,name);
    this.age = age;
}
if(!Object.create){
　　Object.create = function(proto){
　　　　function F(){};
　　　　F.prototype = proto;
　　　　return new F;
　　}
}
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;

var instance1 = new Sub("bai",29);
instance1.colors.push("black");
console.log(instance1.colors); // ['red','blue','green','black']
instance1.sayName(); // "bai"

var instance2 = new Sub("hu",27);
console.log(instance2.colors); // ['red','blue','green']
instance2.sayName(); // "hu"
```

这个例子的高效率体现在它只调用了一次Super构造函数，并且因此避免了在 `Sub.prototype` 上面创建不必要的、多余的属性。与此同时，原型链还保持不变。

因此，开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式，YUI的 `YAHOO.lang.extend()` 方法就采用了这种继承模式。