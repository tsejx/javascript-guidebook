---
nav:
  title: 基本语法
  order: 1
group:
  title: 运算符
  order: 5
title: void
order: 5
---

# void

`void` 运算符能向期望一个表达式的值是 `undefined` 的地方插入会产生副作用的表达式。

`void` 运算符通常只用于获取 `undefined` 的原始值，一般使用 `void(0)`（等同于 `void 0`）。在上述情况中，也可以使用全局变量 `undefined` 来代替（假定其仍是默认值）。

```js
console.log(void 0);
// undefined

console.log(void 0);
// undefined
```

## 作用

### 替代 undefined

由于 `undefined` 并不是一个关键字，其在 IE8- 浏览器中会被重写，在高版本函数作用域中也会被重写；所以可以用 `void 0` 来替换 `undefined`。

```js
var undefined = 10;
console.log(undefined);
// IE8-浏览器下为10，高版本浏览器下为 undefined

function t() {
  var undefined = 10;
  console.log(undefined);
}
console.log(t());
// 所有浏览器下都是10
```

### 客户端 URL

这个运算符最常用在客户端 URL 中，在 URL 中可以写带有副作用的表达式，而 `void` 则让浏览器不必显示这个表达式的计算结果。例如，经常在 HTML 代码中的 `<a>` 标签里使用 `void` 运算符。

```js
<a href="js:void window.open();">打开一个新窗口</a>
```

### 阻止默认事件

阻止默认事件的方式是给事件置返回值 `false`。

```js
//一般写法
<a href="http://example.com" onclick="f();return false;">文字</a>
// 等价于
<a href="js:void(f())">文字</a>
```
