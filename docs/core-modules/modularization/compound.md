---
nav:
  title: 核心模块
  order: 3
group:
  title:  模块化
  order: 11
title: 复合写法
order: 4
---

# export 和 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块，`import` 语句可以与 `export` 语句写在一起。

## 重命名转发

```js
export { foo, bar } from 'my_module'

// 可以理解为
import { foo, bar } from 'mu_module'
export { foo, bar }
```

实际上，这样的写法只是相当于对外转发了这两个接口，当前模块不能直接使用这两个接口。

## 部分重命名整体转发

```js
// 接口改名
export { foo, bar } from 'my_module'

// 整体输出
export * from 'my_module'
```

## 默认转发

```js
export { default } from 'foo'
```

## 命名模块改默认模块

```js
export { es6 as default } from './someModule'

// 等同于
import { es6 } from './someModule'
export default es6
```

## 默认模块改命名模块

```js
export { defaul as es6 } from './someModule'
```

## 无对应写法场景

下面三种写法，没有对应的复合写法：

* 命名模块重命名转发
* 默认模块转发
* 整体和部分模块共同转发

```js
import * as someIdentifier from 'someModule'

import someIdentifier from 'someModule'

import someIdentifier , { namedIdentifier} from 'someModule'
```

为了做到形式的对称，现在有提案，提出补上这三种复合写法。

```js
export * as someIdentifier from 'someModule'

export someIdentifier from 'someModule'

export someIdentifier , { namedIdentifier } from 'someModule'
```

