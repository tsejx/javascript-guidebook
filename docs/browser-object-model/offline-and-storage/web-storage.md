---
nav:
  title: BOM
  order: 5
group:
  title: 离线与存储 API
  order: 12
title: Web Storage
order: 4
---

# Web Storage

HTML5 中的 Web Storage 提供了两个在客户端存储数据的对象：

- localStorage：主要用于存储一个域名下的需要**永久**存在在本地的数据，这些数据可以被一直访问，直到这些数据被删除，同源下数据多窗口共享
- sessionStorage：主要用于本地存储一个**会话**（session）中的数据，这些数据只有在同一个会话中的页面才能访问，同一源下不同窗口亦无法访问，会话结束后数据也随之销毁

因此 sessionStorage 和 localStorage 的主要区别在于他们**存储数据的生命周期**，sessionStorage 存储的数据的生命周期是一个会话，而 localStorage 存储的数据的生命周期是永久，直到被主动删除，否则数据永远不会过期的。

## 缓存静态文件

HTTP 协议的缓存，可以由用户浏览器清除或禁用缓存，也可以由 Web 服务器设置过期时间或不缓存。对于前端工程师，这更像是一个黑盒，想要决定文件是访问缓存还是访问远程显得有些力不从心。

使用 localStorage 控制文件缓存的方式有两种：

1. 使用 Loader 加载静态文件
2. 借助服务器端将静态文件 inline 化

这两种方式一般都会提前做好**缓存过期策略**，通常是使用**版本号**来控制。

## Web Storage API

localStorage 和 sessionStorage 有着统一的 API 接口，这为二者的操作提供了极大的便利。下面以 localStorage 为例来介绍一下 API 接口使用方法，同样这些接口也适用于 sessionStorage。

### 添加键值

`Storage.setItem()` 接受一个键名和值作为参数，将会把键名添加到存储中，如果键名已存在，则更新其对应的值。

```js
localStorage.setItem(key, value);
sessionStorage.setItem(key, value);
```

| 参数  | 说明 | 类型      |
| ----- | ---- | --------- |
| key   | 键名 | DOMString |
| value | 键值 | DOMString |

字面量形式实现：

- `Storage.key = value`
- `Storage['key'] = value`

⚠️ **注意**：当我们要存储对象是，应先转换成我们可识别的字符串格式（比如 JSON 格式）再进行存储。

🌰 **代码示例**：

```js
localStorage.setItem('boy', 'Ben');

localStorage.boy = 'Ben';
localStorage['boy'] = 'Ben';

localStorage.setItem('user', JSON.stringify({ id: 1, name: 'lilei' }));
```

### 获取键值

用于获取指定键名的键值。

```js
localStorage.getItem(key);
sessionStorage.getItem(key);
```

| 参数 | 说明           | 类型      |
| ---- | -------------- | --------- |
| key  | 获取键值的键名 | DOMString |

🌰 **代码示例**：

```js
localStorage.getItem('boy');
// 'Ben'

localStorage.boy;
// 'Ben'
localStorage['boy'];
// 'Ben'

JSON.parse(localStorage.getItem('user'));
// {id: 1, name: 'lilei}
```

### 删除键值

用于删除指定键名的键值。

```js
localStorage.removeItem(key);
sessionStorage.removeItem(key);
```

| 参数 | 说明           | 类型      |
| ---- | -------------- | --------- |
| key  | 删除键值的键名 | DOMString |

🌰 **代码示例**：

```js
localStorage.getItem('boy');
// 'Ben'

localStorage.removeItem('boy');

localStorage.getItem('boy');
// null
```

### 清除所有键值

用于清除所有存储的键值对。

```js
localStorage.clear();
sessionStorage.clear();
```

🌰 **代码示例**：

```js
localStorage.clear();

localStorage.length;
// 0
```

### 获取键名

通过指定索引获取键名称。需要注意的是赋值早的键值对应的索引值大，赋值完的键值对应的索引小，key 方法可用于遍历 localStorage 存储的键值。

```js
localStorage.key(index);
sessionStorage.key(index);
```

| 参数  | 说明 | 类型   |
| ----- | ---- | ------ |
| index | 索引 | number |

### 获取键值数量

length  属性用于获取 localStorage 或 sessionStorage 中键值对的数量。

```js
localStorage.length;
sessionStorage.length;
```

## Web Storage 事件

在 HTML5 中，可以通过 Window 对象的 Storage 事件进行监听。当存储的 Storage 数据发生变化时都会触发它，也就是说当前页面的 Storage 改变的时候，触发这个事件也会触发调用所有同域下其他窗口的 Storage 事件。但是，该事件不会再导致数据变化的当前页面触发。而且它不同于 `click` 点击类的事件会事件捕获和冒泡，storage 事件更像是一个通知，不可取消。

触发 Storage 事件的条件：

- 同一个浏览器打开了两个同源页面
- 其中一个页面修改了 localStorage
- 另一个网页注册了这个事件

Storage 的 Event 对象的常用属性

| 属性     | 说明                                              | 类型   |
| -------- | ------------------------------------------------- | ------ |
| oldValue | 更新前的值。如果该键为新增加，则这个属性为 null。 | any    |
| newValue | 更新后的值。如果该键被删除，则这个属性为 null。   | any    |
| url      | 原始触发 storage 事件的那个网页的网址。           | string |
| key      | 存储 store 的 key 名。                            | string |

🌰 **代码示例**：

```js
function storageChanged() {
  console.log(arguments);
}
window.addEventListener('storage', storageChanged, false);
```

[📍 实例：H5 Storage 事件监听](https://blog.csdn.net/ruangong1203/article/details/52841135)

## 使用场景

基于 Web Storage 的特点，它主要被用于储存一些**不经常改动**的，**不敏感**的数据，比如全国省市区县信息。还可以存储一些不太重要的跟用户相关的数据，比如说用户的头像地址、主题颜色等，这些信息可以先存储在用户本地一份，便于快速呈现，等真正从服务器端读取成功后再更改头像地址，主题颜色。另外，基于 storage 事件特点，Web Storage 还可以用于同域不同窗口间的通信。

## Web Storage 和 Cookie

Web Storage 和 Cookie 有许多相同之处：

- 它们都可以用于存储用户数据
- 它们存储数据的格式都是字符串形式
- 它们存储的数据都有大小限制

|                |                                                                              Cookie                                                                              |                              localStorage                              |                sessionStorage                |
| -------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------: | :------------------------------------------: |
| 数据存储方面   | 数据始终在同源的 HTTP 请求中携带（即便不需要），即 Cookie 在浏览器和服务器之间来回传递。<br/>Cookie 数据还有路径（path）的概念，可以限制 Cookie 只属于某个路径下 |                不会自动把数据发送给服务器，仅在本地保存                |   不会自动把数据发送给服务器，仅在本地保存   |
| 容量           |                         数据大小限制在 4kb 以内<br/>同时因为每次 HTTP 请求都会携带 Cookie，所以 Cookie 只适合保存很小的数据，如会话标识                          |                                  5MB                                   |                     5MB                      |
| 数据存储有效期 |                                                 只在 Cookie 设置的**过期时间**之前有效，即使窗口关闭或浏览器关闭                                                 |  **始终有效**，窗口或浏览器关闭也一直保存，本地存储，因此用作持久数据  |      仅在当前浏览器窗口**关闭之前**有效      |
| 作用域不同     |                                              在所有**同源窗口**中都是共享的；也就是说只要浏览器不关闭，数据仍然存在                                              | 在所有**同源窗口**中都是共享的；也就是说只要浏览器不关闭，数据仍然存在 | 不在不同的浏览器窗口中共享，即使是同一个页面 |

- Web Storage 拥有 `setItem`、`getItem`、`removeItem`、`clear` 等方法

- Cookie 需要自己封装 `setCookie`、`getCookie` 等方法

---

**参考资料：**

- [📝 Web Storage 学习](https://my.oschina.net/u/2282680/blog/791180)

使用 `localSotrage` 实现多页面通信

需要提前约定通信标识 `key`，这里假定 `key` 为 `page_b`

A 页面监听 `storage` 事件：

```js
mounted() {
  window.addEventListener('storage', this.siblingWindowListener, false);

  this.$on('hook:beforeDestroy', () => {
    window.removeEventListener('storage', this.sibilingWindowListener);
  })
},
methods: {
  siblingWindowListener(event) {
    if (event.key === 'page_b') {
      // do something
    }
  }
}
```

B 页面，当保存时，设置约定好的 `localStorage` 的 `key` 值，关闭页面：

```js
methods: {
  close() {
    localStorage.setItem('page_b', new Date().getTime());

    try {
      window.close();
    } catch(e) {
      console.log(e);
    }
  }
}
```
