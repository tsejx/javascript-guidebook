# Javascript运算符——逻辑运算符

## 前面的话

　　逻辑运算符对操作数进行布尔运算，经常和关系运算符一样配合使用。逻辑运算符将多个关系表达式组合起来组成一个更复杂的表达式。逻辑运算符分为逻辑非'!'、逻辑与'&&'、逻辑或'||'3种，本文将介绍这三种逻辑运算符

## 逻辑非

　　逻辑非操作符由一个叹号(!)表示，可以应用于ECMAScript中的任何值。无论这个值是什么数据类型，这个操作符都会返回一个布尔值。逻辑非操作符首先会将它的操作数转换成一个布尔值，然后再对其求反

　　逻辑非对操作数转为布尔类型的转换类型与Boolean()转型函数相同，只不过最后再将其结果取反。而如果同时使用两个逻辑非操作符，实际上就会模拟Boolean()转型函数的行为

```javascript
console.log(!!undefined);//false
console.log(!!null);//false
console.log(!!0);//false
console.log(!!-0);//false
console.log(!!NaN);//false
console.log(!!'');//false
console.log(!!false);//false
```

```javascript
console.log(!!{});//true
console.log(!![]);//true

console.log(!!new Boolean(false));//true
console.log(!!false);//false
console.log(!!new Boolean(null));//true
console.log(!!null);//false
```

　　逻辑非运算符常常用于控制循环

```javascript
//Boolean 变量(bFound)用于记录检索是否成功。找到问题中的数据项时，bFound 将被设置为true，!bFound将等于false，意味着运行将跳出while循环
var bFound = false;
var i = 0;
while (!bFound) {
  if (aValue[i] == vSearchValues) {
    bFound = true;
  } else {
    i++;
  }
}
```


## 逻辑与

　　逻辑与运算符由两个和号(&&)表示，有两个操作数，只有在两个操作数都为true时，结果才返回true，否则返回false

```javascript
//逻辑与(&&)的真值表
第一个操作数        第二个操作数        结果
true              true               true
true              false              false
false             true               false
false             false              false
```

　　逻辑与操作可以应用于任何类型的操作数，而不仅仅是布尔值。如果其中一个操作数不是布尔值，则逻辑与操作不一定返回布尔值

　　逻辑与操作属于短路操作，如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值

　　对于逻辑与而言，如果第一个操作数是false，则无论第二个操作数是什么值，结果都是false，则返回第一个操作数；如果第一个操作数为true，则结果的真假和第二个操作数的真假相同，则返回第二个操作数

```javascript
//除了false、undefined、null、+0、-0、NaN、''这7个假值，其余都是真值
console.log('t' && ''); //因为't'是真值，所以返回''
console.log('t' && 'f'); //因为't'是真值，所以返回'f'
console.log('t' && 1 + 2); //因为't'是真值，所以返回3
console.log('' && 'f'); //因为''是假值，所以返回''
console.log('' && ''); //因为''是假值，所以返回''
```

```javascript
var i = 1;
var result = (true && i++);
console.log(result,i);//因为true是真值，所以执行i++，i是2，result是1

var i = 1;
var result = (false && i++);
console.log(result,i);//因为false是假值，所以不执行i++，i是1，result是false
```

　　逻辑与运算符可以多个连用，返回第一个布尔值为false的表达式的值

```javascript
console.log(true && 'foo' && '' && 4 && 'foo' && true);// ''
```

　　关系运算符的优先级比逻辑与(&&)和逻辑或(||)的优先级高，所以类似表达式可以直接书写，不用补充圆括号

```javascript
if(a+1==2 && b+2==3){
    //Todo
}
```

　　可以使用逻辑与运算符来取代if结构

```javascript
if (a == b) {
  doSomething();
}
// 等价于
(a == b) && doSomething();
```

　　逻辑与运算符常常用于回调函数使用中

```
//若没有给参数a传值，则a为默认的undefined，是假值，所以不执行a()，防止报错，如果给参数a传值，则执行函数a()
function fn(a){
    if(a){
        a();
    }
}
//等价于
function fn(a){
    a && a();
}
```


## 逻辑或

　　逻辑或运算符由两个竖线(||)表示，有两个操作数，只有在两个操作数都是false时，结果才返回false，否则返回true

```javascript
//逻辑或(||)的真值表
第一个操作数        第二个操作数        结果
true              true              true
true              false             true
false             true              true
false             false             false
```

　　同样地，逻辑或操作也可以应用于任何类型的操作数，而不仅仅是布尔值。如果其中一个操作数不是布尔值，则逻辑或操作不一定返回布尔值

　　逻辑或操作也属于短路操作，如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值

　　对于逻辑或而言，如果第一个操作数是true，则无论第二个操作数是什么值，结果都是true，则返回第一个操作数；如果第一个操作数是false，则结果的真假和第二个操作数的真假相同，则返回第二个操作数

```javascript
console.log('t' || '');//因为't'是真值，所以返回"t"
console.log('t' || 'f');//因为't'是真值，所以返回"t"
console.log('' || 'f');//因为''是假值，所以返回"f"
console.log('' || '');//因为''是假值，所以返回""
```

```javascript
var i = 1;
var result = (true || i++);
console.log(result,i);//因为true是真值，所以不执行i++，result是true，i是1

var i = 1;
var result = (false || i++);
console.log(result,i);//因为false是假值，所以执行i++，i是2，result是1
```

　　同样地，逻辑或运算符也可以多个连用，返回第一个布尔值为true的表达式的值

```javascript
console.log(false || 0 || '' || 4 || 'foo' || true);// 4
```

　　逻辑或运算符常用于为变量设置默认值

```javascript
//如果没有向参数p传入任何对象，则将该参数默认设置为空对象
function fn(p){
    p = p || {};
}
```

参考资料

【1】 ES5/表达式 https://www.w3.org/html/ig/zh/wiki/ES5/expressions
【2】 阮一峰Javascript标准参考教程——语法——布尔运算符 http://javascript.ruanyifeng.com/
【3】 W3School-Javascript高级教程——ECMAScript逻辑运算符 http://www.w3school.com.cn/
【4】《javascript权威指南(第6版)》第4章 表达式和运算符
【5】《javascript高级程序设计(第3版)》第3章 基本概念
【6】《javascript DOM编程艺术(第2版)》第2章 Javascript语法




