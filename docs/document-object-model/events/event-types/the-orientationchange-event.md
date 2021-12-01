---
nav:
  title: DOM
  order: 6
group:
  title: 事件类型
  order: 21
title: 设备事件
order: 99
---

# 设备事件

## orientationchange 事件

苹果公司为移动 Safari 中添加了 `orientationchange` 事件，以便开发人员能够确定用户何时将设备由横向查看模式切换为纵向查看模式。移动 Safari 的 `window.orientation` 属性中可能包含 3 个值：

- 0：表示肖像模式
- 90：表示向左旋转的横向模式（“主屏幕”按钮在右侧）
- -90：表示向右旋转的横向模式（“主屏幕”按钮在左侧）

相关文档中还提到一个值，即 180 表示 iPhone 头朝下；但这种模式至今尚未得到支持。

只要用户改变了设备的查看模式，就会触发 `orientationchange` 事件。此时的 `event` 对象不包含任何有价值的信息，因为唯一相关的信息可以通过 `window.orientation` 访问到。下面是使用这个事件的典型示例。

```js
EventUtil.addHandler(window, 'load', function(event) {
  const div = document.getElementById('myDiv');
  div.innerHTML = 'Current orientation is ' + window.orientation;
  EventUtil.addHandler(window, 'orientationchange', function(event) {
    div.innerHTML = 'Current orientation is ' + window.orientation;
  });
});
```

在这个例子中，当触发 `load` 事件时会显示最初的方向信息。然后，添加了处理 `orientationchange` 事件的处理程序。只要发生这个事件，就会有表示新方向的信息更新页面中的消息。

所有 iOS 设备都支持 `orientationchange` 事件和 `window.orientation` 属性。

## MozOrientation 事件

Firefox3.6 为检查设备的方向引入了一个名为 `MozOrientation` 的新事件。（前缀 Moz 表示这是特定于浏览器开发商的事件，不是标准事件。）当设备的加速计检测到设备方向改变时，就会触发这个事件。但这个事件与 iOS 中的 `orientationchange` 事件不同，该事件只能提供一个平面的方向变化。由于 `MozOrientation` 事件是在 `window` 对象上触发的，所以可以使用以下代码来处理。

```js
EventUtil.addHandler(window, 'MozOrientation', function(event) {
  // 响应事件
});
```

此时的 `event` 对象包含三个属性：x、y 和 z。这几个属性的值都介于 1 到-1 之间，表示不同坐标轴上的方向。在静止状态下，x 值为 0，y 值为 0，z 值为 1（表示设备处于竖直状态）。如果设备向右倾斜，x 值会减少；反之，向左倾斜，x 值会增大。类似地，如果设备向远离用户的方向倾斜

## deviceorientation 事件
