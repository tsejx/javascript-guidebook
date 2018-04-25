# Array.prototype.splice()

`splice()` 函数用于从当前数组中移除一部分连续的元素。如有必要，还可以在所移除元素的位置上插入一个或多个新的元素。该函数以数组形式返回从当前数组中被移除的元素。

## 语法

```javascript
arr.splice( startIndex, deleteCount [,items... ] )
```

### 参数

| 参数          | 类型                      | 说明                                               |
| ------------- | ------------------------- | -------------------------------------------------- |
| `startIndex`  | `Number` 类型             | 数组中移除元素操作的起点索引，从0开始。            |
| `deleteCount` | `Number` 类型，可选，整数 | 需要移除的元素个数。                               |
| `items`       | 任意类型，可选            | 要添加到数组中元素被移除位置的新元素，可以有多个。 |

### 返回值

`splice()` 函数的返回值为 `Array` 类型，返回从当前数组中被移除的元素所组成的新的数组。

如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

当移除数组中的元素时，数组的 `length` 属性也会随之改变。一般而言，数组的 `length` 属性将会减 N（N为**实际移除**的元素个数）。

### 描述

如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。

**注意**：请注意，splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。

- `startIndex` 开始索引
  - 如果 `startIndex` 是负值，则视为从 `arr.length + startIndex` 位开始
  - 如果 `startIndex` 超出了数组长度，则返回空数组
  - 如果只是用 `startIndex` 参数而不使用 `deleteCount` 和 `items`，表示删除所有元素，返回空数组
- `deleteCount` 删除数组元素数量
  - 如果 `deleteCount` 为0或负数，则不会移除任何元素，并返回一个空数组
  - 如果 `deleteCount` 被省略，则其相当于删除从开始索引到数组末尾的元素
- `items` 填补的数组元素
  - 如果 `items` 参数为 `Array` 类型，仍会被当作一个元素看待，插入到当前数组中
  - 如果不指定 `items` 参数，则 `splice()` 将只删除数组元素

## 示例

```javascript
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

myFish.splice(2, 0, 'drum'); // 在索引为2的位置插入'drum'
// myFish 变为 ["angel", "clown", "drum", "mandarin", "sturgeon"]

myFish.splice(2, 1); // 从索引为2的位置删除一项（也就是'drum'这一项）
// myFish 变为 ["angel", "clown", "mandarin", "sturgeon"]
```

### 标准示例

如下代码演示了 splice 的用法：

```javascript
var myFish = ["angel", "clown", "mandarin", "surgeon"];

//从第 2 位开始删除 0 个元素，插入 "drum"
var removed = myFish.splice(2, 0, "drum");
//运算后的 myFish:["angel", "clown", "drum", "mandarin", "surgeon"]
//被删除元素数组：[]，没有元素被删除

//从第 3 位开始删除 1 个元素
removed = myFish.splice(3, 1);
//运算后的myFish：["angel", "clown", "mandarin",]
//被删除元素数组：["surgeon"]

//从第 2 位开始删除 1 个元素，然后插入 "trumpet"
removed = myFish.splice(2, 1, "trumpet");
//运算后的myFish: ["angel", "clown", "trumpet", "surgeon"]
//被删除元素数组：["drum"]

//从第 0 位开始删除 2 个元素，然后插入 "parrot", "anemone" 和 "blue"
removed = myFish.splice(0, 2, "parrot", "anemone", "blue");
//运算后的myFish：["parrot", "anemone", "blue", "trumpet", "surgeon"]
//被删除元素的数组：["angel", "clown"]

//从第 3 位开始删除 2 个元素
removed = myFish.splice(3, Number.MAX_VALUE);
//运算后的myFish: ["parrot", "anemone", "blue"]
//被删除元素的数组：["trumpet", "surgeon"]

//从第1位开始删除其后所有即[1，end]的元素
removed = myFish.splice(1);
//运算后的myFish: ["parrot"]
//被删除元素的数组：["anemone","blue"]
```

