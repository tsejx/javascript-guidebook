## 设置样式

DOM 设置样式的主要方法有三种：

- HTMLELement.style
- Element.className
- Element.classList

### HTMLElement.style

`HTMLElement.style` 属性返回一个 CSSStyleDeclaration 对象，表示元素的内联 style 属性，但忽略任何样式表应用的属性。通过 style 属性可以访问的 CSS 属性列表，可以查看 [CSS Properties Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)。

注意不能通过 `style` 属性设置字符串来设置 `style`，因为 `style` 应被当成是只读的，这是因为通过 `style` 属性返回的 CSSStyleDeclaration 对象是只读的。

```js
// Wrong
element.style = 'color: blue;'
```

但是 `style` 属性本身的属性能够用来设置行内样式。此外，通过单独的样式属性设置会更加简便快捷，除非你希望完全通过一个单独语句来设置元素的全部样式，因为通过 `style` 本身属性设置的样式不会影响到通过其他方式设置的其他 CSS 属性的样式。

```js
// Bad
element.style.cssText = "color: blue; border: 1px solid black;";
element.setAttribute("style", "color: blue; border: 1px solid black;");

// Good
element.style.color = "blue";

let st = element.style;
st.color = "blue";
```

### Element.className

`className` 属性可用于获取或设置指定元素的类名属性。

#### 语法

```js
// Get class name
const cls = element.className;

// Set class name
element.className = cls;
```

| 参数    | 说明                                   | 类型        |
| ------- | -------------------------------------- | ----------- |
| element | 需要获取或设置的元素引用               | HTMLElement |
| cls     | 类名属性的值，可由空格分隔的多个属性值 | DOMString   |

#### 示例

```html
<style>
.big{
    height:100px;
    width:100px;
    background-color:blue;
}
.small{
    height:50px;
    width:50px;
    background-color:green;
}    
</style>
<div id="test" class="big"></div>
<script>
test.onclick = function(){
    test.className = 'small';
}
</script>
```

### Element.classList

`Element.classList` 属性返回元素的类属性的实时 DOMTokenList 集合。

在操作类名时，需要通过 `className` 属性添加、删除和替换类名。因为 `className` 是一个字符串，所以即使只修改字符串一部分，也必须每次都设置整个字符串的值。要从 `className` 字符串中删除一个类名，需要把类名拆开，删除不想要的那个，再重新拼成一个新字符串

#### 属性

length 属性，表示元素类名的个数，只读

#### 方法

##### item()

`item()` 方法获取类名在元素类名列表中的索引值。索引值从0开始。

```js
item(index)
```

- 如果索引超出范围，则返回 `null`

```js
document.body.classList.item(3);
```

##### add()

`add()` 方法为元素添加一个或多个类名。如果类名已经存在，则不会添加。

```js
add(className1, className2, ...)
```

##### remove()

`remove()` 方法为元素移除一个或多个类名。移除不存在的类名，不会报错。

```js
remove(className1, className2, ...)
```

##### toggle()

`toggle()` 方法在元素中切换类名。

- 第一个参数为要在元素中移除的类名，并返回 `false`。  如果该类名不存在则会在元素中添加类名，并返回 `true`。 
- 第二个是可选参数，是个布尔值用于设置元素是否强制添加或移除类，不管该类名是否存在。

```js
// remove a class
element.classList.toggle("classToRemove", false); 

// add a class
element.classList.toggle("classToAdd", true);
```

##### contains()

`contains()` 方法用于检查元素中类名列表中是否包含该类名。如果包含，返回 `true`，否则返回 `false`。

```js
contains(className)
```

#### 兼容性

由于IE9-浏览器不支持 `classList` 属性，也就不支持 `add()`、`contains()`、`remove()` 和 `toggle()` 这四个方法，下面是这四个方法的兼容写法。

由于 `indexOf()` 和 `trim()` 方法都是 ES5 新增方法，在低版本 IE 浏览器中不支持，所以需要重新封装。

```javascript
// 数组的indexOf方法封装
function indexOf(arr,value,start){
    //如果不设置start,则默认start为0
    if(arguments.length == 2){
        start = 0;
    }
    //如果数组中存在indexOf方法，则用原生的indexOf方法
    if(arr.indexOf){
        return arr.indexOf(value,start);
    }
    for(var i = start; i < arr.length; i++){
        if(arr[i] === value){
            return i;
        }
    }
    return -1;
}

// 数组去重方法封装
function noRepeat(arr){
    var result = [];
    for( var i = 0; i < arr.length; i++){
        if(indexOf(result,arr[i]) == -1){
            result.push(arr[i]);
        }
    }
    return result;
}
//inArray方法封装
function inArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(arr[i] === value){
            return true;
        }
    }
    return false;
}
//去除首尾空格函数封装
function trim(arr){
    var result = arr.replace(/^\s+|\s+$/g,'');
    return result;
}
```

##### addClass()

```javascript
function addClass(obj,classStr){
    var array = noRepeat(trim(obj.className).split('\s+'));
    if(!inArray(array,classStr)){
        array.push(classStr);
    }
    obj.className = array.join(' ');
    return obj;
}
```

##### containsClass()

```javascript
function containsClass(obj,classStr){
    var array = noRepeat(trim(obj.className).split('\s+'));
    if(inArray(array,classStr)){
        return true;
    }
    return false;
}
```

##### removeClass()

```
function removeClass(obj,classStr){
    var array = noRepeat(trim(obj.className).split('\s+'));
    var index = indexOf(array,classStr);
    if(index != -1){
        array.splice(index,1);
        obj.className = array.join(' ');
    }
    return obj;
}
```

##### toggleClass()

```javascript
function toggleClass(obj,classStr){
    var array = noRepeat(trim(obj.className).split('\s+'));
    if(inArray(array,classStr)){
        removeClass(obj,classStr);
    }else{
        addClass(obj,classStr);
    }
}
```

```html
<style>
.cB{
    color: blue;
}
</style>

<div id="test">测试文字</div>
<button id="btn1" onclick = "addClass(test,'cB')">add</button>
<button id="btn2" onclick = "containsClass(test,'cB')?alert(true):alert(false)">contains</button>
<button id="btn3" onclick = "removeClass(test,'cB')">remove</button>
<button id="btn4" onclick = "toggleClass(test,'cB')">toggle</button>
```

### 性能

```html
<div id="test" style="height:100px;width:100px;background-color:blue;"></div>
<script>
test.onclick = function(){
    console.time();
    for(var i = 0; i < 10000; i++){
        test.style.backgroundColor = 'green';
        test.style.height = '50px';    
        test.style.width = '50px';        
    }
    console.timeEnd();//59.937ms
}
</script>
/*****************************/
<div id="test" style="height:100px;width:100px;background-color:blue;"></div>
<script>
test.onclick = function(){
    console.time();
    for(var i = 0; i < 10000; i++){
    test.style.cssText = 'height:50px;width:50px;background-color:green';
    }
    console.timeEnd();//38.065ms
}
</script>
/*****************************/
<style>
.big{--------------
    height:100px;
    width:100px;
    background-color:blue;
}
.small{
    height:50px;
    width:50px;
    background-color:green;
}    
</style>
<div id="test" class="big"></div>
<script>
test.onclick = function(){
    console.time();
    for(var i = 0; i < 10000; i++){
    test.className = 'small';
    }
    console.timeEnd();//9.534ms
}
</script>
```

在1万次循环中，改变 `style` 属性中的具体样式花费了59.937ms，改变 `style` 属性中的 `cssText` 花费了38.065ms，而改变 CSS 类名只花费了9.534ms。

由此可见，使用脚本化 CSS 类的方式可以大大地提高性能。

---

参考资料：

- [HTML5 DOM 元素类名相关操作 API classList 简介](https://juejin.im/entry/573e97e3ad5b9500576fc758)