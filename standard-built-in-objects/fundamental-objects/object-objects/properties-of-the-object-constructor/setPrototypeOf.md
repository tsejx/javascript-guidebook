# Object.setPrototypeOf

`Object.setPrototypeOf()` 方法用于设置一个指定的对象的原型 ( 即，内部 `[[Prototype]]` 属性）到另一个对象或 `null`。

## 语法

```js
Object.setPrototypeOf(O, proto);
```

| 参数  | 说明               | 类型   |
| ----- | ------------------ | ------ |
| O     | 要设置其原型的对象 | object |
| proto | 原型对象           | object |

返回设置原型后的对象。

## 示例

```js
const foo = Object.setPrototypeOf({}, null);
```
