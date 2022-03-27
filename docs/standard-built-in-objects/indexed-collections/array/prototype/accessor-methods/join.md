---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.join
order: 13
---

# Array.prototype.join()

`Array.prototype.join()` 方法将数组（或类数组对象）的所有成员连接到字符串中。

## 语法

语法：

```js
const str = arr.jon(separator);
```

类型声明：

```ts
interface Array<T> {
  join(separator?: string): string;
}
```

参数说明：

| 参数      | 说明                           | 类型   |
| :-------- | :----------------------------- | :----- |
| separator | 将数组各元素连接成字符串的字符 | string |

返回值：

返回一个所有数组成员连接的字符串。如果数组长度为 0，则返回空字符串。

## 方法说明

所有的数组成员被转换成字符串，再用一个分隔符将这些字符串连接起来。如果元素是 `undefined` 或者 `null`， 则会转化成空字符串。

## 代码示例

### 基本用法

```js
const arr = ['1', '2', '3', '4', '5'];

// 不传参数默认以逗号作为分隔符
arr.join();
// '1,2,3,4,5'

arr.join(', ');
// '1, 2, 3, 4, 5'

arr.join(' + ');
// '1 + 2 + 3 + 4 + 5'

arr.join('');
// '12345'
```

### 类数组对象

下面的示例将连接类数组对象 `arguments`，通过在 `Array.prototype.join()` 上调用 `Function.prototype.call`。

```js
function func(a, b, c) {
  const s = Array.prototype.join.call(arguments);
  console.log(s);
}

func(1, 'a', true);
// '1,a,true'
```

## 参考资料

- [MDN: Array.prototype.join](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
