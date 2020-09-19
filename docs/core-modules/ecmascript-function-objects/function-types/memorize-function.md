---
nav:
  title: 核心模块
  order: 3
group:
  title: 函数类型
  order: 10
title: 函数记忆
order: 15
---

# 函数记忆

**函数记忆：** 指将上次的（计算结果）缓存起来，当下次调用时，如果遇到相同的（参数），就直接返回（缓存中的数据）。

实现原理：将参数和对应的结果保存在对象中，再次调用时，判断对象 `key` 是否存在，存在返回缓存的值。

```js
function memorize() {
  const cache = {};
  return function() {
    const key = Array.prototype.call(arguments, ',');
    if (key in cache) {
      return cache[key];
    }
    return (cache[key] = fn.apply(this, arguments));
  };
}
```
