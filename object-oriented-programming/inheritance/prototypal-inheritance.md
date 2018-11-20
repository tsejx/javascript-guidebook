## 原型式继承

原型式继承是借助原型基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```js
function object(o){
	function F(){}
	F.prototype = o; 
	return new F();  
}
```

在函数内部，先创建临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的

一个实例。从本质上，该函数对传入的对象执行了一次浅拷贝。

```js
// 作为另一个对象的基础
let person = {
	name: "Nicholas",
	friends: ["Shelby", "Court", "Van"]
};

// 返回新实例对象，该实例对象原型为person
let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

// 原型中的基本类型属性和引用类型属性被两个实例对象共享
alert(person.friends); 	// "Shelby,Court,Van,Rob,Barbie"
```

原型式继承需要有一个对象可以作为另一个对象的基础。如果有这么一个对象的话，可以把它传递给实例生成函数，然后再根据具体需求对得到的对象加以修改即可。 

ECMAScript 5 通过新增 `Object.create()` 方法规范化了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。

```js
let person = {
	name: "Nicholas",
	friends: ["Shelby", "Court", "Van"]
};

let anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

let yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends); 	// "Shelby,Court,Van,Rob,Barbie"
```

**支持版本：**支持 Object.create()方法的浏览器有 IE9+、 Firefox 4+、 Safari 5+、 Opera 12+和 Chrome。在没有必要兴师动众地创建构造函数，而只想让一个对象与另一个对象保持类似的情况下，原型式继承是完全可以胜任的。

**缺点：**包含引用类型值的属性始终都会共享相应的值，就像使用原型模式一样。

 

 

 

 

 