---
nav:
  title: DOM
  order: 6
group:
  title: Element
  order: 6
title: HTMLElement
order: 5
---

# HTMLElement

HTMLElement 接口表示所有的 HTML 元素。一些 HTML 元素直接实现了 HTMLElement 接口，其它的间接实现 HTMLElement 接口。

## HTML 元素

所有 HTML 元素都由 HTMLElement 类型表示，不是直接通过这个类型，也是通过它的子类型来表示。HTMLElement 类型直接继承自 Element 并添加了一些属性。添加的这些属性分别对应于每个 HTML 元素中都存在的下列标准特性。

|   属性    |                                                     说明                                                      |
| :-------: | :-----------------------------------------------------------------------------------------------------------: |
|    id     |                                           元素在文档中的唯一标识符                                            |
|   title   |                              有关元素的附加说明信息，一般通过工具提示条显示出来                               |
|   lang    |                                         元素内容的语言代码，很少使用                                          |
|    dir    |                      语言的方向，值为 `ltr`（从左至右）或 `rtl`（从右至左），也很少使用                       |
| className | 与元素的 class 特性对应，即为元素指定的 CSS 类。没有将这个属性命名为 class，是因为 class 是 ECMAScript 保留字 |
