## Navigator对象的属性

Navigator 接口表示用户代理的状态和标识。它允许脚本查询它和注册自己进行一些活动。

与其他BOM对象的情况一样，每个浏览器中的 Navigator 对象也都有一套自己的属性。下表列出了存在于所有浏览器中的属性和方法，以及支持它们的浏览器版本。

属性              |      说明
:----------------:|:--------------------------------------------:
appCodeName       | 浏览器名称，所有浏览器都返回Mozilla。
appName        |      浏览器官方名称。
appVersion        |      浏览器版本。
appMinorVersion   |      次版本信息（IE返回0，chrome和firefox不支持）。
connection	| 	设备的网络连接信息。
cookieEnabled     |      表示 cookie 是否启用，所有浏览器都返回 true。
geolocation		|		可访问设备的地理位置信息。
javaEnabled       |      浏览器是否支持 Java（IE8 浏览器返回 `{}`，其他浏览器返回 `function javaEnabled()`）
language          |      表示用户的首用语言（IE10 不支持，其他浏览器返回 zh-CN）。
languages	|	表示用户已知语言的 `DOMString` 数组，并按优先顺序排列。
maxTouchPoints | 当前设备能够支持的最大同时触摸的点数。
mimeTypes         |      返回 `MimeTypeArray` 数组用于列举浏览器所支持的 MIME 类型。
onLine            |      浏览器是否连接因特网（IE根据实际情况返回 true 或 false，chrome 和 firefox始终返回 true）。
platform          |      浏览器所在的系统平台。
plugins           |      返回 `PluginArray` 数组用于列出浏览器安装的插件。
product           |      产品名称（IE10 不支持，其他浏览器返回 Gecko）
productSub        |      产品次要信息（IE不支持，chrome 返回20030107，firefox 返回20100101）
userAgent         |      浏览器的用户代理。
vendor            |      浏览器品牌（chrome 返回 Google Inc.，IE 和 firefox 不支持）

表中的这些 Navigator 对象的属性通常用于检测显示网页的浏览器类型。








