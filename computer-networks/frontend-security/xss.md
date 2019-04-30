# XSS 攻击

XSS 攻击全称**跨站脚本攻击**（Cross-Site Scripting），通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法在目标网站 HTML 页面注入恶意指令代码到网页，使用用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是 JavaScript，但实际上也可以包括 Java、VBScript、ActivieX、Flash 或者甚至是普通的 HTML。攻击成功后，攻击者可能得到更高的权限（如执行一些操作）、私密网页内容、会话和 Cookie 等各种内容。

**常见 XSS 攻击的危害**

1. 盗取各类用户账号
2. 控制企业数据，包括读取、篡改、添加、删除企业敏感数据的能力
3. 盗窃企业重要的具有商业价值的资料
4. 非法转账
5. 强制发送电子邮件
6. 网站挂马
7. 控制受害者机器向其他网站发起攻击

## 分类

### 存储型

存储型 XSS 攻击又称为**持久性跨站点脚本攻击**，它一般发生在 XSS 攻击向量（一般指 XSS 攻击代码）存储在网站数据库，当一个页面被用户打开的时候执行。持久型的 XSS 相比非持久型 XSS 攻击危害性更大，容易造成蠕虫，因为每当用户打开页面，查看内容时脚本将自动执行。

**攻击步骤**

1. 攻击者将恶意代码提交到目标网站的数据库中
2. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器
3. 用户浏览器接收到响应后解析之行，混在其中的恶意代码也被执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

### 反射型

反射型 XSS 攻击又称为**非持久性跨站点脚本攻击**。漏洞产生的原因是攻击者注入的数据反映在响应中。反射型 XSS 攻击要求用户访问一个被攻击者篡改后的链接，用户访问该链接时，被植入的攻击脚本被用户游览器执行，从而达到攻击目的。通过 URL 参数直接注入，然后在响应的数据中包含着危险的代码。

👣 **攻击步骤**

1. 攻击者构造出特殊的 URL，其中包含恶意代码
2. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，活着冒充用户的行为，调用目标网站接口执行攻击者指定的操作

🤼‍♂️ **反射型 XSS 跟存储型 XSS 的区别是？**

存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。

反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。

由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。

POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见。

### DOM 型

👣 DOM 型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 URL，其中包含恶意代码
2. 用户打开带有恶意代码的 URL
3. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

## 防御策略

XSS 攻击有两大要素：

* 攻击者提交恶意代码
* 浏览器执行恶意代码

Chrome 浏览器自带防御，可拦截反射型 XSS（HTML 内容和属性），JavaScript 脚本和富文本无法拦截。

### 预防存储型和反射型 XSS 攻击

存储型和反射型 XSS 都是在服务端取出恶意代码后，插入到响应 HTML 里的，攻击者刻意编写的「数据」被内嵌到「代码」中，被浏览器所执行。

预防这两种漏洞，有两种常见做法：

- 改成纯前端渲染，把代码和数据分隔开。
- 对 HTML 做充分转义。

#### 纯前端渲染

纯前端渲染的过程：

1. 浏览器先加载一个静态 HTML，此 HTML 中不包含任何跟业务相关的数据。
2. 然后浏览器执行 HTML 中的 JavaScript。
3. JavaScript 通过 Ajax 加载业务数据，调用 DOM API 更新到页面上。

在纯前端渲染中，我们会明确的告诉浏览器：下面要设置的内容是文本 `.innerText`，还是属性 `.setAttribute`，还是样式 `.style` 等等。如此，浏览器不会被轻易地被欺骗，执行预期外的代码。

但纯前端渲染还需注意避免 DOM 型 XSS 漏洞（例如 `onload` 事件和 `href` 中的 `javascript:xxx` 等。

在很多内部、管理系统中，采用纯前端渲染是非常合适的。但对于性能要求高，或有 SEO 需求的页面，我们仍然要面对拼接 HTML 的问题。

#### 输入过滤

输入过滤，对用户提交的数据进行有效性验证，仅接受指定长度范围内并符合我们期望格式的的内容提交，阻止或者忽略除此外的其他任何数据。

#### 输出转义

输出转义，当需要将一个字符串输出到 Web 网页时，同时又不确定这个字符串中是否包括 XSS 特殊字符，为了确保输出内容的完整性和正确性，输出 HTML 属性时可以使用 HTML 转义编码（HTMLEncode）进行处理，输出到 `<script>` 中，可以进行 JavaScript 编码。

如果拼接 HTML 是必要的，就需要采用合适的转义库，对 HTML 模板各处插入点进行充分的转义。

字符串类型的数据，需要针对 `<`、`>`、`/`、`'`、`"` 和 `&` 五个字符进行实体化转义。

| 特殊字符 | 实体编码 |
| -------- | -------- |
| `&`      | `&amp;`  |
| `<`      | `&lt;`   |
| `>`      | `&gt;`   |
| `"`      | `&quot;` |
| `'`      | `&#x27;` |
| `/`      | `&#x2F;` |

常用的模板引擎，如 doT.js、[ejs](<https://github.com/mde/ejs>)、FreeMarker 等，对于 HTML 转义通常只有一个规则，就是把 `<`、`>`、`/`、`'`、`"` 和 `&` 这几个字符转义掉，确实能起到一定的 XSS 防护作用，但并不完善：

| XSS 安全漏洞      | 简单转义是否有防护作用 |
| ----------------- | ---------------------- |
| HTML 标签文字内容 | 有                     |
| HTML 属性值       | 有                     |
| CSS 内联样式      | 无                     |
| 内联 JavaScript   | 无                     |
| 内联 JSON         | 无                     |
| 跳转链接          | 无                     |

### 预防 DOM 型 XSS 攻击

DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。

在使用 `.innerHTML`、`.outerHTML`、`document.write()` 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 `.textContent`、`.setAttribute()` 等。

如果用 Vue / React 技术栈，并且不使用 `v-html` / `dangerouslySetInnerHTML` 功能，就在前端 render 阶段避免 `innerHTML`、`outerHTML` 的 XSS 隐患。

DOM 中的内联事件监听器，如 `location`、`onclick`、`onerror`、`onload`、`onmouseover` 等，`<a>` 标签的 `href` 属性，JavaScript 的 `eval()`、`setTimeout()`、`setInterval()` 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。

```html
<!-- 内联事件监听器中包含恶意代码 -->
<img onclick="UNTRUSTED" onerror="UNTRUSTED" src="data:image/png,">

<!-- 链接内包含恶意代码 -->
<a href="UNTRUSTED">1</a>

<script>
// setTimeout()/setInterval() 中调用恶意代码
setTimeout("UNTRUSTED")
setInterval("UNTRUSTED")

// location 调用恶意代码
location.href = 'UNTRUSTED'

// eval() 中调用恶意代码
eval("UNTRUSTED")
</script>
```

如果项目中有用到这些的话，一定要避免在字符串中拼接不可信数据。

### 內容安全策略

**内容安全策略**（Content Security Policy，简称 CSP）是一种**可信白名单**作机制，来限制网站中是否可以包含某来源内容。该制度明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单，它的实现和执行全部由浏览器完成，开发者只需提供配置。

**启用 CSP 方式**

1. 设置 HTTP 头信息的 Content-Security-Policy 字段

```http
content-security-policy: default-scr https:; connect-src https:; font-src https: data:; frame-src https: twitter:; img-src https: data:; media-src https:; object-src https:; script-src 'unsafe-inline' 'unsafe-eval' https:; style-src 'unsafe-inline' https:; 
```

> Twitter 采用的内容安全策略，未详细列出

2. 通过网页 `<meta>` 标签

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:"
```

启用后，不符合 CSP 的外部资源就会被阻止加载。

严格的 CSP 在 XSS 的防范中可以起到下列的作用：

* 禁止加载外域代码，防止复杂的攻击逻辑
* 禁止外域提交，网站被攻击后，用户的数据不会泄漏到外域
* 禁止内联脚本执行（规则较严格，目前发现 Github 使用）
* 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）
* 合理使用上报可以及时发现 XSS，利于尽快修复问题

### HTTPOnly Cookie

使用 HttpOnly Cookie 将重要的 Cookie 标记为 `http-only`，这样的话当浏览器向 Web 服务器发起请求的时就会带上 Cookie 字段，但是在 JavaScript 脚本中却不能访问这个 Cookie，这样就避免了 XSS 攻击利用 JavaScript 的 `document.cookie` 获取 Cookie。

---

**参考资料：**

* [📖 MDN: 内容安全策略(CSP)](<https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP>)
* [📝 前端安全系列：如何防止 XSS 攻击?](https://juejin.im/post/5bad9140e51d450e935c6d64)
* [📝 Web 安全系列：XSS 攻击基础及原理](https://yq.aliyun.com/articles/638829)
* [📝 Web 安全系列：XSS 攻击进阶](https://yq.aliyun.com/articles/638935?spm=a2c4e.11153940.blogcont638829.21.74d874d3lHE0qK)
* [📝 Web 安全系列：XSS 攻击进阶](https://yq.aliyun.com/articles/641535?spm=a2c4e.11153940.blogcont638935.16.6e757039SLyW6B)
* [📝 Content Security Policy 入门教程](<http://www.ruanyifeng.com/blog/2016/09/csp.html>)