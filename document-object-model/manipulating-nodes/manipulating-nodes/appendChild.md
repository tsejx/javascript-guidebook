## Node.appendChild()

`Node.appendChild()` 方法可向节点的字节点列表的末尾添加新的子节点。

### 语法

```js
node.appendChild(node)
```

| 参数 | 说明       | 类型      |
| ---- | ---------- | --------- |
| node | 新增的节点 | Node 对象 |

| 返回值类型 | 说明       |
| ---------- | ---------- |
| Node 对象  | 新增的节点 |

### 示例

创建一个新的 p 元素，然后添加到 body 尾部。

```js
const p = document.createElement('p');
body.appendChild(p);
```

### 附注

- 如果被插入的节点已经存在于当前文档的文档树中，则那个节点会首先从原先的位置移除，然后再插入到新的位置
- 如果你需要保留这个子节点在原先位置的显示，则你需要先用 [`Node.cloneNode`](cloneChild().md) 方法复制出一个节点的副本，然后在插入到新位置
- 这个方法只能将某个子节点插入到同一个文档的其他位置,如果你想跨文档插入,你需要先调用 `document.importNode` 方法

