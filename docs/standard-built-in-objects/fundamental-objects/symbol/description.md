---
nav:
  title: 内置对象
  order: 2
group:
  title: Symbol
  order: 6
title: Symbol.prototype.description
order: 13
---

# Symbol.prototype.description

`Symbol.prototype.description` 为一个只读属性，它会返回 Symbol 对象的可选描述的字符串。

## 属性说明

Symbol 对象可以通过一个可选的描述创建，可用于调试，但不能用于访问 Symbol 本身。`Symbol.prototype.description` 属性可以用于读取该描述。与 `Symbol.prototype.toString()` 不同的是它不会包含 `Symbol()` 的字符串。具体请看实例。

## 代码示例

```js
console.log(Symbol('desc').description);
// expected output: "desc"

console.log(Symbol.iterator.description);
// expected output: "Symbol.iterator"

console.log(Symbol.for('foo').description);
// expected output: "foo"

console.log(`${Symbol('foo').description}bar`);
// expected output: "foobar"
```

## 参考资料

- [MDN: Symbol.prototype.description](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description)
