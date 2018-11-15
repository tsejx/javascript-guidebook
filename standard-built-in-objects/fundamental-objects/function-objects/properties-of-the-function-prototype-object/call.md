# Function.prototype.call()

`call()` 函数用于调用当前函数，并可同时使用指定对象作为本次执行时函数内部的 `this` 指针引用。

> **注意：**该方法的作用和 `apply()` 方法类似，只有一个区别，就是 `call()` 方法接受的是**若干个参数的列表**，而 `apply() ` 方法接受的是**一个包含多个参数的数组**。

## 语法

```javascript
func.call( [thisArg [, arg1 [, arg2 [, argN...]]]] )
```

### 参数

| 参数             | 类型                                     | 描述                                                         |
| ---------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `func`           | `Function` 类型                          | 当前函数调用 `call()` 函数的函数，通常为 `this` （函数内部执行）。 |
| `thisArg`        | 可选，`Object` 类型                      | 在*fun*函数运行时指定的 `this` 值*。*需要注意的是，指定的 `this` 值并不一定是该函数执行时真正的 `this` 值，如果这个函数处于非严格模式下，则指定为 `null` 和 `undefined` 的 `this` 值会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 `this` 会指向该原始值的自动包装对象。 |
| `arg1,arg2,argN` | 可选，`Array` 类型或 `TypedArray `  类型 | 指定的参数列表。                                             |

### 返回值

返回值是你调用的方法的返回值，若该方法没有返回值，则返回 `undefined`。

### 描述

可以让 `call()` 中的对象调用当前对象所拥有的函数。你可以使用 `call()` 来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

## 示例

### 标准示例

#### 在 `call` 中传入对象

**示例1**

当函数中调用 `call` 方法时，函数内部的 `this` 对象会自动指向 `call` 方法中的第一个参数。在下面这个例子中也就是 `peter` 这个对象了。所以在执行 `sayName.call(peter)` 时，函数内部的 `this.name` 则会自动指向 `peter.name`。

```javascript
var sayName = function (){
    console.log(this.name)
}
var peter = {
    name: 'peter'
}

sayName.call(peter);	// peter
```

**示例2**

```javascript
function Person1 () {  
    this.name = "person1";
    this.sayName = function () {
        alert(this.name);
    }
}

function Person2 () {  
    this.name = "person2";
}

var sam = new Person2();

Person1.call(sam);

sam.sayName(); // person1
```

当调用 `call` 这个方法时，函数 `Person1` 内部的 `this` 指向 `sam` 这个对象。

相当于，给 `sam` 这个对象执行了这两条语句：

```javascript
this.name = "person1";
this.sayName = function (){
    alert(this.name);
}
```

故在此重写了原来 `sam` 对象中的 `name` 属性。而且获得了一个新的方法。所以可以成功的调用 `sam.sayName()` 而且结果返回 `person1`。

