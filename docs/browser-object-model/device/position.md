---
nav:
  title: BOM
  order: 5
group:
  title: 设备 API
  order: 15
title: 位置信息 Position API
order: 4
---

# 位置信息 Position API

Position 接口表示在给定的时间的相关设备的位置。这个设备，用一个 Coordinates 对象表示，包括设备在地球上的二维位置，但也可以包括设备的海拔和速度。

## 属性

Position 接口没有继承任何属性。

| 属性               | 说明                                                            |
| ------------------ | --------------------------------------------------------------- |
| Position.coords    | 返回一个当前位置的 Coordinates 对象。                           |
| Position.timestamp | 返回一个时间戳 DOMTimeStamp，这个时间戳表示获取到的位置的时间。 |

## 方法

Position 接口没有实现也没有继承任何方法。

---

**参考资料：**

- [使用地理位置定位](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/Using_geolocation)
- 使用它的 [Geolocation](../the-navigator-object/the-navigator-object-methods) 接口
