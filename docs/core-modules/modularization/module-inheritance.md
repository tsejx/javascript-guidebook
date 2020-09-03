---
nav:
  title: 核心模块
  order: 3
group:
  title:  模块化
  order: 11
title: 模块继承
order: 5
---

# 模块继承

模块之间也可以继承。

假设有一个 `children` 模块，继承自 `parent` 模块。

```js
// children.js
export * from 'parent'

export var name = 'child'

export function cry(){
  // do something
}
```

如上代码中的 `export *`，表示输出 `parent` 模块的所有模块和方法。然后，如上代码又输出了自定义的 `name` 属性和默认方法 `cry`。

同时，也可以将 `parent` 的属性或方法，改名后再输出。

```js
// children.js
export { work as job } from 'parent'
```

上面的代码表示，只输出 `parent` 模块的 `work` 方法，并且将其改名为 `job`。

加载上面模块的写法如下：

```js
// main.js
import * as child from 'children'
import cry from 'children'

console.log(cry(child.name))
```

上面代码中的 `import cry from 'children'` 表示，将 `children` 模块的默认方法加载为 `cry` 方法。
