## 查询样式

任何支持 Style 属性的 HTML 元素在 JavaScript 中都有一个对应的 style 属性。这个 style 对象是 CSSStyleDeclaration 的实例，包含着通过 HTML 的 style 特性指定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式。在 style 特性中指定的任何 CSS 属性都将表现为这个 style 对象的相应属性。对于使用短划线（分割不同的词汇，例如 background-image）的 CSS 属性名，必须将其转换成驼峰大小写形式，才能通过 JavaScript 来访问。

| CSS属性          | JavaScript属性        |
| ---------------- | --------------------- |
| background-image | style.backgroundImage |
| color            | style.color           |
| display          | style.display         |
| font-family      | style.fontFamily      |
| float            | style.cssFloat        |

> 在标准模式下，所有度量值都必须指定一个度量单位。在混杂模式下，可以将 `style.width` 设置为 `"20"`，浏览器会假设它是 `"20"`；但在标准模式下，将 `style.width` 设置为 `"20"` 会导致被忽略——因为没有度量单位。在实践中，最好是中都指定度量单位。

**示例：**

```html
<div id="foo" style="background-color: blue; width: 100px; height: 200px;"
```

```js
const foo = document.getElementById('id');
const bg = foo.style.backgroundColor;	// 'blue'
const wdt = foo.style.width;			// '100px'
const hgh = foo.style.height;			// '200px'
```

- 内联样式脚本一般用于修改样式，查询样式的时候一般会使用计算样式
- 内联样式脚本只能修改内联样式，无法修改嵌入的样式和外部的样式
- 当时用内联样式脚本修改样式时，它将会覆盖样式表中的所有样式

### 计算样式

**元素的计算样式（computedStyle）**是一组在显示元素时实际使用的属性值，也是用一个  CSSStyleDeclaration 对象来表示的，但计算样式是只读的，主要通过 `getComputedStyle()` 方法实现。

```js
computedStyle(element [, pseudoElt])
```

| 参数      | 说明                   | 类型    |
| --------- | ---------------------- | ------- |
| element   | 用于获取样式的元素     | Element |
| pseudoEle | 指定匹配的伪元素字符串 | string  |

- 计算样式只读
- 计算样式是内联样式和所有外部样式的总样式
- 值是绝对值。例如查询 `fontSize`，只会返回像素值而不会返回 em 值。
- 不计算复合属性，如不要查询 `margin`，而是查询 `marginLeft` 或者 `marginTop`。
- 计算样式的 cssText 属性未定义。