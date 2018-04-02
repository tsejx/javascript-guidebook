# Object 对象包装器

　　JavaScript中的 `Object` 对象，是 JavaScript 中所有对象的基类，也就是说 JavaScript  中的所有对象都是由 Object 对象衍生的。Object 对象主要用于将任意数据封装成对象形式。

　　对象也可看做是属性的无序集合，每个属性都是一个名值对。**属性名是字符串，因此我们可以把对象看成是从字符串到值的映射**。

## 语法

`Object` 对象(或称之为 `Object()` 函数)，其语法有以下两种：

- **用法一**：充当 `Object` 对象的**构造函数**使用，用于结合 `new` 关键字构造一个新的 `Object` 对象。`Object()` 会根据传入参数的类型返回一个对应类型的对象。

```javascript
new Object( [ value ] )
```

- **用法二**：当作**普通函数**使用，其行为与**用法一**(使用 `new` 关键字)完全一致，相当于用法一省略了 `new` 关键字。

```javascript
Object( [ value ] )
```

### 参数

| 属性    | 类型           | 说明                 |
| ------- | -------------- | -------------------- |
| `value` | 可选，任意类型 | 需要包装为对象的值。 |

　`Object()` 将会根据参数 `value` 的数据类型，返回对应类型的对象：

- 如果 `value` 为基元数据类型 Boolean、Number、String，则返回对应类型的对象，例如：Boolean 对象、Number 对象、String 对象。
- 如果 `value` 本身为对象，则不对其作任何更改，返回其本身。
- 如果省略了 `value` 参数，或 `value` 为 `null`、`undefined`，则返回自身无任何属性的 Object 对象。

### 返回值

`Object()` 的返回值为 Object 类型。返回一个与给定值对应类型的对象。该对象包装了给定的参数。



## Object 构造函数

### 属性

| 属性               | 说明                     |
| ------------------ | ------------------------ |
| `Object.length`    | 值为1                    |
| `Object.prototype` | 表示 `Object` 的原型对象 |

### 方法

| 方法                                | 说明                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| `Object.assign()`                   | 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。   |
| `Object.create()`                   | 使用指定的原型对象及其属性去创建一个新对象。                 |
| `Object.defineProperty`             | 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。 |
| `Object.definedProperties`          | 直接在一个对象上定义一个或多个新属性，或修改现有属性，并返回这个对象。 |
| `Object.entries()`                  | 返回一个数组，其元素是直接在 Object 上找到的可枚举属性键值对相对应的数组。属性的顺序与通过手动循环对象的属性值所给出的顺序相同。 |
| `Object.freeze()`                   | 可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。 |
| `Object.getOwnPropertyDescriptor()` | 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性） |
| `Object.getOwnPropertyNames()`      | 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。 |
| `Object.getOwnPropertySymbols()`    | 返回一个给定对象自身的所有 Symbol 属性的数组。               |
| `Object.getPrototypeOf()`           | 返回指定对象的原型（内部 `[[Prototype]]` 属性的值）          |
| `Object.is()`                       | 比较两个值是否相同。所有 NaN 值都相等（这与 `==` 和 `===` 不同）。 |
| `Object.isExtensible()`             | 判断一个对象是否可扩展（是否可以在它上面添加新的属性）。     |
| `Object.isFrozen()`                 | 判断一个对象是否已经冻结。                                   |
| `Object.isSealed()`                 | 判断一个对象是否已经密封。                                   |
| `Object.keys()`                     | 返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 `for...in` 循环遍历该对象时返回的顺序一致（两者的主要区别是一个 `for...in` 循环还会枚举其原型链上的属性） |
| `Ojbect.preventExtensions()`        | 让一个对象变的不可扩展，也就是永远不能再添加新的属性。       |
| `Object.seal()`                     | 可以让一个对象密封，并返回被密封后的对象。密封对象将会阻止向对象添加新的属性，并且会将所有已有属性的可配置型（configurable）置为不可配置（`false`），即不可修改属性的描述或删除属性。但是可写性描述（writable）为可写（`true`）的属性的值仍然可以被修改。 |
| `Object.setPrototypeOf()`           | 如果对象的 `[[Prototype]]` 被修改成不可扩展（通过 `Object.isExtensible()` 查看），就会抛出 TypeError 异常。如果 `prototype` 参数不是一个对象或者 `null`（例如，数字，字符串，布尔值或者 `undefined`），则什么都不做。否则，该方法将 Object 的 `[[Prototype]]` 修改为新的值。 |
| `Object.values()`                   | 返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用 `for...in` 循环的顺序相同（区别在于 `for...in` 循环枚举原型链中的属性） |



## Object 实例和 Object 原型对象

JavaScript 中的所有对象都来自 `Object`；所有对象从 `Object.prototype` 继承方法和属性，尽管它们可能被覆盖。

### 属性

| 属性                                        | 说明                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| `Object.prototype.constructor`              | 返回创建实例对象的 Object 构造函数的引用。注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。该值为只读的原始类型，如 `1` ，`true`，`'test'`。 |
| `Object.prototype.__proto__` :warning:      | 指向当对象被实例化的时候，用作原型的对象。                   |
| `Object.prototype.__noSuchMethod` :warning: | 当未定义的对象成员被调用作方法的时候，允许定义并执行的函数。 |

### 方法

| 方法                                      | 说明                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| `Object.prototype.hasOwnProperty()`       | 返回一个布尔值 ，表指示对象自身属性中是否具有指定的属性，而且此属性非原型链继承的。 |
| `Object.prototype.isPrototypeOf()`        | 用于测试一个对象是否存在于另一个对象的原型链上。             |
| `Object.prototype.propertyIsEnumerable()` | 返回一个布尔值，表示指定的属性是否可枚举。                   |
| `Object.prototype.toSource()` :warning:   | 返回一个表示源代码的字符串。                                 |
| `Object.prototype.toLocaleString()`       | 返回一个该对象的字符串表示。此方法被用于派生对象为了特定语言环境的目的而重载使用。 |
| `Object.prototype.toString()`             | 返回一个表示该对象的字符串。                                 |
| `Object.prototype.unwatch()` :warning:    | 删除一个 `watch()` 设置的 watchpoint。                       |
| `Object.prototype.valueOf()`              | 返回指定对象的原始值。                                       |
| `Object.prototype.watch()` :warning:      | 给对象的某个属性增加监听。                                   |

## 示例

### 标准示例

- 如果参数为基元数据，则返回对应类型的对象。

```javascript
var maserati = new Object(true);
console.log(maserati);			// return Boolean {true}

var lamborghini = new Object(8);
console.log(lamborghini);		// return Number {8}

var rolls = new Object("string");
console.log(rolls);				// return String {"string"}
```

- 如果参数自身就是对象（`typeof` 该参数返回 `"object"` 或 `"function"`），则不对其作任何更改，返回其本身。

```javascript
var renault = new Object(Boolean());
console.log(renault);		// return Boolean{false}

var mustang = new Object(Number());
console.log(mustang);		// return Number{0}

var audi = new Object(String());
console.log(audi);			// return String{"", length: 0}
```

- 如果未指定参数，或参数为`null`或`undefined`，则返回一个空对象。

```javascript
var mercedes = new Object();
console.log(mercedes);		//	return {}

var porsche = new Object(undefined);
console.log(porsche);		//	return {}

var ferrari = new Object(null);
console.log(ferrari);		//  return {}
```

