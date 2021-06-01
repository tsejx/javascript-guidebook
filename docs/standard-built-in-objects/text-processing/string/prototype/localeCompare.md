---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.localeCompare
order: 18
---

# String.prototype.localCompare()

`localCompare()` 方法返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。

## 语法

```js
str.localCompare( compareString [, locales [, options ]])
```

| 参数            | 说明                                                                       | 类型   |
| --------------- | -------------------------------------------------------------------------- | ------ |
| `compareString` | 用于比较的字符串                                                           | string |
| `locales`       | 可选，用于表示一种或多种语言或区域的符合 BCP 47 标准的字符串或字符串数组。 | string |
| `options`       |                                                                            | object |
