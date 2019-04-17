# Error 对象

Error 构造函数可以创建一个错误对象，当运行时错误产生时，Error 的实例对象会被抛出。Error 对象也可用于用户自定义的异常的基础对象。

## 语法

```js
new Error([ message ][, fileName[, lineNumber]])
```

### 参数

| 参数      | 说明                                                  | 类型   |
| --------- | ----------------------------------------------------- | ------ |
| message   | 可选参数。错误描述信息                                | string |
| fileName  | 可选参数。默认是调用 Error 构造器代码所在的文件的名字 | string |
| lineNumber | 可选参数。默认是调用 Error 构造器代码所在文件的行号   | number |

## 描述

当代码运行发生错误时，会创建新的 Error 对象，并将其抛出。

## 类型

除了通用的 Error 构造函数外，还有 6 个其他类型的错误构造函数。

- `EvalError`：创建一个 Error 实例，表示错误的原因：与 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 有关。
- `InternalError`：创建一个代表 Javascript 引擎内部错误的异常抛出的实例。 如: "递归太多"。


- `RangeError`：创建一个 Error 实例，表示错误的原因：数值变量或参数**超出其有效范围**。


- `ReferenceError`：创建一个 Error 实例，表示错误的原因：**无效引用**。


- `SyntaxError`：创建一个 Error 实例，表示错误的原因：[`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 在解析代码的过程中发生的**语法错误**。


- `TypeError`：创建一个 Error 实例，表示错误的原因：变量或参数**不属于有效类型**。


- `URIError`：创建一个 Error 实例，表示错误的原因：给 [`encodeURI()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 或  [`decodeURl()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) 传递的**参数无效**。

## 示例

### 基本示例

通常会使用 `throw` 关键字来抛出你创建的 Error 对象。

```js
try {
    throw new Error("Whoops!");
} catch (e) {
   console.log(e.name + ": " + e.message);
}
```

你可以通过判断异常的类型来特定处理某一类的异常，即判断 `constructor` 属性，可使用 `instanceof` 关键字。