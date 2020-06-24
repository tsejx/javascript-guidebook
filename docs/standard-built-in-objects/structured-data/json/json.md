---
nav:
  title: 内置对象
  order: 2
group:
  title: 结构化数据
  path: /structured-data/
  order: 14
title: JSON
order: 2
---

# JSON

JSON 英文全称 JavaScript Object Notation（JavaScript 对象表示法）是一种轻量级的用于存储和交换文本信息的语法，被设计用于可读的数据交换。

JSON 是从 JavaScript 脚本语言中演变而来，使用 JavaScript 语法来描述数据对象，文件名扩展是 `.json`，但是 JSON 格式仅仅是一个文本，仍然独立于语言和平台。JSON 解析器和 JSON 库支持许多不同的编程语言。目前非常多的动态（PHP、JSP、.NET）编程语言都支持 JSON。

JSON 格式可以用于通过网络连接序列化和传输结构化数据，用于编写基于 JavaScript 应用程序，包括浏览器扩展和网站。JSON 主要用于在服务器和 Web 应用程序之间传输数据，Web 服务和 APIs 可以使用 JSON 格式提供公用数据，还可以用于现代编程语言中。

## 语法

JSON 语法是 JavaScript 对象语法的子集。

- 数据使用名称/值对表示
- 数据由逗号分隔
- 使用花括号保存对象，每个名称后面跟着冒号，名值对使用逗号分隔
- 使用方括号保存数组，数组值用逗号分隔

```js
{
    "book": [
        {
            "id":1562366,
            "price": 21.5,
            "isPromotion": true,
            "language": "Java",
            "edition": "third",
            "author": "Herbert Schildt",
        },
        {
            "id":"07",
            "language": "C++",
            "edition": "second",
            "author": "E.Balagurusamy"
        }
    ]
}
```

### JSON 键值对

JSON 数据的书写格式是：键/值对

名称/值对包括字段名称（在双引号中），后面写一个冒号，然后是值：

```json
{ "firstName":"John", "lastName":"Doe" }
```

等价于这条 JavaScript 语句：

```js
{ firstName = "John", lastName = "Doe"}
```

JSON 值允许的 JavaScript 类型：

- 数字（整数或浮点数）
- 字符串（在双引号中）
- 逻辑值（`true` 或 `false`）
- 数组（在方括号中）
- 对象（在花括号中）
- null

**注意：JSON 不支持 JavaScript 中的特殊值 `undefined`。**

### JSON 对象

**JSON 字面量**

```js
let person = {
  name: 'xianyu',
  age: 24,
  love: 'Online Game',
};
```

从上我们可以看出这就是用字面量表示的一个对象，而这个格式就是 JSON 格式的，因为本身 JSON 就是 JavaScript 语法集的一种，所以 JSON 字面量就是用 JSON 格式的 JavaScript 对象字面量。

**与 JavaScript 对象的差异**

- JSON 中没有变量的概念（不用声明变量）
- JSON 没有末尾的的分号（因为不是 JavaScript 语句，所以不需要分号）
- JSON 对象的属性必须加双引号

```js
// JavaScript
let person = {
    "name": "Nicholas",
    "age": 29
}

// JSON
{
    "name": "Nicholas",
    "age": 29
}
```

- JSON 属性的值可以是简单值，也可以是复杂类型值（因此可以像下面这样在对象中嵌入对象）。

```js
{
    "name": "Nicolas",
    "age": 29,
    "school": {
        "name": "Merrimack College",
        "location": "North Andover, MA"
    }
}
```

**注意：同一对象中绝对不应该出现两个同名属性。**

### JSON 数组

JSON 数组采用的就是 JavaScript 中的数组字面量形式。

```js
let values = [25, 'hi', true];
```

JSON 数组也没有变量和分号。把数组和对象结合起来，可以构成更复杂的数据集合。

```js
[
  {
    title: 'Professional JavaScript',
    authors: ['Nicholas C. Zakas'],
    edition: 3,
    year: 2011,
  },
  {
    title: 'Professional JavaScript',
    authors: ['Nicholas C. Zakas'],
    edition: 3,
    year: 2009,
  },
  {
    title: 'Professional JavaScript',
    authors: ['Nicholas C. Zakas'],
    edition: 3,
    year: 2008,
  },
];
```

## 方法

| 方法               | 描述                                                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `JSON.stringify()` | 用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。提供可选的 `reviver` 函数用以在返回之前对所得到的对象进行变换（操作）。                                     |
| `JSON.parse()`     | 将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串，如果指定了 `replace` 是一个函数，则可以替换值，或者如果指定了 `replacer` 是一个数组，可选的仅包括指定的属性。 |

## JSON 文件

JSON 文件的文件类型是 `.json`

JSON 文本的 MIME 类型是 `application/json`
