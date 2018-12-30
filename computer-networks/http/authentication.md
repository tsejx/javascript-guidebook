## HTTP 身份验证

HTTP 提供一个用于权限控制和认证的通用框架。最常用的 HTTP 认证方案是 HTTP Basic authentication。本页介绍了通用的 HTTP 认证框架以及展示如何通过 HTTP Basic authentication 来限制权限访问您的服务器。

### Basic认证实例

下面通过实例来讲解 Basic 认证是如何实现的，一共分4个步骤。假设：

1. 用户访问的资源：`/protected_docs`
2. 用户名、密码：`chyingp`、`123456`

#### 步骤1：用户访问受限资源

如下，用户访问受限资源 `/protected_docs`。请求报文如下：

```http
GET /protected_docs HTTP/1.1
Host: 127.0.0.1:3000
```

#### 步骤2：服务端返回401要求身份认证

服务端发现 `/protected_docs` 为受限资源，于是向用户发送401状态码，要求进行身份认证。

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm=protected_docs
```

响应首部中，通过`WWW-Authenticate`告知客户端，认证的方案是`basic`。同时以`realm`告知认证的范围。

```http
WWW-Authenticate: Basic realm=<需要保护资源的范围>
```

#### 步骤3：用户发送认证请求

用户收到服务端响应后，填写用户名、密码，然后向服务端发送认证请求。

![用户发送认证请求](../../images/9/fffa7afc-2fa1-464b-9d7d-05bdade58ce1.png)

以下为请求报文。`Authorization`请求首部中，包含了用户填写的用户名、密码。

```http
GET /protected_docs HTTP/1.1
Authorization: Basic Y2h5aW5ncDoxMjM0NTY=
```

`Authorization`首部的格式为`Basic base64(userid:password)`。实际代码如下：

```http
Buffer.from('chyingp:123456').toString('base64'); // Y2h5aW5ncDoxMjM0NTY=
```

#### 步骤4：服务端验证请求

服务端收到用户的认证请求后，对请求进行验证。验证包含如下步骤：

1. 根据用户请求资源的地址，确定资源对应的realm。
2. 解析 Authorization 请求首部，获得用户名、密码。
3. 判断用户是否有访问该realm的权限。
4. 验证用户名、密码是否匹配。

一旦上述验证通过，则返回请求资源。如果验证失败，则返回401要求重新认证，或者返回403（Forbidden）。

### 安全缺陷

Basic 认证的安全缺陷比较明显，它通过明文传输用户的密码，这会导致严重的安全问题。

1. 在传输层未加密的情况下，用户明文密码可被中间人截获
2. 明文密码一旦泄露，如果用户其他站点用了同样的明文密码（大概率），那么用户其他站点的安全防线也告破。

关于上述问题的建议：

1. 传输层未加密的情况下，不要使用 Basic 认证。
2. 如果使用 Basic 认证，登录密码由服务端生成。
3. 如果可能，不要使用 Basic 认证。

> 除了安全缺陷，Basic认证还存在无法吊销认证的情况。

###  基于 Token 的身份验证和实践

[基于 Token 的身份验证和实践](https://juejin.im/entry/5a586a716fb9a01ca871e714)

HTTP Basic 提供的身份验证策略缺陷比较明显，当代应用较多使用Token的方式进行用户身份验证。

使用基于 Token 的身份验证方法，在服务端不需要存储用户的登录记录。大概的流程是这样的：

1. 客户端使用用户名跟密码请求登录
2. 服务端收到请求，去验证用户名与密码
3. 验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
4. 客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
6. 服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据

---

**参考资料：**

* [MDN HTTP Authentication](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)
* [一文读懂 HTTP Basic 身份认证](https://juejin.im/entry/5ac175baf265da239e4e3999)