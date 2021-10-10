---
nav:
  title: 内置对象
  order: 2
group:
  title: 全局对象 - 函数属性
  order: 3
title: eval
order: 1
---

# eval

`eval()` 函数用于计算并执行以字符串表示的 JavaScript 代码。`eval()` 函数使 JavaScript 可以动态执行 JavaScript 源代码。

`eval()` 函数属于 `Global` 对象，所有主流浏览器均支持该函数。

## 语法

```js
eval(code);
```

| 参数   | 类型          | 说明                             |
| ------ | ------------- | -------------------------------- |
| `code` | `String` 类型 | 包含有效 JavaScript 代码的字符串 |

⚠️ **注意**： 参数`code`必须是原始字符串，不能是 String 对象形式。如果参数 `code` 不是原始字符串，则 `eval()` 函数不会执行代码，并且将其不作任何改变地返回。

如果参数 `code` 中的 JavaScript 代码不合法，将会引发异常。

`eval()` 函数的返回值是任意类型，其返回值由参数 `code` 中具体的 JavaScript 代码决定。

## 说明

- 传递给 `eval()` 函数的代码执行时所在的上下文和调用 `eval()` 函数时的上下文一样（也就是说，作用域不变）。
- 请自行确认 `code` 代码的来源是可信的，否则使用 `eval()` 函数存在一定的安全隐患。

## 示例

```js
let x = 2,
  y = 39,
  z = '42';

eval('x + y + 1');
// 42

eval(z);
// 42
```
