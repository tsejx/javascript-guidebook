# 作为值的函数

因为 ECMAScript 中的函数名本身就是流量，所以函数也可以作为值来使用。也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。

```javascript
function callSomeFunction(someFunction, someArgument){
    return someFunction(someArgument);
}
```

这个函数接收两个参数。第一个参数应该是一个函数，第二个参数应该是要传递给改函数的一个值。

```javascript
function add10(num){
    return num + 10;
}

const result1 = callSomeFunction(add10, 10);
console.log(result1);		// 20

function getGreeting(name){
    return "Hello, " + name;
}

const result = callSomeFunction(getGreeting, "Nicholas");
alert(result2);	// "Hello, Nicholas"
```

要访问函数的指针而不执行函数的话，必须去掉函数名后面那对圆括号。

## 例子

从函数中返回另一个函数。

```javascript
function createComparisonFunction(propertyName){
    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        
        if (value1 < value2){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    }
}
```

