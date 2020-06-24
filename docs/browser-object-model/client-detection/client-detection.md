---
nav:
  title: BOM
  order: 5
group:
  title: 客户端检测
  order: 9
title: 客户端检测
order: 1
---

# 客户端检测

- 能力检测
- 怪癖检测
- 用户代理检测

## 能力检测

能力检测的目标不是识别特定的浏览器，而是**识别浏览器的能力**。采用这种方式不必顾及特定的浏览器如何如何，只要确定浏览器支持特定的能力，就可以给出解决方案。

```js
function getElement(id){
    if(document.getElementById){
        return document.getElementById(id);
    }
    else if(document.all){
        return document.all[id];
    }
    else{
        throw new Error('No way to retieve element');
    }
}
```

这里通过能力检测获取元素，首先检测 document 对象是否有 `getElementById` 方法，然后检测是否有 `all` 对象，如果上述都没检测到则抛出错误。

能力检测有两点需要注意

1. 优先检测达到目的最常用的特性
2. 检测实际用到的属性

当然，更靠谱的检测时使用 `typeof` 来检测其特性的类型，而非仅仅通过类型转换来判断是否有这个属性。

## 怪癖检测

怪癖检测（Quirks Detection）的目标是识别浏览器的特殊行为。但与能力检测确认浏览器支持什么能力不同，怪癖检测是想要知道浏览器存在什么缺陷（“怪癖”也就是 BUG）。
例如，IE8 及更早版本中存在一个 BUG，即如果某个实例属性与 `[[Enumerable]]` 标记为 false 的某个原型属性同名，那么该实例属性将不会出现在 `fon-in` 循环当中。可以使用如下代码来检测这种“怪癖”。

```js
var hasDontEnumQuirk = function (){
    var o = {toString: function(){}},prop;
    for(prop in o){
        if(prop == 'toString'){
            return false;
        }
        return true;
    }
}
```

## 用户代理检测

用户代理检测通过检测用户代理字符串来**确定实际使用的浏览器**。在每一次 HTTP 请求过程中，用户代理字符串是作为相应首部发送的，而且该字符串可以通过 JavaScript 的 `navigator.userAgent` 属性访问。在服务器端，通过检测用户代理字符串来确定用户使用的浏览器是一种常用而且广为接受的做法。在客户端，优先级在能力检测和怪癖检测之后。

```js
const client = function () {
//呈现引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
// 完整的版本号
        ver: null
    };
// 浏览器
    var browser = {
// 主要浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
// 具体的版本号
        ver: null
    };
// 平台、设备和操作系统
    var system = {
        win: false,
        mac: false,
        x11: false,
// 移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
// 游戏系统
        wii: false,
        ps: false
    };
// 检测呈现引擎和浏览器
    var ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);
// 确定是Chrome 还是Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
// 近似地确定版本号
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }
            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);
// 确定是不是Firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }
// 检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;
// 检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
// 检测Windows 操作系统
    if (system.win) {
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch (RegExp["$2"]) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }
// 移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;
// windows mobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            ;
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }
// 检测iOS 版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2; //不能真正检测出来，所以只能猜测
        }
    }
// 检测Android 版本
    if (/Android (\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp.$1);
    }
// 游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);
// 返回这些对象
    return {
        engine: engine,
        browser: browser,
        system: system
    };
}();
```

---

**参考资料：**

- [JavaScript客户端检测——用户代理检测](https://www.jianshu.com/p/95510b818421)

