# 剩余参数

剩余参数（亦称 rest 参数）用于获取函数的多余参数，这样就不要使用 arguments 对象了。剩余参数搭配的变量是一个**数组**，该变量将多余的参数放入数组中。

```js
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

上面代码的 `add` 函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。

下面是一个 rest 参数代替 `arguments` 变量的例子。

```js
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

`arguments` 对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用 `Array.prototype.slice.call` 先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。下面是一个利用 rest 参数改写数组 `push` 方法的例子。

```js
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)
```

## reset 参数与 arguments 对象的区别

- rest 参数只包含那些没有对应形参的实参；而 arguments 对象包含了传给函数的所有实参。
- arguments 对象不是一个真实的数组；而 rest 参数是真实的 Array 实例，也就是说你能够在它上面直接使用所有的数组方法。
- arguments 对象对象还有一些附加的属性 （比如 callee 属性）。

## 注意

- rest 参数之后不能再有其他参数（即**只能是最后一个参数**），否则会报错。

```js
function f(a, ...b, c) { ... } // 报错
```

- 函数的 `length` 属性，不包括 rest 参数。

```js
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```