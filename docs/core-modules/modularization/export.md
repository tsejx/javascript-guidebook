---
nav:
  title: 核心模块
  order: 3
group:
  title: 模块化
  order: 11
title: 模块导出 export
order: 3
---

# 模块导出 export

`export` 命令用于规定模块的对外接口。

## 导出方式

ECMAScript 规范中的模块化方案提供了两种导出模块的方式：

- 命名导出（Named Exports）
- 默认导出（Default Export）

### 命名导出

在声明的变量前添加 `export` 关键字即可将相对应的变量输出。

**导出前声明的值：**

这种写法能在脚本底部清晰看到所有输出模块，推荐。

```js
const originModule = true;

export { originModule };
```

**在导出时重命名：**

同样使用 `as` 关键字，同一函数可以定义多个不同的变量名输出。

```js
export { originModule as newModule };

export { originModule as smartModule };
```

**声明后立即导出：**

```js
export var something = true;
export let anything = true;
export const nothing = true;
export function everything (){}
export class interesting = true;
```

### 默认导出

默认导出让开发者无须知道源模块输出的模块名称即可完成导入。（默认导出的变量无法使用命名导入）

导出一个值作为源模块的默认导出：

```js
export default something;
```

⚠️ **注意**： 仅当源模块只有一个导出时，才建议使用此做法。

将默认和命名导出组合在同一个模块中是不好的做法，尽管它是规范允许的。

**扩展：**

本质上，`export default` 就是输出一个叫做 `default` 的变量或方法，然后系统允许你为它取任意名字。

所以，下面的写法是有效的。

模块导出：

```js
function add(x, y) {
  return x * y;
}

export { add as default };
// 等同于
// export default add;
```

模块导入：

```js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

正是因为 `export default` 命令其实只是输出一个叫做 `default` 的变量，所以它后面不能跟变量声明语句。

## 特性规范

### 对应关系

需要特别注意的是，`export` 命令规定的是 **对外的接口**，必须与模块内部的变量建立一一对应关系。

```js
// Error
export 1

// Error
const foo = 1
export foo
```

如上两种写法都会报错，因为均会输出 `1`，而 `1` 只是一个值 ，并非对外的接口。

```js
export var foo = 1;

var bar = 1;
export { bar };

var baz = 1;
export { baz as bat };
```

其他脚本可以通过这个接口，取到值 `1`。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。

同样地，函数和类必须遵守这种书写方法。

```js
// Error
function foo(){}
export foo

// Good
export function bar(){}

// Good
function baz(){}
export { baz }
```

另外，`export` 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

### 模块顶层输出

`export` 命令可以出现在模块的任何位置，只要处于模块顶层就可以。

如果处于块级作用域内，就会报错，`import` 命令也是如此。这是因为处于条件代码块之中，就没法做 **静态优化** 了，违背了 ES6 模块的设计初衷。

```js
function foo() {
  export default 'bar';
  // SyntaxError
}

foo();
```
