# Javascript严格模式下的8点规则

## 作用

　　[1]消除js语法的一些不合理、不严谨、不安全问题，减少怪异行为并保证代码运行安全

　　[2]提高编译器效率，增加运行速度

## 使用

　　[1]整个脚本启用严格模式，在顶部执行："use strict";

　　[2]在指定函数中执行严格模式，在函数体第一行："use strict"

　　[3]不支持strict模式的浏览器把"use strict"当做一个字符串语句执行，支持strict模式的浏览器将开启strict模式

　　[4]支持严格模式的浏览器包括IE10+、Firefox4+、safari12+、opera12+、chrome

## 规则

### 变量
　　[a]不允许意外创建全局变量

```javascript
"use strict";
message = 'hello world!';
```

　　[b]不能对变量调用delete操作符

```javascript
"use strict";
var color = 'red';
delete color;
```

【2】对象
　　[a]不能为只读属性赋值

```javascript
"use strict";
var person = {
    name:'cook'
};
Object.defineProperty(person,'name',{
    writable: false
});
person.name = 'Nicholas';
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
 

【3】函数
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
 

【4】不允许eval()在包含上下文中创建变量或函数

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

【5】不允许使用eval和arguments作为标识符，也不允许读写他们的值

```javascript
"use strict";
var eval = 10;
var arguments = 20;
```

【6】不允许this值为null或undefined

```javascript
"use strict";
var color = "red";
function fn(){
    alert(this.color);
}
fn();
```
 

【7】不允许使用with语句

```javascript
"use strict";
with(location){
    alert(href);
}
```

【8】不允许使用八进制字面量

```javascript
"use strict";
var value = 010;
```