# Navigator对象

## 属性

　　与其他BOM对象的情况一样，每个浏览器中的 `navigator` 对象也都有一套自己的属性。下表列出了存在于所有浏览器中的属性和方法，以及支持它们的浏览器版本

属性              |      说明
:----------------:|:--------------------------------------------:
appCodeName       |      浏览器名称[所有浏览器都返回Mozilla]
userAgent         |      浏览器的用户代理字符串
appVersion        |      浏览器版本
appMinorVersion   |      次版本信息[IE返回0，chrome和firefox不支持]
platform          |      浏览器所在的系统平台[所有浏览器都返回Win32]
plugins           |      浏览器中安装的插件信息的数组
mimeTypes         |      在浏览器中注册的MIME类型数组
language          |      浏览器主语言[IE10-不支持，其他浏览器返回zh-CN]
systemLanguage    |      操作系统语言[IE返回zh-CN，chrome和firefox不支持]
userLanguage      |      操作系统默认语言[IE返回zh-CN，chrome和firefox不支持]
product           |      产品名称[IE10-不支持，其他浏览器返回Gecko]
productSub        |      产品次要信息[IE不支持，chrome返回20030107，firefox返回20100101]
vendor            |      浏览器品牌[chrome返回Google Inc.，IE和firefox不支持]
onLine            |      是否连接因特网[IE根据实际情况返回true或false，chrome和firefox始终返回true]
cookieEnabled     |      表示cookie是否启用[所有浏览器都返回true]
javaEnabled       |      是否启用java[IE8-浏览器返回{}，其他浏览器返回function javaEnabled()]
buildID           |      浏览器编译版本[firefox返回20170125094131，chrome和IE不支持]
cpuClass          |      计算机使用的CPU类型[IE返回x86，chrome和firefox不支持]
oscpu             |      操作系统或使用的CPU[firefox返回Windows NT 10.0; WOW64，chrome和IE不支持]

## 检测插件





