## Node.insertBefore()

`Node.insertBefore()` 方法可向指定已有子节点之前插入新的字节点。

### 语法

```js
node.insertBefore(newNode, nextSibling)
```

| 参数        | 说明                                                         | 类型 |
| ----------- | ------------------------------------------------------------ | ---- |
| newNode     | 需要插入的节点对象                                           | Node |
| nextSibling | 可选。在其之前插入新节点的子节点。如果未配置，则会在子节点列表末尾插入新的节点对象。 | Node |

| 返回值类型 | 说明         |
| ---------- | ------------ |
| Node       | 新插入的节点 |

### 示例

```html
<div>
    <span id='p'></span>
</div>
```

```js
const p = document.getElementById('p');
const parentNode = p.parentNode;

const newNode = document.createElement('span');

parentNode.insertBefore(newNode, p);
```

