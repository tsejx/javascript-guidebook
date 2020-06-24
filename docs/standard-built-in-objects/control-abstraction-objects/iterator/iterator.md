---
nav:
  title: 内置对象
  order: 2
group:
  title: 控制抽象对象
  path: /control-abstraction-objects/
  order: 15
title: Iterator
order: 1
---

# Iterator

遍历器（Iterator）为各种不同的数据结构提供统一的接口访问机制。任何数据结构只要部署 Iterator 接口，即无须初始化集合，以及索引的变量，而是使用迭代器对象的 `next` 方法，依次返回集合的下一项值，便于逐项处理该数据结构的所有成员，偏向程序化。

**ES5 中的 Loop 的缺点**

| 循环方法        | 缺点                                                         |
| --------------- | ------------------------------------------------------------ |
| `for` 语句      | 条件部分冗杂；多层嵌套需要定义多个变量，复杂度过高           |
| `for...in` 语句 | 只能获取对象键名，需要通过属性访问器的方括号形式获取键值；只适用于对象，其他数组类型不适用 |
| `forEach` 方法  | 不能中断，跳出循环                                           |

## 迭代器

迭代器是带有特殊接口的对象。含有一个 `next()` 方法，调用后返回一个包含两个属性的对象，分别是 `value`（表示属性值） 和 `done`（表示迭代是否完成）。当迭代完成后，即 `done` 属性为 `true` 时，调用 `next()` 无效。

模拟 Iterator 的内部实现（实质是一个返回迭代器对象的工厂函数）：

```js
let iterable = [1, 2, 3]

function createIterator(array){
    let count = 0
    return {
        next: function(){
            return count < array.length ?
                {value: array[count], done: false}:
            	{value: undefined, done: true}
        }
    }
}

let myIterator = createIterator(iterable)

myIterator.next()	// {value: 1, done: false}
myIterator.next()	// {value: 2, done: false}
myIterator.next()	// {value: 3, done: false}
myIterator.next()	// {value: undefined, done: true}
```

## 迭代器协议

迭代器对象不是新的语法或新的内置对象，而一种协议（ [迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE))，所有遵守这个协议的对象，都可以称之为迭代器。也就是说我们上面 ES5 的写法得到的对象遵循迭代器协议，即包含 `next`，调用 `next` 返回一个`result{value，done}`。

## 可迭代对象

满足可迭代协议的对象是可迭代对象。

可迭代协议：对象的 `Symbol.iterator` 属性的值是一个无参函数，该函数返回一个迭代器。

下面是数组的 `Symbol.iterator` 属性实现的迭代。

```js
const arr = [0, 1, 2]
const iter = arr[Symbol.iterator]()

iter.next()		// Output: {value: 0, done: false}
iter.next()		// Output: {value: 1, done: false}
iter.next()		// Output: {value: 2, done: false}
iter.next()		// Output: {value: undefined, done: true}
```

### 内置可迭代对象

原生具备 Iterator 接口的数据结构：

* Array
* Map
* Set
* String
* TypedArray
* 函数的 arguments 对象
* NodeList 对象

### 自定义可迭代对象

我们可以实现一个自己的可迭代对象：

```js
let myIterable = {}

myIterable[Symbol.iterator] = function*(){
    yield 1
    yield 2
    yield 3
}

[...myIterable]		// Output: [1, 2, 3]
```

### 接受可迭代对象的内置 API

许多 API 接受可迭代对象, 例如：[`Map([iterable])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Map)、[`WeakMap([iterable])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/WeakMap)、[`Set([iterable])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 和 [`WeakSet([iterable])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)：

```js
var myObj = {};
new Map([[1,"a"],[2,"b"],[3,"c"]]).get(2);               // "b"
new WeakMap([[{},"a"],[myObj,"b"],[{},"c"]]).get(myObj); // "b"
new Set([1, 2, 3]).has(3);                               // true
new Set("123").has("2");                                 // true
new WeakSet(function*() {
    yield {};
    yield myObj;
    yield {};
}()).has(myObj);
```

另外还有 [`Promise.all(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)、[`Promise.race(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) 以及 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)。

## for...of 循环

`for...of` 接受一个可迭代对象（Iterable），或者能被强制转换/包装成一个可迭代对象的值。遍历时，`for...of` 会获取可迭代对象的 `[Symbol.iterator]()`，对该迭代器逐次调用 `next()`，直到迭代器返回对象的 `done` 属性为 `true` 时，遍历结束，不对该 `value` 处理。

`for...of` 循环实例：

```js
var a = ["a","b","c","d","e"];

for (var val of a) {
    console.log( val );
}
// "a" "b" "c" "d" "e"
```

转换成普通 `for` 循环示例，等价于上面 `for...of` 循环：

```js
var a = ["a","b","c","d","e"];

for (var val, ret, it = a[Symbol.iterator]();
    (ret = it.next()) && !ret.done;
) {
    val = ret.value;
    console.log( val );
}
// "a" "b" "c" "d" "e"
```

---

**参考文章**：

* [ECMAScript 6 入门：Iterator](http://es6.ruanyifeng.com/#docs/iterator)
* [ES6 之迭代器（Iterator）](https://juejin.im/entry/5924f5302f301e006b35fba5)



