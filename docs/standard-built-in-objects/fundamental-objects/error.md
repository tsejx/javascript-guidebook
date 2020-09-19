---
nav:
  title: 内置对象
  order: 2
group:
  title: 其他基础对象
  order: 7
title: Error
order: 2
---

# Error 对象

Error 内置对象用于创建一个异常对象，当运行时产生异常，Error 的实例对象会被抛出。Error 对象也可用于用户自定义的异常的基础对象。

## 语法

```js
new Error([ message ][, fileName[, lineNumber]])
```

| 参数       | 说明                                                  | 类型   |
| ---------- | ----------------------------------------------------- | ------ |
| message    | 可选参数。错误描述信息                                | string |
| fileName   | 可选参数。默认是调用 Error 构造器代码所在的文件的名字 | string |
| lineNumber | 可选参数。默认是调用 Error 构造器代码所在文件的行号   | number |

## 类型

除了通用的 Error 构造函数外，还有 6 个其他类型的异常构造函数。

- `EvalError`：用于表示与 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 相关的异常
- `InternalError`：用于表示 JavaScript 引擎内部错误的异常抛出的实例。 如: "递归太多"。
- `RangeError`：用于表示数值变量或参数**超出其有效范围**的异常
- `ReferenceError`：用于表示**无效引用**的异常
- `SyntaxError`：用于表示 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 在解析代码的过程中发生的**语法错误**的异常
- `TypeError`：用于表示变量或参数**不属于有效类型**的异常
- `URIError`：用于表示给 [`encodeURI()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 或 [`decodeURl()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) 传递的**参数无效**的错误

## 示例

通常会使用 `throw` 关键字来抛出你创建的 Error 对象。

```js
try {
  throw new Error('Whoops!');
} catch (e) {
  console.log(e.name + ': ' + e.message);
}
```

你可以通过判断异常的类型来特定处理某一类的异常，即判断 `constructor` 属性，可使用 `instanceof` 关键字。

```js
const a = RangeError('throw Error');

console.log(a instanceof RangeError);
// true
```
