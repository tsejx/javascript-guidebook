# Object 对象

JavaScript 中的 `Object` 对象，是 JavaScript 中所有对象的基类，也就是说 JavaScript  中的所有对象都是由 Object 对象衍生的。Object 对象主要用于将任意数据封装成对象形式。

对象也可看做是属性的无序集合，每个属性都是一个名值对。**属性名是字符串，因此我们可以把对象看成是从字符串到值的映射**。

## 语法

`Object` 对象（或称之为 `Object()` 函数），其语法有以下两种：

- **用法一**：充当 `Object` 对象的**构造函数**使用，用于结合 `new` 关键字构造一个新的 `Object` 对象。`Object()` 会根据传入参数的类型返回一个对应类型的对象。

```javascript
new Object( [ value ] )
```

- **用法二**：当作**普通函数**使用，其行为与**用法一**（使用 `new` 关键字）完全一致，相当于用法一省略了 `new` 关键字。

```javascript
Object( [ value ] )
```

### 参数

|  参数    | 类型           | 说明                 |
| ------- | -------------- | -------------------- |
| value   | 任意类型 | 可选参数，需要包装为对象的值 |

　`Object()` 将会根据参数 `value` 的数据类型，返回对应类型的对象：

- 如果 `value` 为原始数据类型 Boolean、Number、String，则返回对应类型的对象，例如：Boolean 对象、Number 对象、String 对象。
- 如果 `value` 本身为对象，则不对其作任何更改，返回其本身。
- 如果省略了 `value` 参数，或 `value` 为 `null`、`undefined`，则返回自身无任何属性的 Object 对象。

### 返回值

`Object()` 的返回一个与给定值对应类型的对象。该对象包装了给定的参数。

## 构造函数

### 属性

* `Object.length`：值为 1
* `Object.prototype`：表示 `Object` 的原型对象

### 方法

* [Object.is](properties-of-the-object-constructor/is.md)：比较两个值是否相同
* [Object.assign](properties-of-the-object-constructor/assign.md)：通过拷贝一个或多个对象的可枚举 Property 来创建一个新的对象
* [Object.create](properties-of-the-object-constructor/create.md)：使用指定的原型对象和 Property 创建一个新对象
* [Object.keys](properties-of-the-object-constructor/keys.md)：获取指定对象的自身可枚举 Property 键名组成的数组集合
* [Object.values](properties-of-the-object-constructor/values.md)：返回一个给定对象自己的所有可枚举 Properties 值的数组集合
* [Object.entries](properties-of-the-object-constructor/entries.md)：获取指定对象可枚举 Properties 的键值对组成的二维数组
* [Object.defineProperties](properties-of-the-object-constructor/defineProperties.md)：为指定对象定义多个 Property 并分别指定它们的 Descriptors
* [Object.defineProperty](properties-of-the-object-constructor/defineProperty.md)：为指定对象定义单个 Property 并指定该 Property 的 Descriptors
* [Object.getOwnPropertyNames](properties-of-the-object-constructor/getOwnPropertyNames.md)：获取指定对象某个自有 Property 的键名数组集合（包括不可枚举属性但不包括 Symbol 值作为名称的属性）
* [Object.getOwnPropertySymbols](properties-of-the-object-constructor/getOwnPropertySymbols.md)：获取指定对象某个自有 Property 键名为 Symbol 类型的数组集合
* [Object.getOwnPropertyDescriptor](properties-of-the-object-constructor/getOwnPropertyDescriptor.md)：获取指定对象某个自有 Property 的 Descriptors
* [Object.getOwnPropertyDescriptors](properties-of-the-object-constructor/getOwnPropertyDescriptors.md)：获取指定对象 Properties 的 Descriptors
* [Object.isExtensible](properties-of-the-object-constructor/isExtensible.md)：判断指定对象是否处于可扩展状态
* [Object.isFrozen](properties-of-the-object-constructor/isFrozen.md)：判断指定对象是否处于冻结状态
* [Object.isSealed](properties-of-the-object-constructor/isSealed.md)：判断指定对象是否处于密封状态
* [Object.preventExtensions](properties-of-the-object-constructor/preventExtensions.md)：标识指定对象为不可扩展状态
* [Object.freeze](properties-of-the-object-constructor/freeze.md)：标识指定对象为冻结状态
* [Object.seal](properties-of-the-object-constructor/seal.md)：标识指定对象为密封状态
* [Object.getPrototypeOf](properties-of-the-object-constructor/getPrototypeOf.md)：获取指定对象的原型对象
* [Object.setPrototypeOf](properties-of-the-object-constructor/setPrototypeOf.md)：设置指定对象的原型对象

## 实例和原型对象

JavaScript 中的所有对象都来自 `Object`，所有对象从 `Object.prototype` 继承方法和属性，尽管它们可能被覆盖。

### 属性

* `Object.prototype.constructor`：返回创建实例对象的 Object 构造函数的引用。注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。该值为只读的原始类型，如 `1` ，`true`，`'test'`
* `Object.prototype.__proto__`：指向当对象被实例化的时候，用作原型的对象
* `Object.prototype.__noSuchMethod`：当未定义的对象成员被调用作方法的时候，允许定义并执行的函数

### 方法

* [Object.prototype.hasOwnProperty](properties-of-the-object-prototype-object/hasOwnProperty.md)：用于指示对象自身属性中是否具有指定的属性，而且此属性非原型链继承的
* [Object.prototype.isPrototypeOf](properties-of-the-object-prototype-object/isPrototypeOf.md)：用于测试一个对象是否存在于另一个对象的原型链上
* [Object.prototype.propertyIsEnumerable](properties-of-the-object-prototype-object/propertyIsEnumerable.md)：用于测试一个对象是否存在于另一个对象的原型链上
* Object.prototype.toSource：用于表示源代码的字符串
* Object.prototype.toLocaleString：用于派生对象为了特定语言环境的目的而重载使用
* [Object.prototype.toString](properties-of-the-object-prototype-object/toString.md)：返回一个表示该对象的字符串
* [Object.prototype.valueOf](properties-of-the-object-prototype-object/valueOf.md)：返回指定对象的原始值

## 示例

### 标准示例

- 如果参数为原始数据类型，则返回对应类型的对象。

```js
const a = new Object(true);
console.log(a);
// Boolean {true}

var b = new Object(8);
console.log(b);
// Number {8}

var c = new Object("string");
console.log(c);
// String {"string"}
```

- 如果参数自身就是对象（`typeof` 该参数返回 `"object"` 或 `"function"`），则不对其作任何更改，返回其本身。

```js
var a = new Object(Boolean());
console.log(a);
// Boolean{false}

var b = new Object(Number());
console.log(b);
// Number{0}

var c = new Object(String());
console.log(c);
// String{"", length: 0}
```

- 如果未指定参数，或参数为 `null` 或 `undefined`，则返回一个空对象。

```js
var a = new Object();
console.log(a);
// {}

var b = new Object(undefined);
console.log(b);
// {}

var c = new Object(null);
console.log(c);
// {}
```

