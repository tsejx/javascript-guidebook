# Getter

`getter` 语法将对象属性绑定到查询该属性时将被调用的函数。

## 语法

```js
{get prop() {...}}
{get [expression]() {...}}
```

### 参数

| 参数         | 说明                     |
| ------------ | ------------------------ |
| `prop`       | 要绑定到给定函数的属性名 |
| `expression` | 一个计算属性名的表达式   |

### 描述

有时需要允许访问返回动态计算值的属性，或者你可能需要反映内部变量的状态，而不需要使用显式方法调用。在  JavaScript 中，可以使用 `getter` 来实现。虽然可以使用 `getter` 和 `setter` 来创建一个伪属性类型，但是不可能同时将一个 `getter` 绑定到一个属性并且该属性实际上具有一个值。

使用 `get` 语法时应注意以下问题：

- 可以使用数值或字符串作为标识
- 必须不带参数
- 它不能与另一个 `get` 或具有相同属性的数据条目同时出现在一个对象字面量中。

可以通过 `delete` 操作符删除 getter。

## 示例

### 在新对象初始化时定义一个 `getter`

这会为 `obj` 创建一个伪属性 `latest`，它会返回 `log` 数组的最后一个元素。

```js
var obj = {
  log: ['example','test'],
  get latest() {
    if (this.log.length == 0) return undefined;
    return this.log[this.log.length - 1];
  }
}
console.log(obj.latest); // "test".
```

注意，尝试为 `latest` 分配一个值不会改变它。

### 使用 `delete` 操作符删除 `getter`

只需使用 `delete`，就可删除 `getter`。

### 使用 `defineProperty` 在现有对象上定义 `getter`

要随时将 `getter` 添加到现有对象，使用 `Object.defineProperty()` 

```js
let o = {a: 0};

Object.definedProperty(o, "b", { get: function () { return this.a + 1; }});

console.log(o.b); // Runs the getter, which yields a + 1 (which is 1)
```

### 使用计算属性名

```js
var expr = 'foo';

var obj = {
  get [expr]() { return 'bar'; }
};

console.log(obj.foo); // "bar"
```

