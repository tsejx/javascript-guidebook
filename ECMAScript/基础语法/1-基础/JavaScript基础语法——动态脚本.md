# JavaScript基础语法——动态脚本

标签（空格分隔）： JS

---

## 前面的话

　　动态脚本是指在页面加载时不存在，但将来的某一时刻通过修改DOM动态添加的脚本。和操作HTML元素一样，创建动态脚本也有两种方式：插入外部文件和直接插入内部javascript代码。下面将详细介绍这两种情况


## 外部脚本

```javascript
//script.js里面的内容
box.style.color = "red";
```

```javascript
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "script.js";
document.body.appendChild(script);
```

　　使用函数封装如下：

```javascript
<div id="box">测试文字</div>
<button id="btn">动态添加脚本</button>
<script>
function loadScript(url){
    loadScript.mark = 'load';
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}
btn.onclick = function(){
    if(loadScript.mark != 'load'){
        loadScript("js/script.js");        
    }
}
</script>
```

## 内部脚本

　　另一种插入动态脚本的方式是插入内部脚本，如下所示

```javascript
<script>
    box.style.color = "red";
</script>
var script = document.createElement("script");
script.innerHTML = 'box.style.color = "red"';
document.body.appendChild(script);
```

　　使用函数封装如下：

```javascript
<div id="box">测试文字</div>
<button id="btn">动态添加样式</button>
<script>
function loadScript(str){
    loadScript.mark = 'load';
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = str;
    document.body.appendChild(script);
}
btn.onclick = function(){
    if(loadScript.mark != 'load'){
        loadScript("box.style.color = 'red'");        
    }
}
</script>
```

　　在标准浏览器下，上面代码可以正常运行。但是，在IE8-浏览器下却报错。这是因为IE8-浏览器将`<script>`元素视为一个特殊的元素，不允许DOM访问其子节点，使用`appendChild()`方法或`innerHTML`属性都会报错

## 兼容写法

　　动态插入内部脚本存在兼容问题，可使用`<script>`元素的text属性替代innerHTML属性来指定Javascript代码

```javascript
<div id="box">测试文字</div>
<button id="btn">动态添加样式</button>
<script>
function loadScript(str){
    loadScript.mark = 'load';
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.text = str;
    document.body.appendChild(script);
}
btn.onclick = function(){
    if(loadScript.mark != 'load'){
        loadScript("box.style.color = 'red'");        
    }
}
</script>
```




