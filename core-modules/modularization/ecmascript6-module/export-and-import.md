## export 和 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块，`import` 语句可以与 `export` 语句写在一起。

```js
export { foo, bar } from 'my_module'

// 可以理解为
import { foo, bar } from 'mu_module'
export { foo, bar }
```

实际上，这样的写法只是相当于对外转发了这两个接口，当前模块不能直接使用这两个接口。

**模块的接口改名和整体输出**

```js
// 接口改名
export { foo, bar } from 'my_module'

// 整体输出
export * from 'my_module'
```

**默认接口**

```js
export { default } from 'foo'
```

**具名接口改为默认接口**

```js
export { es6 as default } from './someModule'

// 等同于
import { es6 } from './someModule'
export default es6
```

**默认接口改为具名接口**

```js
export { defaul as es6 } from './someModule'
```

下面三种写法，没有对应的复合写法

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

