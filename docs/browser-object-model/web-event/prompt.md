---
nav:
  title: BOM
  order: 5
group:
  title: 全局 API
  order: 2
title: prompt
order: 5
---

# prompt()

`window.prompt()` 显示一个对话框，对话框中包含一条文字信息，用来提示用户输入文字。

```js
const res = window.prompt(text, value);
```

- `res` 用来存储用户输入文字的字符串，或者是 `null`;
- `text` 用来提示用户输入文字的字符串，如果没有任何提示内容，该参数可以省略不写；
- `value` 文本输入框中的默认值，该参数也可以省略不写。

该方法的第二个参数是可选的，如果不提供的话，IE 浏览器会在输入框中显示 undefined。因此，最好总是提供第二个参数，作为输入框的默认值。

## 示例

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
