---
nav:
  title: BOM
  order: 5
group:
  title: 离线与存储 API
  order: 12
title: Cookie
order: 3
---

# Cookie

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。

Cookie 主要用于以下三个方面：

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

## 属性构成

| 属性     | 名称     | 说明                                                                                                                                                                                                         |
| :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name     | 名称     | Cookie 名称不能相同，相同的名称会被覆盖                                                                                                                                                                      |
| Value    | 值       | 储存在 Cookie 中的字符串值。值必须被 URL 编码                                                                                                                                                                |
| Domain   | 域       | 当该值与客户端请求的域相匹配时，浏览器会自动添加到请求头中                                                                                                                                                   |
| Path     | 路径     | 对于指定域中的那个路径，应该向服务器发送 Cookie。例如，你可以指定 Cookie 只有从 `http://www.wrox.com/books/` 中才能访问，那么 `http://www.wrox.com` 的页面就不会发送 Cookie 信息，即使请求都是来自同一个域的 |
| Expires  | 失效时间 | 表示 Cookie 将被删除的时间戳。[📍 详情点击](#expires)                                                                                                                                                        |
| Max-Age  | 失效时间 | 表示 Cookie 将被删除的剩余时间，单位为秒。过了这个时间 ，浏览器将不会保留这个 Cookie。如果同时指定了 Expires 和 Max-Age，那么 Max-Age 的值将优先生效                                                         |
| Size     | 大小     | Cookie 体积大小                                                                                                                                                                                              |
| HTTP     |          | 指定该 Cookie 无法通过 JavaScript 脚本访问。主要是 `document.cookie` 属性、`XMLHttpRequest` 对象和 `Request API` 都无法访问。唯有浏览器发送 HTTP 请求时，才会自动添加 Cookie 至请求中                        |
| Secure   | 安全标志 | 浏览器只有在加密协议 HTTPS 下，才将这个 Cookie 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的的 Secure 属性                                                                       |
| SameSite |          |                                                                                                                                                                                                              |

### Name

- 不区分大小写
- 实践中需要区分大小写，某些服务器会处理
- 名称必须是 URL 编码

> 由于 Cookie 规定是名称/值是不允许包含分号，逗号，空格的，所以为了不给用户到来麻烦，考虑服务器的兼容性，任何存储 Cookie 的数据都应该被编码。

### Domain

Domain 指定了 Cookie 可以送达的主机名。假如没有指定，那么默认值为当前文档访问地址（URL）中的主机（host）部分（但是不包含子域名）。

像淘宝首页设置的 Domain 就是 `.taobao.com`，这样无论是 `a.taobao.com` 还是 `b.taobao.com` 都可以使用 Cookie。

在这里注意的是，不能跨域设置 Cookie，比如阿里域名下的页面把 Domain 设置成百度是无效的：

```http
Set-Cookie: qwerty=219ffwef9w0f; Domain=baidu.com; Path=/; Expires=Wed, 30 Aug 2020 00:00:00 GMT
```

- 前面带点和不带点的区别
  - 带点：任何 `subdomain` 都可以访问，包括父 `domain`
  - 不带点：只有完全一样的域名才能访问，`subdomain` 不能（但在 IE 下比较特殊，它支持 `subdomain` 访问）

### Path

Path 指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部。比如设置 `Path=/docs`，`/docs/Web/` 下的资源会带 Cookie 首部，`/test` 则不会携带 Cookie 首部。

Domain 和 Path 标识共同定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL。

- 默认值为设置该 Cookie 的网页所在的目录

> ⚠️ 注意：
>
> - 发生跨域 XHR 请求时，即使请求 URL 的域名和路径都满足 Cookie 的 `domain` 和 `path`，默认情况下 Cookie 也不会自动被添加到请求头部中。
> - `domain` 是可以设置为页面本身的域名（本域），或页面本身域名的父域，但不能是公共后缀 [public suffix](https://link.juejin.im?target=https%3A%2F%2Fpublicsuffix.org%2F)。举例说明下：如果页面域名为 `www.baidu.com`，`domain` 可以设置为 `www.baidu.com`，也可以设置为 `baidu.com`，但不能设置为 `.com` 或 `com`。

### Expires

`expires` 用于设置 Cookie 的过期时间。

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```

- 必须为 GMT 格式的日期（Wdy，DD-Mon-YYYY HH:SS GMT），用于指定应该删除 Cookie 的准确时间。可以通过 `new Date().toGMTString()` 或者 `new Date().toUTCString()` 来获得。
- 当 Expires 属性 **缺省** 时，表示是会话性 Cookie，如 Expires 的值为 Session，表示的就是会话性 Cookie。当为会话性 Cookie 的时候，值保存在客户端内存中，并在用户关闭浏览器时失效。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期 Cookie 也会被保留下来，就好像浏览器从来没有关闭一样。
- 与会话性 Cookie 相对的是持久性 Cookie，持久性 Cookies 会保存在用户的硬盘中，直至过期或者清除 Cookie。这里值得注意的是，设定的日期和时间只与客户端相关，而不是服务端。
- 如果你设置的 Expires 是个以前的时间，则 Cookie 会被立刻删除。

> 通过 `expires` 属性将 Cookie 划分为临时 Cookie 和永久 Cookie

存储在硬盘上的 Cookie 可以在不同的浏览器进程间共享，比如两个 IE 窗口。而对于保存在内存的 Cookie，不同的浏览器有不同的处理方式。可以类比于本地存储的 LocalStorage。

### Max-Age

Max-Age 用于设置在 Cookie 失效之前需要经过的秒数。比如：

```http
Set-Cookie: id=a3fWa; Max-Age=604800;
```

Max-Age 可以为正数、负数、甚至是 `0`。

- 如果 `max-Age` 属性为正数时，浏览器会将其持久化，即写到对应的 Cookie 文件中。
- 当 `max-Age` 属性为负数，则表示该 Cookie 只是一个会话性 Cookie。
- 当 `max-Age` 为 `0` 时，则会立即删除这个 Cookie。

假如 Expires 和 Max-Age 都存在，Max-Age 优先级更高。

### HTTPOnly

- 该属性为 Cookie 的 HttpOnly 属性
  - 当值为 `true` 时，则只有在 HTTP 请求头中会带此 Cookie 的信息，客户端无法通过 JavaScrept 代码访问 cookie。（能有效地防止 XSS 攻击）
  - 当值为 `false` 时，客户端可以通过 JavaScript 代码去访问（包括读取、修改、删除等）这个 Cookie 的。
- 在客户端不能通过 JavaScript 代码去设置一个 `HttpOnly` 类型的 Cookie，而需要通过服务端来设置。

### Secure

标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端。使用 HTTPS 安全协议，可以保护 Cookie 在浏览器和 Web 服务器间的传输过程中不被窃取和篡改。

### SameSite

SameSite 属性可以让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。

SameSite 可以有下面三种值：

- `strict`：仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。
- `lax`：允许部分第三方请求携带 Cookie
- `none`：无论是否跨站都会发送 Cookie

之前默认是 `none` 的，Chrome80 后默认是 `lax`。

首先要理解的一点就是跨站和跨域是不同的。同站（same-site）/ 跨站（cross-site）和第一方（first-party）/ 第三方（third-party）是等价的。但是与浏览器同源策略（SOP）中的同源（same-origin）/ 跨域（cross-origin）是完全不同的概念。

同源策略的同源是指两个 URL 的协议/主机名/端口一致。例如，`https://www.taobao.com/pages/`，它的协议是 HTTPS，主机名是 `www.taobao.com`，端口是 443。

同源策略作为浏览器的安全基石，其 **同源** 判断是比较严格的，相对而言，Cookie 中的 **同站** 判断就比较宽松：只要两个 URL 的 `eTLD+1` 相同即可，不需要考虑协议和端口。其中，`eTLD` 表示有效顶级域名，注册于 Mozilla 维护的公共后缀列表（Public Suffix List）中，例如，`.com`、`.co.uk`、`.github.io` 等。`eTLD+1` 则表示，有效顶级域名+二级域名，例如 `taobao.com` 等。

举几个例子，`www.taobao.com` 和 `www.baidu.com` 是跨站，`www.a.taobao.com` 和 `www.b.taobao.com` 是同站，`a.github.io` 和 `b.github.io` 是跨站（注意是跨站）。

接下来看下从 None 改成 Lax 到底影响了哪些地方的 Cookies 的发送？直接来一个图表：

| 请求类型  | 实例                              | 以前        | Strict | Lax         | None        |
| :-------- | :-------------------------------- | :---------- | :----- | :---------- | :---------- |
| 链接      | `<a href="..."></a>`              | 发送 Cookie | 不发送 | 发送 Cookie | 发送 Cookie |
| 预加载    | `<link rel="prerender" href=""/>` | 发送 Cookie | 不发送 | 发送 Cookie | 发送 Cookie |
| GET 表单  | `<from method="GET" action="">`   | 发送 Cookie | 不发送 | 发送 Cookie | 发送 Cookie |
| POST 表单 | `<from method="POST" action="">`  | 发送 Cookie | 不发送 | 不发送      | 发送 Cookie |
| iframe    | `<iframe src="..."></iframe>`     | 发送 Cookie | 不发送 | 不发送      | 发送 Cookie |
| AJAX      | `$.get("...")`                    | 发送 Cookie | 不发送 | 不发送      | 发送 Cookie |
| Image     | `<img src="...">`                 | 发送 Cookie | 不发送 | 不发送      | 发送 Cookie |

从上图可以看出，对大部分 Web 应用而言，Post 表单、iframe、AJAX、Image 这四种情况从以前的跨站会发送三方 Cookie，变成了不发送。

- Post 表单：应该的，学 CSRF 总会举表单的例子。
- iframe：iframe 嵌入的 web 应用有很多是跨站的，都会受到影响。
- AJAX：可能会影响部分前端取值的行为和结果。
- Image：图片一般放 CDN，大部分情况不需要 Cookie，故影响有限。但如果引用了需要鉴权的图片，可能会受到影响。

除了这些还有 `script` 的方式，这种方式也不会发送 Cookie，像淘宝的大部分请求都是 `jsonp`，如果涉及到跨站也有可能会被影响。

## 特性

1. 一个浏览器针对一个网站最多存 20 个 Cookie，浏览器一般只允许存放 300 个 Cookie
2. 每个 Cookie 的长度不能超过 4KB（稀缺）。但不同的浏览器实现的不同
3. Cookie 的不可跨域名性。
4. 浏览器的同源政策规定，两个网址只要域名和端口相同，就可以共享 Cookie。注意，这里不要求协议相同。

## 设置

#### 服务端设置 Cookie

服务端通过对客户端的网络请求的响应头，设置字段 `Set-Cookie` 进行设置 cookie。

- 一个 Set-Cookie 字段只能设置一个 Cookie，当你要设置多个 Cookie，需要添加同样多的 `Set-Cookie` 字段
- 服务端可以设置 Cookie 的所有选项：Expires、Domain、Path、Secure、HttpOnly

#### 客户端设置 Cookie

客户端可以设置 Cookie 的选贤：Expires、Domain、Path、Secure（有条件：只有在 HTTP 协议的网页中，客户端设置 Secure 类型的 Cookie 才能成功），但无法设置 HttpOnly 选项。

设置多个 Cookie：

```js
document.cookie = 'name=Jonh';
document.cookie = 'age=12';
document.cookie = 'grade=111';
```

## 操作

### 发送

浏览器向服务器发送 HTTP 请求时，每个请求都会带上相应的 Cookie。 也就是说，把服务器早前保存在浏览器的这段信息，再发回服务器。 这时要使用 HTTP 头信息的 Cookie 字段。

### 读取

查看浏览器是否开启 Cookie 功能：

```js
window.navigator.cookieEnabled;
```

获取当前网页的 Cookie：

```js
document.cookie;
```

### 修改

Cookie 的修改只需要对 Cookie 进行重新赋值，旧的值即会被新的值所覆盖。但需要注意的是，在设置新的 Cookie 时，`key`、`domain`、`path` 和 `secure` 这几个选项一定要与旧 Cookie 保持一致。否则不会修改旧值，而是添加了一个新的 Cookie。

### 删除

Cookie 的删除同样需要对 Cookie 进行重新赋值，同时，将这个新的 Cookie 的 `expires` 选项设置为一个过去的时间点就行了。同样需要注意的是，`key`、`domain`、`path` 和 `secure` 这几个选项一定要与旧 Cookie 保持一致。

## 实现原理

Cookie 实际上是一小段的文本信息。客户端请求服务器，如果服务器需要记录该用户状态，就使用响应头向客户端器颁发一个 Cookie。客户端浏览器会把 Cookie 保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该 Cookie 一同提交给服务器。服务器检查该 Cookie，以此来辨认用户状态。服务器还可以根据需要修改 Cookie 的内容。

这个跟其实浏览器缓存类似：

1. 客户端在浏览器的地址栏中键入 Web 服务的 URL，浏览器发送读取网页的请求
2. 服务器接收到请求后，产生一个 Set-Cookie 报头，放在 HTTP 报文中一起回传客户端，发起一次会话
3. 客户端收到答应后，若要继续该次会话，则将 Set-Cookie 中的内容取出，形成一个 Cookie.txt 文件储存在客户端计算机里

## 安全问题

通常 Cookie 信息都是使用 HTTP 连接传递数据，这种传递方式很容易被查看，而且 JavaScript 里面直接有一个 `document.Cookie` 方法，可以直接获取到用户的 cookie，所以 Cookie 存储的信息容易被窃取。假如 Cookie 中所传递的内容比较重要，那么就要求使用加密的数据传输。

> **如何来防范 Cookie 的安全呢？有以下几种方法：**

1. HttpOnly 属性：如果在 Cookie 中设置了 HttpOnly 属性，那么通过程序（JavaScript 脚本、Applet 等）将无法读取到 Cookie 信息，这样能有效的防止 XSS 攻击。
2. Secure 属性：当设置为 `true` 时，表示创建的 Cookie 会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，如果是 HTTP 连接则不会传递该信息，所以不会被盗取到 Cookies 的具体内容。

> **登录时候用 Cookie 的话，安全性问题怎么解决？**

**第一种是：**

把用户对象（包含了用户 ID、用户名、是否登录..）序列化成字符串再加密存入 cookie。

密钥是：客户端 IP + 浏览器 Agent + 用户标识 + 固定的私有密钥

当 Cookie 被窃取后，只要任一信息不匹配，就无法解密 Cookie，进而也就不能登录了。

这样做的缺点是 IP 不能变动、频繁加密解密会加重 CPU 负担

**第二种是：**

将用户的认证信息保存在一个 Cookie 中，具体如下：

1. Cookie 名：UID。推荐进行加密，比如 MD5（站点名称）等。
2. Cookie 值：登录名 | 有效时间 Expires | hash 值。
   - hash 值可以由 `登录名 + 有效时间 Expires + 用户密码（加密后的）的前几位 + Salt`**（Salt 是保证在服务器端站点配置文件中的随机数）**

这样子设计有以下几个优点：

1. 即使数据库被盗了，盗用者还是无法登录到系统，因为组成 Cookie 值的 salt 是保证在服务器站点配置文件中而非数据库。
2. 如果账户被盗了，用户修改密码，可以使盗用者的 Cookie 值无效。
3. 如果服务器端的数据库被盗了，通过修改 salt 值可以使所有用户的 Cookie 值无效，迫使用户重新登录系统。
4. 有效时间 Expires 可以设置为 `当前时间+过去时间`（比如 2 天），这样可以保证每次登录的 Cookie 值都不一样，防止盗用者窥探到自己的 Cookie 值后作为后门，长期登录。

## 常用场景

Cookie 主要用来分辨两个请求是否来自同一浏览器，以及用来保存一些状态信息。

1. 会话管理（Session）：保存登陆，购物车等需要记录的信息
2. 个性化：保存用户的偏好，如网页的背景色，字体大小等
3. 追踪：记录和分析用户行为

很多人用 Cookie 作为客户端的存储，虽然可行，但是并不推荐这种做法。

1. Cookie 设计初衷并非用于客户端存储，且可存储容量很小
2. 缺乏数据操作接口
3. 影响浏览器性能

客户端存储推荐使用 [WebStorageAPI](web-storage)

## 替代方案

#### JWT

JSON Web Token（JWT）是一个自包含的信息包，可以用来存储用户标识以及认证信息。可以被用来代替 Session Cookie。和 Cookie 自动附加到每个 HTTP 请求的方式不一样，JWT 必须被 Web 应用明确指定附加到那个 HTTP 请求上。

#### HTTP 认证

HTTP 包含基本认证以及摘要认证协议，利用这些协议只有在提供了正确的用户名和密码后才能访问到 Web 页面。如果服务端需要类似的认证信息来确保 Web 页面的访问权限，那么浏览器每次页面请求的时候都要发送这些认证信息。这些认证信息也可以用来追踪用户。

#### IP 地址

有些用户可能会被基于访问页面的电脑 IP 地址追踪过，服务端知道当前正在运行浏览器的电脑的 IP 地址，理论上可以对这个 IP 地址关联一个用户 Session。

然后 IP 地址通常不是一个可靠的追踪 Session 或者标识用户的方法。许多电脑设计的时候就是为了让一个单独用户使用的，例如办公 PC，家庭 PC 会在网络地址转换协议下共享一个公共的 IP 地址。而且某些系统，例如 Tor 设计的时候就是为了保持匿名性的，利用 IP 地址追踪用户显然是不合适的，也是不可能的。

#### URL 查询字符串

一个更精确的技术是基于 URL 中嵌入信息。URL 中的查询字符串部分通常就是为了实现这个目的的，当然也可以使用其他部分。Java Servlet 和 PHP Session 机制都是使用这种机制，如果 Cookie 被禁止了。

这种方法由服务端在 Web 页面的所有链接中追加包含一个独立 Session 标识的查询字符串组成。当用户点击了其中了一个链接，浏览器把查询字符串传给服务端，允许服务端识别用户维持状态。

这些类型的查询字符串非常像 Cookie，都包含任意的信息供服务端选择，都会随请求返回给服务端。然而其中还是有点不同的。由于查询字符串是 URL 中的一部分，如果 URL 后面被重复发送了，那么上面附加的相同信息将会被发送到服务端，这样可能会产生混乱。例如，如果用户的偏好信息被放在了查询字符串中，用户把这个 URL 通过邮件发给了另一个用户，那么这些偏好信息就会变成另一个用户的。

而且如果相同用户从不同的源多次访问相同的页面，这样不能确保每次使用相同的查询字符串。例如，如果一个用户第一次通过一个页面的内部站点访问了一个页面，然后第二次又通过外部的搜索引擎访问到这个页面，这样查询字符串可能会不同。如果在这种情况下使用 Cookie，Cookie 可以是相同的。

使用查询字符串其他缺点就是安全问题。在查询字符串中存储标识 Session 的数据可以导致 Session 固定攻击， Referer 日志攻击以及其他安全漏洞。把 Session 标识转成 HTTP Cookie 更安全。

#### 隐藏的表单字段

另一种会话跟踪是使用隐藏域的 Web 表单。这个技术很像使用 URL 查询字符串去保存信息，也有一些优点和缺点。事实上，如果通过 HTTP 的 GET 方法处理表单，那么这种技术就和使用 URL 查询字符串类似，因为 GET 方法会把表单字段作为查询字符串追加到 URL 后面。但是大部分表单都是通过 HTTP 的 POST 方法处理，这样表单信息包括隐藏的字段都会在 HTTP 请求体中发送，这样既不是 URL 中的一部分，也不是 Cookie 的一部分。

从追踪的角度来看这种方式有两种好处。第一，把追踪信息放在 HTTP 请求体中而不是 URL 中意味着它不会被普通用户察觉。第二，当用户复制 URL 的时候不会复制到 Session 信息。

#### Window.name DOM 属性

所有的现代浏览器都可以通过 JavaScript 使用 DOM 属性 window.name 存储一个相当大的数据（2-23M）。这个数据可以用来代替 Session Cookie 也是可以跨域的。这个技术可以和 JSON 对象一起使用来存储客户端上的复杂 Session 变量集合。

不足就是美国单独的窗口或者 Tab 页刚开始打开的时候会有一个空的 window.name 属性。而且，这个属性可以用来追踪不同站点的访问者。

在某些方面，这种方法可能比 Cookie 更加方便，因为它的内容不会像 Cookie 那样在每次请求的时候自动的发送给服务端，所以它不易收到网络 Cookie 嗅探攻击。然而如果不采用特殊的方法保护数据，它很容易受到其他攻击，因为数据可以被在同一个窗口或者 Tab 中打开的其他站点获取到。

#### 广告主标识码

苹果使用了追踪技术称为 **广告主标识码**（IDFA）。这种技术会给每个购买苹果产品的用户分配一个唯一标识。这个唯一标识会被苹果网络广告系统使用，来确定用户正在查看或者回复的广告。

#### ETag

因为浏览器会缓存 ETags，然后在后续的请求相同资源时返回，追踪服务器可以简单的复制从浏览器接受的任意 ETag 来确保 ETag 长久留存（就像持久化 Cookie 一样）。增加缓存头也可以加强 ETag 数据的保存。

在某些浏览器中可以通过清理缓存来清除 ETag 数据。

#### web 存储

一些 Web 浏览器支持持久化机制，允许页面本地存储信息以后使用。

HTML5 标准（绝大多数现代浏览器在某种程度上都支持）包含了一个 JavaScript API 叫做 Web storage：Local Storage 和 Session Storage。Local Storage 的行为和持久化 Cookie 类似，而 Session Storage 的行为和 Session Cookie 的行为类似，也就是 Session Storage 是绑定在一个单独的 Tab 或者窗口的生命周期中的（也就是页面 Session），而 Session Cookie 是针对整个浏览器的。

IE 支持在浏览器历史中持久化信息，在浏览器的收藏夹中，以一个 XML 格式存储，或者直接在页面中存储到硬盘。

一些 Web 浏览器插件也包含持久化机制。例如 Flash 有 Local shared object，Silverlight 有 Isolated storage。

#### 浏览器缓存

浏览器缓存也可以用来存储信息，利用这些信息也可以用来追踪用户。这项技术利用的真相是当浏览器判断出来缓存的已经是最新资源时可以利用缓存而不是重新从站点下载。

例如，一个站点托管了一个 JavaScript 文件，这个 JavaScript 文件可以给用户指定一个唯一标识（例如，`var userId = 3243242`）。只要用户访问之后，每次用户再访问这个页面时，这个文件都会从缓存中获取而不是从服务端获取。所以它的内容永远不会变。

#### 浏览器指纹

浏览器指纹是指浏览器配置信息的集合，例如版本号，屏幕分辨率，操作系统。指纹信息可以用来完全或者部分标识独立用户或者设备，即使 Cookie 已经被关闭了。

基本的 Web 浏览器配置信息一直都在被 Web 分析服务搜集为了精确的统计真实网络流量和不同类型的点击欺诈。在客户端脚本的帮助下，搜集更多的参数也是有可能的。

## 参考资料

- [预测最近面试会考 Cookie 的 SameSite 属性](https://juejin.im/post/5e718ecc6fb9a07cda098c2d)
- [浏览器系列之 Cookie 和 SameSite 属性](https://github.com/mqyqingfeng/Blog/issues/157)
