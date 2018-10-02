## 节点创建

- 创建元素节点：`document.createElement()`
- 创建属性节点：`document.createAttribute()`
- 设置属性节点到元素节点：`document.setAttribute()`
- 创建文本节点：`document.createTextNode()`
- 创建注释节点：`document.createComment()`

### createElement()

`document.createElement()` 方法通过指定名称以创建一个元素。

```js
document.createElement(tagName [, options])
```

| 参数    | 说明           | 类型   |
| ------- | -------------- | ------ |
| tagName | 创建元素的类型 | string |

当执行此方法后，该元素并未显示在 HTML 文档中，需要将该元素添加到 DOM 树中：

- 找到一个作为父元素的元素
- 使用 `appendChild()` 方法，并将您想要的元素添加到指定的元素中

#### 示例

```html
<body>
    <h1 id='theTitle' class='hightlight summer'>What's happening?</h1>
</body>
```

```js
let newElement = document.createElement('p');

newElement.textContent = '新创建的p元素';

document.body.appendChild(newElement);
```
