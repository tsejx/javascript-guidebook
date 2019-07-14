# Symbol.match

对象的 `Symbol.match` 属性，指向一个函数。

```js
String.prototype.match(regexp);
// 等同于
regexp[Symbol.match](this);

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()); // 1
```