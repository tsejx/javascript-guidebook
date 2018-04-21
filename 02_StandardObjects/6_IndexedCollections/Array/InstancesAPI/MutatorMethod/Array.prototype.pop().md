## Array.prototype.pop()

`pop()`函数用于从当前数组中移除最后一个元素，并返回移除的元素。

## 语法

```javascript
arr.pop()
```

### 返回值

`pop()` 函数的返回值为任意类型，返回被移除的元素。如果该数组为空(没有任何元素)，则返回 `undefined`。

### 描述

- `pop` 方法有意具有通用性。该方法和 `call()` 或 `apply()` 一起使用时，可应用在类似数组的对象上。`pop` 方法根据 `length` 属性来确定最后一个元素的位置。如果不包含 `length` 属性或 `length` 属性不能被转成一个数值，会将 `length` 置为 0，并返回 `undefined`。
- 由于本函数会移除数组中的*最后一个元素*，数组的 `length` 属性也会随之改变（如果数组中有元素的话），一般而言，数组的 `length` 属性将会减1。
- 如果你在一个空数组上调用 `pop()`，它返回 `undefined`。

## 示例

### 标准示例

```javascript
let myFish = ["angel", "clown", "mandarin", "surgeon"];

let popped = myFish.pop();

myFish; // ["angel", "clown", "mandarin"]

popped; // surgeon
```

### 在空数组中调用

```javascript
let empty = [];

let popped = empty.pop();

popped;		// undefined

empty;		// []
```

