# Array.prototype.shift()

`shift()` 函数用于从当前数组中移除第一个元素，并返回移除的元素。

## 语法

```javascript
arr.shift()
```

### 描述

`shift()` 函数的返回值为任意类型，返回被移除的元素。如果该数组为空（没有任何元素），则返回 `undefined`。

由于本函数会移除数组中的*第一个元素*，数组的 `length` 属性也会随之改变(如果数组中有元素的话)，一般而言，数组的 `length` 属性将会减1。

## 示例

### 标准示例

```javascript
let myCar = ["Lamborghini", "Mercedes", "Ferrari ", "Landrover"];

let shifted = myCar.shift();

myCar; // ["Lamborghini", "Mercedes", "Ferrari"]

shifted; // 'Landrover'
```

### 空数组调用

```javascript
let myCar = [];

let shifted = myCar.shift();

shifted; // undefined
```

