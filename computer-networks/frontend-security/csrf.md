# CSRF 攻击

跨站点请求伪造（Cross-site request forgery，CSRF）是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。

与 [XSS](xss.md) 相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

## 攻击方式

CSRF 漏洞即利用网站权限校验漏洞在用户不知觉情况下发送请求，达到「**伪装**」用户的目的。

攻击者利用 CSRF 实现的攻击主要方式：

* 攻击者能够欺骗受害用户完成该受害者所允许的任一状态改变的操作
  * 如：更新账号细节、完成购物、注销甚至登陆等操作
* 获取用户的隐私数据
* 配合其他漏洞攻击
* CSRF 蠕虫

## 攻击特点

* 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生
* 攻击利用受害者被攻击网站的登录凭证，冒充受害者提交操作，=而不是直接窃取数据
* 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是「冒用」

CSRF 攻击时黑客借助受害者的 Cookie 骗取服务器的信任，但是黑客并不能拿到 Cookie，也看不到 Cookie 的内容。

另外，对于服务器返回的结果，由于浏览器同源策略的限制，黑客也无法进行解析。因此，黑客无法从返回的结果中得到任何东西，他所能做的就是给服务器发送请求，以执行请求中所描述的命令，在服务器端直接改变数据的值，而非窃取服务器中的数据。所以，我们要保护的对象是那些可以直接产生数据改变的服务，而对于读取数据的服务，则不需要进行 CSRF 的保护。比如银行系统中转账的请求会直接改变账户的金额，会遭到 CSRF 攻击，需要保护。而查询金额是对金额的读取操作，不会改变数据，CSRF 攻击无法解析服务器返回的结果，无需保护。

## 防御策略

CSRF 通常从第三方网站发起，被攻击网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提升安全性。

针对 CSRF 的特点制定防护策略：

* 阻止不明外域访问
  * 同源检测机制
    * Origin
    * Referrer
* 提交时要求附加本域才能获取的信息
  * 额外验证机制
* 保证网络请求由真实用户发出
  * 用户操作限制

### 同源检测机制

既然 CSRF 大多来自第三方网站，那么我们就直接禁止外域（或者不受信任的域名）对我们发起请求。

在 HTTP 协议中，每个一部请求都会携带两个 Header，用于标记来源域名：

* Origin Header
* Referrer Header

这两个 Header 在浏览器发起请求时，大多数情况会自动带上，并且不能由前端自定义内容。服务器可以通过解析这两个 Header 中的域名，确定请求的来源域。

#### Origin

使用 Origin Header 确定来源域名。

在部分与 CSRF 有关的请求中，请求的 Header 中会携带 Origin 字段。字段内包含请求的域名，不包含 `path` 及 `query` 部分。

```http
Origin: http://foo.example
```

如果 Origin 存在，那么直接使用 Origin 中的字段确认来源域名就可以。

但是 Origin 在以下两种情况下并不存在：

* IE11 同源策略：IE11 不会在跨站 CORS 请求上添加 Origin 标头，Referrer 头仍然是唯一的标识。最根本原因是因为 IE11 对同源的定义和其他浏览器不同，有两个主要的区别，可以参考 [MDN Same-origin_policy#IE_Exceptions](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FSecurity%2FSame-origin_policy%23IE_Exceptions)
* 302 重定向：在 302 重定向之后 Origin 不包含在重定向的请求中，因为 Origin 可能会被认为是其他来源的敏感信息。对于 302 重定向的情况来说都是定向在新的服务器上的 URL，因此浏览器不想将 Origin 泄漏到新的服务器上。

#### Referrer

根据 HTTP 协议，在 HTTP 头中有一个字段叫  Referrer，记录了该 HTTP 请求的来源地址。

* 对于 Ajax 请求，图片和脚本文件等资源请求，Referrer 为发起请求的页面地址。
* 对于页面跳转，Referrer 为打开页面历史记录的前一页面地址。

因此我们使用 Referrer 中链接的 Origin 部分可以得到**请求的来源域名**。

这种方法并非万无一失，Referrer 的值是由浏览器提供的，虽然 HTTP 协议上有明确的要求，但是每个浏览器对于 Referrer 的具体实现可能有差别，并不能保证浏览器自身没有安全漏洞。使用验证 Referrer 值的方法，就是把安全性都依赖于第三方（即浏览器）来保障，从理论上来讲，这样并不是很安全。在部分情况下，攻击者可以隐藏，甚至修改自己请求的 Referrer。

新版 Referrer Policy 规定了五种 Referrer 策略：No Referrer、No Referrer When Downgrade、Origin Only、Origin When Cross-orgin 和 Unsafe URL。

**使用 Referer Policy 的方式**

1. CSP 响应头，通过 `referrer` 指令和五种可选的指令值，来指定 Referrer 策略

```http
Content-Security-Policy: referrer no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|unsafe-url;
```

2. `<meta>` 标签也可以指定 Referrer 策略

```html
<meta name="referrer" content="no-referrer|no-referrer-when-downgrade|origin|origin-when-crossorigin|unsafe-url">
```

3. `<a>` 标签的 `referrer` 属性

```html
<a href="http://example.com" referrer="no-referrer|origin|unsafe-url">xxx</a>
```

这种方式作用的只是这一个链接。并且，`<a>` 标签可用的 Referrer 策略只有三种：不传、只传 host 和都传。另外，这样针对单个链接设置的策略优先级比 CSP 和 `<meta>` 要高。

❓ **无法确认来源域名情况**

当 Origin 和 Referrer 头文件不存在时该怎么办？

如果 Origin 和 Referrer 都不存在，建议直接进行阻止，特别是如果您没有使用随机 CSRF Token 作为第二次检查。

### 额外验证机制

前面讲到 CSRF 的另一个特征是，攻击者无法直接窃取到用户的信息（Cookie，Header，网站内容等），仅仅是冒用 Cookie 中的信息。

而 CSRF 攻击之所以能够成功，是因为服务器误把攻击者发送的请求当成了用户自己的请求。那么我们可以要求所有的用户请求都携带一个 CSRF 攻击者无法获取到的 Token。服务器通过校验请求是否携带正确的 Token，来把正常的请求和攻击的请求区分开，以起到防范 CSRF 的攻击。

**随机字符串**

为每一个提交增加一个随机串参数，该参数服务端通过页面下发，每次请求的时候补充到提交参数中，服务端通过校验该参数是否一致来判断是否是用户请求。由于 CSRF 攻击中攻击者是无从事先得知该随机字符串的值，所以服务端就可以通过校验该值拒绝请求。

**JSON 网络令牌**

实际上除了 session 登陆之外，现在越来越流行 JWT（JSON Web Token） 登录校验。该方式是在前端记录登陆 Token，每次请求的时候通过在 Header 中添加认证头的方式来实现登录校验过程。由于 CSRF 攻击中攻击者无法知道该 Token 值，通过这种方式也可以防止 CSRF 攻击。

### 用户操作限制

CSRF 攻击过程中，用户是在不知情的情况下构造了网络请求，因此添加验证码能强制用户必须与应用进行交互，服务器通过验证码来识别是不是用户主动发送的请求，由于一定强度的验证码机器无法识别，因此危险网站不能伪造一个完整的请求。

- 优点：简洁有效，低成本
- 缺点：对用户不友好，无法给所有的操作都加上验证码

---

**参考资料**

* [📝 前端安全系列：如何防止 CSRF 攻击?](https://juejin.im/post/5bc009996fb9a05d0a055192)
* [📝 CSRF 攻击的应对之道](https://juejin.im/entry/58802eb58fd9c50067dd746b)
* [📝 CSRF 漏洞详细说明](https://juejin.im/entry/5b1e4575f265da6e2c19fd57)
* [📝 JSON Web Token 入门教程](<http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html>)





