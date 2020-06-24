---
nav:
  title: HTML5
  order: 7
group:
  title: 离线与存储
  order: 3
title: 本地文件应用
order: 3
---

# 本地文件应用

历史上，JavaScript 无法处理二进制数据。如果一定要处理的话，只能使用 `charCodeAt()` 方法，一个个字节地从文字编码转成二进制数据，还有一种办法是将二进制数据转成 Base64 编码，再进行处理。这两种方法不仅速度慢，而且容易出错。ECMAScript 5 引入了 Blob 对象，允许直接操作二进制数据。

[Blob 对象](../../browser-object-model/the-other-web-api/the-blob-object.md)是一个代表二进制数据的基本对象，在它的基础上，又衍生出一系列相关的API，用来操作文件。

- [File 对象](../../browser-object-model/the-other-web-api/the-file-object.md)：负责处理那些以文件形式存在的二进制数据，也就是操作本地文件；
- [FileList 对象](../../browser-object-model/the-other-web-api/the-file-list-object.md)：File 对象的网页表单接口；
- [FileReader 对象](../../browser-object-model/the-other-web-api/the-file-reader-object.md)：负责将二进制数据读入内存内容；
- [URL 对象](../../browser-object-model/the-other-web-api/the-url-object.md)：用于对二进制数据生成 URL；
- [FormData 对象](../../browser-object-model/the-other-web-api/the-form-data-object.md)：读取页面表单项文件数据

## 访问选择的文件

```html
<input id="input" type="file"></input>
```

File API 使访问包含 File 对象的 FileList 成为可能，FileList 代表被用户选择的文件列表。

如果用户只选择了一个文件，那么只需要考虑 FileList 中的第一个 File对象。

使用传统的 DOM 选择器访问一个被选择的文件。

```js
const selectedFile = document.getElementById('input').files[0]
```

可以通过监听表单输入框的 `change` 事件访问 FileList。

```js
const input.getElementById('input');
input.addEventListener('change', function(e){
    handleFiles(input.files)
}, 300)
```

如果你想让用户选择多个文件，只需在 `input` 元素上使用 `multiple` 属性

```html
<input type="file" id="input" multiple></input>
```

## 本地文件应用实例

```js
const input = document.querySelect('input[type=file]')
const handleFiles = function(e) => {
    console.log(input.files)
    const reader = new FileReader()
    reader.onload = function(){
        const img = new Image()
        img.onload = function(){
            const canvas = document.cteateElement('canvas')
            const context = canvas.getContext('2d')
            context.drawImage(img, 0, 0)

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data
            for(var i = 0;i <= data.length; i+=4){
                const avg = (data[i] + data[i+1] + data[i+3]) / 3
                data[i] = avg
                data[i + 1] = avg
                data[i + 2] = avg
            }
            context.putImageData(imageData, 0, 0)
            // document.body.appendChild(canvas)
            // canvas.toDataURL
            // const cvsfile = new Blob(['one, two, three'], {type: 'text/csv'})
            canvas.toBlob(function(blob){
                const form = new FormData()
                form.append('image', blob, 'mood.jpg')
                const xhr = new XMLHttpRequest()
                xhr.open('POST', '/imageupload', true)
                xhr.send(form)
            })
        }
        img.src = reader.result
        // document.body.appendChild(img)
    }
    // reader.readAsText(input.file[0])
    reader.readAsDataURL(input.file[0])
})

// 表单选择文件
input.addEventListener('change', function(e){
	handleFiles(input.files)
}, false)

// 拖拽选择文件
document.addEventListener('dragover', function(e){
    e.preventDefault()
    e.stopPropagation()
}, false)

document.addEventListener('drop', function(e){
    e.preventDefault()
    e.stopPropagation()
    handleFiles(e.dataTransfer.files)
}, false)
```

---

**参考资料：**

- [文件和二进制数据的操作](http://javascript.ruanyifeng.com/htmlapi/file.html)
- [HTML5 File API：让前端操作文件变得可能](https://www.cnblogs.com/zichi/p/html5-file-api.html)