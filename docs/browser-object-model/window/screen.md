---
nav:
  title: BOM
  order: 5
group:
  title: 全局对象
  order: 1
title: Screen 对象
order: 4
---

# Screen 对象

## Screen Orientation API

Screen Orientation API 是一个能让 Web 开发者能控制屏幕旋转方向的 API，开发者可以利用该 API 检测屏幕的当前方向，在屏幕方向发生改变时得到消息通知，并能通过 API 将屏幕方向锁定到指定状态。目前主流的浏览器都已经部分支持或决定支持该 API，FireFox 26 和 IE 11 都支持了 `lockOrientation` 和 `unlockOrientation` API，Crosswalk 4（基于 Chromium 的 Web Runtime）也支持了该 API，Android 上的 Chrome 也正在实现该 API，估计 2014 年一季度之前能够完成。

### 使用方法

#### lockOrientation()

```js
const lockedAllowed = window.screen.lockOrientation(orientation);
```

**参数介绍**

- orientation：需要锁定屏幕的方向。这个参数是一个字符串或者是一个由字符串组成的数组。通过多个字符串可以让屏幕只在选定的方向上进行旋转。

以下字符串即表示你也许会指定的一些可能的方向。

- `portrait-primary`

  它表示屏幕处于主要的肖像模式时的方向。如果设备处于正常位置且该位置处于纵向位置，或设备的正常位置处于横向并且设备保持顺时针转动 90°，则会在主肖像模式下考虑屏幕。正常的位置是依赖于设备的。

- `portrait-secondary`

  它表示屏幕处于辅助肖像模式时的方向。如果设备与正常位置保持 180°，并且该位置处于纵向位置，或者设备的正常位置处于横向位置，并且持有的设备逆时针转动 90°，则屏幕将处于辅助人像模式。正常的位置是依赖于设备的。

- `landscape-primary`

  它代表了屏幕处于主要风景模式时的方向。 如果设备保持在正常位置，并且该位置处于横向位置，或者设备的正常位置处于纵向位置，并且所保持的设备顺时针旋转 90°，则会将其视为主要横向模式。正常的位置是依赖于设备的。

- `landscape-secondary`

  它代表了屏幕处于次要风景模式时的方向。如果设备与其正常位置保持 180° 并且该位置处于横向，或者如果设备的正常位置是纵向的，并且所保持的设备逆时针旋转 90°，则将其视为次要横向模式。正常的位置是依赖于设备的。

- `portrait`

  它表示同时包含 `portrait-primary` 和 `portrait-secondary`.

- `landscape`

  它表示同时包含 `landscape-primary` 和 `landscape-secondary`.

- `default`

  它代表 `portrait-primary` 和 `landscape-primary` 主要取决于设备的自然方向。例如，如果面板分辨率为 1280 _ 800，则 `default` 为横向，如果分辨率为 800 _ 1280，则 `default` 为纵向。

> ⚠️ 注意：可同时设置多个锁定值。因此，如果锁定设置为只有一个方向，屏幕方向将永远不会改变，知道屏幕方向解锁。否则，只要方向在设备锁定的方向之中，屏幕方向就会从一个方向改变到另一个方向。

**返回值**

如果方向被授权锁定，则返回 true；如果方向锁定被拒绝，则返回 false。请注意，返回值并不表示屏幕方向确实被锁定：可能会有延迟。

#### unlockOrientation()

```js
const unlocked = window.screen.unlockOrientation();
```

**返回值**

如果方向授权解锁成功，则返回 true；如果方向锁定解除失败，则返回 false。

### 示例

```js
// 锁定屏幕为竖屏模式，不能设备如何旋转，屏幕都不会切换到横屏模式。
window.screen.lockOrientation([“portrait-primary”,“portrait-secondary”]);

// 锁定屏幕为横屏模式，无论设备如何旋转，屏幕都不会切换到竖屏模式。
window.screen.lockOrientation([“landscape-primary”,“landscape-secondary”]);

// 取消屏幕的锁屏，屏幕回到原始状态，
window.screen.unlockOrientation();
```

### 兼容性

另外需要注意的是 Screen Orientation API 的文档规范还处于开发阶段，浏览器的实现可能带有前缀，例如 Firefox 带有 moz 前缀，IE 带有 ms 前缀。在使用前我们需要添加一些代码，保持更好的兼容性。

```js
window.screen.lockOrientation =
  screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;

window.screen.unlockOrientation =
  screen.unlockOrientation || screen.mozUnLockOrientation || screen.msUnLockOrientation;
```

## Screen 对象的属性

`screen` 对象用来表明客户端的能力，其中包括浏览器窗口外部的显示器的信息，如像素高度和宽度等。

每个浏览器中的 `screen` 对象都包含着各不相同的属性，其中 Chrome 包含 9 个属性，Firefox 包含 10 个，IE8- 浏览器包含 14 个，IE9+ 浏览器包含 17 个。

|         属性         |                                      说明                                       |
| :------------------: | :-----------------------------------------------------------------------------: |
|        height        |                        屏幕的像素高度（包括导航和底部）                         |
|        width         |                          屏幕的像素宽度（包括侧边栏）                           |
|     availHeight      |                 屏幕的像素高度减去系统部件高度之后的值（只读）                  |
|      availWidth      |                 屏幕的像素宽度减去系统部件宽度之后的值（只读）                  |
|         left         |         当前屏幕距左边的像素距离（Firefox 返回 0，Chrome 和 IE 不支持）         |
|         top          |         当前屏幕距上方的像素距离（Firefox 返回 0，Chrome 和 IE 不支持）         |
|      availLeft       | 未被系统部件占用的最左侧的像素值（只读）（Chrome 和 Firefox 返回 0，IE 不支持） |
|       availTop       | 未被系统部件占用的最上方的像素值（只读）（Chrome 和 Firefox 返回 0，IE 不支持） |
|     orientation      |                                  屏幕的方向。                                   |
|     bufferDepth      |       读、写用于呈现屏外位图的位数（IE 返回 0，Chrome 和 Firefox 不支持）       |
|      colorDepth      |          用于表现颜色的位数（只读）（IE8- 返回 32，其他浏览器返回 24）          |
|      pixelDepth      |              屏幕的位深（只读）（IE8- 不支持，其他浏览器返回 24）               |
|      deviceXDPI      |       屏幕实际的水平 DPI（只读）（IE 返回 96，Chrome 和 Firefox 不支持）        |
|      deviceYDPI      |       屏幕实际的垂直 DPI（只读）（IE 返回 96，Chrome 和 Firefox 不支持）        |
|     logicalXDPI      |       屏幕逻辑的水平 DPI（只读）（IE 返回 96，Chrome 和 Firefox 不支持）        |
|     logicalYDPI      |       屏幕逻辑的垂直 DPI（只读）（IE 返回 96，Chrome 和 Firefox 不支持）        |
|    updateInterval    |    读、写以毫秒表示的屏幕刷新时间间隔（IE 返回 0，Chrome 和 Firefox 不支持）    |
| fontSmoothingEnabled |      是否启用了字体平滑（只读）（IE 返回 true，Chrome 和 Firefox 不支持）       |
