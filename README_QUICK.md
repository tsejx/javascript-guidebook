<div align="center">

<img width="200" height="200" src="https://raw.githubusercontent.com/tsejx/JavaScript-Guidebook/master/images/lighthouse.png">

<br/>

<p align="center">
<a><img src="https://img.shields.io/github/last-commit/tsejx/JavaScript-Guidebook.svg"/></a>
<a><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"/></a>
<a><img src="https://img.shields.io/github/issues/tsejx/JavaScript-Guidebook.svg"/></a>
<a><img src="https://img.shields.io/github/forks/tsejx/JavaScript-Guidebook.svg"/></a>
<a><img src="https://img.shields.io/github/stars/tsejx/JavaScript-Guidebook.svg"/></a>
<a><img src="https://img.shields.io/maintenance/yes/2019.svg"/></a>
</p>

<h1>JavaScript Guidebook</h1>

<p>整理自各大技术社区的前端技术图谱<p>
<p>章节内容来源注释于具体页面底部，如错漏欢迎提 <a href="https://github.com/tsejx/JavaScript-Guidebook/issues">issue</a> 斧正</p>
<p>更多优质内容整理可查阅 <a href="https://github.com/tsejx/JavaScript-Guidebook/wiki">wiki</a></p>
</div>


## 快速目录

1. [基本语法 Basic Concept](#memo基本语法-basic-concept)
2. [标准内置对象 Standard Built-in Objects](#mortar_board标准内置对象-standard-built-in-objects)
3. [核心模块 Core Modules](#8ball核心模块-core-modules)
4. [面向对象编程 Object Oriented Programming](#construction面向对象编程-object-oriented-programming)
5. [浏览器对象模型 Browser Object Model](#world_map浏览器对象模型-browser-oject-model)
6. [文档对象模型 Document Object Model](#incoming_envelope文档对象模型document-oject-model)
7. [HTML5 脚本编程 HTML5 Scripting Programing](#keyboardhtml5脚本编程-scripting-programing)
8. [计算机网络 Computer Network](#globe_with_meridians计算机网络-computer-network)


## :open_book:项目目录

### :memo:基本语法 Basic Concept

- **术语定义**
- **词法语法**
  - [词法语法](basic-concept/lexical-grammar/lexical-grammar.md)
- **数据类型和值**
  - [数据类型和值](basic-concept/data-types/data-types.md)
  - [类型检测](basic-concept/data-types/type-check.md)
    - [类型转换](basic-concept/data-types/type-conversion.md)
- **表达式**
  - **主要表达式**
    - [数组初始化](basic-concept/expressions/primary-expression/array-initializer.md)
    - [字面量引用](basic-concept/expressions/primary-expression/literal.md)
    - [对象初始化](basic-concept/expressions/primary-expression/object-initializer.md)
    - [分组表达式](basic-concept/expressions/primary-expression/the-grouping-operator.md)
    - [属性访问器](basic-concept/expressions/primary-expression/property-accessors.md)
  - [更新表达式](basic-concept/expressions/update-expressions.md)
  - **一元运算符**
    - [in](basic-concept/expressions/unary-operators/in.md)
    - [instanceof](basic-concept/expressions/unary-operators/instanceof.md)
    - [delete](basic-concept/expressions/unary-operators/delete.md)
    - [typeof](basic-concept/expressions/unary-operators/typeof.md)
    - [void](basic-concept/expressions/unary-operators/void.md)
    - [字符串运算符](basic-concept/expressions/unary-operators/string-operator.md)
  - [算术运算符](basic-concept/expressions/arithmetic-operators.md)
  - [赋值运算符](basic-concept/expressions/assignment-operators.md)
  - [按位运算符](basic-concept/expressions/bitwise-operators.md)
  - [逗号运算符](basic-concept/expressions/comma-operator.md)
  - [比较运算符](basic-concept/expressions/comparation-operators.md)
  - [条件运算符](basic-concept/expressions/conditional-operator.md)
  - [逻辑运算符](basic-concept/expressions/logical-operators.md)
  - [扩展运算符](basic-concept/expressions/spread-operator.md)
  - [解构赋值](basic-concept/expressions/detructing-assignment.md)
  - [运算符优先级](basic-concept/expressions/operators-precedence.md)
- **语句和声明**
  - [块语句](basic-concept/statements-and-declarations/block.md)
  - [声明和变量语句](basic-concept/statements-and-declarations/declarations-and-the-variable-statement.md)
  - [if 语句](basic-concept/statements-and-declarations/the-if-statement.md)
  - **迭代语句**
    - [do-while 语句](basic-concept/statements-and-declarations/iteration-statement/the-do-while-statement.md)
    - [while 语句](basic-concept/statements-and-declarations/iteration-statement/the-while-statement.md)
    - [for 语句](basic-concept/statements-and-declarations/iteration-statement/the-for-statement.md)
    - [for-in 语句](basic-concept/statements-and-declarations/iteration-statement/the-for-in-statement.md)
    - [for-of 语句](basic-concept/statements-and-declarations/iteration-statement/the-for-of-statement.md)
  - [continue 语句](basic-concept/statements-and-declarations/the-continue-statement.md)
  - [break 语句](basic-concept/statements-and-declarations/the-break-statement.md)
  - [return 语句](basic-concept/statements-and-declarations/the-return-statement.md)
  - [switch 语句](basic-concept/statements-and-declarations/the-switch-statement.md)
  - [label 语句](basic-concept/statements-and-declarations/labelled-statements.md)
  - [throw 语句](basic-concept/statements-and-declarations/the-throw-statement.md)
  - [try-catch 语句](basic-concept/statements-and-declarations/the-try-statement.md)

[⬆ 返回快速目录](#快速目录)

### :mortar_board:标准内置对象 Standard Built-in Objects

- **全局对象**
  - **值属性**
    - [Infinity](standard-built-in-objects/the-global-object/value-properties/infinity.md)
    - [NaN](standard-built-in-objects/the-global-object/value-properties/NaN.md)
    - [undefined](standard-built-in-objects/the-global-object/value-properties/undefined.md)
  - **函数属性**
    - [eval()](standard-built-in-objects/the-global-object/function-properties/eval.md)
    - [isFinite()](standard-built-in-objects/the-global-object/function-properties/isFinite.md)
    - [isNaN()](standard-built-in-objects/the-global-object/function-properties/isNaN.md)
    - [parseFloat()](standard-built-in-objects/the-global-object/function-properties/parseFloat.md)
    - [parseInt()](standard-built-in-objects/the-global-object/function-properties/parseInt.md)
    - [decodeURI()](standard-built-in-objects/the-global-object/function-properties/decodeURI.md)
    - [decodeURIComponent()](standard-built-in-objects/the-global-object/function-properties/decodeURIComponent.md)
    - [encodeURI()](standard-built-in-objects/the-global-object/function-properties/encodeURI.md)
    - [encodeURIComponent()](standard-built-in-objects/the-global-object/function-properties/encodeURIComponent.md)
- **基本对象**
  - [Object](standard-built-in-objects/fundamental-objects/object-objects/object-objects.md)
  - [Function](standard-built-in-objects/fundamental-objects/function-objects/function-objects.md)
  - [Boolean](standard-built-in-objects/fundamental-objects/boolean-objects.md)
  - [Symbol](standard-built-in-objects/fundamental-objects/symbol-objects/symbol-objects.md)
  - [Error](standard-built-in-objects/fundamental-objects/error-objects.md)
- **数字和日期**
  - [Date](standard-built-in-objects/numbers-and-dates/date-objects/date-objects.md)
  - [Math](standard-built-in-objects/numbers-and-dates/math-objects/math-objects.md)
  - [Number](standard-built-in-objects/numbers-and-dates/number-objects/number-objects.md)
- **字符处理**
  - [String](standard-built-in-objects/text-processing/string-objects/string-objects.md)
  - [RegExp](standard-built-in-objects/text-processing/regexp-objects/regexp-objects.md)
- **索引集合**
  - [Array](standard-built-in-objects/indexed-collections/array-objects/array-objects.md)
  - [TypedArrays](standard-built-in-objects/indexed-collections/typed-array-objects/typed-array-objects.md)
- **键值集合**
  - [Map](standard-built-in-objects/keyed-collections/map-objects/map-objects.md)
  - [Set](standard-built-in-objects/keyed-collections/set-objects/set-objects.md)
  - [WeakMap](standard-built-in-objects/keyed-collections/weak-map-objects/weak-map-objects.md)
  - [WeakSet](standard-built-in-objects/keyed-collections/weak-set-objects/weak-set-objects.md)
- **结构化数据**
  - [ArrayBuffer](standard-built-in-objects/structured-data/array-buffer-objects/array-buffer-objects.md)
  - [JSON](standard-built-in-objects/structured-data/the-json-object/the-json-object.md)
- **控制抽象对象**
  - [Iterator](standard-built-in-objects/control-abstraction-objects/iterator-objects/iterator.md)
  - [Promise](standard-built-in-objects/control-abstraction-objects/promise-objects/promise.md)
  - Generator
- **反射**
  - Proxy
  - Reflect
  - Module Namespace

[⬆ 返回快速目录](#快速目录)

### :8ball:核心模块 Core Modules

- **可执行代码和执行上下文**
  - **编译阶段**
    - [编译阶段](core-modules/executable-code-and-execution-contexts/compilation/compilation.md)
    - [词法作用域](core-modules/executable-code-and-execution-contexts/compilation/lexical-scope.md)
    - [函数作用域](core-modules/executable-code-and-execution-contexts/compilation/function-as-scopes.md)
    - [块作用域](core-modules/executable-code-and-execution-contexts/compilation/blocks-as-scopes.md)
    - [声明提升](core-modules/executable-code-and-execution-contexts/compilation/hoisting.md)
    - [闭包](core-modules/executable-code-and-execution-contexts/compilation/closures.md)
  - **执行阶段**
    - [执行上下文栈](core-modules/executable-code-and-execution-contexts/execution/execution-context-stack.md)
    - [变量对象](core-modules/executable-code-and-execution-contexts/execution/variable-object.md)
    - [作用域链](core-modules/executable-code-and-execution-contexts/execution/scope-chain.md)
    - [this](core-modules/executable-code-and-execution-contexts/execution/this.md)
  - **内存管理**
    - [内存模型](core-modules/executable-code-and-execution-contexts/memory-management/memory-model.md)
    - [内存生命周期](core-modules/executable-code-and-execution-contexts/memory-management/memory-life-cycle.md)
    - [垃圾回收](core-modules/executable-code-and-execution-contexts/memory-management/garbage-collection.md)
- **函数**
  - **函数声明**
    - [函数声明式定义](core-modules/ecmascript-function-objects/function-declarations/function-definitions.md)
    - [箭头函数定义](core-modules/ecmascript-function-objects/function-declarations/arrow-function-definitions.md)
    - [异步函数定义](core-modules/ecmascript-function-objects/function-declarations/async-function-definitions.md)
  - **函数参数**
      - [函数参数](core-modules/ecmascript-function-objects/function-arguments/function-parameters.md)
      - [默认参数](core-modules/ecmascript-function-objects/function-arguments/default-parameters.md)
      - [剩余参数](core-modules/ecmascript-function-objects/function-arguments/rest-parameters.md)
  - **函数调用**
      - [方法调用模式](core-modules/ecmascript-function-objects/function-calls/method-invocation-pattern.md)
      - [函数调用模式](core-modules/ecmascript-function-objects/function-calls/function-invocation-pattern.md)
      - [构造器调用模式](core-modules/ecmascript-function-objects/function-calls/constructor-invocation-pattern.md)
      - [间接调用模式](core-modules/ecmascript-function-objects/function-calls/apply-invocation-pattern.md)
  - **函数类型**
      - [构造函数](core-modules/ecmascript-function-objects/function-types/structure-function.md)
      - [类构造函数](core-modules/ecmascript-function-objects/function-types/class-structure-function.md)
      - [惰性函数](core-modules/ecmascript-function-objects/function-types/lazy-function.md)
      - [级联函数](core-modules/ecmascript-function-objects/function-types/cascade-function.md)
      - [回调函数](core-modules/ecmascript-function-objects/function-types/callback-function.md)
      - [高阶函数](core-modules/ecmascript-function-objects/function-types/hight-order-function.md)
      - [函数柯里化](core-modules/ecmascript-function-objects/function-types/function-currying.md)
      - [函数节流](core-modules/ecmascript-function-objects/function-types/throttle.md)
      - [函数防抖](core-modules/ecmascript-function-objects/function-types/debounce.md)
- **模块化**
  - [**模块化**](core-modules/modularization/modularization.md)
  - **ECMScript 6 Module**
    - [import](core-modules/modularization/ecmascript6-module/import.md)
    - [export](core-modules/modularization/ecmascript6-module/export.md)
    - [复合写法](core-modules/modularization/ecmascript6-module/compound.md)
    - [模块的继承](core-modules/modularization/ecmascript6-module/module-inheritance.md)
    - [跨模块常量](core-modules/modularization/ecmascript6-module/cross-module-constant.md)
    - [动态导入](core-modules/modularization/ecmascript6-module/dynamic-import.md)

[⬆ 返回快速目录](#快速目录)

### :construction:面向对象编程 Object Oriented Programming

- [**面向对象编程**](object-oriented-programming/object-oriented-programming.md)
- **理解对象**
  - [对象类型](object-oriented-programming/object-understand/the-object-type.md)
  - [属性操作](object-oriented-programming/object-understand/manipulating-property.md)
  - [对象属性描述符](object-oriented-programming/object-understand/attributes-object.md)]
  - [对象状态](object-oriented-programming/object-understand/the-object-status.md)
- **创建对象**
  - [工厂模式](object-oriented-programming/object-creation/the-factory-pattern.md)
  - [构造函数模式](object-oriented-programming/object-creation/the-constructor-pattern.md)
  - [原型模式](object-oriented-programming/object-creation/the-prototype-pattern.md)
  - [组合使用构造函数模式和原型模式](object-oriented-programming/object-creation/combination-constructor-and-prototype-pattern.md)
  - [动态原型模式](object-oriented-programming/object-creation/dynamic-prototype-pattern.md)
  - [寄生构造函数模式](object-oriented-programming/object-creation/parastic-constructor-pattern.md)
  - [稳妥构造函数模式](object-oriented-programming/object-creation/durable-constructor-pattern.md)
- **继承**
  - [原型链](object-oriented-programming/inheritance/prototype-chain.md)
  - [借用构造函数](object-oriented-programming/inheritance/constructor-stealing.md)
  - [组合继承](object-oriented-programming/inheritance/combination-inheritance.md)
  - [原型式继承](object-oriented-programming/inheritance/prototypal-inheritance.md)
  - [寄生式继承](object-oriented-programming/inheritance/parasitic-inheritance.md)
  - [寄生组合式继承](object-oriented-programming/inheritance/parasitic-combination-inheritance.md)
- **类的定义**
  - [类的基本语法](object-oriented-programming/class-definitions/class-basic.md)
  - [类的继承](object-oriented-programming/class-definitions/class-extends.md)
  - [私有成员](object-oriented-programming/class-definitions/class-private-member.md)
  - [静态成员](object-oriented-programming/class-definitions/class-static-member.md)

[⬆ 返回快速目录](#快速目录)

### :world_map:浏览器对象模型 Browser Oject Model

- [**Window 对象**](browser-object-model/the-window-object/the-window-object.md)
  - **定时器**
    - [setInterval](browser-object-model/the-window-object/timers/setInterval.md)
    - [setTimeout](browser-object-model/the-window-object/timers/setTimeOut.md)
  - **系统对话框**
    - [alert](browser-object-model/the-window-object/system-dialogs/alert.md)
    - [confirm](browser-object-model/the-window-object/system-dialogs/confirm.md)
    - [prompt](browser-object-model/the-window-object/system-dialogs/prompt.md)
  - **视窗尺寸位置**
    - [Window 视图属性](browser-object-model/the-window-object/window-position/window-view-properties.md)
    - [Screen 视图属性](browser-object-model/the-window-object/window-position/screen-view-properties.md)
    - [文档视图和元素视图](browser-object-model/the-window-object/window-position/document-view-and-element-view.md)
    - [元素视图属性](browser-object-model/the-window-object/window-position/element-view-properties.md)
    - [鼠标位置](browser-object-model/the-window-object/window-position/mouse-position.md)
- **Location 对象**
  - [Location 对象的属性](browser-object-model/the-location-object/the-location-object-properties.md)
  - [Location 对象的方法](browser-object-model/the-location-object/the-location-object-methods.md)
- **History 对象**
  - [History 对象的属性](browser-object-model/the-history-object/the-history-object-properties.md)
  - [History 对象的方法](browser-object-model/the-history-object/the-history-object-methods.md)
- **Screen 对象**
  - [Screen 对象的属性](browser-object-model/the-screen-object/the-screen-object-properties.md)
  - [Screen 对象的方法](browser-object-model/the-screen-object/the-screen-object-methods.md)
- **Navigator 对象**
  - [Navigator 对象的属性](browser-object-model/the-navigator-object/the-navigator-object-properties.md)
  - [Navigator 对象的方法](browser-object-model/the-navigator-object/the-navigator-object-methods.md)
- **其他 WebAPI**
  - [File 对象](browser-object-model/the-other-web-api/the-file-object.md)
  - [FileList 对象](browser-object-model/the-other-web-api/the-file-list-object.md)
  - [FileReader 对象](browser-object-model/the-other-web-api/the-file-reader-object.md)
  - [FileReaderSync 对象](browser-object-model/the-other-web-api/the-file-reader-sync-object.md)
  - [FormData 对象](browser-object-model/the-other-web-api/the-form-data-object.md)
  - [ProgressEvent 对象](browser-object-model/the-other-web-api/the-progress-event-object.md)
  - [Blob 对象](browser-object-model/the-other-web-api/the-blob-object.md)
  - [URL 对象](browser-object-model/the-other-web-api/the-url-object.md)
  - [Position 对象](browser-object-model/the-other-web-api/the-position-object.md)
  - [XMLHttpRequest 对象](browser-object-model/the-other-web-api/the-xmlhttprequest-object.md)
  - [FetchAPI](browser-object-model/the-other-web-api/the-fetch-api.md)
  - [EventSource 对象](browser-object-model/the-other-web-api/the-event-source-object.md)
- **浏览器缓存**
  - [浏览器缓存机制](browser-object-model/browser-cache/web-cache.md)
  - [HTTP 缓存](browser-object-model/browser-cache/http-cache.md)
  - [Cookie](browser-object-model/browser-cache/cookie.md)
  - [WebStorage](browser-object-model/browser-cache/web-storage.md)
- **客户端检测**
  - [客户端检测](browser-object-model/client-detection/client-detection.md)
- **浏览器工作原理**
  - [整体工作流程](browser-object-model/browser-working-principle/overall-workflow.md)
  - [渲染引擎](browser-object-model/browser-working-principle/the-rendering-engine.md)
  - [解析过程](browser-object-model/browser-working-principle/parsing.md)
  - [渲染树构建](browser-object-model/browser-working-principle/render-tree-construction.md)
  - [布局](browser-object-model/browser-working-principle/layout.md)
  - [绘制](browser-object-model/browser-working-principle/painting.md)
  - [回流和重绘](browser-object-model/browser-working-principle/reflow-and-repaint.md)
  - [动态变化和渲染引擎的线](browser-object-model/browser-working-principle/dynamic-changes-and-rendering-engine-threads.md)
  - [CSS2 可视模型](browser-object-model/browser-working-principle/css2-visual-module.md)
  - [渲染层合并](browser-object-model/browser-working-principle/composite.md)

[⬆ 返回快速目录](#快速目录)

### :incoming_envelope:文档对象模型 Document Oject Model

- **文档对象模型**
  - [DOM](document-object-model/dom.md)
  - [DOM API](document-object-model/dom-api.md)
- **节点层次**
  - [节点层次](document-object-model/hierarchy-of-nodes/hierarchy-of-nodes.md)
  - [Node 类型](document-object-model/hierarchy-of-nodes/the-node-type.md)
  - [Document 类型](document-object-model/hierarchy-of-nodes/the-document-type.md)
  - [Element 类型](document-object-model/hierarchy-of-nodes/the-element-type.md)
- **节点访问**
  - [节点访问](document-object-model/nodes-access/nodes-access.md)
  - [节点关系](document-object-model/nodes-access/nodes-relationships.md)
  - [元素遍历](document-object-model/nodes-access/element-traversal.md)
  - [动态集合](document-object-model/nodes-access/dynamic-collection.md)
- **节点操作**
  - [节点创建](document-object-model/manipulating-nodes/nodes-create.md)
  - [节点操作](document-object-model/manipulating-nodes/manipulating-nodes/README.md)
- **脚本化 CSS**
  - [查询样式](document-object-model/scripting-css/accessing-element-styles.md)
  - [操作样式](document-object-model/scripting-css/working-with-style-sheets.md)
- **DOM 事件流**
  - [事件流](document-object-model/events/event-flow.md)
  - [事件处理程序](document-object-model/events/event-handlers-or-listener.md)
  - [事件对象](document-object-model/events/the-event-object.md)
  - [事件类型](document-object-model/events/event-types/event-types.md)
    - [用户界面事件](document-object-model/events/event-types/ui-events.md)
    - [鼠标与滚轮事件](document-object-model/events/event-types/the-mouse-and-dom-mouse-scroll-events.md)
    - [键盘与文本事件](document-object-model/events/event-types/the-keyboard-and-text-events.md)
  - [事件委托](document-object-model/events/event-delegation.md)

[⬆ 返回快速目录](#快速目录)

### :keyboard:HTML5 脚本编程 Scripting Programing

- **语义化**
  - [HTML5 表单](html5-scripting-programming/semantics/form-inprovements.md)
  - [HTML5 新语义元素](html5-scripting-programming/semantics/new-semantic-elements.md)
- **离线与存储**
  - [Service Worker](html5-scripting-programming/offline-and-storage/service-worker.md)
  - [IndexedDB](html5-scripting-programming/offline-and-storage/indexedDB.md)
  - [本地文件应用](html5-scripting-programming/offline-and-storage/local-files-application.md)
- **通信**
  - [PostMessage](html5-scripting-programming/connectivity/post-message.md)
  - [Server-sent Events](html5-scripting-programming/connectivity/server-sent-events.md)
  - [WebSocket](html5-scripting-programming/connectivity/web-socket.md)
  - [WebRTC](html5-scripting-programming/connectivity/web-real-time-communication.md)
- **多媒体**
  - [音频](html5-scripting-programming/multimedia/audio.md)
  - [视频](html5-scripting-programming/multimedia/video.md)
- **图形特效**
  - [Canvas](html5-scripting-programming/graphics-and-effects/canvas/README.md)
  - SVG
  - WebGL
- **性能与集成**
  - [WebWorkers](html5-scripting-programming/performance-and-integration/web-workers.md)
  - [动画渲染](html5-scripting-programming/performance-and-integration/request-animation-frame.md)
  - [拖放 API](html5-scripting-programming/performance-and-integration/drag-and-drop-api.md)
  - [全屏 API](html5-scripting-programming/performance-and-integration/full-screen-api.md)
- **设备访问**
  - [地理定位](html5-scripting-programming/device-access/geolocation.md)
  - [触控事件](html5-scripting-programming/device-access/touch-event.md)
  - [摄录设备](html5-scripting-programming/device-access/camera.md)
- **移动开发**
  - [移动 Web 开发](html5-scripting-programming/wireless-development/mobile-web-development.md)
  - [视口](html5-scripting-programming/wireless-development/viewport.md)
  - [适配方案](html5-scripting-programming/wireless-development/adaptation.md)

[⬆ 返回快速目录](#快速目录)

### :globe_with_meridians:计算机网络 Computer Network

- **HTTP 协议**
  - [HTTP 协议](computer-networks/http/http.md)
  - [HTTP 首部字段](computer-networks/http/headers.md)
  - [HTTP 请求方法](computer-networks/http/request-methods.md)
  - [HTTP 响应状态码](computer-networks/http/response-status-codes.md)
  - [HTTP 访问控制](computer-networks/http/access-control.md)
  - [HTTP 身份验证](computer-networks/http/authentication.md)
  - [HTTP2](computer-networks/http/http2.md)
- [DNS 协议](computer-networks/dns.md)
- [HTTPS 协议](computer-networks/https.md)
- TCP 协议
- IP 协议
- **Web 网络安全**
  - [XSS](computer-networks/frontend-security/xss.md)
  - [CSRF](computer-networks/frontend-security/csrf.md)
  - [DDoS](computer-networks/frontend-security/ddos.md)
  - [SQL 注入](computer-networks/frontend-security/sql-injection.md)
  - [流量劫持](computer-networks/frontend-security/hijacking.md)

[⬆ 返回快速目录](#快速目录)

## :pushpin:说明

**关于排版**

项目内容按照 [中文文案排版指北](http://mazhuang.org/wiki/chinese-copywriting-guidelines/) 进行排版，以保证内容的可读性。

**关于参考资料**

- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)：官方推荐的前端文档
- [ecma-international ecma 262 5.1（英）](http://www.ecma-international.org/ecma-262/5.1/index.html)：ECMAScript 5
- [ECMAScript® 2015 Language Specification（ES6 英）](http://www.ecma-international.org/ecma-262/6.0/)：ECMAScript 2015 规范文档
- [ECMAScript® 2016 Language Specification（ES7 英）](http://www.ecma-international.org/ecma-262/7.0/index.html)：ECMAScript 2016 规范文档
- [ECMAScript® 2017 Language Specification（ES8 英）](http://www.ecma-international.org/ecma-262/8.0/index.html)：ECMAScript 2017 规范文档
- [ECMAScript® 2018 Language Specification（ES8 英）](<https://www.ecma-international.org/ecma-262/9.0/index.html>)：ECMAScript 2018 规范文档

### License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/"><img alt="知识共享许可协议" style="border-width:0" src="https://camo.githubusercontent.com/0e75e86523f89adbaa859739fae1d7adc49d2638/68747470733a2f2f692e6372656174697665636f6d6d6f6e732e6f72672f6c2f62792d6e632d73612f332e302f636e2f38387833312e706e67" /></a>

本作品采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/">知识共享署名-非商业性使用-相同方式共享 3.0 中国大陆许可协议</a> 进行许可。