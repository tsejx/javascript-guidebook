## Canvas 填充规则

当我们用到 `fill`（或者 `clip` 和 `isPointinPath`）你可以选择一个填充规则，该填充规则根据某处在路径的外面或者里面来决定该处是否被填充，这对于自己与自己路径相交或者路径被嵌套的时候是有用的。

可作为参数的值：

- `"nonzero"`：[non-zero winding rule](http://en.wikipedia.org/wiki/Nonzero-rule)（默认值）
- `"evenodd"`：[even-odd winding rule](http://en.wikipedia.org/wiki/Even%E2%80%93odd_rule)

### 示例

```js
function draw() {
    const ctx = document.getElementById("canvas").getContext("2d");
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI*2, true);
    ctx.arc(50, 50, 15, 0, Math.PI*2, true);
    ctx.fill('evenodd');
}
```

![evenodd](../../../../../../Image/07/0c2266e7-9b14-4a9a-bfd3-ba4800900748.png)