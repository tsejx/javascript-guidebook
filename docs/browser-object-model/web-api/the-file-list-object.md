---
nav:
  title: BOM
  order: 5
group:
  title: Web API
  order: 7
title: FileList 对象
order: 2
---

## FileList对象

FileList 是 File 对象的类数组序列（考虑 `<input type='file' multiple>` 或者从桌面拖动目录或文件），通常来自于一个 HTML input 元素的 `files` 属性，你可以通过这个对象访问到用户所选择的文件。该类型的对象还能是来自用户的拖放操作。

### 方法

使用 `File.item(index)` 方法，可以根据给定的索引值，返回 FileList 对象中对应的 File 对象。

```js
File.item(index);
```

**参数**：`index` 为 File 对象在 FileList 对象中的索引值，从0开始。

**返回值**：所请求的 File 对象。

### 示例

#### 使用表单输入进行选择

要加载文件，最直接的方法就是使用标准 `<input type="file">` 元素。JavaScript 会返回选定的 `File` 对象的列表作为 `FileList`。

```html
<input type="file" id="files" name="files[]" multiple />
<output id="list"></output>

<script>
    function handleFilesSelect(e) {
        const files = e.target.files;	// FileList object

        // files is a FileList of File objects.List some properties
        let output = [];
        for (let i = 0, f; f = files[i]; i++){
            output.push('<li><strong>', escape(f.name), '</strong>(', f.type || 'n/a', ')-', f.size, ' bytes,last modified：', f.lastModifiedData.toLocaleDateString(), '</li>');
        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>'
    }

    document.getElementById('files').addEventListener('change', handleFileSelect, false);
</script>
```

#### 通过迭代获取多个已选择文件

```js
// fileInput是一个HTML input 元素：<input type="file" id="myfileinput" multiple>
const fileInput = document.getElementById("myfileinput");

// files 是一个 FileList对象（类似于NodeList对象）
const files = fileInput.files;
let file;

// 遍历所有文件
for(let i = 0; i < files.length; i++){
    // 取得一个文件
    file = files.item(i);
    // 这样也行
    file = files[i];
    // 取得文件名
    console.log(file.name);
}
```



