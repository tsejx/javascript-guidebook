# Array.prototype.push()

`push()` 函数用于向当前数组的添加一个或多个元素，并返回新的数组长度。新的元素将会依次添加到数组的末尾。

## 语法

```javascript
arr.push( item1 [,items... ] )
```

### 参数

| 参数    | 类型           | 描述                                         |
| ------- | -------------- | -------------------------------------------- |
| `item1` | 任意类型       | 添加到当前数组末尾处的元素。                 |
| `itemN` | 任意类型，可选 | 要添加到当前数组末尾处的其他项，可以有多个。 |

**注意**：如果添加的元素类型为数组类型（`Array`），仍然会被当作一个元素看待，只是这个元素是数组类型而已。如果要合并两个数组，请使用 `concat()` 函数。

### 返回值

`push()` 函数的返回值为 `Number` 类型，返回添加元素后的数组长度。

### 描述

当向数组中添加新的元素时，数组的 `length` 属性也会随之改变。一般而言，数组的 `length` 属性将会加 `N` （ `N`为添加的元素个数）。

`push()` 方法有意具有通用性。该方法和 `call()` 或 `apply()` 一起使用时，可应用在类似数组的对象上。`push()` 方法根据 length 属性来决定从哪里开始插入给定的值。如果 `length` 不能被转成一个数值，则插入的元素索引为 0，包括 `length` 不存在时。当 `length` 不存在时，将会创建它。

唯一的原生类数组（Array-Like）对象是 `Strings`，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

## 示例

### 添加元素到数组

```javascript
var sports = ['soccer', 'baseball'];
var total = sports.push('football', 'swimming');

sports; // ['soccer', 'baseball', 'football', 'swimming']

total; // 4
```

### 合并两个数组

该示例使用 `apply()` 添加第二个数组的所有元素。注意当第二个数组太大时不要使用这个方法来合并数组，因为事实上一个函数能够接受的参数个数是有限制的。

```javascript
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);

vegetables; // ['parsnip', 'potato', 'celery', 'beetroot']
```

### 像数组一样使用对象

如上所述，`push()` 是特意设计为通用的，我们可以使用它来获得便利。正如下面的例子所示， `Array.prototype.push` 可以在一个对象上工作。 注意，我们没有创建一个数组来存储对象的集合。 相反，我们将该集合存储在对象本身上，并使用在 `Array.prototype.push` 上使用的 `call` 来调用该方法，使其认为我们正在处理数组，而它只是像平常一样运作，这要感谢 JavaScript 允许我们建立任意的执行上下文。

```javascript
var obj = {
    length: 0,

    addElem: function addElem (elem) {
        // obj.length is automatically incremented 
        // every time an element is added.
        [].push.call(this, elem);
    }
};

// Let's add some empty objects just to illustrate.
obj.addElem({});
obj.addElem({});
console.log(obj.length); // 2
```

添加后的对象变成类数组对象，即新加入元素的键对应数组的索引，并且对象有一个 `length` 属性