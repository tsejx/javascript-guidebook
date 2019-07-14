# Symbol.split

对象的 `Symbol.split` 属性，指向一个方法，当该对象被 `String.prototype.split` 方法调用时，会返回该方法的返回值。

```js
String.prototype.split(separator, limit);
// 等同于
separator[Symbol.split](this, limit);
```

```js
class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    let index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [string.substr(0, index), string.substr(index + this.value.length)];
  }
}

'foobar'.split(new MySplitter('foo')); // ['', 'bar']

'foobar'.split(new MySplitter('bar')); // ['foo', '']

'foobar'.split(new MySplitter('baz')); // 'foobar'
```

上面方法使用 `Symbol.split` 方法，重新定义了字符串对象的 `split` 方法的行为。