---
nav:
  title: BOM
  order: 5
group:
  title: 离线与存储 API
  order: 12
title: HTTP Cache
order: 2
---

# HTTP Cache

📖 **快速目录：**

- [HTTP Cache](#http-cache)
  - [缓存类型](#缓存类型)
  - [强缓存](#强缓存)
    - [强缓存规则](#强缓存规则)
    - [强缓存首部字段](#强缓存首部字段)
      - [Expires](#expires)
      - [Cache-Control](#cache-control)
  - [协商缓存](#协商缓存)
    - [协商缓存规则](#协商缓存规则)
    - [协商缓存首部字段](#协商缓存首部字段)
      - [Last-Modified](#last-modified)
      - [If-Modified-Since](#if-modified-since)
      - [If-Unmodified-Since](#if-unmodified-since)
      - [ETag](#etag)
      - [If-None-Match](#if-none-match)
      - [If-Match](#if-match)
  - [启发式缓存阶段](#启发式缓存阶段)
  - [其他缓存字段](#其他缓存字段)
    - [Pragma](#pragma)
    - [Date](#date)
    - [Age](#age)
    - [Vary](#vary)
  - [最佳优化策略](#最佳优化策略)
    - [缓存资源类型](#缓存资源类型)
    - [用户行为分析](#用户行为分析)
    - [阻止浏览器缓存静态资源](#阻止浏览器缓存静态资源)
  - [HTTP 缓存总结](#http-缓存总结)
  - [参考资料](#参考资料)

## 缓存类型

浏览器与服务器通信的方式为应答模式，即：**浏览器发起 HTTP 请求 – 服务器响应该请求**。

浏览器首次向服务器发起该请求后拿到请求结果，会根据响应报文中 HTTP 头的缓存标识，决定是否缓存结果，简单的过程如下图：

```jsx | inline
import React from 'react';
import img from '../../assets/http-cache/browser-cache-process-analysis.jpg';

export default () => <img alt="浏览器缓存过程分析" src={img} width={720} />;
```

由上图我们可以知道：

- 浏览器每次发起请求，都会先在浏览器缓存中**查找**该请求的结果以及缓存标识
- 浏览器每次拿到返回的请求结果都会将该结果和缓存标识**存入**浏览器缓存中

以上两点结论就是浏览器缓存机制的关键，他确保了每个请求的缓存存入与读取，只要我们再理解浏览器缓存的使用规则，那么所有的问题都迎刃而解了，本文也将围绕着这点进行详细分析。

为了方便大家理解，这里我们根据是否需要向服务器重新发起 HTTP 请求将缓存过程分为两个部分，分别是**强缓存**和**协商缓存** 。

强缓存如果命中缓存则不需要和服务器端发生交互，而协商缓存不管是否命中都要和服务器端发生交互。强缓存的优先级高于协商缓存。

| HTTP 缓存 | HTTP 状态码 | 缓存位置   | 谁来决定   | 是否有效                  |
| :-------- | :---------- | :--------- | :--------- | :------------------------ |
| 强缓存    | 200         | 本地浏览器 | 本地浏览器 | F5 刷新无效，强制刷新无效 |
| 协商缓存  | 304         | 本地浏览器 | 服务器     | F5 刷新有效，强制刷新无效 |

## 强缓存

**强缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程**。

强缓存的情况主要有三种（暂不分析协商缓存过程）。

- **不存在**该缓存结果和缓存标识，强制缓存**失效**，则直接向服务器发起请求（跟首次发起请求一致）

```jsx | inline
import React from 'react';
import img from '../../assets/http-cache/invalid-cache-control-and-request-resource.jpg';

export default () => <img alt="强制缓存失效向服务器请求" src={img} width={720} />;
```

- **存在**该缓存结果和缓存标识，但该**结果已失效**，强缓存失效，则使用协商缓存（暂不分析）

```jsx | inline
import React from 'react';
import img from '../../assets/http-cache/invalid-cache-control-and-use-consult-cache.jpg';

export default () => <img alt="强制缓存失效使用协商缓存" src={img} width={720} />;
```

- 存在该缓存结果和缓存标识，且该结果尚未失效，强制缓存生效，直接返回该结果

```jsx | inline
import React from 'react';
import img from '../../assets/http-cache/invalid-cache-control.jpg';

export default () => <img alt="强制缓存失效" src={img} width={720} />;
```

<br />

```http
Age:23146
Cache-Control: max-age=2592000
Date: Tue, 28 Nov 2017 12:26:41 GMT
ETag: W/"5a1cf09a-63c6"
Expires: Thu, 28 Dec 2017 05:27:45 GMT
Last-Modified: Tue, 28 Nov 2017 05:14:02 GMT
Vary: Accept-Encoding
```

以上请求头来自百度首页某个 CSS 文件的响应头。我去除了一些和缓存无关的字段，只保留了以上部分。我们来分析下，[Expires](#expires) 是 HTTP/1.0 中的定义缓存的字段，它规定了缓存过期的一个绝对时间。Cache-Control 是 HTTP/1.1 定义的关于缓存的字段，max-age 为 [Cache-Control](#cache-control) 字段的其中一个指令，它规定了缓存过期的一个相对时间。

这就是**强缓存阶段**，当浏览器再次试图访问这个 CSS 文件，发现有这个文件的缓存，那么就会根据上一次的响应判断是否过期，如果没过期，则使用该缓存。

### 强缓存规则

**强制缓存的缓存规则是什么？**

当浏览器向服务器发起请求时，服务器会将缓存规则放入 HTPP 响应报文的响应头（HTTP Header）中和请求结果一起返回给浏览器，控制强制缓存的字段分别是 Expires 和 Cache-Control，其中 Cache-Control 优先级比 Expires 高。

⚠️ **注意**：强制缓存的过期时间通过第一次访问服务器时返回的响应头获取。在 HTTP/1.0 和 HTTP/1.1 版本中通过不同的响应头字段实现。

**浏览器的缓存存放在哪里，如何在浏览器中判断强制缓存是否生效？**

```jsx | inline
import React from 'react';
import img from '../../assets/http-cache/browser-cache-location.jpg';

export default () => <img alt="浏览器缓存位置" src={img} width={720} />;
```

这里我们以博客的请求为例，状态码为**灰色**的请求则代表使用了强制缓存，请求对应的 Size 值则代表该缓存存放的位置，分别为 **from memory cache**  和  **from disk cache**。

**内存缓存（from memory cache）和硬盘缓存（from disk cache）对比**

- **内存缓存（from memory cache）**：内存缓存具有两个特点，分别是**快速读取**和**时效性**
  - **快速读取**：内存缓存会将编译解析后的文件，直接存入该进程的内存中，占据该进程的内存中，占据该进程一定的内存资源，以便下次运行使用时的快速读取
  - **时效性**：一旦该进程关闭，则该进程的内存则会清空
- **硬盘缓存（from disk cache）**：硬盘缓存则是直接将缓存写入硬盘文件中，读取缓存需要对该缓存存放的硬盘文件进行 I/O 操作，然后重新解析该缓存内容，读取复杂，速度比内存缓存慢。

在浏览器中，浏览器会在 JavaScript 脚本和图片等文件解析后直接存入内存缓存中，那么刷新页面时只需直接从内存缓存中读取（from memory cache）；而 CSS 文件则会存入硬盘文件中，所以每次渲染页面都需要从硬盘读取缓存（from disk cache）。

强制缓存只有首次请求才会与服务器通信，读取缓存资源时不会发出任何请求，资源的  Status  状态码为  200，资源的  Size  为  `from memory`  或者  `from disk` ，HTTP1.1 版本的实现优先级会高于 HTTP/1.0 版本的实现。

### 强缓存首部字段

用于强缓存的首部字段包括 [Expires](#expires) 和 [Cache-Control](#cache-control)。

#### Expires

Expires 字段用于告知客户端缓存资源过期失效的绝对时间，该字段值为 GMT 格式的时间字符串。

```http
Expires: Tue, 01 Jan 2019 12:00:00 GMT
```

- 发起请求时间超过 Expires 设定时间，即表示资源缓存时间到期，会发送请求到服务器重新获取资源
- 发起请求时间在 Expires 设定时间之前，浏览器会直接读取本地缓存数据库中的信息（form memory 或 from disk）

同样可以在 HTML 文件里直接使用：

```html
<meta http-equiv="expires" content="Thu, 30 Nov 2017 11:17:26 GMT" />
```

如果设置的时间是过去的时间，则刷新页面会重新发送请求。

🔴 **弊端**：Expires 控制缓存的原理是使用客户端的时间与服务端返回的时间做对比，如果如果客户端与服务端的时间因为某些原因（例如时区不同；客户端和服务的有一方的时间不准确）发生误差，那么强制缓存则会直接失效，这样的话强制缓存的存在则毫无意义，因此到了 HTTP/1.1，Expires 被 Cache-Control 替代。

#### Cache-Control

通过 Cache-Control 首部字段的指令可以控制告诉客户端或是服务器如何处理缓存。

| 指令            | 参数               | 说明                                |
| :-------------- | :----------------- | :---------------------------------- |
| no-cache        | 无                 | 强制资源服务器再次验证              |
| no-store        | 无                 | 不缓存请求或是响应的任何内容        |
| max-age=[秒]    | 缓存时长，单位是秒 | 缓存的时长，也是响应的最大的 Age 值 |
| min-fresh=[秒]  | 必需               | 期望在指定时间内响应仍然有效        |
| no-transform    | 无                 | 代理不可更改媒体类型                |
| only-if-cached  | 无                 | 从缓存获取                          |
| cache-extension | -                  | 新的指令标记（token）               |

**响应指令**：

| 指令             | 参数               | 说明                                                           |
| :--------------- | :----------------- | :------------------------------------------------------------- |
| public           | 无                 | 任意一方都能缓存该资源（客户端、代理服务器等）                 |
| private          | 可省略             | 只能特定用户缓存该资源（仅客户端可以缓存，代理服务器不可缓存） |
| no-cache         | 可省略             | 缓存前必需先确认其有效性                                       |
| no-store         | 无                 | 不缓存请求或响应的任何内容                                     |
| no-transform     | 无                 | 代理不可更改媒体类型                                           |
| must-revalidate  | 无                 | 可缓存但必须再向源服务器进行确认                               |
| proxy-revalidate | 无                 | 要求中间缓存服务器（代理）对缓存的响应有效性再进行确认         |
| max-age=[秒]     | 缓存时长，单位是秒 | 缓存的时长，也是响应的最大的 Age 值                            |
| s-maxage=[秒]    | 必需               | 公共缓存服务器响应的最大 Age 值                                |
| cache-extension  | -                  | 新指令标记（token）                                            |

⚠️ **注意**： `no-cache` 指令很多人误以为是不缓存，这是不准确的，`no-cache` 的意思是可以缓存，但每次使用缓存前应该去向服务器验证缓存是否可用。`no-store` 才是不缓存内容。另外部分指令也可以组合使用。

```http
Cache-Control: max-age=100, must-revalidate, public
```

上面指令的意思是缓存的有效时间为 100 秒，之后访问需要向服务器发送请求验证，此缓存可被代理服务器和客户端缓存。

一般来说，为了兼容，两个版本的强制缓存都会被实现。

```jsx | inline
import React from 'react';
import img from '../../assets/http-cache/cache-control.jpg';

export default () => <img alt="Cache-Control" src={img} width={720} />;
```

由上面的例子我们可以知道：

- HTTP 响应报文中 Expires 的时间值，是一个绝对值
- HTTP 响应报文中 Cache-Control 为 max-age=600，是相对值

由于 Cache-Control 的优先级比 Expires 高，那么直接根据 Cache-Control 的值进行缓存，意思就是说在 600 秒内再次发起该请求，则会直接使用缓存结果，强制缓存生效。

⚠️ **注意**：在无法确定客户端的时间是否与服务端的时间同步的情况下，Cache-Control 相比于 Expires 是更好的选择，所以同时存在时，只有 Cache-Control 生效。

## 协商缓存

**协商缓存即强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。**

而协商缓存与强制缓存的不同之处在于，协商缓存每次读取数据时都需要跟服务器通信，并且会增加缓存标识。

- 在第一次请求服务器时，服务器会返回资源，并且返回一个资源的缓存标识，一起存到浏览器的缓存数据库。
- 当第二次请求资源时，浏览器会首先将缓存标识发送给服务器，服务器拿到标识后判断标识是否匹配
  - 如果缓存标识不匹配，表示资源有更新，服务器会将新数据和新的缓存标识一起返回到浏览器
  - 如果缓存标识匹配，表示资源没有更新，并且返回 304 状态码，浏览器就读取本地缓存服务器中的数据。

<br/>

- 协商缓存**生效**，返回 304

```jsx | inline
import React from 'react';
import img from '../../assets/http-cache/consult-cache-and-response-304.png';

export default () => <img alt="协商缓存生效返回304" src={img} width={720} />;
```

- 协商缓存**失效**，返回 200 和请求结果

```jsx | inline
import React from 'react';
import img from '../../assets/http-cache/consult-cache-and-response-200.jpg';

export default () => <img alt="协商缓存失效返回200" src={img} width={720} />;
```

### 协商缓存规则

在 HTTP 协议的 1.0 和 1.1 版本中也有不同的实现方式。

在 HTTP/1.0 版本中，首次请求资源时服务器通过 [Last-Modified](#last-modified) 来设置响应头的缓存标识，并且把资源最后修改的时间作为值填入，然后将资源返回给浏览器。当再次请求时，浏览器会首先带上 [If-Modified-Since](#if-modified-since) 请求头去访问服务器，服务器会将 If-Modified-Since 中携带的时间与资源修改的时间匹配。

- 如果时间不一致，服务器会返回新的资源，并且将 Last-Modified 值**更新**❗️，作为响应头返回给浏览器，状态码为 200，响应体 Body 中为修改后的资源内容。
- 如果时间一致，表示资源没有更新，服务器返回 304 状态码，浏览器拿到响应状态码后从本地缓存数据库中读取缓存资源。

🔴 **弊端**：这种方式有一个弊端，就是当服务器中的资源增加了一个字符，后来又把这个字符删掉，本身资源文件并没有发生变化，但修改时间发生了变化。当下次请求过来时，服务器也会把这个本来没有变化的资源重新返回给浏览器。

📌 因此，在 HTTP/1.1 版本中，使用 [ETag](#etag) 和 [If-None-Match](#if-none-match) 作为缓存是否更新的标识。

当浏览器访问资源时，服务器会根据资源计算出一个哈希值，并随 ETag 响应头返回，当浏览器再次需要访问资源时，携带  If-None-Match  请求头，服务器再次计算该资源的 ETag 值。

- 如果资源有改变，则返回状态码 200 ，Body 为新的资源体。
- 如果资源没有改变，则返回状态码 304，Body 为空，并继续使用原有缓存。

| 响应头       | 请求头            | 可选值   | 优先级             | 优缺点                                                                 |
| :----------- | :---------------- | :------- | :----------------- | :--------------------------------------------------------------------- |
| LastModified | If-Modified-Since | GMT 时间 | 依次比较，排序靠后 | 修改并不意味着改变；秒级判断                                           |
| ETag         | If-None-Match     | 校验值   | 依次比较，先比较   | 使用系统默认的 Hash 算法，再分布式部署中会导致不同服务器的 ETag 值一直 |

### 协商缓存首部字段

协商缓存首部字段包括：

- HTTP/1.0
  - 资源响应头：[Last-Modified](#last-modified)
  - 协商请求头：[If-Modified-Since](#if-modified-since)、[If-Unmodified-Since](#if-unmodified-since)
- HTTP/1.1
  - 资源响应头：[ETag](#etag)
  - 协商请求头：[If-None-Match](#if-none-match)、[If-Match](#if-match)

#### Last-Modified

Last-Modified 首部字段用于表示请求资源的最后一次修改时间，该字段值为 GMT 格式的时间字符串。该字段不光用于协商缓存，在启发式缓存阶段同样起到至关重要的作用。

在浏览器**首次请求**某个 URL 时，服务器端的返回状态码会是 200，响应的实体内容是客户端请求的资源，同时有一个 Last-Modified 的属性标记此文件在服务器端最后被修改的时间。

```http
last-modified : Fri , 12 May 2006 18:53:33 GMT
```

<br />

```jsx | inline
import React from 'react';
import img from '../../assets/http-cache/last-modified.jpg';

export default () => <img alt="Last-Modified" src={img} width={720} />;
```

🔴 **弊端**：使用 Last-Modified 无法准确地判断资源是否真的被修改，比如某个文件在 1 秒内频繁更改了多次，或者当服务器中的资源增加了一个字符，后来又把这个字符删掉，资源文件本身的实际内容并没有发生变化，但修改时间却发生了变化，而当下次请求过来时，服务器也会把这个本来没有变化但最后修改时间已经变化了的资源重新返回给浏览器。

#### If-Modified-Since

当浏览器再次请求这个 URL 的时候，根据 HTTP 协议规定，浏览器会把上次请求返回的 Last-Modified 值存储在 If-Modified-Since 里面发送给服务端，告诉服务器该资源上次请求返回的最后被修改时间。服务器收到该请求后，发现请求头含有 If-Modified-Since 字段，则会根据 If-Modified-Since 的字段值与该资源在服务器的最后被修改时间来判断两次访问期间资源是否有被修改，从而决定是否返回完整的资源。

- 若服务器的资源最后被修改时间晚于 If-Modified-Since 的字段值（时间字符串），则重新返回资源，状态码为 200
- 否则则只返回响应头，状态码 304，代表资源无更新，告知浏览器资源的本地缓存仍可使用。

```http
If-Modified-Since : Fri , 12 May 2006 18:53:33 GMT
```

#### If-Unmodified-Since

这个字段字面意思和 If-Modified-Since 相反，但处理方式并不是相反的。如果文件在两次访问期间没有被修改则返回 200 和网页资源，如果文件修改了则返回状态码 412（预处理错误）。

**用途：**

- 与含有 If-Range 消息头的范围请求搭配使用，实现断点续传的功能，即如果资源没修改继续下载，如果资源修改了，续传的意义就没有了。
- POST、PUT 请求中，优化并发控制，即当多用户编辑用一份文档的时候，如果服务器的资源已经被修改，那么在对其作出编辑会被拒绝提交。

#### ETag

ETag 表示服务端生成的资源唯一标识（比如 MD5 标识），是 **Entity Tag（实体标签）** 的缩写。HTTP/1.1 协议并没有规范该值如何生成，一般而言为该资源的散列值。

```http
etag: W/"abc-123456"
```

ETag 的值有可能包含一个 `W/` 前缀，来提示应该采用弱比较算法（这个是画蛇添足，因为 If-None-Match 用且仅用这一算法）。

#### If-None-Match

If-None-Match 是客户端再次发起该请求时，携带上次请求返回的唯一标识 ETag 值，通过此字段值告诉服务器该资源上次请求返回的唯一标识值，以判断缓存资源是否有效。

```http
If-None-Match: abc-123456
```

- 对于 GET 或 HEAD 请求，当且仅当服务器上没有任何资源的 ETag 首部字段与这个首部中列出的相匹配的时候，服务器端才会返回所请求的资源，响应状态码为 200。如果没有资源的 ETag 值相匹配，那么返回 04 状态码。但是不管如何，都至少返回 Cache-Control、Content-Location、Date、ETag、Expires 和 Vary 中之一的字段。
- POST、PUT 等请求改变文件的请求，如果没有资源的 ETag 值相匹配，那么返回 412 状态码。

⚠️ 注意：ETag / If-None-Match 优先级高于 Last-Modified / If-Modified-Since，同时存在则只有 ETag / If-None-Match 生效。

#### If-Match

表示条件请求，携带上一次请求中资源的 ETag，服务器根据这个字段判断文件是否有新的修改

在请求方法为 GET 和 HEAD 的情况下，服务器仅在请求的资源满足此首部列出的 ETag 之一时才会返回资源。而对于 PUT 或其它非安全方法来说，只有满足条件的情况下才可以将资源上传。

**用途：**

- For GET 和 HEAD 方法，搭配 Range 头字段使用，可以用来保证新请求的范围与之前请求的范围是对同一份资源的请求。如果 ETag 无法匹配，那么需要返回 416（范围请求无法满足）响应。
- 对于 PUT 或者其他不安全的请求，If-Match 首部可以用来避免更新丢失问题。它可以用来检测用户想要上传的不会覆盖获取原始资源之后做出的更新。如果请求的条件不满足，那么需要返回 412（预处理错误）响应。

当然和 Last-Modified 相比，ETag 也有自己的缺点，比如由于需要对资源进行生成标识，性能方面就势必有所牺牲。

**关于强校验和弱校验：**

| ETag1   | ETag2   | Strong Comparison | Weak Comparison |
| :------ | :------ | :---------------- | :-------------- |
| `W/"1"` | `W/"1"` | no match          | match           |
| `W/"1"` | `W/"2"` | no match          | no match        |
| `W/"1"` | `"1"`   | no match          | match           |
| `"1"`   | `"1"`   | match             | match           |

ETag 主要为了解决 Last-Modified 无法解决的一些问题：

1. 一些文件也许会周期性的更改，但是他的内容并不改变（仅仅改变的修改时间），这个时候我们并不希望客户端认为这个文件被修改了
2. 某些文件修改非常频繁，比如在秒以下的时间内进行修改，（比方说 1 秒内修改了 N 次），Last-Modified 能检查到的粒度是秒级的，这种修改无法判断（或者说 UNIX 记录 MTIME 只能精确到秒）
3. 某些服务器不能精确的得到文件的最后修改时间

总的来说，ETag 是 Last-Modifed 的补充，比 Last-Modified 更加严谨。但设定了 Etag 之后，每次客户端发出请求，服务端都会根据资源重新生成一个 ETag，相对来说，对性能会有影响。

## 启发式缓存阶段

```http
Age: 23146
Cache-Control: public
Date: Tue, 28 Nov 2017 12:26:41 GMT
Last-Modified: Tue, 28 Nov 2017 05:14:02 GMT
Vary: Accept-Encoding
```

如果 `Expires`、`Cache-Control: max-age` 或 `Cache-Control:s-maxage` 都没有在响应头中出现，并且也没有其他缓存设置，那么浏览器默认会采用一个**启发式算法**，会根据响应头中两个个时间字段 Date 和 Last-Modified 之间的时间差值，取其值的 10% 作为缓存时间的周期。

这就是 **启发式缓存阶段**。这个阶段很容让人忽视，但实际上每时每刻都在发挥着作用。所以在今后的开发过程中如果遇到那种**默认缓存**的坑，不要叫嚣，不要生气，浏览器只是在遵循启发式缓存协议而已。

## 其他缓存字段

### Pragma

Pragma 是 HTTP/1.1 之前版本遗留的通用首部字段，仅作为于 HTTP/1.0 的向后兼容而使用。虽然它是一个通用首部，但是它在响应报文中时的行为没有规范，依赖于浏览器的实现。RFC 中该字段只有 `no-cache` 一个可选值，会通知浏览器不直接使用缓存，要求向服务器发请求校验新鲜度。**因为它优先级最高，当存在时一定不会命中强缓存。**

Pragma 属于通用首部字段，在客户端上使用时，常规要求我们往 HTML 上加上上面这段 meta 元标签。

```html
<meta http-equiv="Pragma" content="no-cache" />
```

事实上这种禁用缓存的形式用处很有限：

- 仅有 IE 才能识别这段 `<meta>` 标签含义，其它主流浏览器仅能识别 `Cache-Control: no-store` 的 `<meta>`标签

- 在 IE 中识别到该 `<meta>` 标签含义，并不一定会在请求字段加上 Pragma，但的确会让当前页面每次都发新请求（仅限页面，页面上的资源则不受影响）。——[浅谈浏览器 HTTP 的缓存机制](https://link.juejin.im/?target=http%3A%2F%2Fwww.cnblogs.com%2Fvajoy%2Fp%2F5341664.html)

服务端响应添加 `Progma: no-cache`，浏览器表现行为和强制刷新类似。

### Date

Date 首部字段表示响应报文生成的日期时间，请求经过代理服务器时，返回的 Date 未必是最新的，通常这个时候，代理服务器将增加一个 Age 字段告知该资源已缓存了多久。

该字段也用于 [启发式缓存阶段](#启发式缓存阶段) 的计算。

### Age

Age 首部字段表示资源在缓存代理服务器中已缓存的时长，单位为秒（取决于 `max-age` 和 `s-maxgae` 的大小）。若出现此字段，表示已命中代理服务器的缓存。

```http
Age: 2383321
Date: Wed, 08 Mar 2017 16:12:42 GMT
```

以上 HTTP 报文表示代理服务器在 `2017年3月8日16:12:42` 时向源服务器发起了对该资源的请求，目前缓存代理服务器已缓存该资源 2383321 秒。

### Vary

Vary 首部字段用于表示代理服务器缓存的管理信息。

对于服务器而言，资源文件可能不止一个版本，比如说压缩和未压缩，针对不同的客户端，通常需要返回不同的资源版本。比如说老式的浏览器可能不支持解压缩，这个时候，就需要返回一个未压缩的版本；对于新的浏览器，支持压缩，返回一个压缩的版本，有利于节省带宽，提升体验。那么怎么区分这个版本呢，这个时候就需要 Vary 了。

服务器通过指定 `Vary: Accept-Encoding`，告知代理服务器，对于这个资源，需要缓存两个版本：压缩和未压缩。这样老式浏览器和新的浏览器，通过代理，就分别拿到了未压缩和压缩版本的资源，避免了都拿同一个资源的尴尬。

```http
Vary: Accept-Encoding, User-Agent
```

如上设置，代理服务器将针对是否压缩和浏览器类型两个维度去缓存资源。如此一来，同一个 URL，就能针对 PC 和 Mobile 返回不同的缓存内容。

## 最佳优化策略

因为协商缓存本身也有 HTTP 请求的损耗，所以最佳优化策略是要尽可能的将静态文件存储为较长的时间，多利用强缓存而不是协商缓存，即消灭 304。

但是给文件设置一个很长的 Cacha-Control 也会带来其他的问题，最主要的问题是静态内容更新时，用户不能及时获得更新的内容。这时候就要**使用 Hash 的方法对文件进行命名**，通过每次更新不同的静态文件名来消除强缓存的影响。

### 缓存资源类型

回到实际应用上来，首先要明确哪些内容适合被缓存哪些不适合。

考虑缓存的内容：

- CSS 样式文件
- JS 文件
- Logo、图标
- HTML 文件
- 可以下载的内容

一些不应该被缓存的内容：

- 业务敏感的 GET 请求

### 用户行为分析

| 用户操作     | Expires/Cache-Control | Last-Modified/Etag |
| :----------- | :-------------------- | :----------------- |
| 地址栏回车   | 有效                  | 有效               |
| 页面链接跳转 | 有效                  | 有效               |
| 新开窗口     | 有效                  | 有效               |
| 前进、后退   | 有效                  | 有效               |
| F5 刷新      | 无效                  | 有效               |
| Ctrl+F5 刷新 | 无效                  | 无效               |

协商缓存每次请求都会与服务器交互，第一次是拿数据和标识的过程，第二次开始，就是浏览器询问服务器资源是否有更新的过程。每次请求都会传输数据，如果命中缓存，则资源的  Status 状态码为  304  而不是  200 。同样的，一般来讲为了兼容，两个版本的协商缓存都会被实现，HTTP/1.1  版本的实现优先级会高于  HTTP/1.0  版本的实现。

### 阻止浏览器缓存静态资源

实际上，工作中很多场景都需要避免浏览器缓存，除了浏览器隐私模式，请求时想要禁用缓存，还可以设置请求头：`Cache-Control: no-cache, no-store, must-revalidate`。

当然，还有一种常用做法：即给请求的资源增加一个版本号。

```html
<link rel="stylesheet" type="text/css" href="../css/style.css?version=1.8.9" />
```

这样做的好处就是你可以自由控制什么时候加载最新的资源。

不仅如此，HTML 也可以禁用缓存，即在页面的节点中加入标签。

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
```

上述虽能禁用缓存，但只有部分浏览器支持，而且由于代理不解析 HTML 文档，故代理服务器也不支持这种方式。

## HTTP 缓存总结

强制缓存优先于协商缓存进行，若强制缓存（Expires 和 Cache-Control）生效则直接使用缓存，若不生效则进行协商缓存（Last-Modified / If-Modified-Since 和 Etag / If-None-Match），协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，重新获取请求结果，再存入浏览器缓存中；生效则返回 304，继续使用缓存，主要过程如下：

```jsx | inline
import React from 'react';
import img from '../../assets/http-cache/browser-cache.jpg';

export default () => <img alt="浏览器缓存机制示意图" src={img} width={720} />;
```

**HTTP 缓存常用字段**

| 缓存类型 | HTTP/1.0                                            | HTTP/1.1                               |
| :------- | :-------------------------------------------------- | :------------------------------------- |
| 强缓存   | Expires                                             | Cache-Control                          |
| 协商缓存 | 响应头：Last-Modified<br/>请求头：If-Modified-Since | 响应头：ETag<br/>请求头：If-None-Match |

## 参考资料

- [掘金：缓存详解](https://juejin.im/post/5a6c87c46fb9a01ca560b4d7)
- [浏览器缓存机制剖析](http://web.jobbole.com/91084/)
- [彻底理解浏览器的缓存机制](https://www.cnblogs.com/duiniweixiao/p/8884274.html)
- [10 分钟彻底搞懂 HTTP 的强制缓存和协商缓存](https://segmentfault.com/a/1190000016199807)
