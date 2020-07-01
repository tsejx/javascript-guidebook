---
nav:
  title: BOM
  order: 5
group:
  title: 二进制数据和文件 API
  order: 10
title: FormData API
order: 10
---

# FormData API

XMLHttpRequest Level 2 添加了一个新的接口 FormData。利用 FormData 对象，我们可以通过 JavaScript 用一些键值对来模拟一系列表单控件，我们还可以使用 XMLHttpRequest 的 `send()` 方法来异步的提交这个"表单"。比起普通的 AJAX，使用 FormData 的最大优点就是我们可以异步上传一个二进制文件。

## 构造函数

```js
const formData = new FormData( form ? :HTMLFormElement );
```

### 参数

| 参数 | 说明                                                                   |
| ---- | ---------------------------------------------------------------------- |
| form | （可选）一个 HTML 表单元素，可以包含任何形式的表单控件，包括文件输入框 |

## 方法

### append()

调用 `apeend()` 方法给当前 FormData 实例对象添加一个键值对数据。

```js
void append(DOMString name, Blob value, optional DOMString filename);
void append(DOMString name, DOMString value);
```

#### 参数

| 参数     | 说明                                                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name     | 字段名称。                                                                                                                                                   |
| value    | 字段值。                                                                                                                                                     |
| filename | （可选），指定文件的文件名，当 value 参数被指定为一个 Blob 对象或者一个 File 对象时，该文件名会被发送到服务器上，对于 Blob 对象来说，这个值默认为 `"blob"`。 |

#### 示例

使用已有的表单来初始化一个对象实例。假如现在页面已经有一个表单。

```html
<form id="myForm" action="" method="post">
  <input type="text" name="name" />名字 <input type="password" name="psw" />密码
  <input type="submit" value="提交" />
</form>
```

我们可以使用这个表单元素作为初始化参数，来实例化一个 FormData 对象。

```js
// 获取页面已有的一个form表单
const form = document.getElementById('myform');
// 用表单来初始化
const formData = new FormData(form);
// 我们可以根据name来访问表单中的字段
const name = formData.get('name'); // 获取名字
const psw = formData.get('psw'); // 获取密码
// 当然也可以在此基础上，添加其他数据
formData.append('token', 'kshdfiwi3rh');
```
