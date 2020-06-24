---
nav:
  title: 内置对象
  order: 2
group:
  title: Symbol
  order: 6
title: Symbol.toStringTag
order: 11
---

# Symbol.toStringTag

对象的`Symbol.toStringTag`属性，指向一个方法。在该对象上面调用`Object.prototype.toString`方法时，如果这个属性存在，它的返回值会出现在`toString`方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制`[object Object]`或`[object Array]`中`object`后面的那个字符串。

```js
// 例一
({ [Symbol.toStringTag]: 'Foo' }.toString());
// "[object Foo]"

// 例二
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
let x = new Collection();
Object.prototype.toString.call(x); // "[object xxx]"
```

ES6 新增内置对象的`Symbol.toStringTag`属性值如下。

- `JSON[Symbol.toStringTag]`：'JSON'
- `Math[Symbol.toStringTag]`：'Math'
- Module 对象`M[Symbol.toStringTag]`：'Module'
- `ArrayBuffer.prototype[Symbol.toStringTag]`：'ArrayBuffer'
- `DataView.prototype[Symbol.toStringTag]`：'DataView'
- `Map.prototype[Symbol.toStringTag]`：'Map'
- `Promise.prototype[Symbol.toStringTag]`：'Promise'
- `Set.prototype[Symbol.toStringTag]`：'Set'
- `%TypedArray%.prototype[Symbol.toStringTag]`：'Uint8Array'等
- `WeakMap.prototype[Symbol.toStringTag]`：'WeakMap'
- `WeakSet.prototype[Symbol.toStringTag]`：'WeakSet'
- `%MapIteratorPrototype%[Symbol.toStringTag]`：'Map Iterator'
- `%SetIteratorPrototype%[Symbol.toStringTag]`：'Set Iterator'
- `%StringIteratorPrototype%[Symbol.toStringTag]`：'String Iterator'
- `Symbol.prototype[Symbol.toStringTag]`：'Symbol'
- `Generator.prototype[Symbol.toStringTag]`：'Generator'
- `GeneratorFunction.prototype[Symbol.toStringTag]`：'GeneratorFunction'
