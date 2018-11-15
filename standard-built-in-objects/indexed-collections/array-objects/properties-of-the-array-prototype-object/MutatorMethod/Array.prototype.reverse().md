# Array.prototype.reverse()

`reverse()` 函数用于将当前数组的元素顺序全部反转，并返回元素顺序反转后的数组。

## 语法

```javascript
arr.reverse()
```

### 返回值

- `reverse()` 函数的返回值为 `Array` 类型，返回元素顺序被反转后的数组对象。
- `reverse()` 函数将一个当前数组对象中的元素按所在位置进行反转。在执行过程中，此函数并不创建新的 `Array` 对象，直接在当前对象上进行反转。返回的数组对象就是经过顺序反转后的当前对象。
- 如果数组是不连续的，`reverse()` 函数将在数组中创建元素，这些元素将填充数组中的间隙。所创建的这些元素的值全部未定义。

### 描述

`reverse()` 方法颠倒数组中元素的位置，并返回该数组的引用。

## 示例

### 标准示例

```javascript
var myArray = ['one', 'two', 'three'];
myArray.reverse(); 

console.log(myArray) // ['three', 'two', 'one']
```

