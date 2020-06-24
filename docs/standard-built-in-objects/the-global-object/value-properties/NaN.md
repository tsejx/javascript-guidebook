---
nav:
  title: 内置对象
  order: 2
group:
  title: 全局对象 - 值属性
  order: 2
title: NaN
order: 2
---

# NaN

全局属性 **`NaN`** 的值表示不是一个数字（Not-A-Number）。

| 属性特性       | 布尔值  |
| -------------- | ------- |
| `writable`     | `false` |
| `enumerable`   | `false` |
| `configurable` | `false` |

## 说明

- `NaN` 是一个全局对象的属性。
- `NaN` 属性的初始值就是 `NaN`，和 `Number.NaN` 的值一样。
- 编码中很少直接使用到 `NaN`。通常都是在计算失败时，作为 `Math` 的某个方法的返回值出现的（例如：`Math.sqrt(-1)`）或者尝试将一个字符串解析成数字但失败了的时候（例如：`parseInt('blabla')`）。

返回 `NaN` 的情况总结：

- 无穷大除以无穷大
- 给任意负数做开放运算
- 算术运算符与不是数字或无法转换为数字的操作数一起使用
- 字符串解析为数字

## 示例

### 值校验

不可使用等号运算符来判断一个值是否为 `NaN`。必须采用 `Number.isNaN()` 或 `isNaN()`函数进行判断。

在执行自比较中，`NaN` 是唯一与自身不全等的值。

```js
NaN === NaN;
//	false

Number.NaN === NaN;
// false

isNaN(NaN);
// true;

isNaN(Number.NaN);
// true;
```

```js
function valueIsNaN(v) {
  return v !== v;
}
valueIsNaN(1);
// false
valueIsNaN(NaN);
// true
valueIsNaN(Number.NaN);
// true
```

使用 `isNaN()` 前先检查一下这个值是否是数字类型，即可避免隐式类型转换的问题。

```js
function detectIsNaN(value) {
  return typeof value === 'number' && isNaN(value);
}
```
