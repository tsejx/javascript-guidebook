const coreModules = [
    {
        title: '编译阶段',
        link: 'executable-code-and-execution-contexts/compilation',
        children: [
            { title: '编译阶段', link: 'compilation' },
            { title: '词法作用域', link: 'lexical-scope' },
            { title: '函数作用域', link: 'function-as-scopes' },
            { title: '块作用域', link: 'blocks-as-scopes' },
            { title: '声明提升', link: 'hoisting' },
            { title: '闭包', link: 'closures' },
        ]
    },{
        title: '执行阶段',
        link: 'executable-code-and-execution-contexts/execution',
        children: [
            { title: '执行上下文栈', link: 'execution-context-stack' },
            { title: '变量对象', link: 'variable-object' },
            { title: '作用域链', link: 'scope-chain' },
            { title: 'this', link: 'this' }
        ]
    }, {
        title: '内存管理',
        link: 'executable-code-and-execution-contexts/memory-management',
        children: [
            { title: '内存模型', link: 'memory-model'},
            { title: '内存生命周期', link: 'memory-life-cycle'},
            { title: '垃圾回收机制', link: 'garbage-collection'}
        ]
    }, {
        title: '并发模型',
        link: 'executable-code-and-execution-contexts/concurrency-model',
        children: [
            { title: '并发模型', link: 'concurrency-model' },
            { title: '事件循环', link: 'event-loop'},
            { title: '定时器运行机制', link: 'timers-mechanism'}
        ]
    },{
        title: '函数声明',
        link: 'ecmascript-function-objects/function-declarations',
        children: [
            { title: '函数声明式定义', link: 'function-definitions' },
            { title: '箭头函数定义', link: 'arrow-function-definitions' },
            { title: '异步函数定义', link: 'async-function-definitions'}
        ]
    }, {
        title: '函数参数',
        link: 'ecmascript-function-objects/function-arguments',
        children: [
            { title: '函数参数', link: 'function-parameters' },
            { title: '默认参数', link: 'default-parameters' },
            { title: '剩余参数', link: 'rest-parameters' },
        ]
    }, {
        title: '函数调用',
        link: 'ecmascript-function-objects/function-calls',
        children: [
            { title: '方法调用模式', link: 'method-invocation-pattern' },
            { title: '函数调用模式', link: 'function-invocation-pattern' },
            { title: '构造器调用模式', link: 'constructor-invocation-pattern' },
            { title: '间接调用模式', link: 'apply-invocation-pattern' },
        ]
    }, {
        title: '函数类型',
        link: 'ecmascript-function-objects/function-types',
        children: [
            { title: '构造函数', link: 'structure-function' },
            { title: '类构造函数', link: 'class-structure-function' },
            { title: '惰性函数', link: 'lazy-function' },
            { title: '级联函数', link: 'cascade-function' },
            { title: '回调函数', link: 'callback-function' },
            { title: '高阶函数', link: 'hight-order-function' },
            { title: '函数柯里化', link: 'function-currying' },
            { title: '函数节流', link: 'throttle' },
            { title: '函数防抖', link: 'debounce' },
        ]
    }, {
        title: '模块化',
        link: 'modularization',
        children: [
            { title: '模块化', link: 'modularization' },
            { title: 'import', link: 'ecmascript6-module/import' },
            { title: 'export', link: 'ecmascript6-module/export' },
            { title: '复合写法', link: 'ecmascript6-module/compound' },
            { title: '模块的继承', link: 'ecmascript6-module/module-inheritance' },
            { title: '跨模块常量', link: 'ecmascript6-module/cross-module-constant' },
            { title: '动态导入', link: 'ecmascript6-module/dynamic-import' }
        ]
    }
]

module.exports = { coreModules }