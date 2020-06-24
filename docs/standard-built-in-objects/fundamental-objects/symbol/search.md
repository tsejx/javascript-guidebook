---
nav:
  title: 内置对象
  order: 2
group:
  title: Symbol
  order: 6
title: Symbol.search
order: 7
---

# Symbol.search

对象的 `Symbol.search` 属性，指向一个方法，当该对象被 `String.prototype.search` 方法调用时，会返回该方法的返回值。

```js
String.prototype.search(regexp);
// 等同于
regexp[Symbol.search](this);

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}

'foobar'.search(new MySearch('foo')); // 0
```