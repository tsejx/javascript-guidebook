# JavaScript Guidebook

## :spiral_notepad:项目目录

### 基本语法

> 基础语法

### 内置对象

> 内置对象

### 函数

- 【定义函数】
    - 函数的声明
    - 作为值的函数
    - 函数的内部属性
    - 函数属性与方法
    - 函数返回值
    - 异常
    - 方法函数定义
        - getter
        - setter
        - 方法定义语法
- 【调用函数】
    - 方法调用模式
    - 函数调用模式
    - 构造器调用模式
    - Apply调用模式
- 【函数作用域】
    - 函数中的作用域
    - 隐藏内部实现
    - 函数作用域
- 【作用域和函数堆栈】
    - 递归
    - 嵌套函数
    - 匿名函数
    - 作用域链
    - 保存变量
    - 命名冲突
- 【闭包】
    - 词法作用域
    - 块级作用域
    - 执行上下文
        - 文法环境
        - 变量环境
        - this绑定
    - 闭包的特点
    - 闭包的写法
    - 闭包的用途
- 【函数参数】
    - 默认参数
    - 剩余参数
- 【箭头函数】
- 【高级函数】
    - 安全的类型检测
    - 作用域安全的构造函数
    - 惰性函数
    - 级联函数
    - 高阶函数
    - 函数绑定
    - 函数柯里化
    - 回调函数
    - 模块函数
    - 类构造函数
    - 自更新函数


### 面向对象编程

 - 【理解对象】
     - 属性类型
     - 定义多个属性
     - 读取属性的特性
 - 【封装】封装：把客观事物封装成抽象的类，隐藏属性和方法的实现细节，仅对外公开接口。
    - 工厂模式
    - 构造函数模式
    - 原型模式
    - 组合使用构造函数模式和原型模式
    - 动态原型模式
    - 寄生构造函数模式
    - 稳妥构造函数模式
 - 【继承】
     - 原型链
     - 借用构造函数
     - 组合继承
     - 原型式继承
     - 寄生式继承
     - 寄生组合式继承
     - 多继承
 - 【多态】一个对象调用其他对象的方法，call和apply 继承和重载都是多态的表现形式
 - 【抽象】

### 浏览器对象模型BOM

 - 【Window对象】
   - 定时器
       - setInterval
       - setTimeout
   - 系统对话框
      - alert
      - confirm
      - prompt
      - print
   - 窗口操作（窗口设置参数）
      - open
      - close
      - focus
      - blur
   - 工作区尺寸
      - 可视区尺寸
      - 实际网页尺寸
      - 包含滚动条尺寸
      - 滚动距离
    - 样式计算
      - getComputedStyle
    - 数据编码
      - atob
 - 【Location对象】
     - Location对象属性
     - Location对象方法
 - 【History对象】
     - History对象属性
     - History对象方法
 - 【Screen对象】
     - 屏幕分辨率尺寸
     - 可用尺寸
 - 【Navigator对象】
    - 浏览器信息 
 - 【Cookie】
 - 【客户端检测】
     - 能力检测
     - 怪癖检测
     - 用户代理检测

### 文档对象模型DOM

 - 【节点层次】
 - 【Node】
     - 节点关系
         - parentNode
         - parentElement
         - childNodes
         - ParentNode
             - children
             - firstElementChild
             - lastElementChild
         - NonDocumentTypeChildNode
             - previousElementSibiling
             - nextElementSibiling
     - 节点操作
         - appendChild
         - insertBefore
         - removeChild
         - replaceChild
         - cloneChild
 - 【Document】
     - 节点创建
         - createElement
     - 节点访问
         - getElementById
         - getElementByClassName
         - getElementByTagName
         - getElementsByName
         - querySelector
         - querySelectorAll
 - 【Element】
     - 节点操作
     - 节点内容
     - 样式设置
 - 【脚本化CSS】
     - 样式查询
     - 样式设置
 - 【DOM事件流】
     - 事件流
     - 事件处理程序
     - 事件对象
     - 【事件类型】
       - UI（用户界面）事件
       - 焦点事件
       - 鼠标与滚轮事件
       - 键盘与文本事件
       - 复合事件
       - 变动事件
       - HTML5事件
       - 设备事件
       - 触摸与手势事件
     - 事件内存和性能
     - 事件模拟
 - 【表单脚本】

### HTML5脚本编程

  - 语义
    - HTML5表单
    - HTML5新语义元素
  - 性能集成
    - WebWorkers 
    - 拖放API
    - 动画渲染
    - 全屏API
    - 焦点API
  - 应用与本地存储
    - 本地文件应用
    - 本地存储
      - Cookie
      - Storage
      - IndexedDB
  - 服务器通信
    - WebSockets
    - Server-sentEvents
    - WebRTC
  - 设备访问
    - 地理定位
    - 触控事件
    - 摄录设备

### Web图形开发

 - 2D图像
   - Canvas
   - SVG
 - 3D图像
   - WebGL
 - 视频
   - HTML5音视频
   - WebRTC

### 服务器端数据传输

  - JSON
  - HTTP
  - ajax
  - fetch

## :pushpin:说明

**关于排版**

指南内容按照 [中文文案排版指北](http://mazhuang.org/wiki/chinese-copywriting-guidelines/) 进行排版，以保证内容的可读性。

**关于参考资料**

[MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)：官方推荐的前端文档

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/3.0/cn/88x31.png" /></a>

本作品采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/">知识共享署名-非商业性使用-相同方式共享 3.0 中国大陆许可协议</a> 进行许可。