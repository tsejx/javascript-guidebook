# Array数组方法——栈和队列方法

`push()` 和 `pop()`方法允许将数组当作栈来使用。`unshift()` 和 `shift()`方法的行为非常类似于 `push()` 和 `pop()`，不一样的是前者是在数组的头部而非尾部进行元素的插入和删除操作

　　栈是一种LIFO(Last-In-First-Out，后进先出)的数据结构，也就是最新添加的项最早被移除。而栈中项的插入(叫做推入)和移除(叫做弹出)，只发生在一个位置——栈的顶部。Javascript为数组专门提供了 `push()` 和 `pop()` 方法，以便实现类似栈的行为

　　队列数据结构的访问规则是FIFO(First-In-First-Out，先进先出)。队列在列表的末端添加项，从列表的前端移除项。结合使用 `shift()` 和 `push()` 方法，可以像使用队列一样使用数组

## Array.prototype.push()

push() 方法将一个或多个元素添加到数组的末尾，并返回新数组的长度。

**语法**

> arr.push(ele1, ..., eleN);

*参数*

 - `eleN` 被添加到数组末尾的元素

*返回值*

当调用该方法时，新的 `length` 属性值将被返回。

**描述**

push方法将值追加到数组中。

push 方法有意具有通用性。该方法和 `call()` 或 `apply()` 一起使用时，可应用在类似数组的对象上。push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。

唯一的原生类数组（array-like）对象是 Strings，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

**示例**

*添加元素到数组*

```javascript
var sports = ['soccer', 'baseball'];
var total = sports.push('football', 'swimming');

console.log(sports); // ['soccer', 'baseball', 'football', 'swimming']

console.log(total); // 4
```

*合并两个数组*

该示例使用 `apply()` 添加第二个数组的所有元素。注意当第二个数组（如示例中的moreVegs）太大时不要使用这个方法来合并数组，因为事实上一个函数能够接受的参数个数是有限制的。具体可以参考 `apply()`。

```javascript
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);

console.log(vegetables); // ['parsnip', 'potato', 'celery', 'beetroot']
```

*像数组一样使用对象*

如上所述，push 是特意设计为通用的，我们可以使用它来获得便利。正如下面的例子所示，Array.prototype.push 可以在一个对象上工作。 注意，我们没有创建一个数组来存储对象的集合。 相反，我们将该集合存储在对象本身上，并使用在 Array.prototype.push 上使用的 call 来调用该方法，使其认为我们正在处理数组，而它只是像平常一样运作，这要感谢 JavaScript 允许我们建立任意的执行上下文。

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

添加后的对象变成类数组对象，即新加入元素的键对应数组的索引，并且对象有一个length属性

## Array.prototype.pop()

`pop()` 方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

**语法**

> arr.pop()

*返回值*

从数组中删除的元素（当数组为空时返回undefined）

**描述**

pop 方法从一个数组中删除并返回最后一个元素。

pop 方法有意具有通用性。该方法和 `call()` 或 `apply()` 一起使用时，可应用在类似数组的对象上。pop方法根据 length属性来确定最后一个元素的位置。如果不包含length属性或length属性不能被转成一个数值，会将length置为0，并返回undefined。

如果你在一个空数组上调用 pop()，它返回  undefined。

**示例**

```javascript
let myFish = ["angel", "clown", "mandarin", "surgeon"];

let popped = myFish.pop();

console.log(myFish); // ["angel", "clown", "mandarin"]

console.log(popped); // surgeon
```

## Array.prototype.shift()

shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。


**语法**

> arr.shift()

*返回值*

从数组中删除的元素; undefined 如果数组为空。 

**描述**

shift 方法移除索引为 0 的元素(即第一个元素)，并返回被移除的元素，其他元素的索引值随之减 1。如果 length 属性的值为 0 (长度为 0)，则返回 undefined。

shift 方法并不局限于数组：这个方法能够通过 call 或 apply 方法作用于类似数组的对象上。但是对于没有 length 属性（从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

**示例**

*移除数组中的一个元素*

```javascript
let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

console.log('调用 shift 之前: ' + myFish); // "调用 shift 之前: angel,clown,mandarin,surgeon"

var shifted = myFish.shift(); 

console.log('调用 shift 之后: ' + myFish); // "调用 shift 之后: clown,mandarin,surgeon" 

console.log('被删除的元素: ' + shifted); // "被删除的元素: angel"
```

## Array.prototype.unshift()

unshift() 方法将一个或多个元素添加到数组的开头，并返回新数组的长度。

**语法**

> arr.unshift(ele1, ..., eleN);

*参数*

 - `eleN` 被添加到数组末尾的元素

*返回值*

当调用该方法时，新数组的 `length` 属性值将被返回。

**描述**

unshift 方法会在调用它的类数组（array-like）对象的开始位置插入给定的参数。

unshift 特意被设计成具有通用性；这个方法能够通过 call 或 apply 方法作用于类似数组的对象上。不过对于没有 length 属性（代表从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

**示例**

```javascript
var arr = [1, 2];

arr.unshift(0); //result of call is 3, the new array length
//arr is [0, 1, 2]

arr.unshift(-2, -1); // = 5
//arr is [-2, -1, 0, 1, 2]

arr.unshift( [-3] );
//arr is [[-3], -2, -1, 0, 1, 2]
```

