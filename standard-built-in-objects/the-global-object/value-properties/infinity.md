# Infinity

全局属性 `Infinity` 是一个数值，表示无穷大。

`Infinity` 属性的属性特性

| 属性特性       | 布尔值  |
| -------------- | ------- |
| `writable`     | `false` |
| `enumerable`   | `false` |
| `configurable` | `false` |

## 语法

```javascript
Infinity
```

#### 说明

- `Infinity` 是全局对象的一个属性，即它是一个全局变量。
- `Infinity` 的初始值是 [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)。`Infinity`（正无穷大）大于任何值。该值和数学意义上的无穷大很像，例如任何正值乘以 `Infinity` 为 `Infinity ` ，任何数值（除了 `Infinity `和 `-Infinity` ）除以 `Infinity` 为 0。



## 示例 

### 标准示例

```0javascript
console.log(Infinity          );	// Infinity
console.log(Infinity + 1      );	// Infinity
console.log(Math.pow(10, 1000));	// Infinity
console.log(Math.log(0)       );	// Infinity 
console.log(1 / Infinity      );	// 0
```

