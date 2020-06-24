---
nav:
  title: 内置对象
  order: 2
group:
  title: Symbol
  order: 6
title: Symbol.replace
order: 6
---

# Symbol.replace

对象的 `Symbol.replace` 属性，指向一个方法，当该对象被 `String.prototype.replace` 方法调用时，会返回该方法的返回值。

```js
String.prototype.replace(searchValue, replaceValue);
// 等同于
searchValue[Symbol.replace](this, replaceValue);
```

下面是例子。

```js
const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World'); // []
```

`Symbol.replace` 方法会收到两个参数，第一个参数是 `replace` 方法正在作用的对象，上面例子是 `Hello`，第二个参数是替换后的值，上面例子是 `World`。
