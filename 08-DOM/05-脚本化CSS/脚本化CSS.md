# 脚本化CSS

## style

　　我们在改变元素的少部分样式时，一般会直接改变其行间样式

```html
<div id="test" style="height:100px;width:100px;background-color:blue;"></div>
<script>
test.onclick = function(){
    test.style.backgroundColor = 'green';
}
</script>
```


## cssText
　
　　改变元素的较多样式时，可以使用 `cssText`

```html
<div id="test" style="height:100px;width:100px;background-color:blue;"></div>
<script>
test.onclick = function(){
    test.style.cssText = 'height:50px;width:50px;background-color:green';
}
</script>
```

## css类
　
　　更常用的是使用css类，将更改前和更改后的样式提前设置为类名。只要更改其类名即可

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

## classList
　
　　如果要改变多个类名，使用classList更为方便

　　[注意]IE9-浏览器不支持

```html
<style>
.big{
    height:100px;
    width:100px;
}
.small{
    height:50px;
    width:50px;
}    
.green{
    background-color:green;
}
.blue{
    background-color:blue;
}
</style>
<div id="test" class="big green"></div>
<button id="btn1">大小变化</button>
<button id="btn2">颜色变化</button>
<script>
btn1.onclick = function(){
    test.classList.toggle('small');
}
btn2.onclick = function(){
    test.classList.toggle('blue');
}
</script>
```

## 性能

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

　　在1万次循环中，改变style属性中的具体样式花费了59.937ms，改变style属性中的cssText花费了38.065ms，而改变css类名只花费了9.534ms

　　由此可见，使用脚本化CSS类的方式可以大大地提高性能




