## 寄生式继承

**寄生式继承（parasitic inheritance）**是与原型式继承紧密相关的一种思路，并且同样也是由克罗克福德推而广之的。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

```js
function createAnother(original){
	let clone = object(original); 	// 通过调用函数创建一个新对象
	clone.sayHi = function(){ 		// 以某种方式来增强这个对象
		console.log("hi");
	};
	return clone; 					// 返回这个对象
}

let person = {
	name: "Nicholas",
	friends: ["Shelby", "Court", "Van"]
};

// 具有实例的原型person的所有属性和方法，也有自己的方法
let anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

**使用范围：**在主要考虑对象而**不是自定义类型和构造函数的情况下**，寄生式继承也是一种有用的模式。前面示范继承模式时使用的 object()函数不是必需的；任何能够返回新对象的函数都适用于此模式。

> **注意：**使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率；这一点与构造函数模式类似。

 

 

 

 

 