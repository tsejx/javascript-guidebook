---
nav:
  title: BOM
  order: 5
group:
  title: 其他浏览器对象
  order: 6
title: Location 对象的方法
order: 2
---

## Location 对象的方法

使用 `Location` 对象可以通过很多方式来改变浏览器的位置。

### location.assign()

```js
location.assign('https://github.com');
```

使用 `assign()` 方法并为其传递一个 URL，可以立即打开新 URL 并在浏览器的历史记录中生成一条记录。如果是将 `location.href` 或 `window.location` 设置为一个 URL 值，相当于调用 `assign()` 方法。

```javascript
window.location = 'https://github.com';
location.href = 'https://github.com';
```

在这些改变浏览器位置的方法中，最常用的是设置  `location.href`  属性。

另外，修改  `location`  对象的其他属性也可以改变当前加载的页面。下面的例子展示了通过将  `hash`、`search`、`hostname`、`pathname`  和  `port`  属性设置为新值来改变 URL。

```javascript
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

### location.replace()

`location.replace()` 方法接收一个参数即要导航到的 URL，结果虽然会导致浏览器位置改变，但不会在历史记录中生成新记录，也就是说用户不能回到前一个页面（只有 chrome 下有效）。

```javascript
location.replace('http://github.com');
```

### location.reload()

`reload()` 方法用于重新加载当前显示的页面。如果调用 `reload()` 方法时不传递任何参数，页面会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载，则需要传递参数 `true`。

位于 `reload()` 调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素，为此，最好将 `reload()` 放在代码的最后一行

```javascript
// 重新加载（有可能从缓存中加载）
location.reload();

// 重新加载（从服务器重新加载）
location.reload(true);
```

千万不要在页面中直接使用 `location.reload()` 方法，此方法会造成页面的无限刷新。因为页面刚加载完成，遇到该方法，则重新加载页面，又遇到该方法，则又加载页面，从而造成页面的无限刷新。

位于  `reload()`  调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素。为此，最好将  `reload()`  放在代码的最后一行。
