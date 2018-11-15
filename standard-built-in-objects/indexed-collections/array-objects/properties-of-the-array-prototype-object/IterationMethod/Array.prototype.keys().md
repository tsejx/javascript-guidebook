# Array.prototype.keys()

`keys()`方法返回一个新的Array迭代器，它包含数组中每个索引的键。

## 语法

```javascript
arr.keys()
```

### 返回值

一个新的 `Array` 迭代器对象。

## 示例

### 标准示例

```javascript
let arr = ["a", "b", "c"];

let iterator = arr.keys();
// undefined

console.log(iterator);
// Array Iterator {}

console.log(iterator.next()); 
// Object {value: 0, done: false}

console.log(iterator.next()); 
// Object {value: 1, done: false}

console.log(iterator.next());
// Object {value: 2, done: false}

console.log(iterator.next()); 
// Object {value: undefined, done: true}
```

###  索引迭代器会包含那些没有对应元素的索引

```javascript
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];

console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
```



