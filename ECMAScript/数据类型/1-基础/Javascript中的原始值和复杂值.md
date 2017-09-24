# Javascript中的原始值和复杂值 

标签（空格分隔）： JS

---
## 前面的话

　　Javascript的数据类型可以分为两种：**原始类型**和**引用类型**。原始类型也称为**基本类型**或**简单类型**，Javascript基本数据类型包括Undefined、Null、Boolean、Number和String五种，而引用类型也称为复杂类型，在Javascript中是Object。与此相对应，它们的值也分别被称为原始值和复杂值。本文将介绍Javascript中的原始值和复杂值

## 特性

### 原始值

　　原始值是表示Javascript中可用的数据或信息的最底层形式或最简单形式。原始类型的值被称为原始值，是因为它们是不可细化的。也就是说，数字是数字，字符是字符，布尔值则是true或false，null和undefined就是null和undefined。这些值本身很简单，不能表示由其他值组成的值

　　原始值明显的特征是不可更改，任何方法都无法更改一个原始值

```javascript
var s= 'hello';
s.toUpperCase();
console.log(s);//'hello'
```

### 复杂值

　　复杂值可以由很多不同类型的javascript对象组成。复杂对象其在内存中的大小是未知的，因为复杂对象可以包含任何值，而不是一个特定的已知值

　　对象和原始值不同，它们是可变的，它们的值是可修改的

```javascript
var o = {x:1};
o.x = 2;
o.y = 3;
```

## 存储方式

### 栈存储

　　因为原始值占据空间固定，是简单的数据段，为了便于提升变量查询速度，将其存储在栈(stack)中

### 堆存储

　　由于复杂值的大小会改变，所以不能将其存放在栈中，否则会降低变量查询速度，因此其存储在堆(heap)中，存储在变量处的值是一个指针，指向存储对象的内存处

![栈堆存储][1]

## 访问方式

### 按值访问

　　原始值是作为不可细化的值进行存储和操作的，引用它们会转移其值

```javascript
var myString = 'foo';
var myStringCopy = myString;
var myString = null;
console.log(myString,myStringCopy); //null,'foo'
```

### 引用访问

　　复杂值是通过引用进行存储和操作的，而不是实际的值。创建一个包含复杂对象的变量时，其值是内存中的一个引用地址。引用一个复杂对象时，使用它的名称(即变量或对象属性)通过内存中的引用地址获取该对象值

```javascript
var myObject = {};
var copyOfMyObject = myObject;//没有复制值，而是复制了引用
myObject.foo = 'bar';//操作myObject中的值
//现在如果输出myObject和copyOfMyObject，则都会输出foo属性，因为它们引用的是同一个对象
console.log(myObject,copyOfMyObject);//Object{foo="bar"}
```

### 比较方式
　　原始值采用值比较，而复杂值采用引用比较。复杂值只有在引用相同的对象(即有相同的地址)时才相等。即使是包含相同对象的两个变量也彼此不相等，因为它们并不指向同一个对象

```javascript
var price1 = 10;
var price2 = 10;
var price3 = new Number('10');
var price4 = price3;
console.log(price1 == price2);//true
console.log(price1 == price3);//true
price4 = 10;
console.log(price4 == price3);//true
console.log(price4 === price3);//false
```

```javascript
var objectFoo = {same:'same'};
var objectBar = {same:'same'};
console.log(objectFoo == objectBar);//false

var objectA = {foo: 'bar'};
var objectB = objectA;
console.log(objectA == objectB);//true
```
 

## 动态属性

　　对于复杂值，可以为其添加属性和方法，也可以改变和删除其属性和方法；但简单值不可以添加属性和方法

　　复杂值支持动态对象属性，因为我们可以定义对象，然后创建引用，再更新对象，并且所有指向该对象的变量都会获得更新。一个新变量指向现有的复杂对象，并没有复制该对象。这就是复杂值有时被称为引用值的原因。复杂值可以根据需求有任意多个引用，即使对象改变，它们也总是指向同一个对象。

```javascript
var str = 'test';
str.property = true;
console.log(str.property);//undefined　
var objA = {property: 'value'};
var pointer1 = objA;
var pointer2 = pointer1;
objA.property = null;
console.log(objA.property,pointer1.property,pointer2.property);//null null null
```

  [1]: http://images2015.cnblogs.com/blog/740839/201601/740839-20160107094459246-1951901293.gif