---
nav:
  title: DOM
  order: 6
group:
  title: Element
  order: 6
title: Element.matches
order: 10
---


# Element.matches

样式精准匹配

使用 `Element.matches` 方法可以通过精准匹配。

```js
Element.matches(selectorString)
```

如果改变下 HTML 成：

```html
<ul id="foo">
  <li className="class-1">item 1</li>
  <li>item 2</li>
  <li className="class-1">item 3</li>
  ......
  <li>item n</li>
</ul>
// ...... 代表中间还有未知数个 li
```

这里，我们想把 `#foo` 元素下的 `li` 元素（并且它的 `class` 为 `class-1`）的点击事件委托代理到 `#foo` 之上。

如果通过上述的方法我们还需要在 `if (target.nodeName.toLocaleLowerCase === 'li')` 判断之中在加入一个判断 `target.nodeName.className === 'class-1'`。

但是如果想像 CSS 选择器般做更加灵活的匹配的话，上面的判断未免就太多了，并且很难做到灵活性。

这里可以使用 `Element.matches` API 来匹配。

`Element.matches` API 的基本使用方法：





`selectorString` 既是 CSS 那样的选择器规则，比如本例中可以使用 `target.matches('li.class-1')`，他会返回一个布尔值，如果 `target` 元素是标签 `li` 并且它的类是 `class-1` ，那么就会返回 `true`，否则返回 `false`；

当然它的兼容性还有一些问题，需要 IE9 及以上的现代化浏览器版本。

我们可以使用 Polyfill 来解决兼容性上的问题：

```js
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}
```

加上 `Element.matches` 之后就可以来实现我们的需求了：

```js
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      const matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}

document.getElementById('foo').addEventListener('click', function (e) {
  // 兼容性处理
  const event = e || window.event;
  const target = event.target || event.srcElement;

  if (target.matches('li.class-1')) {
    console.log('the content is: ', target.innerHTML);
  }
});
```

