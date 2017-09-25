# Javascript中数组的22种方法 

## 前面的话

　　数组总共有22种方法，本文将其分为对象继承方法、数组转换方法、栈和队列方法、数组排序方法、数组拼接方法、创建子数组方法、数组删改方法、数组位置方法、数组归并方法和数组迭代方法共10类来进行详细介绍

 
## 对象继承方法
　
　　数组是一种特殊的对象，继承了对象Object的`toString()`、`toLocaleString()`和`valueOf()`方法

###【toString()】

　　toString()方法返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串

　　[注意]该方法的返回值与不使用任何参数调用join()方法返回的字符串相同

```javascript
[1,2,3].toString();//'1,2,3'
['a','b','c'].toString();//'a,b,c'
[1,[2,'c']].toString();//'1,2,c'
```

　　由于alert()要接收字符串参数，它会在后台调用`toString()`方法，会得到与`toString()`方法相同的结果

```javascript
alert([1,2,3]);//'1,2,3'
```

###【toLocaleString()】

　　toLocaleString()是toString()方法的本地化版本，经常返回与toString()方法相同的值，但也不总如此

```javascript
var person1 = {
    toLocaleString: function(){
        return 'Nikolaos';
    },
    toString: function(){
        return 'Nicholas';
    }
};
var person2 = {
    toLocaleString: function(){
        return 'Grigorios';
    },
    toString: function(){
        return 'Greg';
    }
};
var people = [person1,person2];
console.log(people.toString());//'Nicholas,Greg'
console.log(people.toLocaleString());//'Nikolaos,Grigorios'
```

　　如果数组中的某一项的值是null或者undefined，则该值在toLocaleString()和toString()方法返回的结果中以空字符串表示

```javascript
var colors = [1,undefined,2,null,3];
console.log(colors.toString());//'1,,2,,3'
console.log(colors.toLocaleString());//'1,,2,,3'
```

###【valueOf()】

　　valueOf()方法返回数组对象本身
　　
```
var a = [1, 2, 3];
console.log(a.valueOf());// [1, 2, 3]
console.log(a.valueOf() instanceof Array);//true
```

## 数组转换方法

###【join()】

　　`Array.join()`方法是`String.split()`方法的逆向操作，后者是将字符串分割成若干块来创建一个数组

　　数组继承的`toLocaleString()`和`toString()`方法，在默认情况下都会以逗号分隔的字符形式返回数组项；而`join`方法可以使用不同的分隔符来构建这个字符串，`()`方法只接收一个参数，用作分隔符的字符串，然后返回包含所有数组项的字符串

　　如果不给`join()`方法传入任何值，则使用逗号作为分隔符

```javascript
var a = [1,2,3];
console.log(a.join());//'1,2,3'
console.log(a.join(' '));//'1 2 3'
console.log(a.join(''));//'123'

var b = new Array(10);
b.join('-');//'---------'，9个连字符组成的字符串
```

　　若`join()`方法的参数是undefined，标准浏览器以逗号为分隔符返回字符串，而IE7-浏览器以'undefined'为分隔符返回字符串

```javascript
//标准浏览器为'1,2,3';IE7-浏览器为'1undefined2undefined3'
var a = [1,2,3];
console.log(a.join(undefined));
```

　　如果数组中的某一项的值是null或者undefined，则该值在join()方法返回的结果中以空字符串表示

```javascript
var colors = [1,undefined,2,null,3];
console.log(colors.join());//'1,,2,,3'
```

　　该方法也可以用于类数组对象上

```javascript
console.log(Array.prototype.join.call('hello', '-'));// "h-e-l-l-o"
var obj = { 0: 'a', 1: 'b', length: 2 };
console.log(Array.prototype.join.call(obj, '-'));// 'a-b'
```

　　[注意]若对象没有length属性，就不是类数组，也就不能调用数组的方法

```javascript
var obj = { 0: 'a', 1: 'b' };
console.log(Array.prototype.join.call(obj, '-'));//''
```
　　
　　使用join()方法可以创建重复某些字符N次的函数

```javascript
function repeatString(str,n){
    return new Array(n+1).join(str);
}
console.log(repeatString('a',3));//'aaa'
console.log(repeatString('Hi',5));//'HiHiHiHiHi'
```

## 栈和队列方法

　　push()和pop()方法允许将数组当作栈来使用。unshift()和shift()方法的行为非常类似于push()和pop()，不一样的是前者是在数组的头部而非尾部进行元素的插入和删除操作

　　栈是一种LIFO(Last-In-First-Out，后进先出)的数据结构，也就是最新添加的项最早被移除。而栈中项的插入(叫做推入)和移除(叫做弹出)，只发生在一个位置——栈的顶部。javascript为数组专门提供了push()和pop()方法，以便实现类似栈的行为

　　队列数据结构的访问规则是FIFO(First-In-First-Out，先进先出)。队列在列表的末端添加项，从列表的前端移除项。结合使用shift()和push()方法，可以像使用队列一样使用数组

###【push()】

　　push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。所以，该数组会改变原数组

```javascript
var a = [];
console.log(a,a.push(1));//[1] 1
console.log(a,a.push('a'));//[1,'a'] 2
console.log(a,a.push(true, {}));//[1,'a',true,{}] 4
console.log(a,a.push([5,6]));//[1,'a',true,{},[5,6]] 5
```

　　如果需要合并两个数组，可以使用apply方法

```javascript
var a = [1, 2, 3];
var b = [4, 5, 6];
console.log(a, Array.prototype.push.apply(a, b));//[1,2,3,4,5,6] 6
```

　　[注意]如果使用call方法，则会把数组b整体看成一个参数

```javascript
var a = [1, 2, 3];
var b = [4, 5, 6];
console.log(a,Array.prototype.push.call(a, b));//[1,2,3,[4,5,6]] 4
```
　　
　　`push()`方法也可以向对象中添加元素，添加后的对象变成类数组对象，即新加入元素的键对应数组的索引，并且对象有一个length属性

```javascript
var obj = {a: 1};
console.log(obj,[].push.call(obj, 2));// {a:1, 0:2, length: 1}
console.log(obj,[].push.call(obj, [3]));// {a:1, 0:2, 1:[3], length: 2}
```

###【pop()】

　　pop()方法从数组末尾移除最后一项，减少数组的length值，然后返回移除的项。所以，该数组会改变原数组

```javascript
var a = ['a', 'b', 'c'];
console.log(a,a.pop()); // ['a', 'b'] 'c'
　　对空数组使用pop()方法，不会报错，而是返回undefined

var a = [];
console.log(a,a.pop()); // [] undefined
```

###【shift()】

　　shift()方法移除数组中的第一个项并返回该项，同时数组的长度减1。所以，该数组会改变原数组

```javascript
var a = ['a', 'b', 'c'];
console.log(a,a.shift());//['b', 'c'] 'a'
```

　　对空数组使用shift()方法，不会报错，而是返回undefined

```javascript
var a = [];
console.log(a,a.shift());// [] undefined
```

###【unshift()】

　　unshift()方法在数组前端添加任意个项并返回新数组长度。所以，该数组会改变原数组

```javascript
var a = ['a', 'b', 'c'];
console.log(a,a.unshift('x')); //['x', 'a', 'b', 'c'] 4
```

　　当使用多个参数调用unshift()时，参数是一次性插入的而非一次一个地插入。这意味着最终的数组中插入的元素的顺序和它们在参数列表中的顺序一致

```javascript
var a = ['a', 'b', 'c'];
console.log(a,a.unshift('x','y','z')); //['x','y','z','a', 'b', 'c'] 6
``

　　[注意]在IE7-浏览器中，unshift()方法返回的总是undefined

```javascript
//标准浏览器下，返回[1] 1；而IE7-浏览器下，返回[1] undefined
var a = [];
console.log(a,a.unshift(1));
```

## 数组排序方法

　　数组中存在两个可以直接用来重排序的方法: reverse()和sort() 

###【reverse()】

　　reverse()方法用于反转数组的顺序，返回经过排序之后的数组；而原数组顺序也发生改变

```javascript
var array = [1,2,4,3,5];
console.log(array,array.reverse());//[5,3,4,2,1] [5,3,4,2,1]
var array = ['str',true,3];
console.log(array,array.reverse());//[3,true,'str'] [3,true,'str']
```

### 【sort()】

　　默认情况下，sort()方法按字符串升序排列数组项，sort方法会调用每个数组项的toString()方法，然后比较得到的字符串排序，返回经过排序之后的数组，而原数组顺序也发生改变

```javascript
var array = [1,2,4,3,5];
console.log(array,array.sort());//[1,2,3,4,5] [1,2,3,4,5]
var array = ['3str',3,2,'2'];
console.log(array,array.sort());//[2, "2", 3, "3str"] [2, "2", 3, "3str"]
var array = [1,5,10,50];
console.log(array,array.sort());//[1, 10, 5, 50] [1, 10, 5, 50]
```

　　如果数组包含undefined元素，它们会被排到数组的尾部

```javascript
var array = ['3',3,undefined,2,'2'];
console.log(array,array.sort());//["2", 2, "3", 3, undefined] ["2", 2, "3", 3, undefined]
```

　　sort()方法可以接受一个比较函数作为参数，以便指定哪个值在哪个值的前面。比较函数接收两个参数，如果第一个参数应该位于第二个参数之前则返回一个负数，如果两个参数相等则返回0，如果第一个参数应该位于第二个参数之后则返回一个正数

```javascript
function compare(value1,value2){
    if(value1 < value2){
        return -1;
    }else if(value1 > value2){
        return 1;
    }else{
        return 0;
    }
}
var array = ['5px',50,1,10];
//当数字与字符串比较大小时，字符串'5px'会被转换成NaN，这样结果就是false
console.log(array.sort(compare));//["5px",1, 10, 50]
```

　　对于数值类型或valueOf()方法会返回数值类型的对象类型，比较函数可以简化

```javascript
function compare(value1,value2){
    return value1 - value2;
}
var array = ['5px',50,1,10];
console.log(array.sort(compare));//["5px",1,10,50]
var array = [5,50,1,10];
console.log(array.sort(compare));//[1,5,10,50]
```

　　如果对一个字符串数组执行不区分大小写的字母表排序，比较函数首先将参数转化为小写字符串再开始比较

```javascript
a = ['ant','Bug','cat','Dog'];
a.sort();//['Bug','Dog','ant','cat'];
a.sort(function(s,t){
    var a = s.toLowerCase();
    var b = t.toLowerCase();
    if(a < b)return -1;
    if(a > b)return 1;
    return 0;
});//['ant','bug','cat','dog']
```

【tips】使用sort()方法创建一个随机数组

```javascript
function compare(){
    return Math.random() - 0.5;
}
var array = [1,2,3,4,5];
console.log(array.sort(compare));//[2,1,5,4,3]
```

## 数组拼接方法

###【concat()】

　　concat()方法基于当前数组中的所有项创建一个新数组，先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。所以concat()不影响原数组

　　如果不给concat()方法传递参数时，它只是复制当前的数组；如果参数是一个或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中；如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾

```javascript
var numbers = [1,2];
console.log(numbers,numbers.concat(3,4));//[1,2] [1,2,3,4]
console.log(numbers,numbers.concat([5,4,3],[3,4,5],1,2));//[1,2] [1,2,5,4,3,3,4,5,1,2]
console.log(numbers,numbers.concat(4,[5,[6,7]]));//[1,2] [1,2,4,5,[6,7]]
```
　　
　　如果不提供参数，concat()方法返回当前数组的一个浅拷贝。所谓“浅拷贝”，指的是如果数组成员包括复合类型的值（比如对象），则新数组拷贝的是该值的引用

```javascript
//该方法实际只复制了数组的第一维，数组第一维存放的是第二维的引用，而第二维才是实际存放他们的内容
var numbers = [1,2];
var newNumbers = numbers.concat();
console.log(numbers,newNumbers);//[1,2] [1,2]
numbers[0] = 0;
console.log(numbers,newNumbers);//[0,2] [1,2]

var numbers = [[1,2]];
var newNumbers = numbers.concat();
console.log(numbers,newNumbers);//[[1,2]] [[1,2]]
numbers[0][0] = 0;
console.log(numbers,newNumbers);//[[0,2]] [[0,2]]
```

　　concat()方法也可以用于将对象合并为数组，但是必须借助call()方法

```javascript
var newArray = Array.prototype.concat.call({ a: 1 }, { b: 2 })
console.log(newArray);// [{ a: 1 }, { b: 2 }]
console.log(newArray[0].a);//1
```

## 创建子数组方法
 
###【slice()】

　　slice()方法基于当前数组中的一个或多个项创建一个新数组，接受一个或两个参数，即要返回项的起始和结束位置，最后返回新数组，所以slice()不影响原数组

　　slice(start,end)方法需要两个参数start和end，返回这个数组中从start位置到(但不包含)end位置的一个子数组；如果end为undefined或不存在，则返回从start位置到数组结尾的所有项

　　如果start是负数，则start = max(length + start,0)

　　如果end是负数，则end = max(length + end,0)

　　start和end无法交换位置

　　如果没有参数，则返回原数组

```javascript
var numbers = [1,2,3,4,5];
console.log(numbers.slice(2));//[3,4,5]
console.log(numbers.slice(2,undefined));//[3,4,5]
console.log(numbers.slice(2,3));//[3]
console.log(numbers.slice(2,1));//[]

console.log(numbers.slice(-3));//-3+5=2 -> [3,4,5]
console.log(numbers.slice(-8));//max(5 + -8,0)=0 -> [1,2,3,4,5]

console.log(numbers.slice(0,-3));//-3+5=2 -> [1,2]
console.log(numbers.slice(-2,-1));//-2+5=3;-1+5=4; -> [4]
```

　　如果不提供参数，slice()方法返回当前数组的一个浅拷贝

```javascript
//该方法实际只复制了数组的第一维，数组第一维存放的是第二维的引用，而第二维才是实际存放他们的内容
var numbers = [1,2];
var newNumbers = numbers.slice();
console.log(numbers,newNumbers);//[1,2] [1,2]
numbers[0] = 0;
console.log(numbers,newNumbers);//[0,2] [1,2]

var numbers = [[1,2]];
var newNumbers = numbers.slice();
console.log(numbers,newNumbers);//[[1,2]] [[1,2]]
numbers[0][0] = 0;
console.log(numbers,newNumbers);//[[0,2]] [[0,2]]
```

　　slice()方法涉及到Number()转型函数的隐式类型转换，当start被转换为NaN时，相当于start = 0；当end被转换为NaN时(end为undefined除外)，则输出空数组

```javascript
var numbers = [1,2,3,4,5];
console.log(numbers.slice(NaN));//[1,2,3,4,5]
console.log(numbers.slice(0,NaN));//[]
console.log(numbers.slice(true,[3]));//[2,3]
console.log(numbers.slice(null,undefined));//[1,2,3,4,5]
console.log(numbers.slice({}));//[1,2,3,4,5]
console.log(numbers.slice('2',[5]));//[3,4,5]
```

　　可以使用slice()方法将类数组对象变成真正的数组

```javascript
var arr = Array.prototype.slice.call(arrayLike);

Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })// ['a', 'b']
Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

## 数组删改方法

###【splice()】

　　splice()和slice()拥有非常相似的名字，但它们的功能却有本质的区别。splice()方法用于删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员，该方法会改变原数组

　　splice()返回一个由删除元素组成的数组，或者如果没有删除元素就返回一个空数组

　　splice()的第一个参数start指定了插入或删除的起始位置。如果start是负数，则start = max(length + start,0)；如果start是NaN，则相当于start = 0

　　如果只提供一个元素，相当于将原数组在指定位置拆分成两个数组

```javascript
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice());// [1,2,3,4,5,6,7,8] []
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice(4));// [1,2,3,4] [5,6,7,8]
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice(-4));//-4+8=4; [1,2,3,4] [5,6,7,8]
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice(-9));//max(-9+8,0)=0 [] [1,2,3,4,5,6,7,8]
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice(NaN));//[] [1,2,3,4,5,6,7,8]
```

　　第二个参数number指定了应该从数组中删除的元素的个数。如果省略第二个参数，从起始点开始到数组结尾的所有元素都将被删除。如果number是负数或NaN或undefined，则number=0，因此不删除元素

```javascript
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice(0,2));// [3,4,5,6,7,8] [1,2]
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice(10,2));// [1,2,3,4,5,6,7,8] []
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice(1,100));// [1] [2,3,4,5,6,7,8]
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice(1,-5));//[1,2,3,4,5,6,7,8] []
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice(1,NaN));//[1,2,3,4,5,6,7,8] []
var a = [1,2,3,4,5,6,7,8];
console.log(a,a.splice(1,undefined));//[1,2,3,4,5,6,7,8] []
```

　　如果后面还有更多的参数，则表示这些就是要被插入数组的新元素

```javascript
var a = [1,2,3,4,5];
console.log(a,a.splice(2,0,'a','b'));//[1,2,'a','b',3,4,5] []
console.log(a,a.splice(2,2,[1,2],3));//[1,2,[1,2],3,3,4,5] ['a','b']
```

## 数组位置方法
　　ES5为数组实例添加了两个位置方法：indexOf()、lastIndexOf()

###【indexOf()】

　　indexOf(search,start)方法接收search和start两个参数，返回search首次出现的位置，如果没有找到则返回-1

　　search参数表示要搜索的项；使用严格相等运算符（===）进行比较

```javascript
var arr = [1,2,3,'1','2','3'];
console.log(arr.indexOf('2'));//4
console.log(arr.indexOf(3));//2
console.log(arr.indexOf(0));//-1
```

　　start参数表示该搜索的开始位置，该方法会隐式调用Number()转型函数，将start非数字值(undefined除外)转换为数字。若忽略该参数或该参数为undefined或NaN时，start = 0

```javascript
var arr = ['a','b','c','d','e','a','b'];
console.log(arr.indexOf('a',undefined));//0
console.log(arr.indexOf('a',NaN));//0
console.log(arr.indexOf('a',1));//5
console.log(arr.indexOf('a',true));//5
console.log(arr.indexOf('a',-1));//max(0,-1+7)=6; -1
console.log(arr.indexOf('a',-5));//max(0,-5+7)=2; 5
console.log(arr.indexOf('a',-50));//max(0,-50+7)=0; 0
```

```javascript
var person = {name: 'Nicholas'};
var people = [{name: 'Nicholas'}];
var morePeople = [person];
alert(people.indexOf(person));//-1,因为person和people[0]虽然值相同，但是是两个引用
alert(morePeople.indexOf(person));//0，因为person和morepeople[0]是同一个引用
alert(morePeople.indexOf({name: 'Nicholas'}));//-1,因为不是同一个引用
```

　　indexOf()方法兼容写法

```javascript
if (typeof Array.prototype.indexOf != "function") {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    var index = -1;
    fromIndex = fromIndex * 1 || 0;
    for (var k = 0, length = this.length; k < length; k++) {
      if (k >= fromIndex && this[k] === searchElement) {
          index = k;
          break;
      }
    }
    return index;
  };
}
```

###【lastIndexOf()】

　　与indexOf()不同，lastIndexOf()从右向左查找

　　lastIndexOf(search,start)方法接收search和start两个参数，返回search第一次出现的位置，如果没有找到则返回-1

　　search参数表示要搜索的项；使用严格相等运算符（===）进行比较

```javascript
var arr = [1,2,3,'1','2','3'];
console.log(arr.lastIndexOf('2'));//4
console.log(arr.lastIndexOf(3));//2
console.log(arr.lastIndexOf(0));//-1
```

　　start表示该搜索的开始位置，该方法会隐式调用Number()转型函数，将start非数字值(undefined除外)转换为数。若忽略该参数或该参数为undefined或NaN时，start = 0

　　与字符串的lastIndexOf()方法不同，当search方法为负数时，search = max(0,length+search)

```javascript
var arr = ['a','b','c','d','e','a','b'];
console.log(arr.lastIndexOf('b'));//6
console.log(arr.lastIndexOf('b',undefined));//-1
console.log(arr.lastIndexOf('a',undefined));//0
console.log(arr.lastIndexOf('b',NaN));//-1
console.log(arr.lastIndexOf('b',1));//1
console.log(arr.lastIndexOf('b',-1));//max(0,-1+7)=6; 6
console.log(arr.lastIndexOf('b',-5));//max(0,-5+7)=2; 1
console.log(arr.lastIndexOf('b',-50));//max(0,-50+7)=0; -1
```

　　【tips】返回满足条件的项的所有索引值

　　可以通过循环调用indexOf()或lastIndexOf()来找到所有匹配的项

```javascript
function allIndexOf(array,value){
    var result = [];
    var pos = array.indexOf(value);
    if(pos === -1){
        return -1;
    }
    while(pos > -1){
        result.push(pos);
        pos = array.indexOf(value,pos+1);
    }
    return result;
}
var array = [1,2,3,3,2,1];
console.log(allIndexOf(array,1));//[0,5]   
```

　　lastIndexOf()方法兼容写法 

```javascript
if (typeof Array.prototype.lastIndexOf != "function") {
  Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
    var index = -1, length = this.length;
    fromIndex = fromIndex * 1 || length - 1;
    for (var k = length - 1; k > -1; k-=1) {
        if (k <= fromIndex && this[k] === searchElement) {
            index = k;
            break;
        }
    }
    return index;
  };
}
```
 

## 数组归并方法

　　数组归并方法包括reduce()和reduceRight()方法两种，它们使用指定的函数将数组元素进行组合，生成单个值。这在函数式编程中是常见的操作，也可以称为“注入”和“折叠”

###【reduce()】

　　reduce()方法需要两个参数。第一个是执行化简操作的函数。化简函数的任务就是用某种方法把两个值组合或化简为一个值，并返回化简后的值

　　化简函数接受四个参数，分别是：

　　【1】初始变量，默认为数组的第一个元素值。函数第一次执行后的返回值作为函数第二次执行的初始变量，依次类推

　　【2】当前变量，如果指定了第二个参数，则该变量为数组的第一个元素的值，否则，为第二个元素的值

　　【3】当前变量对应的元素在数组中的索引(从0开始)

　　【4】原数组对象

　　化简函数的这四个参数之中，只有前两个是必须的，后两个则是可选的

```javascript
values.reduce(function(prev, cur, index, array){
   //todo
});
```

　　reduce()方法第二个(可选)的参数是一个传递给函数的初始值

```javascript
var a = [1,2,3,4,5];
var sum = a.reduce(function(x,y){return x+y},0);//数组求和
var product = a.reduce(function(x,y){return x*y},1);//数组求积
var max = a.reduce(function(x,y){return (x>y)?x:y;});//求最大值
```

```javascript
[1, 2, 3, 4, 5].reduce(function(prev, cur){
    console.log(prev, cur)
    return prev+ cur;
});
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15
```

```javascript
[1, 2, 3, 4, 5].reduce(function(prev, cur){
    console.log(prev, cur);
    return prev + cur;
},0);
// 0 1
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15
```

　　[注意]reduce()方法的返回结果类型和传入的初始值相同

```javascript
[1, 2, 3, 4, 5].reduce(function(prev, cur){
    console.log(prev.sum, cur);
    prev.sum = prev.sum + cur;
    return prev;
},{sum:0});
//0 1
//1 2
//3 3
//6 4
//10 5
//Object {sum: 15}
```

　　利用reduce()方法，可以写一个数组求和的sum方法

```javascript
Array.prototype.sum = function (){
    return this.reduce(function (prev, cur){
        return prev + cur;
    })
};
[3,4,5,6,10].sum();// 28
```

　　由于reduce方法依次处理每个元素，所以实际上还可以用它来搜索某个元素。比如，找出长度最长的数组元素

```javascript
function findLongest(entries) {
  return entries.reduce(function (prev, cur) {
    return cur.length > prev.length ? cur : prev;
  }, '');
}
console.log(findLongest([1,2,3,'ab',4,'bcd',5,6785,4]));//'bcd'
```

　　可以利用reduce()方法，实现二维数组的扁平化

```javascript
var matrix = [
  [1, 2],
  [3, 4],
  [5, 6]
];
// 二维数组扁平化
var flatten = matrix.reduce(function (prev, cur) {
  return prev.concat(cur);
});
console.log(flatten); // [1, 2, 3, 4, 5, 6]
```

　　在空数组上，不带初始值参数调用reduce()将导致类型错误异常。如果调用它的时候只有一个值——数组只有一个元素并且没有指定初始值，或者有一个空数组并且指定一个初始值——reduce()只是简单地返回那个值而不会调用化简函数

var arr = [];
arr.reduce(function(){});//Uncaught TypeError: Reduce of empty array with no initial value

var arr = [];
arr.reduce(function(){},1);//1
　　reduce()方法兼容写法

```javascript
if (typeof Array.prototype.reduce != "function") {
  Array.prototype.reduce = function (callback, initialValue ) {
     var previous = initialValue, k = 0, length = this.length;
     if (typeof initialValue === "undefined") {
        previous = this[0];
        k = 1;
     }
    if (typeof callback === "function") {
      for (k; k < length; k++) {
         this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
      }
    }
    return previous;
  };
}
```

###【reduceRight()】

　　reduceRight()的工作原理和reduce()一样，不同的是它按照数组索引从高到低（从右到左）处理数组，而不是从低到高

```javascript
var values = [1,2,3,4,5];
var sum = values.reduceRight(function(prev, cur, index, array){
    console.log(prev,cur);
    return prev + cur;
});
console.log(sum);
//5 4
//9 3
//12 2
//14 1
//15
```

　　reduceRight()方法兼容写法

```javascript
if (typeof Array.prototype.reduceRight != "function") {
  Array.prototype.reduceRight = function (callback, initialValue ) {
    var length = this.length, k = length - 1, previous = initialValue;
    if (typeof initialValue === "undefined") {
        previous = this[length - 1];
        k--;
    }
    if (typeof callback === "function") {
       for (k; k > -1; k-=1) {          
          this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
       }
    }
    return previous;
  };
}
```
 

## 数组迭代方法
 　　ECMAScript5为数组定义了5个迭代方法。每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响this的值。传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。根据使用的方法不同，这个函数执行后的返回值可能会也可能不会影响访问的返回值

```javascript
function(item,index,array){
    //todo
}
```

###【map()】

　　map()方法对数组的每一项运行给定函数，返回每次函数调用的结果组成的数组

```javascript
//f是array的每一个元素调用的函数。它的返回值成为返回数组的元素；o是f调用时的可选this值
array.map(f,o);
[1,2,3].map(function(item,index,arr){return item*item});//[1,4,9]
[1,2,3].map(function(item,index,arr){return item*index});//[0,2,6]
```

　　map()方法还可以接受第二个参数，表示回调函数执行时this所指向的对象

```javascript
var arr = ['a','b','c'];
[1,2].map(function(item,index,arr){return this[item]},arr);//['b','c']
```

　　在实际使用的时候，可以利用map()方法方便地获得对象数组中的特定属性值

```javascript
var users = [{name:'t1',email:'t1@qq.com'},{name:'t2',email:'t2@qq.com'},{name:'t3',email:'t3@qq.com'}];
console.log(users.map(function(item,index,arr){return item.email}));//["t1@qq.com", "t2@qq.com", "t3@qq.com"]
```

　　map()方法还可以用于类数组对象

```javascript
Array.prototype.map.call('abc',function(item,index,arr){return item.toUpperCase()});//["A", "B", "C"]
```

　　对于稀疏数组，map()方法不会在实际上不存在元素的序号上调用函数

```javascript
var a = [1,,3];
console.log(a.map(function(item,index,arr){return item*2;}));//[2, 2: 6]
```

　　map()方法兼容写法

```javascript
if (typeof Array.prototype.map != "function") {
  Array.prototype.map = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
      for (var k = 0, length = this.length; k < length; k++) {      
         arr.push(fn.call(context, this[k], k, this));
      }
    }
    return arr;
  };
}
```

###【forEach()】

　　forEach()方法对数组中的每一项运行给定函数，这个方法没有返回值。本质上与for循环迭代数组一样。如果需要有返回值，一般使用map方法

```javascript
[1,2,3,4].forEach(function(item,index,arr){
    console.log(item)
});
//1
//2
//3
//4
```

　　类似于如下的for循环

```javascript
var array = [1, 2, 3, 4];
for (var k = 0, length = array.length; k < length; k++) {
    console.log(array[k]);
}
```

　　使用forEach()方法实现简单的加法

```javascript
var sum = 0;
[1, 2, 3, 4].forEach(function (item, index, array) {
    sum += item;
});
console.log(sum);//10
```

　　forEach()方法除了接受一个必须的回调函数参数，第二个参数还可以接受一个可选的上下文参数(改变回调函数里面的this指向)

```javascript
var out = [];
[1, 2, 3].forEach(function(elem){
  this.push(elem * elem);
}, out);
console.log(out);// [1, 4, 9]
```
　　
　　第二个参数对于多层this非常有用，因为多层this通常指向是不一致的，可以使用forEach()方法的第二个参数固定this

```javascript
var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
  //该this指向obj
      console.log(this);
    this.times.forEach(function (n) {
    //该this指向window
      console.log(this);
    });
  }
};
obj.print();
```

```javascript
var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
  //该this指向obj
      console.log(this);
    this.times.forEach(function (n) {
    //该this同样指向obj
      console.log(this);
    },this);
  }
};
obj.print();
```

　　forEach()循环可以用于类数组对象

```javascript
var str = 'abc';
Array.prototype.forEach.call(str, function(item, index, array) {
  console.log( item + ':' + index);
});
//a:0
//b:1
//c:2
```

　　与for循环不同，对于稀疏数组，forEach()方法不会在实际上不存在元素的序号上调用函数

```javascript
var a = [1,2,3];
delete a[1];
for(var i = 0; i < a.length; i++){
    console.log(a[i]);
}
//1
//undefined
//3
```

```javascript
a.forEach(function(item,index,arr){console.log(item)});
//1
//3
```

　　forEach()方法无法在所有元素都传递给调用的函数之前终止遍历。也就是说，没有像for循环中使用的相应的break语句。如果要提前终止，必须把forEach()方法放在一个try块中，并能抛出一个异常

```javascript
for(var i = 0; i < 5; i++){
    if(i == 2) break;
}
console.log(i);//2
var a = [1,2,3,4,5];
console.log(a.forEach(function(item,index,arr){
    if(index == 2) break;//Uncaught SyntaxError: Illegal break statement
}));
```

```javascript
var a = [1,2,3,4,5];
a.forEach(function(item,index,arr){
    try{
      if(item == 2) throw new Error;    
    }catch(e){
        console.log(item);
    }
});
```

　　forEach()方法兼容写法

```javascript
if(typeof Array.prototype.forEach != 'function'){
    Array.prototype.forEach = function(fn,context){
        for(var k = 0,length = this.length; k < length; k++){
            if(typeof fn === 'function' && Object.prototype.hasOwnProperty.call(this,k)){
                fn.call(context,this[k],k,this);
            }
        }
    }
}
```

###【filter()】

　　filter()方法对数组中的每一项运行给定函数，该函数会返回true的项组成的数组。该方法常用于查询符合条件的所有数组项

```javascript
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
});// [4, 5]    

[0, 1, 'a', false].filter(Boolean);// [1, "a"]

[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
  return index % 2 === 0;
});// [1, 3, 5]
```

　　filter()方法还可以接受第二个参数，指定测试函数所在的上下文对象(this对象)

```javascript
var Obj = function () {
  this.MAX = 3;
};
var myFilter = function (item) {
  if (item > this.MAX) {
    return true;
  }
};
var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, new Obj());// [8, 4, 9]
```

　　filter()会跳过稀疏数组中缺少的元素，它的返回数组总是稠密的，所以可以压缩稀疏数组的空缺

```javascript
var a = [1,2,,,,3,,,,4];
console.log(a.length);//10
var dense = a.filter(function(){return true;})
console.log(dense,dense.length);//[1,2,3,4] 4
```
　　如果要压缩空缺并删除undefined和null元素，可以这样使用filter()方法

```javascript
var a = [1,2,,undefined,,3,,null,,4];
console.log(a.length);//10
var dense = a.filter(function(item){return item!= undefined;})
console.log(dense,dense.length);//[1,2,3,4] 4
```

　　filter()方法兼容写法

```javascript
if (typeof Array.prototype.filter != "function") {
  Array.prototype.filter = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
       for (var k = 0, length = this.length; k < length; k++) {
          fn.call(context, this[k], k, this) && arr.push(this[k]);
       }
    }
    return arr;
  };
}
```

###【some()】

　　some()方法对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true。并且当且仅当数值中的所有元素调用判定函数都返回false，它才返回false

```javascript
a = [1,2,3,4,5];
a.some(function(elem, index, arr){return elem%2===0;})//true
a.some(isNaN);//false
```

　　在空数组上调用some()方法会返回false

```javascript
[].some(function(){});//false
```

　　some()方法兼容写法

```javascript
if (typeof Array.prototype.some != "function") {
  Array.prototype.some = function (fn, context) {
    var passed = false;
    if (typeof fn === "function") {
         for (var k = 0, length = this.length; k < length; k++) {
          if (passed === true) break;
          passed = !!fn.call(context, this[k], k, this);
      }
    }
    return passed;
  };
}
```

###【every()】

　　every()方法对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true；只要有一项返回false，则返回false

```javascript
a = [1,2,3,4,5];
a.every(function(elem, index, arr){elem < 10;})//true
a.every(function(elem, index, arr){return elem%2 ===0;});//false
```

　　在空数组上调用every()方法会返回true

```javascript
[].every(function(){});//true
```

　　every()方法兼容写法

```javascript
if (typeof Array.prototype.every != "function") {
  Array.prototype.every = function (fn, context) {
    var passed = true;
    if (typeof fn === "function") {
       for (var k = 0, length = this.length; k < length; k++) {
          if (passed === false) break;
          passed = !!fn.call(context, this[k], k, this);
      }
    }
    return passed;
  };
}
```
 

## 总结
　　javascript数组方法特意定义为通用的，因此它们不仅应用在真正的数组而且在类数组对象上都能正确工作。这22种方法中，除了toString()和toLocaleString()以外的所有方法都是通用的

　　可以改变原数组的方法总共有7种：包括unshift()、shift()、push()、pop()这4种栈和队列方法，reverse()和sort()这2种数组排列方法，数组删改方法splice()

 　　除了上面22种方法外，还有一些方法也是常用的，但是需要自己封装

　　数组去重方法封装

```javascript
Array.prototype.norepeat = function(){
    var result = [];
    for(var i = 0; i < this.length; i++){
        if(result.indexOf(this[i]) == -1){
            result.push(this[i]);
        }
    }
    return result;
}
var arr = ['a','ab','a'];
console.log(arr.norepeat());//['a','ab']
```

　　测试数组是否包含特定值的方法封装

```javascript
Array.prototype.inArray = function(value){
    for(var i = 0; i < this.length; i++){
        if(this[i] === value){
            return true;
        }
    }
    return false;
}
var arr = ['a','ab','a'];
console.log(arr.inArray('b'));//false
console.log(arr.inArray('a'));//true
```
 

参考资料

【1】  ES5/array对象 https://www.w3.org/html/ig/zh/wiki/ES5/builtins#Array_.E5.AF.B9.E8.B1.A1
【2】  W3School-Javascript高级教程——Array对象 http://www.w3school.com.cn/jsref/jsref_obj_array.asp
【3】  阮一峰Javascript标准参考教程——Array对象 http://javascript.ruanyifeng.com/stdlib/array.html
【4】《javascript权威指南(第6版)》第7章 数组
【5】《javascript高级程序设计(第3版)》第5章 引用类型
【6】《javascript DOM编程艺术(第2版)》第2章 javascript语法
【7】《javascript语句精粹》第6章 数组




