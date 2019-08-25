# 文档节点创建

- 创建元素节点：`document.createElement()`
- 创建属性节点：`document.createAttribute()`
- 设置属性节点到元素节点：`document.setAttribute()`
- 创建文本节点：`document.createTextNode()`
- 创建注释节点：`document.createComment()`
- 创建空白文档片段：`document.createDocumentFragment()`

## document.createElement

该方法创建由 tagName 指定的 HTML 元素，或一个 HTMLUnkownElement。

📖 **语法：**

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

## document.createAttribute

创建新的属性节点，这种创建方式下 DOM 不限制节点能够添加的属性种类。

📖 **语法：**

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

## document.createDocumentFragment

创建一个新的空白的文档片段 DocumentFragments。

DocumentFragments 是 DOM 节点。它们不是主 DOM 树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到 DOM 树。在 DOM 树中，文档片段被其所有的子元素所代替。

因为文档片段存在于内存中，并不在 DOM 树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

🌰 **示例：**

```html
<ul id="list"></ul>
```

```js
const list = document.getElementById('ul');
const fragment = document.createDocumentFragment();
const browsers = ['Firefox', 'Chrome', 'Opera', 'Safari', 'Internet Explorer'];

browsers.forEach(function(browser) {
  const li = document.createElement('li');
  li.textContent = browser;
  fragment.appendChild(li);
});

list.appendChild(fragment);
```
