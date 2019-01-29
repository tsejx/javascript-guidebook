## 描述符方法

前面介绍了属性描述符，要想设置它们，就需要用到描述符方法。描述符方法总共有以下4个：

### Object.getOwnPropertyDescriptor()

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

### Object.defineProperty()

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

### Object.defineProperties()

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

### Object.create()

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

