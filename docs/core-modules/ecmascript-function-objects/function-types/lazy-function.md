---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 惰性函数
order: 3
---

# 惰性函数

**惰性函数** 表示函数执行的分支只会在函数 **第一次调用** 的时候执行，在第一次调用过程中，该函数会被覆盖为另一个按照合适方式执行的函数，这样任何对原函数的调用就不用再经过执行的分支了。

## 解决问题

在一个方法里面可能会涉及到一些兼容性的问题，不同的浏览器对应不同的方法，第一次我们遍历这些方法找到最合适的那个， 并将这个方法覆盖于遍历它的函数，这就是惰性函数即只遍历一次就找到最佳方案，下次再要找那个方法的时候就不用遍历了，提高了性能。

🌰 **示例：常见的为 DOM 节点添加事件的函数**

```js
function addEvent(type, element, func) {
  if (element.addEventListener) {
    element.addEventListener(type, func, false);
  } else if(element.attachEvent){
    element.attachEvent('on' + type, func);
  } else{
    element['on' + type] = func;
  }
}
```

每次调用 `addEvent` 函数的时候，它都要对浏览器所支持的能力进行检查，首先检查是否支持 `addEventListener` 方法，如果不支持，再检查是否支持 `attachEvent` 方法，如果还不支持，就用 DOM0 级的方法添加事件。这个过程，在 `addEvent` 函数每次调用的时候都要走一遍，其实，如果浏览器支持其中的一种方法，那么他就会一直支持了，就没有必要再进行其他分支的检测了，也就是说，`if` 语句不必每次都执行，代码可以运行的更快一些。解决的方案就是称之为 **惰性载入** 的技巧。

## 函数重写

在介绍惰性函数（或称惰性载入）之前，首先介绍函数重写技术。

由于一个函数可以返回另一个函数，因此可以用新的函数来覆盖旧的函数。

```js
function foo(){
  console.log('foo');

  foo = function(){
    console.log('bar');
  }
}
```

这样一来，第一次调用该函数时会 `console.log('foo')` 会被执行，全局变量 `foo` 被重定义，并被赋予新的函数。当该函数再次被调用时，`console.log('bar')` 会被执行。

## 惰性载入

惰性函数的本质就是函数重写。所谓**惰性载入**，就是说函数执行的分支只会执行一次，之后调用函数时，直接进入所支持的分支代码。

有两种实现惰性载入的方式，第一种事函数在第一次调用时，对函数本身进行二次处理，该函数会被覆盖为符合分支条件的函数，这样对原函数的调用就不用再经过执行的分支了，我们可以用下面的方式使用惰性载入重写`addEvent()`。

### 在函数被调用时处理函数

函数在第一次调用时，该函数会被覆盖为另外一个按合适方式执行的函数，这样任何对原函数的调用都不用再经过执行的分支了。代码重写如下

```js
function addEvent(type, element, func) {
  if (element.addEventListener) {
    addEvent = function (type, element, func) {
      element.addEventListener(type, func, false);
    }
  } else if(element.attachEvent){
    addEvent = function (type, element, func) {
      element.attachEvent('on' + type, func);
    }
  } else{
    addEvent = function (type, element, func) {
      element['on' + type] = func;
    }
  }

  return addEvent(type, element, func);
}
```

在这个惰性载入的 `addEvent()` 中，`if` 语句的每个分支都会为 `addEvent` 变量赋值，有效覆盖了原函数。最后一步便是调用了新赋函数。下一次调用 `addEvent()` 时，便会直接调用新赋值的函数，这样就不用再执行 `if` 语句了。

但是，这种方法有个缺点，如果函数名称有所改变，修改起来比较麻烦。

### 声明函数时指定适当的函数

把嗅探浏览器的操作提前到代码加载的时候，在代码加载的时候就立刻进行一次判断，以便让 `addEvent` 返回一个包裹了正确逻辑的函数。

```js
var addEvent = (function () {
  if (document.addEventListener) {
    return function (type, element, func) {
      element.addEventListener(type, func, false);
    }
  }
  else if (document.attachEvent) {
    return function (type, element, func) {
      element.attachEvent('on' + type, func);
    }
  }
  else {
    return function (type, element, func) {
      element['on' + type] = func;
    }
  }
})();
```


