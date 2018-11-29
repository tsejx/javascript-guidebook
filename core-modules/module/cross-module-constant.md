## 跨模块常量

由于 `const` 声明的变量只在当前代码块有效，如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。

```js
// constants.js
export const A = 1
export const B = 2
export const C = 3

// test1.js
import * as constants from './constants.js'
console.log(constants.A)	// 1
console.log(constants.B)	// 3

// test2.js
import { A, B } from './constants.js'
console.log(A)				// 1
console.log(B)				// 3
```

如果要使用的常量非常多，可以建一个专门的 `constants` 目录，将各种常量写在不同的文件里面，保存在该目录下。

```js
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
}

// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator']
```

然后，将这些文件输出的常量，合并在 `index.js` 里面。

```js
// constants.js
export { db } from './db'

export { users } from './users'
```

使用的时候，直接加载 `index.js` 就可以了。

```js
// script.js
import { db, users } from './constants/index'
```

