# 标准内置对象

本章介绍和说明了 JavaScript 中所有的标准的内置对象、以及它们的方法和属性。

**全局的对象**（ global objects ）或称标准内置对象，不要和 **"全局对象**（global object）**"** 混淆。这里说的全局的对象是说在**全局作用域里的内的对象**。

"全局对象 （global object）” 是一个 Global 类的对象。可以在全局作用域里，用 `this` 访问（但只有在非严格模式下才可以，在严格模式下得到的是 `undefined`）。实际上，**全局作用域**就是包含了全局对象的属性，还有它继承来的属性。

全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

## :spiral_notepad:目录

- 『值属性』
  - Infinity
  - NaN
  - undefined
- 『函数属性』
  - eval()
  - isFinite()
  - isNaN()
  - parseFloat()
  - parseInt()
  - decodeURI()
  - decodeURIComponent()
  - encodeURI()
  - encodeURIComponent()
- 『基本对象』
  - Boolean
  - Error
  - Object
  - Function
  - Symbol
- 『数字和日期对象』
  - Date
  - Math
  - Number
- 『字符串和正则对象』
  - String
  - RegExp
- 『索引集合』
  - Array
  - TypedArrays
- 『键值集合』
  - Set
  - WeakSet
  - Map
  - WeakMap
- 『结构化对象』
  - ArrayBuffer
  - JSON
- 『控制抽象对象』
  - Promise
  - Generator
  - GeneratorFunction
  - AsyncFunction

