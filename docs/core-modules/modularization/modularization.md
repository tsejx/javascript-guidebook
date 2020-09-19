---
nav:
  title: 核心模块
  order: 3
group:
  title: 模块化
  order: 11
title: 模块化
order: 1
---

# 模块化

🌽 **模块化**：把复杂的系统分解到多个模块以方便编码

在**模块化编程**中，开发者将程序分解成离散功能块（discrete chunks of functionality），并称之为**模块**。

- 将一个复杂的程序依据一定的规则（规范）封装成几个块（文件），并进行组合在一起
- 块的内部数据相对而言是私有的，只是向外部暴露一些接口与外部其他模块通信

每个模块具有比完整程序更小的接触面，使得校验、调试、测试轻而易举。 精心编写的*模块*提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。

## 模块化趋势

### 痛点

过去代码组织方式，会出现的问题：

- 命名空间冲突
- 无法合理地管理项目依赖和版本
- 无法方便控制依赖的加载顺序
- 项目体积变大后难以维护

### 优势

实现模块化能实现的优势：

- 方便代码维护
- 提高代码复用性
- 降低代码耦合度（解耦）
- 分治思想

## 模块化进化史

### 全局模式

**module1.js**

```js
// 数据
let data1 = 'module one data';

// 操作数据的函数
function foo() {
  console.log(`foo() ${data1}`);
}
function bar() {
  console.log(`bar() ${data1}`);
}
```

**module2.js**

```js
let data2 = 'module two data';

function foo() {
  //与模块1中的函数冲突了
  console.log(`foo() ${data2}`);
}
```

**test.html**

```html
<!-- 同步引入，若函数冲突，则后面覆盖前面 -->
<script type="text/javascript" src="module1.js"></script>
<script type="text/javascript" src="module2.js"></script>
<script type="text/javascript">
  foo(); // foo() module two data
  bar(); // bar() module one data
</script>
```

**说明：**

- 全局模式：将不同的功能封装成不同的全局函数
- 问题：全局变量被污染了，很容易引起命名冲突

### 单例模式

**module1.js**

```js
let moduleOne = {
  data: 'module one data',
  foo() {
    console.log(`foo() ${this.data}`);
  },
  bar() {
    console.log(`bar() ${this.data}`);
  },
};
```

**module2.js**

```js
let moduleTwo = {
  data: 'module two data',
  foo() {
    console.log(`foo() ${this.data}`);
  },
  bar() {
    console.log(`bar() ${this.data}`);
  },
};
```

**test.html**

```html
<script type="text/javascript" src="module1.js"></script>
<script type="text/javascript" src="module2.js"></script>
<script type="text/javascript">
  moduleOne.foo(); //foo() module one data
  moduleOne.bar(); //bar() module one data

  moduleTwo.foo(); //foo() module two data
  moduleTwo.bar(); //bar() module two data

  moduleOne.data = 'update data'; //能直接修改模块内部的数据
  moduleOne.foo(); //foo() update data
</script>
```

说明：

- 单例模式模式：简单对象封装
- 作用：减少了全局变量（如两个模块的 `data` 都不是全局变量了，而是对象的某一个属性）
- 问题：不安全，可以直接修改模块内部的数据

### IIFE 模式

**module1.js**

```js
(function(window) {
  // 数据
  let data = 'IIFE module data';

  //操作数据的函数
  function foo() {
    // 用于暴露的函数
    console.log(`foo() ${data}`);
  }

  function bar() {
    // 用于暴露的函数
    console.log(`bar() ${data}`);
    otherFun(); //内部调用
  }

  function otherFun() {
    // 内部私有的函数
    console.log('privateFunction go otherFun()');
  }

  // 暴露 foo 函数和 bar 函数
  window.module = { foo, bar };
})(window);
```

**test.html**

```html
<script type="text/javascript" src="module1.js"></script>
<script type="text/javascript">
  module.foo(); // foo() IIFE module data
  module.bar(); // bar() IIFE module data    privateFunction go otherFun()

  // module.otherFun()  //报错，module.otherFun is not a function

  console.log(module.data); // undefined 因为我暴露的 module 对象中无 data
  module.data = 'xxxx'; // 不是修改的模块内部的 data，而是在 module 新增 data 属性
  module.foo(); // 验证内部的 data 没有改变  还是会输出 foo() IIFE module data
</script>
```

说明：

- IIFE 模式：匿名函数自调用（闭包）
- IIFE：Immediately-Invoked Function Expression（立即调用函数表达式）
- 作用：数据是私有的，外部只能通过暴露的方法操作
- 问题：如果当前这个模块依赖另一个模块怎么办？见下面 IIFE 增强版的（模块依赖于 jQuery）

### IIFE 模式增强

引入 jQuery 到项目中

**module1.js**

```js
(function(window, $) {
  //数据
  let data = 'IIFE Strong module data';

  //操作数据的函数
  function foo() {
    //用于暴露的函数
    console.log(`foo() ${data}`);
    $('body').css('background', 'red');
  }

  function bar() {
    //用于暴露的函数
    console.log(`bar() ${data}`);
    otherFun(); //内部调用
  }

  function otherFun() {
    //内部私有的函数
    console.log('privateFunction go otherFun()');
  }

  //暴露foo函数和bar函数
  window.moduleOne = { foo, bar };
})(window, jQuery);
```

**test.html**

```html
<!--引入的js必须有一定顺序-->
<script type="text/javascript" src="jquery-1.10.1.js"></script>
<script type="text/javascript" src="module1.js"></script>
<script type="text/javascript">
  moduleOne.foo(); //foo() IIFE Strong module data  而且页面背景会变色
</script>
```

说明：

- IIFE 模式增强：引入依赖
- 这就是现代模块实现的基石。其实很像了，有引入和暴露两个方面。
- 存在的问题：一个页面需要引入多个 JS 文件的问题

```html
<script type="text/javascript" src="module1.js"></script>
<script type="text/javascript" src="module2.js"></script>
<script type="text/javascript" src="module3.js"></script>
<script type="text/javascript" src="module4.js"></script>
```

- 请求过多：一个 `<script>` 标签就是一次请求
- 依赖模糊：看不出来谁依赖着谁？哪些模块是有依赖关系的，很难看出来
- 难以维护：内部依赖关系混乱也就难以维护啦

## 模块化方案

### CommonJS

CommonJS 是服务器端模块的规范，Node.js 就是采用了这个规范。但目前也可用于浏览器端，需要使用 Browserify 进行提前编译打包。

CommonJS 模块化的引入方式使用 `require`，暴露的方式使用 `module.exports` 或 `exports`。

```jsx | inline
import React from 'react';
import img from '../../assets/modularization/commonjs.jpeg';

export default () => <img alt="CommonJS" src={img} width={800} />;
```

**特点**

- 同步加载依赖的模块
- 可复用于 Node 环境
- 成熟的第三方模块社区

> **彻底说明白 `module.exports` 和 `exports` 的区别：**

在 Node.js 中，`module` 是一个全局变量，类似于在浏览器端的 Window 也是一个全局变量一样的道理。

`module.exports` **初始**的时候置为空对象，`exports` 也指向这个空对象。

内部代码实现：

```js
var module = {
  id: 'xxxx',
  exports: {},
};

var exports = module.exports;
// exports 是对 module.exports 的引用
// 也就是 exports 现在指向的内存地址和 module.exports 指向的内存地址是一样的
```

上面的代码可以看出我们平常使用的 `exports` 是对 `module.exports` 的一个引用，两者都是指向同一个对象。

用一句话来说明就是，模块的 `require`（引入）能看到的只有 `module.exports` 这个对象，它是看不到 `exports` 对象的，而我们在编写模块时用到的 `exports` 对象实际上只是对 `module.exports` 的引用。

```js
exports = module.exports;
```

我们可以使用 `exports.a = ‘xxx’` 或 `exports.b = function(){}` 添加方法或属性，本质上它也添加在 `module.exports` 所指向的对象身上。

但是你不能直接 `exports = { a: 'xxx'}`，这就将 `exports` 重新指向新的对象，它和 `module.exports` 就不是指向同一个对象，也就让两者失去了关系，而 Node.js 中 `require` 能看到的是 `module.exports` 指向的对象。

因此，我们一般都会直接使用：

```js
module.exports;
```

再举例说明两者区别：

```js
function foo() {
  console.log('foo');
}

function bar() {
  console.log('bar');
}
```

想要将这两个函数暴露出去，可以直接使用`exports`

```js
exports.foo = foo;
exports.bar = bar;
```

也可以对 `module.exports` 赋值

```js
module.exports = {
  foo: foo,
  bar: bar,
};
```

但是不能直接对 `exports` 赋值

```js
// 错误
exports = {
  foo: foo,
  bar: bar,
};
```

因为这样做仅仅改变了`exports` 的引用，而不改变 `module.exports`。

**总结**

**特点**：同步加载，有缓存

**用法**：关键在于引入和暴露

- 引入模块
  - `require(url)`（`url` 为路径参数）
  - 路径：自定义模块路径必须以 `./` 或者 `../` 开头
  - 第三方模块/内置模块/核心模块：路径直接使用模块名称
- 暴露模块
  - `exports`
  - `module.exports`

主要是在服务器端使用的，但是也能在浏览器端运行，需要借助 [Browserify](https://github.com/browserify/browserify) 进行编译。

### AMD

> CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。由于 NodeJS 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，所以同步加载没有问题。但是如果是浏览器端，同步加载很容易阻塞，这时候 AMD 规范就出来了。AMD 规范则是非同步加载模块，允许指定回调函数。故浏览器端一般会使用 AMD 规范。

[AMD](https://github.com/amdjs/amdjs-api/wiki) 是 [require.js](https://github.com/requirejs/requirejs) 在推广过程中对模块定义的规范化产出 。

```jsx | inline
import React from 'react';
import img from '../../assets/modularization/amd.jpeg';

export default () => <img alt="AMD" src={img} width={800} />;
```

**特点：**

- 异步加载依赖的模块
- 可在不转换代码的情况下直接在浏览器运行
- 并行加载多个模块
- 可运行在浏览器和 Node 环境

**用法：**

- 暴露模块
  - 在模块内部使用 `return`
- 定义模块
  - `define(['模块名'], function (模块暴露内容) {})`
  - `require(['模块名'], function (模块暴露内容) {})`
  - 在模块内部可以使用 `require` 定义异步模块
- 主模块：
  - `requirejs.config({})` 配置使用的模块路径
  - `requirejs(['模块名'], function (模块暴露内容) {})`
- HTML 文件引入 `<script>` 标签
  - `<script data-main='app.js' src='require.js'></script>`

AMD（通用模块定义）主要是在浏览器使用的。

### CMD

CMD 是根据 CommonJS 和 AMD 基础上提出的。

CMD（通用模块定义）和 AMD（异步模块定）是比较相似的。

`require.js` 遵循的是 AMD（异步模块定义）规范，[sea.js](https://github.com/seajs/seajs) 遵循的是 CMD （通用模块定义）规范。

```jsx | inline
import React from 'react';
import img from '../../assets/modularization/cmd.jpeg';

export default () => <img alt="CMD" src={img} width={800} />;
```

**特点：**

- 异步加载，有缓存

**用法：**

- 定义模块
  - `define(function (require, exports, module) {})`
- 引入模块
  - 同步加载 `require()`
  - 异步加载 `require.async(['模块名'], function(模块暴露内容) {})`
- 暴露模块
  - `exports`
  - `module.exports`
- HTML 文件引入 `<script>`标签
  - `<script src='sea.js'></script>`
  - `<script>seajs.use('app.js')</script>`

`sea.js` 和 `require.js` 一样主要在浏览器中使用。其实这两个一般都很少使用。用的比较多的是 `commonjs` 和马上要介绍的 ES6 模块化。

### ES6 Module

**特点：**

- 动态引入（按需加载），没有缓存

  **用法：**

- 引入模块使用 `import`
  - 统一暴露：`import {模块暴露的内容} from '模块路径'`
  - 分别暴露：`import * as m1 from './module1'`
    - 这两者暴露的本质是对象，接收的时候只能以对象的解构赋值的方式来接收值
  - 默认暴露：直接使用 `import 模块暴露的内容 from '模块路径'`。默认暴露，暴露任意数据类型，暴露什么数据类型，接收什么数据类型。
- 暴露模块使用 `export`
  - 分别暴露 （基本不用）
  - 统一暴露 （暴露多个内容）
  - 默认暴露 （暴露单个内容）

主要是用在浏览器，服务器端也使用。但是现在浏览器和服务器均不支持 ES6 的模块化语法，所以要借助工具来编译运行

- [Babel](https://github.com/babel/babel) 将 ES6+ 转换为 ES5- （ES6 的模块化语法 编译成 `commonjs`）
- Browserify 将 CommonJS 语法编译成能让浏览器识别的语法

## 严格模式

ES6 的模块自动采用严格模式，不管你是否有在模块头部加上 `'use strict'`。

严格模式主要有以下限制：

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用 `with` 语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量 `delete prop`，会报错，只能删除属性 `delete global[prop]`
- `eval` 不会在它的外层作用域引入变量
- `eval` 和 `arguments` 不能被重新赋值
- `arguments` 不会自动反映函数参数的变化
- 不能使用 `arguments.callee`
- 不能使用 `arguments.caller`
- 禁止 `this` 指向全局对象
- 不能使用 `fn.caller` 和 `fn.arguments` 获取函数调用的堆栈
- 增加了保留字（比如 `protected`、`static` 和 `interface`）

其中，尤其需要注意 `this` 的限制。ES6 模块之中，顶层的 `this` 指向 `undefined`，即不应该在顶层代码使用 `this`。

## 模块化与组合化

既然说到模块化，其实我更想说说模块化与组件化。这两个概念在前端领域已经十分普遍。

先有模块化后有组件化。组件化是建立在模块化思想上的一次演进，一个变种。所以，我们会在软件工程体系中看过一句话：**模块化是组件化的基石**。

组件化和模块化的思想都是 **分而治之** 的思想。但还是有细小的区分，他们的侧重点有所不同。

组件化更加倾向于 UI 层面上，是一个可以独立展示内容的「积木」，比如一个页面的头部组件，包含结构 HTML、样式 CSS、逻辑 JS、以及静态资源图片组合一个集合体。一个页面是由众多组件组成的，就像由众多「积木」搭成的「城堡」一样； 模块化更加倾向于功能或者数据的封装，一般由几个组件或单个组件构成的带有一定功能的集合体；

引用一下 [@张云龙](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Ffouber%2Fblog%2Fissues%2F10) 对组件化的理解：

```jsx | inline
import React from 'react';
import img from '../../assets/modularization/components-1.jpeg';

export default () => <img alt="组件化示意图1" src={img} width={720} />;
```

<br />

就如上图的这个 `title` 组件，包含了结构 HTML、样式 CSS、逻辑 JavaScript、以及静态资源图片，往往组件的组成就是以上四个方面。这个 `header` 文件夹我们可以拿到其他项目中使用，它具有可以独立展示内容的特点。

结合前面提到的模块化开发，整个前端项目可以划分为这么几种开发概念：

| 名称     | 说明                                            | 举例                                                                                                                   |
| -------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| JS 模块  | 独立算法和数据单元                              | 浏览器环境检测（detect）、网络请求（ajax）、应用配置（config）、DOM 操作（dom）、工具函数（utils）以及组件里的 JS 单元 |
| CSS 模块 | 独立的功能性样式单元                            | 栅格系统（grid）、字体图标（icon-fonts）、动画样式（animate）以及组件里的 CSS 单元                                     |
| 页面     | 前端这种 GUI 软件的的界面状态，是 UI 组件的容器 | 首页（index）、列表页（list）、用户管理（user）                                                                        |
| 应用     | 整个项目或整个站点被称之为应用，由多个页面组成  |                                                                                                                        |

那么它们之间的关系如下图所示，一个应用由多个下图的页面组成。一个页面由多个组件组合。组件中可依赖 JS 模块。

所以，前端开发现在不仅仅只是别人说的「画画页面实现点效果」的职位，它是实现软件的图形用户界面（Graphical User Interface，简称 GUI），是一名软件工程师。现在前端开发都是基于模块化和组件化的开发，可以说算是工程化的项目了。从单页面（SPA）的应用就可以看出 JavaScript 大大改善了 Web 应用的用户体验。从谷歌提出 PWA（Progressive Web Apps）就可以看出前端在领域的成长。

不仅仅如此，多终端也已经成为时下以及未来的一个必然趋势，移动端、PC 端、触摸屏、智能设备、物联网等等，相信前端在跨端的领域下肯定会有更好的解决方案。

但是，如果从整个软件工程来看，我们就会意识到一个惨痛的事实：前端工程师在整个系统工程中的地位太低了。前端是处于系统软件的上游（用户入口），因此没有其他系统会来调取前端系统的服务。而后端它在软件开发中处于下游，后端一方面要为前端提供接口服务，一方面要向中后台以及数据层索取服务，对接层次会更多，地位也就更高了。由此导致，感觉每次需求评估前端往往是最后一道坎，因为上游依托下游，就只能是下游先行了，整体上就会感觉前端对业务的参与度太低了。

---

**参考资料：**

- [📝 从前端模块化编程切入想聊聊前端的未来](https://juejin.im/post/5c82323ce51d453a5f22b281)
- [📝 前端模块化开发那点历史](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fseajs%2Fseajs%2Fissues%2F588)
- [📝 JavaScript 模块化编程@阮一峰](https://link.juejin.im/?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2012%2F10%2Fjavascript_module.html)
- [📝 知乎专栏 | AMD 和 CMD 的区别](https://link.juejin.im/?target=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F20351507%2Fanswer%2F14859415)
