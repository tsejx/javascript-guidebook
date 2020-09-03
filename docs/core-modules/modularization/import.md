---
nav:
  title: 核心模块
  order: 3
group:
  title:  模块化
  order: 11
title: 模块导入 import
order: 2
---

# 模块导入 import

`import` 命令用于输入其他模块提供的功能。

## 导入方式

ECMAScript 规范中的模块化方案提供了四种引入模块的方式：

* 命名导入（Named Imports）
* 命名空间导入（Namespace Import）
* 默认导入（Default Import）
* 空的导入（Empty Import）

### 命名导入

从源模块导入其原始名称的特定项目。

```js
import { originModule } from './module.js'

// React Hook
import { useState, useEffect } from 'react'
```

从源模块导入特定项，并在导入时指定自定义名称。使用关键字 `as`，将输入的变量重命名。

```js
import { originMoudle as newMoudleName } from './module.js'
```

### 命名空间导入

将源模块中的所有内容作为对象导入，将所有源模块的命名导出公开为属性和方法。默认导出被排除在此对象之外。

```js
import * as module from './module.js'

// Node.js `fs` module
import * as fs from 'fs'
```

上述例子中 `originModule` 将被附加到作为属性的导入对象上，即 `module.originModule`。

### 默认导入

导入源文件的默认导出。

```js
import module from './module.js'
```

### 空的导入

加载模块代码，但不要创建任何新对象。

```js
import './module.js'
```

## 特性规范

### 只读性

`import` 命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

```js
import { foo } from './module.js'

foo = { a: 1 }
//  Syntax Error : 'a' is read-only;
```

但是，如果输入变量是对象类型，改写该变量是被允许的。

```js
import { bar } from './module.js'

bar.a = 1
// Right
```

尽管此处修改的对象属性，在其他模块也可以读取改写后的值。不过，这种做法很难查错，因此建议凡是输入的变量，都当作只读变量，轻易不要修改它。

### 输入路径

`import` 后面的 `from` 指定模块文件的位置，可以是相对路径，也可以是绝对路径，`.js` 后缀可以省略。

如果只是模块名，不带有路径，那么必须有**配置文件**（通常从引入模块目录下 `package.json` 中查找），告诉 JavaScript 引擎该模块的位置。

```js
import React from 'react'
```

### 模块提升

注意，`import` 命令具有提升效果，`import` 命令无论写在文件中的哪一行，都会提升到整个模块的头部，首先执行。

```js
foo()

import { foo } from './module.js'
```

上面的代码不会报错，因为 `import` 的执行早于 `foo` 的调用。这种行为的本质是，`import` 命令是编译阶段执行的，在代码运行之前。

### 静态执行

由于 `import` 是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```js
// 报错 - 使用了表达式
import { 'f' + 'oo' } from 'my_module';

// 报错 - 使用了变量
var module = 'my_module';
import { foo } from module;

// 报错 - 使用了判断语句
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

上面三种写法都会报错，因为它们用到了表达式、变量和 `if` 结构。在静态分析阶段，这些语法都是没法得到值的。

### 重复加载

如果多次重复执行同一句 `import` 语句，那么**只会执行一次，而不会执行多次**。

```js
import 'lodash'
import 'lodash'
```

上面代码加载了两次 `lodash`，但是只会执行一次。

```js
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```

上面代码中，虽然 `foo` 和 `bar` 在两个语句中加载，但是它们对应的是同一个 `my_module` 实例。也就是说，`import` 语句是 Singleton 模式。

## 模块化隔离

目前阶段，通过 Babel 转码，CommonJS 模块的 `require` 命令和 ES6 模块的 `import` 命令，可以写在同一个模块里面，但是最好不要这样做。因为 `import` 在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。

```js
require('core-js/modules/es6.symbol')

require('core-js/modules/es6.promise')

import React from 'React'
```
