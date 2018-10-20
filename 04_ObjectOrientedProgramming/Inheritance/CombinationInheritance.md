## 组合继承

**组合继承（combination inheritance）**有时也叫伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。

```javascript
function SuperType(name){
    this.name = name;
    this.colors = ['red','blue','green'];
}

SuperType.prototype.sayName = function(){
    console.log(this.name);
};

function SubType(name,age){
    //继承属性
    SuperType.call(this, name);
    this.age = age;
}

//继承方法
SubType.prototype = new Super();
SubType.prototype.constructor = Sub;
SubType.prototype.sayAge = function(){
    console.log(this.age);
}

let instance1 = new SubType("bai",29);
instance1.colors.push("black");
console.log(instance1.colors); 		// ['red','blue','green','black']
instance1.sayName(); 				// "bai"
instance1.sayAge(); 				// 29

let instance2 = new SubType("hu",27);
console.log(instance2.colors); 		// ['red','blue','green']
instance2.sayName(); 				// "hu"
instance2.sayAge(); 				// 27
```

组合继承有它自己的问题。那就是无论什么情况下，**都会调用两次父类型构造函数**：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。子类型最终会包含父类型对象的全部实例属性，但不得不在调用子类型构造函数时重写这些属性。

```javascript
function SuperType(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}

SuperType.prototype.sayName = function(){
    return this.name;
};

function SubType(name,age){
     // 第二次调用SuperType()，SubType.prototype又得到了name和colors两个属性，并对上次得到的属性值进行了覆盖
    SuperType.call(this,name);
    this.age = age;
}

//第一次调用SuperType()，SubType.prototype得到了name和colors两个属性
SubType.prototype = new Super();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    return this.age;
};  
```

**解释：**
 在这个例子中， SuperType 构造函数定义了两个属性： `name` 和 `colors`。 SuperType 的原型定义了一个方法 sayName()。 SubType 构造函数在调用 SuperType 构造函数时传入了 name 参数，紧接着又定义了它自己的属性 age。然后，将 SuperType 的实例赋值给 SubType 的原型，然后又在该新原型上定义了方法 sayAge()。这样一来，就可以让两个不同的 SubType 实例既分别拥有自己属性——包括 colors 属性，又可以使用相同的方法了。

**优点：**
组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为 JavaScript 中最常用的继承模式。而且， `instanceof` 和 `isPrototypeOf()` 也能够用于识别基于组合继承创建的对象。

 

 

 

 

 