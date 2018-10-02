## Node.removeChild()

`Node.removeChild()` 方法可移除指定节点的某个子节点。

### 语法

```js
node.removeChild(node)
```

| 参数 | 说明           | 类型 |
| ---- | -------------- | ---- |
| node | 删除的节点对象 | Node |

| 返回值类型 | 说明             |
| ---------- | ---------------- |
| Node       | 被删除的节点对象 |

### 示例

```html
<div id='top' align='center'>
    <div id='nested'></div>
</div>
```

```js
const d = document.getElementById('top');
const d_nested = document.getElementById('nested');
const throwawayNode = d.removeChild(d_nested);
```

### 附注

- 被移除的这个子节点仍然存在于内存中，只是没有添加到当前文档的 DOM 树中，因此，你还可以把这个节点重新添加回文档中，当然，实现要用另一个变量存储。
- 如果上例中的 `child` 节点不是 `node` 节点的子节点，则该方法会抛出异常。