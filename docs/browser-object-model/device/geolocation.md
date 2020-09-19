---
nav:
  title: BOM
  order: 5
group:
  title: 设备 API
  order: 15
title: 地理定位 Geolocation API
order: 1
---

## 地理定位 Geolocation API

根据用户的地理位置提供相关地区服务，已经是非常普遍的一项功能，例如本地生活服务类网站、外卖网站等。HTML5 新功能中提供了获取用户位置的能力。

各主要浏览器对 HTML5 Geolocation API 的支持情况：

| 浏览器                 | 版本  | 只支持 HTTPS 版本 |
| ---------------------- | ----- | ----------------- |
| IE                     | 9+    | -                 |
| Edge                   | 12+   | -                 |
| Firefox                | 3.5+  | -                 |
| Chrome                 | 5+    | 50+               |
| Safari                 | 5+    | 39+               |
| iOS Safari             | 3.2+  | 10.2+             |
| Android Browser        | 2.1+  | 56+               |
| Chrome for Android     | 57+   | 57+               |
| UC Browser for Android | 11.4+ | -                 |

注意：处于安全考虑，部分最新的浏览器的浏览器只允许通过 HTTPS 协议使用 Geolocation API。在 HTTPS 协议下使用 Geolocation API，浏览器会抛出异常。在开发阶段，127.0.0.1 和 localhost 等本地域在两种协议下均可以使用。

Geolocation API 通过 `navigator.geolocation` 全局对象进行访问。初次访问时，浏览器会询问用户是否允许共享位置，若用户选择允许则程序获得使用 Geolocation API 权限。判断浏览器是否存在 `navigator.geolocation` 对象来得知。

```js
if (navigator.geolocation) {
  // 获取地理位置
} else {
  alert('您的浏览器不支持Geolocation!');
}
```

获取用户的当前位置，可以调用 `navigator.geolocation` 的 `getCurrentPosition` 方法。

```js
if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(
    	function success(position)(){
    		console.log('获取位置成功:', position.coords);
    	},
		function error(positionError){
			console.log('获取位置失败:', positionError.code,
                        positionError.message);

        },
        {
        	enableHightAccuracy: false,
         	timeout: 30000,
         	maximumAge: 0
        }
	)
} else {
    alert('您的浏览器不支持Geolocation!');
}
```

成功获取位置后，会调用回调函数 `success`。返回参数 `position` 对象包含获取位置时的时间戳 `timestamp` 和坐标信息 `coords`。`coords` 对象包含了很多有用的位置数据信息，列举几个常用的属性：

| 属性      | 说明               |
| --------- | ------------------ |
| latitude  | 坐标纬度           |
| longitude | 坐标经度           |
| accuracy  | 坐标精度，单位为米 |

当获取位置失败时，会调用回调函数 `error`。返回的参数 `positionError` 的 `message` 属性包含了相关的错误信息描述，`positionError.code` 标识错误的原因，`positionError.code` 的值有以下几种。

| 属性                      | 说明                 |
| ------------------------- | -------------------- |
| `UNKNOWN_ERROR(0)`        | 其他错误             |
| `PERMISSION_DENIED(1)`    | 用户拒绝分享位置信息 |
| `POSITION_UNAVAILABLE(3)` | 获取用户位置信息失败 |
| `TIMEOUT(3)`              | 获取用户位置信息超时 |

`gerCurrentPosition` 方法的参数 `options` 可以设置以下内容。

| 属性              | 说明                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| enableHighAccuray | 布尔值，是否获取高精度的位置信息，如果开启，可能会增加响应时间，默认值为 `false`                     |
| timeout           | 定位超时时间，单位毫秒，如到达时间时没有取得用户位置信息，则触发失败回调函数，默认值为 0，表示无限大 |
| maximumAge        | 用户位置信息缓存的最大时间（单位为毫秒），默认值为 0                                                 |

当用户位置变化时，还可以通过 `watchPosition` 方法监听用户的位置信息，`watchPosition` 的参数和 `getCurrentPosition` 相同。函数执行后返回一个唯一标识，可以使用 `clearWatch` 方法来取消监听。

```js
const watchId = navigator.geolocation.watchPosition(success, error, options);
navigator.geolocation.clearWatch(watchId);
```
