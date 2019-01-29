## 对象状态

属性描述符只能用来控制对象中一个属性的状态。而如果要控制对象的状态，就要用到下面的6种方法 。

### Object.preventExtensions()（禁止扩展）

`Object.preventExtensions()` 方法使一个对象无法再添加新的属性，并返回当前对象。

```js
Object.preventExtensions(obj)
```

| 参数 | 说明                   | 类型   |
| ---- | ---------------------- | ------ |
| obj  | 将要变得不可扩展的对象 | object |

### Object.isExtensible()（测试扩展）

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

### Object.seal()（对象封印）

对象封印，使一个对象不可扩展（不可添加新属性）并且所有属性不可配置，并返回当前对象。

```js
Object.seal(obj)
```

| 参数 | 说明             | 类型   |
| ---- | ---------------- | ------ |
| obj  | 将要被密封的对象 | object |

### Object.isSealed()（测试封印）

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

### Object.isFrozen()（检测冻结）

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
