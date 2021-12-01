---
nav:
  title: 计算机网络
  order: 8
group:
  title: HTTP
  order: 3
title: HTTP 内容协商
order: 7
---

# HTTP 内容协商

在 HTTP 协议中，**内容协商机制** 指通过为相同 URI 指向的资源提供不同的展现形式，可以使用户代理选择与用户需求相适应的最佳匹配（例如：文档使用的自然语言、图片的格式或者内容编码形式）。

## 基本原则

```jsx | inline
import React from 'react';
import img from '../../assets/http/http-content-negotiation.png';

export default () => <img alt="HTTP 内容协商机制的基本原则" src={img} width={520} />;
```

最佳展示形式的选取可以通过两种机制实现：

- 客户端设置特定的 HTTP 首部字段（标准方式）
- 服务端返回 300（Multiple Choices）状态码或者 406（Not Acceptable）状态码（备选方案）

### 服务端驱动型内容协商机制

```jsx | inline
import React from 'react';
import img from '../../assets/http/http-content-negotiation-proactive.png';

export default () => <img alt="服务端驱动型内容协商机制" src={img} width={520} />;
```

在服务端驱动型协商机制或者主动协商机制中，浏览器（或者其他任何类型的用户代理）会随同 URL 发送一系列的消息头。这些消息头描述了用户倾向的选择。服务器则以此为线索，通过内部算法来选择最佳方案提供给客户端。

### 代理驱动型内容协商机制

```jsx | inline
import React from 'react';
import img from '../../assets/http/http-content-negotiation-reactive.png';

export default () => <img alt="代理驱动型内容协商机制" src={img} width={520} />;
```

在协商机制中，每一个特性需要对应一个首部。如果想要使用屏幕大小、分辨率或者其他方面的特性，就需要创建一个新的首部。而且在每一次请求中都必须发送这些首部。在首部很少的时候，这并不是问题，但是随着数量的增多，消息体的体积会导致性能的下降。带有精确信息的首部发送的越多，信息熵就会越大，也就准许了更多 HTTP 指纹识别行为，以及与此相关的隐私问题的发生。

从 HTTP 协议制定之初，该协议就准许另外一种协商机制：代理驱动型内容协商机制，或称为响应式协商机制。

在这种协商机制中，当面临不明确的请求时，服务器会返回一个页面，其中包含了可供选择的资源的链接。资源呈现给用户，由用户做出选择。

不幸的是，HTTP 标准没有明确指定提供可选资源链接的页面的格式，这一点阻碍了将这一过程无痛自动化。除了退回至服务端驱动型内容协商机制外，这种自动化方法几乎无一例外都是通过脚本技术来完成的，尤其是 JavaScript 重定向技术：在检测了协商的条件之后，脚本会触发重定向动作。另外一个问题是，为了获得实际的资源，需要额外发送一次请求，减慢了将资源呈现给用户的速度。

## 常见协商要素

### 质量因子

质量因子 `q`：内容的质量、可接受类型的优先级

1. 内容质量。举例，客户端发起一个图片的请求，这个图片只供快速浏览用的，那么就可以做非常高的压缩比，这时的质量 `q` 就可以比较低。如果这个图片用作医学的，那么 `q` 就比较大，因为不能容忍医用照片模糊以损失大量的细节。
2. 可接受类型的优先级。举例：有一个 URI 即支持中文，又支持英文。但是希望优先显示中文，就能用 `q` 来表示。

### 媒体类型

媒体资源的 MIME 类型及质量因子

```http
Accept: text/html, application/xhtml+xml,application/xml;q=0.9,_/_;q=0.8
Axxept: text/html, application/xhtml+xml,application/xml;1=0.9,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3
```

### 编码类型

内容编码：主要指压缩算法

```http
Accept-Encoding: gzip. deflate, br
```

### 表述语言

```http
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
```

## 资源表述头部字段

### 媒体类型编码

```http
Content-Type: text/html; charset=utf-8
```

### 内容编码

```http
Content-Encoding: gzip
```

### 表述语言

```http
Content-Language: de-DE, en-CA
```

## 参考资料

- [📖 MDN：HTTP 内容协商](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Content_negotiation)
