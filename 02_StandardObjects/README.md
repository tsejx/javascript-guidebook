# 标准内置对象

本章介绍和说明了 JavaScript 中所有的标准的内置对象、以及它们的方法和属性。

**全局的对象**（ global objects ）或称标准内置对象，不要和 **"全局对象**（global object）**"** 混淆。这里说的全局的对象是说在**全局作用域里的内的对象**。

"全局对象 （global object）” 是一个 Global 类的对象。可以在全局作用域里，用 `this` 访问（但只有在非严格模式下才可以，在严格模式下得到的是 `undefined`）。实际上，**全局作用域**就是包含了全局对象的属性，还有它继承来的属性。

全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

## :spiral_notepad:目录

- 『值属性』
  - [Infinity](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/1_ValueProperties/Infinity.md)
  - [NaN](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/1_ValueProperties/NaN.md)
  - [undefined](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/1_ValueProperties/undefined.md)
- 『函数属性』
  - [eval()](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/2_FunctionProperties/eval.md)
  - [isFinite()](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/2_FunctionProperties/isFinite.md)
  - [isNaN()](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/2_FunctionProperties/isNaN.md)
  - [parseFloat()](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/2_FunctionProperties/parseFloat.md)
  - [parseInt()](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/2_FunctionProperties/parseInt.md)
  - [decodeURI()](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/2_FunctionProperties/decodeURI.md)
  - [decodeURIComponent()](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/2_FunctionProperties/decodeURIComponent.md)
  - [encodeURI()](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/2_FunctionProperties/encodeURI.md)
  - [encodeURIComponent()](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/2_FunctionProperties/encodeURIComponent.md)
- 『基本对象』
  - [Boolean](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/3_FundamentalObjects/Boolean/BooleanObject.md)
  - [Error](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/3_FundamentalObjects/Error/ErrorObject.md)
  - [Object](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/3_FundamentalObjects/Object/Object.md)
  - [Function](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/3_FundamentalObjects/Function/FunctionObject.md)
  - Symbol
- 『数字和日期对象』
  - [Date](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/4_Numbers%26Dates/Date/DateObject.md)
  - [Math](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/4_Numbers%26Dates/Math/MathObject.md)
  - [Number](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/4_Numbers%26Dates/Number/NumberObject.md)
- 『字符串和正则对象』
  - [String](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/5_TextProcessing/String/StringObject.md)
  - [RegExp](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/5_TextProcessing/RegExp/RegExpObject.md)
- 『索引集合』
  - [Array](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/6_IndexedCollections/Array/ArrayObject.md)
  - [TypedArrays](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/6_IndexedCollections/TypedArray/TypedArray.md)
- 『键值集合』
  - [Set](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/7_KeyCollections/Set/Set.md)
  - [WeakSet](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/7_KeyCollections/WeakSet/WeakSet.md)
  - [Map](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/7_KeyCollections/Map/Map.md)
  - [WeakMap](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/7_KeyCollections/WeakMap/WeakMap.md)
- 『结构化对象』
  - [ArrayBuffer](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/8_StructuredData/ArrayBuffer/ArrayBuffer.md)
  - [JSON](https://github.com/tsejx/JavaScript-Guidebook/blob/master/02_StandardObjects/8_StructuredData/JSON/JSON.md)
- 『控制抽象对象』
  - Promise
  - Generator
  - GeneratorFunction
  - AsyncFunction

