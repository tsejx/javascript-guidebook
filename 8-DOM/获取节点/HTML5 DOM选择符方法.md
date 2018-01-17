# HTML5 DOM选择符方法

## 选择符API

### querySelector()

　　`querySelector()` 方法接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 `null`。该方法既可用于文档document类型，也可用于元素element类型。

　　[注意]IE7-浏览器不支持

```html
<body style="height: 100%;">
<div class="box" id="box" style="height: 200px;">
<ul class="list" style="height:100px">
    <li class="in" style="height: 30px;">1</li>
    <li class="in" style="height: 30px;" title="test">2</li>
    <li class="in" style="height: 30px;">3</li>
</ul>

</div>
<script>
// 因为没有.null类名，所以返回null
var oNull = document.querySelector('.null');
console.log(oNull); // null

// 通过<body>标签取得元素
var body = document.querySelector("body");
console.log(body.style.height); // 100%

// 通过id属性取得元素
var oBox = document.querySelector('#box');
console.log(oBox.style.height); // 200px

// 通过结合元素的类选择器取得元素
var oList = document.querySelector('ul.list');
console.log(oList.style.height); // 100px

// 通过类名取得元素
var oIn = document.querySelector('.in');
console.log(oIn.innerHTML); // 1

// 通过属性选择器取得元素
var oTest = body.querySelector('[title="test"]');
console.log(oTest.innerHTML); // 2
</script>
</body> 
```

### querySelectorAll()

　　`querySelectorAll()` 接收一个CSS选择符，返回一个类数组对象 `NodeList` 的实例。具体来说，返回的值实际上是带有所有属性和方法的 `NodeList`，而其底层实现则类似于一组元素的快照，而非不断对文档进行搜索的动态查询。这样实现可以避免使用 `NodeList` 对象通常会引起的大多数性能问题。只要传给 `querySelectorAll()` 方法的CSS选择符有效，该方法都会返回一个 `NodeList` 对象，而不管找到多少匹配的元素。

　　没有匹配元素时，返回空的类数组对象，而不是null

　　[注意]IE7-浏览器不支持

```html
<body style="height: 100%;">
<div class="box" id="box" style="height: 200px;">
<ul class="list" style="height:100px">
    <li class="in" style="height: 30px;">1</li>
    <li class="in" style="height: 30px;" title="test">2</li>
    <li class="in" style="height: 30px;">3</li>
</ul>    
</div>
<script>
// 返回[]
var oNull = document.querySelectorAll('.null');
console.log(oNull);

// 取得body元素
var body = document.querySelectorAll("body")[0];
console.log(body.style.height); // 100%

// 取得所有class为"in"的元素
var oIn = document.querySelectorAll('.in');
for(var i = 0 ; i < oIn.length; i++){
    console.log(oIn[i].innerHTML);//1,2,3    
}

// 取得title属性为test的元素
var oTest = body.querySelectorAll('[title="test"]');
console.log(oTest);//[li.in]
</script>
</body>
```

### matchesSelector()

　　`matchesSelector()` 方法接收一个CSS选择符参数，如果调用元素与该选择符相匹配，返回 `true`；否则返回 `false`

```html
<body id="test">
<script>
    // Uncaught TypeError: document.body.matchesSelector is not a function
    console.log(document.body.matchesSelector('#test'));
</script>
</body>
```

　　由于兼容性问题，现在各个浏览器都只支持加前缀的方法。IE9+浏览器支持 `msMatchesSelector()` 方法，firefox支持 `mozMatchesSelector()` 方法，safari和chrome支持 `webkitMatchesSelector()` 方法。所以兼容写法为:

```javascript
function matchesSelector(element,selector){
    if(element.matchesSelector){
        return element.matchesSelector(selector);
    }
    if(element.msMatchesSelector){
        return element.msMatchesSelector(selector);
    }
    if(element.mozMatchesSelector){
        return element.mozMatchesSelector(selector);
    }
    if(element.webkitMatchesSelector){
        return element.webkitMatchesSelector(selector);
    }            
}
```

```html
<body id="test">
<script>
console.log(matchesSelector(document.body,'#test')); // true
</script>
</body>
```

## 非实时

　　与 `getElementById()` 和 `getElementsByTagName()` 方法不同，`querySelector()` 和 `querySelectorAll()` 方法得到的类数组对象是非动态实时的。

```html
<div id="container">
    <div>1</div>
    <div>2</div>
</div>
<script>
var container = document.getElementById('container');
var divOne = container.querySelector('div:last-child');
var divAll = container.querySelectorAll('div');
console.log(container.children.length); // 2
console.log(divOne.innerHTML); // 2
console.log(divAll.length); // 2

var newDiv = document.createElement('div');
newDiv.innerHTML = 3;
container.appendChild(newDiv);

console.log(container.children.length); // 3

//由于querySelector不是实时的，所以其保存的仍然是原来第二个div的值
console.log(divOne.innerHTML); // 2
//由于querySelectorAll不是实时的，所以仍然只保存了两个div元素
console.log(divAll.length); // 2

console.log(container.querySelector('div:last-child').innerHTML); // 3
console.log(container.querySelectorAll('div').length); // 3
</script>
```
 

## 缺陷

　　selector类方法在元素上调用时，指定的选择器仍然在整个文档中进行匹配，然后过滤出结果集，以便它只包含指定元素的后代元素。这看起来是违反常规的，因为它意味着选择器字符串能包含元素的祖先而不仅仅是所匹配的元素 

```html
<div id="container">
    <div>1</div>
    <div>2</div>
</div>
<script>
var container = document.getElementById('container');
console.log(container.querySelectorAll('div div')); // [div div]
</script>
```

　　按照正常理解，控制台应该返回空的类数组对象，因为id为container的div元素的子元素中，不存在div元素嵌套的情况

　　但是，该方法实际返回[div div]。这是因为参数中的选择器包含了元素的祖先

　　所以，如果出现后代选择器，为了防止该问题，可以在参数中显式地添加当前元素的选择器

```html
<div id="container">
    <div>1</div>
    <div>2</div>
</div>
<script>
var container = document.getElementById('container');
console.log(container.querySelectorAll('#container div div')); // []
console.log(container.querySelectorAll('#container div')); // [div div]
console.log(container.querySelectorAll('div')); // [div div]
</script>
```



