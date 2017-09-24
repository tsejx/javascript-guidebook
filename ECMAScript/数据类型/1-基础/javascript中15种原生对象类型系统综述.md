# javascript中15种原生对象类型系统综述

## 前面的话

　　在编程语言中，能够表示并操作的值的类型称做数据类型，编程语言最基本的特性就是能够支持多种数据类型。javascript拥有强大的类型系统，主要包括原生对象、宿主对象和浏览器拓展对象，本文主要介绍15种原生对象类型系统

![类型系统][1]

## 原生对象(15种)
　　原生对象分为两类：原始类型(primitive type)和对象类型(object type)。原始类型又分为两类，一类是空值，一类是包装对象；对象类型也可以分为两类：一类是构造器对象，一类是单体内置对象

### 空值(2种)

　　与其他语言不同，javascript表示空值的值有两个，分别是undefined和null。逻辑上，undefined表示原始类型的空值，null表示对象类型的空值

### 包装对象(3种)

　　字符串string、数字number、布尔值boolean虽然属于原始类型。但是，由于其包装对象的性质，可以调用属性和方法

### 构造器对象(9种)

　　普通的对象是命名值的无序集合，但是通过不同的构造器，javascript定义了功能各异的多种对象，包括对象Object、函数Function、日期Date、数组Array、错误Error、正则RegExp

　　[注意]如果显式地使用new 构造器函数来定义包装对象，那么字符串String、数字number、布尔值boolean也属于构造器对象

### 单体内置对象(4种)

　　单体内置对象包括Math、JSON、全局对象和arguments这四种。它们不需声明或者使用构造器构造，直接在相应场景使用即可



　　下面是各类对象的详细描述目录

　　javascript类型系统——Undefined和Null

　　javascript类型系统——Number数字类型

　　javascript类型系统——String字符串类型

　　javascript类型系统——Boolean布尔类型

　　javascript类型系统——Object对象类型

　　javascript类型系统——Function函数类型

　　javascript类型系统——Array数组类型

　　javascript类型系统——RegExp正则类型

　　javascript类型系统——Date日期时间类型

　　javascript类型系统——Error错误类型

　　javascript类型系统——Math对象

　　javascript类型系统——JSON对象


  [1]: http://images2015.cnblogs.com/blog/740839/201611/740839-20161107175444452-1081714316.jpg