---
nav:
  title: DOM
  order: 6
group:
  title: Element
  order: 6
title: Element 方法
order: 3
---

# Element 方法

## 位置方法

### getBoundingClientRect

获取元素的大小及其相对于视口的位置

### getClientRects

获取一个指向客户端中每一个盒子的边界矩形的矩形集合

### computedStyleMap

## 样式方法

### matches

使用 `Element.matches` 方法可以通过精准匹配样式。

```js
Element.matches(selectorString);
```

示例：

```html
<ul id="foo">
  <li class="class-1">item 1</li>
  <li>item 2</li>
  <li class="class-1">item 3</li>
  ......
  <li>item n</li>
</ul>
// ...... 代表中间还有未知数个 li
```

- 这里，我们想把 `#foo` 元素下的 `li` 元素（并且它的 `class` 为 `class-1`）的点击事件委托代理到 `ul#foo` 之上。
- 如果通过上述的方法我们还需要在 `if (target.nodeName.toLocaleLowerCase === 'li')` 判断之中在加入一个判断 `target.nodeName.className === 'class-1'`。
- 但是如果想像 CSS 选择器般做更加灵活的匹配的话，上面的判断未免就太多了，并且很难做到灵活性。

这里可以使用 `Element.matches` API 来匹配。`Element.matches` API 的基本使用方法：

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

document.getElementById('foo').addEventListener('click', function(e) {
  // 兼容性处理
  const event = e || window.event;
  const target = event.target || event.srcElement;

  if (target.matches('li.class-1')) {
    console.log('the content is: ', target.innerHTML);
  }
});
```

### animate

Element 接口的 `animate` 方法是一个创建新 Animation 的便捷方法，将它应用于元素，然后运行动画。它将返回一个新建的 Animation 对象实例

### getAnimations

```js
Promise.all(elem.getAnimations({ subtree: true }).map(animation => animation.finished)).then(() =>
  elem.remove()
);
```

## 属性方法

### getAttribute

获取元素中指定属性

### setAttribute

设置元素中指定属性

### hasAttribute

判断元素中是否存在置顶属性

### removeAttribute

移除元素中指定属性

## 滚动方法

### scroll

`Element.scroll` 方法是用于在给定的元素中滚动到某个特定坐标的 Element 接口。

### scrollBy

`Element.scrollBy` 方法是使得元素滚动一段特定距离的 Element 接口。

### scrollIntoView

`Element.scrollIntoView` 方法让当前的元素滚动到浏览器窗口的可视区域内。

### scrollTo

`Element.scrollTo` 方法可以使界面滚动到给定元素的指定坐标位置。

## requestFullscreen

## 事件对象

```js
// Event 对象爱哪个
const event = window.event || event;

// 事件的目标节点
const target = event.target || event.srcElement;
```
