# Javascript类型系统——Math对象 

标签（空格分隔）： JS

---

## 前面的话

　　Javascript使用算术运算符实现基本的算术运算，如果要实现更加复杂的算术运算，需要通过Math对象定义的常量和函数来实现。和其他对象不同，Math只是一个静态对象，并没有Math()构造函数。实际上，Math只是一个由javascript设置的对象命名空间，用于存储数学常量和函数。本文将详细介绍Math对象

```javascript
new Math();//Uncaught TypeError: Math is not a constructor
```

## 常量

　　Math对象一共有8个常量，主要包括对数、派值和平方根三类

```javascript
对数
Math.E             自然对数的底数，即常量e的值(约等于2.71828)
Math.LN2           2的自然对数(约等于0.693)
Math.LN10          10的自然对数(约等于2.303)
Math.LOG2E         以2为底e的对数(约等于1.443)
Math.LOG10E        以10为底e的对数(约等于0.434)
console.log(Math.E);//2.718281828459045
console.log(Math.LN2);//0.6931471805599453    
console.log(Math.LN10);//2.302585092994046
console.log(Math.LOG2E);//1.4426950408889634
console.log(Math.LOG10E);//0.4342944819032518
```

### 派值

```javascript
Math.PI            派的值(约等于3.14)
console.log(Math.PI);//3.141592653589793
```

### 平方根

```javascript
Math.SQRT2         2的平方根(约等于1.414)
Math.SQRT1_2       1/2的平方根，即2的平方根的倒数(约等于0.707)
console.log(Math.SQRT2);//1.4142135623730951
console.log(Math.SQRT1_2);//0.7071067811865476
```

## 函数

　　**Math对象一共有18个静态函数，主要包括最值、舍入、随机数、绝对值、三角函数及乘方开方6类**

　　[注意]这些函数都涉及到Number()**隐式类型转换**。若超出范围，将返回NaN

### 最值
　　Math对象的min()和max()方法用于确定一组数值中的最小和最大值，这两个方法都可以接收任意个数值参数

#### Math.max()

　　返回参数中最大值。如果没有参数则返回-Infinity。如果任意一个参数是NaN或不可转换为数字，则返回NaN

#### Math.min()

　　返回参数中最小值。如果没有参数则返回Infinity。如果任意一个参数是NaN或不可转换为数字，则返回NaN

```javascript
console.log(Math.min(1,2,3));//1
console.log(Math.max(1,2,3));//3
console.log(Math.min());//Infinity
console.log(Math.max());//-Infinity
console.log(Math.min(1,2,'3px'));//NaN
console.log(Math.max(1,2,'3px'));//NaN
```

【tips】找到数组中的最大或最小值

```javascript
var values = [1,2,3,4,5,6,7,8];
var maxValue = Math.max.apply(Math,values);//8
var minValue = Math.min.apply(Math,values);//1
```

　　当我们在一个表单中需要一个合法的月份值时，可以使用下列代码

```javascript
Math.min(Math.max(1,input),12);
```

### 舍入
　　Math对象一共有三种小数舍入为整数的方法，它们是：Math.ceil()、Math.floor()和Math.round()

#### Math.ceil()

　　执行向上取整运算，也就是说，它返回大于等于函数参数的最接近的整数

　　[注意]Math.ceil()不会将负数变成绝对值更大的负数，而是将它们向0的方向取整

#### Math.floor() 

　　执行向下取整运算，也就是说，它返回小于等于函数参数的最接近的整数

　　[注意]Math.floor()对负数也向下取整，即数字将更小

#### Math.round()

　　执行四舍五入取整运算

　　[注意]Math.round(x) + Math.round(-x) == 0;//true，当x为数字时

```javascript
console.log(Math.ceil(12.6));//13
console.log(Math.floor(12.6));//12
console.log(Math.round(12.6));//13
console.log(Math.ceil(-12.6));//-12
console.log(Math.floor(-12.6));//-13
console.log(Math.round(-12.6));//-13
```


### 随机数

#### Math.random()

　　该方法返回大于等于0小于1的一个随机数

```javascript
console.log(Math.random());//0.590752829178167
```

　　套用下面的公式可以利用Math.random()从某个整数范围内随机选择一个值

```javascript
值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)
//返回一个1-10之间的整数值
var num = Math.floor(Math.random() * 10 + 1)
```

　　多数情况下，已知条件是首尾值

```javascript
var num = Math.floor(Math.random()*(upperValue - lowerValue + 1) + lowerValue);
//从数组中随机取出一项
var colors = [1,2,3,4,5,6];
var color = colors[Math.floor(Math.random()*colors.length)];
```

#### 01值

　　如果想取得随机的01值，可使用下面代码

```javascript
Math.round(Math.random())
```

### 绝对值

#### Math.abs()

　　该方法返回任意数值的绝对值

```javascript
console.log(Math.abs(-1));//1
console.log(Math.abs('1px'));//NaN
console.log(Math.abs(1,2,3));//1
```

### 三角函数

　　Math对象共有7个涉及到三角函数的函数，分别是正弦、余弦、正切、反正弦、反余弦、反正切及y/x的反正切值

#### Math.sin(x)

　　 返回x的正弦值，返回值介于-1到1之间

#### Math.cos(x)

　　 返回x的余弦值，返回值介于-1到1之间

#### Math.tan(x)

　　 返回x的正切值

　　[注意]x是一个以弧度制度量的角度，如果想将角度制转为弧度制，可以将角度制的值乘以0.017(2派/360)

#### Math.asin(x)

　　 返回x的反正弦值，返回值介于-派/2到派/2弧度之间(x必须是-1到1之间的数)

#### Math.acos(x)

　　 返回x的反余弦值，返回值介于0到派弧度之间(x必须是-1到1之间的数)

#### Math.atan(x)

　　 返回x的反正切值，返回值介于-派/2到派/2弧度之间

#### Math.atan2(y,x)

　　 返回y/x的反正切值，返回值介于-派到派可以将y看做一个点的y坐标，x看做点的x坐标

　　[注意]y坐标在x坐标前面

```javascript
console.log(Math.sin(30*Math.PI/180));//0.49999999999999994    
console.log(Math.cos(60*Math.PI/180));//0.5000000000000001
console.log(Math.tan(45*Math.PI/180));//0.9999999999999999    
console.log(Math.asin(1)*180/Math.PI);//90
console.log(Math.acos(1)*180/Math.PI);//0
console.log(Math.atan(1)*180/Math.PI);//45
console.log(Math.atan2(1,1)*180/Math.PI);//45
```
 

### 乘方开方
　　Math对象涉及到乘方开方的函数共有4个

#### Math.exp(num)

　　返回Math.E的num次幂，即enum

```javascript
console.log(Math.exp(0));//1
console.log(Math.exp(1));//2.718281828459045
Math.log(num)
```

　　返回num的自然对数，logenum(num必须是大于等于0的数)

```javascript
log10x = 1og10e * logex 
log2x = log2e * logex
```

```javascript
function log10(x){
    return Math.LOG10E * Math.log(x);
}
function log2(x){
    return Math.LOG2E * Math.log(X);
}
```

```javascript
console.log(Math.log(1));//0
console.log(Math.log(Math.E));//1
Math.sqrt(num)
```

　　返回num的平方根(x必须是大于等于0的数)

```javascript
console.log(Math.sqrt(100));//10
console.log(Math.sqrt(1));//1
Math.pow(num,power)
```

　　返回num的power次幂

```javascript
console.log(Math.pow(10,2)); //100
console.log(Math.pow(100,1/2)); //10
```

参考资料

【1】 ES5/Math对象 https://www.w3.org/html/ig/zh/wiki/ES5/builtins#Math_.E5.AF.B9.E8.B1.A1
【2】 阮一峰Javascript标准参考教程——标准库——Math对象 http://javascript.ruanyifeng.com/stdlib/math.html
【3】 W3School-Javascript高级教程——Math对象 http://www.w3school.com.cn/jsref/jsref_obj_math.asp
【4】《javascript权威指南(第6版)》第三部分 javascript核心参考
【5】《javascript高级程序设计(第3版)》第5章 引用类型




