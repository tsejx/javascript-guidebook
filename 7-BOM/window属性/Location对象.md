# Location对象

`Location` 接口表示其链接到的对象的位置（URL）。所做的修改反映在与之相关的对象上。 `Document` 和 `Window` 接口都有这样一个链接的 `Location`，分别通过 `Document.location` 和 `Window.location` 访问。


## 属性

`Location` 接口不继承任何属性，但是实现了那些来自 `URLUtils` 的属性。

属性  | 例子 | 描述
:---: | :---:  | :---:
`location.href` | `"https://www.baidu.com/"` | URL地址
`location.protocol` | `"https:"` | URL对应协议
`location.host` | `www.baidu.com:8080` | URL域名,或带有URL的端口号
`location.hostname` | `"www.baidu.com"` | URL域名（不包含端口号）
`location.port` | `"8080"` | 端口号
`location.pathname` | `"/src"` | URL路径(`/`开头)
`location.search` | `"?js=javascript"` | URL参数(`?`开头)
`location.hash` | `"#contents"` | URL标识符(`#`开头)
`location.origin` | `"https://www.baidu.com"` | 页面来源的域名的标准形式

**注意**

如果URL中 `?` 之前有一个 `#`，比如 `#text?q=test`，那么， `location.search` 得到的就是空字符串，因为 `location.search`只取 `?` 后面和 `#` 前面的内容。

### 封装解析查询字符串函数

尽管 `location.search` 返回从问号到URL末尾的所有内容，但却没有办法逐个访问其中的每个查询字符串参数。为此，创建一个函数，用以解析查询字符串，然后返回包含所有参数的一个对象:

```javascript
function getQueryStringArgs () {
    // 取得查询字符串并去除开头的问号
    let qs = location.search.length > 0 ? location.search.substr(1) : '';
    // 保存数据的对象
    let args = {};
    // 取得每一项
    let items = qs.length ? qs.split('&') : [];
    let item, name, value;
    let len = items.length;
    // 逐个将每一项添加到args对象中
    for (let i = 0; i < len; i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}
location.search = '?name=abc&password=123&callback=fn';
console.log(getQueryStringArgs()); // 
```

## 方法

使用 `Location` 对象可以通过很多方式来改变浏览器的位置。

### Location.assign()

使用 `assign()` 方法并为其传递一个URL，可以立即打开新URL并在浏览器的历史记录中生成一条记录。如果是将 `location.href` 或 `window.location` 设置为一个URL值，相当于调用 `assign()` 方法。

```javascript
location.assign('http://baidu.con');
window.location = 'http://baidu.com';
document.location = 'http://baidu.com';
location.href = 'http://baidu.com'; // 最常用
```

每当修改 `location` 的属性(`hash`除外)，页面都会以新URL重新加载

```javascript
// 修改hash值
location.hash = '#section1';
// 修改查询字符串
location.search = '?q=javascript';
// 修改主机名
location.pathname = 'mydir';
// 修改端口号
location.port = '8080';
```

### replace()

通过上述任意一种方式修改URL后，浏览器的历史记录都会生成一条新记录，因此用户通过单击后退按钮会导航到前一个页面。

而要禁用这种行为，可以使用replace()方法，该方法接收一个参数即要导航到的URL，结果虽然会导致浏览器位置改变，但不会在历史记录中生成新记录，也就是说用户不能回到前一个页面

　　[注意] 只有chrome下有效

```javascript
location.replace('http://baidu.com')
```

### reload()

`reload()` 方法用于重新加载当前显示的页面。如果调用 `reload()` 方法时不传递任何参数，页面会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载，则需要传递参数 `true`。

位于 `reload()` 调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素，为此，最好将 `reload()` 放在代码的最后一行

```javascript
// 有可能从缓存中加载
location.reload();
```

```javascript
// 从服务器重新加载
location.reload(true);
```

　**[注意] 千万不要在页面中直接使用location.reload()方法，此方法会造成页面的无限刷新。因为页面刚加载完成，遇到该方法，则重新加载页面，又遇到该方法，则又加载页面，从而造成页面的无限刷新**
