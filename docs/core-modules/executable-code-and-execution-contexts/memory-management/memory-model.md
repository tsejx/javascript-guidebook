---
nav:
  title: 核心模块
  order: 3
group:
  title: 内存管理
  order: 4
title: 内存模型
order: 1
---

# 内存模型

JavaScript 内存空间分为 **栈**（Stack）、**堆**（Heap）、**池**（一般也会归类为栈中）。其中 **栈** 存放变量，**堆** 存放复杂对象，**池** 存放常量。

## 栈数据结构

与 C / C++ 不同，JavaScript 中并没有严格意义上区分栈内存与堆内存。因此我们可以简单粗暴的理解为 JavaScript 的所有数据都保存在堆内存中。但是在某些场景，我们仍然需要基于堆栈数据结构的思维来实现一些功能，比如 JavaScript 的 [执行上下文](../execution/execution-context-stack)。执行上下文的执行顺序借用了栈数据结构的存取方式。

要简单理解栈的存取方式，我们可以通过类比乒乓球盒子来分析。

```jsx | inline
import React from 'react';
import img from '../../../assets/memory-model/table-tennis-example.jpg';

export default () => <img alt="乒乓球盒子与栈类比" src={img} width={720} />;
```

这种乒乓球的存放方式与栈中存取数据的方式如出一辙。处于盒子中最顶层的 `乒乓球 5`，它一定是最后被放进去，但可以最先被使用。而我们想要使用底层的 `乒乓球 1`，就必须将上面的 4 个乒乓球取出来，让 `乒乓球 1` 处于盒子顶层。这就是栈空间 **先进后出，后进先出** 的特点。图中已经详细的表明了栈空间的存储原理。

## 堆数据结构

堆数据结构是一种树状结构。它的存取数据的方式，则与书架与书非常相似。

书虽然也整齐的存放在书架上，但是我们只要知道书的名字，我们就可以很方便的取出我们想要的书，而不用像从乒乓球盒子里取乒乓一样，非得将上面的所有乒乓球拿出来才能取到中间的某一个乒乓球。好比在 JSON 格式的数据中，我们存储的 `key-value` 是可以无序的，因为顺序的不同并不影响我们的使用，我们只需要关心书的名字。

## 队列数据结构

队列是一种先进先出（FIFO）的数据结构。正如排队过安检一样，排在队伍前面的人一定是最先过检的人。用以下的图示可以清楚的理解队列的原理。

```jsx | inline
import React from 'react';
import img from '../../../assets/memory-model/queue-structure.jpg';

export default () => <img alt="队列数据结构" src={img} width={720} />;
```

## 变量对象与基础数据类型

JavaScript 的 [执行上下文](../execution/execution-context-stack) 生成之后，会创建一个叫做 [变量对象](../execution/variable-object) 的特殊对象，JavaScript 的基础数据类型往往都会保存在变量对象中。

严格意义上来说，变量对象也是存放于堆内存中，但是由于变量对象的特殊职能，我们在理解时仍然需要将其与堆内存区分开来。

JavaScript 中的基础数据类型，这些值都有固定的大小，往往都保存在栈内存中（闭包除外），由系统自动分配存储空间。我们可以直接操作保存在栈内存空间的值，因此基础数据类型都是按值访问，数据在栈内存中的存储与使用方式类似于数据结构中的堆栈数据结构，遵循 **后进先出** 的原则。

> 暂不考虑 Symbol 类型

## 引用数据类型与堆内存

与其他语言不同，JavaScript 的引用数据类型，比如数组 Array，它们值的大小是不固定的。引用数据类型的值是保存在堆内存中的对象。JavaScript 不允许直接访问堆内存中的位置，因此我们不能直接操作对象的堆内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。因此，引用类型的值都是按引用访问的。这里的引用，我们可以粗浅地理解为保存在栈内存中的一个**引用地址**，该地址与堆内存的实际值相关联。 堆存取数据的方式，则与书架与书非常相似。 书虽然也有序的存放在书架上，但是我们只要知道书的名字，我们就可以很方便的取出我们想要的书，而不用像从乒乓球盒子里取乒乓一样，非得将上面的所有乒乓球拿出来才能取到中间的某一个乒乓球。好比在 JSON 格式的数据中，我们存储的 `key-value` 是可以无序的，因为顺序的不同并不影响我们的使用，我们只需要关心书的名字。

为了更好的搞懂变量对象与堆内存，我们可以结合以下例子与图解进行理解。

```js
// 变量对象
var a1 = 0;
// 变量对象
var a2 = 'Bingo!';
// 变量对象
var a3 = null;

// 变量 b 存在于变量对象中，{m: 20} 作为对象存在于堆内存中
var b = { m: 20 };
// 变量 c 存在于变量对象中，[1, 2, 3] 作为对象存在于堆内存中
var c = [1, 2, 3];
```

<br/>

```jsx | inline
import React from 'react';
import img from '../../../assets/memory-model/sample-illustruction.jpg';

export default () => <img alt="sample-illustruction" src={img} width={640} />;
```

因此当我们要访问堆内存中的引用数据类型时，实际上我们首先是从变量对象中获取了该对象的 **引用地址**（或者地址指针），然后再从堆内存中取得我们需要的数据。

理解了 JavaScript 的内存空间，我们就可以借助内存空间的特性来验证一下数据类型的特点了。

## 数据拷贝

### 基本数据类型

🌰 **代码示例**：

```js
const a = 10;
const b = a;
b = 20;
```

在变量对象中数据发生拷贝操作时，系统会自动为新的变量分配一个新值。`const b = a` 赋值操作执行后，虽然变量 `a` 和变量 `b` 均为 `100`，但是它们其实已经是相互独立互不影响的值了。

具体变化如下图所示：

```jsx | inline
import React from 'react';
import img from '../../../assets/memory-model/basic-type-copy-sample.jpg';

export default () => <img alt="basic-type-copy-sample" src={img} width={640} />;
```

### 引用数据类型

🌰 **代码示例**：

```js
const m = { a: 10, b: 20 };
const n = m;
n.a = 15;
```

引用类型的拷贝同样也会为新的变量自动分配一个新的值保存在变量对象中，但不同的是，这个新的值，仅仅只是引用类型的一个**地址指针**。当地址指针相同时，尽管他们相互独立，但是在变量对象中访问到的具体对象实际上是同一个。

```jsx | inline
import React from 'react';
import img from '../../../assets/memory-model/refered-type-copy-sample.jpg';

export default () => <img alt="refered-type-copy-sample" src={img} width={520} />;
```

## 归纳总结

| 栈内存                 | 堆内存                       |
| :--------------------- | :--------------------------- |
| 存储基础数据类型       | 存储引用数据类型             |
| 按值访问               | 按引用访问                   |
| 存储的值大小固定       | 存储的值大小不定，可动态调整 |
| 由系统自动分配内存空间 | 由开发者通过代码进行分配     |
| 主要用来执行程序       | 主要用来存放对象             |
| 空间小，运行效率高     | 空间大，但是运行效率相对较低 |
| 先进后出，后进先出     | 无序存储，可根据引用直接获取 |

## 参考资料

- [📝 内存基本知识](https://segmentfault.com/a/1190000006104910)
- [📝 内存空间详细图解](https://www.jianshu.com/p/996671d4dcc4)
- [📝 JavaScript's Memory Model](https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239)
