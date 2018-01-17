# HTML5 DOM与类相关扩充

## getElementsByClassName()方法

　　HTML元素的class属性值是一个以空格隔开的列表，可以为空或包含多个标识符。在Javascript中 `class` 是保留字，所以使用 `className` 属性来保存HTML的 `class` 属性值

　　`getElementsByClassName()` 方法接收一个参数，即一个包含一个或多个类名的字符串，返回带有指定类的所有元素的类数组对象HTMLCollection。传入多个类名时，类名的先后顺序不重要。与getElementsByTagName()类似，该方法既可以用于HTML文档对象，也可以用于element元素对象

　　[注意]IE8-浏览器不支持

```html
<ul id="list">
    <li class="a ab c">1</li>
    <li class="a">2</li>
    <li class="ac">3</li>
    <li class="a b c">4</li>
    <li class="a b">5</li>
</ul>
<script>
// 类名中存在a成立
Array.prototype.forEach.call(list.getElementsByClassName('a'),function(item,index,arr){
    item.style.fontWeight = 'bold';
});
// 只有类名中同时存在a和c才成立
Array.prototype.forEach.call(list.getElementsByClassName('a c'),function(item,index,arr){
    item.style.color = 'red';
});
</script>
```

## classList属性

　　在操作类名时，需要通过 `className` 属性添加、删除和替换类名。因为 `className` 是一个字符串，所以即使只修改字符串一部分，也必须每次都设置整个字符串的值。要从 `className` 字符串中删除一个类名，需要把类名拆开，删除不想要的那个，再重新拼成一个新字符串

　　HTML5为所有元素添加了classList属性，这个classList属性是新集合类型DOMTokenList的实例，它有一个表示自己包含多少元素的 `length` 属性，而要取得每个元素可以使用item()方法，也可以使用方括号法。

　　[注意]IE9-浏览器不支持

```html
<div id="test" class="a b c"></div>
<script>
console.log(test.classList);//["a", "b", "c", value: "a b c"]
console.log(test.classList[0]);//a
console.log(test.classList.item(1));//b
</script>
```

　　此外，这个新类型还定义如下方法：

方法              |     描述
:----------------:|:---------------------------------------------------------------------:
`add(value)`        |     将给定的字符串值添加到列表中，如果值已存在，则不添加
`contains(value)`   |     表示列表中是否存在给定的值，如果存在则返回true,否则返回false
`remove(value)`     |     从列表中删除给定的字符串
`toggle(value)`     |    如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它


　　有了 `classList` 属性，`className` 属性基本没有什么用武之地了

```html
<style>
.cB{color: blue;}
</style>

<body>
<div id="test">测试文字</div>
<button id="btn1" onclick = "test.classList.add('cB')">add</button>
<button id="btn2" onclick = "test.classList.contains('cB')?alert(true):alert(false)">contains</button>
<button id="btn3" onclick = "test.classList.remove('cB')">remove</button>
<button id="btn4" onclick = "test.classList.toggle('cB')">toggle</button>
</body>
```

## 扩展

　　【1】由于原生的 `getElementsByClassName()` 方法不兼容IE8-浏览器，且该方法只能完全匹配参数中的类名列表。因此有如下扩展

　　扩展函数 `getElementsByClassName()`，具有更丰富的功能。如果参数类名列表由空格分隔，则进行且匹配，即只有元素中的类名包含参数类名列表中的所有类名才算匹配成功；如果参数类名列表由逗号分隔，则进行或匹配，即只要元素中的类名包含参数类名列表中的其中一个类型就算匹配成功

```javascript
Array.prototype.noRepeat = function(){
    var result = [];
    for(var i = 0; i < this.length; i++){
        if(result.indexOf(this[i]) == -1){
            result.push(this[i]);
        }
    }
    return result;
}

Array.prototype.inArray = function(value){
    for(var i = 0; i < this.length; i++){
        if(this[i] === value){
            return true;
        }
    }
    return false;
}

function getElementsByClassName(parentObj, classStr){
    var result = [];
    // 获取parentObj下的所有子元素
    var objs = parentObj.getElementsByTagName('*');
    // 条件一：如果classStr用空格分隔，则表示class必须同时满足才有效
    var targetArr1 = classStr.trim().split(/\s+/).noRepeat();
    // 条件二：如果classStr用逗号分隔，则表示class只要有一个满足就有效
    var targetArr2 = classStr.trim().split(/\s*,\s*/).noRepeat();
    // 只有一个class或者进行条件一测试
    if(classStr.indexOf(',') == -1 ){
        label: for(var i = 0; i < objs.length; i++){
            //获取每一个子元素的类名，将其转换为数组后去重
            var arr = objs[i].className.trim().split(/\s+/).noRepeat();
            //进入循环，测试是否符合条件一
            for(var j = 0; j < targetArr1.length; j++){
                //如果条件一中的某一项在arr数组中不存在，则跳过该子元素
                if(!arr.inArray(targetArr1[j])){
                    continue label;
                }
            }
            //将符合条件一的子元素对象放在结果数组中
            result.push(objs[i]);
        }
        //返回结果数组
        return result;
    //进行条件二测试
    }else{
        label: for(var i = 0; i < objs.length; i++){
                //获取每一个子元素的类名，将其转换为数组后去重
                var arr =objs[i].className.trim().split(/\s+/).noRepeat();
                //进入循环，测试是否符合条件二
                for(var j = 0; j < targetArr2.length; j++){
                    //只要条件二的中某一项在arr数组中存在，就符合
                    if(arr.inArray(targetArr2[j])){
                        //将符合条件二的子元素对象放在结果数组中
                        result.push(objs[i]);
                        //接着进入下一个子元素测试
                        continue label;
                    }
                }   
            }
        //返回结果数组
        return result;     
    }
}
```

```html
<ul id="list">
    <li class="a ab c">1</li>
    <li class="a">2</li>
    <li class="ac">3</li>
    <li class="a b c">4</li>
    <li class="a b">5</li>
</ul>
<script>
// 类名中存在a成立
getElementsByClassName(list,'a').forEach(function(item,index,arr){
    item.style.fontWeight = 'bold';
});
// 只有类名中同时存在a和c才成立
getElementsByClassName(list,'a c').forEach(function(item,index,arr){
    item.style.color = 'red';
});
// 只要类名中存在b或c即成立
getElementsByClassName(list,'b,c').forEach(function(item,index,arr){
    item.style.backgroundColor = 'pink';
});
</script>
```

　　【2】由于IE9-浏览器不支持 `classList` 属性，也就不支持 `add()`、`contains()`、`remove()` 和toggle()` 这四个方法，下面是这四个方法的兼容写法

　　由于 `indexOf()` 和 `trim()` 方法都是ES5新增方法，在低版本IE浏览器中不支持，所以需要重新封装

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

　　**1、add函数封装**

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

　　**2、contains函数封装**

```javascript
function containsClass(obj,classStr){
    var array = noRepeat(trim(obj.className).split('\s+'));
    if(inArray(array,classStr)){
        return true;
    }
    return false;
}
```

　　**3、remove函数封装**

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

　　**4、toggle函数封装**

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
