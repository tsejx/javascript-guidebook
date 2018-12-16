## Array.prototype.shift()

`Array.prototype.shift()` 方法用于移除数组第一个成员，并返回移除的元素。

### 语法

```javascript
arr.shift()
```

**返回值：** 返回被移除的数组成员。如果该数组为空（没有任何元素），则返回 `undefined`。

### 描述

由于本函数会移除数组中的第一个元素，数组的 `length` 属性也会随之改变(如果数组中有元素的话)，一般而言，数组的 `length` 属性将会减1。

### 示例

#### 标准示例

```js
let foo = ['a', 'b', 'c', 'd']

let bar = foo.shift()

console.log(foo)	// ['b', 'b', 'd']

console.log(bar)	// 'a'
```

#### 空数组调用

```js
let foo = [];

let bar = foo.shift();

console.log(bar)	// undefined
```

