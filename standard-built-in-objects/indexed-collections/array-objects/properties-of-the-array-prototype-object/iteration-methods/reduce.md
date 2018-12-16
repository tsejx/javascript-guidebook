## Array.prototype.reduce

`Array.prototype.reduce()` 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。对空数组时不会执行回调函数。

该方法可以作为一个高阶函数，用于函数的 Compose。

### 语法

```javascript
arr.reduce( callback = function(acc, value, index, arr){} [, initialValue ] )
```

| 实例方法参数   | 说明                                                         | 类型     |
| -------------- | ------------------------------------------------------------ | -------- |
| `callback`     | 回调函数，用于遍历数组成员时执行                             | function |
| `initialValue` | （可选）累加器初始值，用作第一个调用回调函数的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用将报错。 | any      |

| 回调函数参数 | 说明                                                         | 类型   |
| ------------ | ------------------------------------------------------------ | ------ |
| `acc`        | 累加器累加回调的返回值，它是上一次调用回调时返回的累积值，或 `initialValue`。 | number |
| `value`      | 数组中正在处理的数组成员                                     | any    |
| `index`      | 数组中正在处理的当前成员的索引                               | number |
| `arr`        | 调用函数的数组                                               | array  |

**返回值：** 函数累计处理的结果。

### 描述

`reduce()` 方法为数组中的每一个元素依次执行 `callback` 回调函数，不包括数组中被删除或从未被赋值的元素。

回调函数第一次执行时，`acc` 和 `currentValue` 的取值有两种情况：

- 回调函数参数取值问题
  - 提供 `initialValue`，累加器 `acc` 取值为 `initialValue`，`currentValue` 取数组中的第一个值
  - 没有提供 `initialValue`，累加器 `acc` 取数组中的第一个值，`currentValue` 取数组中的第二个值。
- 回调函数调用问题
  - 如果提供 `initialValue`，从索引0开始执行回调函数。
  - 如果没有提供 `initialValue`，`reduce` 会从索引1的地方开始执行回调函数，跳过第一个索引。
  - 如果数组为空且没有提供 `initialValue`，会抛出 `TypeError` 。
  - 如果数组仅有一个元素（无论位置如何）并且没有提供 `initialValue`， 或者有提供 `initialValue` 但是数组为空，那么此唯一值将被返回并且 `callback` 不会被执行。

### 运行机制

假如运行下段代码：

```js
[0, 1, 2, 3, 4].reduce((acc, val, index, arr) => acc + val)
```

回调函数被调用四次，每次调用的参数和返回值如下表所示。

| callback 回调函数 | acc 累加器 | val 当前值 | index 当前索引 |       arr       | 返回值 |
| :---------------: | :--------: | :--------: | :------------: | :-------------: | :----: |
|    first call     |     0      |     1      |       1        | [0, 1, 2, 3, 4] |   1    |
|    second call    |     1      |     2      |       2        | [0, 1, 2, 3, 4] |   3    |
|    third call     |     3      |     3      |       3        | [0, 1, 2, 3, 4] |   6    |
|    fourth call    |     6      |     4      |       4        | [0, 1, 2, 3, 4] |   10   |

`reduce()` 方法最终的返回值为10。

如果你打算提供一个初始值作为 `reduce` 方法的第二个参数，以下是运行过程及结果。

```javascript
[0, 1, 2, 3, 4].reduce((acc, val, index, arr) => accumulator + currentValue, 10 );
```

| callback 回调函数 | acc 累加器 | val 当前值 | index 当前索引 |       arr       | 返回值 |
| :---------------: | :--------: | :--------: | :------------: | :-------------: | :----: |
|    first call     |     10     |     0      |       0        | [0, 1, 2, 3, 4] |   10   |
|    second call    |     10     |     1      |       1        | [0, 1, 2, 3, 4] |   11   |
|    third call     |     11     |     2      |       2        | [0, 1, 2, 3, 4] |   13   |
|    fourth call    |     13     |     3      |       3        | [0, 1, 2, 3, 4] |   16   |
|    fifth call     |     16     |     4      |       4        | [0, 1, 2, 3, 4] |   20   |

`reduce()` 方法最终的返回值为20。

### 示例

#### 标准示例

```js
const res = [1, 2, 3, 4, 5].reduce((acc, item) => acc + item, 0)

console.log(res)		// Outputs: 15
```

```js
const flat = [[0, 1], [2, 3], [4, 5]].reduce((a, b) => a.concat(b), [])

console.log(flat)		// Outputs: 
```

#### 初始值的必要性

提供初始值通常更安全。

没有提供初始值。

```js
const maxCallback = ( pre, current ) => Math.max( pre.x, current.x )

[{ x: 22}, { x: 42}].reduce(maxCallback)		// 42

[{ x: 22}].reduce(maxCallback)					// { x: 22 }

[].reduce(maxCallback)							// TypeError
```

提供初始值。

```js
const maxCallback = ( max, current ) => Math,max( max, current )

[{ x: 22 }, { x: 42 }].map( el => el.x ).reduce( maxCallback2, -Infinity );
```

#### 数组求和、求积和最大值

```js
const sum = [ 0, 1, 2, 3 ].reduce(( acc, cur ) => acc + cur, 0)		// Outputs: 6

const product = [1, 2, 3, 4, 5].reduce((a, b) => a * b,1)			// Outputs: 120

const max = [1, 2, 3, 4, 5].reduce((a, b) => a > b ? a: b)			// Outputs: 5
```

#### 数组元素

找出长度最长的数组元素。

```js
const findLongest = (entries) => entries.reduce ((prev, cur) => cur.length > prev.length ? cur : prev, '')

console.log(findLongest([1, 2, 3, 'ab', 4, 'bcd', 5, 6785, 4])); 	// Outputs: 'bcd'
```

#### 二维数组扁平化

```js
[[0, 1], [2, 3], [4, 5]].reduce((a, b) => a.concat(b),[])	// Outputs: [0, 1, 2, 3, 4, 5]
```

你也可以写成箭头函数的形式：

```js
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(( acc, cur ) => acc.concat(cur), [])
```

#### 计算数组成员次数

```javascript
const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

const countedNames = names.reduce((allNames, name) => { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});

// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```
