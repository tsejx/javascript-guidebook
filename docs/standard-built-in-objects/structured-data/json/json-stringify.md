---
nav:
  title: 内置对象
  order: 2
group:
  title: 结构化数据
  path: /structured-data/
  order: 14
title: JSON.stringify
order: 4
---

# JSON.stringify()

`JSON.stringify()` 方法是将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串，如果指定了 `replacer` 是一个函数，则可以替换值，或者如果指定了 `replacer` 是一个数组，可选的仅包括指定的属性。

## 语法

```js
JSON.stringify( value[, replacer [, space]] )
```

|    参数    |         类型          |                                                                                                                                                      描述                                                                                                                                                      |
| :--------: | :-------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  `value`   |       任何类型        |                                                                                                                                      将要序列化成 一个 JSON 字符串的值。                                                                                                                                       |
| `replacer` | 可选，`Function` 类型 | 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 `null` 或者未提供，则对象所有的属性都会被序列化；关于该参数更详细的解释和示例，请参考使用原生的 JSON 对象一文。 |
|  `space`   |  可选，`String` 类型  |                              指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为 10。该值若小于 1，则意味着没有空格；如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；如果该参数没有提供（或者为 `null`）将没有空格。                              |

### 返回值

一个表示给定值的 JSON 字符串。

## 示例

### 代码示例

- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- JavaScript 基本数据类型

```js
JSON.stringify(1); // return '1'
JSON.stringify(true); // return 'true'
JSON.stringify('foo'); // return '"foo"'
```

- JavaScript 复杂数据类型

```js
JSON.stringify({ x: 5 }); // return '{"x":5}'
JSON.stringify([1, 'false', false]); // return '[1,"false",false]'
JSON.stringify({ x: 5, y: 6 }); // return "{"x":5,"y":6}
```

- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。

```js
JSON.stringify([new Number(1), new String('false'), new Boolean(false)]);
// '[1,"false",false]'
```

- `undefined`、任意的函数以及 `Symbol` 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）。

```js
JSON.stringify({ x: undefined, y: Object, z: Symbol('') });
// '{}'

JSON.stringify([undefined, Object, Symbol('')]);
// '[null,null,null]'
```

- 所有以 `Symbol` 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。

```js
JSON.stringify({ [Symbol('foo')]: 'foo' });
// '{}'

JSON.stringify({ [Symbol.for('foo')]: 'foo' }, [Symbol.for('foo')]);
// '{}'

JSON.stringify({ [Symbol.for('foo')]: 'foo' }, function (k, v) {
  if (typeof k === 'symbol') {
    return 'a symbol';
  }
});
// undefined
```

- 不可枚举的属性会被忽略。

```js
JSON.stringify(
  Object.create(null, {
    x: { value: 'x', enumerable: false },
    y: { value: 'y', enumerable: true },
  })
);

// "{"y":"y"}"
```

### `replacer` 参数

`replacer` 参数可以是一个函数或者一个数组。作为函数，它有两个参数，键（key）值（value）都会被序列化。

- 如果返回一个 `Number` 类型的值，转换成相应的字符串被添加入 JSON 字符串。
- 如果返回一个 `String` 类型的值，该字符串作为属性值被添加入 JSON。
- 如果返回一个 `Boolean` 类型的值，`true` 或者 `false` 被作为属性值被添加入 JSON 字符串。
- 如果返回任何其他对象，该对象递归地序列化成 JSON 字符串，对每个属性调用 `replacer` 方法。除非该对象是一个函数，这种情况将不会被序列化成 JSON 字符串。
- 如果返回 `undefined`，该属性值不会在 JSON 字符串中输出。

**注意：不能用 `replacer` 方法，从数组中移除值（`values`）如若返回 `undefined` 或者一个函数，将会被 `null` 取代。**

#### 例子（当参数为 `Function`）

```js
function replacer(key, value) {
  if (typeof value === 'string') {
    return undefined;
  }
  return value;
}

var foo = { foundation: 'Mozilla', model: 'box', week: 45, transport: 'car', month: 7 };

var jsonString = JSON.stringify(foo, replacer); // {"week": 45,"month": 7}
```

#### 例子（当参数为 `Array`）

如果 `replacer` 是一个数组，数组的值代表将被序列化成 JSON 字符串的属性名。

```js
JSON.stringify(foo, ['week', 'month']);
// '{"week": 45,"month":7}', 只保留“week”和“month”属性值
```

### `space` 参数

`space` 参数用来控制结果字符串里面的间距。如果一个数字，则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多 10 个空格）；如果是一个字符串，则每一级别会比上一级别多缩进用该字符串（或该字符串的前十个字符）。

```js
JSON.stringify({ a: 2 }, null, ' '); // '{\n "a": 2\n}'
```

使用制表符（`\t`）来缩进：

```js
JSON.stringify({ uno: 1, dos: 2 }, null, '\t');
//'{            \
//    "uno": 1, \
//    "dos": 2  \
//}'
```

### `toJSON` 方法

如果一个被序列化的对象拥有 `toJSON` 方法，那么该 `toJSON` 方法就会覆盖该对象默认的序列化行为：不是那个对象被序列化，而是调用 `toJSON` 方法后的返回值会被序列化。

```js
var obj = {
  foo: 'foo',
  toJSON: function () {
    return 'bar';
  },
};

JSON.stringify(obj); // '"bar"'
JSON.stringify({ x: obj }); // '{"x": "bar"}'
```
