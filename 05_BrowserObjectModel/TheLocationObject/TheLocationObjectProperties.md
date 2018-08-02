## Location对象的属性

`location` 对象提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，`location` 对象是很特别的一个对象，因为它既是 `window` 对象的属性，也是 `document` 对象的属性；换句话说，`window.location` 和 `document.location` 引用的是同一个对象。`location` 对象的用处不只表现在它保存着当前文档的信息，还表现在它将 URL 解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。

属性名  | 例子 | 描述
:---: | :---:  | :---:
href | `https://www.baidu.com` | 返回当前加载页面的完整 URL。而 `location` 对象的 `toString()` 方法也返回这个值。 
protocol | `"https:"` | 返回页面使用的协议。 
host | `www.baidu.com:8080` | 返回服务器名称和端口号（如果有）。 
hostname | `"www.baidu.com"` | 返回不带端口号的服务器名称。 
port | `"8080"` | 返回 URL 中指定的端口号。如果 URL 中不包含端口号，则这个属性返回空字符串。 
pathname | `"/src"` | 返回 URL 中的目录和（或）文件名（`/`以斜杆开头） 
search | `"?js=javascript"` | 返回 URL 的查询字符串（`?` 以问号开头） 
hash | `"#contents"` | 返回 URL 中的 hash，如果 URL 中不包含散列，则返回空字符串（`#` 以井号开头跟零或多个字符串） 
origin | `"https://www.baidu.com"` | 页面来源的域名的标准形式

> ⚠️注意：如果URL中 `?` 之前有一个 `#`，比如 `#text?q=test`，那么， `location.search` 得到的就是空字符串，因为 `location.search`只取 `?` 后面和 `#` 前面的内容。

### 查询字符串参数

虽然通过上面的属性可以访问到 `location` 对象的大多数信息，但其中访问URL包含的查询字符串的属性并不方便。尽管 `location.search` 返回从问号到 URL 末尾的所有内容，但却没有办法逐个访问其中的每个查询字符串参数。为此，可以像下面这样创建一个函数，用以解析查询字符串，然后返回包含所有参数的一个对象。

```js
/*
 * 这个函数用来解析来自URL的查询串中的name=value参数对
 * 它将name=value对存储在一个对象的属性中，并返回该对象
 * 这样来使用它
 *
 * var args = urlArgs();	// 从URL中解析参数
 * var q = args.q || "";	// 如果参数定义了的话就使用参数；否则使用一个默认值
 * var n = args.n ? parseInt(args.n) : 10;
 */

function urlArgs() {
    var args = {};										// 定义一个空对象
    var query = location.search.substring(1);			// 查找到查询串，并去掉问号
    var pairs = query.split('&');						// 根据&富豪将查询字符串分隔开
    for(let i = 0; i < pairs.length; i++){				// 对于每个片段
        const pos = pairs[i].indexOf('=');				// 查找"name=value"
        if (pos == -1) continue;						// 如果没有找到的话，就跳过
        const name = pairs[i].substring(0, pos);		// 提取name
        let value = pairs[i].substring(pos + 1);		// 提取value
        value = decodeURIComponent(value);				// 对value进行解码
        args[name] = value;								// 存储为属性
    }
    return args;										// 返回解析后的参数
}
```
