---
nav:
  title: BOM
  order: 5
group:
  title: 其他浏览器对象
  order: 6
title: Screen 对象的属性
order: 5
---

## Screen对象的属性

`screen` 对象用来表明客户端的能力，其中包括浏览器窗口外部的显示器的信息，如像素高度和宽度等。

每个浏览器中的 `screen` 对象都包含着各不相同的属性，其中 Chrome 包含9个属性，Firefox 包含10个，IE8- 浏览器包含14个，IE9+ 浏览器包含17个。

属性          |    说明
:------------:|:-----------------------------:
height        | 屏幕的像素高度（包括导航和底部）
width         | 屏幕的像素宽度（包括侧边栏）
availHeight   | 屏幕的像素高度减去系统部件高度之后的值（只读）
availWidth    | 屏幕的像素宽度减去系统部件宽度之后的值（只读）
left          | 当前屏幕距左边的像素距离（Firefox 返回0，Chrome 和 IE 不支持）
top           | 当前屏幕距上方的像素距离（Firefox 返回0，Chrome 和 IE 不支持）
availLeft     | 未被系统部件占用的最左侧的像素值（只读）（Chrome 和 Firefox 返回0，IE 不支持）
availTop      | 未被系统部件占用的最上方的像素值（只读）（Chrome 和 Firefox 返回0，IE 不支持）
orientation	|	屏幕的方向。
bufferDepth   | 读、写用于呈现屏外位图的位数（IE返回0，Chrome 和 Firefox不支持）
colorDepth    | 用于表现颜色的位数（只读）（IE8- 返回32，其他浏览器返回24）
pixelDepth    | 屏幕的位深（只读）（IE8- 不支持，其他浏览器返回24）
deviceXDPI    | 屏幕实际的水平DPI（只读）（IE 返回96，Chrome 和 Firefox不支持）
deviceYDPI    | 屏幕实际的垂直DPI（只读）（IE 返回96，Chrome 和 Firefox不支持）
logicalXDPI   | 屏幕逻辑的水平DPI（只读）（IE 返回96，Chrome 和 Firefox不支持）
logicalYDPI   | 屏幕逻辑的垂直DPI（只读）（IE 返回96，Chrome 和 Firefox不支持）
updateInterval  | 读、写以毫秒表示的屏幕刷新时间间隔（IE返回0，Chrome 和 Firefox不支持）
fontSmoothingEnabled  | 是否启用了字体平滑（只读）（IE返回true，Chrome 和 Firefox不支持）
