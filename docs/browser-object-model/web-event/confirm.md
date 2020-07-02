---
nav:
  title: BOM
  order: 5
group:
  title: 全局 API
  order: 2
title: confirm
order: 4
---

# confirm()

`window.confirm` 方法显示一个具有一个可选消息和两个按钮（确定和取消）的模态对话框。

```js
const res = window.confirm(message);
```

- `message` 是要在对话框中显示的可选字符串
- `res` 是一个布尔值，表示是选择确定还是取消（true 表示 ok）

对话框是弹出式的，直到这个对话框被点击后，后面的脚本才会运行。

## 示例

```js
if (window.confirm('Do you really want to leave?')) {
  window.open('exit.html', 'Thanks for Visiting');
}
```
