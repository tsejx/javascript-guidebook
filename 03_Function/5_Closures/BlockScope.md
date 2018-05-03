# 块作用域

　　尽管函数作用域是最常见的作用域单元，也是现行大多数Javascript最普遍的设计方法，但其他类型的作用域单元也是存在的，并且通过使用其他类型的作用域单元甚至可以实现维护起来更加优秀、简洁的代码，比如块作用域。随着ES6的推广，块作用域也将用得越来越广泛。

## let

```javascript
for (var i= 0; i<10; i++) {
    console.log(i);
}
```

　　上面这段是很熟悉的循环代码，通常是因为只想在for循环内部的上下文中使用变量i，但实际上i可以在全局作用域中访问，污染了整个作用域

```javascript
for (var i= 0; i<10; i++) {
     console.log(i);
}
console.log(i); // 10
```

　　ES6改变了现状，引入了新的let关键字，提供了除var以外的另一种变量声明方式。let关键字可以将变量绑定到所在的任意作用域中(通常是{...}内部)，实现块作用域

```javascript
{
  let i = 1;  
};
console.log(i); // ReferenceError: i is not defined
```

　　块级作用域实际上可以替代立即执行匿名函数（IIFE）

```javascript
(function(){
  var i = 1;  
})();
console.log(i); // ReferenceError: i is not defined
```
　　如果将文章最开始那段for循环的代码中变量i用let声明，将会避免作用域污染问题

```javascript
for (let i= 0; i<10; i++) {
     console.log(i);
}
console.log(i); // //ReferenceError: i is not defined
```

　　for循环头部的let不仅将i绑定到了for循环的块中，事实上它将其重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值

```javascript
//与上一段代码等价
{
    let j;
    for (j=0; j<10; j++) {
        let i = j; //每个迭代重新绑定
        console.log( i );
    }
}
```

### 循环

　　下面代码中，由于闭包只能取得包含函数中的任何变量的最后一个值，所以控制台输出5，而不是0

```javascript
var a = [];
for(var i = 0; i < 5; i++){
    a[i] = function(){
        return i;
    }
}
console.log(a[0]());//5
```

　　当然，可以通过函数传参，来保存每次循环的值

```javascript
var a = [];
for(var i = 0; i < 5; i++){
    a[i] = (function(j){
        return function(){
            return j;
        }
    })(i);
}
console.log(a[0]());//0
```

　　而使用let则更方便，由于let循环有一个重新赋值的过程，相当于保存了每一次循环时的值

```javascript
var a = [];
for(let i = 0; i < 5; i++){
    a[i] = function(){
        return i;
    }
}
console.log(a[0]());//0
```

### 重复声明

　　let不允许在相同作用域内，重复声明同一个变量

```javascript
{
  let a = 10;
  var a = 1;//SyntaxError: Unexpected identifier
}
{
  let a = 10;
  let a = 1;//SyntaxError: Unexpected identifier
}
```


### 提升

　　使用let进行的声明不会在块作用域中进行提升

```javascript
{
  console.log(i);//ReferenceError: i is not defined
  let i = 1;  
};
```

## const
　　
　　除了let以外，ES6还引入了const，同样可以用来创建块作用域变量，但其值是固定的（常量）。之后任何试图修改值的操作都会引起错误

```javascript
if (true) {
    var a = 2;
    const b = 3; 
    a = 3; 
    b = 4;// TypeError: Assignment to constant variable
}
console.log( a ); // 3
console.log( b ); // ReferenceError: b is not defined
```
　　const声明的常量，也与let一样不可重复声明

```javascript
const message = "Goodbye!";
const message = "Goodbye!"; // SyntaxError: Identifier 'message' has already been declared
```

## try

　　`try-catch` 语句的一个常见用途是创建块级作用域，其中声明的变量仅仅在catch内部有效

```javascript
{
    let a = 2;
    console.log(a); // 2
}
console.log(a); // ReferenceError: a is not defined
```
　　在ES6之前的环境中，可以使用try-catch语句达到上面代码的类似效果

```javascript
try{
    throw 2;
}catch(a){
    console.log( a ); // 2
}
console.log( a ); //ReferenceError: a is not defined
```

```javascript
//或者
try{
    throw undefined;
}catch(a){
    a = 2;
    console.log( a ); // 2
}
console.log( a ); //ReferenceError: a is not defined
```



