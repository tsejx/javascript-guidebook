# 严格模式

## 说明

 - 严格模式消除了一些JavaScript的**静默错误**，通过改变它们来**抛出错误**。
 - 严格的模式修复了JavaScript引擎难以执行优化的错误：有时候，严格模式代码可以比非严格模式的相同的代码运行得更快。
 - 严格吗模式禁用了在ECMAScrit的未来版本中可能会定义的一些语法。

## 作用

 - 消除 JavaScript 语法的一些不合理、不严谨之处，减少一些怪异行为；
 - 消除代码运行的一些不安全之处，保证代码运行的安全；
 - 提高编译器效率，增加运行速度；
 - 为未来新版本的 JavaScript做好铺垫。

## 实现机制
　　
严格模式改变了语法及运行时行为。变化通常分为这几类：将问题直接转化为错误（如语法错误或运行时错误）,简化了如何为给定名称的特定变量计算，简化了 eval 以及 arguments,将写"安全“JavaScript的步骤变得更简单，以及改变了预测未来ECMAScript行为的方式。

## 使用

　　[1]整个脚本启用严格模式，在顶部执行：`"use strict";`

　　[2]在指定函数中执行严格模式，在函数体第一行：`"use strict"`

　　[3]不支持strict模式的浏览器把"use strict"当做一个字符串语句执行，支持strict模式的浏览器将开启strict模式

　　[4]支持严格模式的浏览器包括IE10+、Firefox4+、safari12+、opera12+、chrome

## 规则

### 【1】变量
　　[a]不允许意外创建全局变量

```javascript
"use strict";
message = 'hello world!';
// 假如有一个全局变量叫做message
// 因为变量名拼写错误
// 这一行代码就会抛出 ReferenceError
```

　　[b]不能对变量调用delete操作符

```javascript
"use strict";
var color = 'red';
delete color;
```

### 【2】对象
　　[a]不能为只读属性赋值

```javascript
"use strict";
// 为不可写属性赋值
var person = {
    name:'cook'
};
Object.defineProperty(person,'name',{
    writable: false
});
person.name = 'Nicholas'; // 抛出TypeError错误

// 给只读属性赋值
var obj2 = { get x(){ return 17;}};
obj2.x = 5; // 抛出TypeError错误

// 给不可扩展对象的新属性赋值
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = 'ohai'; // 抛出TypeError错误
```

　　[b]不能为不可配置的属性使用delete操作

```javascript
"use strict";
var person = {
    name:'cook'
};
Object.defineProperty(person,'name',{
    configurable: false
});
delete person.name;
```
 

### 【3】函数

　　[a]参数必须唯一

```javascript
"use strict";
function sun(num,num){
    //SOMETHING TODO
}
```

　　[b]修改形参不会反映到arguments中

```javascript
function showValue(value){
    value = "Foo";
    alert(arguments[0]);
    //非严格模式:"Foo"
    //严格模式:"Hi"
}
showValue("Hi");
```

　　[c]不允许使用arguments.callee和arguments.caller

```javascript
"use strict";
function fn(num){
    return arguments.callee(num);
}
fn(2);
```
```javascript
"use strict";
function outer(){
    inner();
}
function inner(){
    alert(inner.caller());
}
outer();
```
 

### 【4】不允许eval()在包含上下文中创建变量或函数

```javascript
"use strict";
function fn(){
    eval("var x=10");
    alert(x);
}
fn();
```

```javascript
//允许以下操作
var result = eval("var x = 10, y = 11; x+y");
alert(result);//21
```

### 【5】不允许使用eval和arguments作为标识符，也不允许读写他们的值

```javascript
"use strict";
var eval = 10;
var arguments = 20;
```

### 【6】不允许this值为null或undefined

```javascript
"use strict";
var color = "red";
function fn(){
    alert(this.color);
}
fn();
```
 

### 【7】不允许使用with语句

```javascript
"use strict";
with(location){
    alert(href);
}
```

### 【8】不允许使用八进制字面量

```javascript
"use strict";
var value = 010; // 在数字前加零，语法错误！
```