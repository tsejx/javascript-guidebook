## 借用构造函数

在解决原型中包含引用类型值所带来问题的过程中，开发人员开始使用一种叫做**借用构造函数（constructor stealing）的技术（有时候也叫做伪造对象或经典继承）**。这种技术的基本思想相当简单，即在子类型构造函数的内部调用超类型构造函数。别忘了，函数只不过是在特定环境中执行代码的对象，因此通过使用 apply()和 call()方法也可以在（将来）新创建的对象上执行构造函数。

```javascript
function SuperType(){
	this.colors = ["red", "blue", "green"];
}
function SubType(){
	//继承了 SuperType
	SuperType.call(this);
}

let instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors); 		// "red,blue,green,black"

let instance2 = new SubType();
console.log(instance2.colors); 		// "red,blue,green"
```

代码中加粗的那一行代码“借调”了**超类型的构造函数。**通过使用 `call()` 方法（或 `apply()` 方法也可以），我们实际上是在（未来将要）新创建的 SubType 实例的环境下调用了 SuperType 构造函数。这样一来，就会在新 SubType 对象上执行 SuperType() 函数中定义的所有对象初始化代码。结果，SubType 的每个实例就都会具有自己的 colors 属性的副本了。

### 传递参数

相对于原型链而言，借用构造函数有一个很大的优势，即可以在子类型构造函数中向超类型构造函数传递参数。

```js
function SuperType(name){
	this.name = name;
}

function SubType(){
	//继承了 SuperType，同时还传递了参数
	SuperType.call(this, "Nicholas");
    
	//实例属性
	this.age = 29;
}

let instance = new SubType();
console.log(instance.name); 		// "Nicholas";
console.log(instance.age); 			// 29
```

以上代码中的 SuperType 只接受一个参数 name，该参数会直接赋给一个属性。在 SubType 构造函数内部调用 SuperType 构造函数时，实际上是为 SubType 的实例设置了 name 属性。为了确保 SuperType 构造函数不会重写子类型的属性，可以在调用超类型构造函数后，再添加应该在子类型中定义的属性。

### 借用构造函数的问题

如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题——方法都在构造函数中定义，因此函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。考虑到这些问题，借用构造函数的技术也是很少单独使用的。