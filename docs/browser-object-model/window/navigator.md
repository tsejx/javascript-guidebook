---
nav:
  title: BOM
  order: 5
group:
  title: 全局对象
  order: 1
title: Navigator 对象
order: 5
---

# Navigator 对象

## Navigator Geolocation API

**地理位置 Geolocation API**  允许用户向 Web 应用程序提供他们的位置。出于隐私考虑，报告地理位置前会先请求用户许可。

地理位置 API 通过 `navigator.geolocation` 提供。

如果该对象存在，那么地理位置服务可用。

```js
if ('geolocation' in navigator) {
  // 地理位置服务可用
} else {
  // 地理位置服务不可用
}
```

### 获取当前定位

您可以调用  `getCurrentPosition()` 函数获取用户当前定位位置。这会异步地请求获取用户位置，并查询定位硬件来获取最新信息。当定位被确定后，定义的回调函数就会被执行。您可以选择性地提供第二个回调函数，当有错误时会被执行。第三个参数也是可选的，您可以通过该对象参数设定最长可接受的定位返回时间、等待请求的时间和是否获取高精度定位。

> ⚠️ 注意：默认情况下，`getCurrentPosition()`  会尽快返回一个低精度结果，这在您不关心准确度只关心快速获取结果的情况下很有用。有 GPS 的设备可能需要一分钟或更久来获取 GPS 定位，在这种情况下  `getCurrentPosition()`  会返回低精度数据（基于 IP 的定位或 Wi-Fi 定位）。

#### 语法

```js
navigator.geolocation.getCurrentPosition(success, error, options);
```

#### 参数

- success：成功得到位置信息时的回调函数，使用 `Position` 对象作为唯一参数。
- error：（可选）获取位置信息失败时的回调函数，使用 `PositionError` 对象作为唯一的参数，这是一个可选项。
- options：（可选）一个可选的 `PositionOptions` 对象，用于设置 `getCurrentPosition` 的参数。

### 监视定位

您可以设定一个回调函数来响应定位数据发生的变更（设备发生了移动，或获取到了更高精度的地理位置信息）。您可以通过  `watchPosition()`  函数实现该功能。它与  `getCurrentPosition()`  接受相同的参数，但回调函数会被调用多次。错误回调函数与  `getCurrentPosition()`  中一样是可选的，也会被多次调用。

> ⚠️ 注意：  您可以直接调用  `watchPosition()`  函数，不需要先调用  `getCurrentPosition()`  函数。

`watchPosition()`  函数会返回一个 ID，唯一地标记该位置监视器。您可以将这个 ID 传给  `clearWatch()`  函数来停止监视用户位置。

### 使用案例

```js
if (navigator.geolocation) {
  const getOptions = {
    // 是否使用高精度设备，如GPS。默认是true
    enableHightAccuracy: true,
    // 超时时间，单位毫秒，默认为0
    timeout: 5000,
    // 使用设置时间内的缓存数据，单位毫秒
    // 默认为0，即始终请求新数据
    // 如设为Infinity，则始终使用缓存数据
    maximumAge: 0,
  };

  const getSuccess = position => {
    // Position对象有两个属性，coords和timeStamp
    // timeStamp表示地理数据创建的时间
    console.log(position.timeStamp);

    // coords是一个对象，包含了地理位置数据
    // 估算的纬度
    console.log(position.coords.latitude);
    // 估算的经度
    console.log(position.coords.longitude);
    // 估算的高度（以米为单位的海拔值）
    console.log(position.coords.altitude);
    // 所得经度和纬度的估算精度，以米为单位
    console.log(position.coords.accuracy);
    // 所得高度的估算精度，以米为单位
    console.log(position.coords.altitudeAccuracy);
    // 宿主设备的当前移动方向，以度为单位，相对于正北方向顺时针方向计算
    console.log(position.coords.heading);
    // 设备的当前对地速度，以米/秒为单位
    console.log(position.coords.speed);
    // 除上述结果外，Firefox还提供了另一个属性address
    if (position.address) {
      // 通过address，可以获得国家、省份、城市
      console.log(position.address.country);
      console.log(position.address.province);
      console.log(position.address.city);
    }
  };

  const getError = error => {
    // 执行失败的回调函数，会接受一个error对象作为参数
    // error拥有一个code属性和三个常量属性TIMEOUT、PERMISSION_DENIED、POSITION_UNAVAILABLE
    // 执行失败时，code属性会指向是那个常量中的一个，从而指明错误原因
    switch (error.code) {
      case error.TIMEOUT:
        console.log('超时');
        break;
      case error.PERMISSION_DENIED:
        console.log('用户拒绝提供地理位置');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('地理位置不可用');
        break;
      default:
        break;
    }
  };

  navigator.geolocation.getCurrentPosition(getSuccess, getError, getOptions);
  // watchPosition方法一样可以设置三个参数
  // 使用方法和getCurrentPosition方法一致，只是执行效果不同。
  // getCurrentPosition只执行一次
  // watchPosition只要设备位置发生，就会执行
  const watcher_id = navigator.geolocation.watchPosition(getSuccess, getError, getOptions);
  // clearwatch用于终止watchPosition方法
  navigator.geolocation.clearWatch(watcher_id);
}
```

## Navigator 对象的属性

Navigator 接口表示用户代理的状态和标识。它允许脚本查询它和注册自己进行一些活动。

与其他 BOM 对象的情况一样，每个浏览器中的 Navigator 对象也都有一套自己的属性。下表列出了存在于所有浏览器中的属性和方法，以及支持它们的浏览器版本。

|      属性       |                                             说明                                             |
| :-------------: | :------------------------------------------------------------------------------------------: |
|   appCodeName   |                            浏览器名称，所有浏览器都返回 Mozilla。                            |
|     appName     |                                       浏览器官方名称。                                       |
|   appVersion    |                                         浏览器版本。                                         |
| appMinorVersion |                     次版本信息（IE 返回 0，chrome 和 firefox 不支持）。                      |
|   connection    |                                     设备的网络连接信息。                                     |
|  cookieEnabled  |                        表示 cookie 是否启用，所有浏览器都返回 true。                         |
|   geolocation   |                                  可访问设备的地理位置信息。                                  |
|   javaEnabled   |     浏览器是否支持 Java（IE8 浏览器返回 `{}`，其他浏览器返回 `function javaEnabled()`）      |
|    language     |                  表示用户的首用语言（IE10 不支持，其他浏览器返回 zh-CN）。                   |
|    languages    |                   表示用户已知语言的 `DOMString` 数组，并按优先顺序排列。                    |
| maxTouchPoints  |                            当前设备能够支持的最大同时触摸的点数。                            |
|    mimeTypes    |                 返回 `MimeTypeArray` 数组用于列举浏览器所支持的 MIME 类型。                  |
|     onLine      | 浏览器是否连接因特网（IE 根据实际情况返回 true 或 false，chrome 和 firefox 始终返回 true）。 |
|    platform     |                                    浏览器所在的系统平台。                                    |
|     plugins     |                      返回 `PluginArray` 数组用于列出浏览器安装的插件。                       |
|     product     |                        产品名称（IE10 不支持，其他浏览器返回 Gecko）                         |
|   productSub    |            产品次要信息（IE 不支持，chrome 返回 20030107，firefox 返回 20100101）            |
|    userAgent    |                                      浏览器的用户代理。                                      |
|     vendor      |                 浏览器品牌（chrome 返回 Google Inc.，IE 和 firefox 不支持）                  |

表中的这些 Navigator 对象的属性通常用于检测显示网页的浏览器类型。
