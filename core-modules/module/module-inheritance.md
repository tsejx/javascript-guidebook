## 模块的继承

模块之间也可以继承。

假设有一个 `children` 模块，继承自 `parent` 模块。

```js
// children.js
export * from 'parent'
export var name = 'CHILD'
export function cry(){
    // do something
}
```

如上代码中的 `export *`，表示再输出 `parent` 模块的所有模块和方法。注意，`export *` 命令会忽略 `parent` 模块的 `default` 方法。然后，如上代码又输出了自定义的 `name` 属性和默认方法。

这时，也可以将 `parent` 的属性或方法，改名后再输出。

```js
// children.js
export { work as job }
```

上面的代码表示，只输出 `parent` 模块的 `work` 方法，且将其改名为 `job`。

加载上面模块的写法如下。

```js
// main.js
improt * as math from 'children'
import exp from 'children'

console.log(exp(math.e))
```

上面代码中的 `import exp` 表示，将 `circleplus` 模块的默认方法加载为 `exp` 方法。

