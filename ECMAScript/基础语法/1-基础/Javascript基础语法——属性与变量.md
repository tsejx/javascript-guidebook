# Javascript中关于value的一个小知识点(value既是属性也是变量)

【1】以下这种情况是常见情况，会弹出“测试内容”

```javascript
<input type="button" value="测试内容" onclick = "alert(value)">
```

【2】心想，这种情况下value找不到，沿着作用域链应该到document了，应该弹出“123"，但情况是弹出空

```javascript
<script>
var value=123;
</script>
<input type="button" onclick = "alert(value)">
```

【3】value确实是找不到吗？是找的到的。在调试工具下，查看了this的属性，里面有一条是 ‘ value:"" ’ 。它的值就是空

```javascript
<input type="button" onclick = "console.log(this)">
```

【4】所以value作为input的属性一直存在，不存在找不到的情况，赋值了value就是被赋的值，没赋值value就是空
 

【5】看一例拓展，value伪装兄弟val。val先在input对象上找，没有找到，沿着作用域链在document对象上找，找到弹出123

```javascript
<script>
var val=123;
</script>
<input type="button" onclick = "console.log(val)">
```

【6】还有就是不论val=123被写在前面，而是后面，都能访问到，因为onclick只是事件绑定，等事件真正发生的时候页面早就解析了后面var val=123的代码了。所以不会出错

```javaascript
<input type="button" onclick = "console.log(val)">
<script>
var val=123;
</script>
```

【7】是这样吗？但其实把声明放在后面是不靠谱的，如果之间还有其他<script>代码，由于网络原因无法访问到，由于<script>有阻塞作用，会阻塞后面代码，会报错

```javascript
<input type="button" onclick = "alert(val)">
<script src="http://www.qq.com/test.js"></script>
<script>
var val=123;
</script>
```

【8】最后一个拓展。如果是一个表单元素，则它的作用域链是 this -> this.form -> document 。先从<input type="button">对象中寻找username属性，发现没有。然后找到它的父级form，form的username可以找到<input type="text">元素(表单元素可以直接通过name值访问)，然后找到其value值123后弹出

```javascript
<form action="#">
    <input type="text" name="username" value="123">
    <input type="button" value="btn" onclick = "alert(username.value)">
</form>
```