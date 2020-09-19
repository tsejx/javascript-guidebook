---
nav:
  title: DOM
  order: 6
group:
  title: 动态集合
  order: 7
title: DOMTokenList
order: 15
---

# DOMTokenList

DOMTokenList 接口表示一组空格分隔的标记（tokens）。如由 Element.classList、HTMLLinkElement.relList、HTMLAnchorElement.relList 或 HTMLAreaElement.relList 返回的一组值。它和 JavaScript Array 对象一样，索引从 0 开始。DOMTokenList 总是区分大小写（case-sensitive）。

## 接口方法

### item

```js
DOMTokenList.item(index);
```

根据传入的索引值返回一个值，如果索引值大于等于符号列表的长度（length），则返回 undefined 或 null，在 Gecko 7.0 之前的版本中返回 null。

### contains

```js
DOMTokenList.contains(token);
```

如果 DOMTokenList 列表中包括相应的字符串 token，则返回 true，否则返回 false。

### add

```js
DOMTokenList.add(token1 [, token2 [, ...tokenN]]);
```

添加一个或多个标记（token）到 DOMTokenList 列表中。

### remove

```js
DOMTokenList.remove(token1 [, token2 [, ...tokenN]]);
```

从 DOMTokenList 列表中移除一个或多个标记（token）。

### replace

```js
DOMTokenList.replace(oldToken, newToken);
```

使用 `newToken` 替换 `token`。

### supports

```js
DOMTokenList.supports(token);
```

如果传入的 token 是相关属性（attribute）支持的标记，则返回 true 。

### toggle

```js
DOMTokenList.toggle(token [, force]);
```

从 DOMTokenList 字符串中移除标记字串（token），并返回 `false`。如果传入的字串（token）不存在，则将其添加进去，并返回 `true`。`force` 是一个可选的布尔值，如果传入 `true`，且传入的 `token` 不存在，则将其添加进去并返回 `true`，若传入的 `token` 存在，则直接返回 `true`；反之，如果传入 `false`，则移除存在的 `token`，并返回 `false`，如 `token` 不存在则直接返回 `false`。

### entries

```js
DOMTokenList.entries();
```

返回一个迭代器（iterator） ，以遍历这个对象中的所有键值对。

### forEach

```js
DOMTokenList.forEach(callback [, thisArg]);
```

为每个 DOMTokenList 中的元素都调用一次传入的 callback 函数 。

### keys

```js
DOMTokenList.keys();
```

返回一个迭代器（iterator）以遍历这个对象中所有键值对的键。

### values

```js
DOMTokenList.values();
```

返回一个迭代器（iterator）以遍历这个对象中所有键值对的值。
