---
nav:
  title: 计算机网络
  order: 8
group:
  title: HTTP
  order: 3
title: HTTPS
order: 20
---

# HTTPS

**超文本传输安全协议**（Hyper Text Transfer Protocol over Secure Socket Layer，HTTPS），是一种通过计算机网络进行安全通信的传输协议。HTTPS 经由 HTTP 进行通信，但利用 <span style="font-weight:bold;color:red">SSL / TLS</span> 来加密数据包。HTTPS 开发的主要目的，是提供对网站服务器的身份认证，保护交换数据的隐私与完整性。

```js
HTTPS = HTTP + SSL（加密 + 认证 + 完整性保护）
```

HTTP 协议采用明文传输信息，存在信息窃听、信息篡改和信息劫持的风险，而协议 SSL / TLS 具有**身份验证**、**信息加密**和**完整性校验**的功能，可以避免此类问题发生。

SSL / TLS 全称安全传输层协议 Transport Layer Security，是介于 TCP 和 HTTP 之间的一层安全协议，不影响原有的 TCP 协议和 HTTP 协议，所以使用 HTTPS 基本上不需要对 HTTP 页面进行太多的改造。

## 安全问题

使用 HTTP 协议通信存在的问题：

- **窃听**：通信内容不经加密有可能<span style="font-weight:bold;color:red">被第三方捕获</span>
- **伪造**：第三方拦截通信内容，并<span style="font-weight:bold;color:red">伪装成发送方</span>向接收方发送通信内容
- **否认**：发送方将<span style="font-weight:bold;color:red">恶意数据</span>发送给接受方并否认这些数据是它发送的

窃听属于数据加密问题，而伪造和否认则属于身份认证问题。

### 窃听

```jsx | inline
import React from 'react';
import img from '../../assets/https/eavesdropping.jpg';

export default () => <img alt="窃听" src={img} width={720} />;
```

### 伪造

```jsx | inline
import React from 'react';
import img from '../../assets/https/forge.jpg';

export default () => <img alt="伪造" src={img} width={720} />;
```

### 否认

```jsx | inline
import React from 'react';
import img from '../../assets/https/deny.png';

export default () => <img alt="否认" src={img} width={720} />;
```

## 解决方案

对通信内容进行加密的解决方案：

- **对称加密**：使用相同密钥加密/解密，但是钥匙交付问题无法解决
- **非对称加密**：公钥加密数据，私钥解密数据，但是加密/解密消耗时间较多
- **混合加密**：公钥加密密钥，密钥加密数据，私钥解密密钥，密钥解密数据（非对称传送密钥，密钥传送数据）。解决非对称加密效率问题
- **中间人攻击**：秘密替换公钥窃取数据，源于服务端无法确认客户端公钥是否合法
- **消息鉴别码**：`MAC` 密钥和密文组成的字符串的哈希值。能够解决 `伪造` 问题，但无法解决 `否认` 问题
- **数字签名**：服务端创建数字签名，而客户端只验证签名是否争取。解决 `否认` 问题
- **数字证书**：由权威机构背书创建证书，保证公钥不被篡改。解决 `中间人攻击` 问题

### 对称加密

**对称加密算**法（Symmetric Key Algorithms）加密使用的密钥和解密使用的密钥是相同的。也就是说，加密和解密都是使用的同一个密钥。因此对称加密算法要保证安全性的话，密钥要做好保密，只能让使用的人知道，不能对外公开。

```jsx | inline
import React from 'react';
import img from '../../assets/https/symmetric-encryption.jpg';

export default () => <img alt="对称加密" src={img} width={720} />;
```

**对称密钥加密**一个很重要的特点就是使用相同的密钥进行加密和解密

```jsx | inline
import React from 'react';
import img from '../../assets/https/symmetric-encryption-problem.jpg';

export default () => <img alt="对称密钥交付问题" src={img} width={720} />;
```

假设 B 是没有解密钥匙，所以 A 需要通过互联网将钥匙发送给 B。

但是 X 也有可能看到并获取到这个钥匙，因此，X 也可以通过这个钥匙来解密密文。

上面这个场景就会引出一个新问题，这个问题被称为**钥匙交付问题**，那怎么解决这个问题？

### 非对称加密

为了解决上面的**钥匙交付问题**，我们这里引入一个新的方法 —— **非对称加密**（Asymmetric Key Algorithms）

- 用于加密的密钥被称为**公钥**，用于解密的密钥被称为**私钥**
- 跟**对称加密**相比，公开密钥加密往往**需要更多的时间**用于加密和解密

**非对称加密过程**

接收方 B 创建一个公钥和一个私钥，公钥被发送给 A。

```jsx | inline
import React from 'react';
import img from '../../assets/https/asymmetric-encryption-creation.jpg';

export default () => <img alt="非对称加密过程-创建" src={img} width={720} />;
```

- A 使用从 B 收到的公钥加密数据，将密文发送给 B
- B 使用私钥解密从 A 接收到的密文，得到原始数据

```jsx | inline
import React from 'react';
import img from '../../assets/https/asymmetric-encryption-transport.jpg';

export default () => <img alt="非对称加密过程-传输" src={img} width={720} />;
```

在这个过程中：

- 密文和公钥也可能被恶意第三方 X 截获
- 但是私钥是 B 保存的，X 无法获取到，自然没有办法解密密文
- 这样就很好的解决了**钥匙交付问题**

**公开密钥加密的问题**

1. 加密和解密都需要耗费时间，有一种叫**混合加密**的方法可以解决这个问题
2. 公开密钥的可靠性

### 混合加密

```jsx | inline
import React from 'react';
import img from '../../assets/https/mixed-encryption.jpg';

export default () => <img alt="混合加密" src={img} width={720} />;
```

混合密钥加密分为两个步骤：

- 通过公开密钥加密传递密钥
- 通过速度更快的对称密钥加密方法传递数据

### 中间人攻击

中间人攻击（Man In the Middle Attack）。

为了更好地理解公开密钥加密的可靠性问题，我们回到传递公钥的场景。

```jsx | inline
import React from 'react';
import img from '../../assets/https/man-in-the-middle-attack.jpg';

export default () => <img alt="中间人攻击" src={img} width={720} />;
```

A 拿到的其实是 X 发送给他的伪造公钥，但是 A 无法察觉。

```jsx | inline
import React from 'react';
import img from '../../assets/https/man-in-the-middle-attack-2.jpg';

export default () => <img alt="中间人攻击2" src={img} width={720} />;
```

最后，X 用他自己的密钥加密响应数据，并发送给 A，就这样，虽然 A、B 双方能顺利完成通信，但是恶意的第三方 X 能看到解密后的请求数据和响应数据，而 A、B 双方则毫不知情。

中间人攻击的攻击方式：

- 域名污染：DNS 解析的中间链点返回中间人错误 IP
- ARP 欺骗

潜在的中间人攻击威胁：

- 浏览器弹出的证书警告，可能访问的是钓鱼网站或假冒的服务器
- 公共 Wifi 下，没有 HTTPS 加密的网站不要随便登录
- 在任何网站登录账号必须走 HTTPS 加密协议

### 消息鉴别码

消息鉴别码（Message Authentication Code，简写 MAC）是一种用于确认消息完整性（数据不会被篡改）和可靠性（消息认证是确认消息来自正确的发送者）的技术。消息鉴别码可以理解为**密钥**和**密文**组成的字符串的**哈希值**。

```jsx | inline
import React from 'react';
import img from '../../assets/https/mac.jpg';

export default () => <img alt="消息鉴别码" src={img} width={720} />;
```

消息鉴别码虽然可以解决<span style="font-weight:bold;color:red">伪造</span>问题，但是仍然无法避免**否认**问题。

### 数字签名

为了解决这个<span style="font-weight:bold;color:red">否认</span>问题，我们接下来看看**数字签名**方法。

数据发送方通过约定的哈希函数从数据报文中生成报文摘要（Digest），然后利用私钥对报文摘要进行加密，这个加密后的摘要将作为报文的**数字签名**和**数据报文**一起发送给接收方。

数据接收方首先使用与发送方一致的哈希函数从接收到的原始报文中计算出报文摘要，接着再用发送方的公钥对数字签名进行解密，得出摘要。如果摘要相同，那么接收方就能确认该数字签名是发送方的。

```jsx | inline
import React from 'react';
import img from '../../assets/https/digital-sign.jpg';

export default () => <img alt="数字签名" src={img} width={720} />;
```

### 数字证书

虽然上面的方法已经能避免窃听、伪造、否认等问题，但是现在还是没办法避免**中间人攻击**，因为我们还是没办法验证公钥的所有者，因此我们需要<span style="font-weight:bold;color:red">数字证书</span>系统来验证公钥的所有者。

接下来，先看看数字证书申请的过程，我们将数字证书认证机构（Certificate Authority）称之为 CA。

**数字证书申请过程：**

1. 服务器方向第三方机构 CA **提交公钥**、**组织信息**、**个人信息（域名）** 等信息并申请认证

2. CA 通过线上、线下等多种手段验证申请者提供信息的真实性，如组织是否存在、企业是否合法、是否拥有域名的所有权等

3. 如信息审核通过，CA 会向申请者签发认证文件证书。证书包含以下信息：**申请者公钥**、**申请者的组织**和**个人信息**、**签发机构 CA 的信息**、**有效时间**、**证书序列号**等信息的明文，同时包含**数字签名**。

数字签名通过**散列函数**计算公开的明文信息的**信息摘要**，然后，采用 CA 提供的私钥对信息摘要进行加密，加密后的信息摘要即为**数字签名**

```jsx | inline
import React from 'react';
import img from '../../assets/https/digital-certificate.jpg';

export default () => <img alt="数字证书" src={img} width={720} />;
```

现在 B 已经申请到一个数字证书了，那么怎么使用数字证书来检验公钥 PB 是属于 B 呢。

**数字证书校验流程：**

1. 客户端向服务端发送请求时，服务端返回数字证书文件
2. 客户端读取证书中的相关的明文信息，采用与加密时相同的**散列函数**计算得到信息摘要，然后利用内置客户端中的受信任的 CA 公钥解密数字签名，对比证书的信息摘要

   - 如果一致，则可以确认证书的合法性，即公钥合法
   - 如果不一致，则可以确认证书为非法，即公钥非法
   - 如果 CA 不被信任，则找不到对应 CA 证书，证书也会被判定为非法，即公钥非法

3. 客户端验证证书相关的域名信息、有效时间等信息

```jsx | inline
import React from 'react';
import img from '../../assets/https/digital-certificate-2.jpg';

export default () => <img alt="数字证书2" src={img} width={720} />;
```

现在可以验证 PB 是属于 B 的，但是怎么验证 PC 是属于受信任的 CA 的呢。

```jsx | inline
import React from 'react';
import img from '../../assets/https/digital-certificate-3.jpg';

export default () => <img alt="数字证书3" src={img} width={720} />;
```

事实上，认证机构形成一个树形结构，高级别的权威机构为较低级别的机构创建证书，那就是说，如果要验证的话，就是一级一级向上认证，信任链条的最终是 Root CA，他采用自签名，对他的签名是无条件的信任。

```jsx | inline
import React from 'react';
import img from '../../assets/https/digital-certificate-4.jpg';

export default () => <img alt="数字证书4" src={img} width={720} />;
```

## 工作流程

HTTPS 在传输数据之前需要客户端（浏览器）与服务端之间进行一次握手，在握手过程中将确立双方加密传输数据的密码信息。TLS/SSL 协议使用**非对称加密**、**对称加密**以及 **HASH 算法**确保信息通信的安全。

```jsx | inline
import React from 'react';
import img from '../../assets/https/workflow.jpg';

export default () => <img alt="HTTPS Workflow" src={img} width={720} />;
```

**具体流程：**

1. **Client Hello**：客户端发起 HTTPS 请求。

   - 不同的客户端对不同的加密算法的支持度不同，因此客户端会将支持的一套**加密套件**（Cipher Suite）发送给服务端（除了加密组合方式，报文中还包括 TLS 的协议版本、随机生成的密码串记为 Random1、会话 ID、域名 ServerName 以及签名算法）

2. **Server Hello**：服务端从客户端支持的加密规则中选用一组加密算法（包括用于生成通信密钥的算法），并随机生成密码串记为 Random2，后续将数据传回客户端。

   - **Certificate**：服务端收到 Client Hello 之后，向客户端发送 CA 认证的数字证书，用来鉴别服务端身份信息，同时还要生成一个 **随机数** 同时保存在服务端和发送给客户端。证书包含 **网站信息**、**由 CA 私钥加密的通信公钥**，以及 **经证书的颁发机构的私钥加密产生的数字签名** 等信息。
   - **Server Hello Done**：表示服务端宣告第一阶段的客户端服务端握手协商结束
   - 可选：**Certificate Request**：必要情况下，要求客户端发送证书验证身份
   - 可选：**Server Key Exchange**：如果 CA 认证的数字证书提供的信息不够，服务端还可发送提供补充信息

3. **Client Finish**

   - **Client Key Exchange**
     - 客户端收到 CA 数字证书并通过验证，然后通过 CA 公钥解密获取到 **服务端公钥**
     - 客户端先读取数字证书中相关的明文信息，采用相同的 Hash 函数计算得到**信息摘要**，然后利用内置在客户端中的对应的 CA 的公钥解密**数字签名**数据，并与数字证书的摘要进行对比
       - 如果一致，则证书合法，即公钥合法（如果证书受信任，则客户端地址栏会显示小锁头）
       - 如果不一致，则证书非法，即公钥非法（如果证书不受信任，则会提示用户证书存在问题）
     - 如果证书受信任，客户端会根据两个 pubkey 随机数生成一串随机数的密钥记为 Pre-Master 随机数，并利用两次 Hello 报文产生的两个随机数 Random1 和 Random2，利用对称密钥生成算法生成对称密钥 `enc_key = Func(Random1, Random2, Pre-Master)`（即**消息鉴别码**：即用于终端数据交互的<span style="font-weight:bold;color:red">对称密钥</span>），并用证书中提供的服务端公钥加密该随机数
     - **传送加密信息**：使用约定好的 HASH 算法计算握手信息，并使用**对称密钥**对消息进行加密，最后将之前生成的所有信息发送给服务端
   - **Change Cipher Spec**：该报文通知服务端，此后的通信都将使用协商好的加密算法计算对称密钥进行加密通信（也就是使用两个随机数以及第三个 Pre-master key/secret 随机数一起算出一个对称密钥 **session key/secret**）
   - **Finished** 报文：该报文包括连接至此的所有报文的校验值，使用服务端公钥进行加密
   - 可选：**ClientCertificate** 报文：如果服务端请求，客户端需要发送 CA 数字证书
   - 可选：**CertificateVerify** 报文：服务端如果要求 CA 数字证书，那么需要通过 HASH 算法计算一个服务端发送来的信息摘要

4. **Server Finish**：使用私钥将信息解密取出密钥，使用密钥解密客户端发来的握手信息，并验证 HASH 是否与浏览器发来的一致

   - **New Session Ticket**：服务端最后对客户端发送过来的 Finished 报文使用服务端私钥进行解密校验
   - **Change Cipher Spec**：报文通知服务端，此后的通信都将使用协商好的加密算法计算对称密钥 session key/secret 进行加密通信
   - **Finished** 报文：标志 TLS 连接建立成功

5. 浏览器解密并计算握手信息的 Hash，如果与服务端发来的 Hash 一致，此时握手过程结束，之后所有的通信数据将由之前客户端生成的对称密钥并利用堆成加密算法进行加密

这里客户端与服务端互相发送加密的握手消息并验证，目的是为了保证双方都获得了一致的密码，并且可以正常的加密解密数据，为后续真正数据的传输做一次测试。

客户端取出提前内置在手机内部的认证机构的公钥

2. 用认证机构的公钥去解密公钥证书里的数字签名 从而得到数字指纹
3. 客户端对公钥证书的服务器公钥进行 数字摘要算法 从而生成数字指纹
4. 对比客户端自己生成的数字指纹(第 3 步)和解密得到的数字指纹(第 2 步)是否一致 如果一致则公钥证书验证通过 就可以进行接下来的握手步骤了

> - Client Hello 包含域名的信息是比较特别的，因为域名是工作在应用层 HTTP 里的，而握手是发生在 TLS 还在传输层。在传输层里面就把域名信息告诉服务端，好让服务器根据域名发送相应的证书。

## 相关算法

### 散列函数

常见的散列函数 Hash 算法：[MD5](https://zh.wikipedia.org/wiki/MD5)、[SHA1](https://zh.wikipedia.org/wiki/SHA-1)、[SHA256](https://zh.wikipedia.org/wiki/SHA%E5%AE%B6%E6%97%8F)

散列函数特点是函数单向不可逆转、对输入非常敏感、输出长度固定，针对数据的任何修改都会改变散列函数的结果，用于**防止信息篡改**并**验证数据的完整性**。

在信息传递过程中，散列函数不能单独实现信息信息防篡改，因为**明文传输**，中间人可以修改信息之后重新计算信息摘要，因此需要对传输的信息以及信息摘要进行加密。

### 对称加密

常见的对称加密算法：[AES-CBC](https://zh.wikipedia.org/wiki/AES指令集)、[DES](https://zh.wikipedia.org/wiki/%E8%B3%87%E6%96%99%E5%8A%A0%E5%AF%86%E6%A8%99%E6%BA%96)、[3DES](https://zh.wikipedia.org/wiki/3DES)、[RC4](https://zh.wikipedia.org/wiki/RC4)

相同的密钥可以用于信息的加密和解密，掌握密钥才能获取信息，能够防止信息窃听，通信方式是 1 对 1。

对称加密的优势是信息传输 1 对 1，需要共享相同的密码，密码的安全是保证信息安全的基础，服务器和 N 个客户端通信，需要维持 N 个密码记录，且缺少修改密码的机制。

### 非对称加密

常见非对称加密算法：[RSA](https://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95)、DSA / DSS

密钥成对出现，一般称为公钥（公开）和私钥（保密），公钥加密的信息只能私钥解开，私钥加密的信息只能公钥解开。因此掌握公钥的不同客户端之间不能互相解密信息，只能和掌握私钥的服务器进行加密通信，服务器可以实现 1 对 N 的通信，客户端也可以用来验证掌握私钥的服务器身份。

非对称加密的特点是 1 对多，服务器只需要维持一个私钥就能够和多个客户端进行加密通信，但服务器发出的信息能够被所有的客户端解密，且该算法的计算复杂，加密速度慢。

## 通信协议对比

**HTTP 协议和 HTTPS 协议的区别**

| 区别     | HTTP                                                              | HTTPS                                                                                 |
| :------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| 协议     | 运行在 TCP 之上，明文传输，客户端与服务端都无法验证通信双方的身份 | 基于 SSL 的 HTTP，运行于 SSL 之上，SSL 运行于 TCP 之上，是添加了加密和认证机制的 HTTP |
| 端口     | 80                                                                | 443                                                                                   |
| 资源消耗 | 较少                                                              | 由于加密处理，会消耗更多 CPU 和内存资源                                               |
| 开销     | 无需证书                                                          | 需要 CA 证书，而证书一般需要向认证机构购买                                            |
| 加密机制 | 无                                                                | 共享密钥加密和公开密钥加密并用的混合加密机制                                          |
| 安全性   | 弱                                                                | 由于加密机制，安全性强                                                                |

**HTTPS 主要作用**

- 对数据进行加密，并建立一个信息安全通道，来保证传输过程中的数据安全
- 对网站服务器进行真实身份认证

## 参考资料

- [📝 一个故事讲完 HTTPS](https://mp.weixin.qq.com/s/StqqafHePlBkWAPQZg3NrA)
- [📝 图解 HTTPS 协议](https://juejin.im/entry/56ce90edefa631df62c21f8d)
- [📝 完全图解 HTTPS](https://juejin.im/post/5c441073e51d455226654d60)
- [📝 HTTP 和 HTTPS 详解](https://juejin.im/post/5af557a3f265da0b9265a498)
- [📝💯 HTTPS 连接的前几毫秒发生了什么](https://www.rrfed.com/2017/02/03/https/)
- [📝💯 深入揭秘 HTTPS 安全问题&连接建立全过程](https://zhuanlan.zhihu.com/p/22142170)
- [📝💯 如何用 Wireshark 抓包 TLS 封包](https://segmentfault.com/a/1190000018746027)
- [📝 HTTPS 详解 + Wiresahrk 抓包演示](https://www.jianshu.com/p/a3a25c6627ee)
- [📝 一次安全可靠的通信——HTTPS 原理](https://developers.weixin.qq.com/community/develop/article/doc/000046a5fdc7802a15f7508b556413)
- **HTTPS 协议详解系列**
  - [📝 HTTPS 基础知识](http://blog.csdn.net/hherima/article/details/52469267)
  - [📝 TLS/SSL 工作原理](http://blog.csdn.net/hherima/article/details/52469360)
  - [📝 PKI 体系](http://blog.csdn.net/hherima/article/details/52469488)
  - [📝 TLS/SSL 握手过程](https://blog.csdn.net/hherima/article/details/52469674)
  - [📝 HTTPS 性能与优化](http://blog.csdn.net/hherima/article/details/52469787)
