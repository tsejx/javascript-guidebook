---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: for 语句
order: 22
---

# for 语句

**for 语句** 也是一种前测试循环语句，但它具有在执行循环之前初始化变量和定义循环后要执行的代码的能力。

## 语法

```js
for (initialization; expression; post - loop - expression) {
  // statement
}
```

参数：

- `initialization` 初始化表达式：表达式通常会初始化一个或多个循环计数器（变量），但语法上是允许一个任意复杂度的表达式，通常为一条**声明赋值语句**（只在循环开始之前执行一次）。
- `expression` 循环条件判断：执行循环语句前的判断语句（通常为比较表达式），若为 `true` 则执行循环语句，否则则不执行循环语句，并跳出循环语句。
- `post-loop-expression` 计数器变量更新：循环执行语句执行后执行的计数器变量更新表达式，更新循环计数器（变量），以进入下一次循环条件判断。
- `statement` 循环执行语句：当循环条件满足时所执行的语句，执行完毕后执行计数器变量更新语句（利用 `break` 、`continue` 语句除外）。

## 最佳实践

### 代码示例

```js
var count = 10;

for (let i = 0; i < count; i++) {
  console.log(i);
}
```

### 从尾部向前循环

### 位数的整倍循环

```js
// 五位数的数字
const num = 99999;

for (let i = 1; i < num; i *= 10) {
  // 被除数 num
  // 除数
  const divisor = i * 10;
  // 整除部分
  const divided = Math.floor(num / divisor);
  // 余数
  const remainder = num % divisor;

  console.log(i, divisor);
  //    i       divisor
  // 1. 1       10
  // 2. 10      100
  // 3. 100     1000
  // 4. 1000    10000
  // 5. 10000   100000
}
```

### 涉及多个变量的循环

```js
for (let i = 0, j = 10; i < 10; i++, j--) {
  sum += i * j;
}
```

若在循环中一次迭代改变多个变量，则必须使用到逗号运算符，它将初始化表达式和自增表达式合并入一个表达式中以用于 `for` 循环。

### 可忽略的表达式

```js
function tail(o) {
  // 返回链表的最后一个节点对象
  for (; o.next; o = o.netx /* empty */);
  return; // 根据判断 o.next 是不是真值来执行遍历
}
```

循环计数器（变量）中一般都是数字，也是最常用的，但不是必需的。`for` 循环中的三个表达式中的任何一个都可以忽略，但是两个分号必不可少。如果 `expression` ，那么这将是一个死循环，同样，和 `while(true)` 类似，死循环的另一种写法是 `for(;;)`。
