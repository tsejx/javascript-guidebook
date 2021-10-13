---
nav:
  title: 计算机网络
  order: 8
group:
  title: Web 安全
  order: 4
title: CSRF 跨站请求伪造攻击
order: 3
---

# CSRF 跨站请求伪造攻击

**跨站请求伪造**（Cross-site Request Forgery，简称 CSRF）是一种挟制用户在当前已登录的 Web 页面上执行非本意的操作的攻击方法。

CSRF 攻击的本质是利用 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充。

与 [XSS](./xss) 相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

## 攻击方式

CSRF 漏洞即利用网站权限校验漏洞在用户不知觉情况下发送请求，达到 **伪装** 用户的目的。

典型的 CSRF 攻击有着如下的流程：

1. 受害者登录 `a.com`，并保留了登录凭证 Cookie
2. 攻击者引诱受害者访问了 `b.com`
3. `b.com` 向 `a.com` 发送了一个请求：`a.com/act=xx`，浏览器会默认携带 `a.com` 的 Cookie
4. `a.com` 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求
5. `a.com` 以受害者的名义执行了 `act=xxx`
6. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 `a.com` 执行了自己定义的操作

攻击者利用 CSRF 实现的攻击主要方式：

- 攻击者能够欺骗受害用户完成该受害者所允许的任一状态改变的操作
  - 如：更新账号细节、完成购物、注销甚至登陆等操作
- 获取用户的隐私数据
- 配合其他漏洞攻击
- CSRF 蠕虫

### GET 类型

GET 类型的 CSRF 利用非常简单，只需要一个 HTTP 请求，一般会这样利用：

```html
<img src="http://bank.example/transfer?amount=10000&for=hacker" />
```

在受害者访问含有这个 `img` 的页面后，浏览器会自动向 `http://bank.example/transfer?account=xiaoming&amount=10000&for=hacker` 发出一次 HTTP 请求。`bank.example` 就会收到包含受害者登录信息的一次跨域请求。

### POST 类型

这种类型的 CSRF 利用起来通常使用的是一个自动提交的表单，如：

```html
<form action="http://bank.example/transfer" method="POST">
  <input type="hidden" name="account" value="xiaoming" />
  <input type="hidden" name="amount" value="10000" />
  <input type="hidden" name="for" value="hacker" />
</form>
<script>
  document.forms[0].submit();
</script>
```

访问该页面后，表单会自动提交，相当于模拟用户完成了一次 POST 操作。

POST 类型的攻击通常比 GET 要求更加严格一点，但仍并不复杂。任何个人网站、博客，被黑客上传页面的网站都有可能是发起攻击的来源，后端接口不能将安全寄托在仅允许 POST 上面。

### 链接类型

链接类型的 CSRF 并不常见，比起其他两种用户打开页面就中招的情况，这种需要用户点击链接才会触发。这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招，攻击者通常会以比较夸张的词语诱骗用户点击，例如：

```html
<a href="http://test.com/csrf/transfer.php?amount=1000&for=hacker" taget="_blank">重磅消息！！</a>
```

由于之前用户登录了信任的网站 A，并且保存登录状态，只要用户主动访问上面的这个 PHP 页面，则表示攻击成功。

### 攻击特点

- 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生
- 攻击利用受害者被攻击网站的登录凭证，冒充受害者提交操作，而不是直接窃取数据
- 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是 **冒用**
- 跨站请求可以用各种方式：图片 URL、超链接、CORS、Form 提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

对于服务器返回的结果，由于浏览器同源策略的限制，黑客也无法进行解析。因此，黑客无法从返回的结果中得到任何东西，他所能做的就是给服务器发送请求，以执行请求中所描述的命令，在服务器端直接改变数据的值，而非窃取服务器中的数据。所以，我们要保护的对象是那些可以直接产生数据改变的服务，而对于读取数据的服务，则不需要进行 CSRF 的保护。比如银行系统中转账的请求会直接改变账户的金额，会遭到 CSRF 攻击，需要保护。而查询金额是对金额的读取操作，不会改变数据，CSRF 攻击无法解析服务器返回的结果，无需保护。

## 防御策略

CSRF 通常从第三方网站发起，被攻击网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提升安全性。

上文中讲了 CSRF 的两个特点：

- CSRF（通常）发生在第三方域名
- CSRF 攻击者不能获取到 Cookie 等信息，只是使用

针对 CSRF 的特点制定防护策略：

- 阻止不明外域访问
  - 同源检测机制
    - `Origin`
    - `Referer`
  - Samesite Cookie
- 提交时要求附加本域才能获取的信息
  - CSRF Token
  - 双重 Cookie 验证
- 保证网络请求由真实用户发出
  - 用户操作限制

### 同源检测机制

既然 CSRF 大多来自第三方网站，那么我们就直接禁止外域（或者不受信任的域名）对我们发起请求。

在 HTTP 协议中，每个一部请求都会携带两个 Header，用于标记来源域名：

- Origin Header
- Referrer Header

这两个 Header 在浏览器发起请求时，大多数情况会自动带上，并且不能由前端自定义内容。服务器可以通过解析这两个 Header 中的域名，确定请求的来源域。

#### Origin

使用 Origin Header 确定来源域名。

在部分与 CSRF 有关的请求中，请求的 Header 中会携带 Origin 字段。字段内包含请求的域名，不包含 `path` 及 `query` 部分。

```http
Origin: http://foo.example
```

如果 Origin 存在，那么直接使用 Origin 中的字段确认来源域名就可以。

但是 Origin 在以下两种情况下并不存在：

- IE11 同源策略：IE11 不会在跨站 CORS 请求上添加 Origin 标头，Referrer 头仍然是唯一的标识。最根本原因是因为 IE11 对同源的定义和其他浏览器不同，有两个主要的区别，可以参考 [MDN Same-origin_policy#IE_Exceptions](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FSecurity%2FSame-origin_policy%23IE_Exceptions)
- 302 重定向：在 302 重定向之后 Origin 不包含在重定向的请求中，因为 Origin 可能会被认为是其他来源的敏感信息。对于 302 重定向的情况来说都是定向在新的服务器上的 URL，因此浏览器不想将 Origin 泄漏到新的服务器上。

#### Referrer

根据 HTTP 协议，在 HTTP 头中有一个字段叫 `referrer`，记录了该 HTTP 请求的来源地址。

- 对于 Ajax 请求，图片和脚本文件等资源请求，`referrer` 为发起请求的页面地址。
- 对于页面跳转，`referrer` 为打开页面历史记录的前一页面地址。

因此我们使用 Referrer 中链接的 Origin 部分可以得到 **请求的来源域名**。

这种方法并非万无一失，`referrer` 的值是由浏览器提供的，虽然 HTTP 协议上有明确的要求，但是每个浏览器对于 `referrer` 的具体实现可能有差别，并不能保证浏览器自身没有安全漏洞。使用验证 `referrer` 值的方法，就是把安全性都依赖于第三方（即浏览器）来保障，从理论上来讲，这样并不是很安全。在部分情况下，攻击者可以隐藏，甚至修改自己请求的 `referrer`。

新版 Referrer Policy 规定了五种 Referrer 策略：

- No Referrer：`no-referrer`
- No Referrer When Downgrade：`no-referrer-when-downgrade`
- Origin Only：`origin`
- Origin When Cross-orgin：`origin-when-crossorigin`
- Unsafe URL：`unsafe-url`

**使用 Referer Policy 的方式**

1. CSP 响应头，通过 `referrer` 指令和五种可选的指令值，来指定 Referrer 策略

```http
Content-Security-Policy: referrer no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|unsafe-url;
```

2. `<meta>` 元数据标签也可以指定 Referrer 策略

```html
<!-- 在任何情况下，仅发送文件的源作为引用地址 -->
<meta name="referrer" content="origin" />
```

3. 外链标签中的 `referrer` 属性

或者用 `<a>`、`<area>`、`<img>`、`<iframe>`、`<script>` 或者 `<link>` 标签元素上的 `referrerpolicy` 属性为其设置独立的请求策略。

```html
<a href="http://example.com" referrerpolicy="origin"></a>
```

另外也可以在 `<a>`、`<area>` 或者 `<link>` 元素上将 `rel` 属性设置为 `noreferrer`。

```html
<a href="http://example.com" referrer="no-referrer|origin|unsafe-url">xxx</a>
```

这种方式作用的只是这一个链接。并且，`<a>` 标签可用的 Referrer 策略只有三种：不传、只传 host 和都传。另外，这样针对单个链接设置的策略优先级比 CSP 和 `<meta>` 要高。

> 当 Origin 和 Referrer 头文件不存在时该怎么办？如果 Origin 和 Referrer 都不存在，建议直接进行阻止，特别是如果您没有使用随机 CSRF Token 作为第二次检查。

### CSRF Token

前面讲到 CSRF 的另一个特征是，攻击者无法直接窃取到用户的信息（Cookie，Header，网站内容等），仅仅是冒用 Cookie 中的信息。

而 CSRF 攻击之所以能够成功，是因为服务器误把攻击者发送的请求当成了用户自己的请求。那么我们可以要求所有的用户请求都携带一个 CSRF 攻击者无法获取到的 Token。服务器通过校验请求是否携带正确的 Token，来把正常的请求和攻击的请求区分开，也可以防范 CSRF 的攻击。

**实现原理**

CSRF Token 的防护策略分为三个步骤：

1. 将 CSRF Token 输出到页面中

首先，用户打开页面的时候，服务器需要给这个用户生成一个 Token，该 Token 通过加密算法对数据进行加密，一般 Token 都包括随机字符串和时间戳的组合，显然在提交时 Token 不能再放在 Cookie 中了，否则又会被攻击者冒用。因此，为了安全起见 Token 最好还是存在服务器的 Session 中，之后在每次页面加载时，使用 JS 遍历整个 DOM 树，对于 DOM 中所有的 a 和 form 标签后加入 Token。这样可以解决大部分的请求，但是对于在页面加载之后动态生成的 HTML 代码，这种方法就没有作用，还需要开发者在编码时手动添加 Token

2. 页面提交的请求携带这个 Token

对于 GET 请求，Token 将附在请求地址之后，这样 URL 就变成 `http://url?csrftoken=tokenvalue`。 而对于 POST 请求来说，要在 `form` 的最后加上：

```html
<input type="”hidden”" name="”csrftoken”" value="”tokenvalue”" />
```

这样，就把 Token 以参数的形式加入请求了。

3. 服务器验证 Token 是否正确

当用户从客户端得到了 `token`，再次提交给服务器的时候，服务器需要判断 `token` 的有效性，验证过程是先解密 `token`，对比加密字符串以及时间戳，如果加密字符串一致且时间未过期，那么这个 Token 就是有效的。

这种方法要比之前检查 `referer` 或者 `origin` 要安全一些，`token` 可以在产生并放于 Session 之中，然后在每次请求时把 `token` 从 Session 中拿出，与请求中的 `token` 进行比对，但这种方法的比较麻烦的在于如何把 `token` 以参数的形式加入请求。

下面将以 Egg.js 为例，介绍一些 CSRF Token 的服务端校验逻辑。

在同步渲染页面时，在表单请求中增加一个 `name` 为 `_csrf` 的 `url query`，值为 `ctx.csrf`，这样用户在提交这个表单的时候会将 CSRF token 提交上来：

```html
<form method="POST" action="/upload?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
  title: <input name="title" /> file: <input name="file" type="file" />
  <button type="submit">upload</button>
</form>
```

传递 CSRF Token 的字段可以在配置中改变：

```js
// config/config.default.js
module.exports = {
  security: {
    csrf: {
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
  },
};
```

为了防范 BREACH 攻击，通过同步方式渲染到页面上的 CSRF token 在每次请求时都会变化，egg-view-nunjucks 等 View 插件会自动对 Form 进行注入，对应用开发者无感知。

除了同步表单的 CSRF 校验，还有 AJAX 请求、Session vs Cookie 存储的使用方法，具体详情查阅 [安全威胁 CSRF 的防范](https://eggjs.org/zh-cn/core/security.html#%E5%AE%89%E5%85%A8%E5%A8%81%E8%83%81-csrf-%E7%9A%84%E9%98%B2%E8%8C%83)。

### 分布式校验

在大型网站中，使用 Session 存储 CSRF Token 会带来很大的压力。访问单台服务器 session 是同一个。但是现在的大型网站中，我们的服务器通常不止一台，可能是几十台甚至几百台之多，甚至多个机房都可能在不同的省份，用户发起的 HTTP 请求通常要经过像 Ngnix 之类的负载均衡器之后，再路由到具体的服务器上，由于 Session 默认存储在单机服务器内存中，因此在分布式环境下同一个用户发送的多次 HTTP 请求可能会先后落到不同的服务器上，导致后面发起的 HTTP 请求无法拿到之前的 HTTP 请求存储在服务器中的 Session 数据，从而使得 Session 机制在分布式环境下失效，因此在分布式集群中 CSRF Token 需要存储在 Redis 之类的公共存储空间。

由于使用 Session 存储，读取和验证 CSRF Token 会引起比较大的复杂度和性能问题，目前很多网站采用 Encrypted Token Pattern 方式。这种方法的 Token 是一个计算出来的结果，而非随机生成的字符串。这样在校验时无需再去读取存储的 Token，只用再次计算一次即可。

这种 Token 的值通常是使用 UserID、时间戳和随机数，通过加密的方法生成。这样既可以保证分布式服务的 Token 一致，又能保证 Token 不容易被破解。
在 token 解密成功之后，服务器可以访问解析值，Token 中包含的 UserID 和时间戳将会被拿来被验证有效性，将 UserID 与当前登录的 UserID 进行比较，并将时间戳与当前时间进行比较。

### 用户操作限制

CSRF 攻击过程中，用户是在不知情的情况下构造了网络请求，因此添加验证码能强制用户必须与应用进行交互，服务器通过验证码来识别是不是用户主动发送的请求，由于一定强度的验证码机器无法识别，因此危险网站不能伪造一个完整的请求。

- 优点：简洁有效，低成本
- 缺点：对用户不友好，无法给所有的操作都加上验证码

### 防御策略总结

简单总结上文的防御策略：

- CSRF 的自动防御策略：同源检测（Origin 和 Referrer 验证）
- CSRF 的主动防御策略：CSRF Token 验证、双重 Cookie 验证和 Samesite Cookie
- 保证页面的幂等性，后端接口不要在 GET 页面中做用户操作

## 参考资料

- [📝 前端安全系列：如何防止 CSRF 攻击?](https://juejin.im/post/5bc009996fb9a05d0a055192)
- [📝 CSRF 攻击的应对之道](https://juejin.im/entry/58802eb58fd9c50067dd746b)
- [📝 CSRF 漏洞详细说明](https://juejin.im/entry/5b1e4575f265da6e2c19fd57)
- [📝 JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
