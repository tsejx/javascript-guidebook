---
nav:
  title: 内置对象
  order: 2
group:
  title: String
  path: /text-processing/string/
  order: 9
title: String.prototype.matchAll
order: 20
---

# String.prototype.matchAll()

⭐️ `ES2019(ES10)新特性`

`matchAll()` 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

## 语法

语法：

```js
str.matchAll(regexp);
```

类型声明：

```ts
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

interface String {
  matchAll(regexp: RegExp): IterableIterator<RegExpMatchArray>;
}
```

参数说明：

| 参数   | 说明                                         | 类型   |
| :----- | :------------------------------------------- | :----- |
| regexp | 正则表达式，如果传参非正则会通过构造函数转换 | RegExp |

## 代码示例

### 获取字符串所有匹配项

使用 `matchAll` 会得到一个迭代器的返回值，配合 `for...of`、解构赋值或者 `Array.from` 可以更方便实现功能：

```js
const str = 'table football foosball';
const regexp = RegExp('foo[a-z]*', 'g');
const matches = str.matchAll(regexp);

for (const match of matches) {
  console.log(match[0], match.index, match.index + match[0].length);
}

const arr = Array.from(str.matchAll(regexp), (m) => m[0]);
// ['football', 'foosball']
```

### 捕获组的最佳途径

`matchAll` 的另一个亮点是更好地获取捕获组，因为当使用 `match` 和 `/g` 标志方式获取匹配信息时，捕获组会被忽略：

```js
const regexp = /t(e)(st(\d?))/g;

const str = 'test1test2';

const arr = str.match(regexp);

console.log(arr);
// ['test1', 'test2']
```

使用 `matchAll` 可以通过如下方式获取分组捕获：

```js
const arr = [...str.matchAll(regexp)];

console.log(arr[0]);
// ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', length: 4]
console.log(arr[1]);
// ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', length: 4]
```

## 参考资料

- [MDN: Array.prototype.matchAll](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)
- [TypeScript: lib.es2020.string.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2020.string.d.ts)
