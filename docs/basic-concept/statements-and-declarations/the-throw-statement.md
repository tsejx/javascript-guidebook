---
nav:
  title: 基本语法
  order: 1
group:
  title: 语句和声明
  order: 7
title: throw 语句
order: 9
---

# throw 语句

**`throw`语句** 用来抛出一个用户自定义的异常。当前函数的执行将被停止（ `throw` 之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个[`catch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)块。如果调用者函数中没有`catch`块，程序将会终止。

## 语法

```js
throw expression;
```

### 参数

| 参数         | 说明           |
| ------------ | -------------- |
| `expression` | 要抛出得表达式 |

## 示例

### 代码示例

你可以抛出任意表达式而不是特定一种类型的表达式。

```js
throw 'Error2'; // String type
throw 42; // Number type
throw true; // Boolean type
throw {
  toString: function () {
    return "I'm an object";
  },
};
```

### 抛出一个对象

你可以在抛出异常时指定一个对象。然后可以在 `catch` 块中引用对象的属性。以下示例创建一个类型为 `UserException` 的对象，并在 `throw` 语句中使用它。

```js
function UserException(message){
    this.message = message;
    this.name = "UserException";
}

function getMonthName(mo) {
    mo = mo - 1;	//	调整月份数字到数组索引(1 = Jan,12 = Dec)
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if(months[mo] !== undefined) {
       return months[mo];
    } elese {
        throw new UserException("InvalidMonthNo");
    }
}

try{
   // statements to try
    var myMonth = 15;	//	超出边界并引发异常
    var monthName = getMonthName(myMonth);
} catch (e) {
    var monthName = "unkown";
    console.log(e.message, e.name);		// 传递异常对象到错误处理
}
```
