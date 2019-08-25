# 文档属性

这里罗列主要的文档信息 API

## document.doctype

获取文档关联的文档类型定义。

返回的对象实现了 DocumentType 接口，使用 `DOMImplementation.createDocumentType()` 方法可以创建一个 DocumentType 类型的对象。

```js
const doc = document.doctype;

console.log(doc.name);
// html
```

## document.documentElement

获取当前文档的直接子节点。对于 HTML 文档，HTMLHtmlElement 对象一般代表该文档的 `<html>` 元素。

```js
const rootElement = document.documentElement;
const firstTier = rootElement.childNodes;

// firstTier 是由根元素的所有子节点组成的一个 NodeList
for (let i = 0; i < firstTier.length; i++) {
  // 使用根节点的每个子节点
  // 如 firstTier[i]
}
```

使用这个只读属性能很方便的获取到任意文档的根元素。

## document.body

获取当前文档中的 `<body>` 元素或者 `<frameset>` 元素。

```js
const body = document.body;

console.log(body.nodeName);
// 'BODY'
```

## document.head

获取当前文档中的 `<head>` 元素。如果有多个 `<head>` 元素，则返回第一个。

```js
const head = document.head;

console.log(head.nodeName);
// 'HEAD'
```

## document.activeElement

`document.activeElment` 指向当前页面获得焦点的元素。

文档加载完成后：`document.activeElement` 指向 `document.body`

文档加载期间：`document.activeElement` 指向 `null`

使用该属性可以巧妙地判断文档是否加载完成。

> 可以通過 `document.hasFocus()` 方法来查看当前元素是否获取焦点

## document.links

获取当前文档的所有 `<a>` 元素

🌰 **示例：**

```js
// 返回文档的链接数
document.links.length;

// 返回文档第一个链接
document.links[0];
```

## document.documentURI

获取当前文档的网址

HTML 文档有一个 `document.URL` 属性返回同样的值，但是不像 URL，`document.documentURI` 适用于所有类型的文档。

```js
console.log(document.documentURI);
// "https://www.google.com/"
```

## document.URL

获取当前文档的网址

该属性的值和 DOM Level 0 中的 `document.location.href` 属性的值是相等的，然而 `document.location.href` 是可写的，`document.URL` 是只读的。

## document.domain

获取/设置当前文档的原始域名，用于同源策略。

如果当前文档的域无法识别，那么 domain 属性会返回 `null`。

```js
console.log(document.domain);
// "www.google.com"
```

## document.location

获取 location 对象，提供当前文档的 URL 信息

```js
console.log(document.location);
// {
//   href: "https://www.google.com/",
//   ancestorOrigins: undefined,
//   origin: "https://www.google.com",
//   protocol: "https:",
//   host: "www.google.com",
//   hostname: "www.google.com",
//   pathname: "/",
//   Symbol(Symbol.toPrimitive): undefined,
// }
```

## document.referrer

获取当前文档的访问来源

如果用户直接打开了这个页面，而不是页面跳转，或通过地址栏或书签等打开的，则该属性为空字符串。由于该属性只是返回一个字符串，所以不能够通过该属性引用页面的 DOM。

```js
console.log(document.URL);
// "https://google.com/search?xxxxxxxx"

console.log(document.referrer);
// "https://www.google.com/"
```

## document.title

获取当前文档的标题

```js
// 设置文档标题
document.title = 'Hello world!';
```

## document.characterSet

获取渲染当前文档的字符集

```js
console.log(document.characterSet);
// "UTF-8"
```

## document.readyState

描述文档的加载状态，当该状态属性值发生变化时，会在 document 对象上触发 `readystatechange` 事件。

取值：

- loading / 正在加载：文档仍在加载
- interactive / 可交互：文档已被解析，**正在加载**状态结束，但是诸如图像、样式表和框架之类的子资源仍在加载
- complete / 完成：文档和所有子资源已完成加载，表示 `load` 状态的事件即将被触发

🌰 **示例：**

根据不同的加载状态处理不同逻辑

```js
switch (document.readyState) {
  case 'loading':
    // 表示文档还在加载中，即处于“正在加载”状态
    break;
  case 'interactive':
    // 文档已经结束了“正在加载”状态，DOM元素可以被访问
    // 但是图像、样式表和框架等资源依然还在加载
    const span = document.createElement('span');
    span.textContent = 'A <span> element';
    document.body.appendChild(span);
    break;
  case 'complete':
    // 页面所有内容都已被完全加载
    const cssRule = document.styleSheets[0].cssRules[0].cssText;
    console.log(`The first CSS rule is：${cssRule}`);
    break;
}
```

模拟 DOMContentLoaded / jQuery ready

```js
document.onreadystatechange = function() {
  if (document.readyState === 'interactive') {
    initApplication();
  }
};
```

模拟 load 事件

```js
document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    initApplication();
  }
};
```

## document.designMode

控制当前文档是否可编辑。有效值为 `"on"` 和 `"off"`。

```js
documnet.designMode = 'on' || 'off';

// 使一个 <iframe> 文档可编辑
iframeNode.contentDocument.designMode = 'on';
```

## document.cookie

获取 Cookie

每个 Cookie 都是一个名/值对，如果要一次存储多个名/值对，可以使用分号加空格（`;`）隔开。

```js
// 设置 cookie
document.cookie = 'uid=123';
document.cookie = 'username=ben';

// 获取 cookie
console.log(document.cookie);
// "uid=123;username=ben"
```

## 其他

```js
// 获取当前文档的所有表单元素
document.formas;

// 获取当前文档的所有图片元素
document.images;

// 获取当前文档中所有嵌入对象
document.embeds;

// 获取当前文档的所有脚本
document.scripts;

// 获取当前文档的所有样式表
document.styleSheets;

// 获取当前文档最后修改的时间戳
document.lastModified;
```
