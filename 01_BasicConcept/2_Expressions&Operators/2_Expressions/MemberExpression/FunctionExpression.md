# 函数表达式

JavaScript 中创建函数主要有两种方法：函数声明和函数表达式。这两种方式都有不同的适用场景。本章节主要讲述函数表达式的几大特点以及它的使用场景。

函数表达式（Function Expression）将函数定义为表达式语句（通常是变量赋值）的一部分，通过函数表达式定义的函数可以是命名的，也可以是匿名的。函数表达式不能以 `function` 开头（下面自调用的例子要用括号将其括起来）。

## 语法

```javascript
function Identifier opt( FormalParameterList opt ){
    FunctionBody
}
```

命名函数表达式的解析过程

- 创建一个 `new Object` 对象
- 将 `Result(1)` 添加到作用域链的顶端
- 创建一个 `new Function` 对象，`FormalParameterList` 指定参数，`FunctionBody` 指定函数体。将当前正在运行的执行环境中作用域链作为它的作用域。
- 为 `Result(1)` 创建一个名为 `Identifier` 属性，其值为 `Result(3)` ，只读，不可删除
- 从作用域链中移除 `Result(1)`
- 返回 `Result(3)`

ECMAScript 是通过上下文来区分这两者的：假如 `function foo(){}` 是一个赋值表达式的一部分，则认为它是一个函数表达式。而如果 `function foo(){}` 被包含在一个函数体内，或者位于程序（的最上层）中，则将它作为一个函数声明来解析。显然，在省略标识符的情况下，“表达式”也就只能是表达式了。



## 示例

```javascript
// anonymous function expression 匿名函数
var a = function(){
    return 3;
}

// named function expression 命名函数
var a = function bar(){
    return 3
}

// self invoking function expression 自执行函数
(function sayHello(){
    alert('Hello!')
})();
```

