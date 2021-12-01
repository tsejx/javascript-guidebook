---
nav:
  title: 核心模块
  order: 3
group:
  title: 模块化
  order: 10
title: 动态加载
order: 7
---

# 动态加载

`import` 命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（`import` 命令叫做 **连接**）。因此，下面的代码会报错。

```js
// Error
if (x === 2) {
  import module from './module';
}
```

⚠️ **注意**：引擎处理 `import` 语句是在编译阶段，这时并不会去分析或执行 `if` 语句，所以 `import` 语句放在 `if` 代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，`import` 和 `export` 命令只能在模块的顶层，不能在代码块之中。

如此的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果 `import` 命令要取代 Node 的 `require` 方法，这就形成了一个障碍。因为 `require` 是运行时加载模块，`import` 命令无法取代 `require` 的 **动态加载功能**。

```js
const path = './' + fileName;

const myModual = require(path);
```

上面的语句就是动态加载，`require` 到底加载哪一个模块，只有运行时才知道。`import` 命令做不到这一点。

因此，有一个[提案](https://github.com/tc39/proposal-dynamic-import)，建议引入 `import()` 函数，实现动态加载。

```js
import(module);
```

参数 `module` ，表示指定所要加载的模块的位置。`import` 命令能够接受什么参数，`import()` 函数就能接受什么参数，两者区别主要是后者为动态加载。

`import()` 返回一个 **Promise** 对象。

```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then((module) => {
    module.loadPageInto(main);
  })
  .catch((err) => {
    main.textContent = err.message;
  });
```

`import()` 函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，`import()` 函数与所加载的模块没有静态连接关系，这点也是与 `import` 语句不相同。`import()` 类似于 Node 的 `require` 方法，区别主要是前者是异步加载，后者是同步加载。

## 适用场景

### 按需加载

`import()` 可以在需要的时候，再加载某个模块。

```js
button.addEventListener('click', (event) => {
  import('./dialogBox.js')
    .then((dialogBox) => {
      dialogBox.open();
    })
    .catch((error) => {
      /* Error handling */
    });
});
```

上面代码中，`import()` 方法放在 `click` 事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

### 条件加载

`import()` 可以放在 `if` 代码块，根据不同的情况，加载不同的模块。

```js
if (condition) {
    import('moduleA').then(...)
} else {
    import('moduleB').then(...)
}
```

上面代码中，如果满足条件，就加载模块 A，否则加载模块 B。

### 动态的模块路径

`import()` 允许模块路径动态生成。

```js
import(fn()).then(() => {});
```

上面代码中，根据函数 `fn` 的返回结果，加载不同的模块。

## 注意事项

### 解构赋值输出模块导入

`import()` 加载模块成功以后，这个模块会作为一个对象，当作 `then` 方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

```js
import('./module.js').then(({ export1, export2 }) => {
  // do something
});
```

上面代码中，`export1` 和 `export2` 都是 `module.js` 的输出接口，可以解构获得。

### 默认模块导入

如果模块有 `default` 输出接口，可以用参数直接获得。

```js
import('./module.js').then((module) => {
  console.log(module.default);
});
```

### 命名模块导入

上面的代码也可以使用 **具名输** 入的形式。

```js
import('./module.js').then(({ default: defaultInterface }) => {
  console.log(defaultInterface);
});
```

### 并发加载多个模块

如果想**同时加载多个模块**，可以采用下面的写法。

```js
Promise.all([import('./module1.js'), import('./module2.js'), import('./module3.js')]).then(
  ([module1, module2, module3]) => {
    // do something
  }
);
```

### 异步函数的模块导入

`import()` 也可以用在 **async 函数**之中。

```js
async function main() {
  const module = await import('./module.js');

  const { export1, export2 } = await import('./module.js');

  const [module1, module2, module3] = await Promise.all([
    import('./module1.js'),
    import('./module2.js'),
    import('./module3.js'),
  ]);
}

main();
```
