# HTTP3

## 发展历程

* HTTP/1.0 - 1996
* HTTP/1.1 - 1997 缓存、条件式请求、鉴权、FIFO Pipelining
* SPDY - 2012 强制压缩、多路复用、Pipeling、双向通信、优先级调用
* HTTP/2 - 2015 头部压缩、多路复用、Pipelining、Server push（解决 HTTP 队首阻塞）
* HTTP/3 - 2018 快速握手、可靠传输、有序交付（解决 TCP 队首阻塞）

| 应用层            | 传输层      | 网络层 |
| ----------------- | ----------- | ------ |
| HTTP              | TCP         | IP     |
| HTTP/2 + TLS/1.2+ | TCP         | IP     |
| HTTP/3 + TLS/1.3  | QUIC（UDP） | IP     |

🗑 TLS1.1- 由于安全因素，已经或将要废弃

TLS 1.2 当今的主流版本

TLS 1.3 简化了握手流程，增强了安全性

## 发展前景

* Pros
  * 在经常丢包的网络中表现更好
  * 更快的握手
  * 更少的延迟
* Cons
  * UDP 易受放大攻击
  * 内核处理 UDP 很慢
  * QUIC 太吃 CPU

## 性能优化如何转型

* HTTP/2 占比过三成
* HTTP/3 问世
* TLS 1.3 问世
* TLS 1.1/1.0 将废弃

性能优化的变化

* 协议层：更少的 TTL 和更细的资源粒度（更有利于缓存的命中）
* 浏览器层：更丰富的数据统计（浏览器提供的新 API）
* 在线优化：更强的缓存控制能力（QuickLink 技术实现 prefetch）
* 离线优化：走向 Zero Config