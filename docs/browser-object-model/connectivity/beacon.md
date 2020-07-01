---
nav:
  title: BOM
  order: 5
group:
  title: 数据通信 API
  order: 11
title: Beacon API
order: 4
---

# Beacon API

Beacon 接口为 Web 服务器调度异步和非阻塞请求。

- Beacon 请求使用 HTTP 的 POST 方法，并且不需要有响应
- Beacon 请求能确保在页面触发 `unload` 之前，就已经初始化

## Navigator.sendBeacon

## WorkerNavigator.sendBeacon

---

**参考资料：**

- [📖 Using the Beacon API](https://developer.mozilla.org/zh-CN/docs/Web/API/Beacon_API/Using_the_Beacon_API)
