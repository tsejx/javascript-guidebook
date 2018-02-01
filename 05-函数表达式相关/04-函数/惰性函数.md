# 惰性函数

　　惰性函数表示函数执行的分支只会在函数第一次调用的时候执行，在第一次调用过程中，该函数会被覆盖为另一个按照合适方式执行的函数，这样任何对原函数的调用就不用再经过执行的分支了。本文将详细介绍惰性函数

## 使用背景
　
　　因为各浏览器之间的行为的差异，经常会在函数中包含了大量的if语句，以检查浏览器特性，解决不同浏览器的兼容问题。比如，最常见的为dom节点添加事件的函数

```javascript
function addEvent(type, element, fun) {
    if (element.addEventListener) {
        element.addEventListener(type, fun, false);
    } else if(element.attachEvent){
        element.attachEvent('on' + type, fun);
    } else{
        element['on' + type] = fun;
    }
}
```

　　每次调用 `addEvent` 函数的时候，它都要对浏览器所支持的能力进行检查，首先检查是否支持 `addEventListener` 方法，如果不支持，再检查是否支持 `attachEvent` 方法，如果还不支持，就用dom0级的方法添加事件

　　这个过程，在 `addEvent` 函数每次调用的时候都要走一遍，其实，如果浏览器支持其中的一种方法，那么它就会一直支持了，就没有必要再进行其他分支的检测了。也就是说，if语句不必每次都执行，代码可以运行的更快一些

　　解决方案就是惰性载入

## 函数重写

　　在介绍惰性函数之前，首先介绍函数重写技术。由于一个函数可以返回另一个函数，因此可以用新的函数来覆盖旧的函数

```javascript
function a(){
    console.log('a');
    a = function(){
        console.log('b');
    }
}
```

　　这样一来，第一次调用该函数时会 `console.log('a')` 会被执行；全局变量a被重定义，并被赋予新的函数。当该函数再次被调用时，  `console.log('b')` 会被执行


## 惰性函数

　　惰性函数的本质就是函数重写。所谓惰性载入，指函数执行的分支只会发生一次，有两种实现惰性载入的方式

　　1、第一种是在函数被调用时，再处理函数。函数在第一次调用时，该函数会被覆盖为另外一个按合适方式执行的函数，这样任何对原函数的调用都不用再经过执行的分支了。代码重写如下

```javascript
function addEvent(type, element, fun) {
    if (element.addEventListener) {
        addEvent = function (type, element, fun) {
            element.addEventListener(type, fun, false);
        }
    } else if(element.attachEvent){
        addEvent = function (type, element, fun) {
            element.attachEvent('on' + type, fun);
        }
    } else{
        addEvent = function (type, element, fun) {
            element['on' + type] = fun;
        }
    }
    return addEvent(type, element, fun);
}
```

　　在这个惰性载入的 `addEvent()` 中，if语句的每个分支都会为addEvent变量赋值，有效覆盖了原函数。最后一步便是调用了新赋函数。下一次调用 `addEvent()` 时，便会直接调用新赋值的函数，这样就不用再执行if语句了

　　但是，这种方法有个缺点，如果函数名称有所改变，修改起来比较麻烦

　　2、第二种是声明函数时就指定适当的函数。把嗅探浏览器的操作提前到代码加载的时候，在代码加载的时候就立刻进行一次判断，以便让addEvent返回一个包裹了正确逻辑的函数

```javascript
var addEvent = (function () {
    if (document.addEventListener) {
        return function (type, element, fun) {
            element.addEventListener(type, fun, false);
        }
    }
    else if (document.attachEvent) {
        return function (type, element, fun) {
            element.attachEvent('on' + type, fun);
        }
    }
    else {
        return function (type, element, fun) {
            element['on' + type] = fun;
        }
    }
})();
```


