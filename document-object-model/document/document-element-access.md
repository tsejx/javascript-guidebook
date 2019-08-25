# 文档元素访问

大多数客户端 JavaScript 程序运行时总是在操作一个或多个文档元素。当这些程序启动时，可以使用 JavaScript 全局变量 `document` 来引用 Document 对象。但是，为了操作文档中的元素，必须通过某种方式获得或选取这些引用文档元素的 Element 对象。DOM 提供了多个 API 以供开发者访问文档树中的元素：

- [document.getElementById](#getelementbyid)
- [document.getElementByName](#getelementbyname)
- [document/element.getElementByTagName](#getelementbytagname)
- [document/element.getElementByClassName](#getelementbyclassname)
- [document/element.querySelector](#queryselector)
- [document/element.querySelectorAll](#queryselectorall)

## API

### getElementById()

`document.getElementById()` 方法通过指定 HTML 元素的 id 属性获取元素引用。

📖 **语法：**

```js
const element = document.getElementById(id);
```

- 参数 `id`：根据元素的 id 属性获取元素引用（大小写敏感）
- 任何 HTML 元素可以有一个 ID 属性，但在文档中该值必须唯一。
- 若浏览器中出现多个 ID 名的情况，CSS 样式对所有该 ID 名的元素都生效，但 Javascript 脚本仅对第一个出现该 ID 名的元素生效。
- `document.getElementById()` 只能在 `document` 对象上调用，它在整个文档中查找给定的 id 属性。

### getElementsByName()

`getElementsByName()` 方法通过指定 HTML 元素 name 属性获取元素引用的集合。

📖 **语法：**

```js
const elements = document.getElementsByName(name);
```

- 参数 `name`：根据元素的 `name` 属性获取元素引用
- 因为一个文档中 name 属性可能不唯一（如 HTML 表单中的单选按钮通常具有相同的 name 属性），所以 `getElementsByName()` 方法返回的是元素的数组，而不是一个元素。
- 在 HTML 元素中，并不是所有元素都有 name 属性，比如 `<div>` 是没有 name 属性的，但是如果强制设置 `<div>` 的 name 属性，它也是可以被查找到的。
- 在 IE 中，如果 id 设置成某个值，然后传入 `getElementsByName()` 的参数值和 id 值一样，则这个元素是会被找到的，所以最好不好设置同样的值给 id 和 name

### getElementsByTagName()

`getElementsByTagName()` 方法通过指定 HTML 元素标签名获取元素引用的集合。

📖 **语法：**

```js
const elementList = document.getElementsByTagName(tagname);
const elementList = rootElement.getElementsByTagName(tagname);
```

- 返回的元素的顺序是它们在文档中的顺序
- 返回的类数组对象有一个 `namedItem()` 方法，可以通过元素的 name 属性取得集合中的第一个值。Safari 和 IE 不支持该方法。
- `getElementsByTagName()` 方法可以用于 document 对象，也可以用于 element 元素对象，用于调用该方法的元素的后代元素。
- 如果要对 `HTMLCollection` 集合进行循环操作，最好将其长度缓存起来，因为每次循环都会去计算长度，暂时缓存起来可以提高效率。
- 如果没有存在指定的标签，该接口返回的不是 `null`，而是一个空的 `HTMLCollection`
- `*` 表示匹配所有标签

### getElementByClassName()

`getElementsByClassName()` 方法通过指定 HTML 子元素的类名获取元素引用的集合。

📖 **语法：**

```js
const elementList = document.getElementByClassName(className);
const elementList = rootElement.getElementByClassName(className);
```

- 参数 `className`：根据元素类名获取元素引用
- 返回值 `elementList`：返回值为匹配类名的元素集合
- IE9 以下浏览器不支持
- 如果要获取 2 个以上 `className`，可传入多个`className`，每个用空格分隔

### querySelector()

`querySelector()` 方法返回文档中匹配指定 CSS 选择器的元素。

📖 **语法：**

```js
const element = document.querySelector(selectors);
const element = rootElement.querySelector(selectors);
```

- 参数 `selectors` 必须是有效的 CSS 选择器字符串；如果不是，则引发 `SYNTAX_ERR` 异常。
- 如果没有找到匹配的元素，返回 `null`。
- 该方法既可用于 document 类型，也可用于元素 element 类型。

🌰 **示例：**

```js
// ID 为 foo 的元素
const foo = document.querySelector('.foo');
// 类名为 bar 的元素
const bar = document.querySelector('.bar');
```

### querySelectorAll()

`querySelectorAll()` 方法返回与指定的选择器组匹配的文档中的元素列表（使用深度优先的先序遍历文档的节点）。

📖 **语法：**

```js
const elementList = document.querySelectorAll(selector);
const elementList = rootElement.querySelectorAll(selector);
```

- 没有匹配元素时，返回空的类数组对象，而不是 `null`

## 总结

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
