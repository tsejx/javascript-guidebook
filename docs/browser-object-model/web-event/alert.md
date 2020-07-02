---
nav:
  title: BOM
  order: 5
group:
  title: 全局 API
  order: 2
title: alert
order: 3
---

# alert()

显示一个警告对话框，上面显示有指定的文本内容以及一个“确定”按钮。

```js
window.alert(message);
```

`message` 为显示在对话框内的文本字符串，如果传入其它类型的值，会转换成字符串。

- 警告对话框使用在无需用户确认的情况下，否则应该使用其它类型的对话框，比如 confirm 或 prompt；
- 这里显示的对话框是一个模态窗口，它能阻止用户对浏览器窗口界面的其它部位进行操作，你不应该过多地使用这种模态窗口

## 示例

### 基本用法

```js
window.alert('Hello world!');
```

### 换行

`alert()` 方法的参数可以用 `\n` 指定换行

```javascript
alert('本条提示\n分成两行');
```
