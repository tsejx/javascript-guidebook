## 对象属性描述符

ECMA-262第五版在定义只有内部才用的特性（attribute）时，描述了属性（property）的各种特征。这些特性时为了实现 JavaScript 引擎用的，因此在 JavaScript 中不能直接访问它们。为了表示特征是内部值，该规范把它们放在了两对儿方括号中。

对象属性描述符的类型分为两种：[数据属性](#数据属性)和[访问器属性](#访问器属性)。

### 数据属性

数据属性（data property）包含一个数据值的位置，在这个位置可以读取和写入值。数据属性有4个特性

| 数据属性                 | 说明                                                         |
| ------------------------ | ------------------------------------------------------------ |
| Configurable（可配置性） | 可配置性决定是否可以使用 `delete` 删除属性，以及是否可以修改属性描述符的特性，默认值为 `true` |
| Enumberable（可枚举性）  | 可枚举性决定属性是否出现在对象的属性枚举中，比如是否可以通过 `for-in` 循环返回该属性，默认值为 `true` |
| Writable（可写性）       | 可写性决定是否可以修改属性的值，默认值为 `true`              |
| Value（属性值）          | 属性值包含这个属性的数据值，读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。默认值为 `undefined` |


### 访问器属性

访问器属性不包含数据值，它们包含两个方法分别是 `getter` 和 `setter` 函数（非必需）。在读取访问器属性时，会调用 `getter` 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用 `setter` 函数并传入新值，这个函数负责决定如何处理数据。

| 访问器属性   | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| Configurable | 可配置性决定是否可以使用 `delete` 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为 `true` |
| Enumberable  | 可枚举性决定属性是否出现在对象的属性枚举中，比如是否可以通过for-in循环返回该属性，默认值为 `true` |
| getter       | 在读取属性时调用的函数。默认值为 `undefined`                 |
| setter       | 在写入属性时调用的函数。默认值为 `undefined`                 |

和数据属性不同，访问器属性**不具有可写性（Writable）**。如果属性同时具有 `getter` 和 `setter` 方法，那么它是一个读/写属性。如果它只有 `getter` 方法，那么它是一个只读属性。如果它只有 `setter` 方法，那么它是一个只写属性。读取只写属性总是返回 `undefined`

### 描述符方法

前面介绍了属性描述符，要想设置它们，就需要用到描述符方法。描述符方法总共有以下4个：

#### Object.getOwnPropertyDescriptor()

`Object.getOwnPropertyDescriptor()` 方法可以读出对象自身属性的属性描述符。

```js
Object.getOwnPropertyDescriptor(obj, prop)
```

| 参数 | 说明               | 类型   |
| ---- | ------------------ | ------ |
| obj  | 需要查找的目标对象 | object |
| prop | 目标对象内属性名称 | string |

```javascript
let foo = { a: 1 };

Object.getOwnPropertyDescriptor(foo, 'a');
// Object {
// 	value: "a",
// 	writable: true,
// 	enumerable: true,
// 	configurable: true,
// }
```

#### Object.defineProperty()

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

使用该方法创建或配置对象属性的描述符时，如果不针对该属性进行描述符的配置，则该项描述符默认为 `false`。如果不指定 `value`、`get`、`set`，则这些属性默认值为 `undefined`。

```js
Object.defineProperty(obj, prop, descriptor)
```

| 参数       | 说明                               | 类型   |
| ---------- | ---------------------------------- | ------ |
| obj        | 需要定义属性的对象                 | object |
| prop       | 目标对象需要定义或修改的属性的名称 | string |
| descriptor | 将被定义或修改的属性描述符         | object |

```javascript
let obj = {};

console.log(Object.defineProperty(obj, 'a', {
        value:1,
        writable: true
    }));
// {a:1}

console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
// {value: 1, writable: true, enumerable: false, configurable: false}
// 由于没有配置enumerable和configurable，所以它们的值为false
```

#### Object.defineProperties()

`Object.defineProperties()` 方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。

```js
Object.defineProperties(obj, props)
```

| 参数  | 说明                                                         | 类型 |
| ----- | ------------------------------------------------------------ | ---- |
| obj   | 需要定义属性的对象                                           | obj  |
| props | 该对象的一个或多个键值对定义了将要为对象添加或修改的属性的具体配置 | obj  |

```javascript
let foo = new Object();

Object.defineProperties(foo, {
    name: {
        value: 'Ben',
        configurable: false,
        writable: true,
        enumerable: true
    },
    age: {
        value: 18,
        configurable: true
    }
})

console.log(foo.name, foo.age) // 'Ben', 18
```

#### Object.create()

`Object.create()` 方法使用指定的原型和属性来创建一个对象。

```js
Object.create(proto [, descriptors])
```

| 参数        | 说明                 | 类型   |
| ----------- | -------------------- | ------ |
| proto       | 新创建对象的原型对象 | object |
| descriptors | 目标对象内属性名称   | object |

```javascript
let foo = Object.create(Object.prototype,{
    a: { writable: false, value:1, enumerable: true }
});

console.log(Object.getOwnPropertyDescriptor(foo, 'a'));
// {value: 1, writable: false, enumerable: true, configurable: true}
```

### 描述符详述

前面分别介绍了数据属性和访问器属性的描述符，但没有详细说明其含义及使用，接下来逐一进行说明 。

#### 可写性（writable）

可写性决定是否可以修改属性的值，默认值为 `true`。

```javascript
let foo = { a:1 };
foo.a = 2;
console.log(foo.a); 	// 2
```

设置 `writable: false` 后，赋值语句会静默失效。

```javascript
let foo = { a: 1 };

Object.defineProperty(foo,'a',{
    writable:false
});

// 由于设置了writable为false，所以foo.bar=2这个语句会静默失效
foo.a = 2;
console.log(foo.a); // 1

Object.defineProperty(foo,'a',{
    writable:true
});

// 由于writable设置为true，所以foo.bar可以被修改为2
foo.a = 2;
console.log(foo.a); // 2
```

设置 `writable:false` 后，通过 `Object.defineProperty()` 方法改变属性 `value` 的值不会受影响，因为这也意味着在重置 `writable` 的属性值为 `false`。

```javascript
let foo = { a: 1 };
Object.defineProperty(foo,'a',{
    writable:false
});

console.log(foo.a); // 1

Object.defineProperty(foo,'a',{
    value:2
});
console.log(foo.a); // 2
```

#### 可配置性（Configurable）

可配置性决定是否可以使用 `delete` 删除属性，以及是否可以修改属性描述符的特性，默认值为 `true`。

设置 `configurable: false` 后，无法使用 `delete` 删除属性。

```javascript
let foo = { a: 1 };

Object.defineProperty(foo,'a',{
    configurable:false
});

delete foo.a;			// false
console.log(foo.a); 	// 1
```

一般地，设置 `configurable: false` 后，将无法再使用 `defineProperty()` 方法来修改属性描述符。

```javascript
let foo = { a: 1 };

Object.defineProperty(foo, 'a', {
    configurable:false
});

// Uncaught TypeError: Cannot redefine property: a
Object.defineProperty(foo,'a',{
    configurable:true
});
```

有一个例外，设置 `configurable:false` 后，只允许 `writable` 的状态从 `true` 变为 `false`。

```javascript
let foo = { a: 1 };

Object.defineProperty(foo, 'a', {
    configurable:false,
    writable:true
});

foo.a = 2;
console.log(foo.a);	// 2

Object.defineProperty(foo,'a',{
    writable:false
});

// 由于writable:false生效，对象foo的bar属性无法修改值，所以foo.bar=3的赋值语句静默失败
foo.a = 3;
console.log(foo.a);	// 2
```

#### 可枚举性（Enumerable）

可枚举性决定属性是否出现在对象的属性枚举中，具体来说，`for-in` 循环、`Object.keys` 方法、`JSON.stringify` 方法是否会取到该属性。

用户定义的普通属性默认是可枚举的，而原生继承的属性默认是不可枚举的。

```javascript
// 由于原生继承的属性默认不可枚举，所以只取得自定义的属性bar:1
let foo = { a: 1 };
for(var item in foo){
    console.log(foo[item]);	// 1
}
```

```javascript
// 由于enumerable被设置为false，在for-in循环中a属性无法被枚举出来
let foo = { a: 1 };
Object.defineProperty(foo, 'a', {enumerable:false});
for(var item in foo){
    console.log(foo[item]);	// undefined
}
```

##### propertyIsEnumerable()

`propertyIsEnumerable()` 方法用于判断对象的属性是否可枚举。

```javascript
let foo = { a: 1 };
console.log(foo.propertyIsEnumerable('a')); // true

Object.defineProperty(foo,'a',{enumerable:false});

console.log(foo.propertyIsEnumerable('a')); // false
```

#### get和set

`get` 是一个隐藏函数，在获取属性值时调用。`set` 也是一个隐藏函数，在设置属性值时调用，它们的默认值都是`undefined`。`Object.definedProperty()` 中的 `get` 和 `set` 对应于对象字面量中 `get` 和 `set` 方法

`getter` 和 `setter` 取代了数据属性中的 `value` 和 `writable` 属性。

给只设置 `get` 方法，没有设置 `set` 方法的对象赋值会静默失败，在严格模式下会报错。

```javascript
let foo = {
    get a(){
        return 2;
    }
}    
console.log(foo.a); // 2

// 由于没有设置set方法，所以 foo.a=3 的赋值语句会静默失败
foo.a = 3;
console.log(foo.a);	// 2
```

```javascript
Object.defineProperty(foo,'a',{
    get: function(){
        return 2;
    }
})
console.log(foo.a); 	// 2

// 由于没有设置set方法，所以 foo.bar=3 的赋值语句会静默失败
foo.a = 3;
console.log(foo.a); 		// 2
```

只设置 `set` 方法，而不设置 `get` 方法，则对象属性值为 `undefined`。

```javascript
let foo = {
    set a(val){
        return 2;
    }
}    
foo.a = 1;
console.log(foo.a); 	// undefined
```

```javascript
Object.defineProperty(foo,'a',{
    set: function(){
        return 2;
    }
})
foo.a = 1;
console.log(foo.a); 	// undefined
```

一般地，`set` 和 `get` 方法是成对出现的。

```javascript
const foo ={
    get a(){
        return this._a;
    },
    set a(val){
        this._a = val*2;
    }
}
foo.a = 1;
console.log(foo.a);	// 2
```

```javascript
Object.defineProperty(foo,'a',{
    get: function(){
        return this._a;
    },
    set :function(val){
        this._a = val*2;
    }
})
foo.a = 1;
console.log(foo.a);	// 2
```

### 对象状态

属性描述符只能用来控制对象中一个属性的状态。而如果要控制对象的状态，就要用到下面的6种方法 。

#### Object.preventExtensions()（禁止扩展）

`Object.preventExtensions()` 方法使一个对象无法再添加新的属性，并返回当前对象。

```js
Object.preventExtensions(obj)
```

| 参数 | 说明                   | 类型   |
| ---- | ---------------------- | ------ |
| obj  | 将要变得不可扩展的对象 | object |

#### Object.isExtensible()（测试扩展）

`Object.isExtensible()` 方法用来检测该对象是否可以扩展。

```javascript
let foo = { a: 1 };
console.log(Object.isExtensible(foo)); 			// true

foo.b = 2;
console.log(foo); 								// {a: 1, b: 2}
console.log(Object.preventExtensions(foo)); 	// { a: 1, b: 2}

// 由于对象foo禁止扩展，所以该赋值语句静默失败
foo.c = 3;
console.log(Object.isExtensible(foo)); 			// false
console.log(foo); 								// { a: 1, b: 2}
```

`Object.preventExtensions()` 方法并不改变对象中属性的描述符状态

```javascript
let foo = { a: 1 };

console.log(Object.getOwnPropertyDescriptor(foo,'a'));
// {value: 1, writable: true, enumerable: true, configurable: true}

Object.preventExtensions(foo);
console.log(Object.getOwnPropertyDescriptor(foo, 'a'));
// {value: 1, writable: true, enumerable: true, configurable: true}
```

#### Object.seal()（对象封印）

对象封印，使一个对象不可扩展（不可添加新属性）并且所有属性不可配置，并返回当前对象。

```js
Object.seal(obj)
```

| 参数 | 说明             | 类型   |
| ---- | ---------------- | ------ |
| obj  | 将要被密封的对象 | object |

#### Object.isSealed()（测试封印）

`Object.isSealed()` 方法用来检测该方法是否被封印。

```javascript
let foo = { a: 1 ,b: 2 };

console.log(Object.isSealed(foo)); 	// false
console.log(Object.seal(foo)); 		// {a:1,b:2}
console.log(Object.isSealed(foo)); 	// true

console.log(delete foo.b); 			// false
foo.c = 3;
console.log(foo); 					// { a:1,b:2 }
```

这个方法实际上会在现有对象上调用 `Object.preventExtensions()` 方法，并把所有现有属性的 `configurable` 描述符置为 `false`。

```javascript
let foo = { a:1, b:2 };

console.log(Object.getOwnPropertyDescriptor(foo,'a'));
// {value: 1, writable: true, enumerable: true, configurable: true}

console.log(Object.seal(foo)); 	// {a: 1, b: 2}

console.log(Object.getOwnPropertyDescriptor(foo, 'a'));
// {value: 1, writable: true, enumerable: true, configurable: false}
```

#### Object.freeze()（对象冻结）

`Object.freeze()` 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。

```js
Object.freeze(obj)
```

| 参数 | 说明           | 类型   |
| ---- | -------------- | ------ |
| obj  | 要被冻结的对象 | object |

#### Object.isFrozen()（检测冻结）

`Object.isFrozen()` 方法用来检测一个对象是否被冻结。

```javascript
let foo = { a: 1,b: 2 };
console.log(Object.isFrozen(foo)); 	// false
console.log(Object.freeze(foo)); 	// {a: 1, b: 2}
console.log(Object.isFrozen(foo)); 	// true

foo.a = 3;
console.log(foo); 	// { a: 1, b: 2 }
```

这个方法实际上会在现有对象上调用 `Object.seal()` 方法，并把所有现有属性的 `writable` 描述符置为 `false`。

```javascript
let foo = { a: 1 };

// {value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(foo, 'a'));

console.log(Object.freeze(foo));	// {a:1}

// {value: 1, writable: false, enumerable: true, configurable: false}
console.log(Object.getOwnPropertyDescriptor(foo, 'a'));
```
