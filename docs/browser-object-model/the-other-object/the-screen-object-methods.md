---
nav:
  title: BOM
  order: 5
group:
  title: 其他浏览器对象
  order: 6
title: Screen 对象的方法
order: 6
---

## Screen对象的方法

### Screen Orientation API

Screen Orientation API是一个能让Web开发者能控制屏幕旋转方向的API，开发者可以利用该API检测屏幕的当前方向，在屏幕方向发生改变时得到消息通知，并能通过API将屏幕方向锁定到指定状态。目前主流的浏览器都已经部分支持或决定支持该API，FireFox 26 和 IE 11 都支持了 `lockOrientation` 和 `unlockOrientation` API，Crosswalk 4（基于 Chromium 的 Web Runtime）也支持了该 API，Android 上的 Chrome 也正在实现该 API，估计2014年一季度之前能够完成。

#### 使用方法

##### lockOrientation()

```js
const lockedAllowed = window.screen.lockOrientation(orientation);
```

**参数介绍**

- orientation：需要锁定屏幕的方向。这个参数是一个字符串或者是一个由字符串组成的数组。通过多个字符串可以让屏幕只在选定的方向上进行旋转。

以下字符串即表示你也许会指定的一些可能的方向。

- `portrait-primary`

  它表示屏幕处于主要的肖像模式时的方向。如果设备处于正常位置且该位置处于纵向位置，或设备的正常位置处于横向并且设备保持顺时针转动90°，则会在主肖像模式下考虑屏幕。正常的位置是依赖于设备的。

- `portrait-secondary`

  它表示屏幕处于辅助肖像模式时的方向。如果设备与正常位置保持180°，并且该位置处于纵向位置，或者设备的正常位置处于横向位置，并且持有的设备逆时针转动90°，则屏幕将处于辅助人像模式。正常的位置是依赖于设备的。

- `landscape-primary`

  它代表了屏幕处于主要风景模式时的方向。 如果设备保持在正常位置，并且该位置处于横向位置，或者设备的正常位置处于纵向位置，并且所保持的设备顺时针旋转90°，则会将其视为主要横向模式。正常的位置是依赖于设备的。

- `landscape-secondary`

  它代表了屏幕处于次要风景模式时的方向。如果设备与其正常位置保持180°并且该位置处于横向，或者如果设备的正常位置是纵向的，并且所保持的设备逆时针旋转90°，则将其视为次要横向模式。正常的位置是依赖于设备的。

- `portrait`

  它表示同时包含 `portrait-primary` 和 `portrait-secondary`.

- `landscape`

  它表示同时包含 `landscape-primary` 和 `landscape-secondary`.

- `default`

  它代表 `portrait-primary` 和 `landscape-primary` 主要取决于设备的自然方向。例如，如果面板分辨率为1280 * 800，则 `default` 为横向，如果分辨率为800 * 1280，则 `default` 为纵向。

> ⚠️注意：可同时设置多个锁定值。因此，如果锁定设置为只有一个方向，屏幕方向将永远不会改变，知道屏幕方向解锁。否则，只要方向在设备锁定的方向之中，屏幕方向就会从一个方向改变到另一个方向。

**返回值**

如果方向被授权锁定，则返回 true；如果方向锁定被拒绝，则返回 false。请注意，返回值并不表示屏幕方向确实被锁定：可能会有延迟。

##### unlockOrientation()

```js
const unlocked = window.screen.unlockOrientation();
```

**返回值**

如果方向授权解锁成功，则返回 true；如果方向锁定解除失败，则返回 false。

#### 示例

```js
// 锁定屏幕为竖屏模式，不能设备如何旋转，屏幕都不会切换到横屏模式。
window.screen.lockOrientation([“portrait-primary”,“portrait-secondary”]);

// 锁定屏幕为横屏模式，无论设备如何旋转，屏幕都不会切换到竖屏模式。
window.screen.lockOrientation([“landscape-primary”,“landscape-secondary”]);

// 取消屏幕的锁屏，屏幕回到原始状态，
window.screen.unlockOrientation();
```

#### 兼容性

另外需要注意的是 Screen Orientation API 的文档规范还处于开发阶段，浏览器的实现可能带有前缀，例如 Firefox 带有 moz 前缀，IE 带有 ms 前缀。在使用前我们需要添加一些代码，保持更好的兼容性。

```js
window.screen.lockOrientation = screen.lockOrientation ||screen.mozLockOrientation || screen.msLockOrientation;

window.screen.unlockOrientation = screen.unlockOrientation|| screen.mozUnLockOrientation || screen.msUnLockOrientation;
```



