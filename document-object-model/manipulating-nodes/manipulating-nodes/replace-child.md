### Node.replaceChild()

`Node.replaceChild()` 方法可将新节点替换当前节点的某个子节点。

### 语法

```js
node.replaceChild(newChild, oldChild)
```

| 参数     | 说明             | 类型 |
| -------- | ---------------- | ---- |
| newChild | 插入的节点对象   | Node |
| oldChild | 被替换的节点对象 | Node |

### 示例

```html
<div>
    <span id='foo'>foo bar</span>
</div>
```

```js
const sp1 = document.createElement('span');

sp1.setAttribute('id', 'newSpan');

const sp1_content = document.createTextNode('新SPAN');

sp1.appendChild(sp1_content);

const sp2 = document.getElementById('foo');
const parentDiv = sp2.parentNode;

parentDiv.replace(sp1, sp2);
```



