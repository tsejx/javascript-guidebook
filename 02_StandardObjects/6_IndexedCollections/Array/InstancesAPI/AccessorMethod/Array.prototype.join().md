## Array.prototype.join()

`join()` 函数将数组（或一个类数组对象）的所有元素连接到一个字符串中。

## 语法

```javascript
var str = arr.jon(separator)
```

### 参数

| 参数        | 类型          | 描述                             |
| ----------- | ------------- | -------------------------------- |
| `separator` | `String` 类型 | 将数组各元素连接成字符串的字符。 |

### 返回值

一个所有数组元素连接的字符串。如果数组长度 `arr.length` 为0，则返回空字符串。

### 描述

所有的数组元素被转换成字符串，再用一个分隔符将这些字符串连接起来。如果元素是 `undefined` 或者 `null`， 则会转化成空字符串。

## 示例

### 标准示例

```javascript
var arr = ['1', '2', '3', '4', '5'];

// 不传参数默认以逗号作为分隔符
arr.join();			// '1,2,3,4,5'

arr.join(', ');		// '1, 2, 3, 4, 5'

arr.join(' + ');	// '1 + 2 + 3 + 4 + 5'

arr.join('');		// '12345'
```

### 连接类数组对象

下面的示例将连接类数组对象（arguments），通过在 `Array.prototype.join` 上调用`Function.prototype.call`。

```javascript
function func(a, b, c) {
  var s = Array.prototype.join.call(arguments);
    
  console.log(s); 		
  // '1,a,true'
}

func(1, 'a', true);
```

