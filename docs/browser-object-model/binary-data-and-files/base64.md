# Base64

## 类型转换

### Base64 转 Blob

```js
function base64ToBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Unit8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}
```

### Base64 转 File

```js
function base64ToFile(urlData, filename) {
  if (typeof urlData !== 'string') return;

  const arr = urlData.split(',');
  const type = arr[0].match(/:(.*?);/)[1];
  const extension = type.split('/')[1];
  const bstr = atob(arr[1]);
  const len = bstr.length;
  const u8arr = new Unit8Array(len);
  while (len--) {
    u8arr[len] = bstr.charCodeAt(len);
  }

  return new File([u8arr], `${filename}.${extension}`, { type });
}
```

### File 转 Base64

```js
const reader = new FileReader();

raeder.readAsDataURL(file);

console.log(reader);
```

---

**参考资料：**

- [原来浏览器原生支持 JavaScript Base64 编码解码](https://www.zhangxinxu.com/wordpress/2018/08/js-base64-atob-btoa-encode-decode/)
- [一篇文章彻底弄懂 Base64 编码原理](https://blog.csdn.net/wo541075754/article/details/81734770)
