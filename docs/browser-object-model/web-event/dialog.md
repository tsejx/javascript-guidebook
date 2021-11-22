---
nav:
  title: BOM
  order: 5
group:
  title: 全局 API
  order: 2
title: 对话框 API
order: 3
---

# 对话框 API

## alert

显示一个警告对话框，上面显示有指定的文本内容以及一个“确定”按钮。

```js
window.alert(message);
```

`message` 为显示在对话框内的文本字符串，如果传入其它类型的值，会转换成字符串。

- 警告对话框使用在无需用户确认的情况下，否则应该使用其它类型的对话框，比如 confirm 或 prompt；
- 这里显示的对话框是一个模态窗口，它能阻止用户对浏览器窗口界面的其它部位进行操作，你不应该过多地使用这种模态窗口

### 示例

#### 基本用法

```js
window.alert('Hello world!');
```

#### 换行

`alert()` 方法的参数可以用 `\n` 指定换行

```js
alert('本条提示\n分成两行');
```

## confirm

`window.confirm` 方法显示一个具有一个可选消息和两个按钮（确定和取消）的模态对话框。

```js
const res = window.confirm(message);
```

- `message` 是要在对话框中显示的可选字符串
- `res` 是一个布尔值，表示是选择确定还是取消（true 表示 ok）

对话框是弹出式的，直到这个对话框被点击后，后面的脚本才会运行。

### 示例

```js
if (window.confirm('Do you really want to leave?')) {
  window.open('exit.html', 'Thanks for Visiting');
}
```

## prompt

`window.prompt()` 显示一个对话框，对话框中包含一条文字信息，用来提示用户输入文字。

```js
const res = window.prompt(text, value);
```

- `res` 用来存储用户输入文字的字符串，或者是 `null`;
- `text` 用来提示用户输入文字的字符串，如果没有任何提示内容，该参数可以省略不写；
- `value` 文本输入框中的默认值，该参数也可以省略不写。

该方法的第二个参数是可选的，如果不提供的话，IE 浏览器会在输入框中显示 undefined。因此，最好总是提供第二个参数，作为输入框的默认值。

### 示例

```html
<html>
  <head>
    <script type="text/javascript">
      function disp_prompt() {
        var name = prompt('Please enter your name', '');
        if (name != null && name != '') {
          document.write('Hello ' + name + '!');
        }
      }
    </script>
  </head>
  <body>
    <input type="button" onclick="disp_prompt()" value="Display a prompt box" />
  </body>
</html>
```
