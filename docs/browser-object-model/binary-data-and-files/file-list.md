---
nav:
  title: BOM
  order: 5
group:
  title: 二进制数据和文件 API
  order: 10
title: FileList API
order: 5
---

# FileList API

FileList 是 [File](./file) 对象的类数组序列（考虑 `<input type='file' multiple>` 或者从桌面拖动目录或文件），通常来自于一个 HTML input 元素的 `files` 属性，你可以通过这个对象访问到用户所选择的文件。该类型的对象还能是来自用户的拖放操作。

## 应用示例

### 多文件选择

要加载文件，最直接的方法就是使用标准 `<input type="file">` 元素。JavaScript 会返回选定的  `File`  对象的列表作为  `FileList`。

```html
<input id="files" type="file" name="files[]" multiple />
<output id="list"></output>

<script type="text/javascript">
  // 获选择按钮
  const filesInput = document.querySelector('#files');

  // 监听 change 事件
  filesInput.addEventListener('change', handleFilesSelect, false);

  // 选择文件后触发事件回调函数
  function handleFilesSelect(e) {
    // FileList 对象
    const files = e.target.files;

    let output = [];
    for (let i = 0, fileItem; (fileItem = files[i]); i++) {
      output.push(
        '<li><strong>',
        escape(fileItem.name),
        '</strong>(',
        fileItem.type || 'n/a',
        ')-',
        fileItem.size,
        ' bytes,last modified：',
        fileItem.lastModifiedDate.toLocaleDateString(),
        '</li>'
      );
    }

    // 将选择文件信息输出到文档中
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }
</script>
```

### 通过迭代获取多个已选择文件

```html
<input id="files" type="file" multiple />

<script type="text/javascript">
  const fileRef = document.querySelector('#files');

  // FileList 对象（类似于 NodeList 对象）
  const files = fileRef.files;
  let file;

  // 遍历所有文件
  for (let i = 0; i < files.length; i++) {
    // 获取单个文件
    file = files.item(i);
    // 或者
    file = files[i];

    // 输出当前遍历的 File 对象的文件名
    console.log(file.name);
  }
</script>
```
