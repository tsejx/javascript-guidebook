## 类数组

　　拥有length属性和对应非负整数属性的对象叫做**类数组(array-like object)**

```javascript
//类数组演示
var a = {};
var i = 0;
while(i < 10){
    a[i] = i*i;
    i++;
}
a.length = i;

var total = 0;
for(var j = 0; j < a.length; j++){
    total += a[j];
}
```

　　有三个常见的类数组对象：

　　**【1】arguments对象**

```javascript
// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b');
arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false
```

　　**【2】DOM方法(如document.getElementsByTagName()方法)返回的对象**

```javascript
// DOM元素
var elts = document.getElementsByTagName('h3');
elts.length // 3
elts instanceof Array // false
```

　　**【3】字符串**

```javascript
// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false
```

　　**[注意]字符串是不可变值，故当把它们作为数组看待时，它们是只读的。如push()、sort()、reverse()、splice()等数组方法会修改数组，它们在字符串上是无效的，且会报错**

```javascript
var str = 'abc';
Array.prototype.forEach.call(str, function(chr) {
  console.log(chr); // a b c
});

Array.prototype.splice.call(str,1);
console.log(str); // TypeError: Cannot delete property '2' of [object String]
```

　　数组的slice方法将类数组对象变成真正的数组

```javascript
var arr = Array.prototype.slice.call(arrayLike);
```

　　Javascript数组方法是特意定义为通用的，因此它们不仅应用在真正的数组而且在类数组对象上都能正确工作。在ECMAScript5中，所有的数组方法都是通用的。在ECMAScript3中，除了toString()和toLocaleString()以外的所有方法也是通用的

```javascript
var a = {'0':'a','1':'b','2':'c',length:3};
Array.prototype.join.call(a,'+'); // 'a+b+c'
Array.prototype.slice.call(a,0); // ['a','b','c']
Array.prototype.map.call(a,function(x){return x.toUpperCase();}); // ['A','B','C']
```

