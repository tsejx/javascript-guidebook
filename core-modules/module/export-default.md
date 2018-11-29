## export default

使用 `export default` 命令，开发者可以不需要知道原模块输出的变量名称。需要注意的是，`import` 命令后面，不可使用大括号。

```js
export default function (){
    console.log('Foo')
}

function foo(){
    console.log('foo')
}
export default foo	// 视同匿名函数加载
```

| 命令     | 输出                             | 输入                    | 大括号           |
| -------- | -------------------------------- | ----------------------- | ---------------- |
| 默认输出 | `export default function fn(){}` | `import fn from 'fn'`   | 输入不需要大括号 |
| 正常输出 | `export function fn(){}`         | `import {fn} from 'fn'` | 输入需要大括号   |

`export default` 命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此 `export default` 命令只能使用一次。所以，`import` 命令后面才不用加大括号，因为只可能唯一对应 `export default` 命令。

本质上，`export default` 就是输出一个叫做 `default` 的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

```js
// modules.js
function add(x, y) {
  return x * y;
}

export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

正是因为 `export default` 命令其实只是输出一个叫做 `default` 的变量，所以它后面不能跟变量声明语句。

```js
// Correct
export var foo = 1

// Correct
const bar = 1
export default bar

// Error
export default const baz = 1
```

上面代码中，`export default a` 的含义是将变量 `a` 的值赋给变量 `default`。所以，最后一种写法会报错。

同样地，因为 `export default` 命令的本质是将后面的值，赋给 `default` 变量，所以可以直接将一个值写在 `export default` 之后。

```js
// Correct
export default 42;

// Error
export 42;
```

上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为 `default`。

### 模块输入

有了 `export default` 命令，输入模块时就非常直观了，以输入 lodash 模块为例。

```js
import _ from 'lodash'
```

如果想在一条`import`语句中，同时输入默认方法和其他接口，可以写成下面这样。

```js
import _, { each, forEach } from 'lodash'
```

对应上面代码的 `export` 语句如下。

```js
export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };
```