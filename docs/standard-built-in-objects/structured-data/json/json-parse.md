---
nav:
  title: 内置对象
  order: 2
group:
  title: 结构化数据
  path: /structured-data/
  order: 14
title: JSON.parse
order: 3
---

# JSON.parse()

`JSON.parse()` 方法用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。提供可选的 `reviver` 函数用以在返回之前对所得到的对象执行变换（操作）。

## 语法

```js
JSON.parse( text [, reviver] )
```

| 参数      | 类型                  | 描述                                                         |
| --------- | --------------------- | ------------------------------------------------------------ |
| `text`    | `String` 类型         | 要被解析成 JavaScript 值的字符串。                           |
| `reviver` | `Function` 类型，可选 | 如果是一个函数，则规定了原始值如何被解析改造，在被返回之前。 |

`Object` 对应给定的 JSON 文本。

## 示例

### 代码示例

```js
JSON.parse('{}'); // {}
JSON.parse('true'); // true
JSON.parse('"foo"'); // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null'); // null
JSON.parse('1'); //  1
```

### 参数 `reviver`

如果指定了 `reviver` 函数，则解析出的 JavaScript 值（解析值）会经过一次转换后才将被最终返回（返回值）。

更具体点讲就是：解析值本身以及它所包含的所有属性，会按照一定的顺序（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）分别的去调用 `reviver` 函数，在调用过程中，当前属性所属的对象会作为 `this` 值，当前属性名和属性值会分别作为第一个和第二个参数传入 `reviver` 中。如果 `reviver` 返回 `undefined`，则当前属性会从所属对象中删除，如果返回了其他值，则返回的值会成为当前属性新的属性值。

当遍历到最顶层的值（解析值）时，传入 `reviver` 函数的参数会是空字符串 `""`（因为此时已经没有真正的属性）和当前的解析值（有可能已经被修改过了），当前的 `this` 值会是 `{"": 修改过的解析值}`，在编写 `reviver` 函数时，要注意到这个特例。（这个函数的遍历顺序依照：从最内层开始，按照层级顺序，依次向外遍历）

```js
JSON.parse('{"p": 5}', function (k, v) {
  if (k === '') return v; // 如果到了最顶层，则直接返回属性值，
  return v * 2; // 否则将属性值变为原来的 2 倍。
}); // { p: 10 }

JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
  console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
  // 最后一个属性名会是个空字符串。
  return v; // 返回原始属性值，相当于没有传递 reviver 参数。
});

// 1
// 2
// 4
// 6
// 5
// 3
// ""
```

### 不允许以逗号作为结尾

```js
// both will throw a SyntaxError
JSON.parse('[1, 2, 3, 4, ]');
JSON.parse('{"foo" : 1, }');
```
