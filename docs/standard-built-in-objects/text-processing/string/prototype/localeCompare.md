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

语法：

```js
str.localCompare( compareString [, locales [, options ]])
```

类型声明：

```ts
interface String {
  localeCompare(that: string): number;

  localeCompare(that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
}
```

参数说明：

| 参数          | 说明                                                                       | 类型   |
| :------------ | :------------------------------------------------------------------------- | :----- |
| compareString | 用于比较的字符串                                                           | string |
| locales       | 可选，用于表示一种或多种语言或区域的符合 BCP 47 标准的字符串或字符串数组。 | string |
| options       |                                                                            | object |

## 代码示例

### 检查浏览器对扩展参数的支持

`locales` 和 `options` 参数还没有被所有浏览器所支持。检查是否被支持，使用 `i` 参数判断是否有异常 RangeError 抛出：

```js
function localeCompareSupportsLocales() {
  try {
    'foo'.localeCompare('bar', 'i');
  } catch (e) {
    return e.name === 'RangeError';
  }

  return false;
}
```

## 参考资料

- [MDN: Array.prototype.localeCompare](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
