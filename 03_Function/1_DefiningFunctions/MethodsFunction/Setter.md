# Setter

当尝试设置属性时，`set` 语法将对象属性绑定到要调用的函数。

## 语法

```js
{set prop(val) { . . . }}
{set [expression](val) { . . . }}
```

### 参数

| 参数         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| `prop`       | 要绑定到给定函数的属性值。                                   |
| `val`        | 用于保存尝试分配给 `prop` 值的变量的一个别名                 |
| `expression` | 从 ECMAScript 2015 开始，还可以使用一个计算属性名的表达式绑定到给定的函数 |

### 描述

在 Javascript 中，如果试着改变一个属性的值，那么对应的 setter 将被执行。setter 经常和 getter 连用以创建一个伪属性。不可能在具有真实值的属性上同时拥有一个 setter 器。

使用 `set` 语法时请注意：

- 它的标识符可以是数字或字符串
- 它必须有一个明确的参数
- 在对象字面量中，不能为一个已有真实值的变量使用 set ，也不能为一个属性设置多个 set 。

setter 可以用 `delete` 操作来移除。

## 示例

### 在对象初始化时定义 setter

这将定义一个对象 language 的伪属性`current`，当分配一个值时，将使用该值更新`log`：

```js
var language = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}

language.current = 'EN';
console.log(language.log); // ['EN']

language.current = 'FA';
console.log(language.log); // ['EN', 'FA']
```

请注意，`current` 属性是未定义的，访问它时将会返回 `undefined`。

### 用 `delete` 操作符移除一个 setter

我们可以使用 `delete` 操作符移除 setter。

```
delete o.current;
```

### 使用`definedProperty` 为当前对象定义 `setter`

我们可以随时使用 `Object.definedProperty()` 给一个已经存在的对象添加一个 setter。

```js
var o = { a: 0 };

Ojbect.definedProperty(o, "b", { set: function (x) { this.a = x / 2; } });

o.b = 10;	// Runs the setter, which assigns 10 / 2 (5) to the 'a' property
console.log(o.a);	// 5
```

### 使用计算属性名

```js
var expr = "foo";

var obj = {
  baz: "bar",
  set [expr](v) { this.baz = v; }
};

console.log(obj.baz); // "bar"
obj.foo = "baz";      // run the setter
console.log(obj.baz); // "baz"

```

