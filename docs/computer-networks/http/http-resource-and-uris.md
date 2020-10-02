---
nav:
  title: 计算机网络
  order: 8
group:
  title: HTTP
  order: 3
title: HTTP 资源标识
order: 2
---

# HTTP 资源标识

## 统一资源标识符 URI

统一资源标志符（Uniform Resource Identifier，简称 URI）是一个用于标识（区分）互联网资源名称的字符串。该种标识允许用户对网络种的资源通过特定的协议进行交互操作。

URI 可以进一步分为 [URL](#统一资源定位符-url) 和 [URN](#永久统一资源定位符-urn)。URI 是以一种抽象的，高层次概念定义统一资源标识，而 URL 和 URN 则是具体的资源标识的方式。

通用的格式：

```plain
[scheme][://]user:passwd@[host:port][path][?query][#fragment]
```

### 编码方式

URI 只能使用 ASCII，ASCII 之外的字符是不支持显示的，而且还有一部分符号是界定符，如果不加以处理就会导致解析出错。

因此，URI 引入了 **编码** 机制，将所有 **非 ASCII 码字符** 和 **界定符** 转为十六进制字节值，然后在前面加个 `%`。

如：空格被转义成了 `%20`，**三元** 被转义成了 `%E4%B8%89%E5%85%83`。

### 方案或协议

`http://` 告诉浏览器使用何种协议。对于大部分 Web 资源，通常使用 HTTP 协议或其安全版本 HTTPS 协议。

另外，浏览器也知道如何处理其他协议。例如，

- `mailto`：协议指示浏览器打开邮件客户端
- `ftp`：协议指示浏览器处理文件传输。

其他常见的方案有：

| 方案              | 描述                                     |
| :---------------- | :--------------------------------------- |
| `data`            | Data URIs                                |
| `file`            | 指定主机上文件的名称                     |
| `ftp`             | 文件传输协议                             |
| `http` 或 `https` | 超文本传输 ​​ 协议／安全的超文本传输协议 |
| `mailto`          | 电子邮件地址                             |
| `ssh`             | 安全 shell                               |
| `tel`             | 电话                                     |
| `urn`             | 统一资源名称                             |
| `view-source`     | 资源的源代码                             |
| `ws/wss`          | WebSocket 连接                           |

### 主机

```jsx | inline
import React from 'react';
import img from '../../assets/http/http-url-domain.png';

export default () => <img alt="HTTP 主机" src={img} width={360} />;
```

上述例子中 `www.example.com` 既是一个域名，也代表管理该域名的机构。它指示了需要向网络上的哪一台主机发起请求。当然，也可以直接向主机的 IP 地址发起请求。但直接使用 IP 地址的场景并不常见。

### 端口

```jsx | inline
import React from 'react';
import img from '../../assets/http/http-url-port.png';

export default () => <img alt="HTTP 端口" src={img} width={360} />;
```

`:80` 是端口。它表示用于访问 Web 服务器上资源的技术 **门**。如果访问的该 Web 服务器使用 HTTP 协议的标准端口（HTTP 为 80，HTTPS 为 443）授予对其资源的访问权限，则通常省略此部分。否则端口就是 URI 必须的部分。

### 路径

```jsx | inline
import React from 'react';
import img from '../../assets/http/http-url-path.png';

export default () => <img alt="HTTP 路径" src={img} width={360} />;
```

`/path/to/myfile.html` 是 Web 服务器上资源的路径。

在 Web 的早期，类似这样的路径表示 Web 服务器上的物理文件位置。现在，它主要是由没有任何物理实体的 Web 服务器抽象处理而成的。

### 查询

```jsx | inline
import React from 'react';
import img from '../../assets/http/http-url-parameters.png';

export default () => <img alt="HTTP 查询" src={img} width={360} />;
```

`?key1=value1&key2=value2` 是提供给 Web 服务器的额外参数。这些参数是用 `&` 符号分隔的键/值对列表。

Web 服务器可以在将资源返回给用户之前使用这些参数来执行额外的操作。每个 Web 服务器都有自己的参数规则，想知道特定 Web 服务器如何处理参数的唯一可靠方法是询问该 Web 服务器所有者。

### 片段

```jsx | inline
import React from 'react';
import img from '../../assets/http/http-url-anchor.png';

export default () => <img alt="HTTP 查询" src={img} width={360} />;
```

`#SomewhereInTheDocument` 是资源本身的某一部分的一个锚点。锚点代表资源内的一种 **书签**，它给予浏览器显示位于该 **加书签** 点的内容的指示。

例如，在 HTML 文档上，浏览器将滚动到定义锚点的那个点上；在视频或音频文档上，浏览器将转到锚点代表的那个时间。

值得注意的是 `#` 号后面的部分，也称为 **片段标识符**，永远不会与请求一起发送到服务器。

## 统一资源定位符 URL

统一资源定位符（Uniform Resource Locator，简称 URL）是 URI 最常见的形式，有时候也被俗称为网页地址（网址），如同是网络上的门牌，是因特网上标准的资源的地址。

```plain
https://developer.mozilla.org
https://developer.mozilla.org/en-US/docs/Learn/
https://developer.mozilla.org/en-US/search?q=URL
```

在浏览器的地址栏中输入上述任一地址，浏览器就会加载相应的网页（资源）。

URL 由多个必须或可选的组件构成。下面给出了一个复杂的 URL：

```plain
http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument
```

## 永久统一资源定位符 URN

永久统一资源定位符（Uniform Resource Name，简称 URN）是另一种形式的 URI，它通过特定命名空间中的唯一名称来标识资源。

```http
urn:isbn:9780141036144
urn:ietf:rfc:7230
```

## Data URI Scheme

Data URI Scheme，即前缀为 `data:` 协议的 URI，其允许内容创建者向文档中嵌入小文件。

```plain
data:[<mediatype>][;charset=<charset>][;<encoding>],<encoded-data>
```

Data URI Scheme 由四个部分组成：

- 协议头 `data:`：标识这个内容为 Data URI Scheme 资源
- MIME 类型（可选项）：查看下方详细描述
- 源文本的字符集编码方式 `[;charset=<charset>]`：默认编码是 `charset=US-ASCII`，即数据部分的每个字符都会自动编码为 `%xx`
- 数据编码方式 `[;<encoding>]`：默认 `US-ASCII` 和 `BASE64` 两种
- 编码后的数据 `<encoded data>`

**使用 Data URI Scheme 的优劣势**

- 优势
  - 减少 HTTP 请求
  - 当访问外部资源很麻烦或受限时（例如资源服务器 IP 被禁用）
  - 当图片是在服务端用程序动态生成，每个访问用户显示均不同
  - 当图片的体积比较小，占用 HTTP 会话性价比不高
  - 没有图片更新要重新上传，还要清理缓存的问题
- 劣势
  - Base64 编码的数据体积通常为原数据的 4/3，也就是 Data URI Scheme 形式的图片会比二进制格式的图片体积大 1/3
  - Data URI Scheme 形式的图片不会被浏览器缓存，意味着每次访问页面都需要被重新加载
  - 不适合用于懒加载中
  - 移动端性能优先并不适宜用 Data URI Scheme 技术，解码耗费 CPU

### 应用场景

**在 HTML 的 Img 标签中使用**

```html
<img src="data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAF..." />
```

**在 HTML 的外链样式文件使用**

```html
<link type="text/css" href="data:text/css;base64,LyogKioqKiogVGVtcGxhdGUgKioq" />
```

**在 HTML 的外链脚本文件使用**

```html
<link type="text/javascript" href="data:text/javascript;base64,LyogKioqKiogVGVtcGxhdGUgKioq" />
```

**在 CSS 的 background-image 属性中使用**

```css
img {
  width: 100px;
  height: 100px;
  background-image: url(data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAF...);
}
```

## MIME 类型

媒体类型（Multipurpose Internet Mail Extensions，简称 MIME 类型）是一种标准，用于表示文档、文件或字节流的性质和格式。在 HTTP 中，HTTP 会从 MIME 类型中取部分标记报文 Body 部分的数据类型，这些类型体现在 `Content-Type` 这个字段，当然这是针对于发送端而言的，接收端想要收到特定类型的数据，也可以使用 `Accept` 字段。

浏览器通常使用 MIME 类型（而不是文件扩展名）来确定如何处理文档。因此服务器设置正确以将正确的 MIME 类型附加到响应对象的头部是非常重要的。

MIME 类型对大小写不敏感，但是传统写法都是小写。

### 独立类型

| 类型        | 描述                                                  | 示例                                                                                                                                                           |
| :---------- | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text        | 表明文件是普通文件，理论上是人类可读的                | `text/plain`<br />`text/html`<br/>`text/css`<br/>`text/javascript`                                                                                             |
| image       | 表明文件某种是图像文件，GIF 动态图也属于 `image` 属性 | `image/gif`<br/>`image/png`<br/>`image/jpeg`<br/>`image/bmp`<br/>`image/webp`<br/>`iamge/x-icon`<br/>`image/vnd.microsoft.icon`<br/>`image/svg+xml`            |
| audio       | 表明文件是某种音频文件                                | `audio/midi`<br/>`audio/mpeg`<br/>`audio/webm`<br/>`audio/ogg`<br/>`audio/wav`                                                                                 |
| video       | 表明文件是某种视频文件                                | `video/webm`<br/>`video/ogg`                                                                                                                                   |
| application | 表明文件是某种二进制数据                              | `application/octet-stream`<br/>`application/pkcs12`<br/>`application/vnd.mspowerpoint`<br/>`application/xhtml+xml`<br/>`application/xml`<br/>`application/pdf` |

### 复合类型

```
multipart/form-data
multipart/byteranges
```

Multipart 类型表示细分领域的文件类型的种类，经常对于不同的 MIME 类型。这是复合文件的一种表现方式。

- `multipart/form-data`：用于联系 HTML Forms 和 POST 方法
- `multipart/byteranges`：使用状态码 `206 Partial Content` 来发送整个文件的子集，而 HTTP 对不能处理的复合文件使用特殊的方式，将信息直接传送给浏览器

`multipart/form-data` 可用于 HTML 表单从浏览器发送信息给服务器。作为多部分文档格式，它由边界线（由 `--` 开始的字符串）划分出的不同部分组成。每个部分有自己的实体，以及自己的 HTTP 请求头，`Content-Disposition` 和 `Content-Type` 用于文件上传领域。

### MIME 嗅探

在却是 MIME 类型或客户端认为文件设置了错误的 MIME 类型时，浏览器可能会通过查看资源来进行 MIME 嗅探。每个浏览器在不同的情况下会执行不同的操作。因为这个操作会有一些安全问题，有的 MIME 类型表示可执行内容而有些是不可执行内容。浏览器可以通过请求头 `Content-Type` 来设置 `X-Content-Type-Options` 以阻止 MIME 嗅探。
