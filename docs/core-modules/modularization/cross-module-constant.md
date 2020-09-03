---
nav:
  title: 核心模块
  order: 3
group:
  title:  模块化
  order: 11
title: 跨模块常量
order: 6
---

# 跨模块常量

由于 `const` 声明的变量只在当前代码块有效，如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。

```js
// constants.js 声明后命名导出
export const a = 1
export const b = 2
export const c = 3

// module1.js 命名空间导入
import * as constants from './constants.js'
console.log(constants.a)
// 1
console.log(constants.b)
// 2

// module2.js 命名导入
import { a, b } from './constants.js'
console.log(a)
// 1
console.log(b)
// 2
```

如果要使用的常量非常多，可以建一个专门的 `constants` 目录，将各种常量写在不同的文件里面，保存在该目录下。

```js
// constants/a.js
export const a = {
  a1: 'a1',
  a2: 'a2',
  a3: 'a3'
}

// constants/b.js
export const b = ['b1', 'b2', 'b3', 'b5', 'b6', 'b7']
```

然后，将这些文件输出的常量，合并在 `index.js` 里面。

```js
// constants/index.js
export { a } from './a'
export { b } from './b'
```

使用的时候，直接加载 `index.js` 就可以了。

```js
// module.js
import { a, b } from './constants'
```
