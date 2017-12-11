# 递归

所谓的递归函数就是在函数体内调用本函数。使用递归函数一定要注意，处理不当就会进入死循环。递归函数只有在特定的情况下使用 ，比如阶乘问题。

递归算法的特点：

 1. 在函数过程中调用自身。
 2. 在递归过程中，必须有一个**明确的条件**判断递归的结束，即递归出口。
 3. 递归算法简洁但效率低，通常不作为推荐算法。

## 阶乘

 - 问题描述： `n != n*(n-1)*...2*1`

 - 代码实现：

```javascript
var factiorial = function(n){
    if (n <= 1) return 1;
    return n*arguments.callee(n - 1);
}

console.log(factorial(5)); // 120
```

我们拿到问题的时候，我们按照定义的说明，可以先将规模缩小到同类的子问题。比如，`n!` 是等于 `n* (n-1)!，然后(n-1)! = (n-1)*(n-2)!`。这样依次往下推，直到if的出口。这里用了 `arguments.callee` ，是为了防止函数名的紧密耦合，在这里它等同于 `factorial(n-1)`。函数实现起来是不是简洁明了呢。当然因为问题规模简单，其实用循环也是可以实现的，大家可以尝试一下。

## 斐波那契数列

 - 问题描述：1, 1, 2, 3, 5, 8, 13, 21, 34, ....... 求第n个数是多少。

- 代码实现：

```javascript
var fabonacci = function (n) {
    if (n <= 0) return 0;
    if (n <= 2) return 1;
    return arguments.callee(n-1) + arguments.callee(n-2);
}

console.log(fibonacci(8));
```

其实用刚才的想法实现，也是非常的简单的。通过分析可以得到第n个数，是前两个数的和，通过这个我们就可以通过递归，不断获得所需要的前两个数，直到n<= 2这个条件返回1。

## 走楼梯问题

 - 问题描述：楼梯有n阶台阶，上楼可以一步上1阶，也可以一步上2阶或者3阶，计算共有多少种不同的走法。

 - 代码实现：
 
```javascript
var getMethods = function (n) {
    if (n <= 0) return 0;
    if (n <= 1) return 1;
    if (n <= 2) return 2;
    if (n <= 3) return 4;
    return arguments.callee(n-1) + arguments.callee(n-2) + arguments.callee(n-3);
}

console.log(getMethods(5));
```

这其实就是一个斐波那契数列的一种实现。我们分析的时候，可以转化成小规模的子类问题。当到达指定阶梯的最后一步的时候，可以有三种种情况，一是上一步，二是上两步，三是上三步。所以总的方法是 `F(n) = F(n-1) + F(n-2) + F(n-3)`。然后自然就成了各自的小计算，不断循环下去，直到判断条件的发生。

## 最大公约数

- 问题描述：给两个数，如果两个数相等，最大公约数是其本身。如果不等，取两个数相减的绝对值和两个数中最小的数比较，相等则为最大公约，不等则继续上面的算法，直到相等。

- 代码实现：

```javascipt
var getNum = function (a, b){
    if (a === b) return a;
    return arguments.callee(Math.abs(a-b), Math.min(a, b));
}

console.log(getNum(12, 15));
```

没什么好说的，照问题描述所要求的实现就可以了。递归的出口便在于a等于b。

## 汉诺塔

代码实现：

```javascript
var haoni = function (n, src, aux, dest){
    if (n > 0){
        haoni(n-1, src, dest, aux);
        console.log('移动第' + n + '个圆盘从' + src + '到' + dest);
        haoni(n-1, aux, src, dest);
    }
}

haoni(3, 'A', 'B', 'C');
```

在我没有体会到递归的精粹前，我对这个问题简直百思不得其解。我一直问自己，我怎么知道下一个该去哪里？后来，我就知道，我其实更关心的是，最后那一个该怎么走。这个怎么说呢？我们可以从头想起，我们如果只有1个盘，我们可以让它到C柱，也可以到B柱。自然两个盘，也可以实现。3个盘，也是可以的吧。那我们就讲4个盘的情况。4个盘要完成就要将A上的圆盘，完全转移到C上。我们把前3个盘当作一个整体放到B上，然后第4个盘就可以到C上了，然后我们再将前三个放到C上，就成功了。那前三个盘，又可以重新当作一个新游戏，让前两个盘，当一个整体，依次类推。这样我们只需要关心大的整体的事，其它的就转成小规模问题解决就好了。

## 二分法块排

- 问题描述： 使用二分法，对一个数组进行由小到大的排序。

- 代码实现：

```javascript
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    var leftArr = [];
    var rightArr = [];
    var pivot = Math.random(arr.length/2);
    var baseNum = arr.splice(pivot, 1);
    
    arr.forEach(function(num){
        if (num < baseNum){
            leftArr.push(num);
        } else {
            rightArr.push(num);
        }
    });
    
    return quickSort(leftArr).concat(baseNum, quickSort(rightArr));
}

console.log(quickSort([1, 10, 2, 5, 9, 12, 52, 2, 3]));
```

## DOM数的递归

 - 问题描述：获取一个节点的所有父节点的tagName

 - 代码实现：

```html
<script>
var arr = [];
var getParent = function(node){
    node = node.parentNode;
    if (node.tagName){
        arr.push(node.tagName);
        getParent(node);
    }
}
getParent(document.getElementById('node'));
console.log(arr);
</script>
```
