# Array.prototype.entries()

`entries()` 方法返回一个新的 `Array Iterator` 对象，该对象包含数组中每个索引的键/值对。

## 语法

```javascript
arr.entries()
```

### 返回值

返回一个新的 `Array` 迭代器对象。`Array Iterator` 是对象，它的原型上有一个 `next` 方法，可用于便利迭代器取得原数组的  `[key, value]` 。

## 示例

### `Array Iterator`

```javascript
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);

/*Array Iterator {}
         __proto__:Array Iterator
         next:ƒ next()
         Symbol(Symbol.toStringTag):"Array Iterator"
         __proto__:Object
*/
```

###  `iterator.next`

```javascript
var arr = ["a", "b", "c"]; 
var iterator = arr.entries();
console.log(iterator.next());

/* {value: Array(2), done: false}
          done:false
          value:(2) [0, "a"]
           __proto__: Object
*/
// iterator.next()返回一个对象，对于有元素的数组，
// 是next{ value: Array(2), done: false }；
// next.done 用于指示迭代器是否完成：在每次迭代时进行更新而且都是false，
// 直到迭代器结束done才是true。
// next.value是一个["key":"value"]的数组，是返回的迭代器中的元素值。
```

### `iterator.next` 方法运行

```javascript
var arr = ["a", "b", "c"];
var iter = arr.entries();
var a = [];

// for(var i=0; i< arr.length; i++){   // 实际使用的是这个 
for(var i=0; i< arr.length+1; i++){    // 注意，是length+1，比数组的长度大
    var tem = iter.next();             // 每次迭代时更新next
    console.log(tem.done);             // 这里可以看到更新后的done都是false
    if(tem.done !== true){             // 遍历迭代器结束done才是true
        console.log(tem.value);
        a[i]=tem.value;
    }
}

console.log(a);                         // 遍历完毕，输出next.value的数组
```

### 二维数组按行排序

```javascript
function sortArr(arr) {
    var goNext = true;
    var entries = arr.entries();
    while (goNext) {
        var result = entries.next();
        if (result.done !== true) {
            result.value[1].sort((a, b) => a - b);
            goNext = true;
        } else {
            goNext = false;
        }
    }
    return arr;
}

var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
sortArr(arr);

/*(4) [Array(2), Array(5), Array(5), Array(4)]
    0:(2) [1, 34]
    1:(5) [2, 3, 44, 234, 456]
    2:(5) [1, 4, 5, 6, 4567]
    3:(4) [1, 23, 34, 78]
    length:4
    __proto__:Array(0)
*/
```

### 使用 `for...of` 循环

```javascript
var arr = ["a", "b", "c"];
var iterator = arr.entries();
// undefined

for (let e of iterator) {
    console.log(e);
}

// [0, "a"] 
// [1, "b"] 
// [2, "c"]
```

