---
nav:
  title: 计算机网络
  order: 8
group:
  title: HTTP
  order: 3
title: HTTP CSP 内容安全策略
order: 16
---

# HTTP CSP 内容安全策略

内容安全策略 (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。

CSP 是一种由开发者定义的安全性政策性申明，通过 CSP 所约束的规则指定可信的内容来源（这里的内容可以指脚本、图片、`iframe`、`font`、`style` 等等可能的远程的资源）。通过 CSP 协定，让 Web 处于一个安全的运行环境中。

为使 CSP 可用，需要配置网络服务器返回 `Content-Security-Policy` HTTP 头部。

除此之外，`<meta>` 元素也可以用于配置该策略：

```html
<meta http-equiv="Content-Security-Policy" />
```

## 指令选项

### 资源加载指令

通过获取指令来控制某些可能被加载的确切的资源类型的位置：

CSP 策略在默认的情况下是不允许使用 `data URIs` 资源的，如果要使用，那么需要显示的指定：

- `script-src`：在处理脚本资源的时候设置 `unsafe-inline` 可以阻止内联 Js 代码的执行，使用 `unsafe-eval` 开关可以禁止 `eval`、`setTimeout`、`setInterval` 函数的执行
- `style-src`：会控制样式表@import 和 rel 时所引入的 URI 资源，设置 unsafe-inline 规则可以是浏览器拒绝解析内部样式和内联样式定义。并不会阻止链入外部样式表。
- `img-src`：可以控制图片资源的连接，包括 `img` 标签的 `src` 属性，以及 CSS3 中的 `url()` 和 `image()` 方法，以及 `link` 标签中的 `href` 属性（当 `rel` 设置成与图像相关的值，比如 HTML 支持的 icon）
- `font-src`：控制 CSS 中的 `@font-face` 加载的字体源地址
- `frame-src`：设置允许通过类似 `<frame>` 和 `<iframe>` 标签加载的内嵌内容的源地址
- `manifest-src`：限制应用声明文件的源地址
- `media-src`：控制媒体类型的外部链入资源，如 `<audio>`、`<video>`、`<source>` 和 `<track>` 标签的 `src` 属性
- `object-src`：控制 `<embed>`、`<code>`、`<archive>`、`<applet>` 等对象
- `prefetch-src`：指定预加载或预渲染的允许源地址
- `connect-src`：控制 XMLHttpRequest 中的 `open()`、WebSocket、EventSource

另外 `inline script` 和 `eval` 类型函数（包括 `eval`、`setInterval`、`setTimeout` 和 `new Function()`）也是不被执行的。

### default-src

`default-src` 用于设置上面各个选项的默认值。

```http
Content-Security-Policy: default-src 'self'
```

上面代码限制所有外部资源，只能从当前渔民该加载。

如果同时设置某个单项限制（比如 `font-src`）和 `default-src`，前者会覆盖后者，即字体文件会采用 `font-src` 的值，其他资源依然采用 `default-src` 的值。

### 其他限制

其他一些安全相关的功能，也放在了 CSP 里面：

- `block-all-mixed-content`：HTTPS 网页不得加载 HTTP 资源（浏览器已经默认开启）
- `upgrade-insecure-requests`：自动将网页上所有加载外部资源的 HTTP 链接换成 HTTPS 协议
- `plugin-types`：限制可以使用的插件格式
- `sandbox`：浏览器行为的限制，比如不能有弹出窗口等。

### report-uri

有时，我们不仅希望防止 XSS，还希望记录此类行为。`report-uri` 就用来告诉浏览器，应该把注入行为报告给哪个网址。

```http
Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;
```

上面代码指定，将注入行为报告给 `/my_amazing_csp_report_parser` 这个 URL。

浏览器会使用 `POST` 方法，发送一个 `JSON` 对象，下面是一个例子。

```json
{
  "csp-report": {
    "document-uri": "http://example.org/page.html",
    "referrer": "http://evil.example.com/",
    "blocked-uri": "http://evil.example.com/evil.js",
    "violated-directive": "script-src 'self' https://apis.google.com",
    "original-policy": "script-src 'self' https://apis.google.com; report-uri http://example.org/my_amazing_csp_report_parser"
  }
}
```

## 选项值

每个限制选项可以设置以下几种值，这些值就构成了白名单。

- **主机名**：`example.org`、`https://example.com:443`
- **路径名**：`example.org/resources/js/`
- **通配符**：`*.example.org`、`*://*.example.com:*`（表示任意协议、任意子域名、任意端口）
- **协议名**：`https:`、`data:`
- **关键字 `'self'`**：当前域名，需要加引号
- **关键字 `'none'`**：禁止加载任何外部资源，需要加引号

多个值也可以并列，用空格分隔。

```http
Content-Security-Policy: script-src 'self' https://apis.google.com
```

如果同一个限制选项使用多次，只有第一次会生效。

```http
# 错误的写法
Content-Security-Policy: script-src https://host1.com; script-src https://host2.com

# 正确的写法
Content-Security-Policy: script-src https://host1.com https://host2.com
```

## script-src 的特殊值

除了常规值，`script-src` 还可以设置一些特殊值。注意，下面这些值都必须放在单引号里面。

- `unsafe-inline`：允许执行页面内嵌的 `&lt;script>` 标签和事件监听函数
- `unsafe-eval`：允许将字符串当作代码执行，比如使用 `eval`、`setTimeout`、`setInterval` 和 `Function` 等函数。
- `nonce` 值：每次 HTTP 回应给出一个授权 token，页面内嵌脚本必须有这个 token，才会执行
- `hash` 值：列出允许执行的脚本代码的 Hash 值，页面内嵌脚本的哈希值只有吻合的情况下，才能执行。

`nonce` 值的例子如下，服务器发送网页的时候，告诉浏览器一个随机生成的 `token`。

```http
Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'
```

页面内嵌脚本，必须有这个 token 才能执行。

```html
<script nonce="EDNnf03nceIOfn39fn3e9h3sdfa">
  // some code
</script>
```

`hash` 值的例子如下，服务器给出一个允许执行的代码的 `hash` 值。

```http
Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='
```

下面的代码就会允许执行，因为 hash 值相符。

```html
<script type="text/javascript">
  alert('Hello, world.');
</script>
```

注意，计算 `hash` 值的时候，`<script>` 标签不算在内。

除了 `script-src` 选项，`nonce` 值和 `hash` 值还可以用在 `style-src` 选项，控制页面内嵌的样式表。

## 参考资料

- [📖 内容安全策略（CSP）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
- [📝 Content Security Policy 入门教程](http://www.ruanyifeng.com/blog/2016/09/csp.html)
- [📝 Content Security Policy（CSP）是什么？为什么它能抵御 XSS 攻击？](https://www.zhihu.com/question/21979782)
