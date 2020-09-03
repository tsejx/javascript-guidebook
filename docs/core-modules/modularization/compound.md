---
nav:
  title: 核心模块
  order: 3
group:
  title:  模块化
  order: 11
title: 模块导入/导出的复合写法
order: 4
---

# 模块导入/导出的复合写法

如果在一个模块之中，先输入后输出同一个模块，`import` 语句可以与 `export` 语句写在一起。

## 模块整体转发

从 `module` 模块整体导入后，直接完整导出。

```js
export * from 'module'
```

## 模块部分接口转发

从 `module` 模块导入 `foo` 和 `bar`，并直接导出这两个接口。

```js
export { foo, bar } from 'module'

// 可以理解为
import { foo, bar } from 'module'
export { foo, bar }
```

实际上，这样的写法只是相当于对外转发了这两个接口，当前模块不能直接使用这两个接口。

## 模块部分重命名转发

模块导入的接口重命名，从 `module` 导入 `foo` 接口，并以 `newFoo` 的名义导出。

```js
export { foo as newFoo } from 'module'
```

## 默认模块转发

```js
export { default } from 'module'
```

## 命名模块改默认模块

```js
export { foo as default } from './module'

// 等同于
import { foo } from './module'
export default foo
```

## 默认模块改命名模块

```js
export { default as foo } from './module'
```

## 无对应写法场景

下面三种写法，没有对应的复合写法：

- 命名模块重命名转发
- 默认模块转发
- 整体和部分模块共同转发

```js
// 命名模块重命名转发
import * as foo from './module'

// 默认模块转发
import foo from './module'

// 整体和部分模块共同转发
import foo , { namedFoo } from './module'
```

为了做到形式的对称，现在有提案，提出补上这三种复合写法。

```js
export * as foo from './module'

export foo from './module'

export foo , { namedFoo } from './module'
```

