---
nav:
  title: BOM
  order: 5
group:
  title: 全局对象
  order: 1
title: Location 对象
order: 2
---

# Location 对象

使用 `Location` 对象可以通过很多方式来改变浏览器的位置。

## location.assign()

```js
location.assign('https://github.com');
```

使用 `assign()` 方法并为其传递一个 URL，可以立即打开新 URL 并在浏览器的历史记录中生成一条记录。如果是将 `location.href` 或 `window.location` 设置为一个 URL 值，相当于调用 `assign()` 方法。

```js
window.location = 'https://github.com';
location.href = 'https://github.com';
```

在这些改变浏览器位置的方法中，最常用的是设置  `location.href`  属性。

另外，修改  `location`  对象的其他属性也可以改变当前加载的页面。下面的例子展示了通过将  `hash`、`search`、`hostname`、`pathname`  和  `port`  属性设置为新值来改变 URL。

```js
// 假设初始 URL 为 http://github.com/about/
location.href = 'http://github.com/about/';

// 将 URL 修改为 "http://github.com/about/#ds-thread"
location.hash = '#ds-thread';

// 将 URL 修改为 "http://github.com/about/?search=123"
location.search = '?search=123';

// 将 URL 修改为 "https://gist.github.com/"
location.hostname = 'gist.github.com';

// 将 URL 修改为 "https://gist.github.com/u/10086"
location.pathname = 'u/stone0090';

// 将 URL 修改为 "https://gist.github.com:8080/"
location.port = 8080;
```

当通过上述任何一种方式修改 URL 之后，浏览器的历史记录中就会生成一条新记录，因此用户通过单击“后退”按钮都会导航到前一个页面。要禁用这种行为，可以使用  `replace()`  方法。

## location.replace()

`location.replace()` 方法接收一个参数即要导航到的 URL，结果虽然会导致浏览器位置改变，但不会在历史记录中生成新记录，也就是说用户不能回到前一个页面（只有 chrome 下有效）。

```js
location.replace('http://github.com');
```

## location.reload()

`reload()` 方法用于重新加载当前显示的页面。如果调用 `reload()` 方法时不传递任何参数，页面会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载，则需要传递参数 `true`。

位于 `reload()` 调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素，为此，最好将 `reload()` 放在代码的最后一行

```js
// 重新加载（有可能从缓存中加载）
location.reload();

// 重新加载（从服务器重新加载）
location.reload(true);
```

千万不要在页面中直接使用 `location.reload()` 方法，此方法会造成页面的无限刷新。因为页面刚加载完成，遇到该方法，则重新加载页面，又遇到该方法，则又加载页面，从而造成页面的无限刷新。

位于  `reload()`  调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素。为此，最好将  `reload()`  放在代码的最后一行。

# Location 对象的属性

`location` 对象提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。

事实上，`location` 对象是很特别的一个对象，因为它既是 `window` 对象的属性，也是 `document` 对象的属性；换句话说，`window.location` 和 `document.location` 引用的是同一个对象。

`location` 对象的用处不只表现在它保存着当前文档的信息，还表现在它将 URL 解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。

|  属性名  |           例子            |                                            描述                                             |
| :------: | :-----------------------: | :-----------------------------------------------------------------------------------------: |
|   href   |  `https://www.baidu.com`  |      返回当前加载页面的完整 URL。而 `location` 对象的 `toString()` 方法也返回这个值。       |
| protocol |        `"https:"`         |                                    返回页面使用的协议。                                     |
|   host   |   `www.baidu.com:8080`    |                             返回服务器名称和端口号（如果有）。                              |
| hostname |     `"www.baidu.com"`     |                                返回不带端口号的服务器名称。                                 |
|   port   |         `"8080"`          |         返回 URL 中指定的端口号。如果 URL 中不包含端口号，则这个属性返回空字符串。          |
| pathname |         `"/src"`          |                      返回 URL 中的目录和（或）文件名（`/`以斜杆开头）                       |
|  search  |    `"?js=javascript"`     |                           返回 URL 的查询字符串（`?` 以问号开头）                           |
|   hash   |       `"#contents"`       | 返回 URL 中的 hash，如果 URL 中不包含散列，则返回空字符串（`#` 以井号开头跟零或多个字符串） |
|  origin  | `"https://www.baidu.com"` |                                  页面来源的域名的标准形式                                   |

> ⚠️ 注意：如果 URL 中 `?` 之前有一个 `#`，比如 `#text?q=test`，那么， `location.search` 得到的就是空字符串，因为 `location.search`只取 `?` 后面和 `#` 前面的内容。

### 查询字符串参数

虽然通过上面的属性可以访问到 `location` 对象的大多数信息，但其中访问 URL 包含的查询字符串的属性并不方便。尽管 `location.search` 返回从问号到 URL 末尾的所有内容，但却没有办法逐个访问其中的每个查询字符串参数。为此，可以像下面这样创建一个函数，用以解析查询字符串，然后返回包含所有参数的一个对象。

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
  // 定义一个空对象
  var args = {};

  // 查找到查询串，并去掉问号
  var query = location.search.substring(1);

  // 根据 & 符号将查询字符串分隔开
  var pairs = query.split('&');

  for (let i = 0; i < pairs.length; i++) {
    // 查找"name=value"
    const pos = pairs[i].indexOf('=');
    // 如果没有找到的话，就跳过
    if (pos == -1) continue;
    // 提取name
    const name = pairs[i].substring(0, pos);
    // 提取value
    let value = pairs[i].substring(pos + 1);
    // 对value进行解码
    value = decodeURIComponent(value);
    // 存储为属性
    args[name] = value;
  }
  return args;
}
```
