# Array.isArray()

`Array.isArray()` 用于确定传递的值是否是一个 `Array`。

## 语法

```
Array.isArray( value )
```

### 参数

| 参数    | 类型     | 描述           |
| ------- | -------- | -------------- |
| `value` | 任意类型 | 需要检测的值。 |


### 返回值

如果对象是 `Array` 的实例，则返回 `true` ；否则为 `false`。

## 示例

### 标准示例

```javascript
// 下面的函数调用都返回 true
Array.isArray([]);

Array.isArray([1]);

Array.isArray(new Array());

// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); 

// 下面的函数调用都返回 false
Array.isArray();

Array.isArray({});

Array.isArray(null);

Array.isArray(undefined);

Array.isArray(17);

Array.isArray('Array');

Array.isArray(true);

Array.isArray(false);

Array.isArray({ __proto__: Array.prototype });
```

### `instanceof` 和 `isArray`

当检测 Array 实例时, `Array.isArray` 优于 `instanceof` ，因为 `Array.isArray` 能检测 `iframes`。

```javascript
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true

// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```

## 兼容性

假如不存在 Array.isArray()，则在其他代码之前运行下面的代码将创建该方法。

```javascript
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```