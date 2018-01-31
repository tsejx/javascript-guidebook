# Array数组类型 

## 创建数组

　　有两种创建数组的方法：使用**字面量语法**和使用**Array()构造函数**

**语法**

> [ele0, ele1, ele2, ... , eleN];
  new Array(ele0, ele1[, ele2[, ...[, eleN]]])
  new Array(arrayLength);
  
 
### 字面量

　　使用数组字面量是创建数组最简单的方法，在方括号中将数组元素用逗号隔开即可

```javascript
var empty = [];                    //没有元素的数组
var primes = [2,3,5,7,11];         //有5个数值的数组
```

　　虽然Javascript数组与其他语言中的数组都是数据的有序列表，但与其他语言不同的是，Javascript数组的每一项可以保存任何类型的数据

```javascript
var misc = [1.1,true, "a"];           //3个不同类型的元素
```

　　数组字面量中的值不一定要是常量，它们可以是任意的表达式

```javascript
var base = 1024;
var table = [base,base+1,base+2,base+3];
```

　　它可以包含对象字面量或其他数组字面量

```javascript
var b = [ [1,{x:1,y:2}],[2,{x:3,y:4}] ];
```

　　如果数组的元素还是数组，就形成了多维数组

```javascript
var a = [[1, 2], [3, 4]];
```

　　**[注意]使用数字字面量表示法时，不会调用Array构造函数**

### 构造函数

　　有三种方式调用构造函数

　　**【1】没有参数，创建一个空数组**

```javascript
//该方法创建一个没有任何元素的空数组，等同于数组直接量[]
var a = new Array();
```


　　**【2】有一个数值参数，该参数用于指定数组的长度**

```javascript
var a  = new Array(10);
console.log(a);//[]
console.log(a[0],a.length);//undefined 10
```

  [注意]若存在一个其他类型的参数，则会创建包含那个值的只有一项的数组

```javascript
var a  = new Array('10');
console.log(a); // ['10']
console.log(a[0],a.length); // 10 1
```

　　**【3】有多个参数时，参数表示为数组的具体元素**

```javascript
var a = new Array(1,2,3);
console.log(a); // [1,2,3]
console.log(a[0],a[1],a[2]); // 1 2 3
```

　　**使用Array()构造函数时，可以省略new操作符**

```javascript
var a1 = Array();
var a2 = Array(10);
var a3 = Array(1,2,3);
console.log(a1,a2,a3); // [] [] [1,2,3]
```

## 数组本质
　　
　　数组是类似列表的对象，本质上，数组是一种特殊的对象（有次序的对象），在原型中提供了遍历以及改变其中元素的很多方法。 数组的长度及其中元素的类型都是不固定的。因为数组的长度可读可写，有时数组中的元素也不是在连续的位置，所以JavaScript 数组不一定是密集的。通常情况下，这是一些方便的特性；如果这些特性不适用于你的特定使用场景，你可以考虑使用固定类型数组。

```javascript
typeof [1, 2, 3] // "object"
```

　　数组的特殊性体现在，它的键名是按次序排列的一组整数(0，1，2…)。由于数组成员的键名是固定的，因此数组不用为每个元素指定键名，而对象的每个成员都必须指定键名

```javascript
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // ["0", "1", "2"]

var obj = {
    name1: 'a',
    name2: 'b',
    name3: 'c'
};
```

　　数组是对象的特殊形式，使用方括号访问数组元素就像用方括号访问对象的属性一样

　　Javascript语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串，然后将其作为属性名来使用

```javascript
o={};       // 创建一个普通的对象
o[1]="one"; // 用一个整数来索引它

// 数值键名被自动转成字符串
var arr = ['a', 'b', 'c'];
arr['0'] // 'a'
arr[0] // 'a'
```

　　但是，一定要区分数组索引和对象的属性名：所有的索引都是属性名，但只有在0~232-2(4294967294)之间的整数属性名才是索引

```javascript
var a = [];

//索引
a['1000'] = 'abc';
a[1000] // 'abc'

//索引
a[1.00] = 6;
a[1] // 6
```

　　**[注意]单独的数值不能作为标识符(identifier)。所以，数组成员只能用方括号法表示**

```javascript
var arr = [1, 2, 3];
arr[0]; // 1
arr.0; // SyntaxError
```

　　可以使用负数或非整数来索引数组。但由于其不在0~2的32次方-2的范围内，所以其只是数组的属性名，而不是数组的索引，明显的特征是不改变数组的长度

```javascript
var a = [1,2,3];

//属性名
a[-1.23] = true;
console.log(a.length); // 3

//索引
a[10] = 5;
console.log(a.length); // 11

//属性名
a['abc'] = 'testing';
console.log(a.length); // 11
```

 
## 稀疏数组

　　稀疏数组就是包含从0开始的**不连续索引的数组**

　　**【1】制造稀疏数组最直接的方法就是使用delete操作符**

```javascript
var a = [1,2,3,4,5];
delete a[1];
console.log(a[1]); // undefined
console.log(1 in a); // false
```
　　**【2】数组的逗号之间可以省略元素值，通过省略元素值也可以制造稀疏数组**

```javascript
var a =[1,,3,4,5];
console.log(a[1]);//undefined
console.log(1 in a);//false
```

　　**[注意]省略的元素值和值为 `undefined` 的元素值是有区别的**

```javascript
var a =[1,,3,4,5];
console.log(a[1]); // undefined
console.log(1 in a); // false

var a =[1,undefined,3,4,5];
console.log(a[1]); // undefined
console.log(1 in a); // true
```

　　如果在数组的末尾使用逗号时，浏览器之间是有差别的。标准浏览器会忽略该逗号，而IE8-浏览器则会在末尾添加undefined值

```javascript
//标准浏览器输出[1,2]，而IE8-浏览器输出[1,2,undefined]
var a = [1,2,];
console.log(a);

//标准浏览器输出2，而IE8-浏览器输出3
var a = [,,];
console.log(a.length);
```

　　足够稀疏的数组通常在实现上比稠密的数组更慢，内存利用率更高，在这样的数组中查找元素的时间与常规对象属性的查找时间一样长

## 数组长度
　
　　每个数组有一个length属性，就是这个属性使其区别于常规的Javascript对象。针对稠密(也就是非稀疏)数组，length属性值代表数组中元素的个数，其值比数组中最大的索引大1

```javascript
[].length     //=>0:数组没有元素,length为0
['a','b','c'].length   //=>3:最大的索引为2，length为3
```

　　当数组是稀疏数组时，length属性值大于元素的个数，同样地，其值比数组中最大的索引大1

```javascript
[,,,].length; // 3
(Array(10)).length; //10
var a = [1,2,3];
console.log(a.length); // 3
delete a[1];
console.log(a.length); // 3
```

　　数组的特殊性主要体现在数组长度是可以动态调整的：

　　**【1】如果为一个数组元素赋值，索引i大于等于现有数组的长度时，length属性的值将设置为i+1**

```javascript
var arr = ['a', 'b'];
arr.length // 2

arr[2] = 'c';
arr.length // 3

arr[9] = 'd';
arr.length // 10

arr[1000] = 'e';
arr.length // 1001
```
　　**【2】设置length属性为小于当前长度的非负整数n时，当前数组索引值大于等于n的元素将从中删除**

```javascript
a=[1,2,3,4,5];   //从5个元素的数组开始
a.length = 3;    //现在a为[1,2,3]
a.length = 0;    //删除所有的元素。a为[]
a.length = 5;    //长度为5，但是没有元素，就像new Array(5)
　　[注意]将数组清空的一个有效方法，就是将length属性设为0

var arr = [ 'a', 'b', 'c' ];
arr.length = 0;
arr // []
```

　　**【3】将数组的length属性值设置为大于其当前的长度。实际上这不会向数组中添加新的元素，它只是在数组尾部创建一个空的区域**

```javascript
var a = ['a'];
a.length = 3;
console.log(a[1]);//undefined
console.log(1 in a);//false
```

　　如果人为设置length为不合法的值(即0——232-2范围以外的值)，Javascript会报错

```javascript
// 设置负值
[].length = -1 // RangeError: Invalid array length

// 数组元素个数大于等于2的32次方
[].length = Math.pow(2,32)// RangeError: Invalid array length

// 设置字符串
[].length = 'abc'// RangeError: Invalid array length
```

　　由于数组本质上是对象，所以可以为数组添加属性，但是这不影响length属性的值

```javascript
var a = [];

a['p'] = 'abc';
console.log(a.length);// 0

a[2.1] = 'abc';
console.log(a.length);// 0
```
 

## 数组遍历

　　使用for循环遍历数组元素是最常见的方法

```javascript
var a = [1, 2, 3];
for(var i = 0; i < a.length; i++) {
  console.log(a[i]);
}
```

　　当然，也可以使用while循环

```javascript
var a = [1, 2, 3];
var i = 0;
while (i < a.length) {
  console.log(a[i]);
  i++;
}

var l = a.length;
while (l--) {
  console.log(a[l]);
}
```
　　但如果数组是稀疏数组时，使用for循环，就需要添加一些条件

```javascript
//跳过不存在的元素
var a = [1,,,2];
for(var i = 0; i < a.length; i++){
    if(!(i in a)) continue;
    console.log(a[i]);
}
```

　　还可以使用for/in循环处理稀疏数组。循环每次将一个**可枚举的属性名**（包括数组索引）赋值给循环变量。不存在的索引将不会遍历到

```javascript
var a = [1,,,2];
for(var i in a){
    console.log(a[i]);
}
```

　　由于for/in循环能够枚举继承的属性名，如添加到Array.prototype中的方法。由于这个原因，在数组上不应该使用for/in循环，除非使用额外的检测方法来过滤不想要的属性

```javascript
var a = [1,,,2];
a.b = 'b';
for(var i in a){
    console.log(a[i]);//1 2 'b'
}
```

```javascript
//跳过不是非负整数的i
var a = [1,,,2];
a.b = 'b';
for(var i in a){
    if(String(Math.floor(Math.abs(Number(i)))) !== i) continue;
    console.log(a[i]);//1 2
}
``` 
　　javascript规范允许for/in循环以不同的顺序遍历对象的属性。通常数组元素的遍历实现是升序的，但不能保证一定是这样的。特别地，如果数组同时拥有对象属性和数组元素，返回的属性名很可能是按照创建的顺序而非数值的大小顺序。如果算法依赖于遍历的顺序，那么最好不要使用for/in而用常规的for循环


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

## 数组乱序

　　数组乱序的英文为shuffle，也称为洗牌。一般地，有如下两种方法

　　**1、给数组原生的sort()方法传入一个函数，此函数随机返回1或-1，达到随机排列数组元素的目的**

```javascript
var array = [1,2,3,4,5];
console.log(array.sort(function(){return Math.random() - 0.5})); // [2,1,5,4,3]
```
　　如果打乱100000个元素的数组，则需要100ms左右

```javascript
var arr = [];
var NUM = 100000;
for(var i = 0; i < NUM; i++){
  arr.push(i);
}
var startTime = +new Date();
arr.sort(function(){return Math.random() - 0.5});
console.log(+new Date() - startTime);//100
```

　　**2、第二种方法是依次遍历数组中的每个元素，遍历到的元素与一个随机位置的元素交换值**

```javascript
var arr = [1,2,3,4,5];
for(var i = 0 ; i < arr.length; i++){
  var randomIndex = Math.floor(Math.random()*arr.length);
  [arr[i],arr[randomIndex]] = [arr[randomIndex],arr[i]];
}
console.log(arr);//[2, 3, 1, 4, 5]
```

　　如果打乱100000个元素的数组，需要13ms左右，因此第二种方法效率较高

```javascript
var arr = [];
var NUM = 100000;
for(var i = 0; i < NUM; i++){
  arr.push(i);
}
var startTime = +new Date();
for(var i = 0 ; i < arr.length; i++){
  var randomIndex = Math.floor(Math.random()*arr.length);
  [arr[i],arr[randomIndex]] = [arr[randomIndex],arr[i]];
}
console.log(+new Date() - startTime); // 13
```

## 数组方法

### Mutator 方法

下面这些方法会改变调用它们的对象自身的值


方法名|描述
---|---
Array.prototype.copyWithin()|在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值
Array.prototype.fill()|将数组中指定区间的所有元素的值，都替换成某个固定的值
Array.prototype.pop()|删除数组的最后一个元素，并返回这个元素
Array.prototype.push()|在数组的末尾增加一个或多个元素，并返回数组的新长度
Array.prototype.reverse()|颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个
Array.prototype.shift()|删除数组的第一个元素，并返回这个元素
Array.prototype.sort()|对数组元素进行排序，并返回当前数组
Array.prototype.splice()|在任意的位置给数组添加或删除任意个元素
Array.prototype.unshift()|在数组的开头增加一个或多个元素，并返回数组的新长度


### Accessor 方法

下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值

方法名|描述
---|---
Array.prototype.indexOf()|返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1
Array.prototype.lastIndexOf()|返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
Array.prototype.concat()|返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组
Array.prototype.includes()|判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false
Array.prototype.join()|连接所有数组元素组成一个字符串
Array.prototype.slice()|抽取当前数组中的一段元素组合成一个新数组
Array.prototype.toSource()|返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 Object.prototype.toSource()
Array.prototype.toString()|返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。
Array.prototype.toLocaleString()|返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法


### Iteration 方法

方法名|描述
---|---
Array.prototype.forEach()|为数组中的每个元素执行一次回调函数。
Array.prototype.entries()|返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。
Array.prototype.every()|如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。
Array.prototype.some()|如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。
Array.prototype.filter()|将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
Array.prototype.find()|找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
Array.prototype.findIndex()|找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。
Array.prototype.keys()|返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。
Array.prototype.map()|返回一个由回调函数的返回值组成的新数组。
Array.prototype.reduce()|从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
Array.prototype.reduceRight()|从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
Array.prototype.values()|返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。
Array.prototype[@@iterator]()|和上面的 values() 方法是同一个函数。