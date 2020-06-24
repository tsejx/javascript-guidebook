---
nav:
  title: BOM
  order: 5
group:
  title: 其他浏览器对象
  order: 6
title: History 对象的属性
order: 3
---

## History对象的属性

`history` 对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为 `history` 是 `window` 对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的 `history` 对象与特定的 `window` 对象关联。出于安全方面的考虑，开发人员无法得知用户浏览过的 URL。不过，借由用户访问过的页面列表，同样可以在不知道实际 URL 的情况下实现后退和前进。

| 属性              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| length            | 返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。 |
| scrollRestoration | 允许 Web 应用程序在历史导航上显式地设置默认滚动恢复行为。    |
| state             | 返回一个表示历史栈堆顶部状态的值。这是一种可以不必等待 popstate 事件而查看状态的方式。 |

### history.length

`history.length` 属性保存着历史记录的URL数量。初始时，该值为1。如果当前窗口先后访问了三个网址，`history.length` 属性等于3。

由于IE10+浏览器在初始时返回2，存在兼容性问题，所以该值并不常用

```javascript
history.length // 初始时，该值为1
history.length // 访问三个网址后，该值为3
```





