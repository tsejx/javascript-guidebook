---
nav:
  title: 核心模块
  order: 3
group:
  title: 执行阶段
  order: 3
title: 作用域链
order: 3
---

# 作用域链

在 [变量对象](./variable-object) 中提及到，当查找变量的时候，会先从当前执行上下文的变量对象中查找，如果没有找到，就会从父级（词法层面上的父级）执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的 <strong style="color: red;">变量对象</strong> 构成的链表就叫做作用域链。

下面，我们从一个函数的 **创建** 和 **激活** 两个阶段来剖析作用域链是如何创建和变化的。

## 函数的创建

函数作用域在函数定义的时候就决定了。

这是因为函数有一个内部属性 `[[Scopes]]`，当函数创建的时候，就会保存所有父级作用域内的变量对象到其中，你可以理解 `[[Scopes]]` 就是所有父级作用域的变量对象的层级链，但是注意：`[[Scopes]]` 并不代表完整的作用域链。

🌰 **代码示例**：

```js
function foo() {
  function bar() {
    // do something
  }
}
```

函数创建时，各自的 `[[Scopes]]` 为：

```js
console.dir(foo);
// [[Scopes]]: Scopes[2]
// 0: Scripts {...}
// 1: Global {...}

foo.[[Scopes]] = [
  globalContext.VO
];

bar.[[Scopes]] = [
  fooContext.AO,
  globalContext.VO
];
```

## 函数的激活

当函数激活（执行）时，进入函数上下文，创建 VO / AO 后，就会将 **活动对象** 添加到作用域链的前端。

这时候执行上下文的作用域链，我们命名为 Scopes：

```js
Scopes = [AO].concat([[Scopes]]);
```

至此，作用域链创建完毕。

## 示例分析

以下面的例子为例，结合着之前讲的变量对象和执行上下文栈，我们来总结一下函数执行上下文中作用域链和变量对象的 **创建过程**：

```js
const scope = 'global scope';
function checkscope() {
  var scope2 = 'local scope';
  return scope2;
}
checkscope();
```

**执行过程** 如下：

1. `checkscope` 函数被创建，保存作用域链到内部属性 `[[Scopes]]`

```js
checkscope.[[Scopes]] = [
  globalContext.VO
];
```

2. 执行 `checkscope` 函数，创建 `checkscope` 函数执行上下文，`checkscope` 函数执行上下文被压入执行上下文栈

```js
ECStack = [checkscopeContext, globalContext];
```

3. `checkscope` 函数并不立刻执行，开始做准备工作，第一步：复制函数 `[[Scopes]]` 属性创建作用域链

```js
checkscopeContext = {
  Scopes: checkscope.[[Scopes]],
}
```

4. 用 `arguments` 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明

```js
checkscopeContext = {
  AO: {
    arguments: {
      length: 0
    },
    scope2: undefined
  }，
  Scopes: checkscope.[[Scopes]],
}
```

5. 将活动对象压入 `checkscope` 作用域链顶端

```js
checkscopeContext = {
  AO: {
    arguments: {
      length: 0,
    },
    scope2: undefined,
  },
  Scopes: [AO, [[Scopes]]],
};
```

6. 准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值

```js
checkscopeContext = {
  AO: {
    arguments: {
      length: 0,
    },
    scope2: 'local scope',
  },
  Scopes: [AO, [[Scopes]]],
};
```

7. 查找到 `scope2` 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出

```js
ECStack = [globalContext];
```

## 参考资料

- [📝 JavaScript 深入之作用域链](https://github.com/mqyqingfeng/Blog/issues/6)
