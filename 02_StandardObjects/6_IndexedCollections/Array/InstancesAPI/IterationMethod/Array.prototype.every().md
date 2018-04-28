# Array.prototype.every()

`every()` 函数遍历数组中每一项元素，通过回调函数来判断是否所有元素满足一定的条件。

## 语法

```javascript
arr.every( callbackFunc [, thisArg ] )

callbackFunc = function (currentValue, index, array) {
    // do something to 
}
```

### 参数

- 实例方法参数

| 参数           | 类型            | 说明                       |
| -------------- | --------------- | -------------------------- |
| `callbackFunc` | `Function` 类型 | 用于测试数组元素的回调函数 |
| `thisArg`      | `Object` 类型   | 执行回调函数的 `this` 值   |

- 回调函数参数

| 参数           | 类型          | 说明                               |
| -------------- | ------------- | ---------------------------------- |
| `currentValue` | 任意类型      | 元素值，遍历时的每一项数组元素     |
| `index`        | `Number` 类型 | 元素的索引，对应元素在数组中的索引 |
| `array`        | `Array` 类型  | 原数组，整个被遍历的数组           |

### 返回值

返回值为 `Boolean` 类型，当所有数组元素满足回调函数的判断时返回 `true`，否则返回 `false`。

### 描述

- `every()` 函数为数组中的每个元素执行一次 `callback` 函数，直到它找到一个使 `callback` 返回 `false`（表示可转换为布尔值 `false` 的值）的元素。如果发现了一个这样的元素，`every()` 方法将会立即返回 `false`。否则，`callback` 为每一个元素返回 `true`，`every` 就会返回 `true`。`callback` 只会为那些已经被赋值的索引调用。不会为那些被删除或从来没被赋值的索引调用。
- 如果为 `every()` 提供一个 `thisArg` 参数，则该参数为调用 `callback` 时的 `this` 值。如果省略该参数，则 `callback` 被调用时的 `this` 值，在非严格模式下为全局对象，在严格模式下传入 `undefined`。
- `every` 不会改变原数组。
- `every` 遍历的元素范围在第一次调用 `callback` 之前就已确定了。在调用 `every` 之后添加到数组中的元素不会被 `callback` 访问到。如果数组中存在的元素被更改，则他们传入 `callback` 的值是 `every` 访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。
- `every()` 方法遇到第一个值时是 `false` 立即返回 `false` 并不再迭代下去。

## 示例

### 标准示例

下例检测数组中的所有元素是否都大于 10。

```javascript
function isBigEnough(element, index, array) {
  return (element >= 10);
}

var passed = [12, 5, 8, 130, 44].every(isBigEnough); // passed is false

passed = [12, 54, 18, 130, 44].every(isBigEnough); // passed is true
```

## 兼容性

在第 5 版时，`every()` 被添加进 ECMA-262 标准；因此在某些实现环境中不被支持。你可以把下面的代码放到脚本的开头来解决此问题，该代码允许在那些没有原生支持 `every()` 的实现环境中使用它。该算法是 ECMA-262 第5版中指定的算法，假定 Object 和 TypeError 拥有它们的初始值，且 `fun.call` 等价于 `Function.prototype.call`。

```javascript
if (!Array.prototype.every)
{
  Array.prototype.every = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
        throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && !fun.call(thisArg, t[i], i, t))
        return false;
    }

    return true;
  };
}
```

