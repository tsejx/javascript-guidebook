# Array数组类型——转换方法

## Array.prototype.toLocaleString()

`toLocaleString()` 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

**语法**

> arr.toLocaleString()

**描述**

数组中的元素将会使用各自的 `toLocaleString()` 方法：

 - Object: Object.prototype.toLocaleString()
 - Number: Number.prototype.toLocaleString()
 - Date: Date.toLocaleString()

**示例**

```javascript
var number = 1337;
var date = new Date();
var myArr = [number, date, "foo"];

var str = myArr.toLocaleString(); 

console.log(str); // '1,377,2017/8/13 下午8:32:24,foo'
```


## Array.prototype.toString()

`toString()` 返回一个字符串，表示指定的数组及其元素。

**语法**

> arr.toString()

**描述**

Array 对象覆盖了 Object 的 `toString` 方法。对于数组对象，`toString` 方法返回一个字符串，该字符串由数组中的每个元素的 `toString()` 返回值经调用 `join()` 方法连接（由逗号隔开）组成。例如，下面的代码创建了一个数组，然后使用 toString 方法把该数组转成一个字符串。

```javascript
var monthNames = ['Jan', 'Feb', 'Mar', 'Apr'];
var myVar = monthNames.toString(); // assigns "Jan,Feb,Mar,Apr" to myVar.
```

当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。

## Array.prototype.valueOf()

`valueOf()` 返回原数组本身

```javascript
var arr = [1,2,3,4,5];
console.log(arr.valueof()); // [1,2,3,4,5]
console.log(arr.valueOf() instanceof Array); // true
```

## Array.prototype.join()

`join()` 方法将数组（或一个类数组对象）的所有元素连接到一个字符串中。

**语法**

>  var str = arr.join(separator)

*参数*
`separator`

 - 指定一个字符串来分隔数组的每个元素
 - 如果需要(separator)，将分隔符转换为字符串。
 - 如果省略()，数组元素用逗号','分隔。
 - 如果separator是空字符串('')，则所有元素之间都没有任何字符。
 
*返回值*

一个所有数组元素连接的字符串。如果 `arr.length` 为0，则返回空字符串。

**描述**

所有的数组元素被转换成字符串，再用一个分隔符将这些字符串连接起来。如果元素是undefined 或者null， 则会转化成空字符串。