---
nav:
  title: DOM
  order: 6
group:
  title: Document
  order: 5
title: Document 方法
order: 3
---

# Document 方法

## 修改文档

### open

打开一个要写入的文档。

这将会有一些连带的影响。例如：

- 此时已注册到文档、文档中的节点或文档的 Window 的所有事件监听器会被清除
- 文档中的所有节点会被清除

```js
document.open();
```

- 当 `document.write()` 在页面加载后调用，会发生自动的 `document.open()` 调用。
- 不要和 `window.open()` 方法混淆。`document.open` 可用于重写当前的文档内容或者追加内容，而 `window.open` 是提供了打开一个新的窗口的方法，当前的网页文档内容给你会被保留。由于 Window 是一个全局对象，直接调用 `open(...)` 和 `window.open(...)` 的效果是一样的。

### write

将一个文本字符串写入一个由 `document.open()` 打开的文档流。

📖 **语法:**

```js
document.write(maskup);
```

参数 `maskup` 为一个包含要写入文档的文本的字符串。

对文档的写入操作主要通过 `document.write()` 方法。该方法主要用在两方面：

- 页面载入过程中用实时脚本创建页面内容
- 用延时脚本创建本窗口或新窗口的内容

> 只有当页面被加载的时候 `document.write()` 函数才会被执行

⚠️ **注意**：

- 因为 `document.write()` 需要向文档流中写入内容，所以，若在一个已关闭（例如，已完成加载）的文档上调用 `document.write()`，就会自动调用 `document.open()`，浙江清空该文档的内容。
- 在由 `deferred` 或 `asynchronous` 属性的 `<script>` 中，`document.write()` 会被忽略，控制台会显示 “A call to `document.write()` from an asynchronously-loaded external script was ignored” 的报错信息

### writeIn

向当前文档写入内容，尾部添加换行符

### close

用于结束对文档的写入操作，这种写入操作一般由 `document.open()` 打开。

```js
// 打开一个文档，以便写入数据
document.open();

// 写入文档内容
document.write();

// 关闭文档
document.close();
```

### hasFocus

表明当前文档或者当前文档内的节点是否获得了焦点，该方法可用来判断当前文档中的活动元素是否获得了焦点。

```js
const focused = document.hasFocus();
```

🌰 **示例：检测页面是否获得焦点**

```js
function checkPageFocus() {
  const info = document.getElementById('message');
  if (document.hasFocus()) {
    info.innerHTML = '该页面获得了焦点';
  } else {
    info.innerHTML = '该页面没有获得焦点';
  }
}
```

### elementFromPoint

通过 `document.elementFromPoint(x, y)` 根据横纵坐标获取目标元素对象，该元素对象必须支持和响应鼠标事件。

获取文档中位于页面指定位置最上层的子元素节点。这个方法可以用于检测元素是否发生重叠或碰撞。

参数：

- `x`：（必填项）定位横坐标偏移量，指 `clientX`
- `y`：（必填项）定位纵坐标偏移量，指 `clientY`

返回值为指定坐标上的元素数组（顺序以时间冒泡为依据）

🌰 **示例：检测元素可见性**

```js
const isElementVisible = function(elem) {
  const win = window, doc = document, height, rects;

  if (!elem || (elem && elem.nodeType !== 1) || !elem.getClientRects || !doc.elementFromPoint || !doc.querySelector || !elem.contains) {
    return false;
  }
  if (elem.offsetWidth === 0 || elem.offsetHeight === 0) {
    return false;
  }
  height = win.innerHeight ? win.innerHeight : doc.documentElement.clientHeight;
  rects.elem.getClientRects();

  const offsetTop = function (r, elem) {
    const x = (r.left + r.right) / 2,
          y = (r.top + r.bottom) / 2,
          elemFromPoint = doc.elementFromPoint(x, y);

    return (elemFromPoint === elem || elem.contains(elemFromPoint));
  }

  for (let i = 0; len = rects.length; i < len; i++) {
    let item = rects[i],
        inViewport = r.top > 0 ? r.top <= height : (r.bottom > 0 && r.bottom <= height);

    if (inViewport && offsetTop(r, elem)) {
      return true;
    }
  }

  return false;
}
```

### adoptNode

将某个节点，从其原来所在的文档移除，插入当前文档，并返回插入后的新节点。

```js
document.adoptNode(externalNode);
```

> 该方法不但可以从 `iframe` 中获取 `adopt` 元素，在同一 document 文档下的不同两个元素中也可以使用，该方法可以实现从左边栏列表中选取某些元素加载到右边栏的功能。

### importNode

从外部文档拷贝指定节点，插入当前文档

```js
document.importNode(externalNode, deep);
```

## 查找节点

大多数客户端 JavaScript 程序运行时总是在操作一个或多个文档元素。当这些程序启动时，可以使用 JavaScript 全局变量 `document` 来引用 Document 对象。但是，为了操作文档中的元素，必须通过某种方式获得或选取这些引用文档元素的 Element 对象。DOM 提供了多个 API 以供开发者访问文档树中的元素：

- 根据 `id` 属性获取单个节点：`getElementById`
- 根据 `name` 属性获取节点列表：`getElementsByNames`
- 根据标签名获取元素列表：`getElementByTagName`
- 根据 `class` 属性获取元素列表：`getElementsByClassName`
- 使用 CSS 选择器匹配第一个符合的元素：`querySelector`
- 使用 CSS 选择器匹配所有符合的元素：`querySelectorAll`

### getElementById

`document.getElementById()` 方法通过指定 HTML 元素的 id 属性获取元素引用。

```html
<div id="app"></div>

<script type="text/javascript">
  const elem = document.getElementById('app');

  console.log(elem);
  // <div id="app"></div>
</script>
```

- 参数 `id`：根据元素的 id 属性获取元素引用（大小写敏感）
- 任何 HTML 元素可以有一个 ID 属性，但在文档中该值必须唯一。
- 若浏览器中出现多个 ID 名的情况，CSS 样式对所有该 ID 名的元素都生效，但 JavaScript 脚本仅对第一个出现该 ID 名的元素生效。
- `document.getElementById()` 只能在 `document` 对象上调用，它在整个文档中查找给定的 id 属性。

### getElementsByName

`getElementsByName()` 方法通过指定 HTML 元素 `name` 属性获取元素引用的集合。

```html
<div>
  <div name="app"></div>
  <div name="app"></div>
</div>

<script type="text/javascript">
  const elemList = document.getElementsByName('app');

  console.log(elemList);
  // NodeList(3) [div, div]
</script>
```

- 参数 `name`：根据元素的 `name` 属性获取元素引用
- 因为一个文档中 name 属性可能不唯一（如 HTML 表单中的单选按钮通常具有相同的 name 属性），所以 `getElementsByName()` 方法返回的是 **元素的数组**（[NodeList](../node/node-list)），而不是一个元素。
- 在 HTML 元素中，并不是所有元素都有 `name` 属性，比如 `<div>` 是没有 `name` 属性的，但是如果强制设置 `<div>` 的 `name` 属性，它也是可以被查找到的。
- 在 IE 中，如果 `id` 设置成某个值，然后传入 `getElementsByName()` 的参数值和 `id` 值一样，则这个元素是会被找到的，所以最好不好设置同样的值给 `id` 和 `name`

### getElementsByTagName

`getElementsByTagName()` 方法通过指定 HTML 元素标签名获取元素引用的集合。

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>

<script type="text/javascript">
  const elemList = document.getElementsByTagName('li');

  console.log(elemList);
  // HTMLCollection(3) [li, li, li]
</script>
```

- 返回的元素的顺序是它们在文档中的顺序
- 返回的类数组对象有一个 `namedItem()` 方法，可以通过元素的 `name` 属性取得集合中的第一个值。Safari 和 IE 不支持该方法
- `getElementsByTagName()` 方法可以用于 Document 对象，也可以用于 Element 元素对象，用于调用该方法的元素的 **后代元素**
- 如果要对 `HTMLCollection` 集合进行循环操作，最好将其长度缓存起来，因为每次循环都会去计算长度，暂时缓存起来可以提高效率
- 如果没有存在指定的标签，该接口返回的不是 `null`，而是一个空的 `HTMLCollection`

**匹配所有标签**

使用通配符 `*`。

```js
const all = document.getElementsByTagName('*');
```

### getElementByClassName

`getElementsByClassName()` 方法通过指定 HTML 子元素的类名获取元素引用的集合。

```html
<div class="app"></div>

<script type="text/javascript">
  const elemList = document.getElementByClassName('app');

  console.log(elemList);
  // HTMLCollection(1) [div.app]
</script>
```

- 参数 `className`：根据元素类名获取元素引用
- 返回值 `elementList`：返回值为匹配类名的元素集合
- IE9 以下浏览器不支持
- 如果要获取 2 个以上 `className`，可传入多个`className`，每个用空格分隔

### querySelector

`querySelector()` 方法返回文档中匹配指定 CSS 选择器的第一个元素。

```html
<div>
  <div id="foo"></div>
  <div class="bar"></div>
</div>

<script type="text/javascript">
  const foo = document.querySelector('#foo');
  console.log(foo);
  // <div id="foo"></div>

  const bar = document.querySelector('.bar');
  console.log(bar);
  // <div class="bar"></div>

  const div = document.querySelector('div');
  // <div>
  //   <div id="foo"></div>
  //   <div class="bar"></div>
  // </div>
</script>
```

- 参数 `selectors` 必须是有效的 CSS 选择器字符串；如果不是，则引发 `SYNTAX_ERR` 异常。
- 如果没有找到匹配的元素，返回 `null`。
- 该方法既可用于 Document 类型，也可用于元素 Element 类型。

🌰 **示例：**

```js
// ID 为 foo 的元素
const foo = document.querySelector('.foo');
// 类名为 bar 的元素
const bar = document.querySelector('.bar');
```

### querySelectorAll

`querySelectorAll()` 方法返回与指定的选择器组匹配的文档中的元素列表（使用 **深度优先** 的先序遍历文档的节点）。

```html
<div>
  <div class="app"></div>
  <div class="app"></div>
</div>

<script type="text/javascript">
  const elemList = document.querySelectorAll('.app');

  console.log(elemList);
  // NodeList(2) [div.app, div.app]
</script>
```

- 没有匹配元素时，返回空的类数组对象，而不是 `null`

## 创建节点

- 创建元素节点：`document.createElement`
- 创建属性节点：`document.createAttribute`
- 设置属性节点到元素节点：`document.setAttribute`
- 创建文本节点：`document.createTextNode`
- 创建注释节点：`document.createComment`
- 创建空白文档片段：`document.createDocumentFragment`

### createElement

通过 `document.createElement` 创建由 tagName 指定的 HTML 元素，或一个 HTMLUnkownElement。

```js
document.createElement(tagName [, options])
```

当执行此方法后，该元素并未显示在 HTML 文档中，需要将该元素添加到 DOM 树中：

- 找到一个作为父元素的元素
- 使用 `appendChild()` 方法，并将您想要的元素添加到指定的元素中

🌰 **示例：**

```html
<body>
  <h1 id="theTitle" class="hightlight summer">What's happening?</h1>
</body>
```

```js
let newElement = document.createElement('p');

newElement.textContent = '新创建的p元素';

document.body.appendChild(newElement);
```

### createAttribute

创建新的属性节点，这种创建方式下 DOM 不限制节点能够添加的属性种类。

```js
document.createAttribute(name);
```

参数 `name` 是属性的属性名

🌰 **示例：**

```js
const node = document.getElementById('node');
const att = document.createAttribute('name');

att.value = 'newValue';

node.setAttribute(att);
console.log(node.getAttribute('name'));
// newValue
```

### createDocumentFragment

创建一个新的空白的文档片段 DocumentFragments。

DocumentFragments 是 DOM 节点。它们不是主 DOM 树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到 DOM 树。在 DOM 树中，文档片段被其所有的子元素所代替。

因为文档片段存在于内存中，并不在 DOM 树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

🌰 **示例：**

```html
<ul id="list"></ul>

<script type="text/javascript">
  const list = document.getElementById('ul');
  const fragment = document.createDocumentFragment();
  const browsers = ['Firefox', 'Chrome', 'Opera', 'Safari', 'Internet Explorer'];

  browsers.forEach(function (browser) {
    const li = document.createElement('li');
    li.textContent = browser;
    fragment.appendChild(li);
  });

  list.appendChild(fragment);
</script>
```

## 文档对象方法总结

在 DOM 中获取元素（或节点）的五种常用的方法：

|             方法              |     参数     | 是否调用一个元素 | 是否动态 |
| :---------------------------: | :----------: | :--------------: | :------: |
|    document.getElementById    |      id      |                  |          |
|   document.getElementByName   |     name     |                  |    ✔     |
|  document.getElmentByTagName  |  tag 或 \*   |        ✔         |    ✔     |
| document.getElmentByClassName |  className   |        ✔         |    ✔     |
|    document.querySelector     | CSS Selector |        ✔         |          |
|   document.querySelectorAll   | CSS Selector |        ✔         |          |

除 `getElementById` 和 `getElementByName`，其它方法均可以在指定元素上搜索指定的选择器。

除此之外：

- `elem.matches(css)` 用于检查 `elem` 是否匹配指定的 CSS 选择器
- `elem.closet(css)` 用于查找匹配给定的 CSS 选择器的最近的组件级
- `elemA.contains(elemB)` 表示的是如果 `elemB` 是否包含 `elemA`，如果包含就返回 `true`

---

**参考资料：**

- [Selectors API Level1](https://www.w3.org/TR/selectors-api/)
- [DOM 系列：getElement* 和 querySelector*](https://www.w3cplus.com/javascript/searching-elements-dom.html)
