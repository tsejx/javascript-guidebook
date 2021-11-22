---
nav:
  title: 核心模块
  order: 3
group:
  title: 内存管理
  order: 4
title: 垃圾回收
order: 3
---

# 垃圾回收

> 由于字符串、对象和数组没有固定大小，所以当他们的大小已知时，才能对他们进行动态的存储分配。JavaScript 序每次创建字符串、数组或对象时，解释器都必须分配内存来存储那个实体。只要像这样动态地分配了内存，最终都要释放这些内存以便他们能够被再用，否则，JavaScript 的解释器将会消耗完系统中所有可用的内存，造成系统崩溃。——《JavaScript 权威指南》

在 C 和 C++ 之类的语言中，需要手动来管理内存的，这也是造成许多不必要问题的根源。幸运的是，在编写 JavaScript 的过程中，内存的分配以及内存的回收完全实现了自动管理。

JavaScript 通过 <strong style="color:red">自动垃圾收集机制</strong> 实现内存的管理。垃圾回收机制通过垃圾收集器每隔固定的时间段（周期性）找出那些不再需要继续使用的变量，执行一次释放占用内存的操作。

> 什么是不再需要继续使用的值？

不再需要继续使用的变量也就是生命周期结束的变量。

- **局部变量**：在局部作用域中，当函数执行完毕，局部变量也就没有存在的必要了（除了闭包），因此垃圾收集器很容易做出判断并回收
- **全局变量**：但是全局变量的生命周期直到浏览器卸载页面才会结束，也就是**全局变量不会被当成垃圾变量回收**。所以声明一个全局变量的时候，我们一定要慎重的考虑，在使用完这个变量的对象之后，我们是否还在需要这个对象，如果不需要的话，我们应该手动的将这个变量置为空（`null`），这样在下一次垃圾回收的时候，就能去释放这个变量上一次指向的值

## 原理

JavaScript 有两种策略实现垃圾回收机制：

- [引用计数法](#引用计数法)
- [标记清除法](#标记清除法)

### 引用计数法

**引用计数法：** 跟踪记录每个值被引用的次数，当声明了一个变量并将一个引用类型赋值给该变量时，则这个值的引用次数就是 `1`，如果这个值再被赋值给另一个变量，则引用次数加 `1`。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数就减 `1`。当这个引用次数变成 `0` 时，则说明没有办法再访问这个值了，因而就可以将其所占的内存空间给收回来。这样，垃圾收集器下次再运行时，它就会释放那些引用次数为 `0` 的值所占的内存。

这种垃圾收集方式存在一个比较大的问题就是循环引用，就是说对象 `a` 包含一个指向 `b` 的指针，对象 `b` 也包含一个指向 `a` 的引用。 这就可能造成大量内存得不到回收，也就是内存泄漏，这是因为它们的引用次数永远不可能是 `0`。

🌰 **代码示例**：

```js
function problem() {
  var a = new Object();
  var b = new Object();
  a.ref = b;
  b.ref = a;
}
```

> 浅大小（shallow size）：对象自身所存储的原生值及其他必要数据的大小。
> 留存大小（retained size）：对象自身的浅大小和它支配的所有对象的浅大小的总和。

引用计数法无法解决循环引用问题：

```js
function fn() {
  var x = {};
  var y = {};
  x.a = y;
  y.a = x;
}
```

### 标记清除法

**标记清除法**：当程序执行流入到一个函数中时，会创建该函数的执行上下文，执行上下文中的变量都会被标记为 **进入环境**，从逻辑上讲，永远不能释放 **进入执行环境** 变量所占用的内存。因为只要执行流进入相应的执行上下文，就可能会用到这些变量。

标记清除的工作流程：

- 垃圾收集器在运行的时候会给存储在内存的中的 **所有变量都加上标记**
- 去掉 **执行上下文中的变量** 以及 **被环境中的变量引用的变量** 的标记
- 那些 **还存在标记的变量将被视为准备删除的变量**
- 最后垃圾收集器完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间

手动释放内存：

```js
let a = 1;

a = null;
```

`a = null` 其实仅仅只是做了一个释放引用的操作，让变量 `a` 原本对应的值失去引用，脱离执行环境，这个值会在下一次垃圾收集器执行操作时被找到并释放。而在适当的时候解除引用，是为页面获得更好性能的一个重要方式。

JavaScript 引擎的垃圾回收机制是标记清除法，判断内存是否可回收的依据是可达性，它是对引用计数法的改良，对象间的循环引用问题不会引起回收问题，因为判断是否可回收的依据是变量是否可达。这种算法下存在一个根节点，它始终不会被回收，称为 GC Root，比如 JavaScript Runtime 的全局对象，在浏览器中叫 `window` 以及 DOM 树根节点都是 GC Root。程序间对象的引用关系形成了节点的图，凡事能够从 GC Root 出发，沿着引用关系可以访达的对象被标记为活跃对象，而那些和 GC Root 孤立的对象就会被回收，可以发现代码中引用数为 0 的对象一定无法从 GC Root 访达，也就是说某个对象引用计数法认为它应该被回收的话，那么标记清除法也会将其回收，但是和 GC Root 孤立的对象，它在代码中的引用数不一定是 0，比如说对象属性的循环引用，它们都不可达，且都和 GC Root 孤立，但它们的引用数不一定是 0。所以说标记清除算法可以取代引用计数算法。

## 堆栈溢出

**堆栈溢出**：指内存空间已经被申请完，没有足够的内存提供了。

## 内存泄漏

**内存泄漏**：指申请的内存执行完后没有及时的清理或者销毁，占用空闲内存，内存泄漏过多的话，就会导致后面的进程申请不到内存。因此内存泄漏会导致内部内存溢出。

```plain
内存泄漏 --可能导致--> 堆栈溢出
```

在传统的编程软件中，比如 C 语言中，需要使用 `malloc` 来申请内存空间，再使用 `free` 来释放掉，需要手动清除。而 JavaScript 中有自己的垃圾回收机制，一般常用的垃圾收集方法就是标记清除法。

- 即使 1Byte 的内存，也叫内存泄漏，并不一定是导致浏览器奔溃、卡顿才能叫内存泄漏
- 一般是堆区内存泄漏，栈区不会泄漏。基本数据类型的值保存在栈中，引用数据类型保存在堆中。所以对象、数组等才会发生内存泄漏。

**常见的内存泄漏的原因**：

- 全局变量引起的内存泄漏
- 没有被清除的定时器
- 闭包

**解决方法**：

- 减少不必要的全局变量
- 减少闭包的使用（因为闭包会导致内存泄漏）
- 避免死循环的发生

### 全局变量

全局变量不会被当成垃圾回收，我们在编码中应该尽量避免声明全局变量。

```html
<body>
  <button onclick="grow()">Global Var</button>
  <script type="text/javascript">
    function LargeObj() {
      this.largeArr = new Array(1000_0000);
    }

    var x = [];

    function grow() {
      var o = new LargeObj();

      x.push(0);
    }
  </script>
</body>
```

当我们使用 [默认绑定](../execution/this#默认绑定)，`this` 会指向全局对象。

🔧 **解决方法**： 在函数内使用严格模式或手动释放全局变量的内存。

**调试方式**：`More Tools -> Developer Tools -> Performance/Memory`，一般现在 `Performance` 面板录制页面内存占用情况随时间变化的图像，对内存泄漏有个直观的判断，然后在 `Memory` 面板定位问题发生的位置

### 分离的 DOM 引用

DOM 节点的内存被回收要满足两点：DOM 节点在 DOM 树上被移除，并且代码中没有对他的引用。内存泄漏发生在节点从 DOM 上被删除了，但代码中留存着对它的 JS 引用，我们称这种为分离的 DOM 节点。

实现分离的 DOM 引用的内存泄漏示例：

```html
<body>
  <button>移除列表</button>
  <ul id="list">
    <li>项目1</li>
  </ul>
  <script type="text/javascript">
    var button = document.getElementById('button');
    var list = document.getElementById('list');

    button.addEventListener('click', function () {
      list.remove();
    });
  </script>
</body>
```

可以通过堆快照（Heap Snapshot），调试路径 `Memory -> Heap Snapshot -> Take Snapshot`，堆快照可以直接告诉我们是否存在分离的 DOM 节点，只要在顶部过滤框 filter 输入 `detached`，如果过滤出东西，说明存在分离的 DOM 节点。

对于上例，可以把 `list` 节点放到点击节点的回调中，这样当回调函数返回后，局部变量会被销毁。

### 闭包

闭包也会造成内存泄漏，是因为函数实例上的隐式指针会留存实例创建环境下的作用域对象。

```html
<body>
  <button onclick="closure()">Closure</button>
  <script type="text/javascript">
    var func = [];

    function outer() {
      var someText = new Array(1000_0000);

      return function inner() {
        return someText;
      };
    }

    function closure() {
      funcs.push(outer());
    }
  </script>
</body>
```

注意：并非该代码一定有什么问题，只是说明闭包会带来内存占用，不合理的内存占用才会被定性为内存泄漏。

调试方式：`More Tools -> Developer Tools -> Memory -> Allocation instrumentation on timeline`。

### 定时器

当不需要 `setInterval` 或者 `setTimeout` 时，定时器没有被清除，定时器的回调函数以及内部依赖的变量都不能被回收，造成内存泄漏。

```js
const someResource = getData();

// node、someResource 存储了大量数据 无法回收
const timerId = setInterval(function () {
  const node = document.getElementById('Node');

  if (node) {
    // 定时器也没有清除
    node.innerHTML = JSON.stringify(someResource);
  }
}, 1000);

clearInterval(timerId);
```

🔧 **解决方法**：在定时器完成工作的时候，手动清除定时器。

### 控制台打印

使用 `console.log` 语句打印调试信息，因为控制台要始终保持他们的引用，以便随时查看，所以他们的内存也无法被回收，所以建议生产环境下去除控制台打印。

## 参考资料

- [📝 内存基本知识](https://segmentfault.com/a/1190000006104910)
- [📝 JavaScript 内存机制](https://juejin.im/post/5b10ba336fb9a01e66164346)
- [📝 An interesting kind of JavaScript memory leak](https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156)
- [📝 V8 引擎垃圾回收与内存分配](https://juejin.cn/post/6909239354418266119)
- [📝 JS 内存泄漏排查方法](https://cloud.tencent.com/developer/article/1444558)
- [📝 JavaScript 执行机制：垃圾回收机制](https://sunra.top/2021/08/04/javascript-gc/)
